// Copyright 2023 Qredo Ltd.
// This file is part of the Fusion library.
//
// The Fusion library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Fusion library. If not, see https://github.com/qredo/fusionchain/blob/main/LICENSE
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
		&MsgNewSignTransactionRequest{},
	)
	// this line is used by starport scaffolding # 3

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	Amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewProtoCodec(cdctypes.NewInterfaceRegistry())
)
