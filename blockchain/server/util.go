// Copyright 2023 Qredo Ltd.
// This file is part of the Fusion library.
//
// The Fusion library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Fusion library. If not, see https://github.com/qredo/fusionchain/blob/main/LICENSE
package server

import (
	tcmd "github.com/cometbft/cometbft/cmd/cometbft/commands"
	sdkserver "github.com/cosmos/cosmos-sdk/server"
	"github.com/cosmos/cosmos-sdk/server/types"
	"github.com/cosmos/cosmos-sdk/version"
	"github.com/evmos/ethermint/server"
	"github.com/spf13/cobra"
)

// AddCommands adds server commands
func AddCommands(
	rootCmd *cobra.Command,
	opts server.StartOptions,
	appExport types.AppExporter,
	addStartFlags types.ModuleInitFlags,
) {
	tendermintCmd := &cobra.Command{
		Use:   "tendermint",
		Short: "Tendermint subcommands",
	}

	tendermintCmd.AddCommand(
		sdkserver.ShowNodeIDCmd(),
		sdkserver.ShowValidatorCmd(),
		sdkserver.ShowAddressCmd(),
		sdkserver.VersionCmd(),
		tcmd.ResetAllCmd,
		tcmd.ResetStateCmd,
		sdkserver.BootstrapStateCmd(opts.AppCreator),
	)

	startCmd := StartCmd(opts)
	addStartFlags(startCmd)

	rootCmd.AddCommand(
		startCmd,
		tendermintCmd,
		sdkserver.ExportCmd(appExport, opts.DefaultNodeHome),
		version.NewVersionCommand(),
		sdkserver.NewRollbackCmd(opts.AppCreator, opts.DefaultNodeHome),

		// custom tx indexer command
		server.NewIndexTxCmd(),
	)
}
