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
	bbird.RegisterPolicyGeneratorHandler(
		keeper.policyKeeper,
		"/fusionchain.identity.MsgAddWorkspaceOwner",
		s.AddOwnerPolicyGenerator,
	)

	bbird.RegisterActionHandler(
		keeper.policyKeeper,
		"/fusionchain.identity.MsgRemoveWorkspaceOwner",
		s.RemoveOwnerActionHandler,
	)
	bbird.RegisterPolicyGeneratorHandler(
		keeper.policyKeeper,
		"/fusionchain.identity.MsgRemoveWorkspaceOwner",
		s.RemoveOwnerPolicyGenerator,
	)

	bbird.RegisterActionHandler(
		keeper.policyKeeper,
		"/fusionchain.identity.MsgAppendChildWorkspace",
		s.AppendChildWorkspaceActionHandler,
	)
	bbird.RegisterPolicyGeneratorHandler(
		keeper.policyKeeper,
		"/fusionchain.identity.MsgAppendChildWorkspace",
		s.AppendChildWorkspacePolicyGenerator,
	)

	bbird.RegisterActionHandler(
		keeper.policyKeeper,
		"/fusionchain.identity.MsgNewChildWorkspace",
		s.NewChildWorkspaceActionHandler,
	)
	bbird.RegisterPolicyGeneratorHandler(
		keeper.policyKeeper,
		"/fusionchain.identity.MsgNewChildWorkspace",
		s.NewChildWorkspacePolicyGenerator,
	)
	return s
}

var _ types.MsgServer = msgServer{}
