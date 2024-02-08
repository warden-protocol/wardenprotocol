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

	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types"
	"google.golang.org/grpc"
)

type PageRequest = query.PageRequest

// WardenQueryClient is the client for the treasury module.
type WardenQueryClient struct {
	client types.QueryClient
}

// NewWardenQueryClient returns a WardenQueryClient
func NewWardenQueryClient(c *grpc.ClientConn) *WardenQueryClient {
	return &WardenQueryClient{
		client: types.NewQueryClient(c),
	}
}

// PendingKeyRequests executes a paginated pending key request query with context. wardend will return a slice of pending
// key requests for the supplied keychain address.
func (t *WardenQueryClient) PendingKeyRequests(ctx context.Context, page *PageRequest, keychainAddr string) ([]*types.KeyRequest, error) {
	res, err := t.client.KeyRequests(ctx, &types.QueryKeyRequestsRequest{
		Pagination:   page,
		KeychainAddr: keychainAddr,
		Status:       types.KeyRequestStatus_KEY_REQUEST_STATUS_PENDING,
	})
	if err != nil {
		return nil, err
	}

	return res.KeyRequests, nil
}

// GetKeyRequest returns the key request corresponding to the specific request ID.
func (t *WardenQueryClient) GetKeyRequest(ctx context.Context, requestID uint64) (*types.KeyRequest, error) {
	res, err := t.client.KeyRequestById(ctx, &types.QueryKeyRequestByIdRequest{
		Id: requestID,
	})
	if err != nil {
		return nil, err
	}

	return res.KeyRequest, nil
}

// PendingSignatureRequests executes a paginated pending signature request query with context. wardend will return a slice of pending
// signature requests for the supplied keychain address.
func (t *WardenQueryClient) PendingSignatureRequests(ctx context.Context, page *PageRequest, keychainAddr string) ([]*types.SignRequest, error) {
	res, err := t.client.SignatureRequests(ctx, &types.QuerySignatureRequestsRequest{
		Pagination:   page,
		KeychainAddr: keychainAddr,
		Status:       types.SignRequestStatus_SIGN_REQUEST_STATUS_PENDING,
	})
	if err != nil {
		return nil, err
	}

	return res.SignRequests, nil
}

// GetSignatureRequest returns the signature request corresponding to the specific request ID.
func (t *WardenQueryClient) GetSignatureRequest(ctx context.Context, requestID uint64) (*types.SignRequest, error) {
	res, err := t.client.SignatureRequestById(ctx, &types.QuerySignatureRequestByIdRequest{
		Id: requestID,
	})
	if err != nil {
		return nil, err
	}

	return res.SignRequest, nil
}

// SignedTransactions returns a paginated set of fulfilled signature requests for the supplied wallet type.
func (t *WardenQueryClient) SignedTransactions(ctx context.Context, page *PageRequest, walletType types.WalletType) (*types.QuerySignTransactionRequestsResponse, error) {
	res, err := t.client.SignTransactionRequests(ctx, &types.QuerySignTransactionRequestsRequest{
		Pagination: page,
		WalletType: walletType,
		Status:     types.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED,
	})
	if err != nil {
		return nil, err
	}

	return res, nil
}
