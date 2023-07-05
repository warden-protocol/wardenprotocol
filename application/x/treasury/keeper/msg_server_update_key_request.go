package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
)

func (k msgServer) UpdateKeyRequest(goCtx context.Context, msg *types.MsgUpdateKeyRequest) (*types.MsgUpdateKeyRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !isAllowedToCreateKeys(msg.Creator) {
		return nil, fmt.Errorf("only MPC can update key requests")
	}

	req, found := k.GetKeyRequest(ctx, msg.RequestId)
	if !found {
		return nil, fmt.Errorf("request not found")
	}

	if req.Status != types.KeyRequestStatus_KEY_REQUEST_STATUS_PENDING {
		return nil, fmt.Errorf("request is not pending, can't be updated")
	}

	switch msg.Status {
	case types.KeyRequestStatus_KEY_REQUEST_STATUS_FULFILLED:
		// setup new key
		key := types.Key{
			WorkspaceId: req.WorkspaceId,
			Type:        req.KeyType,
			PublicKey:   (msg.Result.(*types.MsgUpdateKeyRequest_Key)).Key.PublicKey,
		}
		keyID := k.AppendKey(ctx, key)

		// update KeyRequest with newly created key id
		req.Status = types.KeyRequestStatus_KEY_REQUEST_STATUS_FULFILLED
		req.Result = &types.KeyRequest_SuccessKeyId{
			SuccessKeyId: keyID,
		}
		k.SetKeyRequest(ctx, req)

		return &types.MsgUpdateKeyRequestResponse{}, nil

	case types.KeyRequestStatus_KEY_REQUEST_STATUS_REJECTED:
		req.Status = types.KeyRequestStatus_KEY_REQUEST_STATUS_REJECTED
		req.Result = &types.KeyRequest_RejectReason{
			RejectReason: msg.Result.(*types.MsgUpdateKeyRequest_RejectReason).RejectReason,
		}
		k.SetKeyRequest(ctx, req)

	default:
		return nil, fmt.Errorf("invalid status field, should be one of approved/rejected")
	}

	return &types.MsgUpdateKeyRequestResponse{}, nil
}

func isAllowedToCreateKeys(addr string) bool {
	// TODO: check if address belongs to a valid MPC node identity
	return true
}
