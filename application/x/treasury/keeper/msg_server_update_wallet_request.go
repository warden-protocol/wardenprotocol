package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
)

func (k msgServer) UpdateWalletRequest(goCtx context.Context, msg *types.MsgUpdateWalletRequest) (*types.MsgUpdateWalletRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgUpdateWalletRequestResponse{}, nil
}
