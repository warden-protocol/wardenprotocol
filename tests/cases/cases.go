package cases

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	"github.com/stretchr/testify/require"

	"github.com/warden-protocol/wardenprotocol/tests/framework"
	"github.com/warden-protocol/wardenprotocol/tests/framework/exec"
	"github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

type TestCase interface {
	Setup(t *testing.T, f *framework.F)
	Run(t *testing.T, f *framework.F)
}

var list []TestCase

func Register(item TestCase) {
	list = append(list, item)
}

func List() []TestCase { return list }

type TestGRPCClient exec.GRPCClient

func (client *TestGRPCClient) EnsureSpaceAmount(t *testing.T, ownerKey string, amount int) {
	resSpacesByDaveAfterBobApprove, err := client.Warden.SpacesByOwner(t.Context(), &types.QuerySpacesByOwnerRequest{
		Owner: ownerKey,
	})
	require.NoError(t, err)
	require.Equal(t, amount, len(resSpacesByDaveAfterBobApprove.Spaces))
}

func (client *TestGRPCClient) EnsureActionStatus(t *testing.T, actionId uint64, expectedStatus v1beta1.ActionStatus) {
	res, err := client.Act.ActionById(t.Context(), &v1beta1.QueryActionByIdRequest{Id: actionId})
	require.NoError(t, err)
	require.Equal(t, expectedStatus, res.Action.Status)
}

func (client *TestGRPCClient) EnsureBalanceAmount(t *testing.T, ownerKey string, balance sdk.Coin) {
	balanceResponse, err := client.Bank.Balance(t.Context(), &banktypes.QueryBalanceRequest{
		Address: ownerKey,
		Denom:   balance.Denom,
	})
	require.NoError(t, err)
	require.True(t, balance.Equal(balanceResponse.Balance))
}

func (client *TestGRPCClient) GetBalanceAmount(t *testing.T, ownerKey string, denom string) sdk.Coin {
	balanceResponse, err := client.Bank.Balance(t.Context(), &banktypes.QueryBalanceRequest{
		Address: ownerKey,
		Denom:   denom,
	})
	require.NoError(t, err)
	require.NotNil(t, balanceResponse.Balance)

	return *balanceResponse.Balance
}
