package types

import (
	"fmt"

	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgRevokeAction = "revoke_action"

var _ sdk.Msg = &MsgRevokeAction{}

func NewMsgRevokeAction(creator string, actionID uint64, actionType string) *MsgRevokeAction {
	return &MsgRevokeAction{
		Creator:    creator,
		ActionType: actionType,
		ActionId:   actionID,
	}
}

func (msg *MsgRevokeAction) Route() string {
	return RouterKey
}

func (msg *MsgRevokeAction) Type() string {
	return TypeMsgRevokeAction
}

func (msg *MsgRevokeAction) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgRevokeAction) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgRevokeAction) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return errorsmod.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	if msg.ActionType == "" {
		return errorsmod.Wrapf(fmt.Errorf("invalid action type"), "action type cannot be empty")
	}
	return nil
}
