package src

import (
	"encoding/json"
	"math/rand"
	"testing"
	"time"

	"github.com/CosmWasm/cosmwasm-go/std"
	"github.com/CosmWasm/cosmwasm-go/std/mock"
	"github.com/CosmWasm/cosmwasm-go/std/types"
	"github.com/stretchr/testify/require"
)

func encode(t *testing.T, msg json.Marshaler) []byte {
	x, err := msg.MarshalJSON()
	require.NoError(t, err)
	return x
}

func TestExecute_Enqueue(t *testing.T) {
	deps := mock.Deps(nil)
	env := mock.Env()
	info := mock.Info("none", nil)
	// queue empty
	_, err := Execute(deps, env, info, encode(t, ExecuteMsg{Enqueue: &Enqueue{Value: 5}}))
	require.NoError(t, err)
	iter := deps.Storage.Range(nil, nil, std.Ascending)
	k, v, err := iter.Next()
	require.NoError(t, err)
	require.Equal(t, k, []byte{FirstKey})
	got := new(Item)
	require.NoError(t, got.UnmarshalJSON(v))
	// matching values
	require.Equal(t, &Item{Value: 5}, got)
	// no more results
	_, _, err = iter.Next()
	require.Error(t, err)
	require.Equal(t, err.Error(), std.ErrIteratorDone.Error())

	// queue not empty
	_, err = Execute(deps, env, info, encode(t, ExecuteMsg{Enqueue: &Enqueue{Value: 8}}))
	require.NoError(t, err)
	iter = deps.Storage.Range(nil, nil, std.Ascending)
	_, _, err = iter.Next() // skip first key
	require.NoError(t, err)
	k, v, err = iter.Next() // second key
	require.NoError(t, err)
	require.Equal(t, FirstKey+1, k[0]) // first key +1
	got = new(Item)
	require.NoError(t, got.UnmarshalJSON(v))
	// matching values
	require.Equal(t, &Item{Value: 8}, got)
	// no more results
	_, _, err = iter.Next()
	require.Error(t, err)
	require.Equal(t, err.Error(), std.ErrIteratorDone.Error())
}

func TestExecute_Dequeue(t *testing.T) {
	deps := mock.Deps(nil)
	env := mock.Env()
	info := mock.Info("none", nil)

	// execute dequeue on empty queue
	resp, err := Execute(deps, env, info, encode(t, &ExecuteMsg{Dequeue: &Dequeue{}}))
	require.NoError(t, err)
	require.Empty(t, resp.Data)

	// execute dequeue on filled queue
	_, err = Execute(deps, env, info, encode(t, &ExecuteMsg{Enqueue: &Enqueue{Value: 10}}))
	require.NoError(t, err)

	resp, err = Execute(deps, env, info, encode(t, &ExecuteMsg{Dequeue: &Dequeue{}}))
	require.NoError(t, err)

	item := new(Item)
	require.NoError(t, item.UnmarshalJSON(resp.Data))

	require.Equal(t, item.Value, int32(10))
}

func TestMigrate(t *testing.T) {
	deps := mock.Deps(nil)

	_, err := executeEnqueue(deps, types.Env{}, types.MessageInfo{}, &Enqueue{Value: 1})
	require.NoError(t, err)

	_, err = Migrate(deps, types.Env{}, nil)
	require.NoError(t, err)

	iter := deps.Storage.Range(nil, nil, std.Ascending)
	for i := 100; i < 103; i++ {
		k, v, err := iter.Next()
		require.NoError(t, err)
		require.Equal(t, k[0], uint8(i-100))

		item := new(Item)
		require.NoError(t, item.UnmarshalJSON(v))
		require.Equal(t, item.Value, int32(i))
	}
}

func TestQuery_Count(t *testing.T) {
	deps := mock.Deps(nil)
	env := mock.Env()
	info := mock.Info("none", nil)

	for i := int32(0); i < 20; i++ {
		_, err := executeEnqueue(deps, env, info, &Enqueue{Value: i})
		require.NoError(t, err)
	}

	respBytes, err := Query(deps, env, encode(t, QueryMsg{Count: &struct{}{}}))
	require.NoError(t, err)

	resp := new(CountResponse)
	require.NoError(t, resp.UnmarshalJSON(respBytes))

	require.Equal(t, uint32(20), resp.Count)
}

func TestQuery_Sum(t *testing.T) {
	deps := mock.Deps(nil)
	env := mock.Env()
	info := mock.Info("none", nil)
	rand.Seed(time.Now().UnixNano())

	total := int32(0)
	for i := 0; i < rand.Intn(100); i++ {
		v := rand.Int31()
		_, err := executeEnqueue(deps, env, info, &Enqueue{Value: v})
		require.NoError(t, err)
		total += v
	}

	respBytes, err := Query(deps, env, encode(t, QueryMsg{Sum: &struct{}{}}))
	require.NoError(t, err)

	resp := new(SumResponse)
	require.NoError(t, resp.UnmarshalJSON(respBytes))

	require.Equal(t, total, resp.Sum)
}

func TestQuery_List(t *testing.T) {
	const queueLength = 50
	deps := mock.Deps(nil)
	env := mock.Env()
	info := mock.Info("none", nil)

	for i := 0; i < queueLength; i++ {
		_, err := executeEnqueue(deps, env, info, &Enqueue{Value: int32(i)})
		require.NoError(t, err)
	}

	respBytes, err := Query(deps, env, encode(t, &QueryMsg{List: &struct{}{}}))
	require.NoError(t, err)

	resp := new(ListResponse)
	require.NoError(t, resp.UnmarshalJSON(respBytes))

	require.Len(t, resp.Empty, 0)
	require.Len(t, resp.Early, 20)            // [0..19)
	require.Len(t, resp.Late, queueLength-20) // [19..iter end]
}

// TestQuery_Reducer takes from https://github.com/CosmWasm/cosmwasm/blob/main/contracts/queue/src/contract.rs#L320
func TestQuery_Reducer(t *testing.T) {
	deps := mock.Deps(nil)
	env := mock.Env()
	info := mock.Info("none", nil)

	expected := [][2]int32{
		{40, 85},
		{15, 125},
		{85, 0},
		{-10, 140},
	}

	toPush := []int32{40, 15, 85, -10}
	for _, v := range toPush {
		_, err := Execute(deps, env, info, encode(t, ExecuteMsg{Enqueue: &Enqueue{Value: v}}))
		require.NoError(t, err)
	}

	respBytes, err := Query(deps, env, encode(t, &QueryMsg{Reducer: &struct{}{}}))
	require.NoError(t, err)

	resp := new(ReducerResponse)
	require.NoError(t, resp.UnmarshalJSON(respBytes))
	require.Equal(t, expected, resp.Counters)
}
