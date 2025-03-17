package types

import (
	"errors"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

var _ sdk.Msg = &MsgSetParams{}

// Type implements LegacyMsg interface.
func (msg MsgSetParams) Type() string { return sdk.MsgTypeURL(&msg) }

// ValidateBasic Implements sdk.Msg.
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

// Type implements LegacyMsg interface.
func (msg MsgBridge) Type() string { return sdk.MsgTypeURL(&msg) }

// ValidateBasic Implements sdk.Msg.
func (msg MsgBridge) ValidateBasic() error {
	if msg.Relayer == "" {
		return errors.New("relayer cannot be empty")
	}

	if msg.DestinationChain == "" {
		return errors.New("destinationChain cannot be empty")
	}

	if msg.WardenContractAddress == "" {
		return errors.New("wardenContractAddress cannot be empty")
	}

	return nil
}
