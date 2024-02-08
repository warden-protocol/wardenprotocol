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
	"time"

	"github.com/cosmos/cosmos-sdk/crypto/hd"
	"github.com/sirupsen/logrus"
	"github.com/warden-protocol/wardenprotocol/go-client"
	"github.com/warden-protocol/wardenprotocol/keychain/pkg/database"
	"github.com/warden-protocol/wardenprotocol/keychain/pkg/logger"
	"github.com/warden-protocol/wardenprotocol/keychain/pkg/wardenclient"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

// BuildService constructs the main application based on supplied config parameters
func BuildService(config ServiceConfig) (*Service, error) {
	cfg, useDefault := sanitizeConfig(config) // set default values is none supplied

	log, err := logger.NewLogger(logger.Level(cfg.LogLevel), logger.Format(cfg.LogFormat), cfg.LogToFile, serviceName)
	if err != nil {
		return nil, err
	}
	if useDefault {
		log.Info("no config file supplied, using default values")
	}

	// Use in-memory database if no path provided
	inMem := cfg.Path == ""
	if inMem {
		log.Info("creating in-memory key-value store. Your keychain data will not be persisted.")
	}
	dB, err := makeDB(cfg.Path, inMem)
	if err != nil {
		return nil, err
	}

	keychainAddr, mnemonic, password, identity, keychainClient, err := makeKeychainClient(&cfg, log, dB)
	if err != nil {
		return nil, err
	}

	// Warn users is no password has been supplied
	if password == "" {
		log.Warn("WARNING! NO PASSWORD HAS BEEN SUPPLIED. YOUR PRIVATE KEY DATA IS NOT SECURE.")
	}

	queryClient, txClient, err := makeWardenGRPCClient(&cfg, identity)
	if err != nil {
		return nil, err
	}

	// make modules
	keyChan := make(chan *keyRequestQueueItem, defaultChanSize)
	sigchan := make(chan *signatureRequestQueueItem, defaultChanSize)
	return New(keychainAddr, identity.Address.String(), mnemonic, password, cfg.Port, log, dB,
		newKeyQueryProcessor(keychainAddr, queryClient, keyChan, log, time.Duration(cfg.QueryInterval)*time.Second, int(cfg.MaxTries)),
		newSigQueryProcessor(keychainAddr, queryClient, sigchan, log, time.Duration(cfg.QueryInterval)*time.Second, int(cfg.MaxTries)),
		newWardenKeyController(log, dB, keyChan, keychainClient, txClient),
		newWardenSignatureController(log, dB, sigchan, keychainClient, txClient),
	), nil
}

func makeDB(path string, inMemory bool) (database.Database, error) {
	kv, err := database.NewBadger(path, inMemory)
	if err != nil {
		return nil, err
	}
	return database.NewPrefixDB("", kv), nil
}

func makeKeychainClient(config *ServiceConfig, log *logrus.Entry, dB database.Database) (keychainAddr, mnemonic, password string, identity client.Identity, keychain Keychain, err error) {
	keychainAddr = config.Keychain
	password = config.Password

	// A mnemonic seed value in the database supersedes all other values
	mnDB, err := dB.Get(mnemonicKey)
	if err == database.ErrNotFound || string(mnDB) == "" {
		mnemonic = config.Mnemonic // ENV or YAML var
		if mnemonic == "" {
			// If no mnemonic ENV VAR is supplied, create a new one
			// Note that the mnemonic is NOT persistently stored
			// Once created it can only be accessed via the '/mnemonic' endpoint
			mnemonic, err = GenerateMnemonic()
			if err != nil {
				return
			}
		}
		// Save to database
		if err = dB.Persist(mnemonicKey, []byte(mnemonic)); err != nil {
			return
		}
	} else {
		mnemonic = string(mnDB)
	}
	// log if running in debug mode
	log.WithField("mnemonic", mnemonic).Debug("seed phrase")

	keychain, err = NewBip44Keychain(mnemonic, password)
	if err != nil {
		return
	}

	identity, err = client.NewIdentityFromSeed(hd.BIP44Params{Purpose: 44, CoinType: 118, Account: 0, Change: false, AddressIndex: 0}.String(), mnemonic)
	if err != nil {
		return
	}
	return
}

func makeWardenGRPCClient(config *ServiceConfig, identity client.Identity) (wardenclient.QueryClient, wardenclient.TxClient, error) {
	wardenGRPCClient, err := grpc.Dial(
		config.WardenURL,
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	)
	if err != nil {
		return nil, nil, err
	}
	queryClient := client.NewQueryClientWithConn(wardenGRPCClient)
	txClient := client.NewTxClient(identity, config.ChainID, wardenGRPCClient, queryClient)
	return queryClient, txClient, nil
}
