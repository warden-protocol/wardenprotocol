package cases

import (
	"context"
	"fmt"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/stretchr/testify/require"
	actv1beta1 "github.com/warden-protocol/wardenprotocol/api/warden/act/v1beta1"
	"github.com/warden-protocol/wardenprotocol/precompiles/act"
	"github.com/warden-protocol/wardenprotocol/precompiles/warden"
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
	c.w.PrintLogsAtTheEnd(t, ctx)
}

func (c *Test_EthTransactionReader) Run(t *testing.T, ctx context.Context, _ framework.BuildResult) {
	alice := exec.NewWardend(c.w, "alice")
	bob := exec.NewWardend(c.w, "bob")
	dave := exec.NewWardend(c.w, "dave")

	client := TestGRPCClient(*c.w.GRPCClient(t))
	evmClient := c.w.EthClient(t)
	iActClient, err := act.NewIAct(common.HexToAddress(act.PrecompileAddress), evmClient)
	require.NoError(t, err)
	iWardenClient, err := warden.NewIWarden(common.HexToAddress(warden.PrecompileAddress), evmClient)
	require.NoError(t, err)

	t.Run("work with templates", func(t *testing.T) {
		createTemplateTx, err := iActClient.NewTemplate(
			alice.TransactOps(t, context.Background(), evmClient),
			"evm rule #1",
			"any(2, warden.space.owners)")
		require.NoError(t, err)

		createTemplateReceipt, err := bind.WaitMined(ctx, evmClient, createTemplateTx)
		require.NoError(t, err)

		createTemplateEvents, err := checks.GetParsedEventsOnly(createTemplateReceipt, iActClient.ParseCreateTemplate)
		require.NoError(t, err)
		require.Len(t, createTemplateEvents, 1)

		templateById, err := iActClient.TemplateById(alice.CallOps(t), 1)
		require.NoError(t, err)
		require.Equal(t, "evm rule #1", templateById.Template.Name)

		updateTemplateTx, err := iActClient.UpdateTemplate(
			alice.TransactOps(t, context.Background(), evmClient),
			1,
			"evm rule #1 modified",
			"any(2, warden.space.owners)")
		require.NoError(t, err)

		updateTemplateReceipt, err := bind.WaitMined(ctx, evmClient, updateTemplateTx)
		require.NoError(t, err)

		updateTemplateEvents, err := checks.GetParsedEventsOnly(updateTemplateReceipt, iActClient.ParseUpdateTemplate)
		require.NoError(t, err)
		require.Len(t, updateTemplateEvents, 1)

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
		require.Equal(t, actionById.Action.Creator, alice.EthAddress(t))

		actionsByAddress, err := iActClient.ActionsByAddress(
			alice.CallOps(t),
			act.TypesPageRequest{},
			alice.EthAddress(t),
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

		revokeTx, err := iActClient.RevokeAction(alice.TransactOps(t, ctx, evmClient), 3)
		require.NoError(t, err)

		actionRevokeReceipt, err := bind.WaitMined(ctx, evmClient, revokeTx)
		require.NoError(t, err)

		actionStateChangeEvents, err := checks.GetParsedEventsOnly(actionRevokeReceipt, iActClient.ParseActionStateChange)
		require.NoError(t, err)
		require.Len(t, actionStateChangeEvents, 1)

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

		voteTx, err := iActClient.VoteForAction(bob.TransactOps(t, ctx, evmClient), 4, 1)
		require.NoError(t, err)

		actionVotedReceipt, err := bind.WaitMined(ctx, evmClient, voteTx)
		require.NoError(t, err)

		client.EnsureSpaceAmount(t, ctx, dave.Address(t), 1)

		actionVotedEvents, err := checks.GetParsedEventsOnly(actionVotedReceipt, iActClient.ParseActionVoted)
		require.NoError(t, err)
		require.Len(t, actionVotedEvents, 1)

		require.Equal(t, actionVotedEvents[0].VoteType, int32(actv1beta1.ActionVoteType_VOTE_TYPE_APPROVED))
		require.Equal(t, actionVotedEvents[0].ActionId, uint64(4))

		addSpaceOwnerEvents, err := checks.GetParsedEventsOnly(actionVotedReceipt, iWardenClient.ParseAddSpaceOwner)
		require.NoError(t, err)
		require.Len(t, addSpaceOwnerEvents, 1)
		require.Equal(t, addSpaceOwnerEvents[0].SpaceId, uint64(1))
		require.Equal(t, addSpaceOwnerEvents[0].NewOwner, dave.EthAddress(t))

		actionStateChangeEvents, err = checks.GetParsedEventsOnly(actionVotedReceipt, iActClient.ParseActionStateChange)
		require.NoError(t, err)
		require.Len(t, actionStateChangeEvents, 1)
		require.Equal(t, actionStateChangeEvents[0].PreviousStatus, int32(actv1beta1.ActionStatus_ACTION_STATUS_PENDING))
		require.Equal(t, actionStateChangeEvents[0].NewStatus, int32(actv1beta1.ActionStatus_ACTION_STATUS_COMPLETED))
	})
}
