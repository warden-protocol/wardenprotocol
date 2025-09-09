package cases

import (
	"context"
	"encoding/hex"
	"testing"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/stretchr/testify/require"

	"github.com/warden-protocol/wardenprotocol/tests/framework"
	"github.com/warden-protocol/wardenprotocol/tests/framework/checks"
	"github.com/warden-protocol/wardenprotocol/tests/framework/exec"
	"github.com/warden-protocol/wardenprotocol/tests/testdata/contracts"
)

func init() {
	Register(&Test_AsyncCallbacks{})
}

type Test_AsyncCallbacks struct {
	w *exec.WardenNode
}

func (c *Test_AsyncCallbacks) Setup(t *testing.T, f *framework.F) {
	c.w = f.StartNodeFromSnapshot(t, framework.SnapshotPrecompiles)
}

func Wrap[F func()](w *exec.Wardend) {
}

func (c *Test_AsyncCallbacks) Run(t *testing.T, f *framework.F) {
	t.Skip("x/async is disabled")

	// deploy the smart contract
	alice := exec.NewWardendEth(t, c.w, "alice")

	aliceCallEvm := alice.CallOps(t)

	_, deployTx, instance, err := contracts.DeployAsyncCallback(alice.TransactOps(t), alice.Client)
	require.NoError(t, err)

	_ = alice.Client.WaitDeployed(t, deployTx)

	got1, err := instance.Got1(aliceCallEvm)
	require.NoError(t, err)
	require.False(t, got1)

	// work() schedules the first callback
	msg := "hello echo"
	workTx, err := instance.Work(alice.TransactOps(t), msg, 100000)
	require.NoError(t, err)
	receipt := alice.Client.WaitMinedSuccess(t, workTx)
	require.Equal(t, receipt.Status, uint64(1))

	// wait for the callback
	checks.Eventually(t, func(ctx context.Context) (bool, bool) {
		got1, err := instance.Got1(aliceCallEvm)
		require.NoError(t, err)

		return got1, got1
	})

	// assert callback execution emitted a log
	iter, err := instance.FilterStoredNumber(&bind.FilterOpts{}, nil)
	require.NoError(t, err)
	require.True(t, iter.Next())
	require.Equal(t, int64(42), iter.Event.CoolNumber.Int64())
	err = iter.Close()
	require.NoError(t, err)

	// assert the output from the callback is what we expected
	output, err := instance.Output(aliceCallEvm)
	require.NoError(t, err)
	require.Equal(t, msg, string(output))

	// wait for the second (nested) callback to be executed
	checks.Eventually(t, func(ctx context.Context) (bool, bool) {
		got2, err := instance.Got2(aliceCallEvm)
		require.NoError(t, err)

		return got2, got2
	})

	// assert second callback output is what we expected
	output2, err := instance.Output2(aliceCallEvm)
	require.NoError(t, err)
	require.Equal(t, "hello again", string(output2))
}

func StringToHex(s string) string {
	return "0x" + hex.EncodeToString([]byte(s))
}
