package keeper

import (
	"cosmossdk.io/errors"
	"crypto/ed25519"
	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func (k Keeper) fullfilSignRequest(msg *types.MsgFulfilSignRequest, key types.Key, req types.SignRequest, ctx sdk.Context) error {
	sigData := (msg.Result.(*types.MsgFulfilSignRequest_Payload)).Payload.SignedData

	if err := ensureSignatureFormatting(key, sigData); err != nil {
		return err
	}

	// update sign request with signed data
	req.Status = types.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED
	req.Result = &types.SignRequest_SignedData{
		SignedData: sigData,
	}

	if err := k.signRequests.Set(ctx, req.Id, req); err != nil {
		return err
	}

	return nil
}

func ensureSignatureFormatting(key types.Key, sigData []byte) error {
	switch key.Type {
	case types.KeyType_KEY_TYPE_ECDSA_SECP256K1:
		if l := len(sigData); l != 64 && l != 65 {
			return errors.Wrapf(types.ErrInvalidSignature, "invalid ecdsa signature %x of length %v (expected 64 or 65)", sigData, l)
		}
	case types.KeyType_KEY_TYPE_EDDSA_ED25519:
		if l := len(sigData); l != ed25519.SignatureSize {
			return errors.Wrapf(types.ErrInvalidSignature, "invalid eddsa signature %x of length %v (expected %v)", sigData, l, ed25519.SignatureSize)
		}
	default:
		return errors.Wrap(types.ErrUnsupportedKeyType, key.Type.String())
	}
	return nil
}

func (k Keeper) rejectSignRequest(req types.SignRequest, msg *types.MsgFulfilSignRequest, ctx sdk.Context) error {
	req.Status = types.SignRequestStatus_SIGN_REQUEST_STATUS_REJECTED
	req.Result = &types.SignRequest_RejectReason{
		RejectReason: msg.Result.(*types.MsgFulfilSignRequest_RejectReason).RejectReason,
	}
	if err := k.signRequests.Set(ctx, req.Id, req); err != nil {
		return err
	}

	return nil
}
