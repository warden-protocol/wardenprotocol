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
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/qredo/fusionchain/testutil/sample"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestMsgUpdateKeyRequest_NewMsgUpdateKeyRequest(t *testing.T) {

	pk := []byte{4, 200, 31, 59, 25, 198, 152, 36, 57, 11, 161, 215, 157, 8, 104, 15, 223, 125, 52, 91, 82, 238, 123, 32, 13, 174, 188, 116, 181, 27, 64, 103, 166, 145, 194, 137, 222, 232, 52, 222, 160, 96, 61, 19, 225, 235, 135, 42, 0, 199, 97, 161, 51, 122, 117, 81, 130, 112, 252, 205, 28, 66, 92, 144, 171}

	tests := []struct {
		name string
		msg  *MsgUpdateKeyRequest
	}{
		{
			name: "PASS: happy path",
			msg: &MsgUpdateKeyRequest{
				Creator:   sample.AccAddress(),
				RequestId: 1,
				Status:    2,
				Result:    &MsgUpdateKeyRequest_Key{&MsgNewKey{pk}},
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := &MsgUpdateKeyRequest{tt.msg.Creator, tt.msg.RequestId, tt.msg.Status, tt.msg.Result}
			assert.Equalf(t, tt.msg, got, "want", tt.msg)
		})
	}
}

func TestMsgUpdateKeyRequest_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgUpdateKeyRequest
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgUpdateKeyRequest{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgUpdateKeyRequest{
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
