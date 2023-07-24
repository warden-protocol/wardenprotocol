package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.qredo.com/qrdochain/fusionchain/x/identity/types"
)

func (k msgServer) NewSignTransactionRequest(goCtx context.Context, msg *types.MsgNewSignTransactionRequest) (*types.MsgNewSignTransactionRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgNewSignTransactionRequestResponse{}, nil
}
