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
	"fmt"
	"net/http"
	"os"
	"sync/atomic"
	"time"

	"github.com/sirupsen/logrus"

	"github.com/warden-protocol/wardenprotocol/keychain/pkg/api"
	"github.com/warden-protocol/wardenprotocol/keychain/pkg/common"
	"github.com/warden-protocol/wardenprotocol/keychain/pkg/database"
	"github.com/warden-protocol/wardenprotocol/keychain/pkg/rpc"
)

type Service struct {
	keychainAddr   string
	keychainSigner string
	secrets        secrets
	modules        []api.Module
	server         rpc.HTTPService
	log            *logrus.Entry
	dB             database.Database

	stop    chan struct{}
	stopped atomic.Bool
}

type secrets struct {
	mnemonic string
	password string
}

func New(keychainAddr, keychainSigner, mnemonic, password string, port int, logger *logrus.Entry, db database.Database, modules ...api.Module) *Service {
	s := &Service{
		keychainAddr:   keychainAddr,
		keychainSigner: keychainSigner,
		secrets:        secrets{mnemonic: mnemonic, password: password},
		log:            logger,
		dB:             db,
		modules:        modules,
		stop:           make(chan struct{}, 1),
		stopped:        atomic.Bool{},
	}
	s.server = rpc.NewHTTPService(port, rpc.MakeAPI([]rpc.EndPoint{
		rpc.NewEndpoint(api.StatusEndPnt, http.MethodGet,
			api.WithRateLimit(rateLimitPerSecond, time.Second,
				api.HandleStatusRequest(logger, serviceName))), // /status
		rpc.NewEndpoint(api.HealthEndPnt, http.MethodGet,
			api.WithRateLimit(rateLimitPerSecond, time.Second,
				api.HandleHealthcheckRequest(s.modules, logger, serviceName))), // /healthcheck
		rpc.NewEndpoint(api.KeychainEndPnt, http.MethodGet,
			api.WithRateLimit(rateLimitPerSecond, time.Second,
				api.PasswordProtected(s.secrets.password,
					api.HandleKeychainRequest(logger, s.keychainAddr, s.keychainSigner, serviceName)))), // /keychain
		rpc.NewEndpoint(api.PubKeysEndPnt, http.MethodGet,
			api.WithRateLimit(rateLimitPerSecond, time.Second,
				api.PasswordProtected(s.secrets.password,
					api.HandlePubKeyRequest(logger, s.dB, serviceName)))), // /pubkeys
		rpc.NewEndpoint(api.MnemonicEndPnt, http.MethodGet,
			api.WithRateLimit(rateLimitPerSecond, time.Second,
				api.PasswordProtected(s.secrets.password,
					api.HandleMnemonicRequest(logger, s.secrets.password, s.secrets.mnemonic, serviceName)))), // /mnemonic
	}), logger)
	return s
}

// Start starts the main keychain service
func (s *Service) Start() error {
	s.log.WithFields(logrus.Fields{
		"version":   common.FullVersion,
		"buildDate": common.Date,
	}).Info("starting keychain service")

	var errStr string
	for i, module := range s.modules {
		if err := module.Start(); err != nil {
			s.log.WithError(err).Error("cannot start module")
			errStr += fmt.Sprintf("%v : %v - ", i, err.Error())
		}
	}
	if errStr != "" {
		return fmt.Errorf("%v", errStr)
	}
	// start HTTP server
	s.server.Start()
	return nil
}

// Stop terminates the service killing all subprocesses
func (s *Service) Stop(sig os.Signal) error {
	s.log.WithFields(logrus.Fields{"signal": sig.String()}).Warn("received shutdown signal")

	if s.stopped.Load() {
		s.log.WithFields(logrus.Fields{"signal": sig}).Warn("already shutting down")
		return fmt.Errorf("already shutting down")
	}
	// Stop HTTP server
	if err := s.server.Stop(); err != nil {
		s.log.WithFields(logrus.Fields{"error": err.Error()}).Error("http server error")
	}
	s.stopped.Store(true)
	close(s.stop)
	var errStr string
	for i, module := range s.modules {
		if err := module.Stop(); err != nil {
			s.log.WithFields(logrus.Fields{"error": err.Error()}).Error("cannot stop module")
			errStr += fmt.Sprintf("%v : %v - ", i, err.Error())
		}
	}
	if errStr != "" {
		return fmt.Errorf("%v", errStr)
	}
	s.log.Info("keychain stopped")
	return nil
}
