package keeper

import (
	"context"
	"crypto/ed25519"
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

	kr := k.identityKeeper.GetKeyring(ctx, req.KeyringAddr)
	if kr == nil || !kr.IsActive {
		return nil, fmt.Errorf("keyring is nil or is inactive")
	}

	if !kr.IsParty(msg.Creator) {
		return nil, fmt.Errorf("only one party of the keyring can update key request")
	}

	if req.Status != types.KeyRequestStatus_KEY_REQUEST_STATUS_PENDING {
		return nil, fmt.Errorf("request is not pending, can't be updated")
	}

	switch msg.Status {
	case types.KeyRequestStatus_KEY_REQUEST_STATUS_FULFILLED:

		pubKey := (msg.Result.(*types.MsgUpdateKeyRequest_Key)).Key.PublicKey

		//
		// validate that the returned public key is correctly formatted
		//
		switch req.KeyType {
		case types.KeyType_KEY_TYPE_ECDSA_SECP256K1:
			if l := len(pubKey); l != 33 && l != 65 {
				return nil, fmt.Errorf("invalid ecdsa public key %x of length %v", pubKey, l)
			}
		case types.KeyType_KEY_TYPE_EDDSA_ED25519:
			if l := len(pubKey); l != ed25519.PublicKeySize {
				return nil, fmt.Errorf("invalid eddsa public key %x of length %v", pubKey, l)
			}
		default:
			return nil, fmt.Errorf("invalid key type: %v", req.KeyType.String())
		}
		// setup new key
		key := &types.Key{
			WorkspaceAddr: req.WorkspaceAddr,
			KeyringAddr:   req.KeyringAddr,
			Type:          req.KeyType,
			PublicKey:     pubKey,
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
