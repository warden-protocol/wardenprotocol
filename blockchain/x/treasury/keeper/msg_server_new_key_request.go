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
	// we have to check if the keyring is Active or not
	if keyring := k.identityKeeper.GetKeyring(ctx, msg.KeyringAddr); keyring == nil || !keyring.IsActive {
		return nil, fmt.Errorf("keyring is nil or is inactive")
	}

	act, err := k.policyKeeper.AddAction(ctx, msg.Creator, msg, ws.SignPolicyId, msg.Btl)
	if err != nil {
		return nil, err
	}
	return k.NewKeyRequestActionHandler(ctx, act, &cdctypes.Any{})
}

func (k msgServer) NewKeyRequestPolicyGenerator(ctx sdk.Context, msg *types.MsgNewKeyRequest) (policy.Policy, error) {
	ws := k.identityKeeper.GetWorkspace(ctx, msg.WorkspaceAddr)
	if ws == nil {
		return nil, fmt.Errorf("workspace not found")
	}

	pol := ws.PolicyNewKeyRequest()
	return pol, nil
}

func (k msgServer) NewKeyRequestActionHandler(ctx sdk.Context, act *bbirdtypes.Action, payload *cdctypes.Any) (*types.MsgNewKeyRequestResponse, error) {
	return bbird.TryExecuteAction(
		k.policyKeeper,
		k.cdc,
		ctx,
		act,
		payload,
		func(ctx sdk.Context, msg *types.MsgNewKeyRequest) (*types.MsgNewKeyRequestResponse, error) {
			if ws := k.identityKeeper.GetWorkspace(ctx, msg.WorkspaceAddr); ws == nil {
				return nil, fmt.Errorf("workspace not found")
			}

			keyring := k.identityKeeper.GetKeyring(ctx, msg.KeyringAddr)
			if keyring == nil {
				return nil, fmt.Errorf("keyring not found")
			}

			err := k.bankKeeper.SendCoins(
				ctx,
				sdk.AccAddress(msg.Creator),
				sdk.AccAddress(msg.KeyringAddr),
				sdk.NewCoins(sdk.NewCoin("nQRDO", sdk.NewIntFromUint64(keyring.Fees.KeyReq))),
			)
			if err != nil {
				return nil, err
			}

			req := &types.KeyRequest{
				Creator:       msg.Creator,
				WorkspaceAddr: msg.WorkspaceAddr,
				KeyringAddr:   msg.KeyringAddr,
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
