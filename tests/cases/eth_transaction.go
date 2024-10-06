package cases

import (
	"context"
	"fmt"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/stretchr/testify/require"
	"github.com/warden-protocol/wardenprotocol/precompiles/act"
	"github.com/warden-protocol/wardenprotocol/tests/framework/checks"
	"testing"

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

	tx := alice.Tx(t, fmt.Sprintf("warden new-action add-space-owner --space-id %d --new-owner %s --nonce %d", 1, bob.Address(t), 0))
	checks.SuccessTx(t, tx)

	evmClient := c.w.EthClient(t)
	iActClient, err := act.NewIAct(common.HexToAddress(act.PrecompileAddress), evmClient)
	require.NoError(t, err)

	actions, err := iActClient.Actions(&bind.CallOpts{
		From: common.HexToAddress(alice.Address(t)),
	}, act.TypesPageRequest{})
	if err != nil {
		t.Fatal(err)
	}
	require.NotEmpty(t, actions)
	require.Len(t, actions.Actions, 1)
}
