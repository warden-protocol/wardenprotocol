package main

import (
	"context"
	"log"

	"github.com/ethereum/go-ethereum/crypto"
	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
)

// MockSignatureRequestsHandler implements SignatureRequestsHandler.
// It uses an in-memory database to store the generated keys.
type MockSignatureRequestsHandler struct {
	KeyDB          *InMemoryKeyDB
	TreasuryClient *TreasuryClient
}

var _ SignatureRequestsHandler = &MockSignatureRequestsHandler{}

func (h *MockSignatureRequestsHandler) HandleSignatureRequests(ctx context.Context, pendingRequests []*types.SignRequest) error {
	for _, request := range pendingRequests {
		h.processReq(ctx, request)
	}
	return nil
}

func (h *MockSignatureRequestsHandler) processReq(ctx context.Context, request *types.SignRequest) {
	log.Printf("SignRequest[%d] received\n", request.Id)

	key, err := h.KeyDB.Get(request.KeyId)
	if err != nil {
		log.Printf("SignRequest[%d] error: %s\n", request.Id, err)

		rejectErr := h.TreasuryClient.RejectSignatureRequest(ctx, request.Id, err.Error())
		if rejectErr != nil {
			log.Printf("SignRequest[%d] error rejecting request: %s\n", request.Id, rejectErr)
		}

		return
	}

	signature, signErr := crypto.Sign(request.DataForSigning, key)
	if signErr != nil {
		log.Printf("SignRequest[%d] error: %s\n", request.Id, signErr)

		err = h.TreasuryClient.RejectSignatureRequest(ctx, request.Id, signErr.Error())
		if err != nil {
			log.Printf("SignRequest[%d] error rejecting request: %s\n", request.Id, err)
		}

		return
	}

	err = h.TreasuryClient.FulfilSignatureRequest(ctx, request.Id, signature)
	if err != nil {
		log.Printf("SignRequest[%d] error: %s\n", request.Id, err)
		return
	}

	if err != nil {
		log.Printf("SignRequest[%d] error: %s\n", request.Id, err)
	} else {
		log.Printf("SignRequest[%d] fulfilled\n", request.Id)
	}
}
