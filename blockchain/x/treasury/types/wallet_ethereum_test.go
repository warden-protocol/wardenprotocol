package types

import (
	"math/big"
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
		Id:            0,
		WorkspaceAddr: "qredoworkspace14a2hpadpsy9h5m6us54",
		Type:          KeyType_KEY_TYPE_ECDSA_SECP256K1,
		PublicKey:     hexutil.MustDecode("0x025cd45a6614df5348692ea4d0f7c16255b75a6b6f67bea5013621fe84af8031f0"),
	}
	w := &Wallet{
		Id:    0,
		Type:  WalletType_WALLET_TYPE_ETH,
		KeyId: 0,
	}

	wallet, err := NewEthereumWallet(w, k)
	require.NoError(t, err)
	return wallet
}

func Test_ParseEthereumTransaction(t *testing.T) {
	tests := []struct {
		name         string
		b            []byte
		wantTo       string
		wantAmount   *big.Int
		wantContract string
		wantErr      bool
	}{
		{
			name:         "ETH transfer",
			b:            hexutil.MustDecode("0xeb80843b9aca0082520894ea223ca8968ca59e0bc79ba331c2f6f636a3fb82880de0b6b3a764000080808080"),
			wantTo:       "0xeA223Ca8968Ca59e0Bc79Ba331c2F6f636A3fB82",
			wantAmount:   big.NewInt(1000000000000000000),
			wantContract: "",
			wantErr:      false,
		},
		{
			name:         "ERC-20 transfer",
			b:            hexutil.MustDecode("0xf8aa80850b68a0aa0083010d6b94a0b86991c6218b36c1d19d4a2e9eb0ce3606eb4880b844a9059cbb00000000000000000000000048c04ed5691981c42154c6167398f95e8f38a7ff00000000000000000000000000000000000000000000000000000000017d784026a01ad4a933da06f76b08a20784661b2ccc55a8f25492bbc6b66d4b84ef97e1db47a01ab2ff0cd0fb01e2990dd4196412baf173484d91c7f836727d554cdf1cd70c64"),
			wantTo:       "0x48c04ed5691981C42154C6167398f95e8f38a7fF",
			wantAmount:   big.NewInt(25000000),
			wantContract: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
			wantErr:      false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tx, err := ParseEthereumTransaction(tt.b)
			if tt.wantErr {
				require.Error(t, err)
				return
			}
			require.NoError(t, err)
			require.Equal(t, tt.wantTo, tx.To.Hex())
			require.Equal(t, tt.wantAmount, tx.Amount)
			if len(tt.wantContract) == 0 {
				require.Nil(t, tx.Contract)
			} else {
				require.Equal(t, tt.wantContract, tx.Contract.Hex())
			}
		})
	}
}

//
// func Test_ParseERC20Transfer(t *testing.T) {
// 	b := hexutil.MustDecode("0xf8aa80850b68a0aa0083010d6b94a0b86991c6218b36c1d19d4a2e9eb0ce3606eb4880b844a9059cbb00000000000000000000000048c04ed5691981c42154c6167398f95e8f38a7ff00000000000000000000000000000000000000000000000000000000017d784026a01ad4a933da06f76b08a20784661b2ccc55a8f25492bbc6b66d4b84ef97e1db47a01ab2ff0cd0fb01e2990dd4196412baf173484d91c7f836727d554cdf1cd70c64")
// 	tx, err := ParseEthereumTransaction(b)
// 	require.NoError(t, err)
// 	require.Equal(t, "0x48c04ed5691981C42154C6167398f95e8f38a7fF", tx.To.Hex())
// 	require.Equal(t, uint64(25000000), tx.Amount.Uint64())
// 	require.Equal(t, "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", tx.Contract.Hex())
// }
