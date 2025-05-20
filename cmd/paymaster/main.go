package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"os"
	"os/signal"
	"sync"
	"syscall"
	"time"

	"math/big"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
)

func main() {
	configPath := flag.String("config", "config.json", "path to configuration file")
	flag.Parse()

	// Load configuration
	config, err := loadConfig(*configPath)
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	// Create context that will be canceled on SIGINT/SIGTERM
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// Handle graceful shutdown
	sigCh := make(chan os.Signal, 1)
	signal.Notify(sigCh, syscall.SIGINT, syscall.SIGTERM)
	go func() {
		<-sigCh
		log.Println("Received shutdown signal")
		cancel()
	}()

	// Create error channel to receive errors from chain listeners
	errCh := make(chan error, len(config.SourceChains))

	// Start event listeners for each source chain
	var wg sync.WaitGroup
	for _, chain := range config.SourceChains {
		wg.Add(1)
		go func(chain SourceChainConfig) {
			defer wg.Done()
			if err := listenToEvents(ctx, chain, config); err != nil {
				cancel() // Cancel context to stop other listeners first
				errCh <- fmt.Errorf("chain %s: %w", chain.Name, err)
			}
		}(chain)
	}

	// Create a channel to signal when all listeners are done
	doneCh := make(chan struct{})
	go func() {
		wg.Wait()
		close(doneCh)
	}()

	// Wait for either an error, context cancellation, or all listeners done
	select {
	case err := <-errCh:
		// Wait for all listeners to finish before exiting
		<-doneCh
		log.Fatalf("Event listener failed: %v", err)
	case <-ctx.Done():
		// Wait for all listeners to finish before exiting
		<-doneCh
		log.Println("Shutting down...")
	}
}

func listenToEvents(ctx context.Context, chain SourceChainConfig, config *Config) error {
	var client *ethclient.Client
	var err error
	retryCount := 0

	for {
		select {
		case <-ctx.Done():
			return nil
		default:
			if client == nil {
				client, err = ethclient.Dial(chain.RPCURL)
				if err != nil {
					log.Printf("Failed to connect to chain %s: %v", chain.Name, err)
					retryCount++
					if retryCount >= config.MaxRetries {
						return fmt.Errorf("max retries exceeded for chain %s", chain.Name)
					}
					time.Sleep(config.ReconnectInterval)
					continue
				}
				retryCount = 0
			}

			if err := subscribeAndListen(ctx, client, chain, config.EventSignature); err != nil {
				log.Printf("Error in subscription for chain %s: %v", chain.Name, err)
				client.Close()
				client = nil
				retryCount++
				if retryCount >= config.MaxRetries {
					return fmt.Errorf("max retries exceeded for chain %s", chain.Name)
				}
				time.Sleep(config.ReconnectInterval)
				continue
			}
		}
	}
}

func subscribeAndListen(ctx context.Context, client *ethclient.Client, chain SourceChainConfig, eventSignature string) error {
	contractAddress := common.HexToAddress(chain.ContractAddress)
	eventHash := crypto.Keccak256Hash([]byte(eventSignature))

	query := ethereum.FilterQuery{
		FromBlock: big.NewInt(int64(chain.FromBlock)),
		Addresses: []common.Address{contractAddress},
		Topics:    [][]common.Hash{{eventHash}},
	}

	logs := make(chan types.Log)
	sub, err := client.SubscribeFilterLogs(ctx, query, logs)
	if err != nil {
		return fmt.Errorf("failed to subscribe to logs: %w", err)
	}
	defer sub.Unsubscribe()

	log.Printf("Started listening to events on chain %s", chain.Name)

	for {
		select {
		case err := <-sub.Err():
			return fmt.Errorf("subscription error: %w", err)
		case vLog := <-logs:
			// TODO: Process the event and call Warden chain contract
			log.Printf("Received event on chain %s: %+v", chain.Name, vLog)
		case <-ctx.Done():
			return nil
		}
	}
}
