package keeper

import (
	"context"
	"fmt"
	"time"

	"cosmossdk.io/collections"
	"cosmossdk.io/core/store"
	"cosmossdk.io/log"
	"github.com/cosmos/cosmos-sdk/baseapp"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/wardenprotocol/shield/ast"
	"github.com/warden-protocol/wardenprotocol/warden/repo"
	"github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
)

type (
	Keeper struct {
		cdc          codec.Codec
		storeService store.KVStoreService
		logger       log.Logger
		router       baseapp.MessageRouter

		shieldExpanderFunc func() ast.Expander
		intentsRegistry    *types.IntentsRegistry

		ActionKeeper ActionKeeper
		intents      repo.SeqCollection[types.Intent]

		// the address capable of executing a MsgUpdateParams message. Typically, this
		// should be the x/gov module account.
		authority           string
		intentModuleAddress string
		actionHandlers      map[string]types.ActionHandler
	}
)

var (
	ActionPrefix          = collections.NewPrefix(0)
	IntentPrefix          = collections.NewPrefix(1)
	ActionByAddressPrefix = collections.NewPrefix(2)
)

func NewKeeper(
	cdc codec.Codec,
	storeService store.KVStoreService,
	logger log.Logger,
	router baseapp.MessageRouter,
	authority string,
	intentModuleAddress string,
	shieldExpanderFunc func() ast.Expander,
	intentsRegistry *types.IntentsRegistry,
) Keeper {
	if _, err := sdk.AccAddressFromBech32(authority); err != nil {
		panic(fmt.Sprintf("invalid authority address: %s", authority))
	}

	if _, err := sdk.AccAddressFromBech32(intentModuleAddress); err != nil {
		panic(fmt.Sprintf("invalid intent module address: %s", intentModuleAddress))
	}

	sb := collections.NewSchemaBuilder(storeService)

	intentsStore := collections.NewMap(sb, IntentPrefix, "intent", collections.Uint64Key, codec.CollValue[types.Intent](cdc))
	intentsCount := collections.NewSequence(sb, types.KeyPrefix(types.IntentCountKey), "intents_count")
	intents := repo.NewSeqCollection(intentsCount, intentsStore, func(i *types.Intent, u uint64) { i.Id = u })

	_, err := sb.Build()
	if err != nil {
		panic(fmt.Sprintf("failed to build schema: %s", err))
	}

	return Keeper{
		cdc:                 cdc,
		storeService:        storeService,
		authority:           authority,
		intentModuleAddress: intentModuleAddress,
		logger:              logger,
		router:              router,

		shieldExpanderFunc: shieldExpanderFunc,
		intentsRegistry:    intentsRegistry,

		ActionKeeper: newActionKeeper(storeService, cdc),
		intents:      intents,

		actionHandlers: make(map[string]types.ActionHandler),
	}
}

// GetAuthority returns the module's authority.
func (k Keeper) GetAuthority() string {
	return k.authority
}

func (k Keeper) GetModuleAddress() string {
	return k.intentModuleAddress
}

// Logger returns a module-specific logger.
func (k Keeper) Logger() log.Logger {
	return k.logger.With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) getBlockTime(ctx context.Context) time.Time {
	return sdk.UnwrapSDKContext(ctx).HeaderInfo().Time
}

func (k Keeper) IntentRegistry() *types.IntentsRegistry {
	return k.intentsRegistry
}
