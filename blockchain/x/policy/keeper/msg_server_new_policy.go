package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/policy"
	"github.com/qredo/fusionchain/x/policy/types"
)

func (k msgServer) NewPolicy(goCtx context.Context, msg *types.MsgNewPolicy) (*types.MsgNewPolicyResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var p policy.Policy
	if err := k.cdc.UnpackAny(msg.Policy, &p); err != nil {
		return nil, err
	}
	if err := p.Validate(); err != nil {
		return nil, err
	}

	policyPb := &types.Policy{
		Name:   msg.Name,
		Policy: msg.Policy,
	}
	id := k.PolicyRepo().Append(ctx, policyPb)

	return &types.MsgNewPolicyResponse{
		Id: id,
	}, nil
}
