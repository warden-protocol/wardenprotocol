package exec

import (
	"context"
	"crypto/ecdsa"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
	"math/big"
	"testing"
)

func (cli *Wardend) CallOps(t *testing.T) *bind.CallOpts {
	return &bind.CallOpts{
		Pending:     false,
		From:        common.HexToAddress(cli.Address(t)),
		BlockNumber: nil,
		Context:     nil,
	}
}

func (cli *Wardend) EthAddress(t *testing.T) common.Address {
	privateKey, err := crypto.HexToECDSA(cli.PrivateKey(t))
	if err != nil {
		t.Fatal(err)
	}

	publicKey := privateKey.Public()
	publicKeyECDSA, ok := publicKey.(*ecdsa.PublicKey)
	if !ok {
		t.Fatal("cannot assert type: publicKey is not of type *ecdsa.PublicKey")
	}

	return crypto.PubkeyToAddress(*publicKeyECDSA)
}

func (cli *Wardend) TransactOps(
	t *testing.T,
	ctx context.Context,
	client *ethclient.Client) *bind.TransactOpts {
	privateKey, err := crypto.HexToECDSA(cli.PrivateKey(t))
	if err != nil {
		t.Fatal(err)
	}

	fromAddress := cli.EthAddress(t)

	nonce, err := client.PendingNonceAt(ctx, fromAddress)
	if err != nil {
		t.Fatal(err)
	}

	gasPrice, err := client.SuggestGasPrice(ctx)
	if err != nil {
		t.Fatal(err)
	}

	auth, err := bind.NewKeyedTransactorWithChainID(privateKey, big.NewInt(1337))
	if err != nil {
		t.Fatal(err)
	}

	auth.Nonce = big.NewInt(int64(nonce))
	auth.Value = big.NewInt(0)     // in wei
	auth.GasLimit = uint64(300000) // in units
	auth.GasPrice = gasPrice

	return auth
}
