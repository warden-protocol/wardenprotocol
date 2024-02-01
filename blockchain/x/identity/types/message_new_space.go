// Copyright 2024
//
// This file includes work covered by the following copyright and permission notices:
//
// Copyright 2023 Qredo Ltd.
// Licensed under the Apache License, Version 2.0;
//
// This file is part of the Warden Protocol library.
//
// The Warden Protocol library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Warden Protocol library. If not, see https://github.com/warden-protocol/wardenprotocol/blob/main/LICENSE
package types

import (
	"fmt"

	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgNewSpace = "new_space"

var _ sdk.Msg = &MsgNewSpace{}

func NewMsgNewSpace(creator string, adminIntentID, signIntentID uint64, additionalOwners ...string) *MsgNewSpace {
	return &MsgNewSpace{
		Creator:          creator,
		AdminIntentId:    adminIntentID,
		SignIntentId:     signIntentID,
		AdditionalOwners: additionalOwners,
	}
}

func (msg *MsgNewSpace) Route() string {
	return RouterKey
}

func (msg *MsgNewSpace) Type() string {
	return TypeMsgNewSpace
}

func (msg *MsgNewSpace) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgNewSpace) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgNewSpace) ValidateBasic() error {
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
