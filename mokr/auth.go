package main

import (
	"context"
	"fmt"

	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	ethermint "gitlab.qredo.com/qrdochain/fusionchain/types"
	"google.golang.org/grpc"
)

type AuthClient struct {
	client authtypes.QueryClient
}

func NewAuthClient(c *grpc.ClientConn) *AuthClient {
	return &AuthClient{
		client: authtypes.NewQueryClient(c),
	}
}

func (c *AuthClient) Account(ctx context.Context, addr string) (authtypes.AccountI, error) {
	res, err := c.client.Account(ctx, &authtypes.QueryAccountRequest{
		Address: addr,
	})
	if err != nil {
		return nil, err
	}

	switch res.Account.TypeUrl {
	case "/ethermint.types.v1.EthAccount":
		ethAccount := &ethermint.EthAccount{}
		err := ethAccount.Unmarshal(res.Account.Value)
		if err != nil {
			return nil, err
		}
		return ethAccount, nil
	}

	return nil, fmt.Errorf("unknown account type: %s", res.Account.TypeUrl)
}
