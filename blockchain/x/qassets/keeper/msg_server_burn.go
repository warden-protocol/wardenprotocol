package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/x/qassets/types"
)

func (k msgServer) Burn(goCtx context.Context, msg *types.MsgBurn) (*types.MsgBurnResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if err := k.Keeper.Burn(ctx, msg.Creator, msg.WorkspaceAddr, msg.WalletType, msg.IsToken, msg.TokenName, msg.TokenContractAddr, msg.Amount); err != nil {
		return nil, err
	}

	return &types.MsgBurnResponse{}, nil
}
