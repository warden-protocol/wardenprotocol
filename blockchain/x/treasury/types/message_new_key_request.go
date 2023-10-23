package types

import (
	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgNewKeyRequest = "new_key_request"

var _ sdk.Msg = &MsgNewKeyRequest{}

func NewMsgNewKeyRequest(creator, wsAddr, keyringAddr string, keyType KeyType, btl uint64) *MsgNewKeyRequest {
	return &MsgNewKeyRequest{
		Creator:       creator,
		WorkspaceAddr: wsAddr,
		KeyringAddr:   keyringAddr,
		KeyType:       keyType,
		Btl:           btl,
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
		return errorsmod.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
