package simulation

import (
	"encoding/json"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"

	"github.com/evmos/ethermint/x/feemarket/types"
)

// RandomizedGenState generates a random GenesisState for nft
func RandomizedGenState(simState *module.SimulationState) {
	params := types.NewParams(simState.Rand.Uint32()%2 == 0, simState.Rand.Uint32(), simState.Rand.Uint32(), simState.Rand.Uint64(), simState.Rand.Int63(), sdk.ZeroDec(), types.DefaultMinGasMultiplier)

	blockGas := simState.Rand.Uint64()
	feemarketGenesis := types.NewGenesisState(params, blockGas)

	bz, err := json.MarshalIndent(feemarketGenesis, "", " ")
	if err != nil {
		panic(err)
	}
	fmt.Printf("Selected randomly generated %s parameters:\n%s\n", types.ModuleName, bz)

	simState.GenState[types.ModuleName] = simState.Cdc.MustMarshalJSON(feemarketGenesis)
}
