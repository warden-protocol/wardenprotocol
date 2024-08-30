package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) deductKeychainFees(
	ctx context.Context,
	keychainAccAddress sdk.AccAddress,
	keychainFees sdk.Coins,
	creator sdk.AccAddress) error {
	return k.bankKeeper.SendCoins(
		ctx,
		creator,
		keychainAccAddress,
		keychainFees,
	)
}
