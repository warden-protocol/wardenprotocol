package keeper

import (
	"context"
	"fmt"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"github.com/qredo/fusionchain/x/treasury/types"
)

func (k Keeper) SignatureRequests(goCtx context.Context, req *types.QuerySignatureRequestsRequest) (*types.QuerySignatureRequestsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	store := ctx.KVStore(k.storeKey)
	workspaceStore := prefix.NewStore(store, types.KeyPrefix(types.SignRequestKey))

	signRequests, pageRes, err := query.GenericFilteredPaginate(k.cdc, workspaceStore, req.Pagination, func(keyBz []byte, value *types.SignRequest) (*types.SignRequest, error) {
		key, found := k.GetKey(ctx, value.KeyId)
		if !found {
			return nil, fmt.Errorf("key %d not found", value.KeyId)
		}

		if key.KeyringAddr != req.KeyringAddr {
			return nil, nil
		}

		if req.Status != types.SignRequestStatus_SIGN_REQUEST_STATUS_UNSPECIFIED && value.Status != req.Status {
			return nil, nil
		}

		return value, nil
	}, func() *types.SignRequest { return &types.SignRequest{} })

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QuerySignatureRequestsResponse{
		SignRequests: signRequests,
		Pagination:   pageRes,
	}, nil
}
