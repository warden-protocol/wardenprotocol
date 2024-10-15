package cases

import (
	"context"
	"fmt"
	"github.com/ethereum/go-ethereum/common"
	"github.com/stretchr/testify/require"
	actv1beta1 "github.com/warden-protocol/wardenprotocol/api/warden/act/v1beta1"
	"github.com/warden-protocol/wardenprotocol/precompiles/act"
	"github.com/warden-protocol/wardenprotocol/tests/framework/checks"
	"math/big"
	"testing"
	"time"

	"github.com/warden-protocol/wardenprotocol/tests/framework"
	"github.com/warden-protocol/wardenprotocol/tests/framework/exec"
)

func init() {
	Register(&Test_EthTransactionReader{})
}

type Test_EthTransactionReader struct {
	w *exec.WardenNode
}

func (c *Test_EthTransactionReader) Setup(t *testing.T, ctx context.Context, build framework.BuildResult) {
	c.w = exec.NewWardenNode(t, build.Wardend)

	go c.w.Start(t, ctx, "./testdata/snapshot-many-users")
	c.w.WaitRunnning(t)
}

func (c *Test_EthTransactionReader) Run(t *testing.T, ctx context.Context, build framework.BuildResult) {
	alice := exec.NewWardend(c.w, "alice")
	bob := exec.NewWardend(c.w, "bob")
	dave := exec.NewWardend(c.w, "dave")

	client := TestGRPCClient(*c.w.GRPCClient(t))
	evmClient := c.w.EthClient(t)
	iActClient, err := act.NewIAct(common.HexToAddress(act.PrecompileAddress), evmClient)
	require.NoError(t, err)

	t.Run("work with templates", func(t *testing.T) {
		_, err := iActClient.NewTemplate(
			alice.TransactOps(t, context.Background(), evmClient),
			"evm rule #1",
			"any(2, warden.space.owners)")
		require.NoError(t, err)
		time.Sleep(4 * time.Second) // TODO AT: replace by require.Eventually

		templateById, err := iActClient.TemplateById(alice.CallOps(t), 1)
		require.NoError(t, err)
		require.Equal(t, "evm rule #1", templateById.Template.Name)

		_, err = iActClient.UpdateTemplate(
			alice.TransactOps(t, context.Background(), evmClient),
			1,
			"evm rule #1 modified",
			"any(2, warden.space.owners)")
		require.NoError(t, err)
		time.Sleep(4 * time.Second) // TODO AT: replace by require.Eventually

		templateById, err = iActClient.TemplateById(alice.CallOps(t), 1)
		require.NoError(t, err)
		require.Equal(t, "evm rule #1 modified", templateById.Template.Name)

		templates, err := iActClient.Templates(alice.CallOps(t), act.TypesPageRequest{})
		require.NoError(t, err)
		require.Len(t, templates.Templates, 1)
	})

	t.Run("work with actions", func(t *testing.T) {
		newActionTxText := fmt.Sprintf("warden new-action add-space-owner --space-id %d --new-owner %s --nonce %d", 1, bob.Address(t), 0)
		tx := alice.Tx(t, newActionTxText)
		checks.SuccessTx(t, tx)

		actions, err := iActClient.Actions(alice.CallOps(t), act.TypesPageRequest{})
		if err != nil {
			t.Fatal(err)
		}
		require.NotEmpty(t, actions)
		require.Len(t, actions.Actions, 1)

		actionById, err := iActClient.ActionById(alice.CallOps(t), 1)
		if err != nil {
			t.Fatal(err)
		}
		require.Equal(t, actionById.Action.Creator, alice.Address(t))

		actionsByAddress, err := iActClient.ActionsByAddress(
			alice.CallOps(t),
			act.TypesPageRequest{},
			alice.Address(t),
			int32(actv1beta1.ActionStatus_ACTION_STATUS_COMPLETED))
		if err != nil {
			t.Fatal(err)
		}
		require.Len(t, actionsByAddress.Actions, 1)

		tx = alice.Tx(t,
			fmt.Sprintf("warden new-action update-space --space-id 1 --approve-admin-template-id 1 --nonce 1"))
		checks.SuccessTx(t, tx)
		time.Sleep(2 * time.Second) // TODO AT: replace by require.Eventually

		tx = alice.Tx(t,
			fmt.Sprintf("warden new-action add-space-owner --space-id %d --new-owner %s --nonce %d --expected-approve-expression \"%s\"",
				1, dave.Address(t), 2, "any(2, warden.space.owners)"))
		checks.SuccessTx(t, tx)
		time.Sleep(2 * time.Second) // TODO AT: replace by require.Eventually

		client.EnsureSpaceAmount(t, ctx, dave.Address(t), 0)

		_, err = iActClient.RevokeAction(alice.TransactOps(t, ctx, evmClient), 3)
		require.NoError(t, err)
		time.Sleep(4 * time.Second) // TODO AT: replace by require.Eventually

		actionById, err = iActClient.ActionById(alice.CallOps(t), 3)
		if err != nil {
			t.Fatal(err)
		}
		require.Equal(t, actionById.Action.Status, big.NewInt(int64(actv1beta1.ActionStatus_ACTION_STATUS_REVOKED)))

		alice.Tx(t,
			fmt.Sprintf("warden new-action add-space-owner --space-id %d --new-owner %s --nonce %d --expected-approve-expression \"%s\"",
				1, dave.Address(t), 2, "any(2, warden.space.owners)"))
		checks.SuccessTx(t, tx)
		time.Sleep(2 * time.Second) // TODO AT: replace by require.Eventually

		client.EnsureSpaceAmount(t, ctx, dave.Address(t), 0)

		_, err = iActClient.VoteForAction(bob.TransactOps(t, ctx, evmClient), 4, 1)
		require.NoError(t, err)
		time.Sleep(2 * time.Second) // TODO AT: replace by require.Eventually

		client.EnsureSpaceAmount(t, ctx, dave.Address(t), 1)
	})
}
