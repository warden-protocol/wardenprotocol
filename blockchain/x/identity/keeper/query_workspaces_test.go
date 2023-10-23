package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/qredo/fusionchain/testutil/keeper"
	"github.com/qredo/fusionchain/x/identity/keeper"
	"github.com/qredo/fusionchain/x/identity/types"
)

func TestKeeper_Workspaces(t *testing.T) {

	type args struct {
		req            *types.QueryWorkspacesRequest
		msgWorkspace   *types.MsgNewWorkspace
		workspaceCount int
	}
	tests := []struct {
		name    string
		args    args
		want    int
		wantErr bool
	}{
		{
			name: "create 100 workspaces",
			args: args{
				req: &types.QueryWorkspacesRequest{
					Pagination: nil,
				},
				msgWorkspace:   types.NewMsgNewWorkspace("testOwner", 0, 0),
				workspaceCount: 100,
			},
			want:    100,
			wantErr: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ik, ctx := keepertest.IdentityKeeper(t)
			goCtx := sdk.WrapSDKContext(ctx)
			for i := 0; i < tt.args.workspaceCount; i++ {
				msgSer := keeper.NewMsgServerImpl(*ik)
				_, err := msgSer.NewWorkspace(goCtx, tt.args.msgWorkspace)
				if err != nil {
					t.FailNow()
				}
			}
			got, err := ik.Workspaces(goCtx, tt.args.req)
			if (err != nil) != tt.wantErr {
				t.Errorf("Workspaces() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if len(got.Workspaces) != tt.want {
				t.Errorf("Workspaces() got = %v, want %v", got, tt.want)
				return
			}
		})
	}
}
