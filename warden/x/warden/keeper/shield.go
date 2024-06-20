package keeper

import (
	"context"
	"fmt"
	"strings"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/shield/ast"
	"github.com/warden-protocol/wardenprotocol/warden/x/act/cosmoshield"
)

var _ ast.Expander = WardenShieldExpander{}

type WardenShieldExpander struct {
	keeper Keeper
}

func (w WardenShieldExpander) Expand(ctx context.Context, ident *ast.Identifier) (*ast.Expression, error) {
	if strings.HasPrefix(ident.Value, "analyzers.") {
		return w.expandAnalyzers(ctx, ident)
	}

	if ident.Value == "space.owners" {
		return w.expandSpaceOwners(ctx)

	}

	return nil, fmt.Errorf("unknown identifier: %s", ident.Value)
}

func (w WardenShieldExpander) expandSpaceOwners(ctx context.Context) (*ast.Expression, error) {
	msg := cosmoshield.UnwrapContext(ctx).Msg()

	spaceID, err := w.extractSpaceID(ctx, msg)
	if err != nil {
		return nil, err
	}

	space, err := w.keeper.SpacesKeeper.Get(ctx, spaceID)
	if err != nil {
		return nil, err
	}

	owners := make([]*ast.Expression, 0, len(space.Owners))
	for _, owner := range space.Owners {
		owners = append(owners, ast.NewIdentifier(&ast.Identifier{
			Value: owner,
		}))
	}

	return ast.NewArrayLiteral(&ast.ArrayLiteral{
		Elements: owners,
	}), nil
}

func (w WardenShieldExpander) expandAnalyzers(ctx context.Context, ident *ast.Identifier) (*ast.Expression, error) {
	analyzerVals := analyzerValues(ctx)

	ps := strings.SplitN(ident.Value, ".", 3)
	contract := ps[1]
	key := ps[2]

	contractVals, found := analyzerVals[contract]
	if !found {
		return ast.NewIdentifier(ident), nil
	}

	value, found := contractVals[key]
	if !found {
		return ast.NewIdentifier(ident), nil
	}

	return value, nil
}

type analyzerValuesKey struct{}

func WithAnalyzerValues(ctx context.Context, vals map[string]map[string]*ast.Expression) context.Context {
	return context.WithValue(ctx, analyzerValuesKey{}, vals)
}

func analyzerValues(ctx context.Context) map[string]map[string]*ast.Expression {
	v := ctx.Value(analyzerValuesKey{})
	vs, ok := v.(map[string]map[string]*ast.Expression)
	if !ok {
		return nil
	}
	return vs
}

type getSpaceIder interface {
	GetSpaceId() uint64
}

type getKeyIder interface {
	GetKeyId() uint64
}

func (w WardenShieldExpander) extractSpaceID(ctx context.Context, msg sdk.Msg) (uint64, error) {
	switch msg := msg.(type) {
	case getSpaceIder:
		return msg.GetSpaceId(), nil
	case getKeyIder:
		keyID := msg.GetKeyId()
		key, err := w.keeper.KeysKeeper.Get(ctx, keyID)
		if err != nil {
			return 0, err
		}
		return key.SpaceId, nil
	default:
		return 0, fmt.Errorf("message does not have a SpaceId or KeyId field")
	}
}

func (k Keeper) ShieldExpander() ast.Expander {
	return WardenShieldExpander{
		keeper: k,
	}
}
