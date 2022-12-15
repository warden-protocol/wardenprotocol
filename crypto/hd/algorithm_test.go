package hd

import (
	"strings"
	"testing"

	"github.com/stretchr/testify/require"

	"github.com/ethereum/go-ethereum/common"

	hdwallet "github.com/miguelmota/go-ethereum-hdwallet"

	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"

	cryptocodec "github.com/evmos/ethermint/crypto/codec"
	ethermint "github.com/evmos/ethermint/types"
)

func init() {
	amino := codec.NewLegacyAmino()
	cryptocodec.RegisterCrypto(amino)
}

const mnemonic = "picnic rent average infant boat squirrel federal assault mercy purity very motor fossil wheel verify upset box fresh horse vivid copy predict square regret"

func TestKeyring(t *testing.T) {
	dir := t.TempDir()
	mockIn := strings.NewReader("")

	kr, err := keyring.New("ethermint", keyring.BackendTest, dir, mockIn, EthSecp256k1Option())
	require.NoError(t, err)

	// fail in retrieving key
	info, err := kr.Key("foo")
	require.Error(t, err)
	require.Nil(t, info)

	mockIn.Reset("password\npassword\n")
	info, mnemonic, err := kr.NewMnemonic("foo", keyring.English, ethermint.BIP44HDPath, keyring.DefaultBIP39Passphrase, EthSecp256k1)
	require.NoError(t, err)
	require.NotEmpty(t, mnemonic)
	require.Equal(t, "foo", info.GetName())
	require.Equal(t, "local", info.GetType().String())
	require.Equal(t, EthSecp256k1Type, info.GetAlgo())

	hdPath := ethermint.BIP44HDPath

	bz, err := EthSecp256k1.Derive()(mnemonic, keyring.DefaultBIP39Passphrase, hdPath)
	require.NoError(t, err)
	require.NotEmpty(t, bz)

	wrongBz, err := EthSecp256k1.Derive()(mnemonic, keyring.DefaultBIP39Passphrase, "/wrong/hdPath")
	require.Error(t, err)
	require.Empty(t, wrongBz)

	privkey := EthSecp256k1.Generate()(bz)
	addr := common.BytesToAddress(privkey.PubKey().Address().Bytes())

	wallet, err := hdwallet.NewFromMnemonic(mnemonic)
	require.NoError(t, err)

	path := hdwallet.MustParseDerivationPath(hdPath)

	account, err := wallet.Derive(path, false)
	require.NoError(t, err)
	require.Equal(t, addr.String(), account.Address.String())
}

func TestDerivation(t *testing.T) {
	bz, err := EthSecp256k1.Derive()(mnemonic, keyring.DefaultBIP39Passphrase, ethermint.BIP44HDPath)
	require.NoError(t, err)
	require.NotEmpty(t, bz)

	badBz, err := EthSecp256k1.Derive()(mnemonic, keyring.DefaultBIP39Passphrase, "44'/60'/0'/0/0")
	require.NoError(t, err)
	require.NotEmpty(t, badBz)

	require.NotEqual(t, bz, badBz)

	privkey := EthSecp256k1.Generate()(bz)
	badPrivKey := EthSecp256k1.Generate()(badBz)

	require.False(t, privkey.Equals(badPrivKey))

	wallet, err := hdwallet.NewFromMnemonic(mnemonic)
	require.NoError(t, err)

	path := hdwallet.MustParseDerivationPath(ethermint.BIP44HDPath)
	account, err := wallet.Derive(path, false)
	require.NoError(t, err)

	badPath := hdwallet.MustParseDerivationPath("44'/60'/0'/0/0")
	badAccount, err := wallet.Derive(badPath, false)
	require.NoError(t, err)

	// Equality of Address BIP44
	require.Equal(t, account.Address.String(), "0xA588C66983a81e800Db4dF74564F09f91c026351")
	require.Equal(t, badAccount.Address.String(), "0xF8D6FDf2B8b488ea37e54903750dcd13F67E71cb")
	// Inequality of wrong derivation path address
	require.NotEqual(t, account.Address.String(), badAccount.Address.String())
	// Equality of Ethermint implementation
	require.Equal(t, common.BytesToAddress(privkey.PubKey().Address().Bytes()).String(), "0xA588C66983a81e800Db4dF74564F09f91c026351")
	require.Equal(t, common.BytesToAddress(badPrivKey.PubKey().Address().Bytes()).String(), "0xF8D6FDf2B8b488ea37e54903750dcd13F67E71cb")

	// Equality of Eth and Ethermint implementation
	require.Equal(t, common.BytesToAddress(privkey.PubKey().Address()).String(), account.Address.String())
	require.Equal(t, common.BytesToAddress(badPrivKey.PubKey().Address()).String(), badAccount.Address.String())

	// Inequality of wrong derivation path of Eth and Ethermint implementation
	require.NotEqual(t, common.BytesToAddress(privkey.PubKey().Address()).String(), badAccount.Address.String())
	require.NotEqual(t, common.BytesToAddress(badPrivKey.PubKey().Address()).String(), account.Address.Hex())
}
