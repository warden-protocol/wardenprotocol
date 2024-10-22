package precompiles

import (
	ethcmn "github.com/ethereum/go-ethereum/common"
	"github.com/evmos/evmos/v20/x/evm/core/vm"

	actprecompile "github.com/warden-protocol/wardenprotocol/precompiles/act"
	cmn "github.com/warden-protocol/wardenprotocol/precompiles/common"
	wardenprecompile "github.com/warden-protocol/wardenprotocol/precompiles/warden"
	actkeeper "github.com/warden-protocol/wardenprotocol/warden/x/act/keeper"
	wardenkeeper "github.com/warden-protocol/wardenprotocol/warden/x/warden/keeper"
)

// Single point of all wardenprotocol precompiles initialization, including precompiles and events registry
func NewWardenPrecompiles(wardenkeeper wardenkeeper.Keeper, actkeeper actkeeper.Keeper) (map[ethcmn.Address]vm.PrecompiledContract, error) {
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

	return precompiles, nil
}
