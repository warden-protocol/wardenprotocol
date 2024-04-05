package keeper

import (
	"fmt"
	"time"

	"cosmossdk.io/collections"
	"cosmossdk.io/core/store"
	"cosmossdk.io/log"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/wardenprotocol/shield/ast"
	"github.com/warden-protocol/wardenprotocol/warden/repo"
	"github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
)

type (
	Keeper struct {
		cdc          codec.BinaryCodec
		storeService store.KVStoreService
		logger       log.Logger

		shieldExpanderFunc func() ast.Expander

		ActionKeeper ActionKeeper
		intents      repo.SeqCollection[types.Intent]

		// the address capable of executing a MsgUpdateParams message. Typically, this
		// should be the x/gov module account.
		authority      string
		actionHandlers map[string]types.ActionHandler
	}
)

var (
	ActionPrefix          = collections.NewPrefix(0)
	IntentPrefix          = collections.NewPrefix(1)
	ActionByAddressPrefix = collections.NewPrefix(2)
)

func NewKeeper(
	cdc codec.BinaryCodec,
	storeService store.KVStoreService,
	logger log.Logger,
	authority string,
	shieldExpanderFunc func() ast.Expander,
) Keeper {
	if _, err := sdk.AccAddressFromBech32(authority); err != nil {
		panic(fmt.Sprintf("invalid authority address: %s", authority))
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
		cdc:          cdc,
		storeService: storeService,
		authority:    authority,
		logger:       logger,

		shieldExpanderFunc: shieldExpanderFunc,

		ActionKeeper: newActionKeeper(storeService, cdc),
		intents:      intents,

		actionHandlers: make(map[string]types.ActionHandler),
	}
}

// GetAuthority returns the module's authority.
func (k Keeper) GetAuthority() string {
	return k.authority
}

// Logger returns a module-specific logger.
func (k Keeper) Logger() log.Logger {
	return k.logger.With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) getBlockTime(ctx sdk.Context) time.Time {
	return ctx.HeaderInfo().Time
}
