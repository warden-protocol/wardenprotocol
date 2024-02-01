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

	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	proto "github.com/cosmos/gogoproto/proto"
	"github.com/warden-protocol/wardenprotocol/intent"
	"github.com/stretchr/testify/require"
)

func TestVerifyBoolparserIntent(t *testing.T) {
	tests := []struct {
		name      string
		intent    *BoolparserIntent
		approvers []string
		wantErr   bool
	}{
		{
			name: "verify true",
			intent: &BoolparserIntent{
				Definition: "me>0",
				Participants: []*IntentParticipant{
					{Abbreviation: "me", Address: "wardenXXXXXXX"},
				},
			},
			approvers: []string{"me"},
			wantErr:   false,
		},
		{
			name: "threshold unmatched",
			intent: &BoolparserIntent{
				Definition: "me>1",
				Participants: []*IntentParticipant{
					{Abbreviation: "me", Address: "wardenXXXXXXX"},
				},
			},
			approvers: []string{"me"},
			wantErr:   true,
		},
		{
			name: "multiple approvers",
			intent: &BoolparserIntent{
				Definition: "t1 + t2 > 1",
				Participants: []*IntentParticipant{
					{Abbreviation: "t1", Address: "wardenXXXXXXX"},
					{Abbreviation: "t2", Address: "wardenYYYYYYY"},
				},
			},
			approvers: []string{"t1", "t2"},
			wantErr:   false,
		},
		{
			name: "multiple approvers, one missing",
			intent: &BoolparserIntent{
				Definition: "t1 + t2 > 1",
				Participants: []*IntentParticipant{
					{Abbreviation: "t1", Address: "wardenXXXXXXX"},
					{Abbreviation: "t2", Address: "wardenYYYYYYY"},
				},
			},
			approvers: []string{"t1"},
			wantErr:   true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			p := buildIntent(t, tt.intent)

			interfaceRegistry := codectypes.NewInterfaceRegistry()
			cdc := codec.NewProtoCodec(interfaceRegistry)
			unpackedIntent, err := UnpackIntent(cdc, p)
			require.NoError(t, err)

			err = unpackedIntent.Verify(intent.BuildApproverSet(tt.approvers), intent.EmptyIntentPayload())
			if tt.wantErr {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestWrongIntent(t *testing.T) {
	// craft a Intent with a type that does not implement intent.Intent
	p := buildIntent(t, &GenesisState{}) // here GenesisState is just a random proto.Message

	// try to unpack Any into a Intent interface (fails because GenesisState doesn't implement Intent)
	interfaceRegistry := codectypes.NewInterfaceRegistry()
	cdc := codec.NewProtoCodec(interfaceRegistry)
	_, err := UnpackIntent(cdc, p)
	require.Error(t, err)
}

func buildIntent(t *testing.T, v proto.Message) *Intent {
	t.Helper()

	wrappedMsg, err := codectypes.NewAnyWithValue(v)
	require.NoError(t, err)

	intent := &Intent{
		Id:     1,
		Name:   "test intent",
		Intent: wrappedMsg,
	}

	return intent
}
