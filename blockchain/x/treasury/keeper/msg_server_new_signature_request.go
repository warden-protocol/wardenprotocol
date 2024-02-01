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

func (k msgServer) NewSignatureRequest(goCtx context.Context, msg *types.MsgNewSignatureRequest) (*types.MsgNewSignatureRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	key, found := k.GetKey(ctx, msg.KeyId)
	if !found {
		return nil, fmt.Errorf("key not found")
	}

	if len(msg.DataForSigning) != 32 && key.Type == types.KeyType_KEY_TYPE_ECDSA_SECP256K1 {
		return nil, fmt.Errorf("signed data is not 32 bytes. Length is: %d", len(msg.DataForSigning))
	}

	ws := k.identityKeeper.GetSpace(ctx, key.SpaceAddr)
	if ws == nil {
		return nil, fmt.Errorf("space not found")
	}

	if keychain := k.identityKeeper.GetKeychain(ctx, key.KeychainAddr); keychain == nil || !keychain.IsActive {
		return nil, fmt.Errorf("keychain is nil or is inactive")
	}

	act, err := k.intentKeeper.AddAction(ctx, msg.Creator, msg, ws.SignIntentId, msg.Btl)
	if err != nil {
		return nil, err
	}
	return k.NewSignatureRequestActionHandler(ctx, act, &cdctypes.Any{})
}

func (k msgServer) NewSignatureRequestIntentGenerator(ctx sdk.Context, msg *types.MsgNewSignatureRequest) (intent.Intent, error) {
	key, found := k.GetKey(ctx, msg.KeyId)
	if !found {
		return nil, fmt.Errorf("key not found")
	}

	ws := k.identityKeeper.GetSpace(ctx, key.SpaceAddr)
	if ws == nil {
		return nil, fmt.Errorf("space not found")
	}

	pol := ws.IntentNewSignatureRequest()
	return pol, nil
}

func (k msgServer) NewSignatureRequestActionHandler(ctx sdk.Context, act *bbirdtypes.Action, payload *cdctypes.Any) (*types.MsgNewSignatureRequestResponse, error) {
	return bbird.TryExecuteAction(
		k.intentKeeper,
		k.cdc,
		ctx,
		act,
		payload,
		func(ctx sdk.Context, msg *types.MsgNewSignatureRequest) (*types.MsgNewSignatureRequestResponse, error) {
			key, found := k.GetKey(ctx, msg.KeyId)
			if !found {
				return nil, fmt.Errorf("key not found")
			}

			ws := k.identityKeeper.GetSpace(ctx, key.SpaceAddr)
			if ws == nil {
				return nil, fmt.Errorf("space not found")
			}

			keychain := k.identityKeeper.GetKeychain(ctx, key.KeychainAddr)
			if keychain == nil {
				return nil, fmt.Errorf("keychain not found")
			}

			if keychain.Fees != nil {
				err := k.bankKeeper.SendCoins(
					ctx,
					sdk.AccAddress(msg.Creator),
					sdk.AccAddress(key.KeychainAddr),
					sdk.NewCoins(sdk.NewCoin("nward", sdk.NewIntFromUint64(keychain.Fees.KeyReq))),
				)
				if err != nil {
					return nil, err
				}
			}

			req := &types.SignRequest{
				Creator:        msg.Creator,
				KeyId:          msg.KeyId,
				KeyType:        key.Type,
				DataForSigning: msg.DataForSigning,
				Status:         types.SignRequestStatus_SIGN_REQUEST_STATUS_PENDING,
			}

			id := k.SignatureRequestsRepo().Append(ctx, req)

			return &types.MsgNewSignatureRequestResponse{Id: id}, nil
		},
	)
}
