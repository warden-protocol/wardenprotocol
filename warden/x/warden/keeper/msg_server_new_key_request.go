package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/gogoproto/proto"
	intenttypes "github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

func (k msgServer) NewKeyRequest(goCtx context.Context, msg *types.MsgNewKeyRequest) (*intenttypes.MsgActionCreated, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	ws, err := k.spaces.Get(ctx, msg.SpaceId)
	if err != nil {
		return nil, err
	}

	keychain, err := k.keychains.Get(ctx, msg.KeychainId)
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

	return &intenttypes.MsgActionCreated{Action: act}, nil
}

func (k msgServer) NewKeyRequestIntentGenerator(ctx sdk.Context, act intenttypes.Action) (intenttypes.Intent, error) {
	msg, err := intenttypes.GetActionMessage[*types.MsgNewKeyRequest](k.cdc, act)
	if err != nil {
		return intenttypes.Intent{}, err
	}

	ws, err := k.spaces.Get(ctx, msg.SpaceId)
	if err != nil {
		return intenttypes.Intent{}, err
	}

	pol := ws.IntentNewKeyRequest()
	return pol, nil
}

func (k msgServer) NewKeyRequestActionHandler(ctx sdk.Context, act intenttypes.Action) (proto.Message, error) {
	msg, err := intenttypes.GetActionMessage[*types.MsgNewKeyRequest](k.cdc, act)
	if err != nil {
		return nil, err
	}

	if _, err := k.spaces.Get(ctx, msg.SpaceId); err != nil {
		return nil, err
	}

	keychain, err := k.keychains.Get(ctx, msg.KeychainId)
	if err != nil {
		return nil, err
	}

	if keychain.Fees != nil {
		err := k.bankKeeper.SendCoins(
			ctx,
			sdk.MustAccAddressFromBech32(msg.Creator),
			keychain.AccAddress(),
			sdk.NewCoins(sdk.NewInt64Coin("uward", keychain.Fees.KeyReq)),
		)
		if err != nil {
			return nil, err
		}
	}

	req := &types.KeyRequest{
		Creator:    msg.Creator,
		SpaceId:    msg.SpaceId,
		KeychainId: msg.KeychainId,
		KeyType:    msg.KeyType,
		Status:     types.KeyRequestStatus_KEY_REQUEST_STATUS_PENDING,
	}

	id, err := k.keyRequests.Append(ctx, req)
	if err != nil {
		return nil, err
	}

	return &types.MsgNewKeyRequestResponse{
		Id: id,
	}, nil
}
