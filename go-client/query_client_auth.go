package client

import (
	"context"
	"fmt"

	"github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	ethtypes "github.com/evmos/evmos/v20/types"
	"google.golang.org/grpc"
)

// AuthQueryClient stores a query client for the warden auth module.
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
func (c *AuthQueryClient) Account(ctx context.Context, addr string) (types.AccountI, error) {
	res, err := c.client.Account(ctx, &authtypes.QueryAccountRequest{
		Address: addr,
	})
	if err != nil {
		return nil, err
	}

	switch res.Account.TypeUrl {
	case "/ethermint.types.v1.EthAccount":
		var account ethtypes.EthAccount
		if err := account.Unmarshal(res.Account.Value); err != nil {
			return nil, fmt.Errorf("failed to unmarshal EthAccount: %w", err)
		}
		return &account, nil
	default:
		var account authtypes.BaseAccount
		if err := account.Unmarshal(res.Account.Value); err != nil {
			return nil, fmt.Errorf("failed to unmarshal BaseAccount: %w", err)
		}
		return &account, nil
	}
}
