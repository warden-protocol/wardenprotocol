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
	"github.com/warden-protocol/wardenprotocol/x/identity/keeper"
	"github.com/warden-protocol/wardenprotocol/x/identity/types"
)

func Test_msgServer_NewKeychain(t *testing.T) {
	type args struct {
		msg *types.MsgNewKeychain
	}
	tests := []struct {
		name        string
		args        args
		want        *types.MsgNewKeychainResponse
		wantCreated *types.Keychain
		wantErr     bool
	}{
		{
			name: "create a keychain",
			args: args{
				msg: types.NewMsgNewKeychain("testCreator", "testDescription", 0, 0, 0),
			},
			want: &types.MsgNewKeychainResponse{Address: "wardenkeychain1ph63us46lyw56lmt585"},
			wantCreated: &types.Keychain{
				Address:     "wardenkeychain1ph63us46lyw56lmt585",
				Creator:     "testCreator",
				Description: "testDescription",
				Admins:      []string{"testCreator"},
				Parties:     nil,
				Fees:        &types.KeychainFees{KeyReq: 0, SigReq: 0},
				IsActive:    true,
			},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ik, ctx := keepertest.IdentityKeeper(t)
			goCtx := sdk.WrapSDKContext(ctx)
			msgSer := keeper.NewMsgServerImpl(*ik)
			got, err := msgSer.NewKeychain(goCtx, tt.args.msg)
			if (err != nil) != tt.wantErr {
				t.Errorf("NewKeychain() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("NewKeychain() got = %v, want %v", got, tt.want)
			}
			gotKeychain := ik.GetKeychain(ctx, got.Address)

			if !reflect.DeepEqual(gotKeychain, tt.wantCreated) {
				t.Errorf("NewKeychain() got = %v, want %v", gotKeychain, tt.wantCreated)
				return
			}
		})
	}
}
