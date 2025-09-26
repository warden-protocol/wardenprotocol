package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"

	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

// deductKeychainFees is to deduct fees from creator's address to warden escrow address.
func (k Keeper) deductKeychainFees(ctx context.Context, creator sdk.AccAddress, fees sdk.Coins) error {
	if !fees.Empty() {
		return k.bankKeeper.SendCoins(ctx, creator, k.wardenAuthority, fees)
	}

	return nil
}

// completed.
func (k Keeper) releaseKeychainFees(ctx context.Context, kr types.Keychain, fees sdk.Coins) error {
	if !fees.Empty() {
		return k.bankKeeper.SendCoins(ctx, k.wardenAuthority, kr.AccAddress(), fees)
	}

	return nil
}

// rejected or timed-out.
func (k Keeper) refundKeychainFees(ctx context.Context, creator sdk.AccAddress, fees sdk.Coins) error {
	if !fees.Empty() {
		return k.bankKeeper.SendCoins(ctx, k.wardenAuthority, creator, fees)
	}

	return nil
}
