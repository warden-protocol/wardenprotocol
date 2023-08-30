package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	cdc.RegisterConcrete(&MsgNewWorkspace{}, "identity/NewWorkspace", nil)
	cdc.RegisterConcrete(&MsgAddWorkspaceOwner{}, "identity/AddWorkspaceOwner", nil)
	cdc.RegisterConcrete(&MsgRemoveWorkspaceOwner{}, "identity/RemoveWorkspaceOwner", nil)
	cdc.RegisterConcrete(&MsgNewKeyring{}, "identity/NewKeyring", nil)
	cdc.RegisterConcrete(&MsgAddKeyringParty{}, "identity/AddKeyringParty", nil)
	cdc.RegisterConcrete(&MsgAppendChildWorkspace{}, "identity/MsgAppendChildWorkspace", nil)
	cdc.RegisterConcrete(&MsgNewChildWorkspace{}, "identity/MsgNewChildWorkspace", nil)
	// this line is used by starport scaffolding # 2
}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgNewWorkspace{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgAddWorkspaceOwner{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgRemoveWorkspaceOwner{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgNewKeyring{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgAddKeyringParty{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgAppendChildWorkspace{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgNewChildWorkspace{},
	)
	// this line is used by starport scaffolding # 3

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	Amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewProtoCodec(cdctypes.NewInterfaceRegistry())
)
