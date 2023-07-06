package types

import (
	"crypto/ecdsa"
	"crypto/sha256"
	"fmt"
	"math/big"
	"math/rand"
	"testing"

	"github.com/btcsuite/btcd/btcec"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/stretchr/testify/require"
)

func Test_FusionWallet_Address(t *testing.T) {
	wallet := fusionWallet(t)
	require.Equal(t, "0xdD1d3fF09C5EdfF1bE7d466cA614cB1cF3f78738", wallet.Address())
}

func fusionWallet(t *testing.T) *FusionWallet {
	t.Helper()
	seed := "example seed"
	privateKey, err := generatePrivateKey(seed)
	if err != nil {
		panic(err)
	}
	pubKeyCompressed := compressPublicKey(privateKey.PublicKey)
	fmt.Println(hexutil.Encode(pubKeyCompressed))

	k := &Key{
		Id:          0,
		WorkspaceId: 0,
		Type:        KeyType_KEY_TYPE_ECDSA,
		PublicKey:   pubKeyCompressed,
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

func generatePrivateKey(seed string) (*ecdsa.PrivateKey, error) {
	seedBytes := []byte(seed)
	hashedSeed := sha256.Sum256([]byte("example seed"))
	r := rand.New(rand.NewSource(int64(hashedSeed[0])))

	privateKey, err := ecdsa.GenerateKey(btcec.S256(), r)
	if err != nil {
		return nil, err
	}
	privateKey.D = new(big.Int).SetBytes(seedBytes)

	return privateKey, nil
}

// TODO Fix this
func compressPublicKey(pubKey ecdsa.PublicKey) []byte {
	xBytes := pubKey.X.Bytes()
	compressed := make([]byte, 33)
	if pubKey.Y.Bit(0) == 0 {
		compressed[0] = 2
	} else {
		compressed[0] = 3
	}
	copy(compressed[1:], xBytes)

	return compressed
}
