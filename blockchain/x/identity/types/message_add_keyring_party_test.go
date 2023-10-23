package types

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/qredo/fusionchain/testutil/sample"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestMsgAddKeyringParty_NewMsgAddKeyringParty(t *testing.T) {

	tests := []struct {
		name string
		msg  *MsgAddKeyringParty
		err  error
	}{
		{
			name: "PASS: happy path",
			msg: &MsgAddKeyringParty{
				Creator:     sample.AccAddress(),
				KeyringAddr: "qredokeyring1ph63us46lyw56vrzgaq",
				Party:       "qredo1s3qj9p0ymugy6chyrwy3ft2s5u24fc320vdvv5",
			},
			err: nil,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := NewMsgAddKeyringParty(tt.msg.Creator, tt.msg.KeyringAddr, tt.msg.Party)

			assert.Equalf(t, tt.msg, got, "want", tt.msg)
		})
	}
}

func TestMsgAddKeyringParty_Route(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgAddKeyringParty
	}{
		{
			name: "valid address",
			msg: MsgAddKeyringParty{
				Creator:     sample.AccAddress(),
				KeyringAddr: "qredokeyring1ph63us46lyw56vrzgaq",
				Party:       "qredo1s3qj9p0ymugy6chyrwy3ft2s5u24fc320vdvv5",
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			assert.Equal(t, ModuleName, tt.msg.Route(), "Route()")
		})
	}
}

func TestMsgAddKeyringParty_Type(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgAddKeyringParty
	}{
		{
			name: "valid address",
			msg: MsgAddKeyringParty{
				Creator:     sample.AccAddress(),
				KeyringAddr: "qredokeyring1ph63us46lyw56vrzgaq",
				Party:       "qredo1s3qj9p0ymugy6chyrwy3ft2s5u24fc320vdvv5",
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			assert.Equal(t, TypeMsgAddKeyringParty, tt.msg.Type(), "Type()")
		})
	}
}

func TestMsgAddKeyringParty_GetSigners(t *testing.T) {

	tests := []struct {
		name string
		msg  *MsgAddKeyringParty
	}{
		{
			name: "PASS: happy path",
			msg: &MsgAddKeyringParty{
				Creator:     "qredo1n7x7nv2urvdtc36tvhvc4dg6wfnnwh3cmt9j9w",
				KeyringAddr: "qredokeyring1ph63us46lyw56vrzgaq",
				Party:       "qredo1s3qj9p0ymugy6chyrwy3ft2s5u24fc320vdvv5"},
		},
		{
			name: "FAIL: invalid signer",
			msg: &MsgAddKeyringParty{
				Creator:     "invalid",
				KeyringAddr: "qredokeyring1ph63us46lyw56vrzgaq",
				Party:       "qredo1s3qj9p0ymugy6chyrwy3ft2s5u24fc320vdvv5",
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			acc, err := sdk.AccAddressFromBech32(tt.msg.Creator)
			if err != nil {
				assert.Panics(t, func() { tt.msg.GetSigners() })
			} else {
				msg := NewMsgAddKeyringParty(tt.msg.Creator, tt.msg.KeyringAddr, tt.msg.Party)
				got := msg.GetSigners()

				assert.Equal(t, []sdk.AccAddress{acc}, got)
			}
		})
	}
}

func TestMsgAddKeyringParty_GetSignBytes(t *testing.T) {

	tests := []struct {
		name string
		msg  *MsgAddKeyringParty
	}{
		{
			name: "PASS: happy path",
			msg: &MsgAddKeyringParty{
				Creator:     "qredo1nexzt4fcc84mgnqwjdhxg6veu97eyy9rgzkczs",
				KeyringAddr: "qredokeyring1ph63us46lyw56vrzgaq",
				Party:       "qredo1s3qj9p0ymugy6chyrwy3ft2s5u24fc320vdvv5",
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			msg := NewMsgAddKeyringParty(tt.msg.Creator, tt.msg.KeyringAddr, tt.msg.Party)
			got := msg.GetSignBytes()

			bz := ModuleCdc.MustMarshalJSON(msg)
			sortedBz := sdk.MustSortJSON(bz)

			require.Equal(t, sortedBz, got, "GetSignBytes() result doesn't match sorted JSON bytes")

		})
	}
}

func TestMsgAddKeyringParty_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgAddKeyringParty
		err  error
	}{
		{
			name: "PASS: valid address",
			msg: MsgAddKeyringParty{
				Creator:     sample.AccAddress(),
				KeyringAddr: "qredokeyring1ph63us46lyw56vrzgaq",
				Party:       "qredo1s3qj9p0ymugy6chyrwy3ft2s5u24fc320vdvv5",
			},
		},
		{
			name: "FAIL: invalid address",
			msg: MsgAddKeyringParty{
				Creator:     "invalid_address",
				KeyringAddr: "qredokeyring1ph63us46lyw56vrzgaq",
				Party:       "qredo1s3qj9p0ymugy6chyrwy3ft2s5u24fc320vdvv5",
			},
			err: sdkerrors.ErrInvalidAddress,
		},
		{
			name: "FAIL: invalid party address",
			msg: MsgAddKeyringParty{
				Creator:     sample.AccAddress(),
				KeyringAddr: "qredokeyring1ph63us46lyw56vrzgaq",
				Party:       "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := tt.msg.ValidateBasic()
			if tt.err != nil {
				require.ErrorIs(t, err, tt.err)
				return
			}
			require.NoError(t, err)
		})
	}
}
