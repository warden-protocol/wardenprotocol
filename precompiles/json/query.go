package json

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/accounts/abi"
)

const (
	BuildMethod = "build"
	ParseMethod = "parse"
)

func (p Precompile) Build(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	if len(args) != 2 {
		return nil, fmt.Errorf("wrong args number, expected 2, got %d", len(args))
	}

	ops, ok := args[0].([]byte)
	if !ok {
		return nil, fmt.Errorf("wrong arg #0, expected []byte, got %T", args[0])
	}

	data, ok := args[1].([][]byte)
	if !ok {
		return nil, fmt.Errorf("wrong arg #1, expected [][]byte, got %T", args[1])
	}

	if len(ops) != len(data) {
		return nil, fmt.Errorf("wrong arguments count: length of ops (%d) must match length of data (%d)", len(ops), len(data))
	}

	jb := builder{ops: ops, vals: data}
	j, err := jb.build()
	if err != nil {
		return nil, fmt.Errorf("invalid json ops: %w", err)
	}

	return method.Outputs.Pack([]byte(j))
}

func (p Precompile) Parse(
	ctx sdk.Context,
	method *abi.Method,
	args []any,
) ([]byte, error) {
	if len(args) != 2 {
		return nil, fmt.Errorf("wrong args number, expected 2, got %d", len(args))
	}

	jsonBz, ok := args[0].([]byte)
	if !ok {
		return nil, fmt.Errorf("wrong arg #0, expected []byte, got %T", args[0])
	}

	schema, ok := args[1].([]byte)
	if !ok {
		return nil, fmt.Errorf("wrong arg #1, expected []byte, got %T", args[1])
	}

	pr := parser{json: jsonBz, schema: schema}
	res, err := pr.parse()
	if err != nil {
		return nil, fmt.Errorf("invalid json: %w", err)
	}

	return method.Outputs.Pack(res)
}
