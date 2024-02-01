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
	"github.com/warden-protocol/wardenprotocol/cmd/config"
	"github.com/warden-protocol/wardenprotocol/testutil/sample"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func init() {
	cfg := sdk.GetConfig()
	config.SetBech32Prefixes(cfg)
}

func TestMsgAddKeychainParty_NewMsgAddKeychainParty(t *testing.T) {

	tests := []struct {
		name string
		msg  *MsgAddKeychainParty
		err  error
	}{
		{
			name: "PASS: happy path",
			msg: &MsgAddKeychainParty{
				Creator:      sample.AccAddress(),
				KeychainAddr: "wardenkeychain1ph63us46lyw56lmt585",
				Party:        "warden1s3qj9p0ymugy6chyrwy3ft2s5u24fc32q4sg3j",
			},
			err: nil,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := NewMsgAddKeychainParty(tt.msg.Creator, tt.msg.KeychainAddr, tt.msg.Party)

			assert.Equalf(t, tt.msg, got, "want", tt.msg)
		})
	}
}

func TestMsgAddKeychainParty_Route(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgAddKeychainParty
	}{
		{
			name: "valid address",
			msg: MsgAddKeychainParty{
				Creator:      sample.AccAddress(),
				KeychainAddr: "wardenkeychain1ph63us46lyw56lmt585",
				Party:        "warden1s3qj9p0ymugy6chyrwy3ft2s5u24fc32q4sg3j",
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			assert.Equal(t, ModuleName, tt.msg.Route(), "Route()")
		})
	}
}

func TestMsgAddKeychainParty_Type(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgAddKeychainParty
	}{
		{
			name: "valid address",
			msg: MsgAddKeychainParty{
				Creator:      sample.AccAddress(),
				KeychainAddr: "wardenkeychain1ph63us46lyw56lmt585",
				Party:        "warden1s3qj9p0ymugy6chyrwy3ft2s5u24fc32q4sg3j",
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			assert.Equal(t, TypeMsgAddKeychainParty, tt.msg.Type(), "Type()")
		})
	}
}

func TestMsgAddKeychainParty_GetSigners(t *testing.T) {

	tests := []struct {
		name string
		msg  *MsgAddKeychainParty
	}{
		{
			name: "PASS: happy path",
			msg: &MsgAddKeychainParty{
				Creator:      "warden1n7x7nv2urvdtc36tvhvc4dg6wfnnwh3c5jckcg",
				KeychainAddr: "wardenkeychain1ph63us46lyw56lmt585",
				Party:        "warden1s3qj9p0ymugy6chyrwy3ft2s5u24fc32q4sg3j"},
		},
		{
			name: "FAIL: invalid signer",
			msg: &MsgAddKeychainParty{
				Creator:      "invalid",
				KeychainAddr: "wardenkeychain1ph63us46lyw56lmt585",
				Party:        "warden1s3qj9p0ymugy6chyrwy3ft2s5u24fc32q4sg3j",
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			acc, err := sdk.AccAddressFromBech32(tt.msg.Creator)
			if err != nil {
				assert.Panics(t, func() { tt.msg.GetSigners() })
			} else {
				msg := NewMsgAddKeychainParty(tt.msg.Creator, tt.msg.KeychainAddr, tt.msg.Party)
				got := msg.GetSigners()

				assert.Equal(t, []sdk.AccAddress{acc}, got)
			}
		})
	}
}

func TestMsgAddKeychainParty_GetSignBytes(t *testing.T) {

	tests := []struct {
		name string
		msg  *MsgAddKeychainParty
	}{
		{
			name: "PASS: happy path",
			msg: &MsgAddKeychainParty{
				Creator:      "warden1nexzt4fcc84mgnqwjdhxg6veu97eyy9r8mtulk",
				KeychainAddr: "wardenkeychain1ph63us46lyw56lmt585",
				Party:        "warden1s3qj9p0ymugy6chyrwy3ft2s5u24fc32q4sg3j",
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			msg := NewMsgAddKeychainParty(tt.msg.Creator, tt.msg.KeychainAddr, tt.msg.Party)
			got := msg.GetSignBytes()

			bz := ModuleCdc.MustMarshalJSON(msg)
			sortedBz := sdk.MustSortJSON(bz)

			require.Equal(t, sortedBz, got, "GetSignBytes() result doesn't match sorted JSON bytes")

		})
	}
}

func TestMsgAddKeychainParty_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgAddKeychainParty
		err  error
	}{
		{
			name: "PASS: valid address",
			msg: MsgAddKeychainParty{
				Creator:      sample.AccAddress(),
				KeychainAddr: "wardenkeychain1ph63us46lyw56lmt585",
				Party:        "warden1s3qj9p0ymugy6chyrwy3ft2s5u24fc32q4sg3j",
			},
		},
		{
			name: "FAIL: invalid address",
			msg: MsgAddKeychainParty{
				Creator:      "invalid_address",
				KeychainAddr: "wardenkeychain1ph63us46lyw56lmt585",
				Party:        "warden1s3qj9p0ymugy6chyrwy3ft2s5u24fc32q4sg3j",
			},
			err: sdkerrors.ErrInvalidAddress,
		},
		{
			name: "FAIL: invalid party address",
			msg: MsgAddKeychainParty{
				Creator:      sample.AccAddress(),
				KeychainAddr: "wardenkeychain1ph63us46lyw56lmt585",
				Party:        "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
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
