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
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgNewSignTransactionRequest = "new_sign_transaction_request"

var _ sdk.Msg = &MsgNewSignTransactionRequest{}

func NewMsgNewSignTransactionRequest(creator string, keyID uint64, walletType WalletType, transaction []byte, btl uint64, meta *cdctypes.Any) *MsgNewSignTransactionRequest {
	return &MsgNewSignTransactionRequest{
		Creator:             creator,
		KeyId:               keyID,
		WalletType:          walletType,
		UnsignedTransaction: transaction,
		Btl:                 btl,
		Metadata:            meta,
	}
}

func (msg *MsgNewSignTransactionRequest) Route() string {
	return RouterKey
}

func (msg *MsgNewSignTransactionRequest) Type() string {
	return TypeMsgNewSignTransactionRequest
}

func (msg *MsgNewSignTransactionRequest) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgNewSignTransactionRequest) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgNewSignTransactionRequest) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return errorsmod.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
