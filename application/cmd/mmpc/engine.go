package main

import (
	"context"
	"log"
	"time"

	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
)

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
	TreasuryClient           *TreasuryClient
	KeyRequestsHandler       KeyRequestsHandler
	SignatureRequestsHandler SignatureRequestsHandler
}

func (e *Engine) Loop(ctx context.Context) {
	for {
		pendingKeyRequests, err := e.TreasuryClient.PendingKeyRequests(ctx)
		if err != nil {
			panic(err)
		}

		err = e.KeyRequestsHandler.HandleKeyRequests(ctx, pendingKeyRequests)
		if err != nil {
			log.Println("error during key request processing:", err)
		}

		pendingSignatureRequests, err := e.TreasuryClient.PendingSignatureRequests(ctx)
		if err != nil {
			panic(err)
		}

		err = e.SignatureRequestsHandler.HandleSignatureRequests(ctx, pendingSignatureRequests)
		if err != nil {
			panic(err)
		}

		time.Sleep(10000 * time.Millisecond)
	}
}
