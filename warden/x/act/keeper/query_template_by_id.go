package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

// revive:disable-next-line var-naming
//
//nolint:stylecheck,st1003
func (k Keeper) TemplateById(goCtx context.Context, req *types.QueryTemplateByIdRequest) (*types.QueryTemplateByIdResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	templatePb, err := k.GetTemplate(ctx, req.Id)
	if err != nil {
		return nil, err
	}

	return &types.QueryTemplateByIdResponse{Template: &templatePb}, nil
}
