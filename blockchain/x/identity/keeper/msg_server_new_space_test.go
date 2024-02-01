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

func Test_msgServer_NewSpace(t *testing.T) {
	type args struct {
		msg *types.MsgNewSpace
	}
	tests := []struct {
		name        string
		args        args
		want        *types.MsgNewSpaceResponse
		wantCreated *types.Space
		wantErr     bool
	}{
		{
			name: "create a space",
			args: args{
				msg: types.NewMsgNewSpace("testOwner", 0, 0),
			},
			want: &types.MsgNewSpaceResponse{
				Address: "wardenspace14a2hpadpsy9h5sm54xj",
			},
			wantCreated: &types.Space{
				Address:         "wardenspace14a2hpadpsy9h5sm54xj",
				Creator:         "testOwner",
				Owners:          []string{"testOwner"},
				ChildSpaces: nil,
				AdminIntentId:   0,
				SignIntentId:    0,
			},
			wantErr: false,
		},
		{
			name: "create a space with additional owners",
			args: args{
				msg: types.NewMsgNewSpace("testOwner", 0, 0, "owner1", "owner2"),
			},
			want: &types.MsgNewSpaceResponse{
				Address: "wardenspace14a2hpadpsy9h5sm54xj",
			},
			wantCreated: &types.Space{
				Address:         "wardenspace14a2hpadpsy9h5sm54xj",
				Creator:         "testOwner",
				Owners:          []string{"testOwner", "owner1", "owner2"},
				ChildSpaces: nil,
				AdminIntentId:   0,
				SignIntentId:    0,
			},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ik, ctx := keepertest.IdentityKeeper(t)
			goCtx := sdk.WrapSDKContext(ctx)
			msgSer := keeper.NewMsgServerImpl(*ik)
			got, err := msgSer.NewSpace(goCtx, tt.args.msg)
			if (err != nil) != tt.wantErr {
				t.Errorf("NewSpace() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("NewSpace() got = %v, want %v", got, tt.want)
			}
			if !tt.wantErr {
				gotSpace := ik.GetSpace(ctx, got.Address)
				if !reflect.DeepEqual(gotSpace, tt.wantCreated) {
					t.Errorf("NewSpace() got = %v, want %v", gotSpace, tt.wantCreated)
				}
			}
		})
	}
}
