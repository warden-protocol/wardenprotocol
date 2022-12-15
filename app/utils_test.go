package app

import (
	"encoding/json"
	"math/rand"
	"os"
	"testing"

	"github.com/stretchr/testify/require"

	"github.com/cosmos/cosmos-sdk/types/module"
	"github.com/cosmos/cosmos-sdk/x/auth"
	authkeeper "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	paramstypes "github.com/cosmos/cosmos-sdk/x/params/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	evmtypes "github.com/evmos/ethermint/x/evm/types"

	"github.com/evmos/ethermint/crypto/ethsecp256k1"
	ethermint "github.com/evmos/ethermint/types"

	"github.com/cosmos/cosmos-sdk/simapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

var (
	maxTestingAccounts = 100
	seed               = int64(233)
)

func TestRandomGenesisAccounts(t *testing.T) {
	r := rand.New(rand.NewSource(seed))
	accs := RandomAccounts(r, rand.Intn(maxTestingAccounts))

	encodingConfig := MakeEncodingConfig()
	appCodec := encodingConfig.Marshaler
	cdc := encodingConfig.Amino

	paramsKeeper := initParamsKeeper(appCodec, cdc, sdk.NewKVStoreKey(paramstypes.StoreKey), sdk.NewTransientStoreKey(paramstypes.StoreKey))
	subSpace, find := paramsKeeper.GetSubspace(authtypes.ModuleName)
	require.True(t, find)
	accountKeeper := authkeeper.NewAccountKeeper(
		appCodec, sdk.NewKVStoreKey(authtypes.StoreKey), subSpace, ethermint.ProtoAccount, maccPerms,
	)
	authModule := auth.NewAppModule(appCodec, accountKeeper, RandomGenesisAccounts)

	genesisState := simapp.NewDefaultGenesisState(appCodec)
	simState := &module.SimulationState{Accounts: accs, Cdc: appCodec, Rand: r, GenState: genesisState}
	authModule.GenerateGenesisState(simState)

	authStateBz, find := genesisState[authtypes.ModuleName]
	require.True(t, find)

	authState := new(authtypes.GenesisState)
	appCodec.MustUnmarshalJSON(authStateBz, authState)
	accounts, err := authtypes.UnpackAccounts(authState.Accounts)
	require.NoError(t, err)
	for _, acc := range accounts {
		_, ok := acc.(ethermint.EthAccountI)
		require.True(t, ok)
	}
}

func TestStateFn(t *testing.T) {
	config, db, dir, logger, skip, err := simapp.SetupSimulation("leveldb-app-sim", "Simulation")
	if skip {
		t.Skip("skipping AppStateFn testing")
	}
	require.NoError(t, err, "simulation setup failed")

	config.ChainID = SimAppChainID
	config.Commit = true

	defer func() {
		db.Close()
		require.NoError(t, os.RemoveAll(dir))
	}()

	app := NewEthermintApp(logger, db, nil, true, map[int64]bool{}, DefaultNodeHome, simapp.FlagPeriodValue, MakeEncodingConfig(), simapp.EmptyAppOptions{}, fauxMerkleModeOpt)
	require.Equal(t, appName, app.Name())

	appStateFn := StateFn(app.AppCodec(), app.SimulationManager())
	r := rand.New(rand.NewSource(seed))
	accounts := RandomAccounts(r, rand.Intn(maxTestingAccounts))
	appState, _, _, _ := appStateFn(r, accounts, config)

	rawState := make(map[string]json.RawMessage)
	err = json.Unmarshal(appState, &rawState)
	require.NoError(t, err)

	stakingStateBz, ok := rawState[stakingtypes.ModuleName]
	require.True(t, ok)

	stakingState := new(stakingtypes.GenesisState)
	app.AppCodec().MustUnmarshalJSON(stakingStateBz, stakingState)
	bondDenom := stakingState.Params.BondDenom

	evmStateBz, ok := rawState[evmtypes.ModuleName]
	require.True(t, ok)

	evmState := new(evmtypes.GenesisState)
	app.AppCodec().MustUnmarshalJSON(evmStateBz, evmState)
	require.Equal(t, bondDenom, evmState.Params.EvmDenom)
}

func TestRandomAccounts(t *testing.T) {
	r := rand.New(rand.NewSource(seed))
	accounts := RandomAccounts(r, rand.Intn(maxTestingAccounts))
	for _, acc := range accounts {
		_, ok := acc.PrivKey.(*ethsecp256k1.PrivKey)
		require.True(t, ok)
	}
}
