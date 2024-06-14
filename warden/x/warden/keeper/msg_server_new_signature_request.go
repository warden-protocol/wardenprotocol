package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"

	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

func (k msgServer) NewSignatureRequest(ctx context.Context, msg *types.MsgNewSignatureRequest) (*types.MsgNewSignatureRequestResponse, error) {
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
		err := k.bankKeeper.SendCoins(
			ctx,
			sdk.MustAccAddressFromBech32(creator),
			keychain.AccAddress(),
			keychain.Fees.SigReq,
		)
		if err != nil {
			return nil, err
		}
	}

	// parse tx based on SignMethod
	handler, err := types.NewSignMethodHandler(&key, msg.SignMethod)
	if err != nil {
		return nil, err
	}

	var meta types.Metadata
	if err := k.cdc.UnpackAny(msg.Metadata, &meta); err != nil {
		return nil, fmt.Errorf("failed to unpack metadata: %w", err)
	}
	transfer, err := handler.Handle(msg.Input, meta)
	if err != nil {
		return nil, fmt.Errorf("failed to parse tx: %w", err)
	}

	req := &types.SignRequest{
		Creator:        creator,
		KeyId:          msg.KeyId,
		DataForSigning: transfer.DataForSigning,
		Status:         types.SignRequestStatus_SIGN_REQUEST_STATUS_PENDING,
		EncryptionKey:  msg.EncryptionKey,
	}

	id, err := k.signatureRequests.Append(ctx, req)
	if err != nil {
		return nil, err
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)
	if err := sdkCtx.EventManager().EmitTypedEvent(&types.EventNewSignatureRequest{
		Id:      id,
		KeyId:   req.KeyId,
		Creator: req.Creator,
	}); err != nil {
		return nil, err
	}

	return &types.MsgNewSignatureRequestResponse{Id: id}, nil
}
