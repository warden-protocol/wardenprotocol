package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

func (k Keeper) Templates(goCtx context.Context, req *types.QueryTemplatesRequest) (*types.QueryTemplatesResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	templates, pageRes, err := query.CollectionFilteredPaginate(
		goCtx,
		k.templates,
		req.Pagination,
		func(key uint64, value types.Template) (bool, error) {
			return req.Creator == "" || value.Creator == req.Creator, nil
		},
		func(key uint64, value types.Template) (types.Template, error) {
			return value, nil
		})
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryTemplatesResponse{
		Templates:  templates,
		Pagination: pageRes,
	}, nil
}
