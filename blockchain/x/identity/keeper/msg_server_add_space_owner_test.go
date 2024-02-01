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

var defaultWs = types.Space{
	Address:       "wardenspace14a2hpadpsy9h5sm54xj",
	Creator:       "testOwner",
	Owners:        []string{"testOwner"},
	AdminIntentId: 0,
	SignIntentId:  0,
}

func Test_msgServer_AddSpaceOwner(t *testing.T) {
	t.SkipNow()
	// todo: intentstore for actions
	type args struct {
		space *types.Space
		msg       *types.MsgAddSpaceOwner
	}
	tests := []struct {
		name          string
		args          args
		want          *types.MsgAddSpaceOwnerResponse
		wantSpace *types.Space
		wantErr       bool
	}{
		{
			name: "add space owner",
			args: args{
				space: &defaultWs,
				msg:       types.NewMsgAddSpaceOwner("testOwner", "wardenspace14a2hpadpsy9h5sm54xj", "testOwner2", 100),
			},
			want:    &types.MsgAddSpaceOwnerResponse{},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ik, ctx := keepertest.IdentityKeeper(t)
			goCtx := sdk.WrapSDKContext(ctx)
			msgSer := keeper.NewMsgServerImpl(*ik)

			genesis := types.GenesisState{
				Spaces: []types.Space{*tt.args.space},
			}
			identity.InitGenesis(ctx, *ik, genesis)

			got, err := msgSer.AddSpaceOwner(goCtx, tt.args.msg)
			if (err != nil) != tt.wantErr {
				t.Fatalf("AddSpaceOwner() error = %v, wantErr %v", err, tt.wantErr)
			}

			if !tt.wantErr {
				if !reflect.DeepEqual(got, tt.want) {
					t.Errorf("AddSpaceOwner() got = %v, want %v", got, tt.want)
				}

				gotSpace := ik.GetSpace(ctx, tt.args.space.Address)

				if !reflect.DeepEqual(gotSpace, tt.wantSpace) {
					t.Errorf("NewSpace() got = %v, want %v", gotSpace, tt.wantSpace)
				}
			}
		})
	}
}
