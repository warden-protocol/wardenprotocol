package types

import (
	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	"github.com/qredo/fusionchain/x/treasury/types"
)

const TypeMsgMint = "mint"

var _ sdk.Msg = &MsgMint{}

func NewMsgMint(creator string, workspaceAddr string, walletType types.WalletType, isToken bool, tokenName string, tokenContractAddr string, amount uint64) *MsgMint {
	return &MsgMint{
		Creator:           creator,
		WorkspaceAddr:     workspaceAddr,
		WalletType:        walletType,
		IsToken:           isToken,
		TokenName:         tokenName,
		TokenContractAddr: tokenContractAddr,
		Amount:            amount,
	}
}

func (msg *MsgMint) Route() string {
	return RouterKey
}

func (msg *MsgMint) Type() string {
	return TypeMsgMint
}

func (msg *MsgMint) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgMint) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgMint) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return errorsmod.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
