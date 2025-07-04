package cases

import (
	"math/big"
	"testing"

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

func (c *Test_AsyncPrecompile) Setup(t *testing.T, f *framework.F) {
	c.w = f.StartNodeFromSnapshot(t, framework.SnapshotPrecompiles)
}

// TODO(backsapc): Implement positive test cases with async sidecar integration.
func (c *Test_AsyncPrecompile) Run(t *testing.T, _ *framework.F) {
	alice := exec.NewWardendEth(t, c.w, "alice")

	iAsyncClient, err := async.NewIAsync(common.HexToAddress(async.PrecompileAddress), alice.Client)
	require.NoError(t, err)

	tasksQuery, err := iAsyncClient.Tasks(alice.CallOps(t), async.TypesPageRequest{}, common.Address{})
	require.NoError(t, err)
	require.Len(t, tasksQuery.Tasks, 0)

	maxFee := []async.TypesCoin{{
		Denom:  "award",
		Amount: new(big.Int).SetInt64(1),
	}}
	addTaskTx, err := iAsyncClient.AddTask(
		alice.TransactOps(t),
		"echo",
		[]byte("USDT"),
		maxFee,
		async.CallbackParams{})
	require.NoError(t, err)

	addTaskReceipt := alice.Client.WaitMinedSuccess(t, addTaskTx)

	createTaskEvents, err := checks.GetParsedEventsOnly(addTaskReceipt, iAsyncClient.ParseCreateTask)
	require.NoError(t, err)
	require.Len(t, createTaskEvents, 1)

	createTaskEvent := createTaskEvents[0]
	require.Equal(t, "echo", createTaskEvent.Plugin)
	require.Equal(t, uint64(1), createTaskEvent.TaskId)
	require.Equal(t, alice.From, createTaskEvent.Creator)

	oneTasksQuery, err := iAsyncClient.Tasks(alice.CallOps(t), async.TypesPageRequest{}, common.Address{})
	require.NoError(t, err)
	require.Len(t, oneTasksQuery.Tasks, 1)

	oneTask := oneTasksQuery.Tasks[0]
	require.Equal(t, uint64(1), oneTask.Task.Id)
	require.Equal(t, alice.From, oneTask.Task.Creator)
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
	require.Equal(t, alice.From, onePendingTask.Creator)
	require.Equal(t, "echo", onePendingTask.Plugin)
	require.Equal(t, []byte("USDT"), onePendingTask.Input)
}
