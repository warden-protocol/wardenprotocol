package types

import (
	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgNewKeyring = "new_keyring"

var _ sdk.Msg = &MsgNewKeyring{}

func NewMsgNewKeyring(creator, description string, adminPolicyID, keyReqFee, sigReqFee uint64) *MsgNewKeyring {
	fees := &KeyringFees{
		KeyReq: keyReqFee,
		SigReq: sigReqFee,
	}
	return &MsgNewKeyring{
		Creator:       creator,
		Description:   description,
		AdminPolicyId: adminPolicyID,
		Fees:          fees,
	}
}

func (msg *MsgNewKeyring) Route() string {
	return RouterKey
}

func (msg *MsgNewKeyring) Type() string {
	return TypeMsgNewKeyring
}

func (msg *MsgNewKeyring) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgNewKeyring) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgNewKeyring) ValidateBasic() error {
	if msg.Description == "" {
		return ErrEmptyDesc
	}
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return errorsmod.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
