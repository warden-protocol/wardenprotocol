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
