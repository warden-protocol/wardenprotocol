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

func TestMsgNewKeychain_NewMsgNewKeychain(t *testing.T) {
	tests := []struct {
		name string
		msg  *MsgNewKeychain
		err  error
	}{
		{
			name: "PASS: happy path",
			msg: &MsgNewKeychain{
				Creator:       sample.AccAddress(),
				Description:   "Test Keychain",
				AdminIntentId: 0,
				Fees:          &KeychainFees{KeyReq: 0, SigReq: 0},
			},
			err: nil,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := NewMsgNewKeychain(tt.msg.Creator, tt.msg.Description, tt.msg.AdminIntentId, tt.msg.Fees.KeyReq, tt.msg.Fees.SigReq)

			assert.Equalf(t, tt.msg, got, "want", tt.msg)
		})
	}
}

func TestMsgNewKeychain_Route(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgNewKeychain
	}{
		{
			name: "valid address",
			msg: MsgNewKeychain{
				Creator:       sample.AccAddress(),
				Description:   "Test Keychain",
				AdminIntentId: 0,
				Fees:          &KeychainFees{KeyReq: 0, SigReq: 0},
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			assert.Equal(t, ModuleName, tt.msg.Route(), "Route()")
		})
	}
}

func TestMsgNewKeychain_Type(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgNewKeychain
	}{
		{
			name: "valid address",
			msg: MsgNewKeychain{
				Creator:       sample.AccAddress(),
				Description:   "Test Keychain",
				AdminIntentId: 0,
				Fees:          &KeychainFees{KeyReq: 0, SigReq: 0},
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			assert.Equal(t, TypeMsgNewKeychain, tt.msg.Type(), "Type()")
		})
	}
}

func TestMsgNewKeychain_GetSigners(t *testing.T) {
	tests := []struct {
		name string
		msg  *MsgNewKeychain
	}{
		{
			name: "PASS: happy path",
			msg: &MsgNewKeychain{
				Creator:       "warden1n7x7nv2urvdtc36tvhvc4dg6wfnnwh3c5jckcg",
				Description:   "Test Keychain",
				AdminIntentId: 0,
				Fees:          &KeychainFees{KeyReq: 0, SigReq: 0},
			},
		},
		{
			name: "FAIL: invalid signer",
			msg: &MsgNewKeychain{
				Creator:       "invalid",
				Description:   "Test Keychain",
				AdminIntentId: 0,
				Fees:          &KeychainFees{KeyReq: 0, SigReq: 0},
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			acc, err := sdk.AccAddressFromBech32(tt.msg.Creator)
			if err != nil {
				assert.Panics(t, func() { tt.msg.GetSigners() })
			} else {
				msg := NewMsgNewKeychain(tt.msg.Creator, tt.msg.Description, tt.msg.AdminIntentId, tt.msg.Fees.KeyReq, tt.msg.Fees.SigReq)
				got := msg.GetSigners()

				assert.Equal(t, []sdk.AccAddress{acc}, got)
			}
		})
	}
}

func TestMsgNewKeychain_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgNewKeychain
		err  error
	}{
		{
			name: "PASS: valid address",
			msg: MsgNewKeychain{
				Creator:       sample.AccAddress(),
				Description:   "Test Description",
				AdminIntentId: 0,
				Fees:          &KeychainFees{KeyReq: 0, SigReq: 0},
			},
		},
		{
			name: "FAIL: invalid address",
			msg: MsgNewKeychain{
				Creator:       "invalid_address",
				Description:   "Test Description",
				AdminIntentId: 0,
				Fees:          &KeychainFees{KeyReq: 0, SigReq: 0},
			},
			err: sdkerrors.ErrInvalidAddress,
		},
		{
			name: "FAIL: no description",
			msg: MsgNewKeychain{
				Creator:       sample.AccAddress(),
				Description:   "",
				AdminIntentId: 0,
				Fees:          &KeychainFees{KeyReq: 0, SigReq: 0},
			},
			err: ErrEmptyDesc,
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
