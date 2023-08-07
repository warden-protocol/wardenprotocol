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
	"fmt"
	"strings"

	errorsmod "cosmossdk.io/errors"
	"github.com/ethereum/go-ethereum/common"
)

// Storage represents the account Storage map as a slice of single key value
// State pairs. This is to prevent non determinism at genesis initialization or export.
type Storage []State

// Validate performs a basic validation of the Storage fields.
func (s Storage) Validate() error {
	seenStorage := make(map[string]bool)
	for i, state := range s {
		if seenStorage[state.Key] {
			return errorsmod.Wrapf(ErrInvalidState, "duplicate state key %d: %s", i, state.Key)
		}

		if err := state.Validate(); err != nil {
			return err
		}

		seenStorage[state.Key] = true
	}
	return nil
}

// String implements the stringer interface
func (s Storage) String() string {
	var str string
	for _, state := range s {
		str += fmt.Sprintf("%s\n", state.String())
	}

	return str
}

// Copy returns a copy of storage.
func (s Storage) Copy() Storage {
	cpy := make(Storage, len(s))
	copy(cpy, s)

	return cpy
}

// Validate performs a basic validation of the State fields.
// NOTE: state value can be empty
func (s State) Validate() error {
	if strings.TrimSpace(s.Key) == "" {
		return errorsmod.Wrap(ErrInvalidState, "state key hash cannot be blank")
	}

	return nil
}

// NewState creates a new State instance
func NewState(key, value common.Hash) State {
	return State{
		Key:   key.String(),
		Value: value.String(),
	}
}
