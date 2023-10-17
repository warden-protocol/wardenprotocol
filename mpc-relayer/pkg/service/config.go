package service

import (
	"bytes"
	"fmt"

	"github.com/qredo/fusionchain/mpc-relayer/pkg/mpc"
	"gopkg.in/yaml.v3"
)

// ServiceConfig represents the main application configuration struct.
// Example YAML config can be founs in github.com/qredo/fusionchain/mpc-relayer/docker-compose/config-example.yaml
type ServiceConfig struct {
	Port          int        `yaml:"port"`
	Path          string     `yaml:"path"`
	KeyRingID     string     `yaml:"keyring_id"`
	ChainID       string     `yaml:"chain_id"`
	FusionURL     string     `yaml:"fusion_url"`
	Mnemonic      string     `yaml:"mnemonic"`
	LogLevel      string     `yaml:"loglevel"`
	LogFormat     string     `yaml:"logformat"`
	LogToFile     bool       `yaml:"logtofile"`
	MPC           mpc.Config `yaml:"mpc"`
	QueryInterval int64      `yaml:"query_interval"`
	RetrySleep    int64      `yaml:"retrySleep"`
	MaxTries      int64      `yaml:"maxTries"`
}

var emptyConfig = ServiceConfig{}

func isEmpty(c ServiceConfig) bool {
	b, _ := yaml.Marshal(c)
	e, _ := yaml.Marshal(emptyConfig)
	return bytes.Equal(b, e)
}

// sanitizeConfig Partially empty configs will be sanitized with default values.
func sanitizeConfig(config ServiceConfig) (cfg ServiceConfig, err error) {
	if isEmpty(config) {
		err = fmt.Errorf("no config file supplied")
		return
	}
	mpcConfig := config.MPC
	if len(mpcConfig.Node) == 0 && !mpcConfig.Mock {
		err = fmt.Errorf("invalid (empty) mpc config")
		return
	}
	cfg = config

	if config.MaxTries == 0 {
		cfg.MaxTries = defaultMaxRetries
	}

	if config.QueryInterval == 0 {
		cfg.QueryInterval = defaultQueryInterval
	}

	if config.Port == 0 {
		cfg.Port = defaultPort
	}

	if config.FusionURL == "" {
		cfg.FusionURL = defaultFusionURL
	}

	if config.ChainID == "" {
		cfg.FusionURL = defaultFusionChainID
	}
	return
}
