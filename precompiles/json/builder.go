package json

import (
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"math/big"
	"strings"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
)

type op = uint8

// Note: keep in sync with the JsonOp enum defined in IJson.sol.
const (
	StartObject op = iota
	EndObject
	StartArray
	EndArray

	Key

	StringValue
	UintValue
	IntValue
	BoolValue
	AddressValue
	BytesValue
	NullValue
	FixedPointValue
	RawJsonNumberValue
)

type jsonValue interface {
	serialize() string
}

type jsonNull struct{}

func (j jsonNull) serialize() string { return "null" }

type jsonString struct {
	val string
}

func (j jsonString) serialize() string {
	safeBz, _ := json.Marshal(j.val) //nolint
	return string(safeBz)
}

type jsonBool struct {
	val bool
}

func (j jsonBool) serialize() string {
	if j.val {
		return "true"
	}

	return "false"
}

type jsonNumber struct {
	val string
}

func (j jsonNumber) serialize() string { return j.val }

type jsonArray struct {
	elements []jsonValue
}

func (j jsonArray) serialize() string {
	serEls := make([]string, len(j.elements))
	for i, el := range j.elements {
		serEls[i] = el.serialize()
	}

	return "[" + strings.Join(serEls, ",") + "]"
}

type jsonObject struct {
	elements []objectElement
}

func (j jsonObject) serialize() string {
	serEls := make([]string, len(j.elements))
	for i, el := range j.elements {
		serEls[i] = fmt.Sprintf(`"%s":%s`, el.key, el.value.serialize())
	}

	return "{" + strings.Join(serEls, ",") + "}"
}

type objectElement struct {
	key   string
	value jsonValue
}

type builder struct {
	ops  []op
	vals [][]byte

	cur int
}

func (b *builder) build() (string, error) {
	if len(b.ops) != len(b.vals) {
		return "", fmt.Errorf("ops and vals length mismatch (%d != %d)", len(b.ops), len(b.vals))
	}

	if len(b.ops) == 0 {
		return "", errors.New("empty json")
	}

	val, err := b.nextValue()
	if err != nil {
		return "", err
	}

	return val.serialize(), nil
}

func (b *builder) nextValue() (jsonValue, error) {
	op := b.ops[b.cur]
	v := b.vals[b.cur]

	switch op {
	case StartObject:
		return b.nextJsonObject()
	case StartArray:
		return b.nextJsonArray()
	case StringValue:
		return b.nextJsonString()
	case UintValue:
		return b.nextJsonUint()
	case IntValue:
		return b.nextJsonInt()
	case BoolValue:
		return b.nextJsonBool()
	case AddressValue:
		return b.nextJsonAddress()
	case BytesValue:
		return b.nextJsonBytes()
	case NullValue:
		return b.nextJsonNull()
	case FixedPointValue:
		return b.nextJsonFixedPointNumber()
	case RawJsonNumberValue:
		return b.nextJsonRawNumber()
	}

	return nil, fmt.Errorf("expected begin of json value, got op: %d (with data: %x)", op, v)
}

func (b *builder) nextJsonObject() (jsonValue, error) {
	b.cur++ // startObject

	var obj jsonObject

	for b.cur < len(b.ops) && b.ops[b.cur] != EndObject {
		key, err := b.nextKey()
		if err != nil {
			return nil, err
		}

		val, err := b.nextValue()
		if err != nil {
			return nil, err
		}

		obj.elements = append(obj.elements, objectElement{key, val})
	}

	if b.cur >= len(b.ops) {
		return nil, errors.New("unexpected end of operations while parsing object")
	}

	if b.ops[b.cur] != EndObject {
		return nil, fmt.Errorf("expected object end, got: %d", b.ops[b.cur])
	}

	b.cur++

	return obj, nil
}

func (b *builder) nextKey() (string, error) {
	if b.ops[b.cur] != Key {
		return "", fmt.Errorf("expected json key, got op: %d (with data: %x)", b.ops[b.cur], b.vals[b.cur])
	}

	val := string(b.vals[b.cur])
	b.cur++

	return val, nil
}

func (b *builder) nextJsonArray() (jsonValue, error) {
	b.cur++ // startArray

	var array jsonArray

	for b.cur < len(b.ops) && b.ops[b.cur] != EndArray {
		val, err := b.nextValue()
		if err != nil {
			return nil, err
		}

		array.elements = append(array.elements, val)
	}

	if b.cur >= len(b.ops) {
		return nil, errors.New("unexpected end of operations while parsing array")
	}

	if b.ops[b.cur] != EndArray {
		return nil, fmt.Errorf("expected array end, got: %d", b.ops[b.cur])
	}

	b.cur++

	return array, nil
}

func (b *builder) nextJsonString() (jsonValue, error) {
	val := string(b.vals[b.cur])
	b.cur++

	return jsonString{val}, nil
}

func (b *builder) nextJsonUint() (jsonValue, error) {
	arg, err := b.decodeAbi("uint256")
	if err != nil {
		return nil, err
	}

	n := arg.(*big.Int)

	return jsonNumber{n.String()}, nil
}

func (b *builder) nextJsonInt() (jsonValue, error) {
	arg, err := b.decodeAbi("int256")
	if err != nil {
		return nil, err
	}

	n := arg.(*big.Int)

	return jsonNumber{n.String()}, nil
}

func (b *builder) nextJsonBool() (jsonValue, error) {
	arg, err := b.decodeAbi("bool")
	if err != nil {
		return nil, err
	}

	return jsonBool{arg.(bool)}, nil
}

func (b *builder) nextJsonAddress() (jsonValue, error) {
	arg, err := b.decodeAbi("address")
	if err != nil {
		return nil, err
	}

	hexStr := arg.(common.Address).Hex()

	return jsonString{hexStr}, nil
}

func (b *builder) nextJsonBytes() (jsonValue, error) {
	arg, err := b.decodeAbi("bytes")
	if err != nil {
		return nil, err
	}

	hexStr := "0x" + hex.EncodeToString(arg.([]byte))

	return jsonString{hexStr}, nil
}

func (b *builder) nextJsonNull() (jsonValue, error) {
	b.cur++
	return jsonNull{}, nil
}

func (b *builder) nextJsonFixedPointNumber() (jsonValue, error) {
	arguments := abi.Arguments{
		{Type: abiTypes["int256"]},
		{Type: abiTypes["uint8"]},
	}

	args, err := arguments.Unpack(b.vals[b.cur])
	if err != nil {
		return nil, fmt.Errorf("unpack JsonFixedPointNumber: %w", err)
	}

	b.cur++

	mantissa := args[0].(*big.Int)
	exponent := args[1].(uint8)

	if mantissa.Cmp(big.NewInt(0)) == 0 {
		return jsonNumber{"0"}, nil
	}

	if exponent == 0 {
		return jsonNumber{mantissa.String()}, nil
	}

	mStr := mantissa.String()

	isNegative := false
	if mStr[0] == '-' {
		isNegative = true
		mStr = mStr[1:]
	}

	for len(mStr) <= int(exponent) {
		mStr = "0" + mStr
	}

	pointPosition := len(mStr) - int(exponent)
	result := mStr[:pointPosition] + "." + mStr[pointPosition:]

	if isNegative {
		result = "-" + result
	}

	return jsonNumber{result}, nil
}

func (b *builder) nextJsonRawNumber() (jsonValue, error) {
	val := string(b.vals[b.cur])

	_, ok := new(big.Float).SetString(val)
	if !ok {
		return nil, fmt.Errorf("not a valid number literal: %s", val)
	}

	b.cur++

	return jsonNumber{val}, nil
}

func (b *builder) decodeAbi(typ string) (any, error) {
	abiType := abiTypes[typ]
	arguments := abi.Arguments{{Type: abiType}}

	args, err := arguments.Unpack(b.vals[b.cur])
	if err != nil {
		return nil, fmt.Errorf("%s: %w", typ, err)
	}

	b.cur++

	return args[0], nil
}

var abiTypes map[string]abi.Type

func init() {
	typs := []string{
		"bool",
		"uint8",
		"uint256",
		"int256",
		"address",
		"string",
		"bytes",
	}
	abiTypes = make(map[string]abi.Type)

	for _, t := range typs {
		abiType, err := abi.NewType(t, "", nil)
		if err != nil {
			panic(fmt.Errorf("%s: %w", t, err))
		}

		abiTypes[t] = abiType
	}
}
