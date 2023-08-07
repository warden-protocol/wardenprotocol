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
	errorsmod "cosmossdk.io/errors"
)

const (
	// RootCodespace is the codespace for all errors defined in this package
	RootCodespace = "ethermint"
)

// NOTE: We can't use 1 since that error code is reserved for internal errors.

var (
	// ErrInvalidValue returns an error resulting from an invalid value.
	ErrInvalidValue = errorsmod.Register(RootCodespace, 2, "invalid value")

	// ErrInvalidChainID returns an error resulting from an invalid chain ID.
	ErrInvalidChainID = errorsmod.Register(RootCodespace, 3, "invalid chain ID")

	// ErrMarshalBigInt returns an error resulting from marshaling a big.Int to a string.
	ErrMarshalBigInt = errorsmod.Register(RootCodespace, 5, "cannot marshal big.Int to string")

	// ErrUnmarshalBigInt returns an error resulting from unmarshaling a big.Int from a string.
	ErrUnmarshalBigInt = errorsmod.Register(RootCodespace, 6, "cannot unmarshal big.Int from string")
)
