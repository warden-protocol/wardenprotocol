package keeper

import (
	"context"
	"fmt"

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
		err := chargeKeychainFee(&k, ctx, msg.MaxFees, keychain.AccAddress(), keychain.Fees.SigReq, creator)
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

func chargeKeychainFee(
	k *msgServer,
	ctx context.Context,
	requestedFee sdk.Coin,
	keychainAccAddress sdk.AccAddress,
	keychainFees sdk.Coins,
	creator string) error {
	found, feeInCoin := keychainFees.Find(requestedFee.Denom)
	if !found {
		return fmt.Errorf("requested fee denom could not be accepted")
	}

	if !requestedFee.IsGTE(feeInCoin) {
		return fmt.Errorf("requested fee amount is less than accepted by keychain:d %v", feeInCoin)
	}

	err := k.bankKeeper.SendCoins(
		ctx,
		sdk.MustAccAddressFromBech32(creator),
		keychainAccAddress,
		keychainFees,
	)

	return err
}
