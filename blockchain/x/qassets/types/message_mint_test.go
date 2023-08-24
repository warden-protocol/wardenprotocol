package types

import (
	"testing"

	sdkerrors "cosmossdk.io/errors"
	"github.com/stretchr/testify/require"
	"github.com/qredo/fusionchain/testutil/sample"
)

func TestMsgMint_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgMint
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgMint{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgMint{
				Creator: sample.AccAddress(),
			},
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
