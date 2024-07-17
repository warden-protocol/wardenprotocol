package v1beta3

import (
	"github.com/cosmos/cosmos-sdk/crypto/keys/secp256k1"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/crypto"
)

func (k Key) DeriveAddresses(ctx sdk.Context, types []AddressType) []AddressResponse {
	responses := make([]AddressResponse, 0, len(types))
	for _, addrType := range types {
		var (
			address string
			err     error
		)
		switch addrType {
		case AddressType_ADDRESS_TYPE_ETHEREUM:
			address, err = EthereumAddress(k)
		case AddressType_ADDRESS_TYPE_OSMOSIS:
			address, err = OsmosisAddress(k)
		}
		if err != nil {
			ctx.Logger().Warn("failed to derive address for key %d: %w", k.Id, err)
			continue
		}
		responses = append(responses, AddressResponse{
			Address: address,
			Type:    addrType,
		})
	}
	return responses
}

func EthereumAddress(key Key) (string, error) {
	k, err := key.ToECDSASecp256k1()
	if err != nil {
		return "", err
	}
	addr := crypto.PubkeyToAddress(*k)
	return addr.Hex(), nil
}

func OsmosisAddress(key Key) (string, error) {
	return bech32Address("osmo", key)
}

func bech32Address(prefix string, key Key) (string, error) {
	k, err := key.ToECDSASecp256k1()
	if err != nil {
		return "", err
	}
	var pubkey secp256k1.PubKey
	pubkey.Key = crypto.CompressPubkey(k)
	bech32Address := sdk.MustBech32ifyAddressBytes(prefix, pubkey.Address())
	return bech32Address, nil
}
