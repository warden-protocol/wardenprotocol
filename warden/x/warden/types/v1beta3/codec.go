package v1beta3

import (
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgAddKeychainWriter{},
		&MsgAddSpaceOwner{},
		&MsgNewKeyRequest{},
		&MsgNewKeychain{},
		&MsgNewSignRequest{},
		&MsgNewSpace{},
		&MsgRemoveSpaceOwner{},
		&MsgUpdateKeychain{},
		&MsgUpdateSpace{},
	)

	// register Action result types
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgAddSpaceOwnerResponse{},
		&MsgNewKeyRequestResponse{},
		&MsgNewSignRequestResponse{},
		&MsgRemoveSpaceOwnerResponse{},
		&MsgUpdateSpaceResponse{},
	)

	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgUpdateParams{},
	)
	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}
