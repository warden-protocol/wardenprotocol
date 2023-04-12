package types

import (
	"github.com/CosmWasm/cosmwasm-go/std/math"
	wasmVmTypes "github.com/CosmWasm/wasmvm/types"
)

// HumanAddress is a printable (typically bech32 encoded) address string. Just use it as a label for developers.
type HumanAddress = string

// CanonicalAddress uses standard base64 encoding, just use it as a label for developers
type CanonicalAddress = []byte

// Coin is a string representation of the sdk.Coin type (more portable than sdk.Int)
type Coin struct {
	// Denom defines the name of the coin, example: ATOM
	Denom string
	// Amount is the math.Uint128 representation of the amount of coins.
	Amount math.Uint128
}

// NewCoin creates a new coin given amount and denom.
func NewCoin(amount math.Uint128, denom string) Coin {
	return Coin{
		Denom:  denom,
		Amount: amount,
	}
}

// NewCoinFromUint64 creates a new coin given an uint64 amount and denom.
func NewCoinFromUint64(amount uint64, denom string) Coin {
	return NewCoin(math.NewUint128FromUint64(amount), denom)
}

// ToWasmVMCoin convert Coin to WasmVM type.
func (c Coin) ToWasmVMCoin() wasmVmTypes.Coin {
	return wasmVmTypes.Coin{
		Denom:  c.Denom,
		Amount: c.Amount.String(),
	}
}

// String implements the fmt.Stringer interface.
func (c Coin) String() string {
	return c.Amount.String() + c.Denom
}

// RawMessage is a raw encoded JSON value.
// It implements Marshaler and Unmarshaler and can
// be used to delay JSON decoding or precompute a JSON encoding.
type RawMessage []byte

// MarshalJSON returns m as the JSON encoding of m.
func (m RawMessage) MarshalJSON() ([]byte, error) {
	if m == nil {
		return []byte("null"), nil
	}
	return m, nil
}

// UnmarshalJSON sets *m to a copy of data.
func (m *RawMessage) UnmarshalJSON(data []byte) error {
	if m == nil {
		return GenericError("json.RawMessage: UnmarshalJSON on nil pointer")
	}
	*m = append((*m)[0:0], data...)
	return nil
}
