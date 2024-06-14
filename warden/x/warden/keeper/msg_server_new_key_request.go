package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/telemetry"
	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

func (k msgServer) NewKeyRequest(ctx context.Context, msg *types.MsgNewKeyRequest) (*types.MsgNewKeyRequestResponse, error) {
	if err := k.assertActAuthority(msg.Authority); err != nil {
		return nil, err
	}

	creator := k.actKeeper.GetActionCreator(ctx)

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
			sdk.MustAccAddressFromBech32(creator),
			keychain.AccAddress(),
			keychain.Fees.KeyReq,
		)
		if err != nil {
			return nil, err
		}
	}

	req := &types.KeyRequest{
		Creator:    creator,
		SpaceId:    msg.SpaceId,
		KeychainId: msg.KeychainId,
		KeyType:    msg.KeyType,
		Status:     types.KeyRequestStatus_KEY_REQUEST_STATUS_PENDING,
		RuleId:     msg.RuleId,
	}

	id, err := k.keyRequests.Append(ctx, req)
	if err != nil {
		return nil, err
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)
	if err := sdkCtx.EventManager().EmitTypedEvent(&types.EventNewKeyRequest{
		Id:         id,
		SpaceId:    req.SpaceId,
		KeychainId: req.KeychainId,
		RuleId:     req.RuleId,
		KeyType:    req.KeyType,
		Creator:    req.Creator,
	}); err != nil {
		return nil, err
	}

	telemetry.IncrCounter(1, "new_key_request", "msg", "count")

	return &types.MsgNewKeyRequestResponse{
		Id: id,
	}, nil
}
