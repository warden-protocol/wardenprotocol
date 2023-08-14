package keeper

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
)

func (k msgServer) getWallet(ctx sdk.Context, id uint64) (*types.Wallet, types.WalletI, error) {
	w, found := k.WalletsRepo().Get(ctx, id)
	if !found {
		return nil, nil, fmt.Errorf("wallet %d not found", id)
	}

	key, found := k.KeysRepo().Get(ctx, w.KeyId)
	if !found {
		return nil, nil, fmt.Errorf("key %d not found", w.KeyId)
	}

	walletI, err := types.NewWalletI(w, key)
	return w, walletI, err
}
