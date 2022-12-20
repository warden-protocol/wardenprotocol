package client

import (
	"fmt"
	"os"
	"path"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"

	"github.com/tendermint/tendermint/libs/cli"

	"github.com/cosmos/cosmos-sdk/client/flags"

	ethermint "github.com/evmos/ethermint/types"
)

// InitConfig adds the chain-id, encoding and output flags to the persistent flag set.
func InitConfig(cmd *cobra.Command) error {
	home, err := cmd.PersistentFlags().GetString(cli.HomeFlag)
	if err != nil {
		return err
	}

	configFile := path.Join(home, "config", "config.toml")
	_, err = os.Stat(configFile)
	if err != nil && !os.IsNotExist(err) {
		// Immediately return if the error isn't related to the file not existing.
		// See issue https://github.com/evmos/ethermint/issues/539
		return err
	}
	if err == nil {
		viper.SetConfigFile(configFile)

		if err := viper.ReadInConfig(); err != nil {
			return err
		}
	}

	if err := viper.BindPFlag(flags.FlagChainID, cmd.PersistentFlags().Lookup(flags.FlagChainID)); err != nil {
		return err
	}

	if err := viper.BindPFlag(cli.EncodingFlag, cmd.PersistentFlags().Lookup(cli.EncodingFlag)); err != nil {
		return err
	}

	return viper.BindPFlag(cli.OutputFlag, cmd.PersistentFlags().Lookup(cli.OutputFlag))
}

// ValidateChainID wraps a cobra command with a RunE function with base 10 integer chain-id verification.
func ValidateChainID(baseCmd *cobra.Command) *cobra.Command {
	// Copy base run command to be used after chain verification
	baseRunE := baseCmd.RunE

	// Function to replace command's RunE function
	validateFn := func(cmd *cobra.Command, args []string) error {
		chainID, _ := cmd.Flags().GetString(flags.FlagChainID)

		if !ethermint.IsValidChainID(chainID) {
			return fmt.Errorf("invalid chain-id format: %s", chainID)
		}

		return baseRunE(cmd, args)
	}

	baseCmd.RunE = validateFn
	return baseCmd
}
