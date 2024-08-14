package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func (k msgServer) NewInferenceRequest(goCtx context.Context, msg *types.MsgNewInferenceRequest) (*types.MsgNewInferenceRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	id, err := k.inferenceRequests.Append(ctx, &types.InferenceRequest{
		Creator:   msg.Creator,
		Input:     msg.Input,
		CreatedAt: uint64(ctx.BlockHeight()),
	})
	if err != nil {
		return nil, err
	}

	return &types.MsgNewInferenceRequestResponse{
		Id: id,
	}, nil
}
