package keeper

import (
	"context"
	"fmt"

	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/policy"
	bbird "github.com/qredo/fusionchain/x/policy/keeper"
	bbirdtypes "github.com/qredo/fusionchain/x/policy/types"
	"github.com/qredo/fusionchain/x/treasury/types"
)

func (k msgServer) NewSignatureRequest(goCtx context.Context, msg *types.MsgNewSignatureRequest) (*types.MsgNewSignatureRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	key, found := k.KeysRepo().Get(ctx, msg.KeyId)
	if !found {
		return nil, fmt.Errorf("key not found")
	}

	ws := k.identityKeeper.GetWorkspace(ctx, key.WorkspaceAddr)
	if ws == nil {
		return nil, fmt.Errorf("workspace not found")
	}

	act, err := k.policyKeeper.AddAction(ctx, msg, ws.SignPolicyId, msg.Creator)
	if err != nil {
		return nil, err
	}
	return k.NewSignatureRequestActionHandler(ctx, act, &cdctypes.Any{})
}

func (k msgServer) NewSignatureRequestActionHandler(ctx sdk.Context, act *bbirdtypes.Action, payload *cdctypes.Any) (*types.MsgNewSignatureRequestResponse, error) {
	return bbird.TryExecuteAction(
		k.policyKeeper,
		k.cdc,
		ctx,
		act,
		payload,
		func(ctx sdk.Context, msg *types.MsgNewSignatureRequest) (policy.Policy, error) {
			key, found := k.KeysRepo().Get(ctx, msg.KeyId)
			if !found {
				return nil, fmt.Errorf("key not found")
			}

			ws := k.identityKeeper.GetWorkspace(ctx, key.WorkspaceAddr)
			if ws == nil {
				return nil, fmt.Errorf("workspace not found")
			}

			pol := ws.PolicyNewSignatureRequest()
			return pol, nil
		},
		func(ctx sdk.Context, msg *types.MsgNewSignatureRequest) (*types.MsgNewSignatureRequestResponse, error) {
			key, found := k.KeysRepo().Get(ctx, msg.KeyId)
			if !found {
				return nil, fmt.Errorf("key not found")
			}

			ws := k.identityKeeper.GetWorkspace(ctx, key.WorkspaceAddr)
			if ws == nil {
				return nil, fmt.Errorf("workspace not found")
			}

			req := &types.SignRequest{
				Creator:        msg.Creator,
				KeyId:          msg.KeyId,
				DataForSigning: msg.DataForSigning,
				Status:         types.SignRequestStatus_SIGN_REQUEST_STATUS_PENDING,
			}

			id := k.SignatureRequestsRepo().Append(ctx, req)

			return &types.MsgNewSignatureRequestResponse{Id: id}, nil
		},
	)
}
