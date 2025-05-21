package module

import (
	"github.com/cosmos/cosmos-sdk/types/module"
	transfer "github.com/cosmos/evm/x/ibc/transfer"

	ibctransfer "github.com/cosmos/ibc-go/v8/modules/apps/transfer"

	porttypes "github.com/cosmos/ibc-go/v8/modules/core/05-port/types"

	"github.com/warden-protocol/wardenprotocol/warden/x/ibctransfer/keeper"
)

var (
	_ module.AppModule      = AppModule{}
	_ module.AppModuleBasic = AppModuleBasic{}
	_ porttypes.IBCModule   = IBCModule{}
)

// AppModuleBasic is the IBC Transfer AppModuleBasic.
type AppModuleBasic struct {
	transfer.AppModuleBasic
}

// NewAppModuleBasic returns a basic version of the module suitable for interface registration
func NewAppModuleBasic() AppModule {
	// Use the underlying transfer module's NewAppModuleBasic to avoid nil issues
	baseModule := &ibctransfer.AppModule{}
	return AppModule{
		AppModule: transfer.AppModule{AppModule: baseModule},
	}
}

// AppModule represents the AppModule for this module.
type AppModule struct {
	transfer.AppModule
	keeper keeper.Keeper
}

// NewAppModule creates a new 20-transfer module.
func NewAppModule(k keeper.Keeper) AppModule {
	return AppModule{
		keeper:    k,
		AppModule: transfer.NewAppModule(k.Keeper),
	}
}
