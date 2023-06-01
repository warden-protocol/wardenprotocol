package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgNewWalletRequest = "new_wallet_request"

var _ sdk.Msg = &MsgNewWalletRequest{}

func NewMsgNewWalletRequest(creator string, workspaceID uint64, walletType WalletType) *MsgNewWalletRequest {
	return &MsgNewWalletRequest{
		Creator:     creator,
		WorkspaceId: workspaceID,
		WalletType:  walletType,
	}
}

func (msg *MsgNewWalletRequest) Route() string {
	return RouterKey
}

func (msg *MsgNewWalletRequest) Type() string {
	return TypeMsgNewWalletRequest
}

func (msg *MsgNewWalletRequest) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgNewWalletRequest) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgNewWalletRequest) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
