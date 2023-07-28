package client

import (
	"google.golang.org/grpc"
)

type QueryClient struct {
	*TreasuryQueryClient
}

func NewQueryClient(url string, insecure bool) (*QueryClient, error) {
	opts := []grpc.DialOption{}
	if insecure {
		opts = append(opts, grpc.WithInsecure())
	}
	grpcConn, err := grpc.Dial(url, opts...)
	if err != nil {
		return nil, err
	}

	return NewQueryClientWithConn(grpcConn), nil
}

func NewQueryClientWithConn(c *grpc.ClientConn) *QueryClient {
	return &QueryClient{
		TreasuryQueryClient: NewTreasuryClient(c),
	}
}
