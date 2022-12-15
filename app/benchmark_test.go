package app

import (
	"encoding/json"
	"io"
	"testing"

	"github.com/cosmos/cosmos-sdk/simapp"
	"github.com/evmos/ethermint/encoding"
	abci "github.com/tendermint/tendermint/abci/types"
	"github.com/tendermint/tendermint/libs/log"
	dbm "github.com/tendermint/tm-db"
)

func BenchmarkEthermintApp_ExportAppStateAndValidators(b *testing.B) {
	db := dbm.NewMemDB()
	app := NewEthermintApp(log.NewTMLogger(io.Discard), db, nil, true, map[int64]bool{}, DefaultNodeHome, 0, encoding.MakeConfig(ModuleBasics), simapp.EmptyAppOptions{})

	genesisState := NewDefaultGenesisState()
	stateBytes, err := json.MarshalIndent(genesisState, "", "  ")
	if err != nil {
		b.Fatal(err)
	}

	// Initialize the chain
	app.InitChain(
		abci.RequestInitChain{
			ChainId:       "ethermint_9000-1",
			Validators:    []abci.ValidatorUpdate{},
			AppStateBytes: stateBytes,
		},
	)
	app.Commit()

	b.ResetTimer()
	b.ReportAllocs()
	for i := 0; i < b.N; i++ {
		// Making a new app object with the db, so that initchain hasn't been called
		app2 := NewEthermintApp(log.NewTMLogger(log.NewSyncWriter(io.Discard)), db, nil, true, map[int64]bool{}, DefaultNodeHome, 0, encoding.MakeConfig(ModuleBasics), simapp.EmptyAppOptions{})
		if _, err := app2.ExportAppStateAndValidators(false, []string{}); err != nil {
			b.Fatal(err)
		}
	}
}
