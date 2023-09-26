package types

import (
	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgUpdateWorkspace = "msg_update_workspace"

var _ sdk.Msg = &MsgUpdateWorkspace{}

func NewMsgUpdateWorkspace(creator string, workspaceAddr string, adminPolicyID uint64, signPolicyID uint64) *MsgUpdateWorkspace {
	return &MsgUpdateWorkspace{
		Creator:       creator,
		WorkspaceAddr: workspaceAddr,
		AdminPolicyId: adminPolicyID,
		SignPolicyId:  signPolicyID,
	}
}

func (msg *MsgUpdateWorkspace) Route() string {
	return RouterKey
}

func (msg *MsgUpdateWorkspace) Type() string {
	return TypeMsgUpdateWorkspace
}

func (msg *MsgUpdateWorkspace) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateWorkspace) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateWorkspace) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return errorsmod.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
