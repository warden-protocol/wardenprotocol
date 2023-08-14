package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	cdc.RegisterConcrete(&MsgNewKeyRequest{}, "treasury/NewKeyRequest", nil)
	cdc.RegisterConcrete(&MsgUpdateKeyRequest{}, "treasury/UpdateKeyRequest", nil)
	cdc.RegisterConcrete(&MsgNewSignatureRequest{}, "treasury/NewSignatureRequest", nil)
	cdc.RegisterConcrete(&MsgFulfilSignatureRequest{}, "treasury/FulfilSignatureRequest", nil)
	cdc.RegisterConcrete(&MsgNewWalletRequest{}, "treasury/NewWalletRequest", nil)
	cdc.RegisterConcrete(&MsgNewSignTransactionRequest{}, "treasury/MsgNewSignTransactionRequest", nil)
	// this line is used by starport scaffolding # 2
}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgNewKeyRequest{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgUpdateKeyRequest{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgNewSignatureRequest{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgFulfilSignatureRequest{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgNewWalletRequest{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgNewSignTransactionRequest{},
	)
	// this line is used by starport scaffolding # 3

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	Amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewProtoCodec(cdctypes.NewInterfaceRegistry())
)
