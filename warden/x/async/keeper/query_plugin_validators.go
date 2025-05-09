package keeper

import (
	"context"

	"cosmossdk.io/collections"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

func (k Keeper) PluginValidators(ctx context.Context, req *types.QueryPluginValidatorsRequest) (*types.QueryPluginValidatorsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	queueID := QueueID(req.Name)

	totalWeight, err := k.queueTotalWeights.Get(ctx, queueID)
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	it, err := k.queuePriorities.Iterate(ctx, collections.NewPrefixedPairRange[QueueID, sdk.ConsAddress](queueID))
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	prioKV, err := it.KeyValues()
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	priorities := make([]types.QueuePriority, 0, len(prioKV))
	for _, kv := range prioKV {
		priorities = append(priorities, types.QueuePriority{
			Validator: kv.Key.K2(),
			Priority:  int64(kv.Value),
		})
	}

	if err := it.Close(); err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	it2, err := k.queueWeights.Iterate(ctx, collections.NewPrefixedPairRange[QueueID, sdk.ConsAddress](queueID))
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	weightKV, err := it2.KeyValues()
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	weights := make([]types.QueueWeight, 0, len(weightKV))
	for _, kv := range weightKV {
		weights = append(weights, types.QueueWeight{
			Validator: kv.Key.K2(),
			Weight:    int64(kv.Value),
		})
	}

	if err := it2.Close(); err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryPluginValidatorsResponse{
		QueueTotalWeight: int64(totalWeight),
		QueuePriorities:  priorities,
		QueueWeights:     weights,
	}, nil
}
