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
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/warden-protocol/wardenprotocol/testutil/sample"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestMsgNewSpace_NewMsgNewSpace(t *testing.T) {

	tests := []struct {
		name string
		msg  *MsgNewSpace
	}{
		{
			name: "PASS: happy path",
			msg: &MsgNewSpace{
				Creator: sample.AccAddress(),
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := NewMsgNewSpace(tt.msg.Creator, tt.msg.AdminIntentId, tt.msg.SignIntentId)

			assert.Equalf(t, tt.msg, got, "want", tt.msg)
		})
	}
}

func TestMsgNewSpace_Route(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgNewSpace
	}{
		{
			name: "valid address",
			msg: MsgNewSpace{
				Creator: sample.AccAddress(),
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			assert.Equal(t, ModuleName, tt.msg.Route(), "Route()")
		})
	}
}

func TestMsgNewSpace_Type(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgNewSpace
	}{
		{
			name: "valid address",
			msg: MsgNewSpace{
				Creator: sample.AccAddress(),
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			assert.Equal(t, TypeMsgNewSpace, tt.msg.Type(), "Type()")
		})
	}
}

func TestMsgNewSpace_GetSigners(t *testing.T) {

	tests := []struct {
		name string
		msg  *MsgNewSpace
	}{
		{
			name: "PASS: happy path",
			msg: &MsgNewSpace{
				Creator: "warden1n7x7nv2urvdtc36tvhvc4dg6wfnnwh3c5jckcg",
			},
		},
		{
			name: "FAIL: invalid signer",
			msg: &MsgNewSpace{
				Creator: "invalid",
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			acc, err := sdk.AccAddressFromBech32(tt.msg.Creator)
			if err != nil {
				assert.Panics(t, func() { tt.msg.GetSigners() })
			} else {
				msg := NewMsgNewSpace(tt.msg.Creator, tt.msg.AdminIntentId, tt.msg.SignIntentId)
				got := msg.GetSigners()

				assert.Equal(t, []sdk.AccAddress{acc}, got)
			}
		})
	}
}

func TestMsgNewSpace_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgNewSpace
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgNewSpace{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgNewSpace{
				Creator: sample.AccAddress(),
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := tt.msg.ValidateBasic()
			if tt.err != nil {
				require.ErrorIs(t, err, tt.err)
				return
			}
			require.NoError(t, err)
		})
	}
}
