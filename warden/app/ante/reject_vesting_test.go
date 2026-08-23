package ante_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkvesting "github.com/cosmos/cosmos-sdk/x/auth/vesting/types"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	"github.com/stretchr/testify/require"
	protov2 "google.golang.org/protobuf/proto"

	"github.com/warden-protocol/wardenprotocol/warden/app/ante"
)

// stubTx is a minimal sdk.Tx carrying a fixed set of messages.
type stubTx struct {
	msgs []sdk.Msg
}

func (t stubTx) GetMsgs() []sdk.Msg { return t.msgs }

func (t stubTx) GetMsgsV2() ([]protov2.Message, error) { return nil, nil }

func TestRejectVestingMsgsDecorator(t *testing.T) {
	testCases := []struct {
		name      string
		msg       sdk.Msg
		expReject bool
	}{
		{
			name:      "reject MsgCreateVestingAccount",
			msg:       &sdkvesting.MsgCreateVestingAccount{},
			expReject: true,
		},
		{
			name:      "reject MsgCreatePermanentLockedAccount",
			msg:       &sdkvesting.MsgCreatePermanentLockedAccount{},
			expReject: true,
		},
		{
			name:      "reject MsgCreatePeriodicVestingAccount",
			msg:       &sdkvesting.MsgCreatePeriodicVestingAccount{},
			expReject: true,
		},
		{
			name:      "allow unrelated msg",
			msg:       &banktypes.MsgSend{},
			expReject: false,
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			dec := ante.NewRejectVestingMsgsDecorator()

			called := false
			next := func(ctx sdk.Context, _ sdk.Tx, _ bool) (sdk.Context, error) {
				called = true
				return ctx, nil
			}

			_, err := dec.AnteHandle(sdk.Context{}, stubTx{msgs: []sdk.Msg{tc.msg}}, false, next)

			if tc.expReject {
				require.Error(t, err)
				require.Contains(t, err.Error(), "is not supported on this chain")
				require.False(t, called, "next handler must not run for a rejected msg")

				return
			}

			require.NoError(t, err)
			require.True(t, called, "next handler must run for an allowed msg")
		})
	}
}
