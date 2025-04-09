package keeper

import (
	"context"

	"cosmossdk.io/collections"
	"github.com/cosmos/cosmos-sdk/codec"

	"github.com/warden-protocol/wardenprotocol/warden/repo"
	types "github.com/warden-protocol/wardenprotocol/warden/x/sched/types/v1beta1"
)

type CallbackKeeper struct {
	callbacks repo.SeqCollection[types.Callback]
	results   collections.Map[uint64, types.CallbackResult]
}

func NewCallbackKeeper(sb *collections.SchemaBuilder, cdc codec.Codec) *CallbackKeeper {
	callbacksSeq := collections.NewSequence(sb, CallbackSeqPrefix, "callbacks_sequence")
	callbacksColl := collections.NewMap(sb, CallbacksPrefix, "callbacks", collections.Uint64Key, codec.CollValue[types.Callback](cdc))

	callbacks := repo.NewSeqCollection(callbacksSeq, callbacksColl, func(t *types.Callback, u uint64) { t.Id = u })

	results := collections.NewMap(sb, ResultsPrefix, "callback_results", collections.Uint64Key, codec.CollValue[types.CallbackResult](cdc))

	return &CallbackKeeper{
		callbacks: callbacks,
		results:   results,
	}
}

func (k *CallbackKeeper) Callbacks() repo.SeqCollection[types.Callback] {
	return k.callbacks
}

func (k *CallbackKeeper) Get(ctx context.Context, id uint64) (types.Callback, error) {
	return k.callbacks.Get(ctx, id)
}

func (k *CallbackKeeper) Append(ctx context.Context, t *types.Callback) (uint64, error) {
	id, err := k.callbacks.Append(ctx, t)
	if err != nil {
		return 0, err
	}

	return id, nil
}

func (k *CallbackKeeper) SetResult(ctx context.Context, id uint64, result types.CallbackResult) error {
	if exists, _ := k.results.Has(ctx, id); exists {
		return types.ErrCallbackAlreadyHasResult
	}

	return k.results.Set(ctx, id, result)
}

func (k *CallbackKeeper) GetResult(ctx context.Context, id uint64) (types.CallbackResult, error) {
	return k.results.Get(ctx, id)
}
