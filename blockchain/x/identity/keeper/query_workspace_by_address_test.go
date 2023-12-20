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
package keeper_test

import (
	"reflect"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/qredo/fusionchain/testutil/keeper"
	"github.com/qredo/fusionchain/x/identity/keeper"
	"github.com/qredo/fusionchain/x/identity/types"
)

func TestKeeper_WorkspaceByAddress(t *testing.T) {

	type args struct {
		req          *types.QueryWorkspaceByAddressRequest
		msgWorkspace *types.MsgNewWorkspace
	}
	tests := []struct {
		name          string
		args          args
		want          *types.QueryWorkspaceByAddressResponse
		wantWorkspace *types.Workspace
		wantErr       bool
	}{
		{
			name: "happy path",
			args: args{
				req: &types.QueryWorkspaceByAddressRequest{
					Address: "qredoworkspace14a2hpadpsy9h5m6us54",
				},
				msgWorkspace: types.NewMsgNewWorkspace("testOwner", 0, 0),
			},
			want: &types.QueryWorkspaceByAddressResponse{
				Workspace: &types.Workspace{
					Address:         "qredoworkspace14a2hpadpsy9h5m6us54",
					Creator:         "testOwner",
					Owners:          []string{"testOwner"},
					ChildWorkspaces: nil,
					AdminPolicyId:   0,
					SignPolicyId:    0,
				},
			},
			wantErr: false,
		},
		{
			name: "req is nil",
			args: args{
				req:          nil,
				msgWorkspace: types.NewMsgNewWorkspace("testOwner", 0, 0),
			},
			want:    nil,
			wantErr: true,
		},
		{
			name: "wrong workspace address",
			args: args{
				req: &types.QueryWorkspaceByAddressRequest{
					Address: "wrongAddress",
				},
				msgWorkspace: types.NewMsgNewWorkspace("testOwner", 0, 0),
			},
			want: &types.QueryWorkspaceByAddressResponse{
				Workspace: &types.Workspace{
					Address:         "qredoworkspace14a2hpadpsy9h5m6us54",
					Creator:         "testOwner",
					Owners:          []string{"testOwner"},
					ChildWorkspaces: nil,
					AdminPolicyId:   0,
					SignPolicyId:    0,
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
			_, err := msgSer.NewWorkspace(goCtx, tt.args.msgWorkspace)
			if err != nil {
				t.Fatal(err)
			}
			got, err := ik.WorkspaceByAddress(goCtx, tt.args.req)
			if (err != nil) != tt.wantErr {
				t.Errorf("WorkspaceByAddress() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !tt.wantErr {
				if !reflect.DeepEqual(got, tt.want) {
					t.Errorf("WorkspaceByAddress() got = %v, want %v", got, tt.want)
				}
			}
		})
	}
}
