package cases

import (
	"context"
	"fmt"
	"testing"

	"github.com/stretchr/testify/require"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"

	"github.com/warden-protocol/wardenprotocol/tests/framework"
	"github.com/warden-protocol/wardenprotocol/tests/framework/checks"
	"github.com/warden-protocol/wardenprotocol/tests/framework/exec"
)

func init() {
	Register(&Test_ApproveAny3Action{})
}

type Test_ApproveAny3Action struct {
	w *exec.WardenNode
}

func (c *Test_ApproveAny3Action) Setup(t *testing.T, ctx context.Context, build framework.BuildResult) {
	c.w = exec.NewWardenNode(t, build.Wardend)

	go c.w.Start(t, ctx, "./testdata/snapshot-many-users")
	c.w.WaitRunnning(t)
}

func (c *Test_ApproveAny3Action) Run(t *testing.T, ctx context.Context, _ framework.BuildResult) {
	client := TestGRPCClient(*c.w.GRPCClient(t))

	alice := exec.NewWardend(c.w, "alice")
	bob := exec.NewWardend(c.w, "bob")
	charlie := exec.NewWardend(c.w, "charlie")
	dave := exec.NewWardend(c.w, "dave")

	addNewOwnerCommandTemplate := "warden new-action add-space-owner --space-id %d --new-owner %s --nonce %d"

	resAddOwner := bob.Tx(t, fmt.Sprintf(addNewOwnerCommandTemplate, 1, bob.Address(t), 0)) //1
	checks.SuccessTx(t, resAddOwner)
	client.EnsureSpaceAmount(t, ctx, bob.Address(t), 0)

	resApproveBob := alice.Tx(t, "act vote-for-action --vote-type vote-type-approved --action-id 1")
	checks.SuccessTx(t, resApproveBob)
	client.EnsureSpaceAmount(t, ctx, bob.Address(t), 1)

	resAddOwner2 := alice.Tx(t, fmt.Sprintf(addNewOwnerCommandTemplate, 1, charlie.Address(t), 1)) //2
	checks.SuccessTx(t, resAddOwner2)
	client.EnsureSpaceAmount(t, ctx, charlie.Address(t), 1)

	newApproveRuleDefinition := "\"any(3, warden.space.owners)\""
	resNewRule := alice.Tx(t, "act new-rule --name approve_requires_three --definition "+newApproveRuleDefinition)
	checks.SuccessTx(t, resNewRule)

	resUpdateSpaceAdminRuleByAlice := alice.Tx(t, "warden new-action update-space --space-id 1 --approve-admin-rule-id 1 --nonce 2") //3
	checks.SuccessTx(t, resUpdateSpaceAdminRuleByAlice)

	spaceAfterValidApprove, err := client.Warden.SpaceById(ctx, &types.QuerySpaceByIdRequest{
		Id: 1,
	})
	require.NoError(t, err)
	require.Equal(t, uint64(1), spaceAfterValidApprove.Space.ApproveAdminRuleId)

	addNewOwnerCommandTemplate = "warden new-action add-space-owner --space-id %d --new-owner %s --nonce %d --expected-approve-expression %s"

	resAliceAddOwnerDave := alice.Tx(t, fmt.Sprintf(addNewOwnerCommandTemplate, 1, dave.Address(t), 3, newApproveRuleDefinition)) //4
	checks.SuccessTx(t, resAliceAddOwnerDave)
	client.EnsureSpaceAmount(t, ctx, dave.Address(t), 0)

	resApproveDaveByBob := bob.Tx(t, "act vote-for-action --vote-type vote-type-approved --action-id 4")
	checks.SuccessTx(t, resApproveDaveByBob)
	client.EnsureSpaceAmount(t, ctx, dave.Address(t), 0)

	resApproveDaveByCharlie := charlie.Tx(t, "act vote-for-action --vote-type vote-type-approved --action-id 4")
	checks.SuccessTx(t, resApproveDaveByCharlie)
	client.EnsureSpaceAmount(t, ctx, dave.Address(t), 1)

}
