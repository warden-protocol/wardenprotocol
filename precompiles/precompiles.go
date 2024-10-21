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
	er := cmn.NewEthEventsRegistry()
	actprecompile, err := actprecompile.NewPrecompile(actkeeper, er)
	if err != nil {
		return nil, err
	}
	precompiles[actprecompile.Address()] = actprecompile

	er.RegisterEvent("warden.act.v1beta1.EventActionStateChange", actprecompile.GetActionStateChangeEvent)
	er.RegisterEvent("warden.act.v1beta1.EventCreateTemplate", actprecompile.GetCreateTemplateEvent)
	er.RegisterEvent("warden.act.v1beta1.EventActionVoted", actprecompile.GetActionVotedEvent)
	er.RegisterEvent("warden.act.v1beta1.EventUpdateTemplate", actprecompile.GetUpdateTemplateEvent)
	er.RegisterEvent("warden.act.v1beta1.EventCreateAction", actprecompile.GetCreateActionEvent)

	wardenprecompile, err := wardenprecompile.NewPrecompile(wardenkeeper, actkeeper, er)
	if err != nil {
		return nil, err
	}
	precompiles[wardenprecompile.Address()] = wardenprecompile

	er.RegisterEvent("warden.warden.v1beta3.EventAddKeychainAdmin", wardenprecompile.GetAddKeychainAdminEvent)
	er.RegisterEvent("warden.warden.v1beta3.EventAddKeychainWriter", wardenprecompile.GetAddKeychainWriterEvent)
	er.RegisterEvent("warden.warden.v1beta3.EventNewKey", wardenprecompile.GetNewKeyEvent)
	er.RegisterEvent("warden.warden.v1beta3.EventRejectKeyRequest", wardenprecompile.GetRejectKeyRequestEvent)
	er.RegisterEvent("warden.warden.v1beta3.EventFulfilSignRequest", wardenprecompile.GetFulfilSignRequestEvent)
	er.RegisterEvent("warden.warden.v1beta3.EventRejectSignRequest", wardenprecompile.GetRejectSignRequestEvent)
	er.RegisterEvent("warden.warden.v1beta3.EventNewKeychain", wardenprecompile.GetNewKeychainEvent)
	er.RegisterEvent("warden.warden.v1beta3.EventCreateSpace", wardenprecompile.GetNewSpaceEvent)
	er.RegisterEvent("warden.warden.v1beta3.EventRemoveKeychainAdmin", wardenprecompile.GetRemoveKeychainAdminEvent)
	er.RegisterEvent("warden.warden.v1beta3.EventUpdateKeychain", wardenprecompile.GetUpdateKeychainEvent)
	er.RegisterEvent("warden.warden.v1beta3.EventAddSpaceOwner", wardenprecompile.GetAddSpaceOwnerEvent)
	er.RegisterEvent("warden.warden.v1beta3.EventRemoveSpaceOwner", wardenprecompile.GetRemoveSpaceOwnerEvent)
	er.RegisterEvent("warden.warden.v1beta3.EventNewKeyRequest", wardenprecompile.GetNewKeyRequestEvent)
	er.RegisterEvent("warden.warden.v1beta3.EventNewSignRequest", wardenprecompile.GetNewSignRequestEvent)
	er.RegisterEvent("warden.warden.v1beta3.EventUpdateKey", wardenprecompile.GetUpdateKeyEvent)
	er.RegisterEvent("warden.warden.v1beta3.EventUpdateSpace", wardenprecompile.GetUpdateSpaceEvent)

	return precompiles, nil
}
