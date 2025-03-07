package keeper

import (
	"context"
	"errors"

	"cosmossdk.io/collections"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/wardenprotocol/warden/repo"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

type SpacesKeeper struct {
	spaces        repo.SeqCollection[types.Space]
	spacesByOwner collections.KeySet[collections.Pair[sdk.AccAddress, uint64]]
}

func NewSpacesKeeper(sb *collections.SchemaBuilder, cdc codec.BinaryCodec) SpacesKeeper {
	spaceSeq := collections.NewSequence(sb, SpaceSeqPrefix, "spaces_sequence")
	spacesColl := collections.NewMap(sb, SpacesPrefix, "spaces", collections.Uint64Key, codec.CollValue[types.Space](cdc))
	spaces := repo.NewSeqCollection(spaceSeq, spacesColl, func(v *types.Space, u uint64) { v.Id = u })
	spacesByOwner := collections.NewKeySet(sb, SpacesByOwnerPrefix, "spaces_by_owner", collections.PairKeyCodec(sdk.AccAddressKey, collections.Uint64Key))

	return SpacesKeeper{
		spaces:        spaces,
		spacesByOwner: spacesByOwner,
	}
}

func (k SpacesKeeper) Get(ctx context.Context, id uint64) (types.Space, error) {
	return k.spaces.Get(ctx, id)
}

func (k SpacesKeeper) New(ctx context.Context, space *types.Space) (uint64, error) {
	id, err := k.spaces.Append(ctx, space)
	if err != nil {
		return 0, err
	}

	if err := k.updateSpaceOwners(ctx, *space, nil); err != nil {
		return 0, err
	}

	return id, nil
}

func (k SpacesKeeper) Set(ctx context.Context, space types.Space) error {
	oldSpace, _ := k.spaces.Get(ctx, space.Id)
	oldOwners := oldSpace.Owners

	if err := k.updateSpaceOwners(ctx, space, oldOwners); err != nil {
		return err
	}

	return k.spaces.Set(ctx, space.Id, space)
}

func (k SpacesKeeper) updateSpaceOwners(ctx context.Context, space types.Space, oldOwners []string) error {
	id := space.Id
	if id == 0 {
		return errors.New("space id is not set")
	}

	removedOwners := subtract(oldOwners, space.Owners)

	for _, owner := range removedOwners {
		ownerAddr, err := sdk.AccAddressFromBech32(owner)
		if err != nil {
			return err
		}

		if err := k.spacesByOwner.Remove(ctx, collections.Join(ownerAddr, id)); err != nil {
			return err
		}
	}

	for _, owner := range space.Owners {
		ownerAddr, err := sdk.AccAddressFromBech32(owner)
		if err != nil {
			return err
		}

		if err := k.spacesByOwner.Set(ctx, collections.Join(ownerAddr, space.Id)); err != nil {
			return err
		}
	}

	return nil
}

func (k SpacesKeeper) Coll() repo.SeqCollection[types.Space] {
	return k.spaces
}

func (k SpacesKeeper) ByOwner() collections.KeySet[collections.Pair[sdk.AccAddress, uint64]] {
	return k.spacesByOwner
}

func (k SpacesKeeper) Import(ctx context.Context, spaces []types.Space) error {
	err := k.spaces.Import(ctx, spaces, func(k types.Space) uint64 {
		return k.Id
	})
	if err != nil {
		return err
	}

	for _, key := range spaces {
		err := k.updateSpaceOwners(ctx, key, nil)
		if err != nil {
			return err
		}
	}

	return nil
}

// a - b.
func subtract(a, b []string) []string {
	m := make(map[string]struct{}, len(b))
	for _, x := range b {
		m[x] = struct{}{}
	}

	var diff []string

	for _, y := range a {
		if _, ok := m[y]; !ok {
			diff = append(diff, y)
		}
	}

	return diff
}
