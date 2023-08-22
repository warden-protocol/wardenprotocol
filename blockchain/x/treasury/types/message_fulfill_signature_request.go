package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "cosmossdk.io/errors"
)

const TypeMsgFulfilSignatureRequest = "fulfil_signature_request"

var _ sdk.Msg = &MsgFulfilSignatureRequest{}

func NewMsgFulfilSignatureRequest(creator string, requestID uint64, status SignRequestStatus, result isMsgFulfilSignatureRequest_Result) *MsgFulfilSignatureRequest {
	return &MsgFulfilSignatureRequest{
		Creator:   creator,
		RequestId: requestID,
		Status:    status,
		Result:    result,
	}
}

func (msg *MsgFulfilSignatureRequest) Route() string {
	return RouterKey
}

func (msg *MsgFulfilSignatureRequest) Type() string {
	return TypeMsgFulfilSignatureRequest
}

func (msg *MsgFulfilSignatureRequest) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgFulfilSignatureRequest) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgFulfilSignatureRequest) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
