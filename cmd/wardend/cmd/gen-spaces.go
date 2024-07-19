package cmd

import (
	"encoding/json"
	"fmt"

	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"

	wardentypes "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func AddGenesisSpaceCmd(defaultNodeHome string) *cobra.Command {
	cmd := &cobra.Command{
		Use:   "add-genesis-space <creator>",
		Short: "Add a Space to the genesis file",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			cdc, genesisFileURL := setupGenCommand(cmd)

			creator := args[0]

			return updateGenesisState(
				genesisFileURL,
				func(appState map[string]json.RawMessage) error {
					wardenGenState := wardentypes.GetGenesisStateFromAppState(cdc, appState)

					wardenGenState.Spaces = append(wardenGenState.Spaces, wardentypes.Space{
						Id:          1 + uint64(len(wardenGenState.Spaces)),
						Creator:     creator,
						Owners:      []string{creator},
						AdminRuleId: 0,
						SignRuleId:  0,
					})

					wardenGenStateBz, err := cdc.MarshalJSON(wardenGenState)
					if err != nil {
						return fmt.Errorf("marshalling warden genesis state: %w", err)
					}
					appState[wardentypes.ModuleName] = wardenGenStateBz

					return nil
				},
			)
		},
	}

	cmd.Flags().String(flags.FlagHome, defaultNodeHome, "The application home directory")
	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
