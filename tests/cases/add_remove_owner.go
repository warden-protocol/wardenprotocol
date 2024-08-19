package cases

import (
	"context"
	"testing"

	"github.com/stretchr/testify/require"
	"github.com/warden-protocol/wardenprotocol/tests/framework"
	"github.com/warden-protocol/wardenprotocol/tests/framework/checks"
	"github.com/warden-protocol/wardenprotocol/tests/framework/exec"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func init() {
	Register(&Test_AddRemoveOwner{})
}

type Test_AddRemoveOwner struct {
	w *exec.WardenNode
}

func (c *Test_AddRemoveOwner) Setup(t *testing.T, ctx context.Context, build framework.BuildResult) {
	c.w = exec.NewWardenNode(t, build.Wardend)

	go c.w.Start(t, ctx, "./testdata/snapshot-base")
	c.w.WaitRunnning(t)
}

func (c *Test_AddRemoveOwner) Run(t *testing.T, ctx context.Context, build framework.BuildResult) {
	alice := exec.NewWardend(c.w, "alice")
	res := alice.Tx(t, "warden new-space")
	checks.SuccessTx(t, res)

	resAddOwner := alice.Tx(t, "warden new-action add-space-owner --space-id 1 --new-owner warden10zm6farjqffkadjx8v0znx67x6a26f36p020td")
	checks.SuccessTx(t, resAddOwner)

	client := c.w.GRPCClient(t)
	spacesByOwnerRes, err := client.Warden.SpacesByOwner(ctx, &types.QuerySpacesByOwnerRequest{
		Owner: "warden10zm6farjqffkadjx8v0znx67x6a26f36p020td",
	})
	require.NoError(t, err)
	require.Equal(t, 1, len(spacesByOwnerRes.Spaces))

	resRemoveOwner := alice.Tx(t, "warden new-action remove-space-owner --space-id 1 --owner warden10zm6farjqffkadjx8v0znx67x6a26f36p020td")
	checks.SuccessTx(t, resRemoveOwner)

	spacesByOwnerRes2, err := client.Warden.SpacesByOwner(ctx, &types.QuerySpacesByOwnerRequest{
		Owner: "warden10zm6farjqffkadjx8v0znx67x6a26f36p020td",
	})
	require.NoError(t, err)
	require.Equal(t, 0, len(spacesByOwnerRes2.Spaces))
}
