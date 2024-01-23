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

func (k msgServer) AddKeyringParty(goCtx context.Context, msg *types.MsgAddKeyringParty) (*types.MsgAddKeyringPartyResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	kr := k.GetKeyring(ctx, msg.KeyringAddr)
	if kr == nil {
		return nil, fmt.Errorf("keyring not found")
	}

	if !kr.IsActive {
		return nil, fmt.Errorf("keyring is inactive")
	}

	if kr.IsParty(msg.Party) {
		return nil, fmt.Errorf("party is already a party of the keyring")
	}

	if !kr.IsAdmin(msg.Creator) {
		return nil, fmt.Errorf("tx creator is no keyring admin")
	}

	kr.AddParty(msg.Party)
	k.SetKeyring(ctx, kr)

	return &types.MsgAddKeyringPartyResponse{}, nil
}
