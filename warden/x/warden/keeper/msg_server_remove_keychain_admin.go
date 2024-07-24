package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func (k msgServer) RemoveKeychainAdmin(goCtx context.Context, msg *types.MsgRemoveKeychainAdminRequest) (*types.MsgRemoveKeychainAdminResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	kr, err := k.keychains.Get(ctx, msg.KeychainId)
	if err != nil {
		return nil, err
	}

	if !kr.IsAdmin(msg.Authority) {
		return nil, fmt.Errorf("keychain updates should be requested by admins")
	}
	if !kr.IsAdmin(msg.Admin) {
		return &types.MsgRemoveKeychainAdminResponse{}, nil
	}
	if len(kr.Admins) == 1 {
		return nil, fmt.Errorf("keychain must have at least one admin")
	}

	kr.RemoveAdmin(msg.Admin)

	if err := k.keychains.Set(ctx, kr.Id, kr); err != nil {
		return nil, err
	}

	if err := ctx.EventManager().EmitTypedEvent(&types.EventRemoveKeychainAdmin{
		Id:          kr.Id,
		Admin:       msg.Admin,
		AdminsCount: uint64(len(kr.Admins)),
	}); err != nil {
		return nil, err
	}

	return &types.MsgRemoveKeychainAdminResponse{}, nil
}
