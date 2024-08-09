package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) deductKeychainFees(
	ctx context.Context,
	maxKeychainFee string,
	keychainAccAddress sdk.AccAddress,
	keychainFees sdk.Coins,
	creator string) error {
	maxFeeCoins, err := sdk.ParseCoinsNormalized(maxKeychainFee)
	if err != nil {
		return fmt.Errorf("invalid format fee passed: %w", err)
	}

	if len(maxFeeCoins) == 0 || len(keychainFees) == 0 {
		return fmt.Errorf("fees cannot be empty")
	}

	if !keychainFees.DenomsSubsetOf(maxFeeCoins) {
		return fmt.Errorf("fee denominations do not match: wanted %s", keychainFees)
	}

	if keychainFees.IsAllLTE(maxFeeCoins) {
		return k.bankKeeper.SendCoins(
			ctx,
			sdk.MustAccAddressFromBech32(creator),
			keychainAccAddress,
			keychainFees,
		)
	}

	return fmt.Errorf("keychain fees are not sufficient: wanted %s", keychainFees)
}
