package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "cosmossdk.io/errors"
)

const TypeMsgApproveAction = "approve_action"

var _ sdk.Msg = &MsgApproveAction{}

func NewMsgApproveAction(creator string, actionType string, actionID uint64) *MsgApproveAction {
	return &MsgApproveAction{
		Creator:    creator,
		ActionType: actionType,
		ActionId:   actionID,
	}
}

func (msg *MsgApproveAction) Route() string {
	return RouterKey
}

func (msg *MsgApproveAction) Type() string {
	return TypeMsgApproveAction
}

func (msg *MsgApproveAction) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgApproveAction) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgApproveAction) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
