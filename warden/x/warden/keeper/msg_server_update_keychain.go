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
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

func (k msgServer) UpdateKeychain(goCtx context.Context, msg *types.MsgUpdateKeychain) (*types.MsgUpdateKeychainResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	kr, err := k.keychains.Get(ctx, msg.KeychainId)
	if err != nil {
		return nil, err
	}

	// Check if the requester is an admin
	if !kr.IsAdmin(msg.Creator) {
		return nil, fmt.Errorf("keychain updates should be requested by admins")
	}

	kr.SetStatus(msg.IsActive)
	if msg.Description != "" {
		kr.SetDescription(msg.Description)
	}

	if err := k.keychains.Set(ctx, kr.Id, kr); err != nil {
		return nil, err
	}

	return &types.MsgUpdateKeychainResponse{}, nil
}
