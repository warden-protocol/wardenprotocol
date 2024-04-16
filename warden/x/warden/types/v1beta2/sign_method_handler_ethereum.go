package v1beta2

import (
	"bytes"
	"crypto/ecdsa"
	"fmt"
	"math/big"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/rlp"
)

type EthereumSignMethodHandler struct {
	key *ecdsa.PublicKey
}

var _ SignMethodHandler = &EthereumSignMethodHandler{}

func NewEthereumSignMethodHandler(k *Key) (*EthereumSignMethodHandler, error) {
	pubkey, err := k.ToECDSASecp256k1()
	if err != nil {
		return nil, err
	}
	return &EthereumSignMethodHandler{key: pubkey}, nil
}

func (*EthereumSignMethodHandler) Handle(b []byte, m Metadata) (Transfer, error) {
	meta, ok := m.(*MetadataEthereum)
	if !ok || meta == nil {
		return Transfer{}, fmt.Errorf("invalid metadata field, expected *MetadataEthereum, got %T", m)
	}

	tx, err := ParseEthereumTransaction(b, big.NewInt(int64(meta.ChainId)))
	if err != nil {
		return Transfer{}, err
	}

	coinIdentifier := []byte("ETH/")
	if tx.Contract != nil {
		coinIdentifier = append(coinIdentifier, tx.Contract.Bytes()...)
	}

	return Transfer{
		To:             tx.To.Bytes(),
		Amount:         tx.Amount,
		CoinIdentifier: coinIdentifier,
		DataForSigning: tx.DataForSigning,
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

	DataForSigning []byte
}

type DynamicFeeTxWithoutSignature struct {
	ChainID    *big.Int
	Nonce      uint64
	GasTipCap  *big.Int // a.k.a. maxPriorityFeePerGas
	GasFeeCap  *big.Int // a.k.a. maxFeePerGas
	Gas        uint64
	To         *common.Address `rlp:"nil"` // nil means contract creation
	Value      *big.Int
	Data       []byte
	AccessList types.AccessList
}

type AccessListTxWithoutSignature struct {
	ChainID    *big.Int         // destination chain ID
	Nonce      uint64           // nonce of sender account
	GasPrice   *big.Int         // wei per gas
	Gas        uint64           // gas limit
	To         *common.Address  `rlp:"nil"` // nil means contract creation
	Value      *big.Int         // wei amount
	Data       []byte           // contract invocation input data
	AccessList types.AccessList // EIP-2930 access list
}

// The following code doesn't work for unsigned transactions:
//
//	var tx types.Transaction
//	tx.UnmarshalBinary(b)
//
// This function is a workaround taken from https://github.com/ethereum/go-ethereum/issues/26236.
func DecodeUnsignedPayload(msg []byte) (types.TxData, error) {
	if len(msg) <= 1 {
		return nil, fmt.Errorf("found less than 1 byte in %v", msg)
	}
	if msg[0] > 0x7f {
		// Legacy transaction
		var res types.LegacyTx
		err := rlp.DecodeBytes(msg, &res)
		return &res, err
	}
	switch msg[0] {
	case types.AccessListTxType:
		var res AccessListTxWithoutSignature
		err := rlp.DecodeBytes(msg[1:], &res)
		return &types.AccessListTx{
			ChainID:    res.ChainID,
			Nonce:      res.Nonce,
			GasPrice:   res.GasPrice,
			Gas:        res.Gas,
			To:         res.To,
			Value:      res.Value,
			Data:       res.Data,
			AccessList: res.AccessList,
		}, err
	case types.DynamicFeeTxType:
		var res DynamicFeeTxWithoutSignature
		err := rlp.DecodeBytes(msg[1:], &res)
		return &types.DynamicFeeTx{
			ChainID:    res.ChainID,
			Nonce:      res.Nonce,
			GasTipCap:  res.GasTipCap,
			GasFeeCap:  res.GasFeeCap,
			Gas:        res.Gas,
			To:         res.To,
			Value:      res.Value,
			Data:       res.Data,
			AccessList: res.AccessList,
		}, err
	default:
		return nil, fmt.Errorf("unsupported transaction type: %v", msg[0])
	}
}

// ParseEthereumTransaction parses an unsigned transaction that can be an ETH
// transfer or a ERC-20 transfer.
func ParseEthereumTransaction(b []byte, chainID *big.Int) (*EthereumTransfer, error) {
	txData, err := DecodeUnsignedPayload(b)
	if err != nil {
		return nil, err
	}
	// create new types Transaction from input fields
	tx := types.NewTx(txData)

	value := tx.Value()

	// Use latest signer for the supplied chainID
	signer := types.LatestSignerForChainID(chainID)

	hash := signer.Hash(tx)

	transfer := &EthereumTransfer{
		To:             tx.To(),
		Amount:         value,
		DataForSigning: hash.Bytes(),
	}

	if len(tx.Data()) > 0 {
		// a contract call is being made
		transfer.Contract = tx.To()
		callMsg, parsed, err := parseCallData(tx.Data()) // - TODO we should refactor this so that value can be extracted from all known contract calls
		if err != nil {
			return nil, err
		}
		if !parsed {
			// Most contract calls will fall into this category. Over time parseCallData must be improved so that
			// asset value movements can be tracked over an increasing set of contract types.
			return transfer, nil
		}
		transfer.To = callMsg.To
		transfer.Amount = callMsg.Value
	}

	return transfer, nil
}

func parseCallData(txData []byte) (call *ethereum.CallMsg, parsed bool, err error) {
	if len(txData) < 4 {
		return nil, false, fmt.Errorf("invalid contract call")
	}

	// 4 bytes - method signature (transfer: 0xa9059cbb)
	method := txData[0:4]

	switch {
	case bytes.Equal(method, transferMethodID):
		// 32 bytes - recipient address
		// 32 bytes - amount
		to, amt, err := rawUnpackERC20Transfer(txData)
		if err != nil {
			return nil, false, err
		}
		return &ethereum.CallMsg{To: to, Value: amt}, true, nil
	default:
		return nil, false, nil
	}
}

var (
	transferMethodID = crypto.Keccak256Hash([]byte("transfer(address,uint256)")).Bytes()[0:4]
)

// rawUnpackERC20Transfer Unpack without use of Go ABI package. Assumes correct ERC20 payload formatting
func rawUnpackERC20Transfer(txData []byte) (to *common.Address, amount *big.Int, err error) {
	if !bytes.Equal(txData[0:4], transferMethodID) {
		return nil, nil, fmt.Errorf("wrong method id")
	}
	if !bytes.Equal(txData[4:4+12], hexutil.MustDecode("0x000000000000000000000000")) {
		return nil, nil, fmt.Errorf("invalid ERC-20 transfer: recipient address is not 20 bytes")
	}
	toAddr := common.BytesToAddress(txData[16:36])
	amount = new(big.Int).SetBytes(txData[36:68])
	return &toAddr, amount, nil
}
