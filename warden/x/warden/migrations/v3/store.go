package v3

import (
	"bytes"
	"sort"

	"cosmossdk.io/collections"
	"cosmossdk.io/core/store"
	"cosmossdk.io/math"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/warden/repo"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func MigrateStore(ctx sdk.Context, storeService store.KVStoreService, cdc codec.BinaryCodec) error {
	os, err := oldStore(storeService, cdc)
	if err != nil {
		return err
	}

	ns, err := newStore(storeService, cdc)
	if err != nil {
		return err
	}

	return migrate(ctx, ns, os)
}

func migrate(ctx sdk.Context, ns NewStore, os OldStore) error {
	krs, err := os.KeyRequests.Iterate(ctx, nil)
	if err != nil {
		return err
	}

	for ; krs.Valid(); krs.Next() {
		kr, err := krs.Value()
		if err != nil {
			return err
		}
		newKr := migrateKeyRequest(kr)
		if err := ns.KeyRequests.Set(ctx, newKr.Id, newKr); err != nil {
			return err
		}
	}

	kcs, err := os.Keychains.Iterate(ctx, nil)
	if err != nil {
		return err
	}
	for ; kcs.Valid(); kcs.Next() {
		kc, err := kcs.Value()
		if err != nil {
			return err
		}
		newKc := migrateKeychain(kc)
		if err := ns.Keychains.Set(ctx, newKc.Id, newKc); err != nil {
			return err
		}
	}

	spcs, err := os.Spaces.Iterate(ctx, nil)
	if err != nil {
		return err
	}
	ownersMap := make(map[string][]uint64)
	for ; spcs.Valid(); spcs.Next() {
		spc, err := spcs.Value()
		if err != nil {
			return err
		}
		newSpc := migrateSpace(spc)
		if err := ns.Spaces.Set(ctx, newSpc.Id, newSpc); err != nil {
			return err
		}

		for _, owner := range newSpc.Owners {
			ownersMap[owner] = append(ownersMap[owner], newSpc.Id)
		}
	}

	if err := migrateSpacesByOwner(ctx, ns, ownersMap); err != nil {
		return err
	}

	keys, err := os.Keys.Iterate(ctx, nil)
	if err != nil {
		return err
	}
	for ; keys.Valid(); keys.Next() {
		key, err := keys.Value()
		if err != nil {
			return err
		}
		newKey := migrateKey(key)
		if err := ns.Keys.Set(ctx, newKey.Id, newKey); err != nil {
			return err
		}
	}

	keysBySpace, err := os.KeysBySpace.Iterate(ctx, nil)
	if err != nil {
		return err
	}
	for ; keysBySpace.Valid(); keysBySpace.Next() {
		keyBySpace, err := keysBySpace.Key()
		if err != nil {
			return err
		}
		if err := ns.KeysBySpace.Set(ctx, collections.Join(keyBySpace.K1(), keyBySpace.K2())); err != nil {
			return err
		}
	}

	signRequests, err := os.SignRequests.Iterate(ctx, nil)
	if err != nil {
		return err
	}
	for ; signRequests.Valid(); signRequests.Next() {
		signRequest, err := signRequests.Value()
		if err != nil {
			return err
		}
		newSignRequest := migrateSignRequest(signRequest)
		if err := ns.SignRequests.Set(ctx, newSignRequest.Id, newSignRequest); err != nil {
			return err
		}
	}

	return nil
}

func migrateKeyRequest(kr v1beta2.KeyRequest) v1beta3.KeyRequest {
	return v1beta3.KeyRequest{
		Id:           kr.Id,
		Creator:      kr.Creator,
		SpaceId:      kr.SpaceId,
		KeychainId:   kr.KeychainId,
		KeyType:      v1beta3.KeyType(kr.KeyType),
		Status:       v1beta3.KeyRequestStatus(kr.Status),
		RejectReason: kr.RejectReason,
		RuleId:       kr.IntentId,
	}
}

func migrateKeychain(kc v1beta2.Keychain) v1beta3.Keychain {
	var fees *v1beta3.KeychainFees
	if kc.Fees != nil {
		fees = &v1beta3.KeychainFees{
			KeyReq: sdk.NewCoins(sdk.NewCoin("uward", math.NewInt(kc.Fees.KeyReq))),
			SigReq: sdk.NewCoins(sdk.NewCoin("uward", math.NewInt(kc.Fees.SigReq))),
		}
	}

	return v1beta3.Keychain{
		Id:          kc.Id,
		Creator:     kc.Creator,
		Description: kc.Description,
		Admins:      kc.Admins,
		Writers:     kc.Parties,
		Fees:        fees,
	}
}

func migrateSpace(spc v1beta2.Space) v1beta3.Space {
	return v1beta3.Space{
		Id:          spc.Id,
		Creator:     spc.Creator,
		Owners:      spc.Owners,
		AdminRuleId: spc.AdminIntentId,
		SignRuleId:  spc.SignIntentId,
	}
}

func migrateSpacesByOwner(ctx sdk.Context, ns NewStore, ownersMap map[string][]uint64) error {
	// fix spaces by owner index that contains owners that were removed from the space
	// rebuild the index from scratch
	// WARN: Clear() can use a lot of memory as it stores all delete records in memory
	if err := ns.SpacesByOwner.Clear(ctx, nil); err != nil {
		return err
	}

	spacesByOwner := make([]struct {
		Owner  sdk.AccAddress
		Spaces []uint64
	}, 0, len(ownersMap))
	for owner, spaceIds := range ownersMap {
		ownerAddr := sdk.MustAccAddressFromBech32(owner)
		spacesByOwner = append(spacesByOwner, struct {
			Owner  sdk.AccAddress
			Spaces []uint64
		}{
			Owner:  ownerAddr,
			Spaces: spaceIds,
		})
	}
	sort.Slice(spacesByOwner, func(i, j int) bool {
		return bytes.Compare(spacesByOwner[i].Owner, spacesByOwner[j].Owner) < 0
	})

	for _, os := range spacesByOwner {
		for _, spaceId := range os.Spaces {
			if err := ns.SpacesByOwner.Set(ctx, collections.Join(os.Owner, spaceId)); err != nil {
				return err
			}
		}
	}

	return nil
}

func migrateKey(key v1beta2.Key) v1beta3.Key {
	return v1beta3.Key{
		Id:         key.Id,
		SpaceId:    key.SpaceId,
		KeychainId: key.KeychainId,
		Type:       v1beta3.KeyType(key.Type),
		PublicKey:  key.PublicKey,
		RuleId:     key.IntentId,
	}
}

func migrateSignRequest(sr v1beta2.SignRequest) v1beta3.SignRequest {
	newSr := v1beta3.SignRequest{
		Id:             sr.Id,
		Creator:        sr.Creator,
		KeyId:          sr.KeyId,
		DataForSigning: sr.DataForSigning,
		Status:         v1beta3.SignRequestStatus(sr.Status),
		EncryptionKey:  nil,
	}

	switch r := sr.Result.(type) {
	case *v1beta2.SignRequest_SignedData:
		newSr.Result = &v1beta3.SignRequest_SignedData{SignedData: r.SignedData}
	case *v1beta2.SignRequest_RejectReason:
		newSr.Result = &v1beta3.SignRequest_RejectReason{RejectReason: r.RejectReason}
	}

	return newSr
}

type NewStore struct {
	KeyRequests   repo.SeqCollection[v1beta3.KeyRequest]
	Keychains     repo.SeqCollection[v1beta3.Keychain]
	Spaces        repo.SeqCollection[v1beta3.Space]
	SpacesByOwner collections.KeySet[collections.Pair[sdk.AccAddress, uint64]]
	Keys          collections.Map[uint64, v1beta3.Key]
	KeysBySpace   collections.KeySet[collections.Pair[uint64, uint64]]
	SignRequests  repo.SeqCollection[v1beta3.SignRequest]
}

func newStore(storeService store.KVStoreService, cdc codec.BinaryCodec) (NewStore, error) {
	var (
		SpaceSeqPrefix       = collections.NewPrefix(0)
		SpacesPrefix         = collections.NewPrefix(1)
		KeychainSeqPrefix    = collections.NewPrefix(2)
		KeychainsPrefix      = collections.NewPrefix(3)
		KeyPrefix            = collections.NewPrefix(5)
		KeyRequestSeqPrefix  = collections.NewPrefix(6)
		KeyRequestsPrefix    = collections.NewPrefix(7)
		SignRequestSeqPrefix = collections.NewPrefix(8)
		SignRequestsPrefix   = collections.NewPrefix(9)
		KeysSpaceIndexPrefix = collections.NewPrefix(12)
		SpacesByOwnerPrefix  = collections.NewPrefix(13)
	)

	sb := collections.NewSchemaBuilder(storeService)

	spaceSeq := collections.NewSequence(sb, SpaceSeqPrefix, "spaces_sequence")
	spacesColl := collections.NewMap(sb, SpacesPrefix, "spaces", collections.Uint64Key, codec.CollValue[v1beta3.Space](cdc))
	spaces := repo.NewSeqCollection(spaceSeq, spacesColl, func(v *v1beta3.Space, u uint64) { v.Id = u })
	spacesByOwner := collections.NewKeySet(sb, SpacesByOwnerPrefix, "spaces_by_owner", collections.PairKeyCodec(sdk.AccAddressKey, collections.Uint64Key))

	keychainSeq := collections.NewSequence(sb, KeychainSeqPrefix, "keychain_sequence")
	keychainColl := collections.NewMap(sb, KeychainsPrefix, "keychains", collections.Uint64Key, codec.CollValue[v1beta3.Keychain](cdc))
	keychains := repo.NewSeqCollection(keychainSeq, keychainColl, func(v *v1beta3.Keychain, u uint64) { v.Id = u })

	keyRequestsSeq := collections.NewSequence(sb, KeyRequestSeqPrefix, "key_requests_sequence")
	keyRequestsColl := collections.NewMap(sb, KeyRequestsPrefix, "key_requests", collections.Uint64Key, codec.CollValue[v1beta3.KeyRequest](cdc))
	keyRequests := repo.NewSeqCollection(keyRequestsSeq, keyRequestsColl, func(kr *v1beta3.KeyRequest, u uint64) { kr.Id = u })

	keys := collections.NewMap(sb, KeyPrefix, "keys", collections.Uint64Key, codec.CollValue[v1beta3.Key](cdc))
	keysBySpace := collections.NewKeySet(
		sb, KeysSpaceIndexPrefix, "keys_by_space",
		collections.PairKeyCodec(collections.Uint64Key, collections.Uint64Key),
	)

	signRequestsSeq := collections.NewSequence(sb, SignRequestSeqPrefix, "signature_requests_sequence")
	signRequestsColl := collections.NewMap(sb, SignRequestsPrefix, "signature_requests", collections.Uint64Key, codec.CollValue[v1beta3.SignRequest](cdc))
	signRequests := repo.NewSeqCollection(signRequestsSeq, signRequestsColl, func(sr *v1beta3.SignRequest, u uint64) { sr.Id = u })

	if _, err := sb.Build(); err != nil {
		return NewStore{}, err
	}

	return NewStore{
		KeyRequests:   keyRequests,
		Keychains:     keychains,
		Spaces:        spaces,
		SpacesByOwner: spacesByOwner,
		Keys:          keys,
		KeysBySpace:   keysBySpace,
		SignRequests:  signRequests,
	}, nil
}

type OldStore struct {
	KeyRequests   repo.SeqCollection[v1beta2.KeyRequest]
	Keychains     repo.SeqCollection[v1beta2.Keychain]
	Spaces        repo.SeqCollection[v1beta2.Space]
	SpacesByOwner collections.KeySet[collections.Pair[sdk.AccAddress, uint64]]
	Keys          collections.Map[uint64, v1beta2.Key]
	KeysBySpace   collections.KeySet[collections.Pair[uint64, uint64]]
	SignRequests  repo.SeqCollection[v1beta2.SignRequest]
}

func oldStore(storeService store.KVStoreService, cdc codec.BinaryCodec) (OldStore, error) {
	var (
		SpaceSeqPrefix       = collections.NewPrefix(0)
		SpacesPrefix         = collections.NewPrefix(1)
		KeychainSeqPrefix    = collections.NewPrefix(2)
		KeychainsPrefix      = collections.NewPrefix(3)
		KeyPrefix            = collections.NewPrefix(5)
		KeyRequestSeqPrefix  = collections.NewPrefix(6)
		KeyRequestsPrefix    = collections.NewPrefix(7)
		SignRequestSeqPrefix = collections.NewPrefix(8)
		SignRequestsPrefix   = collections.NewPrefix(9)
		KeysSpaceIndexPrefix = collections.NewPrefix(12)
		SpacesByOwnerPrefix  = collections.NewPrefix(13)
	)

	sb := collections.NewSchemaBuilder(storeService)

	spaceSeq := collections.NewSequence(sb, SpaceSeqPrefix, "spaces_sequence")
	spacesColl := collections.NewMap(sb, SpacesPrefix, "spaces", collections.Uint64Key, codec.CollValue[v1beta2.Space](cdc))
	spaces := repo.NewSeqCollection(spaceSeq, spacesColl, func(v *v1beta2.Space, u uint64) { v.Id = u })
	spacesByOwner := collections.NewKeySet(sb, SpacesByOwnerPrefix, "spaces_by_owner", collections.PairKeyCodec(sdk.AccAddressKey, collections.Uint64Key))

	keychainSeq := collections.NewSequence(sb, KeychainSeqPrefix, "keychain sequence")
	keychainColl := collections.NewMap(sb, KeychainsPrefix, "keychains", collections.Uint64Key, codec.CollValue[v1beta2.Keychain](cdc))
	keychains := repo.NewSeqCollection(keychainSeq, keychainColl, func(v *v1beta2.Keychain, u uint64) { v.Id = u })

	keys := collections.NewMap(sb, KeyPrefix, "keys", collections.Uint64Key, codec.CollValue[v1beta2.Key](cdc))
	keysBySpace := collections.NewKeySet(
		sb, KeysSpaceIndexPrefix, "keys_by_space",
		collections.PairKeyCodec(collections.Uint64Key, collections.Uint64Key),
	)

	keyRequestsSeq := collections.NewSequence(sb, KeyRequestSeqPrefix, "key requests sequence")
	keyRequestsColl := collections.NewMap(sb, KeyRequestsPrefix, "key requests", collections.Uint64Key, codec.CollValue[v1beta2.KeyRequest](cdc))
	keyRequests := repo.NewSeqCollection(keyRequestsSeq, keyRequestsColl, func(kr *v1beta2.KeyRequest, u uint64) { kr.Id = u })

	signatureRequestsSeq := collections.NewSequence(sb, SignRequestSeqPrefix, "signature requests sequence")
	signatureRequestsColl := collections.NewMap(sb, SignRequestsPrefix, "signature requests", collections.Uint64Key, codec.CollValue[v1beta2.SignRequest](cdc))
	signatureRequests := repo.NewSeqCollection(signatureRequestsSeq, signatureRequestsColl, func(sr *v1beta2.SignRequest, u uint64) { sr.Id = u })

	return OldStore{
		KeyRequests:   keyRequests,
		Keychains:     keychains,
		Spaces:        spaces,
		SpacesByOwner: spacesByOwner,
		Keys:          keys,
		KeysBySpace:   keysBySpace,
		SignRequests:  signatureRequests,
	}, nil
}
