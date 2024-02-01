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
	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
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
		return errorsmod.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
