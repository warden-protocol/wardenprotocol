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

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/x/identity/types"
)

func (k msgServer) NewKeyring(goCtx context.Context, msg *types.MsgNewKeyring) (*types.MsgNewKeyringResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	keyring := &types.Keyring{
		Creator:       msg.Creator,
		Description:   msg.Description,
		Admins:        []string{msg.Creator},
		AdminPolicyId: msg.AdminPolicyId,
		Fees:          msg.Fees,
		IsActive:      true,
	}
	address := k.CreateKeyring(ctx, keyring)

	return &types.MsgNewKeyringResponse{
		Address: address,
	}, nil
}
