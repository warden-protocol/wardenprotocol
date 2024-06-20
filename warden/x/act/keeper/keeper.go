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
	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

type (
	Keeper struct {
		cdc          codec.Codec
		storeService store.KVStoreService
		logger       log.Logger
		router       baseapp.MessageRouter

		// shieldExpanderFunc returns an injected AST expander
		shieldExpanderFunc func() ast.Expander
		rulesRegistry      *types.RulesRegistry

		ActionKeeper ActionKeeper
		rules        repo.SeqCollection[types.Rule]

		// the address capable of executing a MsgUpdateParams message. Typically, this
		// should be the x/gov module account.
		authority        string
		actModuleAddress string
	}
)

var (
	ActionPrefix          = collections.NewPrefix(0)
	RulePrefix            = collections.NewPrefix(1)
	ActionByAddressPrefix = collections.NewPrefix(2)
)

func NewKeeper(
	cdc codec.Codec,
	storeService store.KVStoreService,
	logger log.Logger,
	router baseapp.MessageRouter,
	authority string,
	actModuleAddress string,
	shieldExpanderFunc func() ast.Expander,
	rulesRegistry *types.RulesRegistry,
) Keeper {
	if _, err := sdk.AccAddressFromBech32(authority); err != nil {
		panic(fmt.Sprintf("invalid authority address: %s", authority))
	}

	if _, err := sdk.AccAddressFromBech32(actModuleAddress); err != nil {
		panic(fmt.Sprintf("invalid x/act module address: %s", actModuleAddress))
	}

	sb := collections.NewSchemaBuilder(storeService)

	rulesStore := collections.NewMap(sb, RulePrefix, "rule", collections.Uint64Key, codec.CollValue[types.Rule](cdc))
	rulesCount := collections.NewSequence(sb, types.KeyPrefix(types.RuleCountKey), "rules_count")
	rules := repo.NewSeqCollection(rulesCount, rulesStore, func(i *types.Rule, u uint64) { i.Id = u })

	_, err := sb.Build()
	if err != nil {
		panic(fmt.Sprintf("failed to build schema: %s", err))
	}

	return Keeper{
		cdc:              cdc,
		storeService:     storeService,
		authority:        authority,
		actModuleAddress: actModuleAddress,
		logger:           logger,
		router:           router,

		shieldExpanderFunc: shieldExpanderFunc,
		rulesRegistry:      rulesRegistry,

		ActionKeeper: newActionKeeper(storeService, cdc),
		rules:        rules,
	}
}

// GetAuthority returns the module's authority.
func (k Keeper) GetAuthority() string {
	return k.authority
}

func (k Keeper) GetModuleAddress() string {
	return k.actModuleAddress
}

// Logger returns a module-specific logger.
func (k Keeper) Logger() log.Logger {
	return k.logger.With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) getBlockTime(ctx context.Context) time.Time {
	return sdk.UnwrapSDKContext(ctx).HeaderInfo().Time
}

func (k Keeper) RulesRegistry() *types.RulesRegistry {
	return k.rulesRegistry
}
