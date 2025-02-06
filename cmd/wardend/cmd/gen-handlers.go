package cmd

import (
	"encoding/json"
	"fmt"

	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"

	asynctypes "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

func AddGenesisHandlerCmd(defaultNodeHome string) *cobra.Command {
	cmd := &cobra.Command{
		Use:   "add-genesis-handler <handler>",
		Short: "Add a Handler to the genesis file",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			cdc, genesisFileURL := setupGenCommand(cmd)

			handler := &asynctypes.Handler{
				Name:        args[0],
				Description: args[1],
			}

			return updateGenesisState(
				genesisFileURL,
				func(appState map[string]json.RawMessage) error {
					asyncGenState := asynctypes.GetGenesisStateFromAppState(cdc, appState)

					asyncGenState.Handlers = append(asyncGenState.Handlers, handler)

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
