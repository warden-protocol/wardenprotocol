package keeper

import (
	"github.com/qredo/fusionchain/x/identity/types"
	bbird "github.com/qredo/fusionchain/x/policy/keeper"
)

type msgServer struct {
	Keeper
}

// NewMsgServerImpl returns an implementation of the MsgServer interface
// for the provided Keeper.
func NewMsgServerImpl(keeper Keeper) types.MsgServer {
	s := &msgServer{Keeper: keeper}
	bbird.RegisterActionHandler(
		keeper.policyKeeper,
		"/fusionchain.identity.MsgAddWorkspaceOwner",
		s.AddOwnerActionHandler,
	)
	bbird.RegisterActionHandler(
		keeper.policyKeeper,
		"/fusionchain.identity.MsgRemoveWorkspaceOwner",
		s.RemoveOwnerActionHandler,
	)
	return s
}

var _ types.MsgServer = msgServer{}
