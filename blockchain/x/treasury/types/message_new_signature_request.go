package types

import (
	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgNewSignatureRequest = "new_signature_request"

var _ sdk.Msg = &MsgNewSignatureRequest{}

func NewMsgNewSignatureRequest(creator string, keyID uint64, dataForSigning []byte, btl uint64) *MsgNewSignatureRequest {
	return &MsgNewSignatureRequest{
		Creator:        creator,
		KeyId:          keyID,
		DataForSigning: dataForSigning,
		Btl:            btl,
	}
}

func (msg *MsgNewSignatureRequest) Route() string {
	return RouterKey
}

func (msg *MsgNewSignatureRequest) Type() string {
	return TypeMsgNewSignatureRequest
}

func (msg *MsgNewSignatureRequest) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgNewSignatureRequest) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgNewSignatureRequest) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return errorsmod.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
