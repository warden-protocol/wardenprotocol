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
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/x/identity/types"
)

func (k msgServer) UpdateKeyring(goCtx context.Context, msg *types.MsgUpdateKeyring) (*types.MsgUpdateKeyringResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	kr := k.GetKeyring(ctx, msg.KeyringAddr)
	if kr == nil {
		return nil, fmt.Errorf("keyring not found")
	}

	// Check if the requester is an admin
	if !isAdmin(kr, msg.Creator) {
		return nil, fmt.Errorf("keyring updates should be requested by admins")
	}

	kr.SetStatus(msg.IsActive)
	if msg.Description != "" {
		kr.SetDescription(msg.Description)
	}
	k.SetKeyring(ctx, kr)
	return &types.MsgUpdateKeyringResponse{}, nil
}

// isAdmin checks if the given creator is in the list of keyring admins.
func isAdmin(kr *types.Keyring, creator string) bool {
	for _, admin := range kr.Admins {
		if creator == admin {
			return true
		}
	}
	return false
}
