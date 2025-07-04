package exec

import (
	"crypto/ecdsa"
	"math/big"
	"testing"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/stretchr/testify/require"
)

type WardendEth struct {
	*Wardend
	Client     EthClient
	From       common.Address
	PrivateKey *ecdsa.PrivateKey
}

func NewWardendEth(t *testing.T, node *WardenNode, name string) *WardendEth {
	w := NewWardend(node, name)

	client, err := ethclient.Dial(node.jsonRpcAddr())
	require.NoError(t, err)

	privateKey, err := crypto.HexToECDSA(w.PrivateKey(t))
	require.NoError(t, err)

	publicKey := privateKey.Public()
	publicKeyECDSA, ok := publicKey.(*ecdsa.PublicKey)
	require.True(t, ok, "cannot assert type: publicKey is not of type *ecdsa.PublicKey")

	from := crypto.PubkeyToAddress(*publicKeyECDSA)

	return &WardendEth{
		Wardend:    w,
		Client:     EthClient{client},
		From:       from,
		PrivateKey: privateKey,
	}
}

func (cli *WardendEth) CallOps(t *testing.T) *bind.CallOpts {
	return &bind.CallOpts{
		Pending:     false,
		From:        cli.From,
		BlockNumber: nil,
		Context:     nil,
	}
}

func (cli *WardendEth) TransactOps(t *testing.T) *bind.TransactOpts {
	nonce, err := cli.Client.PendingNonceAt(t.Context(), cli.From)
	require.NoError(t, err)

	gasPrice, err := cli.Client.SuggestGasPrice(t.Context())
	require.NoError(t, err)

	auth, err := bind.NewKeyedTransactorWithChainID(cli.PrivateKey, big.NewInt(1337))
	require.NoError(t, err)

	auth.Nonce = big.NewInt(int64(nonce))
	auth.Value = big.NewInt(0)          // in wei
	auth.GasLimit = uint64(10000000000) // in units
	auth.GasPrice = gasPrice

	return auth
}

type EthClient struct {
	*ethclient.Client
}

func (c EthClient) WaitDeployed(t *testing.T, tx *types.Transaction) common.Address {
	addr, err := bind.WaitDeployed(t.Context(), c.Client, tx)
	require.NoError(t, err)
	return addr
}

func (c EthClient) WaitMined(t *testing.T, tx *types.Transaction, status uint64) *types.Receipt {
	receipt, err := bind.WaitMined(t.Context(), c.Client, tx)
	require.NoError(t, err)
	require.Equal(t, status, receipt.Status)
	return receipt
}

func (c EthClient) WaitMinedSuccess(t *testing.T, tx *types.Transaction) *types.Receipt {
	return c.WaitMined(t, tx, types.ReceiptStatusSuccessful)
}

func (c EthClient) WaitMinedFail(t *testing.T, tx *types.Transaction) *types.Receipt {
	return c.WaitMined(t, tx, types.ReceiptStatusFailed)
}
