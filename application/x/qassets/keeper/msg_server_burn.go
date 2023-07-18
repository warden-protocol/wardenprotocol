package keeper

import (
	"context"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// func (k msgServer) Burn(goCtx context.Context, msg *types.MsgBurn) (*types.MsgBurnResponse, error) {
func (k msgServer) Burn(goCtx context.Context, msg *QAssetMsg) (*QAssetResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	k.Keeper.Burn(ctx, msg)

	// return &types.MsgBurnResponse{}, nil
	return &QAssetResponse{}, nil
}
