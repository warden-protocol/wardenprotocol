package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/shield/ast"
	"github.com/warden-protocol/wardenprotocol/warden/x/intent/cosmoshield"
)

var _ ast.Expander = WardenShieldExpander{}

type WardenShieldExpander struct {
	keeper Keeper
}

func (w WardenShieldExpander) Expand(goCtx context.Context, ident *ast.Identifier) ast.Expression {
	// TODO: implement this to resolve `space.owners` into a list of addresses
	if ident.Value == "space.owners" {
		ctx := cosmoshield.UnwrapContext(goCtx)
		msg := ctx.Msg()

		spaceID, err := extractSpaceID(msg)
		if err != nil {
			panic(err)
		}

		space, err := w.keeper.SpacesKeeper.Get(ctx, spaceID)
		if err != nil {
			panic(err)
		}

		owners := make([]ast.Expression, 0, len(space.Owners))
		for _, owner := range space.Owners {
			owners = append(owners, ast.NewIdent(owner))
		}

		return &ast.ArrayLiteral{
			Elements: owners,
		}
	}
	return ident
}

type getSpaceIder interface {
	GetSpaceId() uint64
}

func extractSpaceID(msg sdk.Msg) (uint64, error) {
	if msg, ok := msg.(getSpaceIder); ok {
		return msg.GetSpaceId(), nil
	}
	return 0, fmt.Errorf("message does not have a SpaceId field")
}

func (k Keeper) ShieldExpander() ast.Expander {
	return WardenShieldExpander{
		keeper: k,
	}
}
