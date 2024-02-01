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
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/x/identity/types"
)

func (k msgServer) AddKeychainParty(goCtx context.Context, msg *types.MsgAddKeychainParty) (*types.MsgAddKeychainPartyResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	kr := k.GetKeychain(ctx, msg.KeychainAddr)
	if kr == nil {
		return nil, fmt.Errorf("keychain not found")
	}

	if !kr.IsActive {
		return nil, fmt.Errorf("keychain is inactive")
	}

	if kr.IsParty(msg.Party) {
		return nil, fmt.Errorf("party is already a party of the keychain")
	}

	if !kr.IsAdmin(msg.Creator) {
		return nil, fmt.Errorf("tx creator is no keychain admin")
	}

	kr.AddParty(msg.Party)
	k.SetKeychain(ctx, kr)

	return &types.MsgAddKeychainPartyResponse{}, nil
}
