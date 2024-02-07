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
	"context"
	"fmt"

	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	"google.golang.org/grpc"
)

// AuthQueryClient stores a query client for the warden auth module
type AuthQueryClient struct {
	client authtypes.QueryClient
}

// NewAuthQueryClient returns a new AuthQueryClient with the supplied GRPC client connection.
func NewAuthQueryClient(c *grpc.ClientConn) *AuthQueryClient {
	return &AuthQueryClient{
		client: authtypes.NewQueryClient(c),
	}
}

// Account returns the auth account for the supplied address.
func (c *AuthQueryClient) Account(ctx context.Context, addr string) (authtypes.AccountI, error) {
	res, err := c.client.Account(ctx, &authtypes.QueryAccountRequest{
		Address: addr,
	})
	if err != nil {
		return nil, err
	}

	if res.Account.TypeUrl != "/ethermint.types.v1.EthAccount" {
		return nil, fmt.Errorf("unknown account type: %s", res.Account.TypeUrl)
	}

}
