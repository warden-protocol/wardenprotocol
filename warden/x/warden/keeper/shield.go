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

func (w WardenShieldExpander) Expand(goCtx context.Context, ident *ast.Identifier) (*ast.Expression, error) {
	if ident.Value == "space.owners" {
		ctx := cosmoshield.UnwrapContext(goCtx)
		msg := ctx.Msg()

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

	return nil, fmt.Errorf("unknown identifier: %s", ident.Value)
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
