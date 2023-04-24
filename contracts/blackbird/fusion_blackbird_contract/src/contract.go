//go:generate ../../../bin/tinyjson -all -snake_case contract.go
package src

import (
	"errors"

	"github.com/sashaduke/cosmwasm-go/std"
	"github.com/sashaduke/cosmwasm-go/std/types"
	"gitlab.qredo.com/edmund/blackbird/verifier/golang/simple"
)

// FirstKey defines the value of the default key,
// when no key is set in the contract so far.
// NOTE: keys are [1]byte length but in KV they're [n]bytes.
// const FirstKey byte = 0

type Verify struct {
	PolicyExpression string            `json:"policy_expression"`
	Participants     map[string]string `json:"participants"`
	// P1 string `json:"p1"`
	// P2 string `json:"p2"`
}

type Test struct{}

// ExecuteMsg defines all the messages that modify state that can be sent to the contract.
type ExecuteMsg struct {
	Verify *Verify `json:"verify"`
	Test   *Test   `json:"test"`
}

// type QueryMsg struct {
// 	// Count counts how many items in the queue; returns CountResponse
// 	Count *struct{} `json:"count"`
// }

type VerifyResponse struct {
	Result bool `json:"result"`
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
	case msg.Verify != nil:
		return executeVerify(deps, env, info, msg.Verify)
	case msg.Test != nil:
		return &types.Response{}, nil
	default:
		return nil, errors.New("unknown request (Execute)")
	}
}

func executeVerify(deps *std.Deps, _ types.Env, _ types.MessageInfo, msg *Verify) (*types.Response, error) {
	if msg.PolicyExpression == "" {
		return nil, errors.New("empty blackbird policy expression")
	}

	p := make(map[string]bool)
	for i := range msg.Participants {
		p[i] = true
	}
	// p[msg.P1] = true
	// p[msg.P2] = true

	if err := simple.Verify([]byte(msg.PolicyExpression), nil, nil, nil, p); err != nil {
		return nil, errors.New("blackbird policy verification failed")
		// return nil, fmt.Errorf("blackbird policy verification failed: policy=%s, signers=%v, err=%v", msg.PolicyExpression, p, err)
	}

	return &types.Response{}, nil
}

// Query handles given message bytes what query handler must be executed.
// func Query(deps *std.Deps, _ types.Env, msg []byte) ([]byte, error) {
// 	q := new(QueryMsg)
// 	err := q.UnmarshalJSON(msg)
// 	if err != nil {
// 		return nil, err
// 	}

// 	switch {
// 	case q.Sum != nil:
// 		return querySum(deps)
// 	}

// 	return nil, errors.New("unknown query message")
// }

// func querySum(deps *std.Deps) ([]byte, error) {
// 	var sum int32
// 	iter := deps.Storage.Range(nil, nil, std.Ascending)
// 	for {
// 		_, v, err := iter.Next()
// 		if err != nil {
// 			break
// 		}
// 		item := new(Item)
// 		err = item.UnmarshalJSON(v)
// 		if err != nil {
// 			return nil, err
// 		}
// 		sum += item.Value
// 	}

// 	resp := SumResponse{Sum: sum}
// 	b, err := resp.MarshalJSON()
// 	if err != nil {
// 		return nil, err
// 	}

// 	return b, nil
// }
