package keeper

// type keeperFutureSource struct {
// 	out chan prophet.Future
// }
//
// func NewFuturesSource() keeperFutureSource {
// 	return keeperFutureSource{
// 		out: make(chan prophet.Future, 1000),
// 	}
// }
//
// func (f keeperFutureSource) Flush(ctx context.Context, k Keeper) {
// 	res, err := k.PendingFutures(ctx, &types.QueryPendingFuturesRequest{
// 		Pagination: nil,
// 	})
// 	if err != nil {
// 		sdkCtx := sdk.UnwrapSDKContext(ctx)
// 		sdkCtx.Logger().Error("failed to fetch pending futures", "err", err)
// 		return
// 	}
//
// 	go func() {
// 		for _, future := range res.Futures {
// 			f.out <- prophet.Future{
// 				ID:      future.Id,
// 				Handler: future.Handler,
// 				Input:   future.Input,
// 			}
// 		}
// 	}()
// }
//
// func (f keeperFutureSource) Fetch() <-chan prophet.Future {
// 	return f.out
// }
//
// type keeperResultsSource struct {
// 	selfAddr sdk.ConsAddress
// 	out      chan prophet.FutureResult
// }
//
// func NewResultsSource(selfAddr sdk.ConsAddress) keeperResultsSource {
// 	return keeperResultsSource{
// 		selfAddr: selfAddr,
// 		out:      make(chan prophet.FutureResult, 1000),
// 	}
// }
//
// func (f keeperResultsSource) Flush(ctx context.Context, k Keeper) {
// 	res, err := k.FuturesPendingVote(ctx, &types.QueryFuturesPendingVoteRequest{
// 		Validator:  f.selfAddr.String(),
// 		Pagination: nil,
// 	})
// 	if err != nil {
// 		sdkCtx := sdk.UnwrapSDKContext(ctx)
// 		sdkCtx.Logger().Error("failed to fetch pending futures", "err", err)
// 		return
// 	}
//
// 	go func() {
// 		for _, future := range res.Futures {
// 			f.out <- prophet.FutureResult{
// 				Future: prophet.Future{
// 					ID:      future.Future.Id,
// 					Handler: future.Future.Handler,
// 					Input:   future.Future.Input,
// 				},
// 				Output: future.Result.Output,
// 			}
// 		}
// 	}()
// }
//
// func (f keeperResultsSource) Fetch() <-chan prophet.FutureResult {
// 	return f.out
// }
