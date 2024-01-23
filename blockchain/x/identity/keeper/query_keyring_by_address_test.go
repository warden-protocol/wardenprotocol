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
	"github.com/qredo/fusionchain/x/identity/types"
)

func TestKeeper_KeyringByAddress(t *testing.T) {

	var defaultKr = types.Keyring{
		Address:     "qredokeyring1ph63us46lyw56vrzgaq",
		Creator:     "testCreator",
		Description: "testDescription",
		Admins:      []string{"testCreator"},
		Fees:        &types.KeyringFees{KeyReq: 0, SigReq: 0},
		IsActive:    true,
	}

	type args struct {
		keyring *types.Keyring
		req     *types.QueryKeyringByAddressRequest
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
				keyring: &defaultKr,
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
				keyring: &defaultKr,
				req: &types.QueryKeyringByAddressRequest{
					Address: "qredokeyring10kjg2u5s22lezv8dahk",
				},
			},
			want:    nil,
			wantErr: true,
		},
		{
			name: "invalid request",
			args: args{
				keyring: &defaultKr,
				req:     nil,
			},
			want:    nil,
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ik, ctx := keepertest.IdentityKeeper(t)
			goCtx := sdk.WrapSDKContext(ctx)

			genesis := types.GenesisState{
				Keyrings: []types.Keyring{*tt.args.keyring},
			}
			identity.InitGenesis(ctx, *ik, genesis)

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
