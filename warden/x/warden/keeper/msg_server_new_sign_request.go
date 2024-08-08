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

	_, err = k.SpacesKeeper.Get(ctx, key.SpaceId)
	if err != nil {
		return nil, err
	}

	keychain, err := k.keychains.Get(ctx, key.KeychainId)
	if err != nil {
		return nil, err
	}

	if keychain.Fees != nil {
		err := k.deductKeychainFees(ctx, msg.MaxKeychainFees, keychain.AccAddress(), keychain.Fees.KeyReq, creator)
		if err != nil {
			return nil, err
		}
	}

	req := &types.SignRequest{
		Creator:        creator,
		KeyId:          msg.KeyId,
		DataForSigning: msg.Input,
		Status:         types.SignRequestStatus_SIGN_REQUEST_STATUS_PENDING,
		EncryptionKey:  msg.EncryptionKey,
	}

	id, err := k.signRequests.Append(ctx, req)
	if err != nil {
		return nil, err
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)
	if err := sdkCtx.EventManager().EmitTypedEvent(&types.EventNewSignRequest{
		Id:      id,
		KeyId:   req.KeyId,
		Creator: req.Creator,
	}); err != nil {
		return nil, err
	}

	return &types.MsgNewSignRequestResponse{Id: id}, nil
}
