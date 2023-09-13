package types

import (
	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgNewWorkspace = "new_workspace"

var _ sdk.Msg = &MsgNewWorkspace{}

func NewMsgNewWorkspace(creator string, adminPolicyID, signPolicyID uint64) *MsgNewWorkspace {
	return &MsgNewWorkspace{
		Creator:       creator,
		AdminPolicyId: adminPolicyID,
		SignPolicyId:  signPolicyID,
	}
}

func (msg *MsgNewWorkspace) Route() string {
	return RouterKey
}

func (msg *MsgNewWorkspace) Type() string {
	return TypeMsgNewWorkspace
}

func (msg *MsgNewWorkspace) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgNewWorkspace) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgNewWorkspace) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return errorsmod.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
