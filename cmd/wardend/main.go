package main

import (
	"fmt"
	"os"

	svrcmd "github.com/cosmos/cosmos-sdk/server/cmd"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/wardenprotocol/cmd/wardend/cmd"
	wardendconfig "github.com/warden-protocol/wardenprotocol/cmd/wardend/config"
)

func main() {
	setupSDKConfig()

	rootCmd := cmd.NewRootCmd()
	if err := svrcmd.Execute(rootCmd, "", wardendconfig.MustGetDefaultNodeHome()); err != nil {
		fmt.Fprintln(rootCmd.OutOrStderr(), err)
		os.Exit(1)
	}
}

func setupSDKConfig() {
	config := sdk.GetConfig()
	wardendconfig.SetBech32Prefixes(config)
	wardendconfig.SetBip44CoinType(config)
	config.Seal()
}
