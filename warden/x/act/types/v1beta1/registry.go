package v1beta1

import (
	"context"
	"errors"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

// TemplatesRegistry stores the mapping between Msg types and the function the
// provides the approve and reject Templates for them.
//
// The registered Templates is fetched only once during Action creation. (The
// provider function is not called every time a new vote is added to an Action).
//
// The provider function receives the context.Context of the current execution.
// Optionally, it can return a new context.Context that will be used further
// during the Expression evaluation. This is especially useful for modules that
// want to enrich the context for their Expanders.
type TemplatesRegistry struct {
	p map[string]ProviderFnWithCtx
}

type (
	ProviderFnG[T sdk.Msg]        func(context.Context, T) (Template, Template, error)
	ProviderFnWithCtxG[T sdk.Msg] func(context.Context, T) (context.Context, Template, Template, error)
)

type registry interface {
	Register(typeUrl string, fn ProviderFn)
}

// Register is a type-safe version of TemplatesRegistry.Register that uses
// generics to ensure that the callback function accepts a sdk.Msg of the
// correct type.
func Register[T sdk.Msg](reg registry, fn ProviderFnG[T]) {
	var msg T
	typeUrl := sdk.MsgTypeURL(msg)
	reg.Register(typeUrl, func(ctx context.Context, m sdk.Msg) (Template, Template, error) {
		return fn(ctx, m.(T))
	})
}

type registryWithCtx interface {
	RegisterCtx(typeUrl string, fn ProviderFnWithCtx)
}

// RegisterCtx is a type-safe version of TemplatesRegistry.RegisterCtx that uses
// generics to ensure that the callback function accepts a sdk.Msg of the
// correct type.
func RegisterCtx[T sdk.Msg](reg registryWithCtx, fn ProviderFnWithCtxG[T]) {
	var msg T
	typeUrl := sdk.MsgTypeURL(msg)
	reg.RegisterCtx(typeUrl, func(ctx context.Context, m sdk.Msg) (context.Context, Template, Template, error) {
		return fn(ctx, m.(T))
	})
}

type (
	ProviderFn        func(context.Context, sdk.Msg) (Template, Template, error)
	ProviderFnWithCtx func(context.Context, sdk.Msg) (context.Context, Template, Template, error)
)

// NewTemplatesRegistry returns an empty initialized *TemplatesRegistry.
func NewTemplatesRegistry() *TemplatesRegistry {
	return &TemplatesRegistry{
		p: make(map[string]ProviderFnWithCtx),
	}
}

// Register registers the ProviderFn for the typeUrl. Only one
// ProviderMsg can be registered for each typeUrl, attempting to register
// a provider for the same typeUrl twice will panic.
func (p *TemplatesRegistry) Register(typeUrl string, fn ProviderFn) {
	p.RegisterCtx(typeUrl, func(ctx context.Context, m sdk.Msg) (context.Context, Template, Template, error) {
		approve, reject, err := fn(ctx, m)
		return ctx, approve, reject, err
	})
}

// RegisterCtx registers the ProviderFnWithCtx for the typeUrl. Only one
// ProviderMsg can be registered for each typeUrl, attempting to register
// a provider for the same typeUrl twice will panic.
func (p *TemplatesRegistry) RegisterCtx(typeUrl string, fn ProviderFnWithCtx) {
	if len(typeUrl) == 0 {
		panic(errors.New("typeUrl cannot be empty"))
	}

	if fn == nil {
		panic(errors.New("function cannot be nil"))
	}

	if _, found := p.p[typeUrl]; found {
		panic(fmt.Errorf("TemplateRegistry already has a handler for %s", typeUrl))
	}

	p.p[typeUrl] = fn
}

// Get finds and calls the registered provider function for the sdk.Msg.
//
// An error is returned if there are no provider functions registered for the
// sdk.Msg type.
func (p *TemplatesRegistry) Get(ctx context.Context, msg sdk.Msg) (context.Context, Template, Template, error) {
	typeUrl := sdk.MsgTypeURL(msg)
	if fn, found := p.p[typeUrl]; found {
		return fn(ctx, msg)
	}

	return nil, Template{}, Template{}, fmt.Errorf("no Template provider registered for %s", typeUrl)
}
