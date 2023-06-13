package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) WalletRequestById(goCtx context.Context, req *types.QueryWalletRequestByIdRequest) (*types.QueryWalletRequestByIdResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	walletReq, found := k.GetWalletRequest(ctx, req.Id)
	if !found {
		return nil, fmt.Errorf("wallet request %d not found", req.Id)
	}

	return &types.QueryWalletRequestByIdResponse{
		WalletRequest: &walletReq,
	}, nil
}
