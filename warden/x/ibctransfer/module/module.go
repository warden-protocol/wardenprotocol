package module

import (
	"github.com/cosmos/cosmos-sdk/types/module"
	"github.com/warden-protocol/wardenprotocol/warden/x/ibctransfer/keeper"

	porttypes "github.com/cosmos/ibc-go/v8/modules/core/05-port/types"

	ibctransfer "github.com/cosmos/ibc-go/v8/modules/apps/transfer"
)

var (
	_ module.AppModule      = AppModule{}
	_ module.AppModuleBasic = AppModuleBasic{}
	_ porttypes.IBCModule   = IBCModule{}
)

// AppModuleBasic is the IBC Transfer AppModuleBasic
type AppModuleBasic struct {
	ibctransfer.AppModuleBasic
}

// AppModule represents the AppModule for this module
type AppModule struct {
	ibctransfer.AppModule
	keeper keeper.Keeper
}

// NewAppModule creates a new 20-transfer module
func NewAppModule(k keeper.Keeper) AppModule {
	return AppModule{
		keeper:    k,
		AppModule: ibctransfer.NewAppModule(k.Keeper),
	}
}
