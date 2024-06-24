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
	grpcConn, err := grpc.NewClient(url, opts...)
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
