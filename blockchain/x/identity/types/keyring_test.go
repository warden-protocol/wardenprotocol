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
			name: "Add a party to a non-empty Parties list",
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
