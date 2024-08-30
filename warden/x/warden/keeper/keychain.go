package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) deductKeychainFees(
	ctx context.Context,
	maxKeychainFee sdk.Coins,
	keychainAccAddress sdk.AccAddress,
	keychainFees sdk.Coins,
	creator sdk.AccAddress) error {
	if keychainFees.Empty() {
		// no fees to deduct
		return nil
	}

	if keychainFees.IsAllLTE(maxKeychainFee) {
		return k.bankKeeper.SendCoins(
			ctx,
			creator,
			keychainAccAddress,
			keychainFees,
		)
	}

	return fmt.Errorf("keychain fees are not sufficient: wanted %s", keychainFees)
}
