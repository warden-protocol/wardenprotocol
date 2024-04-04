package keeper

import (
	"context"
	"fmt"

	"github.com/warden-protocol/wardenprotocol/shield/ast"
)

var _ ast.Expander = FeedsShieldExpander{}

type FeedsShieldExpander struct {
	keeper Keeper
}

func (w FeedsShieldExpander) Expand(goCtx context.Context, ident *ast.Identifier) (*ast.Expression, error) {
	return nil, fmt.Errorf("unknown identifier: %s", ident.Value)
}

func (k Keeper) ShieldExpander() ast.Expander {
	return FeedsShieldExpander{
		keeper: k,
	}
}
