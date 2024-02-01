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
	"github.com/warden-protocol/wardenprotocol/x/identity/types"
)

func TestKeeper_KeychainByAddress(t *testing.T) {

	var defaultKr = types.Keychain{
		Address:     "wardenkeychain1ph63us46lyw56lmt585",
		Creator:     "testCreator",
		Description: "testDescription",
		Admins:      []string{"testCreator"},
		Fees:        &types.KeychainFees{KeyReq: 0, SigReq: 0},
		IsActive:    true,
	}

	type args struct {
		keychain *types.Keychain
		req     *types.QueryKeychainByAddressRequest
	}
	tests := []struct {
		name    string
		args    args
		want    *types.QueryKeychainByAddressResponse
		wantErr bool
	}{
		{
			name: "get a keychain by address",
			args: args{
				keychain: &defaultKr,
				req: &types.QueryKeychainByAddressRequest{
					Address: "wardenkeychain1ph63us46lyw56lmt585",
				},
			},
			want: &types.QueryKeychainByAddressResponse{Keychain: &types.Keychain{
				Address:     "wardenkeychain1ph63us46lyw56lmt585",
				Creator:     "testCreator",
				Description: "testDescription",
				Admins:      []string{"testCreator"},
				Parties:     nil,
				Fees:        &types.KeychainFees{KeyReq: 0, SigReq: 0},
				IsActive:    true,
			}},
			wantErr: false,
		},
		{
			name: "keychain by address not found",
			args: args{
				keychain: &defaultKr,
				req: &types.QueryKeychainByAddressRequest{
					Address: "wardenkeychain1w35xjumfwdshgetnwswds2m5",
				},
			},
			want:    nil,
			wantErr: true,
		},
		{
			name: "invalid request",
			args: args{
				keychain: &defaultKr,
				req:     nil,
			},
			want:    nil,
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ik, ctx := keepertest.IdentityKeeper(t)
			goCtx := sdk.WrapSDKContext(ctx)

			genesis := types.GenesisState{
				Keychains: []types.Keychain{*tt.args.keychain},
			}
			identity.InitGenesis(ctx, *ik, genesis)

			got, err := ik.KeychainByAddress(goCtx, tt.args.req)
			if (err != nil) != tt.wantErr {
				t.Errorf("KeychainByAddress() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !tt.wantErr && !reflect.DeepEqual(got, tt.want) {
				t.Errorf("KeychainByAddress() got = %v, want %v", got, tt.want)
			}
		})
	}
}
