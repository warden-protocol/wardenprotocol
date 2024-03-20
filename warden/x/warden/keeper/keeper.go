package keeper

import (
	"fmt"

	"cosmossdk.io/collections"
	"cosmossdk.io/core/store"
	"cosmossdk.io/log"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/wardenprotocol/warden/repo"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types"
	v1beta2 "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

type (
	Keeper struct {
		cdc          codec.BinaryCodec
		storeService store.KVStoreService
		logger       log.Logger

		// the address capable of executing a MsgUpdateParams message. Typically, this
		// should be the x/gov module account.
		authority string

		spaces    repo.SeqCollection[v1beta2.Space]
		keychains repo.SeqCollection[v1beta2.Keychain]

		keys                    collections.Map[uint64, v1beta2.Key]
		keyRequests             repo.SeqCollection[v1beta2.KeyRequest]
		signatureRequests       repo.SeqCollection[v1beta2.SignRequest]
		signTransactionRequests repo.SeqCollection[v1beta2.SignTransactionRequest]

		bankKeeper   types.BankKeeper
		intentKeeper types.IntentKeeper
	}
)

var (
	SpaceSeqPrefix                  = collections.NewPrefix(0)
	SpacesPrefix                    = collections.NewPrefix(1)
	KeychainSeqPrefix               = collections.NewPrefix(2)
	KeychainsPrefix                 = collections.NewPrefix(3)
	KeySeqPrefix                    = collections.NewPrefix(4)
	KeyPrefix                       = collections.NewPrefix(5)
	KeyRequestSeqPrefix             = collections.NewPrefix(6)
	KeyRequestsPrefix               = collections.NewPrefix(7)
	SignRequestSeqPrefix            = collections.NewPrefix(8)
	SignRequestsPrefix              = collections.NewPrefix(9)
	SignTransactionRequestSeqPrefix = collections.NewPrefix(10)
	SignTransactionRequestsPrefix   = collections.NewPrefix(11)
)

func NewKeeper(
	cdc codec.BinaryCodec,
	storeService store.KVStoreService,
	logger log.Logger,
	authority string,

	bankKeeper types.BankKeeper,
	intentKeeper types.IntentKeeper,
) Keeper {
	if _, err := sdk.AccAddressFromBech32(authority); err != nil {
		panic(fmt.Sprintf("invalid authority address: %s", authority))
	}

	sb := collections.NewSchemaBuilder(storeService)
	spaceSeq := collections.NewSequence(sb, SpaceSeqPrefix, "spaces sequence")
	spacesColl := collections.NewMap(sb, SpacesPrefix, "spaces", collections.Uint64Key, codec.CollValue[v1beta2.Space](cdc))
	spaces := repo.NewSeqCollection(spaceSeq, spacesColl, func(v *v1beta2.Space, u uint64) { v.Id = u })

	keychainSeq := collections.NewSequence(sb, KeychainSeqPrefix, "keychain sequence")
	keychainColl := collections.NewMap(sb, KeychainsPrefix, "keychains", collections.Uint64Key, codec.CollValue[v1beta2.Keychain](cdc))
	keychains := repo.NewSeqCollection(keychainSeq, keychainColl, func(v *v1beta2.Keychain, u uint64) { v.Id = u })

	keys := collections.NewMap(sb, KeyPrefix, "keys", collections.Uint64Key, codec.CollValue[v1beta2.Key](cdc))

	keyRequestsSeq := collections.NewSequence(sb, KeyRequestSeqPrefix, "key requests sequence")
	keyRequestsColl := collections.NewMap(sb, KeyRequestsPrefix, "key requests", collections.Uint64Key, codec.CollValue[v1beta2.KeyRequest](cdc))
	keyRequests := repo.NewSeqCollection(keyRequestsSeq, keyRequestsColl, func(kr *v1beta2.KeyRequest, u uint64) { kr.Id = u })

	signatureRequestsSeq := collections.NewSequence(sb, SignRequestSeqPrefix, "signature requests sequence")
	signatureRequestsColl := collections.NewMap(sb, SignRequestsPrefix, "signature requests", collections.Uint64Key, codec.CollValue[v1beta2.SignRequest](cdc))
	signatureRequests := repo.NewSeqCollection(signatureRequestsSeq, signatureRequestsColl, func(sr *v1beta2.SignRequest, u uint64) { sr.Id = u })

	signTransactionRequestsSeq := collections.NewSequence(sb, SignTransactionRequestSeqPrefix, "sign transaction requests sequence")
	signTransactionRequestsColl := collections.NewMap(sb, SignTransactionRequestsPrefix, "sign transaction requests", collections.Uint64Key, codec.CollValue[v1beta2.SignTransactionRequest](cdc))
	signTransactionRequests := repo.NewSeqCollection(signTransactionRequestsSeq, signTransactionRequestsColl, func(str *v1beta2.SignTransactionRequest, u uint64) { str.Id = u })

	return Keeper{
		cdc:          cdc,
		storeService: storeService,
		authority:    authority,
		logger:       logger,

		spaces:    spaces,
		keychains: keychains,

		keys:                    keys,
		keyRequests:             keyRequests,
		signatureRequests:       signatureRequests,
		signTransactionRequests: signTransactionRequests,

		bankKeeper:   bankKeeper,
		intentKeeper: intentKeeper,
	}
}

// GetAuthority returns the module's authority.
func (k Keeper) GetAuthority() string {
	return k.authority
}

// Logger returns a module-specific logger.
func (k Keeper) Logger() log.Logger {
	return k.logger.With("module", fmt.Sprintf("x/%s", v1beta2.ModuleName))
}
