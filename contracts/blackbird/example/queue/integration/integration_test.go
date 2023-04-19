package integration

import (
	"path/filepath"
	"testing"

	"github.com/CosmWasm/cosmwasm-go/example/queue/src"
	"github.com/CosmWasm/cosmwasm-go/systest"
	mocks "github.com/CosmWasm/wasmvm/api"
	"github.com/stretchr/testify/require"
)

var contractPath = filepath.Join("..", "queue.wasm")

func instance(t *testing.T) *systest.Instance {
	i := systest.NewInstance(t, contractPath, 15_000_000_000_000, nil)
	return &i
}

func TestExecute(t *testing.T) {
	i := instance(t)
	env := mocks.MockEnv()
	info := mocks.MockInfo("none", nil)
	// queue empty
	_, gas, err := i.Execute(env, info, src.ExecuteMsg{Enqueue: &src.Enqueue{Value: 5}})
	require.NoError(t, err)
	t.Logf("empty queue cost: %d", gas)
	// check one item in the queue only
	respBytes, _, err := i.Query(env, src.QueryMsg{Count: &struct{}{}})
	require.NoError(t, err)
	resp := new(src.CountResponse)
	require.NoError(t, resp.UnmarshalJSON(respBytes))
	require.Equal(t, resp.Count, uint32(1))

	// enqueue another item
	_, _, err = i.Execute(env, info, src.ExecuteMsg{Enqueue: &src.Enqueue{Value: 6}})
	require.NoError(t, err)
	// dequeue two items so we can check if results are the expected ones
	exResp, gas, err := i.Execute(env, info, src.ExecuteMsg{Dequeue: &src.Dequeue{}})
	require.NoError(t, err)
	require.NotEmpty(t, exResp.Data)
	item := new(src.Item)
	require.NoError(t, item.UnmarshalJSON(exResp.Data))
	require.Equal(t, int32(5), item.Value)

	exResp, gas, err = i.Execute(env, info, src.ExecuteMsg{Dequeue: &src.Dequeue{}})
	require.NoError(t, err)
	require.NotEmpty(t, exResp.Data)
	item = new(src.Item)
	require.NoError(t, item.UnmarshalJSON(exResp.Data))
	require.Equal(t, int32(6), item.Value)
}

func TestQuery(t *testing.T) {
	const queueValues = 50

	instance := instance(t)
	env := mocks.MockEnv()
	info := mocks.MockInfo("none", nil)

	var expectedSum int32

	for i := 0; i < queueValues; i++ {
		_, _, err := instance.Execute(env, info, &src.ExecuteMsg{Enqueue: &src.Enqueue{Value: int32(i + 100)}})
		require.NoError(t, err)
		expectedSum += int32(i + 100)
	}

	countBytes, gas, err := instance.Query(env, &src.QueryMsg{Count: &struct{}{}})
	require.NoError(t, err)
	countResp := new(src.CountResponse)
	require.NoError(t, countResp.UnmarshalJSON(countBytes))
	require.Equal(t, countResp.Count, uint32(queueValues))
	t.Logf("count gas: %d", gas)

	sumBytes, gas, err := instance.Query(env, &src.QueryMsg{Sum: &struct{}{}})
	require.NoError(t, err)
	sumResp := new(src.SumResponse)
	require.NoError(t, sumResp.UnmarshalJSON(sumBytes))
	require.Equal(t, expectedSum, sumResp.Sum)
	t.Logf("sum gas: %d", gas)

	listBytes, gas, err := instance.Query(env, &src.QueryMsg{List: &struct{}{}})
	require.NoError(t, err)
	listResp := new(src.ListResponse)
	require.NoError(t, listResp.UnmarshalJSON(listBytes))
	require.Len(t, listResp.Empty, 0)
	require.Len(t, listResp.Early, 20)
	require.Len(t, listResp.Late, queueValues-20)
	t.Logf("list gas: %d", gas)

	reducerBytes, gas, err := instance.Query(env, &src.QueryMsg{Reducer: &struct{}{}})
	require.NoError(t, err)
	reducerResp := new(src.ReducerResponse)
	require.NoError(t, reducerResp.UnmarshalJSON(reducerBytes))
	t.Logf("reducer gas: %d", gas)
}
