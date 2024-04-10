package v1beta2

import (
	"encoding/hex"

	"github.com/cosmos/cosmos-sdk/crypto/keys/secp256k1"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/crypto"
	"golang.org/x/crypto/blake2b"
)

func (k Key) DeriveAddresses(ctx sdk.Context, types []WalletType) []WalletKeyResponse {
	responses := make([]WalletKeyResponse, 0, len(types))
	for _, wType := range types {
		var (
			address string
			err     error
		)
		switch wType {
		case WalletType_WALLET_TYPE_ETH:
			address, err = EthereumAddress(k)
		case WalletType_WALLET_TYPE_CELESTIA:
			address, err = CelestiaAddress(k)
		case WalletType_WALLET_TYPE_OSMOSIS:
			address, err = OsmosisAddress(k)
		case WalletType_WALLET_TYPE_SUI:
			address, err = SuiAddress(k)
		}
		if err != nil {
			ctx.Logger().Warn("failed to derive address for key %d: %w", k.Id, err)
			continue
		}
		responses = append(responses, WalletKeyResponse{
			Address: address,
			Type:    wType,
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

func CelestiaAddress(key Key) (string, error) {
	return bech32Address("celestia", key)
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

func SuiAddress(key Key) (string, error) {
	k, err := key.ToEdDSAEd25519()
	if err != nil {
		return "", err
	}
	tmp := []byte{signatureSchemeFlagED25519}
	tmp = append(tmp, *k...)
	addrBytes := blake2b.Sum256(tmp)
	suiAddress := "0x" + hex.EncodeToString(addrBytes[:])[:addressLength]
	return suiAddress, nil
}
