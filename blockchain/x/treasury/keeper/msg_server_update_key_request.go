package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/qredo/fusionchain/x/treasury/types"
)

func (k msgServer) UpdateKeyRequest(goCtx context.Context, msg *types.MsgUpdateKeyRequest) (*types.MsgUpdateKeyRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	req, found := k.KeyRequestsRepo().Get(ctx, msg.RequestId)
	if !found {
		return nil, fmt.Errorf("request not found")
	}

	kr, found := k.identityKeeper.KeyringsRepo().Get(ctx, req.KeyringId)
	if !found {
		return nil, fmt.Errorf("keyring not found")
	}

	if !kr.IsParty(msg.Creator) {
		return nil, fmt.Errorf("only one party of the keyring can update key request")
	}

	if req.Status != types.KeyRequestStatus_KEY_REQUEST_STATUS_PENDING {
		return nil, fmt.Errorf("request is not pending, can't be updated")
	}

	switch msg.Status {
	case types.KeyRequestStatus_KEY_REQUEST_STATUS_FULFILLED:
		// setup new key
		key := &types.Key{
			WorkspaceAddr: req.WorkspaceAddr,
			Type:          req.KeyType,
			PublicKey:     (msg.Result.(*types.MsgUpdateKeyRequest_Key)).Key.PublicKey,
		}
		k.appendKey(ctx, key, req)

		req.Status = types.KeyRequestStatus_KEY_REQUEST_STATUS_FULFILLED
		k.KeyRequestsRepo().Set(ctx, req)

		return &types.MsgUpdateKeyRequestResponse{}, nil

	case types.KeyRequestStatus_KEY_REQUEST_STATUS_REJECTED:
		req.Status = types.KeyRequestStatus_KEY_REQUEST_STATUS_REJECTED
		req.RejectReason = msg.Result.(*types.MsgUpdateKeyRequest_RejectReason).RejectReason
		k.KeyRequestsRepo().Set(ctx, req)

	default:
		return nil, fmt.Errorf("invalid status field, should be either fulfilled/rejected")
	}

	return &types.MsgUpdateKeyRequestResponse{}, nil
}
