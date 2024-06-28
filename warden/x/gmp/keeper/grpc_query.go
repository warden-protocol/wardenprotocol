package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/wardenprotocol/warden/x/gmp/types"
)

var _ types.QueryServer = querier{}

// Querier implements a QueryServer for the module.
type querier struct {
	Keeper
}

// NewQuerier returns an implementation of the gmp QueryServer interface
// for the provided Keeper.
func NewQuerier(keeper Keeper) types.QueryServer {
	return &querier{Keeper: keeper}
}

// Params queries params of the module.
func (q querier) Params(
	goCtx context.Context,
	_ *types.ParamsRequest,
) (*types.ParamsResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	params := q.GetParams(ctx)
	return &types.ParamsResponse{Params: params}, nil
}
