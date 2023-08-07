// Copyright 2021 Evmos Foundation
// This file is part of Evmos' Ethermint library.
//
// The Ethermint library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// The Ethermint library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Ethermint library. If not, see https://github.com/evmos/ethermint/blob/main/LICENSE
package types

import (
	fmt "fmt"
	math "math"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

// ErrorNegativeGasConsumed defines an error thrown when the amount of gas refunded results in a
// negative gas consumed amount.
// Copied from cosmos-sdk
type ErrorNegativeGasConsumed struct {
	Descriptor string
}

// ErrorGasOverflow defines an error thrown when an action results gas consumption
// unsigned integer overflow.
type ErrorGasOverflow struct {
	Descriptor string
}

type infiniteGasMeterWithLimit struct {
	consumed sdk.Gas
	limit    sdk.Gas
}

// NewInfiniteGasMeterWithLimit returns a reference to a new infiniteGasMeter.
func NewInfiniteGasMeterWithLimit(limit sdk.Gas) sdk.GasMeter {
	return &infiniteGasMeterWithLimit{
		consumed: 0,
		limit:    limit,
	}
}

func (g *infiniteGasMeterWithLimit) GasConsumed() sdk.Gas {
	return g.consumed
}

func (g *infiniteGasMeterWithLimit) GasConsumedToLimit() sdk.Gas {
	return g.consumed
}

func (g *infiniteGasMeterWithLimit) Limit() sdk.Gas {
	return g.limit
}

// addUint64Overflow performs the addition operation on two uint64 integers and
// returns a boolean on whether or not the result overflows.
func addUint64Overflow(a, b uint64) (uint64, bool) {
	if math.MaxUint64-a < b {
		return 0, true
	}

	return a + b, false
}

func (g *infiniteGasMeterWithLimit) ConsumeGas(amount sdk.Gas, descriptor string) {
	var overflow bool
	// TODO: Should we set the consumed field after overflow checking?
	g.consumed, overflow = addUint64Overflow(g.consumed, amount)
	if overflow {
		panic(ErrorGasOverflow{descriptor})
	}
}

// RefundGas will deduct the given amount from the gas consumed. If the amount is greater than the
// gas consumed, the function will panic.
//
// Use case: This functionality enables refunding gas to the trasaction or block gas pools so that
// EVM-compatible chains can fully support the go-ethereum StateDb interface.
// See https://github.com/cosmos/cosmos-sdk/pull/9403 for reference.
func (g *infiniteGasMeterWithLimit) RefundGas(amount sdk.Gas, descriptor string) {
	if g.consumed < amount {
		panic(ErrorNegativeGasConsumed{Descriptor: descriptor})
	}

	g.consumed -= amount
}

func (g *infiniteGasMeterWithLimit) IsPastLimit() bool {
	return false
}

func (g *infiniteGasMeterWithLimit) IsOutOfGas() bool {
	return false
}

func (g *infiniteGasMeterWithLimit) String() string {
	return fmt.Sprintf("InfiniteGasMeter:\n  consumed: %d", g.consumed)
}

func (g *infiniteGasMeterWithLimit) GasRemaining() sdk.Gas {
	return math.MaxUint64
}
