package types

import (
	"bytes"
	"crypto/ecdsa"
	"fmt"
	"math/big"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
)

type EthereumWallet struct {
	wallet *Wallet
	key    *ecdsa.PublicKey
}

var _ WalletI = &EthereumWallet{}

func NewEthereumWallet(w *Wallet, k *Key) (*EthereumWallet, error) {
	pk, err := k.ToECDSASecp256k1()
	if err != nil {
		return nil, err
	}
	return &EthereumWallet{wallet: w, key: pk}, nil
}

func (w *EthereumWallet) Address() string {
	addr := crypto.PubkeyToAddress(*w.key)
	return addr.Hex()
}

func (w *EthereumWallet) ParseTx(b []byte) (Transfer, error) {
	tx, err := ParseEthereumTransaction(b)
	if err != nil {
		return Transfer{}, err
	}

	return Transfer{
		To:             tx.To.Bytes(),
		Amount:         tx.Amount,
		CoinIdentifier: tx.Contract.Bytes(),
	}, nil
}

// EthereumTransfer represents an ETH transfer or an ERC-20 transfer on the
// Ethereum blockchain.
type EthereumTransfer struct {
	// To is the destination of the transfer.
	To *common.Address

	// Amount is the amount being transferred.
	Amount *big.Int

	// Contract is nil if the native currency (ETH) is being transferred,
	// or is the address of the contract if a ERC-20 token is being
	// transferred.
	Contract *common.Address
}

// ParseEthereumTransaction parses an unsigned transaction that can be an ETH
// transfer or a ERC-20 transfer.
func ParseEthereumTransaction(b []byte) (*EthereumTransfer, error) {
	var tx types.Transaction
	err := tx.UnmarshalBinary(b)
	if err != nil {
		panic(err)
	}

	value := tx.Value()
	data := tx.Data()

	if value.Uint64() == 0 && len(data) == 0 {
		return nil, fmt.Errorf("invalid Ethereum transaction: both value and data are empty. For normal ETH transfers set only value, for contract calls (e.g. ERC-20 transfers) set only data.")
	}

	if value.Uint64() != 0 && len(data) != 0 {
		return nil, fmt.Errorf("invalid Ethereum transaction: both value and data are set. For normal ETH transfers set only value, for contract calls (e.g. ERC-20 transfers) set only data.")
	}

	if value.Uint64() > 0 {
		return &EthereumTransfer{
			To:     tx.To(),
			Amount: value,
		}, nil
	}

	return parseERC20Transfer(&tx)
}

func parseERC20Transfer(tx *types.Transaction) (*EthereumTransfer, error) {
	data := tx.Data()
	if len(data) < 4+32+32 {
		return nil, fmt.Errorf("invalid ERC-20 transfer: data is too short")
	}

	// 4 bytes - method signature (transfer: 0xa9059cbb)
	// 32 bytes - recipient address
	// 32 bytes - amount
	method := data[0:4]
	recipient := data[4 : 4+32]
	amount := data[4+32 : 4+32+32]

	if !bytes.Equal(method, hexutil.MustDecode("0xa9059cbb")) {
		return nil, fmt.Errorf("invalid ERC-20 transfer: method is not ERC-20 transfer")
	}

	if !bytes.Equal(recipient[0:12], hexutil.MustDecode("0x000000000000000000000000")) {
		return nil, fmt.Errorf("invalid ERC-20 transfer: recipient address is not 20 bytes")
	}

	to := common.BytesToAddress(recipient[12:])

	return &EthereumTransfer{
		Contract: tx.To(),
		To:       &to,
		Amount:   big.NewInt(0).SetBytes(amount),
	}, nil
}
