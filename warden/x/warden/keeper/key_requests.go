package keeper

import (
	"cosmossdk.io/errors"
	"crypto/ed25519"
	sdk "github.com/cosmos/cosmos-sdk/types"

	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func (k Keeper) fulfillKeyRequest(msg *types.MsgFulfilKeyRequest, req types.KeyRequest, ctx sdk.Context) (*types.Key, error) {
	pubKey := (msg.Result.(*types.MsgFulfilKeyRequest_Key)).Key.PublicKey

	err := ensureKeyFormatting(req, pubKey)
	if err != nil {
		return nil, err
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

	if err := k.keyRequests.Set(ctx, req.Id, req); err != nil {
		return nil, err
	}

	return &key, nil
}

func ensureKeyFormatting(req types.KeyRequest, pubKey []byte) error {
	switch req.KeyType {
	case types.KeyType_KEY_TYPE_ECDSA_SECP256K1:
		if l := len(pubKey); l != 33 && l != 65 {
			return errors.Wrapf(types.ErrInvalidKey, "ecdsa public key %x of length %v (expected 33 or 65)", pubKey, l)
		}
	case types.KeyType_KEY_TYPE_EDDSA_ED25519:
		if l := len(pubKey); l != ed25519.PublicKeySize {
			return errors.Wrapf(types.ErrInvalidKey, "eddsa public key %x of length %v (expected %v)", pubKey, l, ed25519.PublicKeySize)
		}
	default:
		return errors.Wrap(types.ErrUnsupportedKeyType, req.KeyType.String())
	}
	return nil
}

func (k Keeper) rejectKeyRequest(msg *types.MsgFulfilKeyRequest, req types.KeyRequest, ctx sdk.Context) error {
	req.Status = types.KeyRequestStatus_KEY_REQUEST_STATUS_REJECTED
	req.RejectReason = msg.Result.(*types.MsgFulfilKeyRequest_RejectReason).RejectReason

	if err := k.keyRequests.Set(ctx, req.Id, req); err != nil {
		return err
	}

	return nil
}
