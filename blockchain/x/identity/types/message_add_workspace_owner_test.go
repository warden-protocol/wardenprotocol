package types

import (
	"testing"

	sdkerrors "cosmossdk.io/errors"
	"github.com/stretchr/testify/require"
	"gitlab.qredo.com/qrdochain/fusionchain/testutil/sample"
)

func TestMsgAddWorkspaceOwner_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgAddWorkspaceOwner
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgAddWorkspaceOwner{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgAddWorkspaceOwner{
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
