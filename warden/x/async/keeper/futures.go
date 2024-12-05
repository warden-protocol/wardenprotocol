package keeper

import (
	"context"
	"fmt"

	"cosmossdk.io/collections"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/wardenprotocol/warden/repo"
	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

type FutureKeeper struct {
	futures         repo.SeqCollection[types.Future]
	futureByCreator collections.KeySet[collections.Pair[sdk.AccAddress, uint64]]
	results         collections.Map[uint64, types.FutureResult]
}

func NewFutureKeeper(sb *collections.SchemaBuilder, cdc codec.Codec) *FutureKeeper {
	futuresSeq := collections.NewSequence(sb, FutureSeqPrefix, "futures_sequence")
	futuresColl := collections.NewMap(sb, FuturesPrefix, "futures", collections.Uint64Key, codec.CollValue[types.Future](cdc))

	futures := repo.NewSeqCollection(futuresSeq, futuresColl, func(t *types.Future, u uint64) { t.Id = u })
	futureByCreator := collections.NewKeySet(sb, FutureByAddressPrefix, "futures_by_address", collections.PairKeyCodec(sdk.AccAddressKey, collections.Uint64Key))

	results := collections.NewMap(sb, ResultsPrefix, "future_results", collections.Uint64Key, codec.CollValue[types.FutureResult](cdc))

	return &FutureKeeper{
		futures:         futures,
		futureByCreator: futureByCreator,
		results:         results,
	}
}

func (k *FutureKeeper) Append(ctx context.Context, t *types.Future) (uint64, error) {
	id, err := k.futures.Append(ctx, t)
	if err != nil {
		return 0, err
	}

	creator, err := sdk.AccAddressFromBech32(t.Creator)
	if err != nil {
		return 0, fmt.Errorf("invalid creator address: %w", err)
	}

	if err := k.futureByCreator.Set(ctx, collections.Join(creator, id)); err != nil {
		return 0, err
	}

	return id, nil
}

func (k *FutureKeeper) Get(ctx context.Context, id uint64) (types.Future, error) {
	return k.futures.Get(ctx, id)
}

func (k *FutureKeeper) Set(ctx context.Context, f types.Future) error {
	return k.futures.Set(ctx, f.Id, f)
}

func (k *FutureKeeper) SetResult(ctx context.Context, result types.FutureResult) error {
	return k.results.Set(ctx, result.Id, result)
}

func (k *FutureKeeper) GetResult(ctx context.Context, id uint64) (types.FutureResult, error) {
	return k.results.Get(ctx, id)
}

func (k *FutureKeeper) HasResult(ctx context.Context, id uint64) (bool, error) {
	return k.results.Has(ctx, id)
}

func (k *FutureKeeper) Futures() repo.SeqCollection[types.Future] {
	return k.futures
}