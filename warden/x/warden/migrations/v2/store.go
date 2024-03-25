package v2

import (
	"crypto/sha256"
	"encoding/binary"
	"fmt"

	"cosmossdk.io/collections"
	"cosmossdk.io/core/store"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta1"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

var (
	SpaceSeqPrefix       = collections.NewPrefix(0)
	SpacesPrefix         = collections.NewPrefix(1)
	KeychainSeqPrefix    = collections.NewPrefix(2)
	KeychainsPrefix      = collections.NewPrefix(3)
	KeySeqPrefix         = collections.NewPrefix(4)
	KeyPrefix            = collections.NewPrefix(5)
	KeyRequestSeqPrefix  = collections.NewPrefix(6)
	KeyRequestsPrefix    = collections.NewPrefix(7)
	KeysSpaceIndexPrefix = collections.NewPrefix(12)
)

func MigrateStore(ctx sdk.Context, storeService store.KVStoreService, cdc codec.BinaryCodec) error {
	sb := collections.NewSchemaBuilder(storeService)

	spaceSeq := collections.NewSequence(sb, SpaceSeqPrefix, "spaces sequence")
	oldSpacesColl := collections.NewMap(sb, SpacesPrefix, "spaces", collections.BytesKey, codec.CollValue[v1beta1.Space](cdc))
	newSpacesColl := collections.NewMap(sb, SpacesPrefix, "spaces", collections.Uint64Key, codec.CollValue[v1beta2.Space](cdc))

	keychainSeq := collections.NewSequence(sb, KeychainSeqPrefix, "keychain sequence")
	oldKeychainColl := collections.NewMap(sb, KeychainsPrefix, "keychains", collections.BytesKey, codec.CollValue[v1beta1.Keychain](cdc))
	newKeychainColl := collections.NewMap(sb, KeychainsPrefix, "keychains", collections.Uint64Key, codec.CollValue[v1beta2.Keychain](cdc))

	oldKeyRequestsColl := collections.NewMap(sb, KeyRequestsPrefix, "key requests", collections.Uint64Key, codec.CollValue[v1beta1.KeyRequest](cdc))
	newKeyRequestsColl := collections.NewMap(sb, KeyRequestsPrefix, "key requests", collections.Uint64Key, codec.CollValue[v1beta2.KeyRequest](cdc))

	oldKeysColl := collections.NewMap(sb, KeyPrefix, "keys", collections.Uint64Key, codec.CollValue[v1beta1.Key](cdc))
	newKeysColl := collections.NewMap(sb, KeyPrefix, "keys", collections.Uint64Key, codec.CollValue[v1beta2.Key](cdc))
	keysBySpace := collections.NewKeySet(
		sb, KeysSpaceIndexPrefix, "keys_by_space",
		collections.PairKeyCodec(collections.Uint64Key, collections.Uint64Key),
	)

	// upgrade spaces
	spacesCount, err := spaceSeq.Peek(ctx)
	if err != nil {
		return err
	}

	spaceIdMap := make(map[string]uint64)

	for i := uint64(0); i < spacesCount; i++ {
		addr := address(i)
		s, err := oldSpacesColl.Get(ctx, addr)
		if err != nil {
			return fmt.Errorf("failed to get space %d: %w", i, err)
		}

		newId := i + 1
		newSpace := v1beta2.Space{
			Id:            newId,
			Creator:       s.Creator,
			Owners:        s.Owners,
			AdminIntentId: s.AdminIntentId,
			SignIntentId:  s.SignIntentId,
		}

		spaceAddr := sdk.MustBech32ifyAddressBytes("wardenspace", addr)
		spaceIdMap[spaceAddr] = newId

		if err := oldSpacesColl.Remove(ctx, addr); err != nil {
			return fmt.Errorf("failed to remove old space %d: %w", i, err)
		}

		if err := newSpacesColl.Set(ctx, newId, newSpace); err != nil {
			return fmt.Errorf("failed to set space %d: %w", i, err)
		}
	}

	if err := spaceSeq.Set(ctx, spacesCount+1); err != nil {
		return fmt.Errorf("failed to set space sequence: %w", err)
	}

	// upgrade keychains
	keychainsCount, err := keychainSeq.Peek(ctx)
	if err != nil {
		return err
	}

	keychainIdMap := make(map[string]uint64)

	for i := uint64(0); i < keychainsCount; i++ {
		addr := address(i)
		s, err := oldKeychainColl.Get(ctx, addr)
		if err != nil {
			return fmt.Errorf("failed to get keychain %d: %w", i, err)
		}

		newId := i + 1
		var newFees *v1beta2.KeychainFees
		if s.Fees != nil {
			newFees = &v1beta2.KeychainFees{
				KeyReq: s.Fees.KeyReq,
				SigReq: s.Fees.SigReq,
			}
		}

		newKeychain := v1beta2.Keychain{
			Id:            newId,
			Creator:       s.Creator,
			Description:   s.Description,
			Admins:        s.Admins,
			Parties:       s.Parties,
			AdminIntentId: s.AdminIntentId,
			Fees:          newFees,
			IsActive:      s.IsActive,
		}

		keychainAddr := sdk.MustBech32ifyAddressBytes("wardenkeychain", addr)
		keychainIdMap[keychainAddr] = newId

		if err := oldKeychainColl.Remove(ctx, addr); err != nil {
			return fmt.Errorf("failed to remove old keychain %d: %w", i, err)
		}

		if err := newKeychainColl.Set(ctx, newId, newKeychain); err != nil {
			return fmt.Errorf("failed to set keychain %d: %w", i, err)
		}
	}

	if err := keychainSeq.Set(ctx, keychainsCount+1); err != nil {
		return fmt.Errorf("failed to set keychain sequence: %w", err)
	}

	// upgrade key requests
	iter, err := oldKeyRequestsColl.Iterate(ctx, nil)
	if err != nil {
		return err
	}
	defer iter.Close()

	for ; iter.Valid(); iter.Next() {
		req, err := iter.Value()
		if err != nil {
			return err
		}

		newKeychainId, found := keychainIdMap[req.KeychainAddr]
		if !found {
			return fmt.Errorf("keychain not found: %s", req.KeychainAddr)
		}

		newSpaceId, found := spaceIdMap[req.SpaceAddr]
		if !found {
			return fmt.Errorf("space not found: %s", req.SpaceAddr)
		}

		newReq := v1beta2.KeyRequest{
			Id:           req.Id,
			Creator:      req.Creator,
			SpaceId:      newSpaceId,
			KeychainId:   newKeychainId,
			KeyType:      v1beta2.KeyType(req.KeyType),
			Status:       v1beta2.KeyRequestStatus(req.Status),
			RejectReason: req.RejectReason,
		}

		if err := oldKeyRequestsColl.Remove(ctx, req.Id); err != nil {
			return fmt.Errorf("failed to remove old key request %d: %w", req.Id, err)
		}

		if err := newKeyRequestsColl.Set(ctx, newReq.Id, newReq); err != nil {
			return fmt.Errorf("failed to set key request %d: %w", req.Id, err)
		}
	}

	// upgrade keys
	if err := migrateKeys(ctx, oldKeysColl, newKeysColl, keysBySpace, keychainIdMap, spaceIdMap); err != nil {
		return err
	}

	return nil
}

func address(num uint64) []byte {
	buf := make([]byte, 8)
	binary.LittleEndian.PutUint64(buf, num)
	addrHash := sha256.Sum256(buf)
	return addrHash[:8]
}

func migrateKeys(
	ctx sdk.Context,
	oldKeysColl collections.Map[uint64, v1beta1.Key],
	newKeysColl collections.Map[uint64, v1beta2.Key],
	keysBySpace collections.KeySet[collections.Pair[uint64, uint64]],
	keychainIdMap map[string]uint64,
	spaceIdMap map[string]uint64,
) error {
	keysIter, err := oldKeysColl.Iterate(ctx, nil)
	if err != nil {
		return err
	}
	defer keysIter.Close()

	for ; keysIter.Valid(); keysIter.Next() {
		key, err := keysIter.Value()
		if err != nil {
			return err
		}

		newKeychainId, found := keychainIdMap[key.KeychainAddr]
		if !found {
			return fmt.Errorf("keychain not found: %s", key.KeychainAddr)
		}

		newSpaceId, found := spaceIdMap[key.SpaceAddr]
		if !found {
			return fmt.Errorf("space not found: %s", key.SpaceAddr)
		}

		newKey := v1beta2.Key{
			Id:         key.Id,
			SpaceId:    newSpaceId,
			KeychainId: newKeychainId,
			Type:       v1beta2.KeyType(key.Type),
			PublicKey:  key.PublicKey,
		}

		if err := oldKeysColl.Remove(ctx, key.Id); err != nil {
			return fmt.Errorf("failed to remove old key request %d: %w", key.Id, err)
		}

		if err := keysBySpace.Set(ctx, collections.Join(newKey.SpaceId, newKey.Id)); err != nil {
			return err
		}
		if err := newKeysColl.Set(ctx, newKey.Id, newKey); err != nil {
			return fmt.Errorf("failed to set key request %d: %w", newKey.Id, err)
		}
	}

	return nil
}
