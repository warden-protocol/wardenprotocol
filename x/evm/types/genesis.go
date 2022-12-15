package types

import (
	"fmt"

	ethermint "github.com/evmos/ethermint/types"
)

// Validate performs a basic validation of a GenesisAccount fields.
func (ga GenesisAccount) Validate() error {
	if err := ethermint.ValidateAddress(ga.Address); err != nil {
		return err
	}
	return ga.Storage.Validate()
}

// DefaultGenesisState sets default evm genesis state with empty accounts and default params and
// chain config values.
func DefaultGenesisState() *GenesisState {
	return &GenesisState{
		Accounts: []GenesisAccount{},
		Params:   DefaultParams(),
	}
}

// NewGenesisState creates a new genesis state.
func NewGenesisState(params Params, accounts []GenesisAccount) *GenesisState {
	return &GenesisState{
		Accounts: accounts,
		Params:   params,
	}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	seenAccounts := make(map[string]bool)
	for _, acc := range gs.Accounts {
		if seenAccounts[acc.Address] {
			return fmt.Errorf("duplicated genesis account %s", acc.Address)
		}
		if err := acc.Validate(); err != nil {
			return fmt.Errorf("invalid genesis account %s: %w", acc.Address, err)
		}
		seenAccounts[acc.Address] = true
	}

	return gs.Params.Validate()
}
