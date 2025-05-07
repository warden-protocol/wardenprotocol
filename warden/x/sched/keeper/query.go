package keeper

import (
	types "github.com/warden-protocol/wardenprotocol/warden/x/sched/types/v1beta1"
)

// NewQueryServerImpl returns an implementation of the MsgServer interface
// for the provided Keeper.
func NewQueryServerImpl(keeper Keeper) types.QueryServer {
	return &keeper
}

var _ types.QueryServer = Keeper{}
