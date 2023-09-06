package types

import (
	"testing"

	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	proto "github.com/cosmos/gogoproto/proto"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/qredo/fusionchain/policy"
	"github.com/stretchr/testify/require"
)

func TestPolicy(t *testing.T) {
	// wrap a serialized blackbird policy into BlackbirdPolicy, then wrap
	// the BlackbirdPolicy into Policy
	p := buildPolicy(t, &BlackbirdPolicy{
		Data: hexutil.MustDecode("0x080210011a0708032203666f6f1a0708032203626172"),
	})

	// get the PolicyHandle for the Policy
	interfaceRegistry := codectypes.NewInterfaceRegistry()
	cdc := codec.NewProtoCodec(interfaceRegistry)
	handle := NewPolicyHandle(cdc, p)

	// verify the PolicyHandle
	require.NoError(t, handle.Verify(policy.BuildApproverSet([]string{"foo"})))
	require.NoError(t, handle.Verify(policy.BuildApproverSet([]string{"bar"})))
	require.Error(t, handle.Verify(policy.BuildApproverSet([]string{"baz"})))
}

func TestWrongPolicy(t *testing.T) {
	// craft a Policy with a type that does not implement policy.Policy
	p := buildPolicy(t, &GenesisState{}) // here GenesisState is just a random proto.Message

	// get the PolicyHandle for the Policy
	interfaceRegistry := codectypes.NewInterfaceRegistry()
	cdc := codec.NewProtoCodec(interfaceRegistry)
	handle := NewPolicyHandle(cdc, p)

	// verify the PolicyHandle
	require.Error(t, handle.Verify(policy.BuildApproverSet([]string{"foo"})))
}

func buildPolicy(t *testing.T, v proto.Message) *Policy {
	t.Helper()

	wrappedMsg, err := codectypes.NewAnyWithValue(v)
	require.NoError(t, err)

	policy := &Policy{
		Id:     1,
		Name:   "test policy",
		Policy: wrappedMsg,
	}

	return policy
}
