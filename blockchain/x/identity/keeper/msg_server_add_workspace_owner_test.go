package keeper_test

import (
	"reflect"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/qredo/fusionchain/testutil/keeper"
	"github.com/qredo/fusionchain/x/identity/keeper"
	"github.com/qredo/fusionchain/x/identity/types"
)

func Test_msgServer_AddWorkspaceOwner(t *testing.T) {
	t.SkipNow()
	type args struct {
		msg             *types.MsgAddWorkspaceOwner
		msgNewWorkspace *types.MsgNewWorkspace
	}
	tests := []struct {
		name          string
		args          args
		want          *types.MsgAddWorkspaceOwnerResponse
		wantWorkspace *types.Workspace
		wantErr       bool
	}{
		{
			name: "add a owner to a workspace",
			args: args{
				msg:             types.NewMsgAddWorkspaceOwner("testOwner", "qredoworkspace14a2hpadpsy9h5m6us54", "testOwner2", 100),
				msgNewWorkspace: types.NewMsgNewWorkspace("testOwner", 0, 0),
			},
			want:    nil,
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ik, ctx := keepertest.IdentityKeeper(t)
			goCtx := sdk.WrapSDKContext(ctx)
			msgSer := keeper.NewMsgServerImpl(*ik)
			workspaceResp, err := msgSer.NewWorkspace(goCtx, tt.args.msgNewWorkspace)
			if err != nil {
				t.Errorf("Failed to create new workspace. Reason: %v", err)
			}
			got, err := msgSer.AddWorkspaceOwner(goCtx, tt.args.msg)
			if (err != nil) != tt.wantErr {
				t.Errorf("AddWorkspaceOwner() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("AddWorkspaceOwner() got = %v, want %v", got, tt.want)
			}
			if !tt.wantErr {
				gotWorkspace := ik.GetWorkspace(ctx, workspaceResp.Address)
				if !reflect.DeepEqual(gotWorkspace, tt.wantWorkspace) {
					t.Errorf("NewWorkspace() got = %v, want %v", gotWorkspace, tt.wantWorkspace)
				}
			}
		})
	}
}
