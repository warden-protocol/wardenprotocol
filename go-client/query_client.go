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
	insecurecreds "google.golang.org/grpc/credentials/insecure"
)

// QueryClient holds a query client for the auth and treasury modules.
type QueryClient struct {
	*AuthQueryClient
	*WardenQueryClient

	conn *grpc.ClientConn
}

// Conn returns the gRPC client connection.
func (c *QueryClient) Conn() *grpc.ClientConn {
	return c.conn
}

// NewQueryClient returns a QueryClient. The supplied url must be a GRPC compatible endpoint for wardend.
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
		AuthQueryClient:   NewAuthQueryClient(c),
		WardenQueryClient: NewWardenQueryClient(c),
		conn:              c,
	}
}
