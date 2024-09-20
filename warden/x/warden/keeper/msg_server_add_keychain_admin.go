package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func (k msgServer) AddKeychainAdmin(goCtx context.Context, msg *types.MsgAddKeychainAdminRequest) (*types.MsgAddKeychainAdminResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	kr, err := k.keychains.Get(ctx, msg.KeychainId)
	if err != nil {
		return nil, err
	}

	if !kr.IsAdmin(msg.Authority) {
		return nil, types.ErrNotKeychainAdmin
	}
	if kr.IsAdmin(msg.NewAdmin) {
		return nil, types.ErrDuplicateKeychainAdmin
	}

	kr.AddAdmin(msg.NewAdmin)

	if err := k.keychains.Set(ctx, kr.Id, kr); err != nil {
		return nil, err
	}

	if err := ctx.EventManager().EmitTypedEvent(&types.EventAddKeychainAdmin{
		Id:          kr.Id,
		NewAdmin:    msg.NewAdmin,
		AdminsCount: uint64(len(kr.Admins)),
	}); err != nil {
		return nil, err
	}

	return &types.MsgAddKeychainAdminResponse{}, nil
}
