package types

import (
	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgNewSignTransactionRequest = "new_sign_transaction_request"

var _ sdk.Msg = &MsgNewSignTransactionRequest{}

func NewMsgNewSignTransactionRequest(creator string, keyID uint64, walletType WalletType, transaction []byte, btl uint64) *MsgNewSignTransactionRequest {
	return &MsgNewSignTransactionRequest{
		Creator:             creator,
		KeyId:               keyID,
		WalletType:          walletType,
		UnsignedTransaction: transaction,
		Btl:                 btl,
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
		return errorsmod.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
