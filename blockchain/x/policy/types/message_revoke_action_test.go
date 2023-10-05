package types

import (
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/qredo/fusionchain/testutil/sample"
	"github.com/stretchr/testify/require"
)

func TestMsgRevokeAction_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgRevokeAction
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgRevokeAction{
				Creator:    "invalid_address",
				ActionType: "action_type",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgRevokeAction{
				Creator:    sample.AccAddress(),
				ActionType: "action_type",
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
