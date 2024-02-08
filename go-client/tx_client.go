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
package client

import (
	"google.golang.org/grpc"
)

// TxClient can read/write transactions to wardend and endpoints provided by the treasury module.
type TxClient struct {
	*RawTxClient
	*WardenTxClient
}

// NewTxClient returns a TxClient.
func NewTxClient(id Identity, chainID string, c *grpc.ClientConn, accountFetcher AccountFetcher) *TxClient {
	raw := NewRawTxClient(id, chainID, c, accountFetcher)
	return &TxClient{
		RawTxClient:    raw,
		WardenTxClient: NewWardenTxClient(raw),
	}
}
