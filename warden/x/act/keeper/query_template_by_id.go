package keeper

import (
	"context"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

func (k Keeper) TemplateById(goCtx context.Context, req *types.QueryTemplateByIdRequest) (*types.QueryTemplateByIdResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	templatePb, err := k.GetTemplate(goCtx, req.Id)
	if err != nil {
		return nil, err
	}

	return &types.QueryTemplateByIdResponse{Template: &templatePb}, nil
}
