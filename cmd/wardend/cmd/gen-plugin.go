package cmd

import (
	"encoding/json"
	"fmt"

	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"

	asynctypes "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

func AddGenesisPluginCmd(defaultNodeHome string) *cobra.Command {
	cmd := &cobra.Command{
		Use:   "add-genesis-plugin <name>",
		Short: "Add a Plugin to the genesis file",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			cdc, genesisFileURL := setupGenCommand(cmd)

			name := args[0]

			return updateGenesisState(
				genesisFileURL,
				func(appState map[string]json.RawMessage) error {
					asyncGenState := asynctypes.GetGenesisStateFromAppState(cdc, appState)

					asyncGenState.ActivePlugins = append(asyncGenState.ActivePlugins, asynctypes.GenesisPlugin{
						Name:    name,
						Timeout: nil,
					})

					asyncGenStateBz, err := cdc.MarshalJSON(asyncGenState)
					if err != nil {
						return fmt.Errorf("marshalling async genesis state: %w", err)
					}
					appState[asynctypes.ModuleName] = asyncGenStateBz

					return nil
				},
			)
		},
	}

	cmd.Flags().String(flags.FlagHome, defaultNodeHome, "The application home directory")
	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
