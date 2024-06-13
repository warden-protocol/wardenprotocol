package types

import (
	fmt "fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

var _ sdk.Msg = &MsgSetParams{}

func NewMsgSetParams(
	gmpAddress string,
	gmpChannel string,
	gmpTimeout int64,
	feeRecipient string,
	govAddress string,
) *MsgSetParams {
	params := &Params{
		GmpAddress:   gmpAddress,
		GmpChannel:   gmpChannel,
		GmpTimeout:   gmpTimeout,
		FeeRecipient: feeRecipient,
	}
	return &MsgSetParams{
		Params:    params,
		Authority: govAddress,
	}
}

// Type implements LegacyMsg interface
func (msg MsgSetParams) Type() string { return sdk.MsgTypeURL(&msg) }

// ValidateBasic Implements sdk.Msg
func (msg MsgSetParams) ValidateBasic() error {
	return msg.Params.Validate()
}

func NewMsgBridge(
	relayer string,
	destinationChain string,
	wardenContractAddress string,
	destinationContractAddress string,
	destinationContractCalldata []byte,
	token sdk.Coin,
) *MsgBridge {
	return &MsgBridge{
		Relayer:                     relayer,
		DestinationChain:            destinationChain,
		WardenContractAddress:       wardenContractAddress,
		DestinationContractAddress:  destinationContractAddress,
		DestinationContractCalldata: destinationContractCalldata,
		Token:                       token,
	}
}

// Type implements LegacyMsg interface
func (msg MsgBridge) Type() string { return sdk.MsgTypeURL(&msg) }

// ValidateBasic Implements sdk.Msg
func (msg MsgBridge) ValidateBasic() error {
	if msg.Relayer == "" {
		return fmt.Errorf("relayer cannot be empty")
	}
	if msg.DestinationChain == "" {
		return fmt.Errorf("destinationChain cannot be empty")
	}
	if msg.WardenContractAddress == "" {
		return fmt.Errorf("wardenContractAddress cannot be empty")
	}

	return nil
}
