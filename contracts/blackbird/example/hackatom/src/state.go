package src

import (
	"errors"

	"github.com/CosmWasm/cosmwasm-go/std"
)

// this is what we store
type State struct {
	// TODO: convert to canonical addresses when that is supported by ezjson
	Verifier    string `json:"VERIFIER"`
	Beneficiary string `json:"BENEFICIARY"`
	Funder      string `json:"FUNDER"`
}

var StateKey = []byte("config")

func LoadState(storage std.Storage) (*State, error) {
	data := storage.Get(StateKey)
	if data == nil {
		return nil, errors.New("state not found") // TODO(fdymylja): replace when errors API is ready
	}

	var state State
	err := state.UnmarshalJSON(data)
	if err != nil {
		return nil, err
	}
	return &state, nil
}

func SaveState(storage std.Storage, state *State) error {
	bz, err := state.MarshalJSON()
	if err != nil {
		return err
	}

	storage.Set(StateKey, bz)

	return nil
}
