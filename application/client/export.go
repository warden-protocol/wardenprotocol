package client

import (
	"bufio"
	"fmt"
	"strings"

	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/input"
	"github.com/cosmos/cosmos-sdk/crypto"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/common/hexutil"
	ethcrypto "github.com/ethereum/go-ethereum/crypto"
	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	"github.com/evmos/ethermint/crypto/ethsecp256k1"
	"github.com/evmos/ethermint/crypto/hd"
)

// UnsafeExportEthKeyCommand exports a key with the given name as a private key in hex format.
func UnsafeExportEthKeyCommand() *cobra.Command {
	return &cobra.Command{
		Use:   "unsafe-export-eth-key [name]",
		Short: "**UNSAFE** Export an Ethereum private key",
		Long:  `**UNSAFE** Export an Ethereum private key unencrypted to use in dev tooling`,
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			inBuf := bufio.NewReader(cmd.InOrStdin())

			keyringBackend, _ := cmd.Flags().GetString(flags.FlagKeyringBackend)
			rootDir, _ := cmd.Flags().GetString(flags.FlagHome)

			kr, err := keyring.New(
				sdk.KeyringServiceName(),
				keyringBackend,
				rootDir,
				inBuf,
				hd.EthSecp256k1Option(),
			)
			if err != nil {
				return err
			}

			decryptPassword := ""
			conf := true

			switch keyringBackend {
			case keyring.BackendFile:
				decryptPassword, err = input.GetPassword(
					"**WARNING this is an unsafe way to export your unencrypted private key**\nEnter key password:",
					inBuf)
			case keyring.BackendOS:
				conf, err = input.GetConfirmation(
					"**WARNING** this is an unsafe way to export your unencrypted private key, are you sure?",
					inBuf, cmd.ErrOrStderr())
			}
			if err != nil || !conf {
				return err
			}

			// Exports private key from keybase using password
			armor, err := kr.ExportPrivKeyArmor(args[0], decryptPassword)
			if err != nil {
				return err
			}

			privKey, algo, err := crypto.UnarmorDecryptPrivKey(armor, decryptPassword)
			if err != nil {
				return err
			}

			if algo != ethsecp256k1.KeyType {
				return fmt.Errorf("invalid key algorithm, got %s, expected %s", algo, ethsecp256k1.KeyType)
			}

			// Converts key to Ethermint secp256k1 implementation
			ethPrivKey, ok := privKey.(*ethsecp256k1.PrivKey)
			if !ok {
				return fmt.Errorf("invalid private key type %T, expected %T", privKey, &ethsecp256k1.PrivKey{})
			}

			key, err := ethPrivKey.ToECDSA()
			if err != nil {
				return err
			}

			// Formats key for output
			privB := ethcrypto.FromECDSA(key)
			keyS := strings.ToUpper(hexutil.Encode(privB)[2:])

			fmt.Println(keyS)

			return nil
		},
	}
}
