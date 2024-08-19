package keeper

import (
	"context"

	"cosmossdk.io/collections"
	"github.com/cosmos/cosmos-sdk/codec"

	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
	v1beta3 "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

type KeysKeeper struct {
	keys        collections.Map[uint64, types.Key]
	keysBySpace collections.KeySet[collections.Pair[uint64, uint64]]
}

func NewKeysKeeper(sb *collections.SchemaBuilder, cdc codec.BinaryCodec) KeysKeeper {
	keys := collections.NewMap(sb, KeyPrefix, "keys", collections.Uint64Key, codec.CollValue[v1beta3.Key](cdc))
	keysBySpace := collections.NewKeySet(
		sb, KeysSpaceIndexPrefix, "keys_by_space",
		collections.PairKeyCodec(collections.Uint64Key, collections.Uint64Key),
	)
	return KeysKeeper{
		keys:        keys,
		keysBySpace: keysBySpace,
	}
}

func (k KeysKeeper) New(ctx context.Context, key types.Key, keyRequest types.KeyRequest) error {
	key.Id = keyRequest.Id
	return k.Set(ctx, key)
}

func (k KeysKeeper) Get(ctx context.Context, id uint64) (types.Key, error) {
	return k.keys.Get(ctx, id)
}

func (k KeysKeeper) Set(ctx context.Context, key types.Key) error {
	if err := k.keysBySpace.Set(ctx, collections.Join(key.SpaceId, key.Id)); err != nil {
		return err
	}
	return k.keys.Set(ctx, key.Id, key)
}

func (k KeysKeeper) Coll() collections.Map[uint64, v1beta3.Key] {
	return k.keys
}

func (k KeysKeeper) KeysBySpace() collections.KeySet[collections.Pair[uint64, uint64]] {
	return k.keysBySpace
}
