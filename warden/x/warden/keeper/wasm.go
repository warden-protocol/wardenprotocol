package keeper

import (
	"encoding/json"
	"fmt"
	"math"

	wasmkeeper "github.com/CosmWasm/wasmd/x/wasm/keeper"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/wardenprotocol/shield/ast"
)

// ExecuteAnalyzer executes the contract at the specified address, on behalf of
// an account. The contract is expected to be an "Analyzer" contract, i.e. it
// will receive an "Analyze" message containing a binary input, and will return
// a JSON object that will be mapped into a collection of `shield` AST nodes.
func (k Keeper) ExecuteAnalyzer(ctx sdk.Context, contractAddr, callerAddr sdk.AccAddress, input []byte) (map[string]*ast.Expression, error) {
	msg, err := json.Marshal(newAnalyzerMsg(input))
	if err != nil {
		return nil, fmt.Errorf("preparing message for analyzer contract: %w", err)
	}

	contractRes, err := k.executeContract(ctx, contractAddr, callerAddr, msg)
	if err != nil {
		return nil, err
	}

	return parseAnalyzerValues(contractRes)
}

type analyzeRequest struct {
	Input []byte `json:"input"`
}

type analyzerMsg struct {
	Analyze analyzeRequest `json:"analyze"`
}

func newAnalyzerMsg(input []byte) analyzerMsg {
	return analyzerMsg{
		Analyze: analyzeRequest{
			Input: input,
		},
	}
}

func (k Keeper) executeContract(ctx sdk.Context, contractAddr, callerAddr sdk.AccAddress, msg []byte) ([]byte, error) {
	wasmKeeper := wasmkeeper.NewDefaultPermissionKeeper(k.getWasmKeeper())

	contractRes, err := wasmKeeper.Execute(
		ctx,
		contractAddr,
		callerAddr,
		msg,
		nil,
	)
	if err != nil {
		return nil, fmt.Errorf("executing contract: %w", err)
	}

	return contractRes, nil
}

func parseAnalyzerValues(bz []byte) (map[string]*ast.Expression, error) {
	values := make(map[string]json.RawMessage)
	err := json.Unmarshal(bz, &values)
	if err != nil {
		return nil, err
	}

	parsedValues := make(map[string]*ast.Expression)
	for k, v := range values {
		node, err := parseShieldExpression(v)
		if err != nil {
			return nil, fmt.Errorf("parsing shield expression for %s: %v", k, err)
		}
		parsedValues[k] = node
	}

	return parsedValues, nil
}

func parseShieldExpression(v json.RawMessage) (*ast.Expression, error) {
	var out any
	err := json.Unmarshal(v, &out)
	if err != nil {
		return nil, err
	}

	switch out := out.(type) {
	case int64:
		return ast.NewIntegerLiteral(&ast.IntegerLiteral{
			Value: out,
		}), nil
	case int:
		return ast.NewIntegerLiteral(&ast.IntegerLiteral{
			Value: int64(out),
		}), nil
	case float64:
		if out != math.Trunc(out) {
			return nil, fmt.Errorf("floating point numbers are not supported in the shield language (value: %+v)", out)
		}
		return ast.NewIntegerLiteral(&ast.IntegerLiteral{
			Value: int64(out),
		}), nil
	case bool:
		return ast.NewBooleanLiteral(&ast.BooleanLiteral{
			Value: out,
		}), nil
	default:
		return nil, fmt.Errorf("unsupported type: %T (value: %+v)", out, out)
	}
}
