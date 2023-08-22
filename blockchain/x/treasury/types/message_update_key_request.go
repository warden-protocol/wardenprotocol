package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "cosmossdk.io/errors"
)

const TypeMsgUpdateKeyRequest = "update_key_request"

var _ sdk.Msg = &MsgUpdateKeyRequest{}

func NewMsgUpdateKeyRequest(creator string, requestID uint64, status KeyRequestStatus, result isMsgUpdateKeyRequest_Result) *MsgUpdateKeyRequest {
	return &MsgUpdateKeyRequest{
		Creator:   creator,
		RequestId: requestID,
		Status:    status,
		Result:    result,
	}
}

func (msg *MsgUpdateKeyRequest) Route() string {
	return RouterKey
}

func (msg *MsgUpdateKeyRequest) Type() string {
	return TypeMsgUpdateKeyRequest
}

func (msg *MsgUpdateKeyRequest) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateKeyRequest) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateKeyRequest) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
