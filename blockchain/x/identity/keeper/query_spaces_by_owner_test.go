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
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/warden-protocol/wardenprotocol/testutil/keeper"
	"github.com/warden-protocol/wardenprotocol/x/identity/keeper"
	"github.com/warden-protocol/wardenprotocol/x/identity/types"
)

func TestKeeper_SpacesByOwner(t *testing.T) {

	type args struct {
		req          *types.QuerySpacesByOwnerRequest
		msgSpace *types.MsgNewSpace
	}
	tests := []struct {
		name    string
		args    args
		want    int
		wantErr bool
	}{
		{
			name: "find by owner",
			args: args{
				req: &types.QuerySpacesByOwnerRequest{
					Owner: "testOwner",
				},
				msgSpace: types.NewMsgNewSpace("testOwner", 0, 0),
			},
			want:    1,
			wantErr: false,
		},
		{
			name: "wrong owner",
			args: args{
				req: &types.QuerySpacesByOwnerRequest{
					Owner: "wrongOwner",
				},
				msgSpace: types.NewMsgNewSpace("testOwner", 0, 0),
			},
			want:    0,
			wantErr: false,
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
			got, err := ik.SpacesByOwner(goCtx, tt.args.req)
			if (err != nil) != tt.wantErr {
				t.Errorf("SpacesByOwner() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !tt.wantErr && tt.want != len(got.Spaces) {
				t.Errorf("SpacesByOwner() got = %v, want %v", got, tt.want)
			}
		})
	}
}
