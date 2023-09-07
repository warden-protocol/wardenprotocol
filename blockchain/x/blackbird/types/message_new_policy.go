package types

import (
	errorsmod "cosmossdk.io/errors"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgNewPolicy = "new_policy"

var _ sdk.Msg = &MsgNewPolicy{}

func NewMsgNewPolicy(creator string, name string, policy *codectypes.Any) *MsgNewPolicy {
	return &MsgNewPolicy{
		Creator: creator,
		Name:    name,
		Policy:  policy,
	}
}

func (msg *MsgNewPolicy) Route() string {
	return RouterKey
}

func (msg *MsgNewPolicy) Type() string {
	return TypeMsgNewPolicy
}

func (msg *MsgNewPolicy) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgNewPolicy) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgNewPolicy) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return errorsmod.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
