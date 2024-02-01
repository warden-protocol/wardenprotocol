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
package keeper_test

import (
	"reflect"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/warden-protocol/wardenprotocol/testutil/keeper"
	"github.com/warden-protocol/wardenprotocol/x/identity"
	"github.com/warden-protocol/wardenprotocol/x/identity/keeper"
	"github.com/warden-protocol/wardenprotocol/x/identity/types"
)

func Test_msgServer_AddKeychainParty(t *testing.T) {

	var defaultKr = types.Keychain{
		Address:       "wardenkeychain1ph63us46lyw56lmt585",
		Creator:       "testCreator",
		Description:   "testDescription",
		Admins:        []string{"testCreator"},
		Parties:       []string{},
		AdminIntentId: 0,
		Fees:          &types.KeychainFees{KeyReq: 0, SigReq: 0},
		IsActive:      true,
	}

	var wantKr = types.Keychain{
		Address:       "wardenkeychain1ph63us46lyw56lmt585",
		Creator:       "testCreator",
		Description:   "testDescription",
		Admins:        []string{"testCreator"},
		Parties:       []string{"testParty"},
		AdminIntentId: 0,
		Fees:          &types.KeychainFees{KeyReq: 0, SigReq: 0},
		IsActive:      true,
	}

	type args struct {
		keychain *types.Keychain
		msg     *types.MsgAddKeychainParty
		msg2    *types.MsgAddKeychainParty
	}
	tests := []struct {
		name        string
		args        args
		want        *types.MsgAddKeychainPartyResponse
		wantKeychain *types.Keychain
		wantErr     bool
		wantErr2    bool
	}{
		{
			name: "add a party to a keychain",
			args: args{
				keychain: &defaultKr,
				msg:     types.NewMsgAddKeychainParty("testCreator", "wardenkeychain1ph63us46lyw56lmt585", "testParty"),
				msg2:    types.NewMsgAddKeychainParty("testCreator", "wardenkeychain1ph63us46lyw56lmt585", "testParty2"),
			},
			want:        &types.MsgAddKeychainPartyResponse{},
			wantKeychain: &wantKr,
		},
		{
			name: "keychain not found",
			args: args{
				keychain: &defaultKr,
				msg:     types.NewMsgAddKeychainParty("testCreator", "invalidKeychain", "testParty"),
			},
			want:    &types.MsgAddKeychainPartyResponse{},
			wantErr: true,
		},
		{
			name: "party is already in the keychain",
			args: args{
				keychain: &defaultKr,
				msg:     types.NewMsgAddKeychainParty("testCreator", "wardenkeychain1ph63us46lyw56lmt585", "testParty"),
				msg2:    types.NewMsgAddKeychainParty("testCreator", "wardenkeychain1ph63us46lyw56lmt585", "testParty"),
			},
			want:        &types.MsgAddKeychainPartyResponse{},
			wantKeychain: &wantKr,
			wantErr2:    true,
		},
		{
			name: "creator no keychain admin",
			args: args{
				keychain: &defaultKr,
				msg:     types.NewMsgAddKeychainParty("notKeychainAdmin", "wardenkeychain1ph63us46lyw56lmt585", "testParty"),
			},
			want:    &types.MsgAddKeychainPartyResponse{},
			wantErr: true,
		},
		{
			name: "inactive keychain",
			args: args{
				keychain: &types.Keychain{
					Address:       "wardenkeychain1ph63us46lyw56lmt585",
					Creator:       "testCreator",
					Description:   "testDescription",
					Admins:        []string{"testCreator"},
					Parties:       []string{},
					AdminIntentId: 0,
					Fees:          &types.KeychainFees{KeyReq: 0, SigReq: 0},
					IsActive:      false,
				},
				msg: types.NewMsgAddKeychainParty("testCreator", "wardenkeychain1ph63us46lyw56lmt585", "testParty"),
			},
			want:    &types.MsgAddKeychainPartyResponse{},
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ik, ctx := keepertest.IdentityKeeper(t)
			goCtx := sdk.WrapSDKContext(ctx)
			msgSer := keeper.NewMsgServerImpl(*ik)

			genesis := types.GenesisState{
				Keychains: []types.Keychain{*tt.args.keychain},
			}
			identity.InitGenesis(ctx, *ik, genesis)

			got, err := msgSer.AddKeychainParty(goCtx, tt.args.msg)
			if (err != nil) != tt.wantErr {
				t.Fatalf("AddKeychainParty() error = %v, wantErr %v", err, tt.wantErr)
			}

			if tt.wantErr2 {
				_, err = msgSer.AddKeychainParty(goCtx, tt.args.msg2)
				if (err != nil) != tt.wantErr2 {
					t.Fatalf("AddKeychainParty() error = %v, wantErr %v", err, tt.wantErr2)
				}
			}

			if !tt.wantErr {
				if !reflect.DeepEqual(got, tt.want) {
					t.Fatalf("AddKeychainParty() got = %v, want %v", got, tt.want)
				}
				gotKeychain := ik.GetKeychain(ctx, tt.args.keychain.Address)

				if !reflect.DeepEqual(gotKeychain, tt.wantKeychain) {
					t.Fatalf("NewKeychain() got = %v, want %v", gotKeychain, tt.wantKeychain)
				}
			}
		})
	}
}
