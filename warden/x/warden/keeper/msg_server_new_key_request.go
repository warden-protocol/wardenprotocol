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
	space, err := k.SpacesKeeper.Get(ctx, msg.SpaceId)
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

	intent, err := k.newKeyRequestIntent(ctx, space)
	if err != nil {
		return nil, err
	}

	act, err := k.intentKeeper.AddAction(ctx, msg.Creator, msg, intent, msg.Btl)
	if err != nil {
		return nil, err
	}

	return &intenttypes.MsgActionCreated{Action: act}, nil
}

func (k msgServer) newKeyRequestIntent(ctx sdk.Context, space types.Space) (intenttypes.Intent, error) {
	if space.SignIntentId > 0 {
		return k.intentKeeper.GetIntent(ctx, space.SignIntentId)
	} else {
		return space.IntentNewKeyRequest(), nil
	}
}

func (k msgServer) NewKeyRequestActionHandler(ctx sdk.Context, act intenttypes.Action) (proto.Message, error) {
	msg, err := intenttypes.GetActionMessage[*types.MsgNewKeyRequest](k.cdc, act)
	if err != nil {
		return nil, err
	}

	if _, err := k.SpacesKeeper.Get(ctx, msg.SpaceId); err != nil {
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
		IntentId:   msg.IntentId,
	}

	id, err := k.keyRequests.Append(ctx, req)
	if err != nil {
		return nil, err
	}

	return &types.MsgNewKeyRequestResponse{
		Id: id,
	}, nil
}
