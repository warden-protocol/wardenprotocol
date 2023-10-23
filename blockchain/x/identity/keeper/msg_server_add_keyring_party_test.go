package keeper_test

import (
	"reflect"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/qredo/fusionchain/testutil/keeper"
	"github.com/qredo/fusionchain/x/identity/keeper"
	"github.com/qredo/fusionchain/x/identity/types"
)

func Test_msgServer_AddKeyringParty(t *testing.T) {

	type args struct {
		msg        *types.MsgAddKeyringParty
		msgKeyring *types.MsgNewKeyring
	}
	tests := []struct {
		name        string
		args        args
		want        *types.MsgAddKeyringPartyResponse
		wantKeyring *types.Keyring
		wantErr     bool
	}{
		{
			name: "add a party to a keyring",
			args: args{
				msgKeyring: types.NewMsgNewKeyring("testCreator", "testDescription", 0, 0, 0),
				msg:        types.NewMsgAddKeyringParty("testCreator", "qredokeyring1ph63us46lyw56vrzgaq", "testParty"),
			},
			want: &types.MsgAddKeyringPartyResponse{},
			wantKeyring: &types.Keyring{
				Address:     "qredokeyring1ph63us46lyw56vrzgaq",
				Creator:     "testCreator",
				Description: "testDescription",
				Admins:      []string{"testCreator"},
				Parties:     []string{"testParty"},
				Fees:        &types.KeyringFees{KeyReq: 0, SigReq: 0},
				IsActive:    true,
			},
		},
		{
			name: "keyring not found",
			args: args{
				msgKeyring: types.NewMsgNewKeyring("testCreator", "testDescription", 0, 0, 0),
				msg:        types.NewMsgAddKeyringParty("testCreator", "qredokeyring1xtsava0c3nwl7ptz33c", "testParty"),
			},
			want:    &types.MsgAddKeyringPartyResponse{},
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ik, ctx := keepertest.IdentityKeeper(t)
			goCtx := sdk.WrapSDKContext(ctx)
			msgSer := keeper.NewMsgServerImpl(*ik)
			keyringRes, err := msgSer.NewKeyring(goCtx, tt.args.msgKeyring)
			if err != nil {
				t.Fatalf("NewKeyring() error = %v", err)
			}
			got, err := msgSer.AddKeyringParty(goCtx, tt.args.msg)
			if (err != nil) != tt.wantErr {
				t.Errorf("AddKeyringParty() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !tt.wantErr {
				if !reflect.DeepEqual(got, tt.want) {
					t.Errorf("AddKeyringParty() got = %v, want %v", got, tt.want)
				}
				gotKeyring := ik.GetKeyring(ctx, keyringRes.Address)

				if !reflect.DeepEqual(gotKeyring, tt.wantKeyring) {
					t.Errorf("NewKeyring() got = %v, want %v", gotKeyring, tt.wantKeyring)
					return
				}
			}
		})
	}
}
