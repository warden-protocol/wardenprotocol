// Copyright 2024
//
// This file includes work covered by the following copyright and permission notices:
//
// Copyright 2023 Qredo Ltd.
// Licensed under the Apache License, Version 2.0;
//
// This file is part of the Warden Protocol library.
//
// The Warden Protocol library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Warden Protocol library. If not, see https://github.com/warden-protocol/wardenprotocol/blob/main/LICENSE
package kms

import (
	"bytes"
	"time"

	"gopkg.in/yaml.v3"
)

const (
	serviceName = "wardenkms"
)

var (
	// Config vars
	defaultPort = 8080

	defaultWardenURL        = "localhost:9090"
	defaultWardenProtocolID = "wardenprotocol_121-1"
	defaultKeychain          = "wardenkeychain1ph63us46lyw56lmt585"

	defaultHandlerTimeout = 60 * time.Second
	defaultQueryTimeout   = 5 * time.Second

	defaultMaxRetries    int64 = 10
	defaultQueryInterval int64 = 5

	defaultRetryTimeout = 5 * time.Second

	defaultChanSize = 1000

	defaultPageLimit uint64 = 10

	defaultThreads = 2
)

// ServiceConfig represents the main application configuration struct.
type ServiceConfig struct {
	Port          int    `yaml:"port"`
	Path          string `yaml:"path"`
	Keychain       string `yaml:"keychain"`
	ChainID       string `yaml:"chainid"`
	WardenURL     string `yaml:"wardenurl"`
	Password      string `yaml:"password"` // User supplied passphrase.
	Mnemonic      string `yaml:"mnemonic"` // (Optional) The user can supply a mnemonic or one will be generated.
	LogLevel      string `yaml:"loglevel"`
	LogFormat     string `yaml:"logformat"`
	LogToFile     bool   `yaml:"logtofile"`
	QueryInterval int64  `yaml:"queryinterval"`
	RetrySleep    int64  `yaml:"retrySleep"`
	MaxTries      int64  `yaml:"maxTries"`
}

var emptyConfig = ServiceConfig{}

var defaultConfig = ServiceConfig{
	Port:          defaultPort,
	Path:          "", // If no path is supplied an in-memory key-value store will be used
	LogLevel:      "info",
	LogFormat:     "plain",
	LogToFile:     false,
	Keychain:       defaultKeychain,
	ChainID:       defaultWardenProtocolID,
	WardenURL:     defaultWardenURL,
	Mnemonic:      "", // will be generated if no supplied by the user
	Password:      "", // must be user supplied
	QueryInterval: defaultQueryInterval,
	MaxTries:      defaultMaxRetries,
}

func isEmpty(c ServiceConfig) bool {
	b, _ := yaml.Marshal(c)
	e, _ := yaml.Marshal(emptyConfig)
	return bytes.Equal(b, e)
}

// sanitizeConfig Partially empty configs will be sanitized with default values.
func sanitizeConfig(config ServiceConfig) (cfg ServiceConfig, defaultUsed bool) {
	if isEmpty(config) {
		defaultUsed = true
		cfg = defaultConfig
		return
	}
	cfg = config

	if config.Port == 0 {
		cfg.Port = defaultPort
	}

	if config.LogLevel == "" {
		cfg.LogLevel = "info"
	}

	if config.LogFormat == "" {
		cfg.LogFormat = "plain"
	}

	if config.Keychain == "" {
		cfg.Keychain = defaultKeychain
	}

	if config.WardenURL == "" {
		cfg.WardenURL = defaultWardenURL
	}

	if config.ChainID == "" {
		cfg.ChainID = defaultWardenProtocolID
	}

	if config.QueryInterval == 0 {
		cfg.QueryInterval = defaultQueryInterval
	}

	if config.MaxTries == 0 {
		cfg.MaxTries = defaultMaxRetries
	}
	return
}
