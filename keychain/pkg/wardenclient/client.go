// Copyright 2024
//
// This file includes work covered by the following copyright and permission notices:
//
// Copyright 2023 Qredo Ltd.
// Licensed under the Apache License, Version 2.0;
//
// This file is part of the Warden Protocol library.
//
// The Warden Protocol library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Warden Protocol library. If not, see https://github.com/warden-protocol/wardenprotocol/blob/main/LICENSE
package wardenclient

import (
	"context"

	"github.com/warden-protocol/wardenprotocol/go-client"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types"
)

// QueryClient is a thin interface implementing the wardend query client methods required
// to track keychain requests.
type QueryClient interface {
	PendingKeyRequests(ctx context.Context, page *client.PageRequest, keychainAddr string) ([]*types.KeyRequest, error)
	PendingSignatureRequests(ctx context.Context, page *client.PageRequest, keychainAddr string) ([]*types.SignRequest, error)
}

// TxClient is a thin interface implementing the wardend query client methods required
// to write transactions to Warden Protocol.
type TxClient interface {
	FulfilKeyRequest(ctx context.Context, requestID uint64, publicKey []byte) error

	FulfilSignatureRequest(ctx context.Context, requestID uint64, publicKey []byte) error
	RejectSignatureRequest(ctx context.Context, requestID uint64, reason string) error
}
