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
	"github.com/qredo/fusionchain/x/identity"
	"github.com/qredo/fusionchain/x/identity/keeper"
	"github.com/qredo/fusionchain/x/identity/types"
)

var defaultWs = types.Workspace{
	Address:       "qredoworkspace14a2hpadpsy9h5m6us54",
	Creator:       "testOwner",
	Owners:        []string{"testOwner"},
	AdminPolicyId: 0,
	SignPolicyId:  0,
}

func Test_msgServer_AddWorkspaceOwner(t *testing.T) {
	t.SkipNow()
	// todo: policystore for actions
	type args struct {
		workspace *types.Workspace
		msg       *types.MsgAddWorkspaceOwner
	}
	tests := []struct {
		name          string
		args          args
		want          *types.MsgAddWorkspaceOwnerResponse
		wantWorkspace *types.Workspace
		wantErr       bool
	}{
		{
			name: "add workspace owner",
			args: args{
				workspace: &defaultWs,
				msg:       types.NewMsgAddWorkspaceOwner("testOwner", "qredoworkspace14a2hpadpsy9h5m6us54", "testOwner2", 100),
			},
			want:    &types.MsgAddWorkspaceOwnerResponse{},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ik, ctx := keepertest.IdentityKeeper(t)
			goCtx := sdk.WrapSDKContext(ctx)
			msgSer := keeper.NewMsgServerImpl(*ik)

			genesis := types.GenesisState{
				Workspaces: []types.Workspace{*tt.args.workspace},
			}
			identity.InitGenesis(ctx, *ik, genesis)

			got, err := msgSer.AddWorkspaceOwner(goCtx, tt.args.msg)
			if (err != nil) != tt.wantErr {
				t.Fatalf("AddWorkspaceOwner() error = %v, wantErr %v", err, tt.wantErr)
			}

			if !tt.wantErr {
				if !reflect.DeepEqual(got, tt.want) {
					t.Errorf("AddWorkspaceOwner() got = %v, want %v", got, tt.want)
				}

				gotWorkspace := ik.GetWorkspace(ctx, tt.args.workspace.Address)

				if !reflect.DeepEqual(gotWorkspace, tt.wantWorkspace) {
					t.Errorf("NewWorkspace() got = %v, want %v", gotWorkspace, tt.wantWorkspace)
				}
			}
		})
	}
}
