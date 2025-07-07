package cases

import (
	"testing"

	"github.com/stretchr/testify/require"

	"github.com/warden-protocol/wardenprotocol/tests/framework"
	"github.com/warden-protocol/wardenprotocol/tests/framework/checks"
	"github.com/warden-protocol/wardenprotocol/tests/framework/exec"
	json_user "github.com/warden-protocol/wardenprotocol/tests/testdata/contracts/json-user"
)

func init() {
	Register(&Test_JsonPrecompileUser{})
}

type Test_JsonPrecompileUser struct {
	w *exec.WardenNode
}

func (c *Test_JsonPrecompileUser) Setup(t *testing.T, f *framework.F) {
	c.w = f.StartNodeFromSnapshot(t, framework.SnapshotPrecompiles)
}

func (c *Test_JsonPrecompileUser) Run(t *testing.T, f *framework.F) {
	alice := exec.NewWardendEth(t, c.w, "alice")

	_, _, instance, err := json_user.DeployJsonUser(alice.TransactOps(t), alice.Client)
	require.NoError(t, err)

	createdJsonTx, err := instance.DoSomeJsonActions(
		alice.TransactOps(t),
	)
	require.NoError(t, err)

	receipt := alice.Client.WaitMinedSuccess(t, createdJsonTx)
	require.Equal(t, receipt.Status, uint64(1))

	okEvents, err := checks.GetParsedEventsOnly(receipt, instance.ParseOk)
	require.NoError(t, err)
	require.Len(t, okEvents, 1)
	require.Equal(t, okEvents[0].Arg0, int8(1))
}
