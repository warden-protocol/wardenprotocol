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
	"context"
	"log"
	"time"

	"github.com/qredo/fusionchain/go-client"
	"github.com/qredo/fusionchain/x/treasury/types"
)

type KeyringIdentity struct {
	client.Identity
	KeyringAddr string
}

type KeyRequestsHandler interface {
	HandleKeyRequests(context.Context, []*types.KeyRequest) error
}

type SignatureRequestsHandler interface {
	HandleSignatureRequests(context.Context, []*types.SignRequest) error
}

// Engine is the main entry point to the business logic of the application.
// It sets up a loop that queries for pending requests, and uses the provided
// strategies to resolve them.
type Engine struct {
	QueryClient *client.QueryClient
	KeyringAddr string

	SignatureRequestsHandler SignatureRequestsHandler
	KeyRequestsHandler       KeyRequestsHandler
}

func (e *Engine) Loop(ctx context.Context) {
	for {
		pendingKeyRequests, err := e.QueryClient.PendingKeyRequests(ctx, &client.PageRequest{
			Limit: 10,
		}, e.KeyringAddr)
		if err != nil {
			panic(err)
		}

		err = e.KeyRequestsHandler.HandleKeyRequests(ctx, pendingKeyRequests)
		if err != nil {
			log.Println("error during key request processing:", err)
		}

		pendingSignatureRequests, err := e.QueryClient.PendingSignatureRequests(ctx, &client.PageRequest{
			Limit: 10,
		}, e.KeyringAddr)
		if err != nil {
			panic(err)
		}

		err = e.SignatureRequestsHandler.HandleSignatureRequests(ctx, pendingSignatureRequests)
		if err != nil {
			panic(err)
		}

		time.Sleep(1000 * time.Millisecond)
	}
}
