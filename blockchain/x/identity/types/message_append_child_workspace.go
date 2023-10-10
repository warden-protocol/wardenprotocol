package types

import (
	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgAppendChildWorkspace = "append_child_workspace"

var _ sdk.Msg = &MsgAppendChildWorkspace{}

func NewMsgAppendChildWorkspace(creator, parentWorkspaceAddr, childWorkspaceAddr string, btl uint64) *MsgAppendChildWorkspace {
	return &MsgAppendChildWorkspace{
		Creator:             creator,
		ParentWorkspaceAddr: parentWorkspaceAddr,
		ChildWorkspaceAddr:  childWorkspaceAddr,
		Btl:                 btl,
	}
}

func (msg *MsgAppendChildWorkspace) Route() string {
	return RouterKey
}

func (msg *MsgAppendChildWorkspace) Type() string {
	return TypeMsgAppendChildWorkspace
}

func (msg *MsgAppendChildWorkspace) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgAppendChildWorkspace) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgAppendChildWorkspace) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return errorsmod.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
