package types

import (
	"testing"

	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/stretchr/testify/require"
)

func Test_EthereumWallet_Address(t *testing.T) {
	wallet := ethereumWallet(t)
	require.Equal(t, "0xdD1d3fF09C5EdfF1bE7d466cA614cB1cF3f78738", wallet.Address())
}

func ethereumWallet(t *testing.T) *EthereumWallet {
	t.Helper()
	k := &Key{
		Id:          0,
		WorkspaceId: 0,
		Type:        KeyType_KEY_TYPE_ECDSA_SECP256K1,
		PublicKey:   hexutil.MustDecode("0x025cd45a6614df5348692ea4d0f7c16255b75a6b6f67bea5013621fe84af8031f0"),
	}
	w := &Wallet{
		Id:    0,
		Type:  WalletType_WALLET_TYPE_ETHEREUM,
		KeyId: 0,
	}

	wallet, err := NewEthereumWallet(w, k)
	require.NoError(t, err)
	return wallet
}
