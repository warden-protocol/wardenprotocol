package json

import (
	"errors"
	"fmt"
	"math"
	"math/big"
	"reflect"

	"github.com/Jeffail/gabs/v2"
	"github.com/ethereum/go-ethereum/accounts/abi"
)

type FixedPoint struct {
	Mantissa *big.Int
	Exponent uint8
}

func NewFixedPoint(n float64) FixedPoint {
	const exponent uint8 = 18

	if math.IsNaN(n) || math.IsInf(n, 0) {
		return FixedPoint{
			Mantissa: big.NewInt(0),
			Exponent: exponent,
		}
	}

	val := new(big.Float).SetFloat64(n)

	scale := new(big.Int).Exp(big.NewInt(10), big.NewInt(int64(exponent)), nil)
	scaleFloat := new(big.Float).SetInt(scale)
	val.Mul(val, scaleFloat)

	mantissa, _ := val.Int(nil) // truncates any remaining part

	return FixedPoint{
		Mantissa: mantissa,
		Exponent: exponent,
	}
}

type parser struct {
	json   []byte
	schema []byte
}

type instruction struct {
	path    string
	abiType string        // only one of abiType, tuple will be set
	tuple   []instruction // set of tuple components
	isArray bool          // only applies to tuples
}

func (p *parser) parse() ([]byte, error) {
	ins, err := parseInstructions(p.schema)
	if err != nil {
		return nil, fmt.Errorf("invalid schema: %w", err)
	}

	c, err := gabs.ParseJSON(p.json)
	if err != nil {
		return nil, fmt.Errorf("invalid json: %w", err)
	}

	return p.parseContainer(ins, c)
}

func (p *parser) parseContainer(ins []instruction, c *gabs.Container) ([]byte, error) {
	var results []any
	for _, in := range ins {
		j := c.Path(in.path)
		data := j.Data()
		// TODO: what to do when data is null/not present?
		if in.abiType != "" {
			// single abi type
			var err error
			switch d := data.(type) {
			case (float64):
				data, err = makeGoNumber(in.abiType, d)
			case ([]any):
				data, err = makeGoArray(in.abiType, d)
			}
			if err != nil {
				return nil, err
			}
			results = append(results, data)
		} else {
			// tuple type
			if in.isArray {
				// array of tuple
				children := j.Children()
				var arr [][]byte
				for _, child := range children {
					r, err := p.parseContainer(in.tuple, child)
					if err != nil {
						return nil, err
					}
					arr = append(arr, r)
				}
				results = append(results, arr)
			} else {
				r, err := p.parseContainer(in.tuple, j)
				if err != nil {
					return nil, err
				}
				results = append(results, r)
			}
		}
	}

	abiArgs := abi.Arguments{}
	for _, in := range ins {
		if in.abiType == "fp" {
			abiType, err := abi.NewType("tuple", "FixedPoint", []abi.ArgumentMarshaling{
				{Name: "mantissa", Type: "int256"},
				{Name: "exponent", Type: "uint8"},
			})
			if err != nil {
				return nil, fmt.Errorf("invalid abi type: %w", err)
			}
			abiArgs = append(abiArgs, abi.Argument{Type: abiType})
		} else if in.abiType != "" {
			abiType, err := abi.NewType(in.abiType, "", nil)
			if err != nil {
				return nil, fmt.Errorf("invalid abi type: %w", err)
			}
			abiArgs = append(abiArgs, abi.Argument{Type: abiType})
		} else {
			// tuple type
			typ := "bytes"
			if in.isArray {
				typ = "bytes[]"
			}
			abiType, err := abi.NewType(typ, "", nil)
			if err != nil {
				return nil, fmt.Errorf("invalid abi type: %w", err)
			}
			abiArgs = append(abiArgs, abi.Argument{Type: abiType})
		}
	}

	// replace nil results with zero values
	for i, res := range results {
		if res != nil {
			continue
		}

		arg := abiArgs[i]
		t := arg.Type.GetType()
		results[i] = reflect.Zero(t).Interface()
	}

	res, err := abiArgs.PackValues(results)
	if err != nil {
		return nil, fmt.Errorf("packing abi result: %w", err)
	}

	return res, nil
}

func parseInstructions(schema []byte) ([]instruction, error) {
	var res []instruction

	var pos int
	for pos < len(schema) {
		// parse path
		pathStart := pos
		for pos < len(schema) && schema[pos] != ':' {
			pos++
		}
		path := schema[pathStart:pos]

		pos++ // :
		if pos == len(schema) {
			return nil, errors.New("unexpected end of schema")
		}

		// parse type
		instr := instruction{path: string(path)}
		if schema[pos] == '(' {
			pos++ // (
			sectionStart := pos
			for pos < len(schema) && schema[pos] != ')' {
				pos++
			}
			if pos == len(schema) || schema[pos] != ')' {
				return nil, fmt.Errorf("expected ')', got %s", string(schema[pos]))
			}
			section := schema[sectionStart:pos]
			pos++

			subInstrs, err := parseInstructions(section)
			if err != nil {
				return nil, err
			}

			if pos < len(schema)-1 && schema[pos] == '[' && schema[pos+1] == ']' {
				pos++
				pos++
				instr.isArray = true
			}

			instr.tuple = subInstrs
		} else {
			typeStart := pos
			for pos < len(schema) && schema[pos] != ',' {
				pos++
			}
			abiType := schema[typeStart:pos]
			instr.abiType = string(abiType)
		}
		res = append(res, instr)

		pos++ // ,
	}

	return res, nil
}

func makeGoNumber(abiType string, n float64) (any, error) {
	switch abiType {
	case "int256":
		return new(big.Int).SetInt64(int64(n)), nil
	case "uint256":
		return new(big.Int).SetUint64(uint64(n)), nil
	case "fp":
		return NewFixedPoint(n), nil
	}

	return nil, fmt.Errorf("unsupport number abiType: %s", abiType)
}

func makeGoArray(abiType string, s []any) (any, error) {
	switch abiType {
	case "int256[]", "uint256[]":
		var res []*big.Int
		for _, arg := range s {
			argFloat, ok := arg.(float64)
			if !ok {
				return nil, fmt.Errorf("array item is not a number: %v", arg)
			}
			i, _ := new(big.Float).SetFloat64(argFloat).Int(nil)
			res = append(res, i)
		}
		return res, nil
	case "bool[]":
		var res []bool
		for _, arg := range s {
			res = append(res, arg.(bool))
		}
		return res, nil
	case "string[]":
		var res []string
		for _, arg := range s {
			res = append(res, arg.(string))
		}
		return res, nil
	}

	return nil, fmt.Errorf("unsupport abiType: %s", abiType)
}
