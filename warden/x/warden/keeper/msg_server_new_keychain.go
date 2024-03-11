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

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types"
)

func (k msgServer) NewKeychain(goCtx context.Context, msg *types.MsgNewKeychain) (*types.MsgNewKeychainResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	keychain := &types.Keychain{
		Creator:       msg.Creator,
		Description:   msg.Description,
		Admins:        []string{msg.Creator},
		AdminIntentId: msg.AdminIntentId,
		Fees:          msg.KeychainFees,
		IsActive:      true,
	}

	id, err := k.keychains.Append(ctx, keychain)
	if err != nil {
		return nil, err
	}

	return &types.MsgNewKeychainResponse{
		Id: id,
	}, nil
}
