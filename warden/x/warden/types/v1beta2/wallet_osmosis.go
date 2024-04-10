package v1beta2

import (
	"crypto/ecdsa"
	"crypto/sha256"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/crypto"
)

type OsmosisWallet struct {
	key *ecdsa.PublicKey
}

var _ Wallet = &OsmosisWallet{}
var _ TxParser = &OsmosisWallet{}

func NewOsmosisWallet(k *Key) (*OsmosisWallet, error) {
	pubkey, err := k.ToECDSASecp256k1()
	if err != nil {
		return nil, err
	}
	return &OsmosisWallet{key: pubkey}, nil
}

func (w *OsmosisWallet) Address() string {
	addr := crypto.PubkeyToAddress(*w.key)
	return addr.Hex()
}

func (*OsmosisWallet) ParseTx(b []byte, m Metadata) (Transfer, error) {
	signData := parseStdSignDoc(b)
	// TODO: implement proper parsing of Osmosis transactions data
	return Transfer{
		DataForSigning: hash(signData),
	}, nil
}

func parseStdSignDoc(bz []byte) []byte {
	signBytes := sdk.MustSortJSON(bz)
	return signBytes
}

func hash(bytes []byte) []byte {
	hasher := sha256.New()
	hasher.Write(bytes)
	return hasher.Sum(nil)
}
