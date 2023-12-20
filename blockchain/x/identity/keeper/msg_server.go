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

	bbird.RegisterActionHandler(
		keeper.policyKeeper,
		"/fusionchain.identity.MsgUpdateWorkspace",
		s.UpdateWorkspaceActionHandler,
	)
	bbird.RegisterPolicyGeneratorHandler(
		keeper.policyKeeper,
		"/fusionchain.identity.MsgUpdateWorkspace",
		s.UpdateWorkspacePolicyGenerator,
	)

	return s
}

var _ types.MsgServer = msgServer{}
