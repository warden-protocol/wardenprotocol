package keeper

import (
	"fmt"
	"time"

	"cosmossdk.io/collections"
	"cosmossdk.io/core/store"
	"cosmossdk.io/log"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/wardenprotocol/warden/repo"
	"github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
)

type (
	Keeper struct {
		cdc          codec.BinaryCodec
		storeService store.KVStoreService
		logger       log.Logger

		actions repo.SeqCollection[types.Action]
		intents repo.SeqCollection[types.Intent]

		// the address capable of executing a MsgUpdateParams message. Typically, this
		// should be the x/gov module account.
		authority               string
		actionHandlers          map[string]types.ActionHandler
		intentGeneratorHandlers map[string]types.IntentGenerator
	}
)

var (
	ActionPrefix = collections.NewPrefix(0)
	IntentPrefix = collections.NewPrefix(1)
)

func NewKeeper(
	cdc codec.BinaryCodec,
	storeService store.KVStoreService,
	logger log.Logger,
	authority string,

) Keeper {
	if _, err := sdk.AccAddressFromBech32(authority); err != nil {
		panic(fmt.Sprintf("invalid authority address: %s", authority))
	}

	sb := collections.NewSchemaBuilder(storeService)
	actionsStore := collections.NewMap(sb, ActionPrefix, "action", collections.Uint64Key, codec.CollValue[types.Action](cdc))
	actionsCount := collections.NewSequence(sb, types.KeyPrefix(types.ActionCountKey), "actions count")
	actions := repo.NewSeqCollection(actionsCount, actionsStore, func(a *types.Action, u uint64) { a.Id = u })

	intentsStore := collections.NewMap(sb, IntentPrefix, "intent", collections.Uint64Key, codec.CollValue[types.Intent](cdc))
	intentsCount := collections.NewSequence(sb, types.KeyPrefix(types.IntentCountKey), "intents count")
	intents := repo.NewSeqCollection(intentsCount, intentsStore, func(i *types.Intent, u uint64) { i.Id = u })

	return Keeper{
		cdc:          cdc,
		storeService: storeService,
		authority:    authority,
		logger:       logger,

		actions: actions,
		intents: intents,

		actionHandlers:          make(map[string]types.ActionHandler),
		intentGeneratorHandlers: make(map[string]types.IntentGenerator),
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
