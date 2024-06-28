package keeper

import (
	"encoding/json"
	"fmt"
	"math"
	"math/big"

	wasmkeeper "github.com/CosmWasm/wasmd/x/wasm/keeper"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/wardenprotocol/shield/ast"
)

// ExecuteAnalyzer executes the contract at the specified address, on behalf of
// an account.
//
// The contract is expected to be an "Analyzer" contract: it will receive ExecuteAnalyzer
// `input` binary field and will return:
// - an optional binary (data for signing)
// - a collection of key-value pairs (key are strings, values are shield's AST nodes)
func (k Keeper) ExecuteAnalyzer(ctx sdk.Context, contractAddr, callerAddr sdk.AccAddress, input []byte) ([]byte, map[string]*ast.Expression, error) {
	msg, err := json.Marshal(newAnalyzerMsg(input))
	if err != nil {
		return nil, nil, fmt.Errorf("preparing message for analyzer contract: %w", err)
	}

	contractRes, err := k.executeContract(ctx, contractAddr, callerAddr, msg)
	if err != nil {
		return nil, nil, err
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

type analyzerRes struct {
	DataForSigning []byte                     `json:"data_for_signing"`
	Result         map[string]json.RawMessage `json:"result"`
}

func parseAnalyzerValues(bz []byte) ([]byte, map[string]*ast.Expression, error) {
	var response analyzerRes
	err := json.Unmarshal(bz, &response)
	if err != nil {
		return nil, nil, err
	}

	parsedValues := make(map[string]*ast.Expression)
	for k, v := range response.Result {
		node, err := parseShieldExpression(v)
		if err != nil {
			return nil, nil, fmt.Errorf("parsing shield expression for %s: %v", k, err)
		}
		parsedValues[k] = node
	}

	return response.DataForSigning, parsedValues, nil
}

func parseShieldExpression(v json.RawMessage) (*ast.Expression, error) {
	var out any
	err := json.Unmarshal(v, &out)
	if err != nil {
		return nil, err
	}

	switch out := out.(type) {
	case string:
		return ast.NewStringLiteral(&ast.StringLiteral{
			Value: out,
		}), nil
	case int64:
		return ast.NewIntegerLiteral(&ast.IntegerLiteral{
			Value: big.NewInt(out).String(),
		}), nil
	case int:
		return ast.NewIntegerLiteral(&ast.IntegerLiteral{
			Value: big.NewInt(int64(out)).String(),
		}), nil
	case float64:
		if out != math.Trunc(out) {
			return nil, fmt.Errorf("floating point numbers are not supported in the shield language (value: %+v)", out)
		}
		return ast.NewIntegerLiteral(&ast.IntegerLiteral{
			Value: big.NewInt(int64(out)).String(),
		}), nil
	case bool:
		return ast.NewBooleanLiteral(&ast.BooleanLiteral{
			Value: out,
		}), nil
	default:
		return nil, fmt.Errorf("unsupported type: %T (value: %+v)", out, out)
	}
}
