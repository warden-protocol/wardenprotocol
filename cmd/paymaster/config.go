package main

import (
	"encoding/json"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/joho/godotenv"
)

// Config represents the configuration for the event listener
type Config struct {
	EventSignature    string              `json:"event_signature" env:"EVENT_SIGNATURE"`
	ReconnectInterval time.Duration       `json:"reconnect_interval" env:"RECONNECT_INTERVAL"`
	MaxRetries        int                 `json:"max_retries" env:"MAX_RETRIES"`
	SourceChains      []SourceChainConfig `json:"source_chains"`
	WardenChain       WardenChainConfig   `json:"warden_chain"`
}

// SourceChainConfig represents configuration for a source chain
type SourceChainConfig struct {
	Name            string `json:"name" env:"CHAIN_NAME"`
	RPCURL          string `json:"rpc_url" env:"CHAIN_RPC_URL"`
	ContractAddress string `json:"dispatcher_address" env:"CHAIN_CONTRACT_ADDRESS"`
	FromBlock       uint64 `json:"from_block" env:"CHAIN_FROM_BLOCK"`
}

// WardenChainConfig represents configuration for the Warden chain
type WardenChainConfig struct {
	Name       string `json:"name" env:"WARDEN_NAME"`
	RPCURL     string `json:"rpc_url" env:"WARDEN_RPC_URL"`
	IsmAddress string `json:"executor_address" env:"WARDEN_ISM_ADDRESS"`
	PrivateKey string `json:"private_key" env:"WARDEN_PRIVATE_KEY"`
}

// normalizeChainName converts chain name to a format suitable for env vars
func normalizeChainName(name string) string {
	return strings.ToUpper(strings.ReplaceAll(name, "-", "_"))
}

// loadChainsFromEnv loads chain configurations from environment variables
func loadChainsFromEnv() []SourceChainConfig {
	var chains []SourceChainConfig
	envVars := os.Environ()

	// Find all chain names from environment variables
	chainNames := make(map[string]struct{})
	for _, env := range envVars {
		parts := strings.SplitN(env, "=", 2)
		if len(parts) != 2 {
			continue
		}
		key := parts[0]
		if strings.HasPrefix(key, "CHAIN_") && strings.HasSuffix(key, "_NAME") {
			// Extract chain name from env var (e.g., CHAIN_ETHEREUM_MAINNET_NAME -> ETHEREUM_MAINNET)
			chainName := strings.TrimPrefix(strings.TrimSuffix(key, "_NAME"), "CHAIN_")
			chainNames[chainName] = struct{}{}
		}
	}

	// Load configuration for each chain
	for chainName := range chainNames {
		chain := SourceChainConfig{
			Name: strings.ReplaceAll(strings.ToLower(chainName), "_", "-"),
		}

		prefix := "CHAIN_" + chainName + "_"
		if rpc := os.Getenv(prefix + "RPC_URL"); rpc != "" {
			chain.RPCURL = rpc
		}
		if addr := os.Getenv(prefix + "CONTRACT_ADDRESS"); addr != "" {
			chain.ContractAddress = addr
		}
		if block := os.Getenv(prefix + "FROM_BLOCK"); block != "" {
			if fromBlock, err := strconv.ParseUint(block, 10, 64); err == nil {
				chain.FromBlock = fromBlock
			}
		}

		// Only add chain if it has required fields
		if chain.RPCURL != "" && chain.ContractAddress != "" {
			chains = append(chains, chain)
		}
	}

	return chains
}

// loadConfig loads configuration from file and environment variables
func loadConfig(configPath string) (*Config, error) {
	// Load .env file if it exists
	_ = godotenv.Load()

	var config Config

	// First try to load from file
	if _, err := os.Stat(configPath); err == nil {
		file, err := os.ReadFile(configPath)
		if err != nil {
			return nil, fmt.Errorf("error reading config file: %w", err)
		}

		if err := json.Unmarshal(file, &config); err != nil {
			return nil, fmt.Errorf("error parsing config file: %w", err)
		}
	}

	// Override with environment variables
	overrideFromEnv(&config)

	// Set default values
	setDefaults(&config)

	// Validate configuration
	if err := validateConfig(&config); err != nil {
		return nil, fmt.Errorf("invalid configuration: %w", err)
	}

	return &config, nil
}

func overrideFromEnv(config *Config) {
	// Override global settings
	if sig := os.Getenv("EVENT_SIGNATURE"); sig != "" {
		config.EventSignature = sig
	}
	if interval := os.Getenv("RECONNECT_INTERVAL"); interval != "" {
		if dur, err := time.ParseDuration(interval); err == nil {
			config.ReconnectInterval = dur
		}
	}
	if retries := os.Getenv("MAX_RETRIES"); retries != "" {
		if max, err := fmt.Sscanf(retries, "%d", &config.MaxRetries); err == nil && max > 0 {
			config.MaxRetries = max
		}
	}

	// Load chains from environment variables
	envChains := loadChainsFromEnv()
	if len(envChains) > 0 {
		// If chains are defined in env, use them instead of config file
		config.SourceChains = envChains
	}

	// Override warden chain
	if name := os.Getenv("WARDEN_NAME"); name != "" {
		config.WardenChain.Name = name
	}
	if rpc := os.Getenv("WARDEN_RPC_URL"); rpc != "" {
		config.WardenChain.RPCURL = rpc
	}
	if ism := os.Getenv("WARDEN_ISM_ADDRESS"); ism != "" {
		config.WardenChain.IsmAddress = ism
	}
	if pk := os.Getenv("WARDEN_PRIVATE_KEY"); pk != "" {
		config.WardenChain.PrivateKey = pk
	}
}

func setDefaults(config *Config) {
	if config.ReconnectInterval == 0 {
		config.ReconnectInterval = 5 * time.Second
	}
	if config.MaxRetries == 0 {
		config.MaxRetries = 3
	}
}

func validateConfig(config *Config) error {
	if config.EventSignature == "" {
		return fmt.Errorf("event signature is required")
	}

	if len(config.SourceChains) == 0 {
		return fmt.Errorf("no source chains configured")
	}

	for i, chain := range config.SourceChains {
		if chain.Name == "" {
			return fmt.Errorf("chain %d: name is required", i)
		}
		if chain.RPCURL == "" {
			return fmt.Errorf("chain %s: RPC URL is required", chain.Name)
		}
		if chain.ContractAddress == "" {
			return fmt.Errorf("chain %s: contract address is required", chain.Name)
		}
	}

	if config.WardenChain.RPCURL == "" {
		return fmt.Errorf("warden chain RPC URL is required")
	}

	if config.WardenChain.PrivateKey == "" {
		return fmt.Errorf("warden chain private key is required")
	}

	return nil
}
