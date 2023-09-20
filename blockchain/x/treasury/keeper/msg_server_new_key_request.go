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

func (k msgServer) NewKeyRequest(goCtx context.Context, msg *types.MsgNewKeyRequest) (*types.MsgNewKeyRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	ws := k.identityKeeper.GetWorkspace(ctx, msg.WorkspaceAddr)
	if ws == nil {
		return nil, fmt.Errorf("workspace not found")
	}

	act, err := k.policyKeeper.AddAction(ctx, msg, ws.SignPolicyId, msg.Creator)
	if err != nil {
		return nil, err
	}
	return k.NewKeyRequestActionHandler(ctx, act, &cdctypes.Any{})
}

func (k msgServer) NewKeyRequestActionHandler(ctx sdk.Context, act *bbirdtypes.Action, payload *cdctypes.Any) (*types.MsgNewKeyRequestResponse, error) {
	return bbird.TryExecuteAction(
		k.policyKeeper,
		k.cdc,
		ctx,
		act,
		payload,
		func(ctx sdk.Context, msg *types.MsgNewKeyRequest) (policy.Policy, error) {
			ws := k.identityKeeper.GetWorkspace(ctx, msg.WorkspaceAddr)
			if ws == nil {
				return nil, fmt.Errorf("workspace not found")
			}

			pol := ws.PolicyNewKeyRequest()
			return pol, nil
		},
		func(ctx sdk.Context, msg *types.MsgNewKeyRequest) (*types.MsgNewKeyRequestResponse, error) {
			ws := k.identityKeeper.GetWorkspace(ctx, msg.WorkspaceAddr)
			if ws == nil {
				return nil, fmt.Errorf("workspace not found")
			}

			if _, found := k.identityKeeper.KeyringsRepo().Get(ctx, msg.KeyringId); !found {
				return nil, fmt.Errorf("keyring not found")
			}

			req := &types.KeyRequest{
				Creator:       msg.Creator,
				WorkspaceAddr: msg.WorkspaceAddr,
				KeyringId:     msg.KeyringId,
				KeyType:       msg.KeyType,
				Status:        types.KeyRequestStatus_KEY_REQUEST_STATUS_PENDING,
			}

			id := k.KeyRequestsRepo().Append(ctx, req)

			return &types.MsgNewKeyRequestResponse{
				Id: id,
			}, nil
		},
	)
}
