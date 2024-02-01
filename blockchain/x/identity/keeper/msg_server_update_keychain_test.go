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

func Test_msgServer_UpdateKeychain(t *testing.T) {

	var defaultKr = types.Keychain{
		Address:     "wardenkeychain1ph63us46lyw56lmt585",
		Creator:     "testCreator",
		Description: "testDescription",
		Admins:      []string{"testCreator"},
		IsActive:    true,
	}

	var wantKr = types.Keychain{
		Address:     "wardenkeychain1ph63us46lyw56lmt585",
		Creator:     "testCreator",
		Description: "testDescription",
		Admins:      []string{"testCreator"},
		IsActive:    true,
	}

	type args struct {
		keychain *types.Keychain
		msg     *types.MsgUpdateKeychain
	}
	tests := []struct {
		name        string
		args        args
		want        *types.MsgUpdateKeychainResponse
		wantKeychain *types.Keychain
		wantErr     bool
	}{
		{
			name: "change keychain description",
			args: args{
				keychain: &defaultKr,
				msg:     types.NewMsgUpdateKeychain("testCreator", "wardenkeychain1ph63us46lyw56lmt585", "newDescription", true),
			},
			want: &types.MsgUpdateKeychainResponse{},
			wantKeychain: &types.Keychain{
				Address:     "wardenkeychain1ph63us46lyw56lmt585",
				Creator:     "testCreator",
				Description: "newDescription",
				Admins:      []string{"testCreator"},
				IsActive:    true,
			},
		},
		{
			name: "keychain not found",
			args: args{
				keychain: &defaultKr,
				msg:     types.NewMsgUpdateKeychain("testCreator", "invalidKeychain", "newDescription", true),
			},
			want:    &types.MsgUpdateKeychainResponse{},
			wantErr: true,
		},
		{
			name: "creator no keychain admin",
			args: args{
				keychain: &defaultKr,
				msg:     types.NewMsgUpdateKeychain("noAdmin", "wardenkeychain1ph63us46lyw56lmt585", "newDescription", true),
			},
			want:    &types.MsgUpdateKeychainResponse{},
			wantErr: true,
		},
		{
			name: "change keychain status to false",
			args: args{
				keychain: &types.Keychain{
					Address:     "wardenkeychain1ph63us46lyw56lmt585",
					Creator:     "testCreator",
					Description: "testDescription",
					Admins:      []string{"testCreator"},
					IsActive:    true,
				},
				msg: types.NewMsgUpdateKeychain("testCreator", "wardenkeychain1ph63us46lyw56lmt585", "testDescription", false),
			},
			want: &types.MsgUpdateKeychainResponse{},
			wantKeychain: &types.Keychain{
				Address:     "wardenkeychain1ph63us46lyw56lmt585",
				Creator:     "testCreator",
				Description: "testDescription",
				Admins:      []string{"testCreator"},
				IsActive:    false,
			},
		},
		{
			name: "change keychain status to true",
			args: args{
				keychain: &types.Keychain{
					Address:     "wardenkeychain1ph63us46lyw56lmt585",
					Creator:     "testCreator",
					Description: "testDescription",
					Admins:      []string{"testCreator"},
					IsActive:    false,
				},
				msg: types.NewMsgUpdateKeychain("testCreator", "wardenkeychain1ph63us46lyw56lmt585", "testDescription", true),
			},
			want:        &types.MsgUpdateKeychainResponse{},
			wantKeychain: &wantKr,
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

			got, err := msgSer.UpdateKeychain(goCtx, tt.args.msg)
			if (err != nil) != tt.wantErr {
				t.Fatalf("UpdateKeychain() error = %v, wantErr %v", err, tt.wantErr)
			}

			if !tt.wantErr {
				if !reflect.DeepEqual(got, tt.want) {
					t.Fatalf("UpdateKeychain() got = %v, want %v", got, tt.want)
				}
				gotKeychain := ik.GetKeychain(ctx, tt.args.keychain.Address)

				if !reflect.DeepEqual(gotKeychain, tt.wantKeychain) {
					t.Fatalf("UpdateKeychain() got = %v, want %v", gotKeychain, tt.wantKeychain)
				}
			}
		})
	}
}
