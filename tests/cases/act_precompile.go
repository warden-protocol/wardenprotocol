package cases

import (
	"fmt"
	"testing"
	"time"

	"github.com/ethereum/go-ethereum/common"
	"github.com/stretchr/testify/require"

	actv1beta1 "github.com/warden-protocol/wardenprotocol/api/warden/act/v1beta1"
	"github.com/warden-protocol/wardenprotocol/precompiles/act"
	"github.com/warden-protocol/wardenprotocol/precompiles/warden"
	"github.com/warden-protocol/wardenprotocol/tests/framework"
	"github.com/warden-protocol/wardenprotocol/tests/framework/checks"
	"github.com/warden-protocol/wardenprotocol/tests/framework/exec"
	"github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

func init() {
	Register(&Test_ActPrecompile{})
}

type Test_ActPrecompile struct {
	w *exec.WardenNode
}

func (c *Test_ActPrecompile) Setup(t *testing.T, f *framework.F) {
	c.w = f.StartNodeFromSnapshot(t, framework.SnapshotPrecompiles)
}

func (c *Test_ActPrecompile) Run(t *testing.T, _ *framework.F) {
	alice := exec.NewWardendEth(t, c.w, "alice")
	bob := exec.NewWardendEth(t, c.w, "bob")
	dave := exec.NewWardendEth(t, c.w, "dave")

	client := TestGRPCClient(*c.w.GRPCClient(t))
	iActClient, err := act.NewIAct(common.HexToAddress(act.PrecompileAddress), alice.Client)
	require.NoError(t, err)
	iWardenClient, err := warden.NewIWarden(common.HexToAddress(warden.PrecompileAddress), alice.Client)
	require.NoError(t, err)

	t.Run("work with templates", func(t *testing.T) {
		createTemplateTx, err := iActClient.NewTemplate(
			alice.TransactOps(t),
			"evm rule #1",
			"any(2, warden.space.owners)")
		require.NoError(t, err)

		createTemplateReceipt := alice.Client.WaitMinedSuccess(t, createTemplateTx)

		createTemplateEvents, err := checks.GetParsedEventsOnly(createTemplateReceipt, iActClient.ParseCreateTemplate)
		require.NoError(t, err)
		require.Len(t, createTemplateEvents, 1)

		templateById, err := iActClient.TemplateById(alice.CallOps(t), 1)
		require.NoError(t, err)
		require.Equal(t, "evm rule #1", templateById.Template.Name)

		updateTemplateTx, err := iActClient.UpdateTemplate(
			alice.TransactOps(t),
			1,
			"evm rule #1 modified",
			"any(2, warden.space.owners)")
		require.NoError(t, err)

		updateTemplateReceipt := alice.Client.WaitMinedSuccess(t, updateTemplateTx)

		updateTemplateEvents, err := checks.GetParsedEventsOnly(updateTemplateReceipt, iActClient.ParseUpdateTemplate)
		require.NoError(t, err)
		require.Len(t, updateTemplateEvents, 1)

		templateById, err = iActClient.TemplateById(alice.CallOps(t), 1)
		require.NoError(t, err)
		require.Equal(t, "evm rule #1 modified", templateById.Template.Name)

		templates, err := iActClient.Templates(alice.CallOps(t), act.TypesPageRequest{}, common.Address{})
		require.NoError(t, err)
		require.Len(t, templates.Templates, 1)
	})

	t.Run("work with actions", func(t *testing.T) {
		newActionTxText := fmt.Sprintf("warden new-action add-space-owner --space-id %d --new-owner %s --nonce %d --gas-prices 10000000000award", 1, bob.Address(t), 0)
		tx := alice.Tx(t, newActionTxText)
		checks.SuccessTx(t, tx)

		actions, err := iActClient.Actions(alice.CallOps(t), act.TypesPageRequest{})
		require.NoError(t, err)
		require.NotEmpty(t, actions)
		require.Len(t, actions.Actions, 1)
		require.Equal(t, actions.Actions[0].Id, uint64(1))
		require.Equal(t, actions.Actions[0].Creator, alice.From)
		require.Equal(t, actions.Actions[0].Status, uint8(v1beta1.ActionStatus_ACTION_STATUS_COMPLETED))
		require.NotNil(t, actions.Actions[0].UpdatedAt)
		require.NotNil(t, actions.Actions[0].Result)
		require.Len(t, actions.Actions[0].Votes, 1)
		require.Equal(t, actions.Actions[0].Votes[0].VoteType, uint8(v1beta1.ActionVoteType_VOTE_TYPE_APPROVED))
		require.Equal(t, actions.Actions[0].Votes[0].Participant, alice.From)
		require.NotNil(t, actions.Actions[0].RejectExpression)
		require.NotNil(t, actions.Actions[0].ApproveExpression)
		require.NotNil(t, actions.Actions[0].CreatedAt)
		require.Len(t, actions.Actions[0].Mentions, 1)
		require.Equal(t, actions.Actions[0].Mentions[0], alice.From)

		actionById, err := iActClient.ActionById(alice.CallOps(t), 1)
		require.NoError(t, err)
		require.Equal(t, actionById.Action.Creator, alice.From)

		actionsByAddress, err := iActClient.ActionsByAddress(
			alice.CallOps(t),
			act.TypesPageRequest{},
			alice.From,
			uint8(actv1beta1.ActionStatus_ACTION_STATUS_COMPLETED))
		require.NoError(t, err)
		require.Len(t, actionsByAddress.Actions, 1)

		tx = alice.Tx(t,
			"warden new-action update-space --space-id 1 --approve-admin-template-id 1 --nonce 1")
		checks.SuccessTx(t, tx)
		time.Sleep(2 * time.Second) // TODO AT: replace by require.Eventually

		tx = alice.Tx(t,
			fmt.Sprintf("warden new-action add-space-owner --space-id %d --new-owner %s --nonce %d --expected-approve-expression \"%s\"",
				1, dave.Address(t), 2, "any(2, warden.space.owners)"))
		checks.SuccessTx(t, tx)
		time.Sleep(2 * time.Second) // TODO AT: replace by require.Eventually

		client.EnsureSpaceAmount(t, dave.Address(t), 0)

		revokeTx, err := iActClient.RevokeAction(alice.TransactOps(t), 3)
		require.NoError(t, err)

		actionRevokeReceipt := alice.Client.WaitMinedSuccess(t, revokeTx)

		actionStateChangeEvents, err := checks.GetParsedEventsOnly(actionRevokeReceipt, iActClient.ParseActionStateChange)
		require.NoError(t, err)
		require.Len(t, actionStateChangeEvents, 1)

		actionById, err = iActClient.ActionById(alice.CallOps(t), 3)
		require.NoError(t, err)
		require.Equal(t, actionById.Action.Id, uint64(3))
		require.Equal(t, actionById.Action.Status, uint8(actv1beta1.ActionStatus_ACTION_STATUS_REVOKED))

		tx = alice.Tx(t,
			fmt.Sprintf("warden new-action add-space-owner --space-id %d --new-owner %s --nonce %d --expected-approve-expression \"%s\"",
				1, dave.Address(t), 2, "any(2, warden.space.owners)"))
		checks.SuccessTx(t, tx)
		time.Sleep(2 * time.Second) // TODO AT: replace by require.Eventually

		client.EnsureSpaceAmount(t, dave.Address(t), 0)

		voteTx, err := iActClient.VoteForAction(bob.TransactOps(t), 4, 1)
		require.NoError(t, err)

		actionVotedReceipt := bob.Client.WaitMinedSuccess(t, voteTx)

		client.EnsureSpaceAmount(t, dave.Address(t), 1)

		actionVotedEvents, err := checks.GetParsedEventsOnly(actionVotedReceipt, iActClient.ParseActionVoted)
		require.NoError(t, err)
		require.Len(t, actionVotedEvents, 1)
		require.Equal(t, actionVotedEvents[0].Participant, bob.From)
		require.Equal(t, actionVotedEvents[0].VoteType, uint8(actv1beta1.ActionVoteType_VOTE_TYPE_APPROVED))
		require.Equal(t, actionVotedEvents[0].ActionId, uint64(4))

		addSpaceOwnerEvents, err := checks.GetParsedEventsOnly(actionVotedReceipt, iWardenClient.ParseAddSpaceOwner)
		require.NoError(t, err)
		require.Len(t, addSpaceOwnerEvents, 1)
		require.Equal(t, addSpaceOwnerEvents[0].SpaceId, uint64(1))
		require.Equal(t, addSpaceOwnerEvents[0].NewOwner, dave.From)

		actionStateChangeEvents, err = checks.GetParsedEventsOnly(actionVotedReceipt, iActClient.ParseActionStateChange)
		require.NoError(t, err)
		require.Len(t, actionStateChangeEvents, 1)
		require.Equal(t, actionStateChangeEvents[0].ActionId, uint64(4))
		require.Equal(t, actionStateChangeEvents[0].PreviousStatus, uint8(actv1beta1.ActionStatus_ACTION_STATUS_PENDING))
		require.Equal(t, actionStateChangeEvents[0].NewStatus, uint8(actv1beta1.ActionStatus_ACTION_STATUS_COMPLETED))
	})
}
