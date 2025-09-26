package cases

import (
	"testing"

	"github.com/stretchr/testify/require"

	"github.com/warden-protocol/wardenprotocol/tests/framework"
	"github.com/warden-protocol/wardenprotocol/tests/framework/exec"
	"github.com/warden-protocol/wardenprotocol/tests/testdata/contracts"
)

func init() {
	Register(&Test_JsonParser{})
}

type Test_JsonParser struct {
	w *exec.WardenNode
}

func (c *Test_JsonParser) Setup(t *testing.T, f *framework.F) {
	c.w = f.StartNodeFromSnapshot(t, framework.SnapshotPrecompiles)
}

func (c *Test_JsonParser) Run(t *testing.T, f *framework.F) {
	// deploy the smart contract
	alice := exec.NewWardendEth(t, c.w, "alice")

	_, deployTx, instance, err := contracts.DeployJsonParser(alice.TransactOps(t), alice.Client)
	require.NoError(t, err)

	_ = alice.Client.WaitDeployed(t, deployTx)

	err = instance.Run(alice.CallOps(t))
	require.NoError(t, err)
}
