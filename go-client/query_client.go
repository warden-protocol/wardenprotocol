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
	insecurecreds "google.golang.org/grpc/credentials/insecure"
)

// QueryClient holds a query client for the auth and treasury modules.
type QueryClient struct {
	*AuthQueryClient
	*TreasuryQueryClient
}

// NewQueryClient returns a QueryClient. The supplied url must be a GRPC compatible endpoint for fusiond.
func NewQueryClient(url string, insecure bool) (*QueryClient, error) {
	opts := []grpc.DialOption{}
	if insecure {
		opts = append(opts, grpc.WithTransportCredentials(insecurecreds.NewCredentials()))
	}
	grpcConn, err := grpc.Dial(url, opts...)
	if err != nil {
		return nil, err
	}

	return NewQueryClientWithConn(grpcConn), nil
}

// NewQueryClientWithConn returns a QueryClient with the supplied GRPC client connection.
func NewQueryClientWithConn(c *grpc.ClientConn) *QueryClient {
	return &QueryClient{
		AuthQueryClient:     NewAuthQueryClient(c),
		TreasuryQueryClient: NewTreasuryQueryClient(c),
	}
}
