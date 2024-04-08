package v1beta2

import (
	"crypto/ecdsa"
	"crypto/sha256"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

type OsmosisSignMethodHandler struct {
	key *ecdsa.PublicKey
}

var _ SignMethodHandler = &OsmosisSignMethodHandler{}

func NewOsmosisSignMethodHandler(k *Key) (*OsmosisSignMethodHandler, error) {
	pubkey, err := k.ToECDSASecp256k1()
	if err != nil {
		return nil, err
	}
	return &OsmosisSignMethodHandler{key: pubkey}, nil
}

func (*OsmosisSignMethodHandler) Handle(b []byte, m Metadata) (Transfer, error) {
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
