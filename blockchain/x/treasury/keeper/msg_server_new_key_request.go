package keeper

import (
	"context"
	"fmt"

	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/intent"
	bbird "github.com/warden-protocol/wardenprotocol/x/intent/keeper"
	bbirdtypes "github.com/warden-protocol/wardenprotocol/x/intent/types"
	"github.com/warden-protocol/wardenprotocol/x/treasury/types"
)

func (k msgServer) NewKeyRequest(goCtx context.Context, msg *types.MsgNewKeyRequest) (*types.MsgNewKeyRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	ws := k.identityKeeper.GetSpace(ctx, msg.SpaceAddr)
	if ws == nil {
		return nil, fmt.Errorf("space not found")
	}
	// we have to check if the keychain is Active or not
	if keychain := k.identityKeeper.GetKeychain(ctx, msg.KeychainAddr); keychain == nil || !keychain.IsActive {
		return nil, fmt.Errorf("keychain is nil or is inactive")
	}

	act, err := k.intentKeeper.AddAction(ctx, msg.Creator, msg, ws.SignIntentId, msg.Btl)
	if err != nil {
		return nil, err
	}
	return k.NewKeyRequestActionHandler(ctx, act, &cdctypes.Any{})
}

func (k msgServer) NewKeyRequestIntentGenerator(ctx sdk.Context, msg *types.MsgNewKeyRequest) (intent.Intent, error) {
	ws := k.identityKeeper.GetSpace(ctx, msg.SpaceAddr)
	if ws == nil {
		return nil, fmt.Errorf("space not found")
	}

	pol := ws.IntentNewKeyRequest()
	return pol, nil
}

func (k msgServer) NewKeyRequestActionHandler(ctx sdk.Context, act *bbirdtypes.Action, payload *cdctypes.Any) (*types.MsgNewKeyRequestResponse, error) {
	return bbird.TryExecuteAction(
		k.intentKeeper,
		k.cdc,
		ctx,
		act,
		payload,
		func(ctx sdk.Context, msg *types.MsgNewKeyRequest) (*types.MsgNewKeyRequestResponse, error) {
			if ws := k.identityKeeper.GetSpace(ctx, msg.SpaceAddr); ws == nil {
				return nil, fmt.Errorf("space not found")
			}

			keychain := k.identityKeeper.GetKeychain(ctx, msg.KeychainAddr)
			if keychain == nil {
				return nil, fmt.Errorf("keychain not found")
			}

			if keychain.Fees != nil {
				err := k.bankKeeper.SendCoins(
					ctx,
					sdk.AccAddress(msg.Creator),
					sdk.AccAddress(msg.KeychainAddr),
					sdk.NewCoins(sdk.NewCoin("nward", sdk.NewIntFromUint64(keychain.Fees.KeyReq))),
				)
				if err != nil {
					return nil, err
				}
			}

			req := &types.KeyRequest{
				Creator:       msg.Creator,
				SpaceAddr: msg.SpaceAddr,
				KeychainAddr:   msg.KeychainAddr,
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
