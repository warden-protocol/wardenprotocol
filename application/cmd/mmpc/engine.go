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

// Engine is the main entry point to the business logic of the application.
// It sets up a loop that queries for pending requests, and uses the provided
// strategies to resolve them.
type Engine struct {
	TreasuryClient        *TreasuryClient
	WalletRequestsHandler WalletRequestsHandler
}

func (e *Engine) Loop(ctx context.Context) {
	for {
		pendingRequests, err := e.TreasuryClient.PendingWalletRequests(ctx)
		if err != nil {
			panic(err)
		}

		err = e.WalletRequestsHandler.HandleWalletRequests(ctx, pendingRequests)
		if err != nil {
			log.Println("error during wallet request processing:", err)
		}

		time.Sleep(10000 * time.Millisecond)
	}
}
