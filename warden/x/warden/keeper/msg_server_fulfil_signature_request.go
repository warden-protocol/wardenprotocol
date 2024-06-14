package keeper

import (
	"context"
	"crypto/ed25519"
	"fmt"

	"github.com/cosmos/cosmos-sdk/telemetry"
	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

func (k msgServer) FulfilSignatureRequest(goCtx context.Context, msg *types.MsgFulfilSignatureRequest) (*types.MsgFulfilSignatureRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	req, err := k.signatureRequests.Get(ctx, msg.RequestId)
	if err != nil {
		return nil, err
	}

	if req.Status != types.SignRequestStatus_SIGN_REQUEST_STATUS_PENDING {
		return nil, fmt.Errorf("request is not pending, can't be updated")
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
		return nil, fmt.Errorf("only one writer of the keychain can update signature requests")
	}

	switch msg.Status {
	case types.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED:
		sigData := (msg.Result.(*types.MsgFulfilSignatureRequest_Payload)).Payload.SignedData

		// validate that the returned signature is correctly formatted
		switch key.Type {
		case types.KeyType_KEY_TYPE_ECDSA_SECP256K1:
			if l := len(sigData); l != 64 && l != 65 {
				return nil, fmt.Errorf("invalid ecdsa signature %x of length %v", sigData, l)
			}
		case types.KeyType_KEY_TYPE_EDDSA_ED25519:
			if l := len(sigData); l != ed25519.SignatureSize {
				return nil, fmt.Errorf("invalid eddsa signature %x of length %v", sigData, l)
			}
		default:
			return nil, fmt.Errorf("invalid key type: %v", key.Type.String())
		}

		// update sign request with signed data
		req.Status = types.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED
		req.Result = &types.SignRequest_SignedData{
			SignedData: sigData,
		}

		if err := k.signatureRequests.Set(ctx, req.Id, req); err != nil {
			return nil, err
		}

		if err := ctx.EventManager().EmitTypedEvent(&types.EventFulfilSignatureRequest{
			Id: req.Id,
		}); err != nil {
			return nil, err
		}

		telemetry.IncrCounter(1, "fulfill_signature_request", "msg", "count")
	case types.SignRequestStatus_SIGN_REQUEST_STATUS_REJECTED:
		req.Status = types.SignRequestStatus_SIGN_REQUEST_STATUS_REJECTED
		req.Result = &types.SignRequest_RejectReason{
			RejectReason: msg.Result.(*types.MsgFulfilSignatureRequest_RejectReason).RejectReason,
		}
		if err := k.signatureRequests.Set(ctx, req.Id, req); err != nil {
			return nil, err
		}

		if err := ctx.EventManager().EmitTypedEvent(&types.EventRejectSignatureRequest{
			Id: req.Id,
		}); err != nil {
			return nil, err
		}

		telemetry.IncrCounter(1, "reject_signature_request", "msg", "count")
	default:
		return nil, fmt.Errorf("invalid status field, should be either fulfilled/rejected")
	}

	return &types.MsgFulfilSignatureRequestResponse{}, nil
}
