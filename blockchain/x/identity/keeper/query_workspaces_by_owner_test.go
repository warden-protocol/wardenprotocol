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
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/qredo/fusionchain/testutil/keeper"
	"github.com/qredo/fusionchain/x/identity/keeper"
	"github.com/qredo/fusionchain/x/identity/types"
)

func TestKeeper_WorkspacesByOwner(t *testing.T) {

	type args struct {
		req          *types.QueryWorkspacesByOwnerRequest
		msgWorkspace *types.MsgNewWorkspace
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
				req: &types.QueryWorkspacesByOwnerRequest{
					Owner: "testOwner",
				},
				msgWorkspace: types.NewMsgNewWorkspace("testOwner", 0, 0),
			},
			want:    1,
			wantErr: false,
		},
		{
			name: "wrong owner",
			args: args{
				req: &types.QueryWorkspacesByOwnerRequest{
					Owner: "wrongOwner",
				},
				msgWorkspace: types.NewMsgNewWorkspace("testOwner", 0, 0),
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
			_, err := msgSer.NewWorkspace(goCtx, tt.args.msgWorkspace)
			if err != nil {
				t.FailNow()
			}
			got, err := ik.WorkspacesByOwner(goCtx, tt.args.req)
			if (err != nil) != tt.wantErr {
				t.Errorf("WorkspacesByOwner() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !tt.wantErr && tt.want != len(got.Workspaces) {
				t.Errorf("WorkspacesByOwner() got = %v, want %v", got, tt.want)
			}
		})
	}
}
