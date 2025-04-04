package exec

import (
	"crypto/ecdsa"
	"math/big"
	"testing"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/stretchr/testify/require"
)

func (cli *Wardend) CallOps(t *testing.T) *bind.CallOpts {
	return &bind.CallOpts{
		Pending:     false,
		From:        cli.EthAddress(t),
		BlockNumber: nil,
		Context:     nil,
	}
}

func (cli *Wardend) EthAddress(t *testing.T) common.Address {
	privateKey, err := crypto.HexToECDSA(cli.PrivateKey(t))
	require.NoError(t, err)

	publicKey := privateKey.Public()
	publicKeyECDSA, ok := publicKey.(*ecdsa.PublicKey)
	require.True(t, ok, "cannot assert type: publicKey is not of type *ecdsa.PublicKey")

	return crypto.PubkeyToAddress(*publicKeyECDSA)
}

func (cli *Wardend) TransactOps(
	t *testing.T,
	client *ethclient.Client,
) *bind.TransactOpts {
	privateKey, err := crypto.HexToECDSA(cli.PrivateKey(t))
	require.NoError(t, err)

	fromAddress := cli.EthAddress(t)

	nonce, err := client.PendingNonceAt(t.Context(), fromAddress)
	require.NoError(t, err)

	gasPrice, err := client.SuggestGasPrice(t.Context())
	require.NoError(t, err)

	auth, err := bind.NewKeyedTransactorWithChainID(privateKey, big.NewInt(1337))
	require.NoError(t, err)

	auth.Nonce = big.NewInt(int64(nonce))
	auth.Value = big.NewInt(0)      // in wei
	auth.GasLimit = uint64(1000000) // in units
	auth.GasPrice = gasPrice

	return auth
}
