package keeper

import (
	"context"
	"sort"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/shield"
	"github.com/warden-protocol/wardenprotocol/shield/ast"
	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

func (k Keeper) GetRule(ctx context.Context, id uint64) (types.Rule, error) {
	return k.rules.Get(ctx, id)
}

// preprocessRule preprocesses an rule and returns the root AST and a list
// of addresses that are referenced in the expression.
func (k *Keeper) preprocessRule(ctx context.Context, rule types.Rule) (*ast.Expression, []string, error) {
	expander := k.shieldExpanderFunc()

	rootAst, err := shield.Preprocess(ctx, rule.Expression, expander)
	if err != nil {
		return nil, nil, err
	}

	metadata, err := shield.ExtractMetadata(rootAst)
	if err != nil {
		return nil, nil, err
	}

	// map addresses into bech32 strings
	addresses := resolveAddresses(metadata.Identifiers)
	addressesBech32 := make([]string, 0, len(addresses))
	for _, addr := range addresses {
		addressesBech32 = append(addressesBech32, addr.String())
	}
	sort.Strings(addressesBech32)

	return rootAst, addressesBech32, nil
}

// resolveAddresses filters a list of string by returning only the ones that are valid bech32 addresses.
func resolveAddresses(identifiers []string) []sdk.AccAddress {
	addresses := make([]sdk.AccAddress, 0, len(identifiers))
	for _, ident := range identifiers {
		addr, err := sdk.AccAddressFromBech32(ident)
		if err == nil {
			addresses = append(addresses, addr)
		}
	}
	return addresses
}
