package main

import (
	"context"
	"log"

	"github.com/cosmos/cosmos-sdk/crypto/keys/secp256k1"
	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
)

// MockKeyRequestsHandler implements KeyRequestsHandler.
// It uses an in-memory database to store the generated keys.
type MockKeyRequestsHandler struct {
	KeyDB          *InMemoryKeyDB
	TreasuryClient *TreasuryClient
}

func (h *MockKeyRequestsHandler) HandleKeyRequests(ctx context.Context, pendingRequests []*types.KeyRequest) error {
	// In this mock implementation we process each request one by one.
	// Each of them will generate a separate transaction to Fusion Chain as result.
	// A production implementation might want to bundle all the ApproveKeyRequest messages into a single transaction.
	for _, request := range pendingRequests {
		h.processReq(ctx, request)
	}
	return nil
}

func (h *MockKeyRequestsHandler) processReq(ctx context.Context, request *types.KeyRequest) {
	log.Printf("KeyRequest[%d] received\n", request.Id)

	// generate new key
	sk := secp256k1.GenPrivKey()
	pk := sk.PubKey().Bytes()

	// approve the user request, provide the generated public key
	err := h.TreasuryClient.ApproveKeyRequest(ctx, request.Id, pk)
	if err != nil {
		log.Printf("KeyRequest[%d] error: %s\n", request.Id, err)
		return
	}

	// fetch again the request to get the newly created key id
	updatedRequest, err := h.TreasuryClient.GetKeyRequest(ctx, request.Id)
	if err != nil {
		log.Printf("KeyRequest[%d] error: %s\n", request.Id, err)
		return
	}
	if updatedRequest.Status != types.KeyRequestStatus_KEY_REQUEST_STATUS_FULFILLED {
		log.Printf("KeyRequest[%d] error: request is not an approved request\n", request.Id)
		return
	}
	keyID := updatedRequest.GetSuccessKeyId()

	// store the generated secret key in our database, will be used when user requests signatures
	err = h.KeyDB.Set(keyID, sk)
	if err != nil {
		log.Printf("KeyRequest[%d] error: %s\n", request.Id, err)
		return
	}

	if err != nil {
		log.Printf("KeyRequest[%d] error: %s\n", request.Id, err)
	} else {
		log.Printf("KeyRequest[%d] approved, key id=%d\n", request.Id, keyID)
	}
}
