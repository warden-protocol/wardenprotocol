package types

import (
	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgBurn = "burn"

var _ sdk.Msg = &MsgBurn{}

func NewMsgBurn(creator string, fromWorkspaceAddr string, toWalletID uint64, isToken bool, tokenName string, tokenContractAddr string, amount uint64) *MsgBurn {
	return &MsgBurn{
		Creator:           creator,
		FromWorkspaceAddr: fromWorkspaceAddr,
		ToWalletId:        toWalletID,
		IsToken:           isToken,
		TokenName:         tokenName,
		TokenContractAddr: tokenContractAddr,
		Amount:            amount,
	}
}

func (msg *MsgBurn) Route() string {
	return RouterKey
}

func (msg *MsgBurn) Type() string {
	return TypeMsgBurn
}

func (msg *MsgBurn) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgBurn) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgBurn) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return errorsmod.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
