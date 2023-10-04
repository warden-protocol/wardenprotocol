package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/qredo/fusionchain/x/treasury/types"
)

func (k msgServer) NewWalletRequest(goCtx context.Context, msg *types.MsgNewWalletRequest) (*types.MsgNewWalletRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	key, found := k.GetKey(ctx, msg.KeyId)
	if !found {
		return nil, fmt.Errorf("key %d not found", msg.KeyId)
	}

	w := &types.Wallet{
		KeyId: msg.KeyId,
		Type:  msg.WalletType,
	}

	if _, err := types.NewWalletI(w, key); err != nil {
		return nil, err
	}

	k.WalletsRepo().Append(ctx, w)

	return &types.MsgNewWalletRequestResponse{}, nil
}
