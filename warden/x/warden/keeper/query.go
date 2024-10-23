package keeper

import (
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

// NewQueryServerImpl returns an implementation of the MsgServer interface
// for the provided Keeper.
func NewQueryServerImpl(keeper Keeper) types.QueryServer {
	return &keeper
}

var _ types.QueryServer = Keeper{}
