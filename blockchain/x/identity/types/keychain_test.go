// Copyright 2024
//
// This file includes work covered by the following copyright and permission notices:
//
// Copyright 2023 Qredo Ltd.
// Licensed under the Apache License, Version 2.0;
//
// This file is part of the Warden Protocol library.
//
// The Warden Protocol library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Warden Protocol library. If not, see https://github.com/warden-protocol/wardenprotocol/blob/main/LICENSE
package types

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestKeychain_IsParty(t *testing.T) {
	type fields struct {
		KeychainAddr string
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
				Parties: []string{"wardenkeychain1ph63us46lyw56lmt585", "wardenkeychain1xtsava0c3nwl7508v0c", "wardenkeychain10kjg0u5s22lezergqfk"},
			},
			args: args{
				address: "wardenkeychain1xtsava0c3nwl7508v0c",
			},
			want: true,
		},
		{
			name: "Address does not exist in Parties",
			fields: fields{
				Parties: []string{"wardenkeychain1ph63us46lyw56lmt585", "wardenkeychain10kjg0u5s22lezergqfk"},
			},
			args: args{
				address: "wardenkeychain1xtsava0c3nwl7508v0c",
			},
			want: false,
		},
		{
			name: "Empty Parties",
			fields: fields{
				Parties: []string{},
			},
			args: args{
				address: "wardenkeychain1xtsava0c3nwl7508v0c",
			},
			want: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			k := &Keychain{
				Parties: tt.fields.Parties,
			}
			assert.Equalf(t, tt.want, k.IsParty(tt.args.address), "IsParty(%v)", tt.args.address)
		})
	}
}

func TestKeychain_AddParty(t *testing.T) {
	type fields struct {
		KeychainAddr string
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
				address: "wardenkeychain1ph63us46lyw56lmt585",
			},
			want: []string{"wardenkeychain1ph63us46lyw56lmt585"},
		},
		{
			name: "Tx creator is no admin",
			fields: fields{
				Parties: []string{"wardenkeychain1ph63us46lyw56lmt585", "wardenkeychain1xtsava0c3nwl7508v0c"},
			},
			args: args{
				address: "wardenkeychain10kjg0u5s22lezergqfk",
			},
			want: []string{"wardenkeychain1ph63us46lyw56lmt585", "wardenkeychain1xtsava0c3nwl7508v0c", "wardenkeychain10kjg0u5s22lezergqfk"},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			k := &Keychain{
				Parties: tt.fields.Parties,
			}
			k.AddParty(tt.args.address)
		})
	}
}

func TestKeychain_IsAdmin(t *testing.T) {
	type fields struct {
		KeychainAddr string
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
			name: "Tx creator is an admin of keychain",
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
			k := &Keychain{
				Admins: tt.fields.Admins,
			}
			k.IsAdmin(tt.args.address)
		})
	}
}
