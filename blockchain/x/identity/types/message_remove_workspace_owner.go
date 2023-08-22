package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "cosmossdk.io/errors"
)

const TypeMsgRemoveWorkspaceOwner = "remove_workspace_owner"

var _ sdk.Msg = &MsgRemoveWorkspaceOwner{}

func NewMsgRemoveWorkspaceOwner(creator string, wsAddr string, owner string) *MsgRemoveWorkspaceOwner {
	return &MsgRemoveWorkspaceOwner{
		Creator:       creator,
		WorkspaceAddr: wsAddr,
		Owner:         owner,
	}
}

func (msg *MsgRemoveWorkspaceOwner) Route() string {
	return RouterKey
}

func (msg *MsgRemoveWorkspaceOwner) Type() string {
	return TypeMsgRemoveWorkspaceOwner
}

func (msg *MsgRemoveWorkspaceOwner) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgRemoveWorkspaceOwner) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgRemoveWorkspaceOwner) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
