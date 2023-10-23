package keeper_test

import (
	"reflect"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/qredo/fusionchain/testutil/keeper"
	"github.com/qredo/fusionchain/x/identity/keeper"
	"github.com/qredo/fusionchain/x/identity/types"
)

func TestKeeper_KeyringByID(t *testing.T) {

	type args struct {
		msg *types.MsgNewKeyring
		req *types.QueryKeyringByAddressRequest
	}
	tests := []struct {
		name    string
		args    args
		want    *types.QueryKeyringByAddressResponse
		wantErr bool
	}{
		{
			name: "get a keyring by address",
			args: args{
				msg: types.NewMsgNewKeyring("testCreator", "testDescription", 0, 0, 0),
				req: &types.QueryKeyringByAddressRequest{
					Address: "qredokeyring1ph63us46lyw56vrzgaq",
				},
			},
			want: &types.QueryKeyringByAddressResponse{Keyring: &types.Keyring{
				Address:     "qredokeyring1ph63us46lyw56vrzgaq",
				Creator:     "testCreator",
				Description: "testDescription",
				Admins:      []string{"testCreator"},
				Parties:     nil,
				Fees:        &types.KeyringFees{KeyReq: 0, SigReq: 0},
				IsActive:    true,
			}},
			wantErr: false,
		},
		{
			name: "keyring by address not found",
			args: args{
				msg: types.NewMsgNewKeyring("testCreator", "testDescription", 0, 0, 0),
				req: &types.QueryKeyringByAddressRequest{
					Address: "qredokeyring10kjg2u5s22lezv8dahk",
				},
			},
			want:    nil,
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ik, ctx := keepertest.IdentityKeeper(t)
			goCtx := sdk.WrapSDKContext(ctx)
			msgSer := keeper.NewMsgServerImpl(*ik)
			_, err := msgSer.NewKeyring(goCtx, tt.args.msg)
			if err != nil {
				t.Errorf("Failed to create new keyring. Reason: %v", err)
			}
			got, err := ik.KeyringByAddress(goCtx, tt.args.req)
			if (err != nil) != tt.wantErr {
				t.Errorf("KeyringByAddress() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !tt.wantErr && !reflect.DeepEqual(got, tt.want) {
				t.Errorf("KeyringByAddress() got = %v, want %v", got, tt.want)
			}
		})
	}
}
