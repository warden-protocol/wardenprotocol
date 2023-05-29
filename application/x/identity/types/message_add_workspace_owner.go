package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgAddWorkspaceOwner = "add_workspace_owner"

var _ sdk.Msg = &MsgAddWorkspaceOwner{}

func NewMsgAddWorkspaceOwner(creator string) *MsgAddWorkspaceOwner {
	return &MsgAddWorkspaceOwner{
		Creator: creator,
	}
}

func (msg *MsgAddWorkspaceOwner) Route() string {
	return RouterKey
}

func (msg *MsgAddWorkspaceOwner) Type() string {
	return TypeMsgAddWorkspaceOwner
}

func (msg *MsgAddWorkspaceOwner) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgAddWorkspaceOwner) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgAddWorkspaceOwner) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
