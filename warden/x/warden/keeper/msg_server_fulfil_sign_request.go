package keeper

import (
	"context"
	"crypto/ed25519"

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
		sigData := (msg.Result.(*types.MsgFulfilSignRequest_Payload)).Payload.SignedData

		// validate that the returned signature is correctly formatted
		switch key.Type {
		case types.KeyType_KEY_TYPE_ECDSA_SECP256K1:
			if l := len(sigData); l != 64 && l != 65 {
				return nil, errors.Wrapf(types.ErrInvalidSignature, "invalid ecdsa signature %x of length %v (expected 64 or 65)", sigData, l)
			}
		case types.KeyType_KEY_TYPE_EDDSA_ED25519:
			if l := len(sigData); l != ed25519.SignatureSize {
				return nil, errors.Wrapf(types.ErrInvalidSignature, "invalid eddsa signature %x of length %v (expected %v)", sigData, l, ed25519.SignatureSize)
			}
		default:
			return nil, errors.Wrap(types.ErrUnsupportedKeyType, key.Type.String())
		}

		// update sign request with signed data
		req.Status = types.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED
		req.Result = &types.SignRequest_SignedData{
			SignedData: sigData,
		}

		if err := k.signRequests.Set(ctx, req.Id, req); err != nil {
			return nil, err
		}

		if err := ctx.EventManager().EmitTypedEvent(&types.EventFulfilSignRequest{
			Id: req.Id,
		}); err != nil {
			return nil, err
		}

	case types.SignRequestStatus_SIGN_REQUEST_STATUS_REJECTED:
		req.Status = types.SignRequestStatus_SIGN_REQUEST_STATUS_REJECTED
		req.Result = &types.SignRequest_RejectReason{
			RejectReason: msg.Result.(*types.MsgFulfilSignRequest_RejectReason).RejectReason,
		}
		if err := k.signRequests.Set(ctx, req.Id, req); err != nil {
			return nil, err
		}

		if err := ctx.EventManager().EmitTypedEvent(&types.EventRejectSignRequest{
			Id: req.Id,
		}); err != nil {
			return nil, err
		}

	default:
		return nil, errors.Wrapf(types.ErrInvalidRequestStatusUpdate, "invalid status field, should be either fulfilled/rejected, got %s", req.Status.String())
	}

	return &types.MsgFulfilSignRequestResponse{}, nil
}
