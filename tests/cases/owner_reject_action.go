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
	Register(&Test_OwnerRejectAction{})
}

type Test_OwnerRejectAction struct {
	w *exec.WardenNode
}

func (c *Test_OwnerRejectAction) Setup(t *testing.T, build framework.BuildResult) {
	c.w = exec.NewWardenNode(t, build.Wardend)

	go c.w.Start(t, "./testdata/snapshot-many-users")
	c.w.WaitRunning(t)
}

func (c *Test_OwnerRejectAction) Run(t *testing.T, _ framework.BuildResult) {
	client := TestGRPCClient(*c.w.GRPCClient(t))

	alice := exec.NewWardend(c.w, "alice")
	bob := exec.NewWardend(c.w, "bob")
	charlie := exec.NewWardend(c.w, "charlie")
	// dave := exec.NewWardend(c.w, "dave")

	addNewOwnerCommandTemplate := "warden new-action add-space-owner --space-id %d --new-owner %s --nonce %d"

	resAddOwner := bob.Tx(t, fmt.Sprintf(addNewOwnerCommandTemplate, 1, bob.Address(t), 0))
	checks.SuccessTx(t, resAddOwner)
	client.EnsureSpaceAmount(t, bob.Address(t), 0)

	resRejectBob := alice.Tx(t, "act vote-for-action --vote-type vote-type-rejected --action-id 1")
	checks.SuccessTx(t, resRejectBob)
	client.EnsureSpaceAmount(t, bob.Address(t), 0)

	newRejectTemplateDefinition := "\"any(2, warden.space.owners)\""
	resNewTemplate := alice.Tx(t, "act new-template --name requires_two --definition "+newRejectTemplateDefinition)
	checks.SuccessTx(t, resNewTemplate)

	updateSpaceRejectAdminTemplateIdCommand := "warden new-action update-space --space-id 1 --reject-admin-template-id 1 --nonce 0"

	resUpdateSpaceAdminTemplateByCharlie := charlie.Tx(t, updateSpaceRejectAdminTemplateIdCommand)
	checks.SuccessTx(t, resUpdateSpaceAdminTemplateByCharlie)

	spaceAfterInvalidApprove, err := client.Warden.SpaceById(t.Context(), &types.QuerySpaceByIdRequest{
		Id: 1,
	})
	require.NoError(t, err)
	require.Equal(t, uint64(0), spaceAfterInvalidApprove.Space.RejectAdminTemplateId)

	resUpdateSpaceAdminTemplateByAlice := alice.Tx(t, updateSpaceRejectAdminTemplateIdCommand)
	checks.SuccessTx(t, resUpdateSpaceAdminTemplateByAlice)

	spaceAfterValidApprove, err := client.Warden.SpaceById(t.Context(), &types.QuerySpaceByIdRequest{
		Id: 1,
	})
	require.NoError(t, err)
	require.Equal(t, uint64(1), spaceAfterValidApprove.Space.RejectAdminTemplateId)

	addNewOwnerCommandTemplate = "warden new-action add-space-owner --space-id %d --new-owner %s --nonce %d --expected-reject-expression %s"

	resAliceAddOwnerBob := alice.Tx(t, fmt.Sprintf(addNewOwnerCommandTemplate, 1, bob.Address(t), 1, newRejectTemplateDefinition))
	checks.SuccessTx(t, resAliceAddOwnerBob)
	client.EnsureSpaceAmount(t, bob.Address(t), 1)

	resAddOwner = charlie.Tx(t, fmt.Sprintf(addNewOwnerCommandTemplate, 1, charlie.Address(t), 2, newRejectTemplateDefinition))
	checks.SuccessTx(t, resAddOwner)
	client.EnsureSpaceAmount(t, charlie.Address(t), 0)

	resRejectCharlieByAlice := alice.Tx(t, "act vote-for-action --vote-type vote-type-rejected --action-id 5")
	checks.SuccessTx(t, resRejectCharlieByAlice)
	client.EnsureActionStatus(t, 5, acttypes.ActionStatus_ACTION_STATUS_PENDING)
	client.EnsureSpaceAmount(t, charlie.Address(t), 0)

	resRejectCharlieByBob := bob.Tx(t, "act vote-for-action --vote-type vote-type-rejected --action-id 5")
	checks.SuccessTx(t, resRejectCharlieByBob)
	client.EnsureActionStatus(t, 5, acttypes.ActionStatus_ACTION_STATUS_REVOKED)
	client.EnsureSpaceAmount(t, charlie.Address(t), 0)
}
