package json

import (
	"cmp"
	"math/big"
	"testing"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/stretchr/testify/require"
)

type abiTupleBuilder struct {
	values  []any
	abiArgs abi.Arguments
}

func newAbiTuple() *abiTupleBuilder { return &abiTupleBuilder{} }

func (f *abiTupleBuilder) push(expected any, abiName string) *abiTupleBuilder {
	abiType, err := abi.NewType(abiName, "", nil)
	if err != nil {
		panic(err)
	}

	f.abiArgs = append(f.abiArgs, abi.Argument{Type: abiType})
	f.values = append(f.values, expected)

	return f
}

func (f *abiTupleBuilder) string(expected string) *abiTupleBuilder {
	return f.push(expected, "string")
}

func (f *abiTupleBuilder) bool(expected bool) *abiTupleBuilder {
	return f.push(expected, "bool")
}

func (f *abiTupleBuilder) stringArray(expected ...string) *abiTupleBuilder {
	return f.push(expected, "string[]")
}

func (f *abiTupleBuilder) bytesArray(expected ...[]byte) *abiTupleBuilder {
	return f.push(expected, "bytes[]")
}

func (f *abiTupleBuilder) uintArray(expected ...uint64) *abiTupleBuilder {
	var uints []*big.Int
	for _, e := range expected {
		uints = append(uints, new(big.Int).SetUint64(e))
	}

	return f.push(uints, "uint256[]")
}

func (f *abiTupleBuilder) intArray(expected ...int64) *abiTupleBuilder {
	var ints []*big.Int
	for _, e := range expected {
		ints = append(ints, new(big.Int).SetInt64(e))
	}

	return f.push(ints, "int256[]")
}

func (f *abiTupleBuilder) boolArray(expected ...bool) *abiTupleBuilder {
	return f.push(expected, "bool[]")
}

func (f *abiTupleBuilder) uint256(expected uint64) *abiTupleBuilder {
	i := new(big.Int).SetUint64(expected)
	return f.push(i, "uint256")
}

func (f *abiTupleBuilder) uint8(expected uint8) *abiTupleBuilder {
	return f.push(expected, "uint8")
}

func (f *abiTupleBuilder) int256(expected int64) *abiTupleBuilder {
	i := new(big.Int).SetInt64(expected)
	return f.push(i, "int256")
}

func (f *abiTupleBuilder) int256big(n *big.Int) *abiTupleBuilder {
	return f.push(n, "int256")
}

func (f *abiTupleBuilder) bytes(expected []byte) *abiTupleBuilder {
	return f.push(expected, "bytes")
}

func (f *abiTupleBuilder) build() []byte {
	res, err := f.abiArgs.PackValues(f.values)
	if err != nil {
		panic(err)
	}

	return res
}

func TestParse(t *testing.T) {
	tests := []struct {
		name    string
		json    string
		schema  string
		want    []byte
		wantErr bool
	}{
		{
			json:   `{"name": "foo"}`,
			schema: "name:string",
			want: newAbiTuple().
				string("foo").
				build(),
		},
		{
			json:   `{"name": "foo"}`,
			schema: "name:string,name:string",
			want: newAbiTuple().
				string("foo").
				string("foo").
				build(),
		},
		{
			json:   `{"b": true}`,
			schema: "b:bool",
			want: newAbiTuple().
				bool(true).
				build(),
		},
		{
			json:   `{"id": 123}`,
			schema: "id:uint256",
			want: newAbiTuple().
				uint256(123).
				build(),
		},
		{
			json:   `{"id": -123}`,
			schema: "id:int256",
			want: newAbiTuple().
				int256(-123).
				build(),
		},
		{
			json:   `{"names": ["foo", "bar", "baz"]}`,
			schema: "names:string[]",
			want: newAbiTuple().
				stringArray("foo", "bar", "baz").
				build(),
		},
		{
			json:   `{"ids": [1, -2, 3]}`,
			schema: "ids:int256[]",
			want: newAbiTuple().
				intArray(1, -2, 3).
				build(),
		},
		{
			json:   `{"ids": [1, 2, 3]}`,
			schema: "ids:uint256[]",
			want: newAbiTuple().
				uintArray(1, 2, 3).
				build(),
		},
		{
			json:   `{"bools": [true, false]}`,
			schema: "bools:bool[]",
			want: newAbiTuple().
				boolArray(true, false).
				build(),
		},
		{
			json:   `{"nested": { "s": "foo", "v": true }}`,
			schema: "nested:(s:string,v:bool)",
			want: newAbiTuple().
				bytes(
					newAbiTuple().
						string("foo").
						bool(true).
						build(),
				).
				build(),
		},
		{
			json:   `{"float": 123.45}`,
			schema: "float:fp",
			want: newAbiTuple().
				int256big(big.NewInt(0).Mul(big.NewInt(12345), big.NewInt(10000000000000000))). // 12345 * 10^16
				uint8(18).
				build(),
		},
		{
			json:   `{"nestedarray": [{"s":"a","v":1},{"s":"b","v":2}]}`,
			schema: "nestedarray:(s:string,v:int256)[]",
			want: newAbiTuple().
				bytesArray(
					newAbiTuple().
						string("a").
						int256(1).
						build(),
					newAbiTuple().
						string("b").
						int256(2).
						build(),
				).
				build(),
		},
		{
			name:    "missing closing brace",
			json:    `{"name": "foo"`,
			schema:  "name:string",
			wantErr: true,
		},
		{
			name:    "type mismatch",
			json:    `{"id": "not_a_number"}`,
			schema:  "id:uint256",
			wantErr: true,
		},
		{
			name:   "missing key",
			json:   `{"name": "foo"}`,
			schema: "id:string",
			want: newAbiTuple().
				string("").
				build(),
		},
		{
			name:    "array with mixed types",
			json:    `{"items":[1,"foo",3]}`,
			schema:  "items:uint256[]",
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(cmp.Or(tt.name, tt.schema), func(t *testing.T) {
			p := parser{json: []byte(tt.json), schema: []byte(tt.schema)}

			got, gotErr := p.parse()
			if gotErr != nil {
				if !tt.wantErr {
					require.NoError(t, gotErr)
				}

				return
			}

			if tt.wantErr {
				require.Error(t, gotErr, "output: %x", got)
			}

			require.Equal(t, tt.want, got)
		})
	}
}
