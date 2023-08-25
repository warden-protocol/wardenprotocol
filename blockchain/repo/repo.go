package repo

import (
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	"github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// Object is an entity with a uint64 id.
type Object interface {
	codec.ProtoMarshaler
	GetID() uint64
	SetID(uint64)
}

// ObjectRepo[T] is a view over a keeper's store that will store Objects.
//
// Objects will use autoincrement uint64 IDs.
// Objects will be stored under $storeKey/$objKey/$id.
// The count of the objects present in the database is stored under $storeKey/$countKey.
type ObjectRepo[T Object] struct {
	// Constructor is used to allocate an empty object T and pass it as the
	// output param for the codec.
	Constructor func() T
	StoreKey    types.StoreKey
	CountKey    []byte
	ObjKey      []byte
	Cdc         codec.BinaryCodec
}

func (r ObjectRepo[T]) GetCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(r.StoreKey), []byte{})
	bz := store.Get(r.CountKey)
	if bz == nil {
		return 0
	}
	return sdk.BigEndianToUint64(bz)
}

func (r ObjectRepo[T]) SetCount(ctx sdk.Context, c uint64) {
	store := prefix.NewStore(ctx.KVStore(r.StoreKey), []byte{})
	bz := sdk.Uint64ToBigEndian(c)
	store.Set(r.CountKey, bz)
}

func (r ObjectRepo[T]) Get(ctx sdk.Context, id uint64) (T, bool) {
	obj := r.Constructor()
	store := prefix.NewStore(ctx.KVStore(r.StoreKey), r.ObjKey)
	byteKey := sdk.Uint64ToBigEndian(id)
	bz := store.Get(byteKey)
	if bz == nil {
		return obj, false
	}
	r.Cdc.MustUnmarshal(bz, obj)
	return obj, true
}

func (r ObjectRepo[T]) Append(ctx sdk.Context, obj T) uint64 {
	count := r.GetCount(ctx)
	id := count + 1
	obj.SetId(id)
	r.Set(ctx, obj)
	r.SetCount(ctx, count+1)
	return id
}

func (r ObjectRepo[T]) Set(ctx sdk.Context, obj T) {
	store := prefix.NewStore(ctx.KVStore(r.StoreKey), r.ObjKey)
	newValue := r.Cdc.MustMarshal(obj)
	store.Set(uint64Bytes(obj.GetId()), newValue)
}

func uint64Bytes(id uint64) []byte {
	return sdk.Uint64ToBigEndian(id)
}
