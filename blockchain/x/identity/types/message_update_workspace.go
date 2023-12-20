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
	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgUpdateWorkspace = "msg_update_workspace"

var _ sdk.Msg = &MsgUpdateWorkspace{}

func NewMsgUpdateWorkspace(creator string, workspaceAddr string, adminPolicyID uint64, signPolicyID, btl uint64) *MsgUpdateWorkspace {
	return &MsgUpdateWorkspace{
		Creator:       creator,
		WorkspaceAddr: workspaceAddr,
		AdminPolicyId: adminPolicyID,
		SignPolicyId:  signPolicyID,
		Btl:           btl,
	}
}

func (msg *MsgUpdateWorkspace) Route() string {
	return RouterKey
}

func (msg *MsgUpdateWorkspace) Type() string {
	return TypeMsgUpdateWorkspace
}

func (msg *MsgUpdateWorkspace) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateWorkspace) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateWorkspace) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return errorsmod.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
