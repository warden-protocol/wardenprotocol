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
	// this line is used by starport scaffolding # 2
}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	registry.RegisterImplementations((*policy.Policy)(nil), &BlackbirdPolicy{})
	registry.RegisterImplementations((*policy.PolicyPayloadI)(nil), &BlackbirdPolicyPayload{})
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgApproveAction{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgNewPolicy{},
	)
	// this line is used by starport scaffolding # 3

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	Amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewProtoCodec(cdctypes.NewInterfaceRegistry())
)
