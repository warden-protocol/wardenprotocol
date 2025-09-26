package cmd

import (
	"encoding/json"
	"fmt"

	"github.com/cosmos/cosmos-sdk/client/flags"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/spf13/cobra"

	wardentypes "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func AddGenesisKeychainCmd(defaultNodeHome string) *cobra.Command {
	cmd := &cobra.Command{
		Use:   "add-genesis-keychain <creator> <name> <keychain-fees>",
		Short: "Add a Keychain to the genesis file",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			cdc, genesisFileURL := setupGenCommand(cmd)

			creator := args[0]
			_, err := sdk.AccAddressFromBech32(creator)
			if err != nil {
				return err
			}

			name := args[1]
			keychainFeesJson := args[2]

			var keychainFees wardentypes.KeychainFees
			if err := cdc.UnmarshalJSON([]byte(keychainFeesJson), &keychainFees); err != nil {
				return fmt.Errorf("cannot unmarshal keychain fees JSON: %w", err)
			}

			if err := keychainFees.KeyReq.Validate(); err != nil {
				return fmt.Errorf("invalid keychain fees: %w", err)
			}

			if err := keychainFees.SigReq.Validate(); err != nil {
				return fmt.Errorf("invalid keychain fees: %w", err)
			}

			return updateGenesisState(
				genesisFileURL,
				func(appState map[string]json.RawMessage) error {
					wardenGenState := wardentypes.GetGenesisStateFromAppState(cdc, appState)

					wardenGenState.Keychains = append(wardenGenState.Keychains, wardentypes.Keychain{
						Id:      1 + uint64(len(wardenGenState.Keychains)),
						Creator: creator,
						Name:    name,
						Admins:  []string{creator},
						Writers: []string{creator},
						Fees:    keychainFees,
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
