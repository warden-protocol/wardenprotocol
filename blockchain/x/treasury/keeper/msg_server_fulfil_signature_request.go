package keeper

import (
	"context"
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
		signedData := (msg.Result.(*types.MsgFulfilSignatureRequest_Payload)).Payload.SignedData

		// update sign request with signed data
		req.Status = types.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED
		req.Result = &types.SignRequest_SignedData{
			SignedData: signedData,
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
