package main

import (
	"context"
	"log/slog"

	"github.com/ethereum/go-ethereum/crypto"
	"gitlab.qredo.com/qrdochain/fusionchain/go-client"
	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
)

// MockSignatureRequestsHandler implements SignatureRequestsHandler.
// It uses an in-memory database to store the generated keys.
type MockSignatureRequestsHandler struct {
	KeyDB       *InMemoryKeyDB
	QueryClient *client.QueryClient
	TxClient    *client.TxClient
	Logger      *slog.Logger
}

var _ SignatureRequestsHandler = &MockSignatureRequestsHandler{}

func (h *MockSignatureRequestsHandler) HandleSignatureRequests(ctx context.Context, pendingRequests []*types.SignRequest) error {
	for _, request := range pendingRequests {
		h.processReq(ctx, request)
	}
	return nil
}

func (h *MockSignatureRequestsHandler) processReq(ctx context.Context, request *types.SignRequest) {
	l := h.Logger.With("request_id", request.Id)
	l.InfoContext(ctx, "received")

	key, err := h.KeyDB.Get(request.KeyId)
	if err != nil {
		l.ErrorContext(ctx, "getting key from db", err)

		rejectErr := h.TxClient.RejectSignatureRequest(ctx, request.Id, err.Error())
		if rejectErr != nil {
			l.ErrorContext(ctx, "rejecting request", rejectErr)
		}

		return
	}

	signature, signErr := crypto.Sign(request.DataForSigning, key)
	if signErr != nil {
		l.ErrorContext(ctx, "signing", signErr)

		err = h.TxClient.RejectSignatureRequest(ctx, request.Id, signErr.Error())
		if err != nil {
			l.ErrorContext(ctx, "rejecting request", err)
		}

		return
	}

	err = h.TxClient.FulfilSignatureRequest(ctx, request.Id, signature)
	if err != nil {
		l.ErrorContext(ctx, "fulfilling request", err)
		return
	}

	l.InfoContext(ctx, "fulfilled")
}
