package app

import (
	"errors"
	"fmt"
	"strconv"
	"strings"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/evm/ethereum/eip712"
	evmtypes "github.com/cosmos/evm/x/vm/types"
)

var sealed = false

var coinInfo = evmtypes.EvmCoinInfo{
	Denom:         "award",
	ExtendedDenom: "award",
	DisplayDenom:  "WARD",
	Decimals:      evmtypes.EighteenDecimals,
}

func (app *App) setupEVM() error {
	if sealed {
		return errors.New("setupEVM called twice")
	}

	chainID := app.ChainID()
	from := strings.LastIndexByte(chainID, '_')
	to := strings.LastIndexByte(chainID, '-')
	evmChainID, err := strconv.ParseUint(chainID[from+1:to], 10, 64)
	if err != nil {
		return fmt.Errorf("can't parse evm chain id from %s: %w", chainID, err)
	}

	eip712.SetEncodingConfig(app.legacyAmino, app.interfaceRegistry, evmChainID)

	// set the denom info for the chain
	if err := setBaseDenom(coinInfo); err != nil {
		return err
	}

	ethCfg := evmtypes.DefaultChainConfig(evmChainID)
	if err := evmtypes.NewEVMConfigurator().
		WithChainConfig(ethCfg).
		WithEVMCoinInfo(coinInfo).
		Configure(); err != nil {
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
