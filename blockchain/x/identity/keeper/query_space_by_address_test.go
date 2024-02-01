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

func TestKeeper_SpaceByAddress(t *testing.T) {

	type args struct {
		req          *types.QuerySpaceByAddressRequest
		msgSpace *types.MsgNewSpace
	}
	tests := []struct {
		name          string
		args          args
		want          *types.QuerySpaceByAddressResponse
		wantSpace *types.Space
		wantErr       bool
	}{
		{
			name: "happy path",
			args: args{
				req: &types.QuerySpaceByAddressRequest{
					Address: "wardenspace14a2hpadpsy9h5sm54xj",
				},
				msgSpace: types.NewMsgNewSpace("testOwner", 0, 0),
			},
			want: &types.QuerySpaceByAddressResponse{
				Space: &types.Space{
					Address:         "wardenspace14a2hpadpsy9h5sm54xj",
					Creator:         "testOwner",
					Owners:          []string{"testOwner"},
					ChildSpaces: nil,
					AdminIntentId:   0,
					SignIntentId:    0,
				},
			},
			wantErr: false,
		},
		{
			name: "req is nil",
			args: args{
				req:          nil,
				msgSpace: types.NewMsgNewSpace("testOwner", 0, 0),
			},
			want:    nil,
			wantErr: true,
		},
		{
			name: "wrong space address",
			args: args{
				req: &types.QuerySpaceByAddressRequest{
					Address: "wrongAddress",
				},
				msgSpace: types.NewMsgNewSpace("testOwner", 0, 0),
			},
			want: &types.QuerySpaceByAddressResponse{
				Space: &types.Space{
					Address:         "wardenspace14a2hpadpsy9h5sm54xj",
					Creator:         "testOwner",
					Owners:          []string{"testOwner"},
					ChildSpaces: nil,
					AdminIntentId:   0,
					SignIntentId:    0,
				},
			},
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ik, ctx := keepertest.IdentityKeeper(t)
			goCtx := sdk.WrapSDKContext(ctx)
			msgSer := keeper.NewMsgServerImpl(*ik)
			_, err := msgSer.NewSpace(goCtx, tt.args.msgSpace)
			if err != nil {
				t.Fatal(err)
			}
			got, err := ik.SpaceByAddress(goCtx, tt.args.req)
			if (err != nil) != tt.wantErr {
				t.Errorf("SpaceByAddress() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !tt.wantErr {
				if !reflect.DeepEqual(got, tt.want) {
					t.Errorf("SpaceByAddress() got = %v, want %v", got, tt.want)
				}
			}
		})
	}
}
