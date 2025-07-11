package json

import (
	"cmp"
	"math/big"
	"testing"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/stretchr/testify/require"
)

type opsBuilder struct {
	ops  []op
	vals [][]byte
}

func newOpsBuilder() *opsBuilder { return &opsBuilder{} }

func (ob *opsBuilder) push(o op, v []byte) *opsBuilder {
	ob.ops = append(ob.ops, o)
	ob.vals = append(ob.vals, v)
	return ob
}

func (ob *opsBuilder) startObject() *opsBuilder { return ob.push(StartObject, nil) }
func (ob *opsBuilder) endObject() *opsBuilder   { return ob.push(EndObject, nil) }
func (ob *opsBuilder) startArray() *opsBuilder  { return ob.push(StartArray, nil) }
func (ob *opsBuilder) endArray() *opsBuilder    { return ob.push(EndArray, nil) }
func (ob *opsBuilder) key(k string) *opsBuilder { return ob.push(Key, []byte(k)) }

func (ob *opsBuilder) string(v string) *opsBuilder { return ob.push(StringValue, []byte(v)) }

func (ob *opsBuilder) uint(v uint64) *opsBuilder {
	uint256Type, _ := abi.NewType("uint256", "", nil)
	arguments := abi.Arguments{{Type: uint256Type}}
	b, _ := arguments.Pack(new(big.Int).SetUint64(v))
	return ob.push(UintValue, b)
}

func (ob *opsBuilder) int(v int64) *opsBuilder {
	int256Type, _ := abi.NewType("int256", "", nil)
	arguments := abi.Arguments{{Type: int256Type}}
	b, _ := arguments.Pack(new(big.Int).SetInt64(v))
	return ob.push(IntValue, b)
}

func (ob *opsBuilder) bool(v bool) *opsBuilder {
	boolType, _ := abi.NewType("bool", "", nil)
	arguments := abi.Arguments{{Type: boolType}}
	b, _ := arguments.Pack(v)
	return ob.push(BoolValue, b)
}

func (ob *opsBuilder) address(addr common.Address) *opsBuilder {
	addressType, _ := abi.NewType("address", "", nil)
	arguments := abi.Arguments{{Type: addressType}}
	b, _ := arguments.Pack(addr)
	return ob.push(AddressValue, b)
}

func (ob *opsBuilder) bytes(data []byte) *opsBuilder {
	bytesType, err := abi.NewType("bytes", "", nil)
	if err != nil {
		panic(err)
	}
	arguments := abi.Arguments{{Type: bytesType}}
	b, err := arguments.Pack(data)
	if err != nil {
		panic(err)
	}
	return ob.push(BytesValue, b)
}

func (ob *opsBuilder) null() *opsBuilder {
	return ob.push(NullValue, nil)
}

func (ob *opsBuilder) fixedPoint(mantissa int64, decimals uint8) *opsBuilder {
	int256Type, _ := abi.NewType("int256", "", nil)
	uint8Type, _ := abi.NewType("uint8", "", nil)
	arguments := abi.Arguments{
		{Type: int256Type},
		{Type: uint8Type},
	}
	b, err := arguments.Pack(new(big.Int).SetInt64(mantissa), decimals)
	if err != nil {
		panic(err)
	}

	return ob.push(FixedPointValue, b)
}

func (ob *opsBuilder) rawJsonNumber(v string) *opsBuilder {
	return ob.push(RawJsonNumberValue, []byte(v))
}

func TestBuild(t *testing.T) {
	tests := []struct {
		name    string
		builder *opsBuilder
		want    string
		wantErr bool
	}{
		{
			name:    "empty ops",
			wantErr: true,
			builder: newOpsBuilder(),
		},
		{
			want: `"foo"`,
			builder: newOpsBuilder().
				string("foo"),
		},
		{
			want: `1234567890`,
			builder: newOpsBuilder().
				uint(1234567890),
		},
		{
			want: `-1234567890`,
			builder: newOpsBuilder().
				int(-1234567890),
		},
		{
			want: `true`,
			builder: newOpsBuilder().
				bool(true),
		},
		{
			want: `false`,
			builder: newOpsBuilder().
				bool(false),
		},
		{
			want: `"0xddf789BE7f45a1c136C6a814D2464Eb5111f45B3"`,
			builder: newOpsBuilder().
				address(common.HexToAddress("0xddf789be7f45a1c136c6a814d2464eb5111f45b3")),
		},
		{
			want: `"0xaabbccddeeff"`,
			builder: newOpsBuilder().
				bytes(common.Hex2Bytes("aabbccddeeff")),
		},
		{
			want: `null`,
			builder: newOpsBuilder().
				null(),
		},
		{
			want: `123.45`,
			builder: newOpsBuilder().
				fixedPoint(12345, 2),
		},
		{
			want: `0`,
			builder: newOpsBuilder().
				fixedPoint(0, 4),
		},
		{
			want: `1234`,
			builder: newOpsBuilder().
				fixedPoint(1234, 0),
		},
		{
			want: `0.1234`,
			builder: newOpsBuilder().
				fixedPoint(1234, 4),
		},
		{
			want: `0.0001234`,
			builder: newOpsBuilder().
				fixedPoint(1234, 7),
		},
		{
			want: `-0.0001234`,
			builder: newOpsBuilder().
				fixedPoint(-1234, 7),
		},
		{
			want: `123.00004`,
			builder: newOpsBuilder().
				rawJsonNumber("123.00004"),
		},
		{
			want: `111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111`,
			builder: newOpsBuilder().
				rawJsonNumber("111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"),
		},
		{
			name: "invalid RawJsonNumber",
			builder: newOpsBuilder().
				rawJsonNumber("foo"),
			wantErr: true,
		},
		{
			want: "null",
			builder: newOpsBuilder().
				null(),
		},
		{
			want: "{}",
			builder: newOpsBuilder().
				startObject().
				endObject(),
		},
		{
			want: "[]",
			builder: newOpsBuilder().
				startArray().
				endArray(),
		},
		{
			want: `{"key":true}`,
			builder: newOpsBuilder().
				startObject().
				key("key").
				bool(true).
				endObject(),
		},
		{
			want: `{"begin":"B","end":"E","horizon":"H","strategy_name":"S","state":{"assets":[{"coin_id":"C","amount":42}]}}`,
			builder: newOpsBuilder().
				startObject().
				key("begin").
				string("B").
				key("end").
				string("E").
				key("horizon").
				string("H").
				key("strategy_name").
				string("S").
				key("state").
				startObject().
				key("assets").
				startArray().
				startObject().
				key("coin_id").
				string("C").
				key("amount").
				uint(42).
				endObject().
				endArray().
				endObject().
				endObject(),
		},
		{
			name: "rawJsonNumber escape {",
			builder: newOpsBuilder().
				startObject().
				key("{").
				rawJsonNumber("{").
				endObject(),
			wantErr: true,
		},
		{
			want: `"\""`,
			builder: newOpsBuilder().
				string("\""),
		},
	}
	for _, tt := range tests {
		t.Run(cmp.Or(tt.name, tt.want), func(t *testing.T) {
			b := builder{ops: tt.builder.ops, vals: tt.builder.vals}
			got, gotErr := b.build()
			if gotErr != nil {
				if !tt.wantErr {
					require.NoError(t, gotErr)
				}
				return
			}
			if tt.wantErr {
				require.Error(t, gotErr, "output: %s", got)
			}
			require.Equal(t, tt.want, got)
		})
	}
}
