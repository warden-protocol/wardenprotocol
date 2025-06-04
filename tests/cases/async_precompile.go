package cases

import (
	"math/big"
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

	tasksQuery, err := iAsyncClient.Tasks(alice.CallOps(t), async.TypesPageRequest{}, common.Address{})
	require.NoError(t, err)
	require.Len(t, tasksQuery.Tasks, 0)

	maxFee := []async.TypesCoin{{
		Denom:  "award",
		Amount: new(big.Int).SetInt64(1),
	}}
	addTaskTx, err := iAsyncClient.AddTask(
		alice.TransactOps(t, evmClient),
		"echo",
		[]byte("USDT"),
		maxFee,
		async.CallbackParams{})
	require.NoError(t, err)

	addTaskReceipt, err := bind.WaitMined(t.Context(), evmClient, addTaskTx)
	require.NoError(t, err)

	createTaskEvents, err := checks.GetParsedEventsOnly(addTaskReceipt, iAsyncClient.ParseCreateTask)
	require.NoError(t, err)
	require.Len(t, createTaskEvents, 1)

	createTaskEvent := createTaskEvents[0]
	require.Equal(t, "echo", createTaskEvent.Plugin)
	require.Equal(t, uint64(1), createTaskEvent.TaskId)
	require.Equal(t, alice.EthAddress(t), createTaskEvent.Creator)

	oneTasksQuery, err := iAsyncClient.Tasks(alice.CallOps(t), async.TypesPageRequest{}, common.Address{})
	require.NoError(t, err)
	require.Len(t, oneTasksQuery.Tasks, 1)

	oneTask := oneTasksQuery.Tasks[0]
	require.Equal(t, uint64(1), oneTask.Task.Id)
	require.Equal(t, alice.EthAddress(t), oneTask.Task.Creator)
	require.Equal(t, "echo", oneTask.Task.Plugin)
	require.Equal(t, []byte("USDT"), oneTask.Task.Input)
	require.Equal(t, async.TaskResult{
		Output: []byte{},
	}, oneTask.Result)

	onePendingTasksQuery, err := iAsyncClient.PendingTasks(alice.CallOps(t), async.TypesPageRequest{})
	require.NoError(t, err)
	require.Len(t, onePendingTasksQuery.Tasks, 1)

	onePendingTask := onePendingTasksQuery.Tasks[0]
	require.Equal(t, uint64(1), onePendingTask.Id)
	require.Equal(t, alice.EthAddress(t), onePendingTask.Creator)
	require.Equal(t, "echo", onePendingTask.Plugin)
	require.Equal(t, []byte("USDT"), onePendingTask.Input)
}
