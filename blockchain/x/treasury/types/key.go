package types

import (
	"crypto/ecdsa"
	fmt "fmt"

	"github.com/ethereum/go-ethereum/crypto"
)

// revive:disable-next-line var-naming // nolint:stylecheck,ST1003
func (k *Key) SetId(id uint64) { k.Id = id }

// revive:disable-next-line var-naming // nolint:stylecheck,ST1003
func (kr *KeyRequest) SetId(id uint64) { kr.Id = id }

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

// ToECDSASecp256k1 returns the key parsed as a ECDSA secp256k1 public key.
// It can be parssed as a compressed or uncompressed key.
func (k *Key) ToECDSASecp256k1() (*ecdsa.PublicKey, error) {
	if k.Type != KeyType_KEY_TYPE_ECDSA_SECP256K1 {
		return nil, fmt.Errorf("invalid key type, expected %s, got %s", KeyType_KEY_TYPE_ECDSA_SECP256K1, k.Type)
	}

	var pk *ecdsa.PublicKey

	if len(k.PublicKey) == 33 {
		// Compressed form
		var err error
		pk, err = crypto.DecompressPubkey(k.PublicKey)
		if err != nil {
			return nil, err
		}
	} else {
		// Uncompressed form
		var err error
		pk, err = crypto.UnmarshalPubkey(k.PublicKey)
		if err != nil {
			return nil, err
		}
	}

	return pk, nil
}
