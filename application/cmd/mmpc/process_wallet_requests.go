package main

import (
	"context"
	"log"

	"github.com/cosmos/cosmos-sdk/crypto/keys/secp256k1"
	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
)

// MockWalletRequestsHandler implements WalletRequestsHandler.
// It uses an in-memory database to store the generated keys.
type MockWalletRequestsHandler struct {
	KeyDB          *InMemoryKeyDB
	TreasuryClient *TreasuryClient
}

func (h *MockWalletRequestsHandler) HandleWalletRequests(ctx context.Context, pendingRequests []*types.WalletRequest) error {
	// In this mock implementation we process each request one by one.
	// Each of them will generate a separate transaction to Fusion Chain as result.
	// A production implementation might want to bundle all the ApproveWalletRequest messages into a single transaction.
	for _, request := range pendingRequests {
		h.processReq(ctx, request)
	}
	return nil
}

func (h *MockWalletRequestsHandler) processReq(ctx context.Context, request *types.WalletRequest) {
	log.Printf("WalletRequest[%d] received\n", request.Id)

	// generate new key
	sk := secp256k1.GenPrivKey()
	pk := sk.PubKey().Bytes()

	// approve the user request, provide the generated public key
	err := h.TreasuryClient.ApproveWalletRequest(ctx, request.Id, pk)
	if err != nil {
		log.Printf("WalletRequest[%d] error: %s\n", request.Id, err)
		return
	}

	// fetch again the request to get the newly created wallet id
	updatedRequest, err := h.TreasuryClient.GetWalletRequest(ctx, request.Id)
	if err != nil {
		log.Printf("WalletRequest[%d] error: %s\n", request.Id, err)
		return
	}
	if updatedRequest.Status != types.WalletRequestStatus_WALLET_REQUEST_STATUS_FULFILLED {
		log.Printf("WalletRequest[%d] error: request is not an approved request\n", request.Id)
		return
	}
	walletID := updatedRequest.GetSuccessWalletId()

	// store the generated secret key in our database, will be used when user requests signatures
	err = h.KeyDB.Set(walletID, Key(sk))
	if err != nil {
		log.Printf("WalletRequest[%d] error: %s\n", request.Id, err)
		return
	}

	if err != nil {
		log.Printf("WalletRequest[%d] error: %s\n", request.Id, err)
	} else {
		log.Printf("WalletRequest[%d] approved, wallet id=%d\n", request.Id, walletID)
	}
}
