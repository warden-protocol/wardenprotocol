package cases

import (
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
	Register(&Test_RejectAny3Action{})
}

type Test_RejectAny3Action struct {
	w *exec.WardenNode
}

func (c *Test_RejectAny3Action) Setup(t *testing.T, f *framework.F) {
	c.w = f.StartNodeFromSnapshot(t, framework.SnapshotManyUsers)
}

func (c *Test_RejectAny3Action) Run(t *testing.T, _ *framework.F) {
	client := TestGRPCClient(*c.w.GRPCClient(t))

	alice := exec.NewWardend(c.w, "alice")
	bob := exec.NewWardend(c.w, "bob")
	charlie := exec.NewWardend(c.w, "charlie")
	dave := exec.NewWardend(c.w, "dave")

	addNewOwnerCommandTemplate := "warden new-action add-space-owner --space-id %d --new-owner %s --nonce %d"

	resAddOwner := bob.Tx(t, fmt.Sprintf(addNewOwnerCommandTemplate, 1, bob.Address(t), 0)) // 1
	checks.SuccessTx(t, resAddOwner)
	client.EnsureSpaceAmount(t, bob.Address(t), 0)

	resApproveBob := alice.Tx(t, "act vote-for-action --vote-type vote-type-approved --action-id 1")
	checks.SuccessTx(t, resApproveBob)
	client.EnsureSpaceAmount(t, bob.Address(t), 1)

	resAddOwner2 := alice.Tx(t, fmt.Sprintf(addNewOwnerCommandTemplate, 1, charlie.Address(t), 1)) // 2
	checks.SuccessTx(t, resAddOwner2)
	client.EnsureSpaceAmount(t, charlie.Address(t), 1)

	newRejectTemplateDefinition := "\"any(3, warden.space.owners)\""
	resNewTemplate := alice.Tx(t, "act new-template --name reject_requires_three --definition "+newRejectTemplateDefinition)
	checks.SuccessTx(t, resNewTemplate)

	newApproveTemplateDefinition := "\"any(2, warden.space.owners)\""
	resNewTemplate2 := alice.Tx(t, "act new-template --name approve_requires_two --definition "+newApproveTemplateDefinition)
	checks.SuccessTx(t, resNewTemplate2)

	resUpdateSpaceAdminTemplateByAlice := alice.Tx(t, "warden new-action update-space --space-id 1 --reject-admin-template-id 1 --approve-admin-template-id 2 --nonce 2") // 3
	checks.SuccessTx(t, resUpdateSpaceAdminTemplateByAlice)

	spaceAfterValidApprove, err := client.Warden.SpaceById(t.Context(), &types.QuerySpaceByIdRequest{
		Id: 1,
	})
	require.NoError(t, err)
	require.Equal(t, uint64(1), spaceAfterValidApprove.Space.RejectAdminTemplateId)
	require.Equal(t, uint64(2), spaceAfterValidApprove.Space.ApproveAdminTemplateId)

	addNewOwnerCommandTemplate = "warden new-action add-space-owner --space-id %d --new-owner %s --nonce %d --expected-reject-expression %s --expected-approve-expression %s"

	resAliceAddOwnerDave := alice.Tx(t, fmt.Sprintf(addNewOwnerCommandTemplate, 1, dave.Address(t), 3, newRejectTemplateDefinition, newApproveTemplateDefinition)) // 4
	checks.SuccessTx(t, resAliceAddOwnerDave)
	client.EnsureSpaceAmount(t, dave.Address(t), 0)

	resRejectDaveByAlice := alice.Tx(t, "act vote-for-action --vote-type vote-type-rejected --action-id 4")
	checks.SuccessTx(t, resRejectDaveByAlice)
	client.EnsureSpaceAmount(t, dave.Address(t), 0)
	client.EnsureActionStatus(t, 4, acttypes.ActionStatus_ACTION_STATUS_PENDING)

	resRejectDaveByBob := bob.Tx(t, "act vote-for-action --vote-type vote-type-rejected --action-id 4")
	checks.SuccessTx(t, resRejectDaveByBob)
	client.EnsureSpaceAmount(t, dave.Address(t), 0)
	client.EnsureActionStatus(t, 4, acttypes.ActionStatus_ACTION_STATUS_PENDING)

	resRejectDaveByCharlie := charlie.Tx(t, "act vote-for-action --vote-type vote-type-rejected --action-id 4")
	checks.SuccessTx(t, resRejectDaveByCharlie)
	client.EnsureSpaceAmount(t, dave.Address(t), 0)
	client.EnsureActionStatus(t, 4, acttypes.ActionStatus_ACTION_STATUS_REVOKED)
}
