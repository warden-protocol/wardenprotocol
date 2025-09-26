package ante

import (
	evmante "github.com/cosmos/evm/ante"
)

// HandlerOptions extend the SDK's AnteHandler options by requiring the IBC
// channel keeper, wasm keeper and evm keepers.
type HandlerOptions struct {
	evmante.HandlerOptions
}

// Validate checks if the keepers are defined.
func (options HandlerOptions) Validate() error {
	if err := options.HandlerOptions.Validate(); err != nil {
		return err
	}

	return nil
}
