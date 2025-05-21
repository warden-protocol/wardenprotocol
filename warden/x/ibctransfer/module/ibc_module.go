package module

import (
	transfer "github.com/cosmos/evm/x/ibc/transfer"

	"github.com/warden-protocol/wardenprotocol/warden/x/ibctransfer/keeper"
)

// IBCModule implements the ICS26 interface for transfer given the transfer keeper.
type IBCModule struct {
	transfer.IBCModule
	keeper keeper.Keeper
}

// NewIBCModule creates a new IBCModule given the keeper.
func NewIBCModule(k keeper.Keeper) IBCModule {
	return IBCModule{
		keeper:    k,
		IBCModule: transfer.NewIBCModule(k.Keeper),
	}
}
