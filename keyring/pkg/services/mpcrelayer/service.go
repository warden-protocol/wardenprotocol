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
package mpcrelayer

import (
	"fmt"
	"net/http"
	"os"
	"sync/atomic"
	"time"

	"github.com/sirupsen/logrus"

	"github.com/qredo/fusionchain/keyring/pkg/api"
	"github.com/qredo/fusionchain/keyring/pkg/common"
	"github.com/qredo/fusionchain/keyring/pkg/database"
	"github.com/qredo/fusionchain/keyring/pkg/rpc"
)

type Service struct {
	keyringAddr   string
	keyringSigner string
	secrets       secrets
	modules       []api.Module
	server        rpc.HTTPService
	log           *logrus.Entry
	dB            database.Database

	stop    chan struct{}
	stopped atomic.Bool
}

type secrets struct {
	mnemonic string
	password string
}

func New(keyringAddr, keyRingSigner, mnemonic, password string, port int, logger *logrus.Entry, dB database.Database, modules ...api.Module) *Service {
	s := &Service{
		keyringAddr:   keyringAddr,
		keyringSigner: keyRingSigner,
		log:           logger,
		secrets:       secrets{mnemonic: mnemonic, password: password},
		dB:            dB,
		modules:       modules,
		stop:          make(chan struct{}, 1),
		stopped:       atomic.Bool{},
	}
	s.server = rpc.NewHTTPService(port, rpc.MakeAPI([]rpc.EndPoint{
		rpc.NewEndpoint(api.StatusEndPnt, http.MethodGet,
			api.WithRateLimit(rateLimitPerSecond, time.Second,
				api.HandleStatusRequest(logger, serviceName))), // /status
		rpc.NewEndpoint(api.HealthEndPnt, http.MethodGet,
			api.WithRateLimit(rateLimitPerSecond, time.Second,
				api.HandleHealthcheckRequest(s.modules, logger, serviceName))), // /healthcheck
		rpc.NewEndpoint(api.KeyringEndPnt, http.MethodGet,
			api.WithRateLimit(rateLimitPerSecond, time.Second,
				api.PasswordProtected(s.secrets.password,
					api.HandleKeyringRequest(logger, s.keyringAddr, s.keyringSigner, serviceName)))), // /keyring
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

// Start starts the main keyring service
func (s *Service) Start() error {
	s.log.WithFields(logrus.Fields{
		"version":   common.FullVersion,
		"buildDate": common.Date,
	}).Info("starting keyring service")

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

// Stop terminates the MPC relayer service killing all subprocesses
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
	s.log.Info("keyring stopped")
	return nil
}
