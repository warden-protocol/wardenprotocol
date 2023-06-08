package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgFulfillSignatureRequest = "fulfill_signature_request"

var _ sdk.Msg = &MsgFulfillSignatureRequest{}

func NewMsgFulfillSignatureRequest(creator string) *MsgFulfillSignatureRequest {
	return &MsgFulfillSignatureRequest{
		Creator: creator,
	}
}

func (msg *MsgFulfillSignatureRequest) Route() string {
	return RouterKey
}

func (msg *MsgFulfillSignatureRequest) Type() string {
	return TypeMsgFulfillSignatureRequest
}

func (msg *MsgFulfillSignatureRequest) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgFulfillSignatureRequest) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgFulfillSignatureRequest) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
