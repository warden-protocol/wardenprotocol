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
	"errors"
	"os"
	"testing"

	"github.com/warden-protocol/wardenprotocol/keychain/pkg/api"
	"github.com/warden-protocol/wardenprotocol/keychain/pkg/logger"
)

var testConfig = ServiceConfig{
	Port:      8080,
	Keychain:   "wardenkeychain1ph63us46lyw56lmt585",
	LogLevel:  "fatal",
	LogFormat: "plain",
	LogToFile: false,
	Mnemonic:  "exclude try nephew main caught favorite tone degree lottery device tissue tent ugly mouse pelican gasp lava flush pen river noise remind balcony emerge",
}

var (
	tests = []struct {
		name                        string
		config                      ServiceConfig
		modules                     []api.Module
		buildErr, startErr, stopErr bool
	}{
		{
			"empty config",
			ServiceConfig{},
			nil,
			false,
			false,
			false,
		},
		{
			"no mnemonic",
			ServiceConfig{
				Port:      8080,
				Keychain:   "wardenkeychain1ph63us46lyw56lmt585",
				LogLevel:  "fatal",
				LogFormat: "plain",
				LogToFile: false,
			},
			nil,
			false,
			false,
			false,
		},
		{
			"with mnemonic",
			ServiceConfig{
				Port:      8080,
				Keychain:   "wardenkeychain1ph63us46lyw56lmt585",
				LogLevel:  "fatal",
				LogFormat: "plain",
				LogToFile: false,
				Mnemonic:  testMnemonic,
			},
			nil,
			false,
			false,
			false,
		},
		{
			"no modules",
			testConfig,
			nil,
			false,
			false,
			false,
		},
		{
			"single module",
			testConfig,
			[]api.Module{mockModule{}},
			false,
			false,
			false,
		},
		{
			"multiple module",
			testConfig,
			[]api.Module{mockModule{}, mockModule{}},
			false,
			false,
			false,
		},
		{
			"module with error",
			testConfig,
			[]api.Module{mockModuleErr{}},
			false,
			true,
			true,
		},
	}

	configTests = []struct {
		name     string
		config   ServiceConfig
		buildErr bool
	}{
		{
			"empty config",
			emptyConfig,
			false,
		},
		{
			"default config",
			defaultConfig,
			false,
		},
		{
			"invalid log parameters",
			ServiceConfig{
				LogLevel: "fatall",
			},
			true,
		},
	}
)

type mockModule struct{}

func (m mockModule) Start() error {
	return nil
}

func (m mockModule) Stop() error {
	return nil
}

func (m mockModule) Healthcheck() *api.HealthResponse {
	return &api.HealthResponse{}
}

type mockModuleErr struct{}

func (m mockModuleErr) Start() error {
	return errors.New("error")
}

func (m mockModuleErr) Stop() error {
	return errors.New("error")
}

func (m mockModuleErr) Healthcheck() *api.HealthResponse {
	return &api.HealthResponse{Failures: []string{"some failure"}}
}

func Test_ServiceStartStop(t *testing.T) {
	// build service with different 'module' combinations
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			s, err := buildTestService(t, tt.config, tt.modules...)
			if (err != nil) != tt.buildErr {
				t.Fatalf("unexpected build error %v", err)
			}
			if err != nil {
				return
			}
			if err := s.Start(); (err != nil) != tt.startErr {
				t.Fatalf("unexpected start error %v", err)
			}
			if err := s.Stop(os.Interrupt); (err != nil) != tt.stopErr {
				t.Fatalf("unexpected stop error %v", err)
			}
		})
	}

}

func Test_ConfigTypes(t *testing.T) {
	// build service with different config types
	for _, tt := range configTests {
		t.Run(tt.name, func(t *testing.T) {
			_, err := BuildService(tt.config)
			if (err != nil) != tt.buildErr {
				t.Fatalf("unexpected build error %v", err)
			}
		})
	}

}

func buildTestService(t *testing.T, config ServiceConfig, modules ...api.Module) (*Service, error) {

	config, _ = sanitizeConfig(config)

	log, err := logger.NewLogger(logger.Level(config.LogLevel), logger.Format(config.LogFormat), config.LogToFile, "test")
	if err != nil {
		return nil, err
	}
	memoryKeyDB, err := makeDB("", true)
	if err != nil {
		t.Fatal(err)
	}
	keychainAddr, mn, p, i, _, err := makeKeychainClient(&config, log, memoryKeyDB)
	if err != nil {
		return nil, err
	}

	return New(keychainAddr, i.Address.String(), mn, p, config.Port, log, memoryKeyDB, modules...), nil
}
