// Copyright 2023 Qredo Ltd.
// This file is part of the Fusion library.
//
// The Fusion library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Fusion library. If not, see https://github.com/qredo/fusionchain/blob/main/LICENSE
package types

import "fmt"

// NewGenesisState creates a new genesis state.
func NewGenesisState(params Params, revenues []Revenue) GenesisState {
	return GenesisState{
		Params:   params,
		Revenues: revenues,
	}
}

// DefaultGenesisState sets default evm genesis state with empty accounts and
// default params and chain config values.
func DefaultGenesisState() *GenesisState {
	return &GenesisState{
		Params: DefaultParams(),
	}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	seenContract := make(map[string]bool)
	for _, fs := range gs.Revenues {
		// only one fee per contract
		if seenContract[fs.ContractAddress] {
			return fmt.Errorf("contract duplicated on genesis '%s'", fs.ContractAddress)
		}

		if err := fs.Validate(); err != nil {
			return err
		}

		seenContract[fs.ContractAddress] = true
	}

	return gs.Params.Validate()
}
