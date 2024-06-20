package keychain

import (
	"crypto/ecdsa"
	"crypto/rand"

	ethcrypto "github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/crypto/ecies"
)

func ValidateEncryptionKey(pub []byte) error {
	if len(pub) == 0 {
		return nil
	}
	_, err := parseECDSAPublicKey(pub)
	return err
}

func Encrypt(pub []byte, data []byte) ([]byte, error) {
	pubKey, err := parseECDSAPublicKey(pub)
	if err != nil {
		return nil, err
	}

	encKey := ecies.ImportECDSAPublic(pubKey)
	encryptedPayload, err := ecies.Encrypt(rand.Reader, encKey, data, nil, nil)
	if err != nil {
		return nil, err
	}

	return encryptedPayload, nil
}

func parseECDSAPublicKey(pub []byte) (*ecdsa.PublicKey, error) {
	return ethcrypto.DecompressPubkey(pub)
}
