package types

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

// IntentsRegistry stores the mapping between Msg types and the function the
// provides the Intent for them.
//
// The registered Intent is fetched only once during Action creation. (The
// provider function is not called every time the Action is re-evaluated).
//
// The provider function receives the context.Context of the current execution.
// Optionally, it can return a new context.Context that will be used further
// during the Intent evaluation. This is especially useful for modules that
// want to enrich the context for their Expanders.
type IntentsRegistry struct {
	p map[string]ProviderFnWithCtx
}

type ProviderFnG[T sdk.Msg] func(context.Context, T) (Intent, error)
type ProviderFnWithCtxG[T sdk.Msg] func(context.Context, T) (context.Context, Intent, error)

type registry interface {
	Register(typeUrl string, fn ProviderFn)
}

// Register is a type-safe version of IntentsRegistry.Register that uses
// generics to ensure that the callback function accepts a sdk.Msg of the
// correct type.
func Register[T sdk.Msg](reg registry, fn ProviderFnG[T]) {
	var msg T
	typeUrl := sdk.MsgTypeURL(msg)
	reg.Register(typeUrl, func(ctx context.Context, m sdk.Msg) (Intent, error) {
		return fn(ctx, m.(T))
	})
}

type registryWithCtx interface {
	RegisterCtx(typeUrl string, fn ProviderFnWithCtx)
}

// RegisterCtx is a type-safe version of IntentsRegistry.RegisterCtx that uses
// generics to ensure that the callback function accepts a sdk.Msg of the
// correct type.
func RegisterCtx[T sdk.Msg](reg registryWithCtx, fn ProviderFnWithCtxG[T]) {
	var msg T
	typeUrl := sdk.MsgTypeURL(msg)
	reg.RegisterCtx(typeUrl, func(ctx context.Context, m sdk.Msg) (context.Context, Intent, error) {
		return fn(ctx, m.(T))
	})
}

type ProviderFn func(context.Context, sdk.Msg) (Intent, error)
type ProviderFnWithCtx func(context.Context, sdk.Msg) (context.Context, Intent, error)

// NewIntentsRegistry returns an empty initialized *IntentsRegistry.
func NewIntentsRegistry() *IntentsRegistry {
	return &IntentsRegistry{
		p: make(map[string]ProviderFnWithCtx),
	}
}

// Register registers the ProviderFn for the typeUrl. Only one
// ProviderMsg can be registered for each typeUrl, attempting to register
// a provider for the same typeUrl twice will panic.
func (p *IntentsRegistry) Register(typeUrl string, fn ProviderFn) {
	p.RegisterCtx(typeUrl, func(ctx context.Context, m sdk.Msg) (context.Context, Intent, error) {
		i, err := fn(ctx, m)
		return ctx, i, err
	})
}

// RegisterCtx registers the ProviderFnWithCtx for the typeUrl. Only one
// ProviderMsg can be registered for each typeUrl, attempting to register
// a provider for the same typeUrl twice will panic.
func (p *IntentsRegistry) RegisterCtx(typeUrl string, fn ProviderFnWithCtx) {
	if len(typeUrl) == 0 {
		panic(fmt.Errorf("typeUrl cannot be empty"))
	}

	if fn == nil {
		panic(fmt.Errorf("function cannot be nil"))
	}

	if _, found := p.p[typeUrl]; found {
		panic(fmt.Errorf("IntentRegistry already has a handler for %s", typeUrl))
	}

	p.p[typeUrl] = fn
}

// Get finds and calls the registered provider function for the sdk.Msg.
//
// An error is returned if there are no provider functions registered for the
// sdk.Msg type.
func (p *IntentsRegistry) Get(ctx context.Context, msg sdk.Msg) (context.Context, Intent, error) {
	typeUrl := sdk.MsgTypeURL(msg)
	if fn, found := p.p[typeUrl]; found {
		return fn(ctx, msg)
	}
	return nil, Intent{}, fmt.Errorf("no intent provider registered for %s", typeUrl)
}
