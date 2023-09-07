package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/x/blackbird/types"
)

func (k msgServer) NewPolicy(goCtx context.Context, msg *types.MsgNewPolicy) (*types.MsgNewPolicyResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	p := &types.Policy{
		Name:   msg.Name,
		Policy: msg.Policy,
	}
	id := k.PolicyRepo().Append(ctx, p)

	return &types.MsgNewPolicyResponse{
		Id: id,
	}, nil
}
