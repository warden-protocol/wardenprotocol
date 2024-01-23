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

func Test_msgServer_UpdateKeyring(t *testing.T) {

	var defaultKr = types.Keyring{
		Address:     "qredokeyring1ph63us46lyw56vrzgaq",
		Creator:     "testCreator",
		Description: "testDescription",
		Admins:      []string{"testCreator"},
		IsActive:    true,
	}

	var wantKr = types.Keyring{
		Address:     "qredokeyring1ph63us46lyw56vrzgaq",
		Creator:     "testCreator",
		Description: "testDescription",
		Admins:      []string{"testCreator"},
		IsActive:    true,
	}

	type args struct {
		keyring *types.Keyring
		msg     *types.MsgUpdateKeyring
	}
	tests := []struct {
		name        string
		args        args
		want        *types.MsgUpdateKeyringResponse
		wantKeyring *types.Keyring
		wantErr     bool
	}{
		{
			name: "change keyring description",
			args: args{
				keyring: &defaultKr,
				msg:     types.NewMsgUpdateKeyring("testCreator", "qredokeyring1ph63us46lyw56vrzgaq", "newDescription", true),
			},
			want: &types.MsgUpdateKeyringResponse{},
			wantKeyring: &types.Keyring{
				Address:     "qredokeyring1ph63us46lyw56vrzgaq",
				Creator:     "testCreator",
				Description: "newDescription",
				Admins:      []string{"testCreator"},
				IsActive:    true,
			},
		},
		{
			name: "keyring not found",
			args: args{
				keyring: &defaultKr,
				msg:     types.NewMsgUpdateKeyring("testCreator", "invalidKeyring", "newDescription", true),
			},
			want:    &types.MsgUpdateKeyringResponse{},
			wantErr: true,
		},
		{
			name: "creator no keyring admin",
			args: args{
				keyring: &defaultKr,
				msg:     types.NewMsgUpdateKeyring("noAdmin", "qredokeyring1ph63us46lyw56vrzgaq", "newDescription", true),
			},
			want:    &types.MsgUpdateKeyringResponse{},
			wantErr: true,
		},
		{
			name: "change keyring status to false",
			args: args{
				keyring: &types.Keyring{
					Address:     "qredokeyring1ph63us46lyw56vrzgaq",
					Creator:     "testCreator",
					Description: "testDescription",
					Admins:      []string{"testCreator"},
					IsActive:    true,
				},
				msg: types.NewMsgUpdateKeyring("testCreator", "qredokeyring1ph63us46lyw56vrzgaq", "testDescription", false),
			},
			want: &types.MsgUpdateKeyringResponse{},
			wantKeyring: &types.Keyring{
				Address:     "qredokeyring1ph63us46lyw56vrzgaq",
				Creator:     "testCreator",
				Description: "testDescription",
				Admins:      []string{"testCreator"},
				IsActive:    false,
			},
		},
		{
			name: "change keyring status to true",
			args: args{
				keyring: &types.Keyring{
					Address:     "qredokeyring1ph63us46lyw56vrzgaq",
					Creator:     "testCreator",
					Description: "testDescription",
					Admins:      []string{"testCreator"},
					IsActive:    false,
				},
				msg: types.NewMsgUpdateKeyring("testCreator", "qredokeyring1ph63us46lyw56vrzgaq", "testDescription", true),
			},
			want:        &types.MsgUpdateKeyringResponse{},
			wantKeyring: &wantKr,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ik, ctx := keepertest.IdentityKeeper(t)
			goCtx := sdk.WrapSDKContext(ctx)
			msgSer := keeper.NewMsgServerImpl(*ik)

			genesis := types.GenesisState{
				Keyrings: []types.Keyring{*tt.args.keyring},
			}
			identity.InitGenesis(ctx, *ik, genesis)

			got, err := msgSer.UpdateKeyring(goCtx, tt.args.msg)
			if (err != nil) != tt.wantErr {
				t.Fatalf("UpdateKeyring() error = %v, wantErr %v", err, tt.wantErr)
			}

			if !tt.wantErr {
				if !reflect.DeepEqual(got, tt.want) {
					t.Fatalf("UpdateKeyring() got = %v, want %v", got, tt.want)
				}
				gotKeyring := ik.GetKeyring(ctx, tt.args.keyring.Address)

				if !reflect.DeepEqual(gotKeyring, tt.wantKeyring) {
					t.Fatalf("UpdateKeyring() got = %v, want %v", gotKeyring, tt.wantKeyring)
				}
			}
		})
	}
}
