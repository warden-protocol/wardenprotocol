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
	"fmt"
	"time"

	"github.com/warden-protocol/wardenprotocol/go-client"
	"github.com/warden-protocol/wardenprotocol/keychain/pkg/api"
	"github.com/warden-protocol/wardenprotocol/keychain/pkg/wardenclient"
	"github.com/warden-protocol/wardenprotocol/x/treasury/types"
	"github.com/sirupsen/logrus"
)

type keyQueryProcessor struct {
	keychainAddr    string
	queryClient    wardenclient.QueryClient
	keyRequestChan chan *keyRequestQueueItem
	threads        chan struct{}
	stop           chan struct{}
	wait           chan struct{}
	tickDuration   time.Duration

	log      *logrus.Entry
	maxTries int
}

func newKeyQueryProcessor(keychainAddr string, q wardenclient.QueryClient, k chan *keyRequestQueueItem, log *logrus.Entry, t time.Duration, maxTries int) *keyQueryProcessor {
	return &keyQueryProcessor{
		keychainAddr:    keychainAddr,
		queryClient:    q,
		keyRequestChan: k,
		threads:        makeThreads(defaultThreads),
		stop:           make(chan struct{}, 1),
		wait:           make(chan struct{}, 1),
		tickDuration:   t,
		log:            log,
		maxTries:       maxTries,
	}
}

// Start implements Module.Start()
func (q *keyQueryProcessor) Start() error {
	q.log.WithField("threads", len(q.threads)).Info("starting keyQueryHandler")
	go q.startTicker()
	return nil
}

func (q *keyQueryProcessor) startTicker() {
	ticker := time.NewTicker(q.tickDuration)
	defer ticker.Stop()
	for {
		select {
		case <-q.stop:
			q.log.Debug("keyQueryProcessor received shutdown signal")
			for i := 0; i < defaultThreads; i++ {
				<-q.threads // empty thread chan
			}
			q.log.Debug("terminated keyQueryProcessor")
			q.wait <- struct{}{}
			return
		case <-ticker.C:
			// Execute queries async
			go func() {
				<-q.threads
				defer func() { q.threads <- struct{}{} }()
				if err := q.executeKeyQuery(); err != nil {
					q.log.WithField("error", err.Error()).Error("pendingKeyQueryErr")
				}
			}()
		}
	}
}

func (q *keyQueryProcessor) executeKeyQuery() error {
	ctx, cancelFunc := context.WithTimeout(context.Background(), defaultQueryTimeout)
	defer cancelFunc()
	pendingKeyRequests, err := q.queryClient.PendingKeyRequests(ctx, &client.PageRequest{Limit: defaultPageLimit}, q.keychainAddr)
	if err != nil {
		return err
	}
	for _, r := range pendingKeyRequests {
		if r.Status != types.KeyRequestStatus_KEY_REQUEST_STATUS_PENDING { // ignore rogue completed or rejected requests
			continue
		}
		newItem := &keyRequestQueueItem{
			request:  r,
			maxTries: q.maxTries,
		}
		q.keyRequestChan <- newItem
	}
	return nil
}

// Stop implements Module.Stop()
func (q *keyQueryProcessor) Stop() error {
	q.stop <- struct{}{}
	<-q.wait
	return nil
}

func (q *keyQueryProcessor) Healthcheck() *api.HealthResponse {
	ctx, cancelFunc := context.WithTimeout(context.Background(), defaultQueryTimeout)
	defer cancelFunc()
	if _, err := q.queryClient.PendingSignatureRequests(ctx, &client.PageRequest{Limit: 1}, q.keychainAddr); err != nil {
		return &api.HealthResponse{Failures: []string{fmt.Sprintf("query client: %v", err.Error())}}
	}
	return &api.HealthResponse{}
}

type sigQueryProcessor struct {
	keychainAddr    string
	queryClient    wardenclient.QueryClient
	sigRequestChan chan *signatureRequestQueueItem
	threads        chan struct{}
	stop           chan struct{}
	wait           chan struct{}
	tickDuration   time.Duration

	log      *logrus.Entry
	maxTries int
}

func newSigQueryProcessor(keychainAddr string, q wardenclient.QueryClient, s chan *signatureRequestQueueItem, log *logrus.Entry, t time.Duration, maxTries int) *sigQueryProcessor {
	return &sigQueryProcessor{
		keychainAddr:    keychainAddr,
		queryClient:    q,
		sigRequestChan: s,
		threads:        makeThreads(defaultThreads),
		stop:           make(chan struct{}, 1),
		wait:           make(chan struct{}, 1),
		tickDuration:   t,
		log:            log,
		maxTries:       maxTries,
	}
}

// Start implements Module.Start()
func (q sigQueryProcessor) Start() error {
	q.log.WithField("threads", len(q.threads)).Info("starting sigQueryHandler")
	go q.startTicker()
	return nil
}

func (q sigQueryProcessor) startTicker() {
	ticker := time.NewTicker(q.tickDuration)
	defer ticker.Stop()
	for {
		select {
		case <-q.stop:
			q.log.Debug("sigQueryProcessor received shutdown signal")
			for i := 0; i < defaultThreads; i++ {
				<-q.threads // empty thread chan
			}
			q.log.Debug("terminated sigQueryProcessor")
			q.wait <- struct{}{}
			return
		case <-ticker.C:
			// Process Signature request queries
			go func() {
				<-q.threads
				defer func() { q.threads <- struct{}{} }()
				if err := q.executeSignatureQuery(); err != nil {
					q.log.WithField("error", err.Error()).Error("pendingSigQueryErr")
				}
			}()
		}
	}
}

func (q *sigQueryProcessor) executeSignatureQuery() error {
	ctx, cancelFunc := context.WithTimeout(context.Background(), defaultQueryTimeout)
	defer cancelFunc()
	pendingSigRequests, err := q.queryClient.PendingSignatureRequests(ctx, &client.PageRequest{Limit: defaultPageLimit}, q.keychainAddr)
	if err != nil {
		return err
	}
	for _, r := range pendingSigRequests {
		if r.Status != types.SignRequestStatus_SIGN_REQUEST_STATUS_PENDING { // ignore rogue completed or rejected requests
			continue
		}
		newItem := &signatureRequestQueueItem{
			request:  r,
			maxTries: q.maxTries,
		}
		q.sigRequestChan <- newItem
	}
	return nil
}

// Stop implements Module.Stop()
func (q *sigQueryProcessor) Stop() error {
	q.stop <- struct{}{}
	<-q.wait
	return nil
}

func (q *sigQueryProcessor) Healthcheck() *api.HealthResponse {
	ctx, cancelFunc := context.WithTimeout(context.Background(), defaultQueryTimeout)
	defer cancelFunc()
	if _, err := q.queryClient.PendingSignatureRequests(ctx, &client.PageRequest{Limit: 1}, q.keychainAddr); err != nil {
		return &api.HealthResponse{Failures: []string{fmt.Sprintf("query client: %v", err.Error())}}
	}
	return &api.HealthResponse{}
}
