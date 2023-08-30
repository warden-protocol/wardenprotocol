package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/x/blackbird/types"
)

func (k msgServer) ApproveAction(goCtx context.Context, msg *types.MsgApproveAction) (*types.MsgApproveActionResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	act, found := k.GetAction(ctx, msg.ActionType, msg.ActionId)
	if !found {
		return nil, fmt.Errorf("action not found")
	}

	if act.Completed {
		return nil, fmt.Errorf("action already completed")
	}

	act.Approvers = append(act.Approvers, msg.Creator)
	k.SetAction(ctx, &act)

	h, ok := k.actionHandlers[msg.ActionType]
	if !ok {
		return nil, fmt.Errorf("action handler not found for %s", msg.ActionType)
	}

	_, err := h(ctx, &act)
	if err != nil {
		return nil, err
	}

	return &types.MsgApproveActionResponse{}, nil
}
