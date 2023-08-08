package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.qredo.com/qrdochain/fusionchain/x/qassets/types"
)

func (k msgServer) Send(goCtx context.Context, msg *types.MsgSend) (*types.MsgSendResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	k.Keeper.Send(ctx, msg.Creator, msg.FromWorkspaceAddr, msg.ToWorkspaceAddr, msg.QassetDenom, msg.Amount)

	return &types.MsgSendResponse{}, nil
}
