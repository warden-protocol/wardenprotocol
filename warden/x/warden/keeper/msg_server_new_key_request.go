package keeper

import (
	"context"
	"fmt"

	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/warden/intent"
	intenttypes "github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types"
)

func (k msgServer) NewKeyRequest(goCtx context.Context, msg *types.MsgNewKeyRequest) (*types.MsgNewKeyRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	ws, err := k.GetSpace(ctx, msg.SpaceAddr)
	if err != nil {
		return nil, err
	}

	keychain, err := k.GetKeychain(ctx, msg.KeychainAddr)
	if err != nil {
		return nil, err
	}

	if !keychain.IsActive {
		return nil, fmt.Errorf("keychain is not active")
	}

	if msg.KeyType == types.KeyType_KEY_TYPE_UNSPECIFIED {
		return nil, fmt.Errorf("key type is unspecified")
	}

	act, err := k.intentKeeper.AddAction(ctx, msg.Creator, msg, ws.SignIntentId, msg.Btl)
	if err != nil {
		return nil, err
	}

	res, err := k.NewKeyRequestActionHandler(ctx, *act, &cdctypes.Any{})
	return res.(*types.MsgNewKeyRequestResponse), err
}

func (k msgServer) NewKeyRequestIntentGenerator(ctx sdk.Context, act intenttypes.Action) (intent.Intent, error) {
	msg, err := intenttypes.GetActionMessage[*types.MsgNewKeyRequest](k.cdc, act)
	if err != nil {
		return nil, err
	}

	ws, err := k.GetSpace(ctx, msg.SpaceAddr)
	if err != nil {
		return nil, err
	}

	pol := ws.IntentNewKeyRequest()
	return pol, nil
}

func (k msgServer) NewKeyRequestActionHandler(ctx sdk.Context, act intenttypes.Action, payload *cdctypes.Any) (any, error) {
	ready, err := k.intentKeeper.CheckActionReady(ctx, act, nil)
	if err != nil {
		return nil, err
	}

	if !ready {
		return nil, nil
	}

	msg, err := intenttypes.GetActionMessage[*types.MsgNewKeyRequest](k.cdc, act)
	if err != nil {
		return nil, err
	}

	if _, err := k.GetSpace(ctx, msg.SpaceAddr); err != nil {
		return nil, err
	}

	keychain, err := k.GetKeychain(ctx, msg.KeychainAddr)
	if err != nil {
		return nil, err
	}

	if keychain.Fees != nil {
		err := k.bankKeeper.SendCoins(
			ctx,
			sdk.AccAddress(msg.Creator),
			sdk.AccAddress(msg.KeychainAddr),
			sdk.NewCoins(sdk.NewInt64Coin("uward", keychain.Fees.KeyReq)),
		)
		if err != nil {
			return nil, err
		}
	}

	req := &types.KeyRequest{
		Creator:      msg.Creator,
		SpaceAddr:    msg.SpaceAddr,
		KeychainAddr: msg.KeychainAddr,
		KeyType:      msg.KeyType,
		Status:       types.KeyRequestStatus_KEY_REQUEST_STATUS_PENDING,
	}

	id, err := k.keyRequests.Append(ctx, req)
	if err != nil {
		return nil, err
	}

	return &types.MsgNewKeyRequestResponse{
		Id: id,
	}, nil
}
