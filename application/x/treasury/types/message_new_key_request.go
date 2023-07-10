package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgNewKeyRequest = "new_key_request"

var _ sdk.Msg = &MsgNewKeyRequest{}

func NewMsgNewKeyRequest(creator string, workspaceID, keyringID uint64, keyType KeyType) *MsgNewKeyRequest {
	return &MsgNewKeyRequest{
		Creator:     creator,
		WorkspaceId: workspaceID,
		KeyringId:   keyringID,
		KeyType:     keyType,
	}
}

func (msg *MsgNewKeyRequest) Route() string {
	return RouterKey
}

func (msg *MsgNewKeyRequest) Type() string {
	return TypeMsgNewKeyRequest
}

func (msg *MsgNewKeyRequest) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgNewKeyRequest) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgNewKeyRequest) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
