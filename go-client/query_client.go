package client

import (
	"google.golang.org/grpc"
	insecurecreds "google.golang.org/grpc/credentials/insecure"
)

type QueryClient struct {
	*AuthQueryClient
	*TreasuryQueryClient
}

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

func NewQueryClientWithConn(c *grpc.ClientConn) *QueryClient {
	return &QueryClient{
		AuthQueryClient:     NewAuthQueryClient(c),
		TreasuryQueryClient: NewTreasuryQueryClient(c),
	}
}
