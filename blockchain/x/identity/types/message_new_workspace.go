// Copyright 2023 Qredo Ltd.
// This file is part of the Fusion library.
//
// The Fusion library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Fusion library. If not, see https://github.com/qredo/fusionchain/blob/main/LICENSE
package types

import (
	"fmt"

	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgNewWorkspace = "new_workspace"

var _ sdk.Msg = &MsgNewWorkspace{}

func NewMsgNewWorkspace(creator string, adminPolicyID, signPolicyID uint64, additionalOwners ...string) *MsgNewWorkspace {
	return &MsgNewWorkspace{
		Creator:          creator,
		AdminPolicyId:    adminPolicyID,
		SignPolicyId:     signPolicyID,
		AdditionalOwners: additionalOwners,
	}
}

func (msg *MsgNewWorkspace) Route() string {
	return RouterKey
}

func (msg *MsgNewWorkspace) Type() string {
	return TypeMsgNewWorkspace
}

func (msg *MsgNewWorkspace) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgNewWorkspace) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgNewWorkspace) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return errorsmod.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	for _, owner := range msg.AdditionalOwners {
		_, err := sdk.AccAddressFromBech32(owner)
		if err != nil {
			return errorsmod.Wrapf(sdkerrors.ErrInvalidAddress, "invalid owner address (%s)", err)
		}
		if owner == msg.Creator {
			return errorsmod.Wrapf(fmt.Errorf("owner duplicated"), "creator is already an owner")
		}
	}
	return nil
}
