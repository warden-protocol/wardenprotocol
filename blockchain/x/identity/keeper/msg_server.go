// Copyright 2024
//
// This file includes work covered by the following copyright and permission notices:
//
// Copyright 2023 Qredo Ltd.
// Licensed under the Apache License, Version 2.0;
//
// This file is part of the Warden Protocol library.
//
// The Warden Protocol library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Warden Protocol library. If not, see https://github.com/warden-protocol/wardenprotocol/blob/main/LICENSE
package keeper

import (
	"github.com/warden-protocol/wardenprotocol/x/identity/types"
	bbird "github.com/warden-protocol/wardenprotocol/x/intent/keeper"
)

type msgServer struct {
	Keeper
}

// NewMsgServerImpl returns an implementation of the MsgServer interface
// for the provided Keeper.
func NewMsgServerImpl(keeper Keeper) types.MsgServer {
	s := &msgServer{Keeper: keeper}

	bbird.RegisterActionHandler(
		keeper.intentKeeper,
		"/wardenprotocol.identity.MsgAddSpaceOwner",
		s.AddOwnerActionHandler,
	)
	bbird.RegisterIntentGeneratorHandler(
		keeper.intentKeeper,
		"/wardenprotocol.identity.MsgAddSpaceOwner",
		s.AddOwnerIntentGenerator,
	)

	bbird.RegisterActionHandler(
		keeper.intentKeeper,
		"/wardenprotocol.identity.MsgRemoveSpaceOwner",
		s.RemoveOwnerActionHandler,
	)
	bbird.RegisterIntentGeneratorHandler(
		keeper.intentKeeper,
		"/wardenprotocol.identity.MsgRemoveSpaceOwner",
		s.RemoveOwnerIntentGenerator,
	)

	bbird.RegisterActionHandler(
		keeper.intentKeeper,
		"/wardenprotocol.identity.MsgAppendChildSpace",
		s.AppendChildSpaceActionHandler,
	)
	bbird.RegisterIntentGeneratorHandler(
		keeper.intentKeeper,
		"/wardenprotocol.identity.MsgAppendChildSpace",
		s.AppendChildSpaceIntentGenerator,
	)

	bbird.RegisterActionHandler(
		keeper.intentKeeper,
		"/wardenprotocol.identity.MsgNewChildSpace",
		s.NewChildSpaceActionHandler,
	)
	bbird.RegisterIntentGeneratorHandler(
		keeper.intentKeeper,
		"/wardenprotocol.identity.MsgNewChildSpace",
		s.NewChildSpaceIntentGenerator,
	)

	bbird.RegisterActionHandler(
		keeper.intentKeeper,
		"/wardenprotocol.identity.MsgUpdateSpace",
		s.UpdateSpaceActionHandler,
	)
	bbird.RegisterIntentGeneratorHandler(
		keeper.intentKeeper,
		"/wardenprotocol.identity.MsgUpdateSpace",
		s.UpdateSpaceIntentGenerator,
	)

	return s
}

var _ types.MsgServer = msgServer{}
