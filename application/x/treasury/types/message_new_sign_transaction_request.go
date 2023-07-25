package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgNewSignTransactionRequest = "new_sign_transaction_request"

var _ sdk.Msg = &MsgNewSignTransactionRequest{}

func NewMsgNewSignTransactionRequest(creator string, walletID uint64, transaction []byte) *MsgNewSignTransactionRequest {
	return &MsgNewSignTransactionRequest{
		Creator:     creator,
		WalletId:    walletID,
		Transaction: transaction,
	}
}

func (msg *MsgNewSignTransactionRequest) Route() string {
	return RouterKey
}

func (msg *MsgNewSignTransactionRequest) Type() string {
	return TypeMsgNewSignTransactionRequest
}

func (msg *MsgNewSignTransactionRequest) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgNewSignTransactionRequest) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgNewSignTransactionRequest) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
