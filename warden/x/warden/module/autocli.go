package warden

import (
	autocliv1 "cosmossdk.io/api/cosmos/autocli/v1"

	modulev1 "github.com/warden-protocol/wardenprotocol/api/warden/warden/v1beta3"
)

// AutoCLIOptions implements the autocli.HasAutoCLIConfig interface.
func (am AppModule) AutoCLIOptions() *autocliv1.ModuleOptions {
	return &autocliv1.ModuleOptions{
		Query: &autocliv1.ServiceCommandDescriptor{
			Service: modulev1.Query_ServiceDesc.ServiceName,
			RpcCommandOptions: []*autocliv1.RpcCommandOptions{
				{
					RpcMethod: "Params",
					Use:       "params",
					Short:     "Shows the parameters of the module",
				},
			},
		},
		Tx: &autocliv1.ServiceCommandDescriptor{
			Service:              modulev1.Msg_ServiceDesc.ServiceName,
			EnhanceCustomCommand: true, // only required if you want to use the custom command
			RpcCommandOptions: []*autocliv1.RpcCommandOptions{
				{
					RpcMethod: "UpdateParams",
					Skip:      true, // skipped because authority gated
				},
				{
					RpcMethod: "AddSpaceOwner",
					Skip:      true, // skipped because x/act gated
				},
				{
					RpcMethod: "NewKeyRequest",
					Skip:      true, // skipped because x/act gated
				},
				{
					RpcMethod: "RemoveSpaceOwner",
					Skip:      true, // skipped because x/act gated
				},
				{
					RpcMethod: "UpdateKey",
					Skip:      true, // skipped because x/act gated
				},
				{
					RpcMethod: "UpdateSpace",
					Skip:      true, // skipped because x/act gated
				},
				{
					RpcMethod: "NewSignRequest",
					Skip:      true, // skipped because x/act gated
				},
				{
					RpcMethod: "FulfilKeyRequest",
					Skip:      true, // skipped in favor of the two separate commands for fulfilling or rejecting the request
				},
				{
					RpcMethod: "FulfilSignRequest",
					Skip:      true, // skipped in favor of the two separate commands for fulfilling or rejecting the request
				},
			},
		},
	}
}
