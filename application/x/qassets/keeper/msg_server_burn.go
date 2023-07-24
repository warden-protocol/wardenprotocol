package keeper

import (
	"context"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.qredo.com/qrdochain/fusionchain/x/qassets/types"
)

func (k msgServer) Burn(goCtx context.Context, msg *types.MsgBurn) (*types.MsgBurnResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	k.Keeper.Burn(ctx, msg.Creator, msg.FromWorkspaceAddr, msg.ToWalletId, msg.IsToken, msg.TokenName, msg.TokenContractAddr, msg.Amount)

	return &types.MsgBurnResponse{}, nil
}
