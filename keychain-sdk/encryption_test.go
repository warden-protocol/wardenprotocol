package keychain

import (
	"testing"

	ethcrypto "github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/crypto/ecies"
	"github.com/stretchr/testify/require"
)

func TestEncrypt(t *testing.T) {
	// generate a new key pair
	privKey, err := ethcrypto.GenerateKey()
	require.NoError(t, err)
	pk := ethcrypto.CompressPubkey(&privKey.PublicKey)

	// encrypt a message
	encMsg, err := Encrypt(pk, []byte("test"))
	require.NoError(t, err)

	// decrypt the message using the private key
	eciesKey := ecies.ImportECDSA(privKey)
	msg, err := eciesKey.Decrypt(encMsg, nil, nil)
	require.NoError(t, err)

	require.Equal(t, []byte("test"), msg)
}
