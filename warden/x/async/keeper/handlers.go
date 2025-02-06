package keeper

import (
	"context"

	"cosmossdk.io/collections"
	errorsmod "cosmossdk.io/errors"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"

	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

// HandlersKeeper manages handlers and their mappings to validators.
type HandlersKeeper struct {
	handlers collections.Map[string, types.Handler]
	// ValAddressKey?
	validatorsByHandler collections.KeySet[collections.Pair[string, sdk.AccAddress]]
	handlersByValidator collections.KeySet[collections.Pair[sdk.AccAddress, string]]
}

// NewHandlersKeeper initializes a new HandlersKeeper.
func NewHandlersKeeper(sb *collections.SchemaBuilder, cdc codec.Codec) *HandlersKeeper {
	handlers := collections.NewMap(sb, HandlersPrefix, "handlers", collections.StringKey, codec.CollValue[types.Handler](cdc))
	validatorsByHandler := collections.NewKeySet(sb, ValidatorsByHandler, "validators_by_handler", collections.PairKeyCodec(collections.StringKey, sdk.AccAddressKey))
	handlersByValidator := collections.NewKeySet(sb, HandlersByValidator, "handlers_by_validator", collections.PairKeyCodec(sdk.AccAddressKey, collections.StringKey))

	return &HandlersKeeper{
		handlers:            handlers,
		validatorsByHandler: validatorsByHandler,
		handlersByValidator: handlersByValidator,
	}
}

// AddHandler adds a new handler.
func (k *HandlersKeeper) AddHandler(ctx context.Context, handler types.Handler) error {
	return k.handlers.Set(ctx, handler.Name, handler)
}

func (k *HandlersKeeper) Import(ctx context.Context, handlers []*types.Handler) error {
	for _, handler := range handlers {
		if err := k.AddHandler(ctx, *handler); err != nil {
			return err
		}
	}
	return nil
}

func (k *HandlersKeeper) Export(ctx context.Context) ([]*types.Handler, error) {
	handlers := []*types.Handler{}
	err := k.handlers.Walk(ctx, nil, func(key string, value types.Handler) (stop bool, err error) {
		handlers = append(handlers, &value)
		return false, nil
	})
	if err != nil {
		return nil, err
	}
	return handlers, nil
}

func (k *HandlersKeeper) Handlers() collections.Map[string, types.Handler] {
	return k.handlers
}

// RegisterValidator register validator as a handler provider.
func (k *HandlersKeeper) RegisterValidator(ctx context.Context, handlerName string, validator sdk.AccAddress) error {
	if exists, err := k.handlers.Has(ctx, handlerName); err != nil || !exists {
		if err != nil {
			return err
		}

		return errorsmod.Wrapf(types.ErrInvalidHandler, "handler not exists: %s", handlerName)
	}

	if err := k.validatorsByHandler.Set(ctx, collections.Join(handlerName, validator)); err != nil {
		return err
	}
	return k.handlersByValidator.Set(ctx, collections.Join(validator, handlerName))
}

// UnregisterValidator unregisters a validator from handler providers.
func (k *HandlersKeeper) UnregisterValidator(ctx context.Context, handlerName string, validator sdk.AccAddress) error {
	if err := k.validatorsByHandler.Remove(ctx, collections.Join(handlerName, validator)); err != nil {
		return err
	}

	return k.handlersByValidator.Remove(ctx, collections.Join(validator, handlerName))
}

// Handlers mapped to a specific validator.
func (k *HandlersKeeper) ByValidator() collections.KeySet[collections.Pair[sdk.AccAddress, string]] {
	return k.handlersByValidator
}

// Validators mapped to a specific handler.
func (k *HandlersKeeper) ByHandler() collections.KeySet[collections.Pair[string, sdk.AccAddress]] {
	return k.validatorsByHandler
}
