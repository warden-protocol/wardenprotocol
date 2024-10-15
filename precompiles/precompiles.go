package precompiles

import (
	ethcmn "github.com/ethereum/go-ethereum/common"
	"github.com/evmos/evmos/v20/x/evm/core/vm"

	actmodule "github.com/warden-protocol/wardenprotocol/api/warden/act/v1beta1"
	wardenmodule "github.com/warden-protocol/wardenprotocol/api/warden/warden/v1beta3"
	actprecompile "github.com/warden-protocol/wardenprotocol/precompiles/act"
	cmn "github.com/warden-protocol/wardenprotocol/precompiles/common"
	wardenprecompile "github.com/warden-protocol/wardenprotocol/precompiles/warden"
	actkeeper "github.com/warden-protocol/wardenprotocol/warden/x/act/keeper"
	wardenkeeper "github.com/warden-protocol/wardenprotocol/warden/x/warden/keeper"
)

// Single point of all wardenprotocol precompiles initialization, including precompiles and events registry
func NewWardenPrecompiles(wardenkeeper wardenkeeper.Keeper, actkeeper actkeeper.Keeper) (map[ethcmn.Address]vm.PrecompiledContract, error) {
	precompiles := make(map[ethcmn.Address]vm.PrecompiledContract)
	er := cmn.GetEthEventsRegistry()
	actprecompile, err := actprecompile.NewPrecompile(actkeeper)
	if err != nil {
		return nil, err
	}
	precompiles[actprecompile.Address()] = actprecompile

	er.RegisterEvent(actmodule.Msg_CheckAction_FullMethodName, actprecompile.GetActionStateChangeEvent)
	er.RegisterEvent(actmodule.Msg_NewTemplate_FullMethodName, actprecompile.GetCreateTemplateEvent)
	er.RegisterEvent(actmodule.Msg_RevokeAction_FullMethodName, actprecompile.GetActionStateChangeEvent)
	er.RegisterEvent(actmodule.Msg_UpdateTemplate_FullMethodName, actprecompile.GetActionStateChangeEvent)
	er.RegisterEvent(actmodule.Msg_VoteForAction_FullMethodName, actprecompile.GetActionVotedEvent)

	wardenprecompile, err := wardenprecompile.NewPrecompile(wardenkeeper, actkeeper)
	if err != nil {
		return nil, err
	}
	precompiles[wardenprecompile.Address()] = wardenprecompile

	er.RegisterEvent(wardenmodule.Msg_AddKeychainAdmin_FullMethodName, wardenprecompile.GetAddKeychainAdminEvent)
	er.RegisterEvent(wardenmodule.Msg_AddKeychainWriter_FullMethodName, wardenprecompile.GetAddKeychainWriterEvent)
	er.RegisterEvent(wardenmodule.Msg_FulfilKeyRequest_FullMethodName, wardenprecompile.GetNewKeyOrRejectKeyRequestEvent)
	er.RegisterEvent(wardenmodule.Msg_FulfilSignRequest_FullMethodName, wardenprecompile.GetFulfilOrRejectSignRequestEvent)
	er.RegisterEvent(wardenmodule.Msg_NewKeychain_FullMethodName, wardenprecompile.GetNewKeychainEvent)
	er.RegisterEvent(wardenmodule.Msg_NewSpace_FullMethodName, wardenprecompile.GetNewSpaceEvent)
	er.RegisterEvent(wardenmodule.Msg_RemoveKeychainAdmin_FullMethodName, wardenprecompile.GetRemoveKeychainAdminEvent)
	er.RegisterEvent(wardenmodule.Msg_UpdateKeychain_FullMethodName, wardenprecompile.GetUpdateKeychainEvent)

	// er.RegisterEvent(wardenmodule.Msg_AddSpaceOwner_FullMethodName, wardenprecompile.AddSpaceOwnerEvent)
	// er.RegisterEvent(wardenmodule.Msg_RemoveSpaceOwner_FullMethodName, wardenprecompile.RemoveSpaceOwnerEvent)
	// er.RegisterEvent(wardenmodule.Msg_NewKeyRequest_FullMethodName, wardenprecompile.NewKeyRequestEvent)
	// er.RegisterEvent(wardenmodule.Msg_NewSignRequest_FullMethodName, wardenprecompile.NewSignRequestEvent)
	// er.RegisterEvent(wardenmodule.Msg_UpdateKey_FullMethodName, wardenprecompile.UpdateKeyEvent)
	// er.RegisterEvent(wardenmodule.Msg_UpdateSpace_FullMethodName, wardenprecompile.UpdateSpaceEvent)

	return precompiles, nil
}
