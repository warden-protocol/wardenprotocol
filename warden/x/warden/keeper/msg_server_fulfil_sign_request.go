package keeper

import (
	"context"
	"cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func (k msgServer) FulfilSignRequest(goCtx context.Context, msg *types.MsgFulfilSignRequest) (*types.MsgFulfilSignRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	req, err := k.signRequests.Get(ctx, msg.RequestId)
	if err != nil {
		return nil, err
	}

	if req.Status != types.SignRequestStatus_SIGN_REQUEST_STATUS_PENDING {
		return nil, types.ErrRequestNotPending
	}

	key, err := k.KeysKeeper.Get(ctx, req.KeyId)
	if err != nil {
		return nil, err
	}

	keychain, err := k.keychains.Get(ctx, key.KeychainId)
	if err != nil {
		return nil, err
	}

	if !keychain.IsWriter(msg.Creator) {
		return nil, types.ErrNotKeychainWriter
	}

	switch msg.Status {
	case types.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED:
		if err := k.fullfilSignRequest(msg, key, req, ctx); err != nil {
			return nil, err
		}

		if err := k.ReleaseFeesToKeychain(ctx, keychain, req.DeductedKeychainFees); err != nil {
			return nil, err
		}

		err := ctx.EventManager().EmitTypedEvent(&types.EventFulfilSignRequest{
			Id: req.Id,
		})
		if err != nil {
			return nil, err
		}

	case types.SignRequestStatus_SIGN_REQUEST_STATUS_REJECTED:
		if err := k.rejectSignRequest(req, msg, ctx); err != nil {
			return nil, err
		}

		err := k.RefundFeesToCreator(ctx, sdk.MustAccAddressFromBech32(req.Creator), req.DeductedKeychainFees)
		if err != nil {
			return nil, err
		}

		err = ctx.EventManager().EmitTypedEvent(&types.EventRejectSignRequest{
			Id: req.Id,
		})
		if err != nil {
			return nil, err
		}

	default:
		return nil, errors.Wrapf(types.ErrInvalidRequestStatusUpdate, "invalid status field, should be either fulfilled/rejected, got %s", req.Status.String())
	}

	return &types.MsgFulfilSignRequestResponse{}, nil
}
