package ibctransfer

import (
	ibctransfer "github.com/cosmos/ibc-go/v8/modules/apps/transfer"
)

// IBCModule implements the ICS26 interface for transfer given the transfer keeper.
type IBCModule struct {
	ibctransfer.IBCModule
	keeper Keeper
}

// NewIBCModule creates a new IBCModule given the keeper
func NewIBCModule(k Keeper) IBCModule {
	return IBCModule{
		keeper:    k,
		IBCModule: ibctransfer.NewIBCModule(k.Keeper),
	}
}
