// Copyright 2021 Evmos Foundation
// This file is part of Evmos' Ethermint library.
//
// The Ethermint library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// The Ethermint library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Ethermint library. If not, see https://github.com/evmos/ethermint/blob/main/LICENSE
package client

import (
	"bufio"

	"github.com/cometbft/cometbft/libs/cli"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/keys"
	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	clientkeys "github.com/evmos/ethermint/client/keys"
	"github.com/evmos/ethermint/crypto/hd"
)

// KeyCommands registers a sub-tree of commands to interact with
// local private key storage.
func KeyCommands(defaultNodeHome string) *cobra.Command {
	cmd := &cobra.Command{
		Use:   "keys",
		Short: "Manage your application's keys",
		Long: `Keyring management commands. These keys may be in any format supported by the
Tendermint crypto library and can be used by light-clients, full nodes, or any other application
that needs to sign with a private key.

The keyring supports the following backends:

    os          Uses the operating system's default credentials store.
    file        Uses encrypted file-based keystore within the app's configuration directory.
                This keyring will request a password each time it is accessed, which may occur
                multiple times in a single command resulting in repeated password prompts.
    kwallet     Uses KDE Wallet Manager as a credentials management application.
    pass        Uses the pass command line utility to store and retrieve keys.
    test        Stores keys insecurely to disk. It does not prompt for a password to be unlocked
                and it should be use only for testing purposes.

kwallet and pass backends depend on external tools. Refer to their respective documentation for more
information:
    KWallet     https://github.com/KDE/kwallet
    pass        https://www.passwordstore.org/

The pass backend requires GnuPG: https://gnupg.org/
`,
	}

	// support adding Ethereum supported keys
	addCmd := keys.AddKeyCommand()

	// update the default signing algorithm value to "eth_secp256k1"
	algoFlag := addCmd.Flag(flags.FlagKeyType)
	algoFlag.DefValue = string(hd.EthSecp256k1Type)
	err := algoFlag.Value.Set(string(hd.EthSecp256k1Type))
	if err != nil {
		panic(err)
	}

	addCmd.RunE = runAddCmd

	cmd.AddCommand(
		keys.MnemonicKeyCommand(),
		addCmd,
		keys.ExportKeyCommand(),
		keys.ImportKeyCommand(),
		keys.ListKeysCmd(),
		keys.ShowKeysCmd(),
		keys.DeleteKeyCommand(),
		keys.RenameKeyCommand(),
		keys.ParseKeyStringCommand(),
		keys.MigrateCommand(),
		flags.LineBreak,
		UnsafeExportEthKeyCommand(),
		UnsafeImportKeyCommand(),
	)

	cmd.PersistentFlags().String(flags.FlagHome, defaultNodeHome, "The application home directory")
	cmd.PersistentFlags().String(flags.FlagKeyringDir, "", "The client Keyring directory; if omitted, the default 'home' directory will be used")
	cmd.PersistentFlags().String(flags.FlagKeyringBackend, keyring.BackendOS, "Select keyring's backend (os|file|test)")
	cmd.PersistentFlags().String(cli.OutputFlag, "text", "Output format (text|json)")
	return cmd
}

func runAddCmd(cmd *cobra.Command, args []string) error {
	clientCtx := client.GetClientContextFromCmd(cmd).WithKeyringOptions(hd.EthSecp256k1Option())
	clientCtx, err := client.ReadPersistentCommandFlags(clientCtx, cmd.Flags())
	if err != nil {
		return err
	}
	buf := bufio.NewReader(clientCtx.Input)
	return clientkeys.RunAddCmd(clientCtx, cmd, args, buf)
}
