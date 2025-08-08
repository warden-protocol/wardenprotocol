package config

import (
	"sync"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	evmtypes "github.com/cosmos/evm/x/vm/types"
)

var coinInfo = evmtypes.EvmCoinInfo{
	Denom:         BaseDenom,
	ExtendedDenom: BaseDenom,
	DisplayDenom:  DisplayDenom,
	Decimals:      evmtypes.EighteenDecimals,
}

var (
	appCfgOnce sync.Once
	appCfgErr  error
)

// EvmAppOptions allows to setup the global configuration
// for the Cosmos EVM chain.
func EvmAppOptions(evmChainID uint64) error {
	appCfgOnce.Do(func() {
		// set the denom info for the chain
		if err := setBaseDenom(coinInfo); err != nil {
			appCfgErr = err
			return
		}

		ethCfg := evmtypes.DefaultChainConfig(evmChainID)
		if err := evmtypes.NewEVMConfigurator().
			WithChainConfig(ethCfg).
			WithEVMCoinInfo(coinInfo).
			Configure(); err != nil {
			appCfgErr = err
			return
		}
	})

	return appCfgErr
}

// setBaseDenom registers the display denom and base denom and sets the
// base denom for the chain.
func setBaseDenom(ci evmtypes.EvmCoinInfo) error {
	if err := sdk.RegisterDenom(ci.DisplayDenom, math.LegacyOneDec()); err != nil {
		return err
	}

	// sdk.RegisterDenom will automatically overwrite the base denom when the
	// new setBaseDenom() are lower than the current base denom's units.
	return sdk.RegisterDenom(ci.Denom, math.LegacyNewDecWithPrec(1, int64(ci.Decimals)))
}
