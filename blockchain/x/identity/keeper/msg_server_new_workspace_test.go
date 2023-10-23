package keeper_test

import (
	"reflect"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/qredo/fusionchain/testutil/keeper"
	"github.com/qredo/fusionchain/x/identity/keeper"
	"github.com/qredo/fusionchain/x/identity/types"
)

func Test_msgServer_NewWorkspace(t *testing.T) {
	type args struct {
		msg *types.MsgNewWorkspace
	}
	tests := []struct {
		name        string
		args        args
		want        *types.MsgNewWorkspaceResponse
		wantCreated *types.Workspace
		wantErr     bool
	}{
		{
			name: "create a workspace",
			args: args{
				msg: types.NewMsgNewWorkspace("testOwner", 0, 0),
			},
			want: &types.MsgNewWorkspaceResponse{
				Address: "qredoworkspace14a2hpadpsy9h5m6us54",
			},
			wantCreated: &types.Workspace{
				Address:         "qredoworkspace14a2hpadpsy9h5m6us54",
				Creator:         "testOwner",
				Owners:          []string{"testOwner"},
				ChildWorkspaces: nil,
				AdminPolicyId:   0,
				SignPolicyId:    0,
			},
			wantErr: false,
		},
		{
			name: "create a workspace with additional owners",
			args: args{
				msg: types.NewMsgNewWorkspace("testOwner", 0, 0, "owner1", "owner2"),
			},
			want: &types.MsgNewWorkspaceResponse{
				Address: "qredoworkspace14a2hpadpsy9h5m6us54",
			},
			wantCreated: &types.Workspace{
				Address:         "qredoworkspace14a2hpadpsy9h5m6us54",
				Creator:         "testOwner",
				Owners:          []string{"testOwner", "owner1", "owner2"},
				ChildWorkspaces: nil,
				AdminPolicyId:   0,
				SignPolicyId:    0,
			},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ik, ctx := keepertest.IdentityKeeper(t)
			goCtx := sdk.WrapSDKContext(ctx)
			msgSer := keeper.NewMsgServerImpl(*ik)
			got, err := msgSer.NewWorkspace(goCtx, tt.args.msg)
			if (err != nil) != tt.wantErr {
				t.Errorf("NewWorkspace() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("NewWorkspace() got = %v, want %v", got, tt.want)
			}
			if !tt.wantErr {
				gotWorkspace := ik.GetWorkspace(ctx, got.Address)
				if !reflect.DeepEqual(gotWorkspace, tt.wantCreated) {
					t.Errorf("NewWorkspace() got = %v, want %v", gotWorkspace, tt.wantCreated)
				}
			}
		})
	}
}
