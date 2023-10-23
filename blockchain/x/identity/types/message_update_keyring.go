package types

import (
	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgUpdateKeyring = "msg_update_keyring"

var _ sdk.Msg = &MsgUpdateKeyring{}

func NewMsgUpdateKeyring(creator, keyringAddr, description string, isActive bool) *MsgUpdateKeyring {
	return &MsgUpdateKeyring{
		Creator:     creator,
		KeyringAddr: keyringAddr,
		Description: description,
		IsActive:    isActive,
	}
}

func (msg *MsgUpdateKeyring) Route() string {
	return RouterKey
}

func (msg *MsgUpdateKeyring) Type() string {
	return TypeMsgUpdateKeyring
}

func (msg *MsgUpdateKeyring) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateKeyring) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateKeyring) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return errorsmod.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
