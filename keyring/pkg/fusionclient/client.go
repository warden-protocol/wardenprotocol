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
package fusionclient

import (
	"context"

	"github.com/qredo/fusionchain/go-client"
	"github.com/qredo/fusionchain/x/treasury/types"
)

// QueryClient is a thin interface implementing the fusiond query client methods required
// to track keyring requests.
type QueryClient interface {
	PendingKeyRequests(ctx context.Context, page *client.PageRequest, keyringAddr string) ([]*types.KeyRequest, error)
	PendingSignatureRequests(ctx context.Context, page *client.PageRequest, keyringAddr string) ([]*types.SignRequest, error)
}

// TxClient is a thin interface implementing the fusiond query client methods required
// to write transactions to the fusion network.
type TxClient interface {
	FulfilKeyRequest(ctx context.Context, requestID uint64, publicKey []byte) error

	FulfilSignatureRequest(ctx context.Context, requestID uint64, publicKey []byte) error
	RejectSignatureRequest(ctx context.Context, requestID uint64, reason string) error
}
