package ante

import (
	"errors"

	corestoretypes "cosmossdk.io/core/store"
	wasmkeeper "github.com/CosmWasm/wasmd/x/wasm/keeper"
	wasmTypes "github.com/CosmWasm/wasmd/x/wasm/types"
	evmante "github.com/cosmos/evm/ante"
	"github.com/cosmos/ibc-go/v10/modules/core/keeper"
)

// HandlerOptions extend the SDK's AnteHandler options by requiring the IBC
// channel keeper, wasm keeper and evm keepers.
type HandlerOptions struct {
	evmante.HandlerOptions

	// CosmWasm ante handler options
	IBCKeeper             *keeper.Keeper
	NodeConfig            *wasmTypes.NodeConfig
	WasmKeeper            *wasmkeeper.Keeper
	TXCounterStoreService corestoretypes.KVStoreService
}

// Validate checks if the keepers are defined.
func (options HandlerOptions) Validate() error {
	if err := options.HandlerOptions.Validate(); err != nil {
		return err
	}

	if options.NodeConfig == nil {
		return errors.New("wasm config is required for ante builder")
	}

	if options.TXCounterStoreService == nil {
		return errors.New("wasm store service is required for ante builder")
	}

	return nil
}
