package app

import (
	"fmt"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	evmtypes "github.com/cosmos/evm/x/vm/types"

	"github.com/warden-protocol/wardenprotocol/cmd/wardend/config"
)

// EVMOptionsFn defines a function type for setting app options specifically for
// the app. The function should receive the chainID and return an error if
// any.
type EVMOptionsFn func(uint64) error

var sealed = false

// EVMAppOptions allows to setup the global configuration
// for the chain.
func EVMAppOptions(chainID uint64) error {
	if sealed {
		return nil
	}

	coinInfo, found := config.ChainsCoinInfo[chainID]
	if !found {
		return fmt.Errorf("unknown chain id: %d", chainID)
	}

	// set the denom info for the chain
	if err := setBaseDenom(coinInfo); err != nil {
		return err
	}

	ethCfg := evmtypes.DefaultChainConfig(chainID)

	err := evmtypes.NewEVMConfigurator().
		WithExtendedEips(cosmosEVMActivators).
		WithChainConfig(ethCfg).
		// NOTE: we're using the 18 decimals default for the example chain
		WithEVMCoinInfo(coinInfo).
		Configure()
	if err != nil {
		return err
	}

	sealed = true

	return nil
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
