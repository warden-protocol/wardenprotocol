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
	"context"
	"fmt"

	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	ethermint "github.com/evmos/ethermint/types"
	"google.golang.org/grpc"
)

// AuthQueryClient stores a query client for the fusion auth module
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

	ethAccount := &ethermint.EthAccount{}
	if ethAccount.Unmarshal(res.Account.Value) != nil {
		return nil, err
	}
	return ethAccount, nil
}
