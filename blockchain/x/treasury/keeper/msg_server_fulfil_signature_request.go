package keeper

import (
	"context"
	"crypto/ed25519"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/x/treasury/types"
)

func (k msgServer) FulfilSignatureRequest(goCtx context.Context, msg *types.MsgFulfilSignatureRequest) (*types.MsgFulfilSignatureRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// if !isAllowedToCreateSignatures(msg.Creator) {
	// 	return nil, fmt.Errorf("only MPC can sign data")
	// }

	req, found := k.SignatureRequestsRepo().Get(ctx, msg.RequestId)
	if !found {
		return nil, fmt.Errorf("request not found")
	}

	if req.Status != types.SignRequestStatus_SIGN_REQUEST_STATUS_PENDING {
		return nil, fmt.Errorf("request is not pending, can't be updated")
	}

	switch msg.Status {
	case types.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED:

		sigData := (msg.Result.(*types.MsgFulfilSignatureRequest_Payload)).Payload.SignedData

		//
		// validate that the returned signature is correctly formatted
		//
		switch req.KeyType {
		case types.KeyType_KEY_TYPE_ECDSA_SECP256K1:
			if l := len(sigData); l != 64 && l != 65 {
				return nil, fmt.Errorf("invalid ecdsa signature %x of length %v", sigData, l)
			}
		case types.KeyType_KEY_TYPE_EDDSA_ED25519:
			if l := len(sigData); l != ed25519.SignatureSize {
				return nil, fmt.Errorf("invalid eddsa signature %x of length %v", sigData, l)
			}
		default:
			return nil, fmt.Errorf("invalid key type: %v", req.KeyType.String())
		}

		// update sign request with signed data
		req.Status = types.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED
		req.Result = &types.SignRequest_SignedData{
			SignedData: sigData,
		}
		k.SignatureRequestsRepo().Set(ctx, req)

		return &types.MsgFulfilSignatureRequestResponse{}, nil

	case types.SignRequestStatus_SIGN_REQUEST_STATUS_REJECTED:
		req.Status = types.SignRequestStatus_SIGN_REQUEST_STATUS_REJECTED
		req.Result = &types.SignRequest_RejectReason{
			RejectReason: msg.Result.(*types.MsgFulfilSignatureRequest_RejectReason).RejectReason,
		}
		k.SignatureRequestsRepo().Set(ctx, req)

	default:
		return nil, fmt.Errorf("invalid status field, should be either fulfilled/rejected")
	}

	return &types.MsgFulfilSignatureRequestResponse{}, nil
}
