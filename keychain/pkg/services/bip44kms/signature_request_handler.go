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

	"github.com/warden-protocol/wardenprotocol/keychain/pkg/api"
	"github.com/warden-protocol/wardenprotocol/keychain/pkg/common"
	"github.com/warden-protocol/wardenprotocol/keychain/pkg/database"
	"github.com/warden-protocol/wardenprotocol/keychain/pkg/wardenclient"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types"
	"github.com/sirupsen/logrus"
)

type signatureController struct {
	queue                    chan *signatureRequestQueueItem
	tracker                  sync.Map
	signatureRequestsHandler SignatureRequestsHandler
	log                      *logrus.Entry

	threads    chan struct{}
	stop       chan struct{}
	wait       chan struct{}
	retrySleep time.Duration
}

type signatureRequestQueueItem struct {
	retries  int
	maxTries int
	request  *types.SignRequest
}

func newWardenSignatureController(logger *logrus.Entry, prefixDB database.Database, q chan *signatureRequestQueueItem, keychainClient Keychain, txc wardenclient.TxClient) *signatureController {
	s := &WardenSignatureRequestHandler{
		KeyDB:          prefixDB,
		keychainClient: keychainClient,
		TxClient:       txc,
		Logger:         logger,
	}
	return &signatureController{
		queue:                    q,
		signatureRequestsHandler: s,
		tracker:                  sync.Map{},
		log:                      logger,
		threads:                  makeThreads(defaultThreads),
		stop:                     make(chan struct{}, 1),
		wait:                     make(chan struct{}, 1),
		retrySleep:               defaultRetryTimeout,
	}
}

// Start implements Module.Start()
func (s *signatureController) Start() error {
	if s.queue == nil || s.stop == nil {
		return fmt.Errorf("empty work channels")
	}
	s.log.WithField("threads", len(s.threads)).Info("starting sigRequestHandler")
	go s.startExecutor()
	return nil
}

func (s *signatureController) startExecutor() {
	for {
		select {
		case <-s.stop:
			s.log.Debug("signatureController received shutdown signal")
			for i := 0; i < defaultThreads; i++ {
				<-s.threads // empty thread chan
			}
			s.log.Debug("terminated signatureController")
			s.wait <- struct{}{}
			return
		case item := <-s.queue:
			// process queue items async
			// check whether the item already being processed
			if !s.itemProcessing(item.request.Id, item.retries) {
				s.tracker.Store(item.request.Id, true)
				go func() {
					it := item
					<-s.threads
					defer func() { s.threads <- struct{}{} }()
					if err := s.executeRequest(it); err != nil {
						s.log.WithFields(logrus.Fields{
							"requestID": it.request.Id,
							"retries":   it.retries,
							"error":     err.Error(),
						}).Error("signRequestErr")
					} else {
						s.tracker.Delete(it.request.Id)
					}
				}()
			}
		}
	}
}

func (s *signatureController) itemProcessing(id uint64, tries int) (ok bool) {
	if tries == 0 {
		_, ok = s.tracker.Load(id)
	}
	return ok
}

// Stop implements Module.Stop()
func (s *signatureController) Stop() error {
	s.stop <- struct{}{}
	<-s.wait
	return nil
}

func (s *signatureController) executeRequest(item *signatureRequestQueueItem) error {
	ctx, cancelFunc := context.WithTimeout(context.Background(), defaultHandlerTimeout)
	defer cancelFunc()
	if err := s.signatureRequestsHandler.HandleSignatureRequest(ctx, item); err != nil {
		if item.retries <= item.maxTries {
			requeueSigItemWithTimeout(s.queue, item, s.retrySleep)
		}
		return err
	}
	return nil
}

func (s *signatureController) Healthcheck() *api.HealthResponse {
	return s.signatureRequestsHandler.Healthcheck()
}

type SignatureRequestsHandler interface {
	HandleSignatureRequest(ctx context.Context, item *signatureRequestQueueItem) error
	Healthcheck() *api.HealthResponse
}

// WardenSignatureRequestHandler implements SignatureRequestsHandler.
type WardenSignatureRequestHandler struct {
	KeyDB          database.Database
	keychainClient Keychain
	TxClient       wardenclient.TxClient
	Logger         *logrus.Entry
}

var _ SignatureRequestsHandler = &WardenSignatureRequestHandler{}

// HandleSignatureRequest processes the pending sign request supplied by wardend, requesting a signature from
// the client for the supplied keyID and requestID and fulfilling the request via the TxClient.
func (h *WardenSignatureRequestHandler) HandleSignatureRequest(ctx context.Context, item *signatureRequestQueueItem) error {
	if item == nil || item.request == nil {
		return fmt.Errorf("malformed keyRequest item")
	}
	start := time.Now()

	// extract keyID and requestID from the item. This uniquely determines the requests
	keyID, err := hex.DecodeString(fmt.Sprintf("%0*x", keyIDLength, item.request.KeyId))
	if err != nil {
		return err
	}
	requestID, err := hex.DecodeString(fmt.Sprintf("%0*x", keyIDLength, item.request.Id))
	if err != nil {
		return err
	}
	cryptoSys := ECDSA
	if item.request.KeyType == types.KeyType_KEY_TYPE_EDDSA_ED25519 {
		cryptoSys = EDDSA
	}

	// Generate a signature. The returned signature is 65-byte and of the form [r, s, v]
	// with recoveryID v, valid on the Ethereum network
	signature, pubKey, err := h.keychainClient.Signature(&SigRequestData{
		KeyID:   keyID,
		ID:      requestID,
		SigHash: item.request.DataForSigning,
	}, cryptoSys)
	if err != nil {
		if item.retries >= item.maxTries {
			// If the request fails maxTries times, return a rejected notice to Warden Protocol and
			// do not retry
			if rejectErr := h.TxClient.RejectSignatureRequest(ctx, item.request.Id, err.Error()); rejectErr != nil {
				return rejectErr
			}
			return nil
		}
		return err
	}

	// write the returned signature back to Warden Protocol
	if err = h.TxClient.FulfilSignatureRequest(ctx, item.request.Id, signature); err != nil {
		return err
	}

	// update DB with last used
	if err = updatePkEntry(h.KeyDB, fmt.Sprintf("%x", keyID)); err != nil {
		return err
	}
	h.Logger.WithFields(logrus.Fields{
		"keyID":     fmt.Sprintf("%x", keyID),
		"pubKey":    fmt.Sprintf("%x", pubKey),
		"requestID": fmt.Sprintf("%x", requestID),
		"timeTaken": common.RoundFloat(time.Since(start).Seconds(), 2),
	}).Info("sigRequestFulfilled")

	return nil
}

func updatePkEntry(db database.Database, keyIDStr string) error {
	k := makeDBKey(keyIDStr)
	v, err := db.Get(k)
	if err != nil {
		if err == database.ErrNotFound {
			return nil // ignore if item is not stored locally
		}
		return err
	}
	if v == nil {
		return nil
	}
	pkDat := &api.PkData{}
	if err := json.Unmarshal(v, pkDat); err != nil {
		return err
	}
	pkDat.LastUsed = time.Now().Format(time.RFC3339)
	b, err := json.Marshal(pkDat)
	if err != nil {
		return err
	}
	if err := db.Persist(k, b); err != nil {
		return err
	}
	return nil
}

func (*WardenSignatureRequestHandler) Healthcheck() *api.HealthResponse {
	return &api.HealthResponse{}
}
