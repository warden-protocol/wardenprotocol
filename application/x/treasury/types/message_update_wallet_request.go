package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgUpdateWalletRequest = "update_wallet_request"

var _ sdk.Msg = &MsgUpdateWalletRequest{}

func NewMsgUpdateWalletRequest(creator string) *MsgUpdateWalletRequest {
	return &MsgUpdateWalletRequest{
		Creator: creator,
	}
}

func (msg *MsgUpdateWalletRequest) Route() string {
	return RouterKey
}

func (msg *MsgUpdateWalletRequest) Type() string {
	return TypeMsgUpdateWalletRequest
}

func (msg *MsgUpdateWalletRequest) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateWalletRequest) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateWalletRequest) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
