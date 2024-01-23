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

func TestKeeper_Keyrings(t *testing.T) {

	type args struct {
		req          *types.QueryKeyringsRequest
		msgKeyring   *types.MsgNewKeyring
		keyringCount int
	}
	tests := []struct {
		name    string
		args    args
		want    int
		wantErr bool
	}{
		{
			name: "create 100 keyrings",
			args: args{
				req: &types.QueryKeyringsRequest{
					Pagination: nil,
				},
				msgKeyring:   types.NewMsgNewKeyring("testCreator", "testDescription", 0, 0, 0),
				keyringCount: 100,
			},
			want:    100,
			wantErr: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ik, ctx := keepertest.IdentityKeeper(t)
			goCtx := sdk.WrapSDKContext(ctx)
			for i := 0; i < tt.args.keyringCount; i++ {
				msgSer := keeper.NewMsgServerImpl(*ik)
				_, err := msgSer.NewKeyring(goCtx, tt.args.msgKeyring)
				if err != nil {
					t.Fatal(err)
				}
			}
			got, err := ik.Keyrings(goCtx, tt.args.req)
			if (err != nil) != tt.wantErr {
				t.Errorf("Keyrings() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if len(got.Keyrings) != tt.want {
				t.Errorf("Keyrings() got = %v, want %v", got, tt.want)
				return
			}
		})
	}
}
