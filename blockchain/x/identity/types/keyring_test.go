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
package types

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestKeyring_IsParty(t *testing.T) {
	type fields struct {
		KeyringAddr string
		Creator     string
		Description string
		Admins      []string
		Parties     []string
	}
	type args struct {
		address string
	}
	tests := []struct {
		name   string
		fields fields
		args   args
		want   bool
	}{
		{
			name: "Address exists in Parties",
			fields: fields{
				Parties: []string{"qredokeyring1ph63us46lyw56vrzgaq", "qredokeyring1xtsava0c3nwl7ptz33c", "qredokeyring10kjg0u5s22lezv8dahk"},
			},
			args: args{
				address: "qredokeyring1xtsava0c3nwl7ptz33c",
			},
			want: true,
		},
		{
			name: "Address does not exist in Parties",
			fields: fields{
				Parties: []string{"qredokeyring1ph63us46lyw56vrzgaq", "qredokeyring10kjg0u5s22lezv8dahk"},
			},
			args: args{
				address: "qredokeyring1xtsava0c3nwl7ptz33c",
			},
			want: false,
		},
		{
			name: "Empty Parties",
			fields: fields{
				Parties: []string{},
			},
			args: args{
				address: "qredokeyring1xtsava0c3nwl7ptz33c",
			},
			want: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			k := &Keyring{
				Parties: tt.fields.Parties,
			}
			assert.Equalf(t, tt.want, k.IsParty(tt.args.address), "IsParty(%v)", tt.args.address)
		})
	}
}

func TestKeyring_AddParty(t *testing.T) {
	type fields struct {
		KeyringAddr string
		Creator     string
		Description string
		Admins      []string
		Parties     []string
	}
	type args struct {
		address string
	}
	tests := []struct {
		name   string
		fields fields
		args   args
		want   []string
	}{
		{
			name: "Add a party to an empty Parties list",
			fields: fields{
				Parties: []string{},
			},
			args: args{
				address: "qredokeyring1ph63us46lyw56vrzgaq",
			},
			want: []string{"qredokeyring1ph63us46lyw56vrzgaq"},
		},
		{
			name: "Tx creator is no admin",
			fields: fields{
				Parties: []string{"qredokeyring1ph63us46lyw56vrzgaq", "qredokeyring1xtsava0c3nwl7ptz33c"},
			},
			args: args{
				address: "qredokeyring10kjg0u5s22lezv8dahk",
			},
			want: []string{"qredokeyring1ph63us46lyw56vrzgaq", "qredokeyring1xtsava0c3nwl7ptz33c", "qredokeyring10kjg0u5s22lezv8dahk"},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			k := &Keyring{
				Parties: tt.fields.Parties,
			}
			k.AddParty(tt.args.address)
		})
	}
}

func TestKeyring_IsAdmin(t *testing.T) {
	type fields struct {
		KeyringAddr string
		Creator     string
		Description string
		Admins      []string
		Parties     []string
	}
	type args struct {
		address string
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		wantErr bool
	}{
		{
			name: "Tx creator is an admin of keyring",
			fields: fields{
				Admins: []string{"testAdmin"},
			},
			args: args{
				address: "testAdmin",
			},
			wantErr: false,
		},
		{
			name: "Tx creator is no admin",
			fields: fields{
				Admins: []string{"testAdmin"},
			},
			args: args{
				address: "noAdmin",
			},
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			k := &Keyring{
				Admins: tt.fields.Admins,
			}
			k.IsAdmin(tt.args.address)
		})
	}
}
