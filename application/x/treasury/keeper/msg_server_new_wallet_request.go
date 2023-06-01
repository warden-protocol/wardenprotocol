package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
)

func (k msgServer) NewWalletRequest(goCtx context.Context, msg *types.MsgNewWalletRequest) (*types.MsgNewWalletRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgNewWalletRequestResponse{}, nil
}
