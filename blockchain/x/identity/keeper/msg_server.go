package keeper

import (
	bbird "github.com/qredo/fusionchain/x/blackbird/keeper"
	"github.com/qredo/fusionchain/x/identity/types"
)

type msgServer struct {
	Keeper
}

// NewMsgServerImpl returns an implementation of the MsgServer interface
// for the provided Keeper.
func NewMsgServerImpl(keeper Keeper) types.MsgServer {
	s := &msgServer{Keeper: keeper}
	bbird.RegisterActionHandler(
		keeper.blackbirdKeeper,
		"/fusionchain.identity.MsgAddWorkspaceOwner",
		s.AddOwnerActionHandler,
	)
	bbird.RegisterActionHandler(
		keeper.blackbirdKeeper,
		"/fusionchain.identity.MsgRemoveWorkspaceOwner",
		s.RemoveOwnerActionHandler,
	)
	return s
}

var _ types.MsgServer = msgServer{}
