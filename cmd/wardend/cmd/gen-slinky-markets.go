package cmd

import (
	"encoding/json"
	"fmt"

	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"

	"github.com/warden-protocol/connect/cmd/constants/marketmaps"
	marketmaptypes "github.com/warden-protocol/connect/x/marketmap/types"
	oracletypes "github.com/warden-protocol/connect/x/oracle/types"
)

func AddGenesisSlinkyMarketsCmd(defaultNodeHome string) *cobra.Command {
	cmd := &cobra.Command{
		Use:   "add-genesis-slinky-markets",
		Short: "Add Slinky core markets to the genesis file",
		Args:  cobra.ExactArgs(0),
		RunE: func(cmd *cobra.Command, args []string) error {
			cdc, genesisFileURL := setupGenCommand(cmd)

			return updateGenesisState(
				genesisFileURL,
				func(appState map[string]json.RawMessage) error {
					coreMarkets := marketmaps.CoreMarketMap

					// update marketmap genesis state
					var marketmapGenState marketmaptypes.GenesisState
					if appState[marketmaptypes.ModuleName] != nil {
						cdc.MustUnmarshalJSON(appState[marketmaptypes.ModuleName], &marketmapGenState)
					}

					marketmapGenState.MarketMap = coreMarkets

					marketmapGenStateBz, err := cdc.MarshalJSON(&marketmapGenState)
					if err != nil {
						return fmt.Errorf("marshalling warden genesis state: %w", err)
					}

					appState[marketmaptypes.ModuleName] = marketmapGenStateBz

					// update oracle genesis state
					oracleGenState := oracletypes.GetGenesisStateFromAppState(cdc, appState)

					id := uint64(1)
					for _, market := range coreMarkets.Markets {
						cp := oracletypes.CurrencyPairGenesis{
							Id:                id,
							Nonce:             0,
							CurrencyPairPrice: nil,
							CurrencyPair:      market.Ticker.CurrencyPair,
						}
						id++

						oracleGenState.CurrencyPairGenesis = append(oracleGenState.CurrencyPairGenesis, cp)
					}

					oracleGenState.NextId = id

					oracleGenStateBz, err := cdc.MarshalJSON(&oracleGenState)
					if err != nil {
						return fmt.Errorf("marshalling warden genesis state: %w", err)
					}

					appState[oracletypes.ModuleName] = oracleGenStateBz

					return nil
				},
			)
		},
	}

	cmd.Flags().String(flags.FlagHome, defaultNodeHome, "The application home directory")
	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
