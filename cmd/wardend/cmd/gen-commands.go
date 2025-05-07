package cmd

import (
	"encoding/json"
	"fmt"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/server"
	"github.com/cosmos/cosmos-sdk/x/genutil"
	genutiltypes "github.com/cosmos/cosmos-sdk/x/genutil/types"
	"github.com/spf13/cobra"
)

func setupGenCommand(cmd *cobra.Command) (codec.Codec, string) {
	clientCtx := client.GetClientContextFromCmd(cmd)
	serverCtx := server.GetServerContextFromCmd(cmd)
	config := serverCtx.Config
	config.SetRoot(clientCtx.HomeDir)

	return clientCtx.Codec, config.GenesisFile()
}

func updateGenesisState(genesisFileURL string, fn func(appState map[string]json.RawMessage) error) error {
	appState, appGenesis, err := genutiltypes.GenesisStateFromGenFile(genesisFileURL)
	if err != nil {
		return fmt.Errorf("unmarshalling genesis state: %w", err)
	}

	if err := fn(appState); err != nil {
		return fmt.Errorf("updating genesis: %w", err)
	}

	appStateJSON, err := json.Marshal(appState)
	if err != nil {
		return fmt.Errorf("marshalling application genesis state: %w", err)
	}

	appGenesis.AppState = appStateJSON

	return genutil.ExportGenesisFile(appGenesis, genesisFileURL)
}
