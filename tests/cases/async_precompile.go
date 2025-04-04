package cases

import (
	"testing"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/stretchr/testify/require"

	"github.com/warden-protocol/wardenprotocol/precompiles/async"
	"github.com/warden-protocol/wardenprotocol/tests/framework"
	"github.com/warden-protocol/wardenprotocol/tests/framework/checks"
	"github.com/warden-protocol/wardenprotocol/tests/framework/exec"
)

func init() {
	Register(&Test_AsyncPrecompile{})
}

type Test_AsyncPrecompile struct {
	w *exec.WardenNode
}

func (c *Test_AsyncPrecompile) Setup(t *testing.T, build framework.BuildResult) {
	c.w = exec.NewWardenNode(t, build.Wardend)

	go c.w.Start(t, "./testdata/snapshot-many-users")
	c.w.WaitRunning(t)
}

// TODO(backsapc): Implement positive test cases with async sidecar integration.
func (c *Test_AsyncPrecompile) Run(t *testing.T, _ framework.BuildResult) {
	alice := exec.NewWardend(c.w, "alice")

	evmClient := c.w.EthClient(t)
	iAsyncClient, err := async.NewIAsync(common.HexToAddress(async.PrecompileAddress), evmClient)
	require.NoError(t, err)

	futuresQuery, err := iAsyncClient.Futures(alice.CallOps(t), async.TypesPageRequest{}, common.Address{})
	require.NoError(t, err)
	require.Len(t, futuresQuery.Futures, 0)

	addFutureTx, err := iAsyncClient.AddFuture(alice.TransactOps(t, evmClient), "echo", []byte("USDT"), common.HexToAddress("0x0000000000000000000000000000000000000000"))
	require.NoError(t, err)

	addFutureReceipt, err := bind.WaitMined(t.Context(), evmClient, addFutureTx)
	require.NoError(t, err)

	createFutureEvents, err := checks.GetParsedEventsOnly(addFutureReceipt, iAsyncClient.ParseCreateFuture)
	require.NoError(t, err)
	require.Len(t, createFutureEvents, 1)

	createFutureEvent := createFutureEvents[0]
	require.Equal(t, "echo", createFutureEvent.Handler)
	require.Equal(t, uint64(1), createFutureEvent.FutureId)
	require.Equal(t, alice.EthAddress(t), createFutureEvent.Creator)

	oneFuturesQuery, err := iAsyncClient.Futures(alice.CallOps(t), async.TypesPageRequest{}, common.Address{})
	require.NoError(t, err)
	require.Len(t, oneFuturesQuery.Futures, 1)

	oneFuture := oneFuturesQuery.Futures[0]
	require.Equal(t, uint64(1), oneFuture.Future.Id)
	require.Equal(t, alice.EthAddress(t), oneFuture.Future.Creator)
	require.Equal(t, "echo", oneFuture.Future.Handler)
	require.Equal(t, []byte("USDT"), oneFuture.Future.Input)
	require.Equal(t, async.FutureResult{
		Output:    []byte{},
		Submitter: []byte{},
	}, oneFuture.Result)

	onePendingFuturesQuery, err := iAsyncClient.PendingFutures(alice.CallOps(t), async.TypesPageRequest{})
	require.NoError(t, err)
	require.Len(t, oneFuturesQuery.Futures, 1)

	onePendingFuture := onePendingFuturesQuery.Futures[0]
	require.Equal(t, uint64(1), onePendingFuture.Id)
	require.Equal(t, alice.EthAddress(t), onePendingFuture.Creator)
	require.Equal(t, "echo", onePendingFuture.Handler)
	require.Equal(t, []byte("USDT"), onePendingFuture.Input)
}
