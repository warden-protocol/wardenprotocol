package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/x/policy/types"
)

func (k msgServer) ApproveAction(goCtx context.Context, msg *types.MsgApproveAction) (*types.MsgApproveActionResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	act, found := k.GetAction(ctx, msg.ActionType, msg.ActionId)
	if !found {
		return nil, fmt.Errorf("action not found")
	}

	if act.Status != types.ActionStatus_ACTION_STATUS_PENDING {
		return nil, fmt.Errorf("action not pending %s", act.Status.String())
	}
	if act.Btl > 0 && act.Btl < uint64(ctx.BlockHeight()) {
		act.Status = types.ActionStatus_ACTION_STATUS_TIMEOUT
		k.SetAction(ctx, &act)

		return &types.MsgApproveActionResponse{
			Status: act.Status.String(),
		}, nil
	}

	policy, err := PolicyForAction(ctx, &k.Keeper, &act)
	if err != nil {
		return nil, err
	}

	participant, err := policy.AddressToParticipant(msg.Creator)
	if err != nil {
		return nil, err
	}

	if err := act.AddApprover(participant); err != nil {
		return nil, err
	}

	k.SetAction(ctx, &act)

	h, ok := k.actionHandlers[msg.ActionType]
	if !ok {
		return nil, fmt.Errorf("action handler not found for %s", msg.ActionType)
	}

	if _, err := h(ctx, &act, msg.PolicyPayload); err != nil {
		return nil, err
	}

	return &types.MsgApproveActionResponse{Status: act.Status.String()}, nil
}
