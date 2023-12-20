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
	"log/slog"

	"github.com/ethereum/go-ethereum/crypto"
	"github.com/qredo/fusionchain/go-client"
	"github.com/qredo/fusionchain/x/treasury/types"
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
