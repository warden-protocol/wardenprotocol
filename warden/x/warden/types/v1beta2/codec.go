package v1beta2

import (
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
	// this line is used by starport scaffolding # 1
)

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	registry.RegisterImplementations((*Metadata)(nil), &MetadataEthereum{})

	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgAddKeychainParty{},
		&MsgAddSpaceOwner{},
		&MsgNewKeyRequest{},
		&MsgNewKeychain{},
		&MsgNewSignatureRequest{},
		&MsgNewSpace{},
		&MsgRemoveSpaceOwner{},
		&MsgUpdateKeychain{},
		&MsgUpdateSpace{},
	)

	// register Action result types
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgAddSpaceOwnerResponse{},
		&MsgNewKeyRequestResponse{},
		&MsgNewSignatureRequestResponse{},
		&MsgRemoveSpaceOwnerResponse{},
		&MsgUpdateSpaceResponse{},
	)

	// this line is used by starport scaffolding # 3

	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgUpdateParams{},
	)
	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}
