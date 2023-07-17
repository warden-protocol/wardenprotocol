package types

import (
	"crypto/ecdsa"
	"crypto/sha256"
	"log"
	"math/big"
	"testing"

	"github.com/btcsuite/btcd/btcec"
	"github.com/stretchr/testify/require"
)

func Test_FusionWallet_Address(t *testing.T) {
	wallet := fusionWallet(t)
	require.Equal(t, "qredo1egz60et40xxzm5rhtlj7caskpvqmqujrdrfqt7", wallet.Address())
}

func fusionWallet(t *testing.T) *FusionWallet {
	t.Helper()
	hashedSeed := sha256.Sum256([]byte("example seed"))
	privateKey := new(ecdsa.PrivateKey)
	privateKey.PublicKey.Curve = btcec.S256()
	privateKey.D = new(big.Int).SetBytes(hashedSeed[:])
	privateKey.PublicKey.X, privateKey.PublicKey.Y = privateKey.PublicKey.Curve.ScalarBaseMult(hashedSeed[:])
	pkECDSA, ok := privateKey.Public().(*ecdsa.PublicKey)
	if !ok {
		log.Fatal("Failed to get ECDSA public key")
	}
	publicKey := btcec.PublicKey{
		Curve: pkECDSA.Curve,
		X:     pkECDSA.X,
		Y:     pkECDSA.Y,
	}
	k := &Key{
		Id:          0,
		WorkspaceId: 0,
		Type:        KeyType_KEY_TYPE_ECDSA_SECP256K1,
		PublicKey:   publicKey.SerializeCompressed(),
	}
	w := &Wallet{
		Id:    0,
		Type:  WalletType_WALLET_TYPE_FUSION,
		KeyId: 0,
	}
	wallet, err := NewFusionWallet(w, k)
	require.NoError(t, err)
	return wallet
}
