package keeper

import (
	"fmt"

	"cosmossdk.io/collections"
	"cosmossdk.io/core/store"
	errorsmod "cosmossdk.io/errors"
	"cosmossdk.io/log"
	wasmkeeper "github.com/CosmWasm/wasmd/x/wasm/keeper"
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

		// the address capable of executing many messages for this module. It
		// should be the x/act module account.
		actAuthority string

		keychains repo.SeqCollection[v1beta2.Keychain]

		keyRequests       repo.SeqCollection[v1beta2.KeyRequest]
		signatureRequests repo.SeqCollection[v1beta2.SignRequest]

		SpacesKeeper SpacesKeeper
		KeysKeeper   KeysKeeper

		bankKeeper    types.BankKeeper
		actKeeper     types.ActKeeper
		getWasmKeeper func() wasmkeeper.Keeper
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
	KeysSpaceIndexPrefix            = collections.NewPrefix(12)
	SpacesByOwnerPrefix             = collections.NewPrefix(13)
)

func NewKeeper(
	cdc codec.BinaryCodec,
	storeService store.KVStoreService,
	logger log.Logger,
	authority string,
	actAuthority string,

	bankKeeper types.BankKeeper,
	actKeeper types.ActKeeper,
	getWasmKeeper func() wasmkeeper.Keeper,
) Keeper {
	if _, err := sdk.AccAddressFromBech32(authority); err != nil {
		panic(fmt.Sprintf("invalid authority address: %s", authority))
	}

	sb := collections.NewSchemaBuilder(storeService)

	spacesKeeper := NewSpacesKeeper(sb, cdc)

	keychainSeq := collections.NewSequence(sb, KeychainSeqPrefix, "keychain sequence")
	keychainColl := collections.NewMap(sb, KeychainsPrefix, "keychains", collections.Uint64Key, codec.CollValue[v1beta2.Keychain](cdc))
	keychains := repo.NewSeqCollection(keychainSeq, keychainColl, func(v *v1beta2.Keychain, u uint64) { v.Id = u })

	keysKeeper := NewKeysKeeper(sb, cdc)

	keyRequestsSeq := collections.NewSequence(sb, KeyRequestSeqPrefix, "key requests sequence")
	keyRequestsColl := collections.NewMap(sb, KeyRequestsPrefix, "key requests", collections.Uint64Key, codec.CollValue[v1beta2.KeyRequest](cdc))
	keyRequests := repo.NewSeqCollection(keyRequestsSeq, keyRequestsColl, func(kr *v1beta2.KeyRequest, u uint64) { kr.Id = u })

	signatureRequestsSeq := collections.NewSequence(sb, SignRequestSeqPrefix, "signature requests sequence")
	signatureRequestsColl := collections.NewMap(sb, SignRequestsPrefix, "signature requests", collections.Uint64Key, codec.CollValue[v1beta2.SignRequest](cdc))
	signatureRequests := repo.NewSeqCollection(signatureRequestsSeq, signatureRequestsColl, func(sr *v1beta2.SignRequest, u uint64) { sr.Id = u })

	k := Keeper{
		cdc:          cdc,
		storeService: storeService,
		authority:    authority,
		actAuthority: actAuthority,
		logger:       logger,

		keychains: keychains,

		keyRequests:       keyRequests,
		signatureRequests: signatureRequests,

		SpacesKeeper: spacesKeeper,
		KeysKeeper:   keysKeeper,

		bankKeeper:    bankKeeper,
		actKeeper:     actKeeper,
		getWasmKeeper: getWasmKeeper,
	}
	k.RegisterRules(actKeeper.RulesRegistry())

	return k
}

// GetAuthority returns the module's authority.
func (k Keeper) GetAuthority() string {
	return k.authority
}

// GetActAuthority returns the act module's authority.
func (k Keeper) GetActAuthority() string {
	return k.actAuthority
}

func (k Keeper) assertActAuthority(addr string) error {
	if k.GetActAuthority() != addr {
		return errorsmod.Wrapf(v1beta2.ErrInvalidActionSigner, "invalid authority; expected %s, got %s", k.GetAuthority(), addr)
	}
	return nil
}

// Logger returns a module-specific logger.
func (k Keeper) Logger() log.Logger {
	return k.logger.With("module", fmt.Sprintf("x/%s", v1beta2.ModuleName))
}
