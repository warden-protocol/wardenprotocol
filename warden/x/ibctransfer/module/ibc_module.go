package module

import (
	ibctransfer "github.com/cosmos/ibc-go/v8/modules/apps/transfer"
	"github.com/warden-protocol/wardenprotocol/warden/x/ibctransfer/keeper"
)

// IBCModule implements the ICS26 interface for transfer given the transfer keeper.
type IBCModule struct {
	ibctransfer.IBCModule
	keeper keeper.Keeper
}

// NewIBCModule creates a new IBCModule given the keeper
func NewIBCModule(k keeper.Keeper) IBCModule {
	return IBCModule{
		keeper:    k,
		IBCModule: ibctransfer.NewIBCModule(k.Keeper),
	}
}
