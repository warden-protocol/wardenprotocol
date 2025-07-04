package precompiles

import (
	evmkeeper "github.com/cosmos/evm/x/vm/keeper"
	ethcmn "github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/vm"
	oraclekeeper "github.com/skip-mev/slinky/x/oracle/keeper"

	actprecompile "github.com/warden-protocol/wardenprotocol/precompiles/act"
	asyncprecompile "github.com/warden-protocol/wardenprotocol/precompiles/async"
	cmn "github.com/warden-protocol/wardenprotocol/precompiles/common"
	jsonprecompile "github.com/warden-protocol/wardenprotocol/precompiles/json"
	schedprecompile "github.com/warden-protocol/wardenprotocol/precompiles/sched"
	slinkyprecompile "github.com/warden-protocol/wardenprotocol/precompiles/slinky"
	wardenprecompile "github.com/warden-protocol/wardenprotocol/precompiles/warden"
	actkeeper "github.com/warden-protocol/wardenprotocol/warden/x/act/keeper"
	asynckeeper "github.com/warden-protocol/wardenprotocol/warden/x/async/keeper"
	schedkeeper "github.com/warden-protocol/wardenprotocol/warden/x/sched/keeper"
	wardenkeeper "github.com/warden-protocol/wardenprotocol/warden/x/warden/keeper"
)

func WardenPrecompilesAddresses() []string {
	return []string{
		actprecompile.PrecompileAddress,
		slinkyprecompile.PrecompileAddress,
		jsonprecompile.PrecompileAddress,
		schedprecompile.PrecompileAddress,
		wardenprecompile.PrecompileAddress,
		asyncprecompile.PrecompileAddress,
	}
}

// Single point of all wardenprotocol precompiles initialization, including precompiles and events registry.
func NewWardenPrecompiles(
	wardenkeeper wardenkeeper.Keeper,
	actkeeper actkeeper.Keeper,
	oraclekeeper oraclekeeper.Keeper,
	asynckeeper asynckeeper.Keeper,
	schedkeeper schedkeeper.Keeper,
	evmKeeper *evmkeeper.Keeper,
) (map[ethcmn.Address]vm.PrecompiledContract, error) {
	precompiles := make(map[ethcmn.Address]vm.PrecompiledContract)
	eventsRegistry := cmn.NewEthEventsRegistry()

	newActPrecompile, err := actprecompile.NewPrecompile(actkeeper, eventsRegistry)
	if err != nil {
		return nil, err
	}

	precompiles[newActPrecompile.Address()] = newActPrecompile

	eventsRegistry.RegisterEvent("warden.act.v1beta1.EventActionStateChange", newActPrecompile.GetActionStateChangeEvent)
	eventsRegistry.RegisterEvent("warden.act.v1beta1.EventCreateTemplate", newActPrecompile.GetCreateTemplateEvent)
	eventsRegistry.RegisterEvent("warden.act.v1beta1.EventActionVoted", newActPrecompile.GetActionVotedEvent)
	eventsRegistry.RegisterEvent("warden.act.v1beta1.EventUpdateTemplate", newActPrecompile.GetUpdateTemplateEvent)
	eventsRegistry.RegisterEvent("warden.act.v1beta1.EventCreateAction", newActPrecompile.GetCreateActionEvent)

	newWardenPrecompile, err := wardenprecompile.NewPrecompile(wardenkeeper, actkeeper, eventsRegistry)
	if err != nil {
		return nil, err
	}

	precompiles[newWardenPrecompile.Address()] = newWardenPrecompile

	eventsRegistry.RegisterEvent("warden.warden.v1beta3.EventAddKeychainAdmin", newWardenPrecompile.GetAddKeychainAdminEvent)
	eventsRegistry.RegisterEvent("warden.warden.v1beta3.EventAddKeychainWriter", newWardenPrecompile.GetAddKeychainWriterEvent)
	eventsRegistry.RegisterEvent("warden.warden.v1beta3.EventNewKey", newWardenPrecompile.GetNewKeyEvent)
	eventsRegistry.RegisterEvent("warden.warden.v1beta3.EventRejectKeyRequest", newWardenPrecompile.GetRejectKeyRequestEvent)
	eventsRegistry.RegisterEvent("warden.warden.v1beta3.EventFulfilSignRequest", newWardenPrecompile.GetFulfilSignRequestEvent)
	eventsRegistry.RegisterEvent("warden.warden.v1beta3.EventRejectSignRequest", newWardenPrecompile.GetRejectSignRequestEvent)
	eventsRegistry.RegisterEvent("warden.warden.v1beta3.EventNewKeychain", newWardenPrecompile.GetNewKeychainEvent)
	eventsRegistry.RegisterEvent("warden.warden.v1beta3.EventCreateSpace", newWardenPrecompile.GetNewSpaceEvent)
	eventsRegistry.RegisterEvent("warden.warden.v1beta3.EventRemoveKeychainAdmin", newWardenPrecompile.GetRemoveKeychainAdminEvent)
	eventsRegistry.RegisterEvent("warden.warden.v1beta3.EventUpdateKeychain", newWardenPrecompile.GetUpdateKeychainEvent)
	eventsRegistry.RegisterEvent("warden.warden.v1beta3.EventAddSpaceOwner", newWardenPrecompile.GetAddSpaceOwnerEvent)
	eventsRegistry.RegisterEvent("warden.warden.v1beta3.EventRemoveSpaceOwner", newWardenPrecompile.GetRemoveSpaceOwnerEvent)
	eventsRegistry.RegisterEvent("warden.warden.v1beta3.EventNewKeyRequest", newWardenPrecompile.GetNewKeyRequestEvent)
	eventsRegistry.RegisterEvent("warden.warden.v1beta3.EventNewSignRequest", newWardenPrecompile.GetNewSignRequestEvent)
	eventsRegistry.RegisterEvent("warden.warden.v1beta3.EventUpdateKey", newWardenPrecompile.GetUpdateKeyEvent)
	eventsRegistry.RegisterEvent("warden.warden.v1beta3.EventUpdateSpace", newWardenPrecompile.GetUpdateSpaceEvent)

	newSlinkyPrecompile, err := slinkyprecompile.NewPrecompile(oraclekeeper, eventsRegistry)
	if err != nil {
		return nil, err
	}

	precompiles[newSlinkyPrecompile.Address()] = newSlinkyPrecompile

	newAsyncPrecompile, err := asyncprecompile.NewPrecompile(asynckeeper, eventsRegistry)
	if err != nil {
		return nil, err
	}

	precompiles[newAsyncPrecompile.Address()] = newAsyncPrecompile

	eventsRegistry.RegisterEvent("warden.async.v1beta1.EventCreateTask", newAsyncPrecompile.GetCreateTaskEvent)

	newJsonPrecompile, err := jsonprecompile.NewPrecompile(cmn.NewAbiEncoder())
	if err != nil {
		return nil, err
	}

	precompiles[newJsonPrecompile.Address()] = newJsonPrecompile

	newSchedPrecompile, err := schedprecompile.NewPrecompile(schedkeeper, evmKeeper, eventsRegistry)
	if err != nil {
		return nil, err
	}

	precompiles[newSchedPrecompile.Address()] = newSchedPrecompile

	return precompiles, nil
}
