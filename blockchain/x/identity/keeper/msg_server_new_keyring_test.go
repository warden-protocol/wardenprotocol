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

func Test_msgServer_NewKeyring(t *testing.T) {
	type args struct {
		msg *types.MsgNewKeyring
	}
	tests := []struct {
		name        string
		args        args
		want        *types.MsgNewKeyringResponse
		wantCreated *types.Keyring
		wantErr     bool
	}{
		{
			name: "create a keyring",
			args: args{
				msg: types.NewMsgNewKeyring("testCreator", "testDescription", 0, 0, 0),
			},
			want: &types.MsgNewKeyringResponse{Address: "qredokeyring1ph63us46lyw56vrzgaq"},
			wantCreated: &types.Keyring{
				Address:     "qredokeyring1ph63us46lyw56vrzgaq",
				Creator:     "testCreator",
				Description: "testDescription",
				Admins:      []string{"testCreator"},
				Parties:     nil,
				Fees:        &types.KeyringFees{KeyReq: 0, SigReq: 0},
				IsActive:    true,
			},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ik, ctx := keepertest.IdentityKeeper(t)
			goCtx := sdk.WrapSDKContext(ctx)
			msgSer := keeper.NewMsgServerImpl(*ik)
			got, err := msgSer.NewKeyring(goCtx, tt.args.msg)
			if (err != nil) != tt.wantErr {
				t.Errorf("NewKeyring() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("NewKeyring() got = %v, want %v", got, tt.want)
			}
			gotKeyring := ik.GetKeyring(ctx, got.Address)

			if !reflect.DeepEqual(gotKeyring, tt.wantCreated) {
				t.Errorf("NewKeyring() got = %v, want %v", gotKeyring, tt.wantCreated)
				return
			}
		})
	}
}
