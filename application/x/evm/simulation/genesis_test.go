package simulation_test

import (
	"encoding/json"
	"math/rand"
	"testing"

	"github.com/stretchr/testify/require"

	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/evmos/ethermint/x/evm/simulation"
	"github.com/evmos/ethermint/x/evm/types"
)

// TestRandomizedGenState tests the normal scenario of applying RandomizedGenState.
// Abonormal scenarios are not tested here.
func TestRandomizedGenState(t *testing.T) {
	registry := codectypes.NewInterfaceRegistry()
	types.RegisterInterfaces(registry)
	cdc := codec.NewProtoCodec(registry)

	s := rand.NewSource(1)
	r := rand.New(s)

	simState := module.SimulationState{
		AppParams:    make(simtypes.AppParams),
		Cdc:          cdc,
		Rand:         r,
		NumBonded:    3,
		Accounts:     simtypes.RandomAccounts(r, 3),
		InitialStake: 1000,
		GenState:     make(map[string]json.RawMessage),
	}

	simulation.RandomizedGenState(&simState)

	var evmGenesis types.GenesisState
	simState.Cdc.MustUnmarshalJSON(simState.GenState[types.ModuleName], &evmGenesis)

	require.Equal(t, true, evmGenesis.Params.GetEnableCreate())
	require.Equal(t, true, evmGenesis.Params.GetEnableCall())
	require.Equal(t, types.DefaultEVMDenom, evmGenesis.Params.GetEvmDenom())
	require.Equal(t, simulation.GenExtraEIPs(r), evmGenesis.Params.GetExtraEIPs())
	require.Equal(t, types.DefaultChainConfig(), evmGenesis.Params.GetChainConfig())

	require.Equal(t, len(evmGenesis.Accounts), 0)
}
