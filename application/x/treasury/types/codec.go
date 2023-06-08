package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	cdc.RegisterConcrete(&MsgNewWalletRequest{}, "treasury/NewWalletRequest", nil)
	cdc.RegisterConcrete(&MsgUpdateWalletRequest{}, "treasury/UpdateWalletRequest", nil)
	cdc.RegisterConcrete(&MsgNewSignatureRequest{}, "treasury/NewSignatureRequest", nil)
	cdc.RegisterConcrete(&MsgFulfillSignatureRequest{}, "treasury/FulfillSignatureRequest", nil)
	// this line is used by starport scaffolding # 2
}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgNewWalletRequest{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgUpdateWalletRequest{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgNewSignatureRequest{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgFulfillSignatureRequest{},
	)
	// this line is used by starport scaffolding # 3

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	Amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewProtoCodec(cdctypes.NewInterfaceRegistry())
)
