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
	"github.com/qredo/fusionchain/policy"

	// this line is used by starport scaffolding # 1
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	cdc.RegisterConcrete(&MsgApproveAction{}, "policy/ApproveAction", nil)
	cdc.RegisterConcrete(&MsgNewPolicy{}, "policy/MsgNewPolicy", nil)
	cdc.RegisterConcrete(&MsgRevokeAction{}, "policy/MsgRevokeAction", nil)
	// this line is used by starport scaffolding # 2
}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	registry.RegisterImplementations((*policy.Policy)(nil), &BlackbirdPolicy{})
	registry.RegisterImplementations((*policy.Policy)(nil), &BoolparserPolicy{})
	registry.RegisterImplementations((*policy.PolicyPayloadI)(nil), &BlackbirdPolicyPayload{})
	registry.RegisterImplementations((*any)(nil),
		&BlackbirdPolicyMetadata{},
	)

	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgApproveAction{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgNewPolicy{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgRevokeAction{},
	)
	// this line is used by starport scaffolding # 3

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	Amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewProtoCodec(cdctypes.NewInterfaceRegistry())
)
