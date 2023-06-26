package main

import (
	"context"
	"log"
	"time"

	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
)

type WalletRequestsHandler interface {
	HandleWalletRequests(context.Context, []*types.WalletRequest) error
}

type SignatureRequestsHandler interface {
	HandleSignatureRequests(context.Context, []*types.SignRequest) error
}

// Engine is the main entry point to the business logic of the application.
// It sets up a loop that queries for pending requests, and uses the provided
// strategies to resolve them.
type Engine struct {
	TreasuryClient           *TreasuryClient
	WalletRequestsHandler    WalletRequestsHandler
	SignatureRequestsHandler SignatureRequestsHandler
}

func (e *Engine) Loop(ctx context.Context) {
	for {
		pendingWalletRequests, err := e.TreasuryClient.PendingWalletRequests(ctx)
		if err != nil {
			panic(err)
		}

		err = e.WalletRequestsHandler.HandleWalletRequests(ctx, pendingWalletRequests)
		if err != nil {
			log.Println("error during wallet request processing:", err)
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
