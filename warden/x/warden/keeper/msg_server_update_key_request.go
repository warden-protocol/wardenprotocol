package keeper

import (
	"context"
	"crypto/ed25519"
	"fmt"

	"github.com/cosmos/cosmos-sdk/telemetry"
	sdk "github.com/cosmos/cosmos-sdk/types"

	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

func (k msgServer) UpdateKeyRequest(goCtx context.Context, msg *types.MsgUpdateKeyRequest) (*types.MsgUpdateKeyRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	req, err := k.keyRequests.Get(ctx, msg.RequestId)
	if err != nil {
		return nil, err
	}

	kr, err := k.keychains.Get(ctx, req.KeychainId)
	if err != nil {
		return nil, err
	}

	if !kr.IsWriter(msg.Creator) {
		return nil, fmt.Errorf("only one writer of the keychain can update key request")
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
		key := types.Key{
			SpaceId:    req.SpaceId,
			KeychainId: req.KeychainId,
			Type:       req.KeyType,
			PublicKey:  pubKey,
			RuleId:     req.RuleId,
		}

		if err := k.KeysKeeper.New(ctx, key, req); err != nil {
			return nil, err
		}

		req.Status = types.KeyRequestStatus_KEY_REQUEST_STATUS_FULFILLED
		err := k.keyRequests.Set(ctx, req.Id, req)
		if err != nil {
			return nil, err
		}

		if err := ctx.EventManager().EmitTypedEvent(&types.EventNewKey{
			Id:         key.Id,
			KeyType:    key.Type,
			SpaceId:    key.SpaceId,
			KeychainId: key.KeychainId,
			RuleId:     key.RuleId,
		}); err != nil {
			return nil, err
		}
		telemetry.IncrCounter(1, "update_key_request", "msg", "count")

	case types.KeyRequestStatus_KEY_REQUEST_STATUS_REJECTED:
		req.Status = types.KeyRequestStatus_KEY_REQUEST_STATUS_REJECTED
		req.RejectReason = msg.Result.(*types.MsgUpdateKeyRequest_RejectReason).RejectReason
		err := k.keyRequests.Set(ctx, req.Id, req)
		if err != nil {
			return nil, err
		}

		if err := ctx.EventManager().EmitTypedEvent(&types.EventRejectKeyRequest{
			Id: req.Id,
		}); err != nil {
			return nil, err
		}

		telemetry.IncrCounter(1, "update_key_request", "msg", "count")

	default:
		return nil, fmt.Errorf("invalid status field, should be either fulfilled/rejected")
	}

	return &types.MsgUpdateKeyRequestResponse{}, nil
}
