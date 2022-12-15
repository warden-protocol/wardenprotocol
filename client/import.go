package client

import (
	"bufio"

	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/input"
	"github.com/cosmos/cosmos-sdk/crypto"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/common"
	"github.com/evmos/ethermint/crypto/ethsecp256k1"

	"github.com/evmos/ethermint/crypto/hd"
)

// UnsafeImportKeyCommand imports private keys from a keyfile.
func UnsafeImportKeyCommand() *cobra.Command {
	return &cobra.Command{
		Use:   "unsafe-import-eth-key <name> <pk>",
		Short: "**UNSAFE** Import Ethereum private keys into the local keybase",
		Long:  "**UNSAFE** Import a hex-encoded Ethereum private key into the local keybase.",
		Args:  cobra.ExactArgs(2),
		RunE:  runImportCmd,
	}
}

func runImportCmd(cmd *cobra.Command, args []string) error {
	inBuf := bufio.NewReader(cmd.InOrStdin())
	keyringBackend, _ := cmd.Flags().GetString(flags.FlagKeyringBackend)
	rootDir, _ := cmd.Flags().GetString(flags.FlagHome)

	kb, err := keyring.New(
		sdk.KeyringServiceName(),
		keyringBackend,
		rootDir,
		inBuf,
		hd.EthSecp256k1Option(),
	)
	if err != nil {
		return err
	}

	passphrase, err := input.GetPassword("Enter passphrase to encrypt your key:", inBuf)
	if err != nil {
		return err
	}

	privKey := &ethsecp256k1.PrivKey{
		Key: common.FromHex(args[1]),
	}

	armor := crypto.EncryptArmorPrivKey(privKey, passphrase, "eth_secp256k1")

	return kb.ImportPrivKey(args[0], armor, passphrase)
}
