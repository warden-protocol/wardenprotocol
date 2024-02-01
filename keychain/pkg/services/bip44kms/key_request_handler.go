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
	"context"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"sync"
	"time"

	"github.com/sirupsen/logrus"

	"github.com/warden-protocol/wardenprotocol/keychain/pkg/api"
	"github.com/warden-protocol/wardenprotocol/keychain/pkg/common"
	"github.com/warden-protocol/wardenprotocol/keychain/pkg/database"
	"github.com/warden-protocol/wardenprotocol/keychain/pkg/wardenclient"
	"github.com/warden-protocol/wardenprotocol/x/treasury/types"
)

type keyController struct {
	KeychainAddr       string
	queue              chan *keyRequestQueueItem
	tracker            sync.Map
	keyRequestsHandler KeyRequestsHandler
	log                *logrus.Entry
	threads            chan struct{}
	stop               chan struct{}
	wait               chan struct{}

	retrySleep time.Duration
}

func newWardenKeyController(logger *logrus.Entry, prefixDB database.Database, q chan *keyRequestQueueItem, keychainClient Keychain, txc wardenclient.TxClient) *keyController {
	k := &WardenKeyRequestHandler{
		KeyDB:          prefixDB,
		keychainClient: keychainClient,
		TxClient:       txc,
		Logger:         logger,
	}

	return &keyController{
		queue:              q,
		tracker:            sync.Map{},
		keyRequestsHandler: k,
		log:                logger,
		threads:            makeThreads(defaultThreads),
		stop:               make(chan struct{}, 1),
		wait:               make(chan struct{}, 1),
		retrySleep:         defaultRetryTimeout,
	}
}

// Start implements Module.Start()
func (k *keyController) Start() error {
	if k.queue == nil || k.stop == nil {
		return fmt.Errorf("empty work channels")
	}
	k.log.WithField("threads", len(k.threads)).Info("starting keyRequestHandler")
	go k.startExecutor()
	return nil
}

func (k *keyController) startExecutor() {
	for {
		select {
		case <-k.stop:
			k.log.Debug("keyController received shutdown signal")
			for i := 0; i < defaultThreads; i++ {
				<-k.threads // empty thread chan
			}
			k.log.Debug("terminated keyController")
			k.wait <- struct{}{}
			return
		case item := <-k.queue:
			if !k.itemProcessing(item.request.Id, item.retries) {
				k.tracker.Store(item.request.Id, true)
				go func() {
					<-k.threads
					i := item
					defer func() { k.threads <- struct{}{} }()
					if err := k.executeRequest(i); err != nil {
						k.log.WithFields(logrus.Fields{
							"retries": i.retries,
							"error":   err.Error(),
						}).Error("keyRequestErr")
					} else {
						k.tracker.Delete(i.request.Id)
					}
				}()
			}
		}
	}
}

func (k *keyController) itemProcessing(id uint64, tries int) (ok bool) {
	if tries == 0 {
		_, ok = k.tracker.Load(id)
	}
	return ok
}

// Stop implements Module.Stop()
func (k *keyController) Stop() error {
	k.stop <- struct{}{}
	<-k.wait
	return nil
}

func (k *keyController) executeRequest(item *keyRequestQueueItem) error {
	ctx, cancelFunc := context.WithTimeout(context.Background(), defaultHandlerTimeout)
	defer cancelFunc()
	if err := k.keyRequestsHandler.HandleKeyRequests(ctx, item); err != nil {
		if item.retries <= item.maxTries {
			requeueKeyItemWithTimeout(k.queue, item, k.retrySleep) // Requeue items until maxTries limit has been reached
		}
		return err
	}
	return nil
}

func (k *keyController) Healthcheck() *api.HealthResponse {
	return k.keyRequestsHandler.Healthcheck()
}

type keyRequestQueueItem struct {
	retries  int
	maxTries int
	request  *types.KeyRequest
}

type KeyRequestsHandler interface {
	HandleKeyRequests(ctx context.Context, item *keyRequestQueueItem) error
	Healthcheck() *api.HealthResponse
}

// WardenKeyRequestHandler implements KeyRequestsHandler.
type WardenKeyRequestHandler struct {
	KeyDB          database.Database
	keychainClient Keychain
	TxClient       wardenclient.TxClient
	Logger         *logrus.Entry
}

var _ KeyRequestsHandler = &WardenKeyRequestHandler{}

// HandleKeyRequests processes the pending key request supplied by wardend, requesting a public key
// via the client and fulfilling the request via the TxClient.
func (h *WardenKeyRequestHandler) HandleKeyRequests(ctx context.Context, item *keyRequestQueueItem) error {
	if item == nil || item.request == nil {
		return fmt.Errorf("malformed keyRequest item")
	}
	start := time.Now()

	// make 64 character keyID from the ID supplied for the keys request
	keyIDStr := fmt.Sprintf("%0*x", keyIDLength, item.request.Id)

	keyID, err := hex.DecodeString(keyIDStr)
	if err != nil {
		return err
	}
	cryptoSys := ECDSA
	if item.request.KeyType == types.KeyType_KEY_TYPE_EDDSA_ED25519 {
		cryptoSys = EDDSA
	}

	// Request an ECDSA/EdDSA public key from the service
	pk, err := h.keychainClient.PublicKey(keyID, cryptoSys)
	if err != nil {
		return err
	}
	h.Logger.WithFields(logrus.Fields{
		"keyID":     keyIDStr,
		"publicKey": fmt.Sprintf("%x", pk),
	}).Debug("pubKeyReturned")

	// Verify that a signature can be generated for the supplied public key.
	// The response is validated inside the keychainClient.
	if _, err = h.keychainClient.PubkeySignature(keyID, cryptoSys); err != nil {
		return err
	}

	// Approve the user item.request, write the generated public key to wardend.
	if err = h.TxClient.FulfilKeyRequest(ctx, item.request.Id, pk); err != nil {
		return err
	}

	// Store the generated secret key in our database, will be used when user requests signatures.
	if err = makePkEntry(h.KeyDB, keyIDStr, fmt.Sprintf("%x", pk), string(cryptoSys)); err != nil {
		return err
	}
	h.Logger.WithFields(logrus.Fields{
		"timeTaken": common.RoundFloat(time.Since(start).Seconds(), 2),
	}).Info("keyRequestFulfilled")
	return nil
}

func (*WardenKeyRequestHandler) Healthcheck() *api.HealthResponse {
	return &api.HealthResponse{}
}

func makePkEntry(db database.Database, keyIDStr, pkStr, cryptoSys string) error {
	k := makeDBKey(keyIDStr)
	v, err := json.Marshal(&api.PkData{
		PublicKey: pkStr,
		Type:      cryptoSys,
		Created:   time.Now().Format(time.RFC3339),
	})
	if err != nil {
		return err
	}
	if err := db.Persist(k, v); err != nil {
		return err
	}
	return nil
}

func makeDBKey(keyID string) string {
	return fmt.Sprintf("%s%s", pkPrefix, keyID)
}
