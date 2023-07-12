package keeper

import (
	"context"
	"fmt"

	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.qredo.com/qrdochain/fusionchain/policy"
	"gitlab.qredo.com/qrdochain/fusionchain/x/identity/types"
)

func (k msgServer) AddWorkspaceOwner(goCtx context.Context, msg *types.MsgAddWorkspaceOwner) (*types.MsgAddWorkspaceOwnerResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	act, err := addAction(k, ctx, msg, msg.Creator)
	if err != nil {
		return nil, err
	}
	return k.xxxAddOwnerAction(ctx, act)
}

func (k msgServer) xxxAddOwnerAction(ctx sdk.Context, act *types.Action) (*types.MsgAddWorkspaceOwnerResponse, error) {
	return tryExecuteAction(
		k,
		k.cdc,
		ctx,
		act,
		func(ctx sdk.Context, msg *types.MsgAddWorkspaceOwner) (policy.Policy, error) {
			ws, found := k.WorkspacesRepo().Get(ctx, msg.WorkspaceId)
			if !found {
				return nil, fmt.Errorf("workspace not found")
			}

			pol := ws.PolicyAddOwner()
			return pol, nil
		},
		func(ctx sdk.Context, msg *types.MsgAddWorkspaceOwner) (*types.MsgAddWorkspaceOwnerResponse, error) {
			ws, found := k.WorkspacesRepo().Get(ctx, msg.WorkspaceId)
			if !found {
				return nil, fmt.Errorf("workspace not found")
			}

			if ws.IsOwner(msg.NewOwner) {
				return nil, fmt.Errorf("new owner is already an owner of the workspace")
			}

			ws.AddOwner(msg.NewOwner)

			k.WorkspacesRepo().Set(ctx, ws)

			return &types.MsgAddWorkspaceOwnerResponse{}, nil
		},
	)
}

// TODO: move following in its own package

func addAction(
	k msgServer, // k will be the Policy keeper, when we'll have a Policy sdk module. Right now we just pass another keeper.
	ctx sdk.Context,
	msg sdk.Msg,
	initialApprovers ...string,
) (*types.Action, error) {
	wrappedMsg, err := codectypes.NewAnyWithValue(msg)
	if err != nil {
		return nil, err
	}
	act := types.Action{
		Approvers: initialApprovers,
		Msg:       wrappedMsg,
	}
	k.AppendAction(ctx, &act)
	return &act, nil
}

func tryExecuteAction[ReqT sdk.Msg, ResT any](
	k msgServer, // k will be the Policy keeper, when we'll have a Policy sdk module. Right now we just pass another keeper.
	cdc codec.BinaryCodec,
	ctx sdk.Context,
	act *types.Action,
	policyFn func(sdk.Context, ReqT) (policy.Policy, error),
	handlerFn func(sdk.Context, ReqT) (*ResT, error),
) (*ResT, error) {
	var m sdk.Msg
	err := cdc.UnpackAny(act.Msg, &m)
	if err != nil {
		return nil, err
	}

	msg, ok := m.(ReqT)
	if !ok {
		return nil, fmt.Errorf("invalid message type, expected %T", new(ReqT))
	}

	pol, err := policyFn(ctx, msg)
	if err != nil {
		return nil, err
	}

	signersSet := policy.BuildApproverSet(act.Approvers)

	// Execute action if policy is satified
	if err := pol.Verify(signersSet); err == nil {
		act.Completed = true
		k.SetAction(ctx, act)
		return handlerFn(ctx, msg)
	}

	return nil, nil
}
