package v1beta2

import (
	"crypto/ed25519"
	"crypto/sha256"
	"testing"

	"github.com/stretchr/testify/require"
)

var _ Wallet = &SuiWallet{}

func Test_SuiWallet_Address(t *testing.T) {
	wallet := suiWallet(t)
	require.Equal(t, "0xa698fe128e021304c14101e955838e37a86ca097fa856025d5f5de49c295a6e9", wallet.Address())
}

func suiWallet(t *testing.T) *SuiWallet {
	t.Helper()
	hashedSeed := sha256.Sum256([]byte("example seed"))

	// Generate Ed25519 private key from the hashed seed
	privateKey := ed25519.NewKeyFromSeed(hashedSeed[:])

	// Get the public key from the private key
	var publicKeyBytes = privateKey.Public().(ed25519.PublicKey)

	k := &Key{
		Type:      KeyType_KEY_TYPE_EDDSA_ED25519,
		PublicKey: publicKeyBytes,
	}

	wallet, err := NewSuiWallet(k)
	require.NoError(t, err)
	return wallet
}
