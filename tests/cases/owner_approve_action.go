package cases

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/require"

	"github.com/warden-protocol/wardenprotocol/tests/framework"
	"github.com/warden-protocol/wardenprotocol/tests/framework/checks"
	"github.com/warden-protocol/wardenprotocol/tests/framework/exec"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func init() {
	Register(&Test_OwnerApproveAction{})
}

type Test_OwnerApproveAction struct {
	w *exec.WardenNode
}

func (c *Test_OwnerApproveAction) Setup(t *testing.T, build framework.BuildResult) {
	c.w = exec.NewWardenNode(t, build.Wardend)

	go c.w.Start(t, "./testdata/snapshot-many-users")
	c.w.WaitRunning(t)
}

func (c *Test_OwnerApproveAction) Run(t *testing.T, _ framework.BuildResult) {
	client := TestGRPCClient(*c.w.GRPCClient(t))

	alice := exec.NewWardend(c.w, "alice")
	bob := exec.NewWardend(c.w, "bob")
	charlie := exec.NewWardend(c.w, "charlie")
	dave := exec.NewWardend(c.w, "dave")

	//nolint:goconst
	addNewOwnerCommandTemplate := "warden new-action add-space-owner --space-id %d --new-owner %s --nonce %d"

	resAddOwner := bob.Tx(t, fmt.Sprintf(addNewOwnerCommandTemplate, 1, bob.Address(t), 0))
	checks.SuccessTx(t, resAddOwner)
	client.EnsureSpaceAmount(t, bob.Address(t), 0)

	resApproveBob := alice.Tx(t, "act vote-for-action --vote-type vote-type-approved --action-id 1")
	checks.SuccessTx(t, resApproveBob)
	client.EnsureSpaceAmount(t, bob.Address(t), 1)

	//nolint:goconst
	newApproveTemplateDefinition := "\"any(2, warden.space.owners)\""
	resNewTemplate := alice.Tx(t, "act new-template --name approve_requires_two --definition "+newApproveTemplateDefinition)
	checks.SuccessTx(t, resNewTemplate)

	updateSpaceApproveAdminTemplateIdCommand := "warden new-action update-space --space-id 1 --approve-admin-template-id 1 --nonce 1"

	resUpdateSpaceAdminTemplateByCharlie := charlie.Tx(t, updateSpaceApproveAdminTemplateIdCommand)
	checks.SuccessTx(t, resUpdateSpaceAdminTemplateByCharlie)

	spaceAfterInvalidApprove, err := client.Warden.SpaceById(t.Context(), &types.QuerySpaceByIdRequest{
		Id: 1,
	})
	require.NoError(t, err)
	require.Equal(t, uint64(0), spaceAfterInvalidApprove.Space.ApproveAdminTemplateId)

	resUpdateSpaceAdminTemplateByAlice := alice.Tx(t, updateSpaceApproveAdminTemplateIdCommand)
	checks.SuccessTx(t, resUpdateSpaceAdminTemplateByAlice)

	spaceAfterValidApprove, err := client.Warden.SpaceById(t.Context(), &types.QuerySpaceByIdRequest{
		Id: 1,
	})
	require.NoError(t, err)
	require.Equal(t, uint64(1), spaceAfterValidApprove.Space.ApproveAdminTemplateId)

	addNewOwnerCommandTemplate = "warden new-action add-space-owner --space-id %d --new-owner %s --nonce %d --expected-approve-expression %s"

	resAliceAddOwnerCharlie := alice.Tx(t, fmt.Sprintf(addNewOwnerCommandTemplate, 1, charlie.Address(t), 2, newApproveTemplateDefinition))
	checks.SuccessTx(t, resAliceAddOwnerCharlie)
	client.EnsureSpaceAmount(t, charlie.Address(t), 0)

	resApproveCharlie := bob.Tx(t, "act vote-for-action --vote-type vote-type-approved --action-id 4")
	checks.SuccessTx(t, resApproveCharlie)
	client.EnsureSpaceAmount(t, charlie.Address(t), 1)

	resCharlieAddOwnerDave := charlie.Tx(t, fmt.Sprintf(addNewOwnerCommandTemplate, 1, dave.Address(t), 3, newApproveTemplateDefinition))
	checks.SuccessTx(t, resCharlieAddOwnerDave)
	client.EnsureSpaceAmount(t, dave.Address(t), 0)

	resApproveDaveByBob := bob.Tx(t, "act vote-for-action --vote-type vote-type-approved --action-id 5")
	checks.SuccessTx(t, resApproveDaveByBob)
	client.EnsureSpaceAmount(t, dave.Address(t), 1)
}
