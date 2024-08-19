package v1beta2

import (
	"fmt"
	"math/big"
)

var ErrUnknownWalletType = fmt.Errorf("error in NewWallet: unknown wallet type")

func NewSignMethodHandler(k *Key, sm SignMethod) (SignMethodHandler, error) {
	switch sm {
	case SignMethod_SIGN_METHOD_BLACK_BOX:
		return NewBlackBoxSignMethodHandler(k)
	case SignMethod_SIGN_METHOD_ETH:
		return NewEthereumSignMethodHandler(k)
	case SignMethod_SIGN_METHOD_OSMOSIS:
		return NewOsmosisSignMethodHandler(k)
	}
	return nil, ErrUnknownWalletType
}

// Transfer represents a generic transfer of tokens on a blockchain.
type Transfer struct {
	// To uniquely identifies the recipient of the transfer.
	To []byte

	// Amount is the amount being transferred.
	Amount *big.Int

	// CoinIdentifier uniquely identifies the coin being transferred.
	CoinIdentifier []byte

	// DataForSigning is the data that will be signed by the key.
	DataForSigning []byte
}

// DataForSigninger takes a transaction and metadata and returns the data that
// should be signed by the key.
type SignMethodHandler interface {
	Handle(tx []byte, m Metadata) (Transfer, error)
}

type Metadata any
