package keeper

import (
	"fmt"

	"cosmossdk.io/collections"
	"cosmossdk.io/core/store"
	"cosmossdk.io/log"
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/wardenprotocol/warden/intent"
	"github.com/warden-protocol/wardenprotocol/warden/repo"
	"github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
)

type (
	Keeper struct {
		cdc          codec.BinaryCodec
		storeService store.KVStoreService
		logger       log.Logger

		actions      collections.Map[uint64, types.Action]
		actionsCount collections.Sequence
		intents      repo.SeqCollection[types.Intent]

		// the address capable of executing a MsgUpdateParams message. Typically, this
		// should be the x/gov module account.
		authority               string
		actionHandlers          map[string]func(sdk.Context, types.Action, *cdctypes.Any) (any, error)
		intentGeneratorHandlers map[string]func(sdk.Context, *cdctypes.Any) (intent.Intent, error)
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
	actions := collections.NewMap(sb, ActionPrefix, "action", collections.Uint64Key, codec.CollValue[types.Action](cdc))
	actionsCount := collections.NewSequence(sb, types.KeyPrefix(types.ActionCountKey), "actions count")

	intentsStore := collections.NewMap(sb, IntentPrefix, "intent", collections.Uint64Key, codec.CollValue[types.Intent](cdc))
	intentsCount := collections.NewSequence(sb, types.KeyPrefix(types.IntentCountKey), "intents count")
	intents := repo.NewSeqCollection(intentsCount, intentsStore, func(i *types.Intent, u uint64) { i.Id = u })

	return Keeper{
		cdc:          cdc,
		storeService: storeService,
		authority:    authority,
		logger:       logger,

		actions:      actions,
		actionsCount: actionsCount,
		intents:      intents,

		actionHandlers:          make(map[string]func(sdk.Context, types.Action, *cdctypes.Any) (any, error)),
		intentGeneratorHandlers: make(map[string]func(sdk.Context, *cdctypes.Any) (intent.Intent, error)),
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
