package types

import (
	"crypto/sha256"
	"log"
	"testing"

	"github.com/ethereum/go-ethereum/crypto"
	"github.com/stretchr/testify/require"
)

func Test_FusionWallet_Address(t *testing.T) {
	wallet := fusionWallet(t)
	require.Equal(t, "qredo1egz60et40xxzm5rhtlj7caskpvqmqujrdrfqt7", wallet.Address())
}

func fusionWallet(t *testing.T) *FusionWallet {
	t.Helper()
	hashedSeed := sha256.Sum256([]byte("example seed"))

	// Generate secp256k1 private key from the hashed seed
	privateKey, err := crypto.ToECDSA(hashedSeed[:])
	if err != nil {
		log.Fatal("Failed to generate private key:", err)
	}

	// Serialize the public key in a compressed format
	publicKeyBytes := crypto.CompressPubkey(&privateKey.PublicKey)

	k := &Key{
		Id:            0,
		WorkspaceAddr: "qredoworkspace14a2hpadpsy9h5m6us54",
		Type:          KeyType_KEY_TYPE_ECDSA_SECP256K1,
		PublicKey:     publicKeyBytes,
	}

	wallet, err := NewFusionWallet(k)
	require.NoError(t, err)
	return wallet
}
