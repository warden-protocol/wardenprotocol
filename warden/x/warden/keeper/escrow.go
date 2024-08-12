package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"

	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func (k Keeper) DeductFeesToEscrow(ctx context.Context, creator sdk.AccAddress, fees sdk.Coins) error {
	if !fees.Empty() {
		return k.bankKeeper.SendCoins(ctx, creator, k.wardenAuthority, fees)
	}

	return nil
}

func (k Keeper) ReleaseFeesToKeychain(ctx context.Context, kr types.Keychain, fees sdk.Coins) error {
	if !fees.Empty() {
		return k.bankKeeper.SendCoins(ctx, k.wardenAuthority, kr.AccAddress(), fees)
	}

	return nil
}

func (k Keeper) RefundFeesToCreator(ctx context.Context, creator sdk.AccAddress, fees sdk.Coins) error {
	if !fees.Empty() {
		return k.bankKeeper.SendCoins(ctx, k.wardenAuthority, creator, fees)
	}

	return nil
}
