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
package client

import (
	"google.golang.org/grpc"
)

// TxClient can read/write transactions to fusiond and endpoints provided by the treasury module.
type TxClient struct {
	*RawTxClient
	*TreasuryTxClient
}

// NewTxClient returns a TxClient.
func NewTxClient(id Identity, chainID string, c *grpc.ClientConn, accountFetcher AccountFetcher) *TxClient {
	raw := NewRawTxClient(id, chainID, c, accountFetcher)
	return &TxClient{
		RawTxClient:      raw,
		TreasuryTxClient: NewTreasuryTxClient(raw),
	}
}
