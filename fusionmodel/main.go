// Copyright 2023 Qredo Ltd.
// This file is part of the Fusion library.
//
// The Fusion library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Fusion library. If not, see https://github.com/qredo/fusionchain/blob/main/LICENSE
package main

import (
	"bytes"
	"flag"
	"fmt"
	"os"
	"os/signal"

	"github.com/qredo/fusionchain/keyring/pkg/common"
	"github.com/qredo/fusionchain/keyring/pkg/logger"
	"github.com/qredo/fusionchain/keyring/pkg/rpc"
	"github.com/sirupsen/logrus"
	"gopkg.in/yaml.v3"
)

const (
	serviceName = "fusionmodel"
	envPrefix   = "FUSIONMODEL"
)

var (
	configFilePath string
	configFilePtr  = flag.String("config", "config.yml", "path to config file")
)

// go run main.go --config ./config.yml
// go run main.go --config {path_to_config_file}

func init() {
	// Parse flag containing path to config file
	flag.Parse()
	if configFilePtr != nil {
		configFilePath = *configFilePtr
	}
}

func main() {

	var cfg Config

	if err := common.ParseYAMLConfig(configFilePath, &cfg, envPrefix); err != nil {
		panic(fmt.Errorf("parse config error: %v", err))
	}
	config := sanitizeConfig(&cfg)

	log, err := logger.NewLogger(logger.Level(config.Loglevel), logger.Format(config.Logformat), false, "fusionmodel")
	if err != nil {
		panic(err)
	}

	fusionModel := newService(config, log)

	if err := fusionModel.start(); err != nil {
		log.Fatal(fmt.Errorf("start service error: %v", err))
	}
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt)
	sig := <-sigChan
	if err := fusionModel.stop(sig); err != nil {
		log.Fatal(err)
	}

}

type Service struct {
	config *Config
	log    *logrus.Entry
	server rpc.HTTPService
}

type Config struct {
	Port           int    `yaml:"port"`
	Loglevel       string `yaml:"loglevel"`
	Logformat      string `yaml:"logformat"`
	Creator        string `yaml:"creator"`
	KeyId          string `yaml:"key_id"`
	DataForSigning string `yaml:"data_for_signing"`
}

var (
	emptyConfig           = Config{}
	defaultPort           = 8000
	defaultLogLevel       = "info"
	defaultLogFormat      = "plain"
	defaultCreator        = "qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j"
	defaultKeyID          = "0000000000000000000000000000000000000000000000000000000000000001"
	defaultDataForSigning = "tSR4wa1srbASeiRWjzEKKC1PgSuPBuzuWosOEdj3NB0="
	defaultConfig         = Config{
		Port:           defaultPort,
		Loglevel:       defaultLogLevel,
		Logformat:      defaultLogFormat,
		Creator:        defaultCreator,
		KeyId:          defaultKeyID,
		DataForSigning: defaultDataForSigning,
	}
)

func isEmpty(c *Config) bool {
	b, _ := yaml.Marshal(c)
	e, _ := yaml.Marshal(emptyConfig)
	return bytes.Equal(b, e)
}

// sanitizeConfig Partially empty configs will be sanitized with default values.
func sanitizeConfig(config *Config) (cfg *Config) {
	if isEmpty(config) {
		println("no config file supplied, using default")
		cfg = &defaultConfig
		return
	}
	cfg = config

	if config.Port == 0 {
		cfg.Port = defaultPort
	}

	if config.Loglevel == "" {
		cfg.Loglevel = defaultLogLevel
	}

	if config.Logformat == "" {
		cfg.Logformat = defaultLogFormat
	}

	if config.Creator == "" {
		cfg.Creator = defaultCreator
	}

	if config.KeyId == "" {
		cfg.KeyId = defaultKeyID
	}

	if config.DataForSigning == "" {
		cfg.DataForSigning = defaultDataForSigning
	}
	return
}

func newService(cfg *Config, log *logrus.Entry) *Service {
	s := &Service{
		config: cfg,
		log:    log,
	}
	httpServer := rpc.NewHTTPService(cfg.Port, makeAPIHandlers(s), log)
	s.server = httpServer
	return s
}

// Start starts the main mpc-relayer service
func (s *Service) start() error {
	s.log.WithFields(logrus.Fields{
		"version":   common.FullVersion,
		"buildDate": common.Date,
	}).Info("starting fusionmodel service")
	// start HTTP server
	s.server.Start()
	return nil
}

// Stop terminates the MPC relayer service killing all subprocesses
func (s *Service) stop(sig os.Signal) error {
	s.log.WithFields(logrus.Fields{"signal": sig.String()}).Warn("received shutdown signal")
	// Stop HTTP server
	if err := s.server.Stop(); err != nil {
		s.log.WithFields(logrus.Fields{"error": err.Error()}).Error("http server error")
	}
	s.log.Info("fusionmodel stopped")
	return nil
}
