package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"

	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func (k msgServer) NewSignRequest(ctx context.Context, msg *types.MsgNewSignRequest) (*types.MsgNewSignRequestResponse, error) {
	if err := k.assertActAuthority(msg.Authority); err != nil {
		return nil, err
	}

	creator := k.actKeeper.GetActionCreator(ctx)

	key, err := k.KeysKeeper.Get(ctx, msg.KeyId)
	if err != nil {
		return nil, err
	}

	space, err := k.SpacesKeeper.Get(ctx, key.SpaceId)
	if err != nil {
		return nil, err
	}

	if err := space.EnsureNonce(msg.Nonce); err != nil {
		return nil, err
	}

	keychain, err := k.keychains.Get(ctx, key.KeychainId)
	if err != nil {
		return nil, err
	}

	if err := keychain.EnsureSufficientSignFees(msg.MaxKeychainFees); err != nil {
		return nil, err
	}

	if err := k.deductKeychainFees(
		ctx,
		sdk.MustAccAddressFromBech32(creator),
		keychain.Fees.SigReq); err != nil {
		return nil, err
	}

	req := &types.SignRequest{
		Creator:              creator,
		KeyId:                msg.KeyId,
		DataForSigning:       msg.Input,
		Status:               types.SignRequestStatus_SIGN_REQUEST_STATUS_PENDING,
		EncryptionKey:        msg.EncryptionKey,
		DeductedKeychainFees: keychain.Fees.SigReq,
		BroadcastType:        msg.BroadcastType,
	}

	id, err := k.signRequests.Append(ctx, req)
	if err != nil {
		return nil, err
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)
	if err := sdkCtx.EventManager().EmitTypedEvent(&types.EventNewSignRequest{
		Id:            id,
		KeyId:         req.KeyId,
		Creator:       req.Creator,
		BroadcastType: req.BroadcastType,
	}); err != nil {
		return nil, err
	}

	return &types.MsgNewSignRequestResponse{Id: id}, nil
}
