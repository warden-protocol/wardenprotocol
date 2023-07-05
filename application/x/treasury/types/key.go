package types

import (
	"crypto/ecdsa"
	fmt "fmt"

	"github.com/ethereum/go-ethereum/crypto"
)

// NewMsgUpdateKeyRequestKey is a utility function to generate a new successful
// UpdateKeyRequest result.
func NewMsgUpdateKeyRequestKey(publicKey []byte) isMsgUpdateKeyRequest_Result {
	return &MsgUpdateKeyRequest_Key{
		Key: &MsgNewKey{
			PublicKey: publicKey,
		},
	}
}

// NewMsgUpdateKeyRequestReject is a utility function to generate a new errored
// UpdateKeyRequest result.
func NewMsgUpdateKeyRequestReject(reason string) isMsgUpdateKeyRequest_Result {
	return &MsgUpdateKeyRequest_RejectReason{
		RejectReason: reason,
	}
}

// ToECDSA returns the key parsed as a compressed (33 bytes) ECDSA secp256k1 public key.
func (k *Key) ToECDSA() (*ecdsa.PublicKey, error) {
	if k.Type != KeyType_KEY_TYPE_ECDSA {
		return nil, fmt.Errorf("invalid key type, expected %s, got %s", KeyType_KEY_TYPE_ECDSA, k.Type)
	}

	pk, err := crypto.DecompressPubkey(k.PublicKey)
	if err != nil {
		return nil, err
	}

	return pk, nil
}
