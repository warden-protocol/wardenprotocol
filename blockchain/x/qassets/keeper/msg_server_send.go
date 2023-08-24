package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/x/qassets/types"
)

func (k msgServer) Send(goCtx context.Context, msg *types.MsgSend) (*types.MsgSendResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if err := k.Keeper.Send(ctx, msg.Creator, msg.FromWorkspaceAddr, msg.ToWorkspaceAddr, msg.QassetDenom, msg.Amount); err != nil {
		return nil, err
	}

	return &types.MsgSendResponse{}, nil
}
