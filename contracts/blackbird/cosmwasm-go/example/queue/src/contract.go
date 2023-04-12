//go:generate ../../../bin/tinyjson -all -snake_case contract.go
package src

import (
	"errors"

	"github.com/CosmWasm/cosmwasm-go/std"
	"github.com/CosmWasm/cosmwasm-go/std/types"
)

// FirstKey defines the value of the default key,
// when no key is set in the contract so far.
// NOTE: keys are [1]byte length but in KV they're [n]bytes.
const FirstKey byte = 0

// Item defines the state object of the queue values.
type Item struct {
	Value int32 `json:"value"`
}

// Enqueue is the message used to add an Item to the queue.
type Enqueue struct {
	Value int32 `json:"value"`
}

// Dequeue is the message used to remove an Item from the queue.
type Dequeue struct{}

// ExecuteMsg defines all the messages that modify state that can be sent to the contract.
type ExecuteMsg struct {
	// Enqueue adds a value in the queue
	Enqueue *Enqueue `json:"enqueue"`
	// Dequeue removes a value from the queue
	Dequeue *Dequeue `json:"dequeue"`
}

// QueryMsg defines all the set of the possible queries that can be sent to the contract.
type QueryMsg struct {
	// Count counts how many items in the queue; returns CountResponse
	Count *struct{} `json:"count"`
	// Sum the number of values in the queue; returns SumResponse
	Sum *struct{} `json:"sum"`
	// Reducer keeps open two iters at once; returns ReducerResponse
	Reducer *struct{} `json:"reducer"`
	// List does multiple list operations; returns ListResponse
	List *struct{} `json:"list"`
}

// SumResponse is the total sum of Item in the queue values
type SumResponse struct {
	Sum int32 `json:"sum"`
}

// CountResponse is the total number of Item in the queue
type CountResponse struct {
	Count uint32 `json:"count"`
}

type ReducerResponse struct {
	Counters [][2]int32 `json:"counters"`
}

// ListResponse is the response returned by the List query
type ListResponse struct {
	Empty []uint32 `json:"empty"`
	Early []uint32 `json:"early"`
	Late  []uint32 `json:"late"`
}

// InstantiateMsg is the instantiation messages.
type InstantiateMsg struct{}

// Instantiate does nothing.
func Instantiate(_ *std.Deps, _ types.Env, _ types.MessageInfo, _ []byte) (*types.Response, error) {
	return &types.Response{}, nil
}

// Execute runs state modifying handlers of the contract given msg data.
func Execute(deps *std.Deps, env types.Env, info types.MessageInfo, data []byte) (*types.Response, error) {
	msg := ExecuteMsg{}
	err := msg.UnmarshalJSON(data)
	if err != nil {
		return nil, err
	}

	switch {
	case msg.Enqueue != nil:
		return executeEnqueue(deps, env, info, msg.Enqueue)
	case msg.Dequeue != nil:
		return executeDequeue(deps, env, info, msg.Dequeue)
	}
	return nil, errors.New("unknown request") // TODO(fdymylja): make this a common error in some package once we sort out devex on ExecuteMsg
}

func executeDequeue(deps *std.Deps, _ types.Env, _ types.MessageInfo, _ *Dequeue) (*types.Response, error) {
	iter := deps.Storage.Range(nil, nil, std.Ascending)
	resp := &types.Response{}
	k, v, err := iter.Next()
	// if queue is empty, then return an empty response to signal nothing was dequeued
	if err != nil {
		return resp, nil
	}
	// otherwise, delete the key and return the removed value
	deps.Storage.Remove(k)
	resp.Data = v
	return resp, nil
}

func executeEnqueue(deps *std.Deps, _ types.Env, _ types.MessageInfo, enqueue *Enqueue) (*types.Response, error) {
	iter := deps.Storage.Range(nil, nil, std.Descending)
	nextKey := []byte{FirstKey}
	dbKey, _, err := iter.Next()
	if err == nil {
		nextKey[0] = dbKey[0] + 1
	}
	value, err := (Item{Value: enqueue.Value}).MarshalJSON()
	if err != nil {
		return nil, err
	}
	deps.Storage.Set(nextKey, value)
	return &types.Response{}, nil
}

// Migrate executes queue contract's migration which consists in clearing
// the state and writing three new values in the queue
func Migrate(deps *std.Deps, _ types.Env, _ []byte) (*types.Response, error) {
	iter := deps.Storage.Range(nil, nil, std.Ascending)
	// clear
	for {
		k, _, err := iter.Next()
		if err != nil {
			break
		}
		deps.Storage.Remove(k)
	}
	// add three values
	for i := int32(100); i < 103; i++ {
		_, err := executeEnqueue(deps, types.Env{}, types.MessageInfo{}, &Enqueue{Value: i})
		if err != nil {
			return nil, err
		}
	}
	return &types.Response{}, nil
}

// Query handles given message bytes what query handler must be executed.
func Query(deps *std.Deps, _ types.Env, msg []byte) ([]byte, error) {
	q := new(QueryMsg)
	err := q.UnmarshalJSON(msg)
	if err != nil {
		return nil, err
	}

	switch {
	case q.List != nil:
		return queryList(deps)
	case q.Sum != nil:
		return querySum(deps)
	case q.Reducer != nil:
		return queryReducer(deps)
	case q.Count != nil:
		return queryCount(deps)
	}

	return nil, errors.New("unknown query message") // TODO(fdymylja): use a common error once devex experience on querymsg is sorted.
}

func queryReducer(deps *std.Deps) ([]byte, error) {
	var counters [][2]int32
	iter := deps.Storage.Range(nil, nil, std.Ascending)
	for {
		_, value, err := iter.Next()
		if err != nil {
			break
		}
		item := new(Item)
		if err := item.UnmarshalJSON(value); err != nil {
			return nil, err
		}

		sum := int32(0)
		iter2 := deps.Storage.Range(nil, nil, std.Ascending)
		for {
			_, value2, err2 := iter2.Next()
			if err2 != nil {
				break
			}
			item2 := new(Item)
			if err := item2.UnmarshalJSON(value2); err != nil {
				return nil, err
			}
			// skip second iterator items whose value is lower than the first
			if item2.Value <= item.Value {
				continue
			}
			sum += item2.Value
		}

		counters = append(counters, [2]int32{item.Value, sum})
	}

	resp := &ReducerResponse{Counters: counters}
	return resp.MarshalJSON()
}

func queryList(deps *std.Deps) ([]byte, error) {
	// do empty
	emptyIter := deps.Storage.Range([]byte("large"), []byte("large"), std.Ascending)
	var empty []uint32
	for {
		k, _, err := emptyIter.Next()
		if err != nil {
			break
		}
		empty = append(empty, (uint32)(k[0]))
	}
	// do early
	earlyIter := deps.Storage.Range(nil, []byte{20}, std.Ascending)
	var early []uint32
	for {
		k, _, err := earlyIter.Next()
		if err != nil {
			break
		}
		early = append(early, (uint32)(k[0]))
	}
	// do late
	lateIter := deps.Storage.Range([]byte{20}, nil, std.Ascending)
	var late []uint32
	for {
		k, _, err := lateIter.Next()
		if err != nil {
			break
		}
		late = append(late, (uint32)(k[0]))
	}

	resp := ListResponse{
		Empty: empty,
		Early: early,
		Late:  late,
	}

	b, err := resp.MarshalJSON()
	if err != nil {
		return nil, err
	}

	return b, nil
}

func queryCount(deps *std.Deps) ([]byte, error) {
	iter := deps.Storage.Range(nil, nil, std.Ascending)

	var count uint32
	for {
		_, _, err := iter.Next()
		if err != nil {
			break
		}
		count++
	}

	resp := CountResponse{Count: count}

	b, err := resp.MarshalJSON()
	if err != nil {
		return nil, err
	}

	return b, nil
}

func querySum(deps *std.Deps) ([]byte, error) {
	var sum int32
	iter := deps.Storage.Range(nil, nil, std.Ascending)
	for {
		_, v, err := iter.Next()
		if err != nil {
			break
		}
		item := new(Item)
		err = item.UnmarshalJSON(v)
		if err != nil {
			return nil, err
		}
		sum += item.Value
	}

	resp := SumResponse{Sum: sum}
	b, err := resp.MarshalJSON()
	if err != nil {
		return nil, err
	}

	return b, nil
}
