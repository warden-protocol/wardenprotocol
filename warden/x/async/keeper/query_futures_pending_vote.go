package keeper

// func (k Keeper) FuturesPendingVote(ctx context.Context, req *types.QueryFuturesPendingVoteRequest) (*types.QueryFuturesPendingVoteResponse, error) {
// 	if req == nil {
// 		return nil, status.Error(codes.InvalidArgument, "invalid request")
// 	}
//
// 	var valAddr sdk.ConsAddress
// 	if req.Validator != "" {
// 		a, err := sdk.ConsAddressFromBech32(req.Validator)
// 		if err != nil {
// 			return nil, status.Error(codes.InvalidArgument, "invalid validator address")
// 		}
// 		valAddr = a
// 	}
//
// 	futures, pageRes, err := query.CollectionFilteredPaginate(ctx, k.futures.Futures(), req.Pagination, func(key uint64, value types.Future) (bool, error) {
// 		// filter by removing futures that don't have a result yet
// 		_, err := k.futures.GetResult(ctx, value.Id)
// 		if errors.Is(err, collections.ErrNotFound) {
// 			return false, nil
// 		}
// 		if err != nil {
// 			return false, err
// 		}
//
// 		// filter by removing futures for which the validator has voted
// 		if !valAddr.Empty() {
// 			votes, err := k.GetFutureVotes(ctx, value.Id)
// 			if err != nil {
// 				return false, err
// 			}
//
// 			for _, vote := range votes {
// 				if valAddr.Equals(sdk.ConsAddress(vote.Voter)) {
// 					return false, nil
// 				}
// 			}
// 		}
//
// 		return true, nil
// 	}, func(key uint64, value types.Future) (types.FutureWithResultResponse, error) {
// 		var (
// 			result *types.FutureResult
// 		)
//
// 		r, err := k.futures.GetResult(ctx, value.Id)
// 		if err == nil {
// 			result = &r
// 		} else if !errors.Is(err, collections.ErrNotFound) {
// 			return types.FutureWithResultResponse{}, err
// 		}
//
// 		return types.FutureWithResultResponse{
// 			Future: value,
// 			Result: result,
// 		}, nil
// 	})
//
// 	if err != nil {
// 		return nil, status.Error(codes.Internal, err.Error())
// 	}
//
// 	return &types.QueryFuturesPendingVoteResponse{
// 		Pagination: pageRes,
// 		Futures:    futures,
// 	}, nil
// }
