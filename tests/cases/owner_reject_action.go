package cases

import (
	"context"
	"fmt"
	"testing"

	"github.com/stretchr/testify/require"
	"github.com/warden-protocol/wardenprotocol/tests/framework"
	"github.com/warden-protocol/wardenprotocol/tests/framework/checks"
	"github.com/warden-protocol/wardenprotocol/tests/framework/exec"
	acttypes "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func init() {
	Register(&Test_OwnerRejectAction{})
}

type Test_OwnerRejectAction struct {
	w *exec.WardenNode
}

func (c *Test_OwnerRejectAction) Setup(t *testing.T, ctx context.Context, build framework.BuildResult) {
	c.w = exec.NewWardenNode(t, build.Wardend)

	go c.w.Start(t, ctx, "./testdata/snapshot-many-users")
	c.w.WaitRunnning(t)
}

func (c *Test_OwnerRejectAction) Run(t *testing.T, ctx context.Context, _ framework.BuildResult) {
	client := TestGRPCClient(*c.w.GRPCClient(t))

	alice := exec.NewWardend(c.w, "alice")
	bob := exec.NewWardend(c.w, "bob")
	charlie := exec.NewWardend(c.w, "charlie")
	// dave := exec.NewWardend(c.w, "dave")

	addNewOwnerCommandTemplate := "warden new-action add-space-owner --space-id %d --new-owner %s --nonce %d"

	resAddOwner := bob.Tx(t, fmt.Sprintf(addNewOwnerCommandTemplate, 1, bob.Address(t), 0))
	checks.SuccessTx(t, resAddOwner)
	client.EnsureSpaceAmount(t, ctx, bob.Address(t), 0)

	resRejectBob := alice.Tx(t, "act vote-for-action --vote-type vote-type-rejected --action-id 1")
	checks.SuccessTx(t, resRejectBob)
	client.EnsureSpaceAmount(t, ctx, bob.Address(t), 0)

	newRejectRuleDefinition := "\"any(2, warden.space.owners)\""
	resNewRule := alice.Tx(t, "act new-rule --name requires_two --definition "+newRejectRuleDefinition)
	checks.SuccessTx(t, resNewRule)

	updateSpaceRejectAdminRuleIdCommand := "warden new-action update-space --space-id 1 --reject-admin-rule-id 1 --nonce 0"

	resUpdateSpaceAdminRuleByCharlie := charlie.Tx(t, updateSpaceRejectAdminRuleIdCommand)
	checks.SuccessTx(t, resUpdateSpaceAdminRuleByCharlie)

	spaceAfterInvalidApprove, err := client.Warden.SpaceById(ctx, &types.QuerySpaceByIdRequest{
		Id: 1,
	})
	require.NoError(t, err)
	require.Equal(t, uint64(0), spaceAfterInvalidApprove.Space.RejectAdminRuleId)

	resUpdateSpaceAdminRuleByAlice := alice.Tx(t, updateSpaceRejectAdminRuleIdCommand)
	checks.SuccessTx(t, resUpdateSpaceAdminRuleByAlice)

	spaceAfterValidApprove, err := client.Warden.SpaceById(ctx, &types.QuerySpaceByIdRequest{
		Id: 1,
	})
	require.NoError(t, err)
	require.Equal(t, uint64(1), spaceAfterValidApprove.Space.RejectAdminRuleId)

	addNewOwnerCommandTemplate = "warden new-action add-space-owner --space-id %d --new-owner %s --nonce %d --expected-reject-expression %s"

	resAliceAddOwnerBob := alice.Tx(t, fmt.Sprintf(addNewOwnerCommandTemplate, 1, bob.Address(t), 1, newRejectRuleDefinition))
	checks.SuccessTx(t, resAliceAddOwnerBob)
	client.EnsureSpaceAmount(t, ctx, bob.Address(t), 1)

	resAddOwner = charlie.Tx(t, fmt.Sprintf(addNewOwnerCommandTemplate, 1, charlie.Address(t), 2, newRejectRuleDefinition))
	checks.SuccessTx(t, resAddOwner)
	client.EnsureSpaceAmount(t, ctx, charlie.Address(t), 0)

	resRejectCharlieByAlice := alice.Tx(t, "act vote-for-action --vote-type vote-type-rejected --action-id 5")
	checks.SuccessTx(t, resRejectCharlieByAlice)
	client.EnsureActionStatus(t, ctx, 5, acttypes.ActionStatus_ACTION_STATUS_PENDING)
	client.EnsureSpaceAmount(t, ctx, charlie.Address(t), 0)

	resRejectCharlieByBob := bob.Tx(t, "act vote-for-action --vote-type vote-type-rejected --action-id 5")
	checks.SuccessTx(t, resRejectCharlieByBob)
	client.EnsureActionStatus(t, ctx, 5, acttypes.ActionStatus_ACTION_STATUS_REVOKED)
	client.EnsureSpaceAmount(t, ctx, charlie.Address(t), 0)
}
