package types

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/qredo/fusionchain/testutil/sample"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestMsgNewKeyring_NewMsgNewKeyring(t *testing.T) {
	tests := []struct {
		name string
		msg  *MsgNewKeyring
		err  error
	}{
		{
			name: "PASS: happy path",
			msg: &MsgNewKeyring{
				Creator:       sample.AccAddress(),
				Description:   "Test Keyring",
				AdminPolicyId: 0,
				Fees:          &KeyringFees{KeyReq: 0, SigReq: 0},
			},
			err: nil,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := NewMsgNewKeyring(tt.msg.Creator, tt.msg.Description, tt.msg.AdminPolicyId, tt.msg.Fees.KeyReq, tt.msg.Fees.SigReq)

			assert.Equalf(t, tt.msg, got, "want", tt.msg)
		})
	}
}

func TestMsgNewKeyring_Route(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgNewKeyring
	}{
		{
			name: "valid address",
			msg: MsgNewKeyring{
				Creator:       sample.AccAddress(),
				Description:   "Test Keyring",
				AdminPolicyId: 0,
				Fees:          &KeyringFees{KeyReq: 0, SigReq: 0},
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			assert.Equal(t, ModuleName, tt.msg.Route(), "Route()")
		})
	}
}

func TestMsgNewKeyring_Type(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgNewKeyring
	}{
		{
			name: "valid address",
			msg: MsgNewKeyring{
				Creator:       sample.AccAddress(),
				Description:   "Test Keyring",
				AdminPolicyId: 0,
				Fees:          &KeyringFees{KeyReq: 0, SigReq: 0},
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			assert.Equal(t, TypeMsgNewKeyring, tt.msg.Type(), "Type()")
		})
	}
}

func TestMsgNewKeyring_GetSigners(t *testing.T) {
	tests := []struct {
		name string
		msg  *MsgNewKeyring
	}{
		{
			name: "PASS: happy path",
			msg: &MsgNewKeyring{
				Creator:       "qredo1n7x7nv2urvdtc36tvhvc4dg6wfnnwh3cmt9j9w",
				Description:   "Test Keyring",
				AdminPolicyId: 0,
				Fees:          &KeyringFees{KeyReq: 0, SigReq: 0},
			},
		},
		{
			name: "FAIL: invalid signer",
			msg: &MsgNewKeyring{
				Creator:       "invalid",
				Description:   "Test Keyring",
				AdminPolicyId: 0,
				Fees:          &KeyringFees{KeyReq: 0, SigReq: 0},
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			acc, err := sdk.AccAddressFromBech32(tt.msg.Creator)
			if err != nil {
				assert.Panics(t, func() { tt.msg.GetSigners() })
			} else {
				msg := NewMsgNewKeyring(tt.msg.Creator, tt.msg.Description, tt.msg.AdminPolicyId, tt.msg.Fees.KeyReq, tt.msg.Fees.SigReq)
				got := msg.GetSigners()

				assert.Equal(t, []sdk.AccAddress{acc}, got)
			}
		})
	}
}

func TestMsgNewKeyring_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgNewKeyring
		err  error
	}{
		{
			name: "PASS: valid address",
			msg: MsgNewKeyring{
				Creator:       sample.AccAddress(),
				Description:   "Test Description",
				AdminPolicyId: 0,
				Fees:          &KeyringFees{KeyReq: 0, SigReq: 0},
			},
		},
		{
			name: "FAIL: invalid address",
			msg: MsgNewKeyring{
				Creator:       "invalid_address",
				Description:   "Test Description",
				AdminPolicyId: 0,
				Fees:          &KeyringFees{KeyReq: 0, SigReq: 0},
			},
			err: sdkerrors.ErrInvalidAddress,
		},
		{
			name: "FAIL: no description",
			msg: MsgNewKeyring{
				Creator:       sample.AccAddress(),
				Description:   "",
				AdminPolicyId: 0,
				Fees:          &KeyringFees{KeyReq: 0, SigReq: 0},
			},
			err: ErrEmptyDesc,
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
