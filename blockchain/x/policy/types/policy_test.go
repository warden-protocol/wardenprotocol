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

	// unpack Any into a Policy interface
	interfaceRegistry := codectypes.NewInterfaceRegistry()
	cdc := codec.NewProtoCodec(interfaceRegistry)
	unpackedPolicy, err := UnpackPolicy(cdc, p)
	require.NoError(t, err)

	// verify the unpacked Policy
	require.NoError(t, unpackedPolicy.Verify(policy.BuildApproverSet([]string{"foo"}), policy.EmptyPolicyPayload()))
	require.NoError(t, unpackedPolicy.Verify(policy.BuildApproverSet([]string{"bar"}), policy.EmptyPolicyPayload()))
	require.Error(t, unpackedPolicy.Verify(policy.BuildApproverSet([]string{"baz"}), policy.EmptyPolicyPayload()))
}

func TestValidateBlackbirdPolicy(t *testing.T) {
	tests := []struct {
		name    string
		policy  *BlackbirdPolicy
		wantErr bool
	}{
		{
			name: "valid",
			policy: &BlackbirdPolicy{
				Data: hexutil.MustDecode("0x080210011a0708032203666f6f1a0708032203626172"),
				Participants: []*PolicyParticipant{
					{Abbreviation: "foo", Address: "qredoXXXXXXX"},
					{Abbreviation: "bar", Address: "qredoYYYYYYY"},
				},
			},

			wantErr: false,
		},
		{
			name: "unused participant",
			policy: &BlackbirdPolicy{
				Data: hexutil.MustDecode("0x080210011a0708032203666f6f1a0708032203626172"),
				Participants: []*PolicyParticipant{
					{Abbreviation: "foo", Address: "qredoXXXXXXX"},
					{Abbreviation: "bar", Address: "qredoYYYYYYY"},
					{Abbreviation: "unused", Address: "qredoZZZZZZZ"},
				},
			},
			wantErr: false,
		},
		{
			name: "empty participants list",
			policy: &BlackbirdPolicy{
				Data:         hexutil.MustDecode("0x080210011a0708032203666f6f1a0708032203626172"),
				Participants: []*PolicyParticipant{},
			},

			wantErr: true,
		},
		{
			name: "missing one participant",
			policy: &BlackbirdPolicy{
				Data: hexutil.MustDecode("0x080210011a0708032203666f6f1a0708032203626172"),
				Participants: []*PolicyParticipant{
					{Abbreviation: "foo", Address: "qredoXXXXXXX"},
				},
			},

			wantErr: true,
		},
	}

	for _, tt := range tests {
		p := buildPolicy(t, tt.policy)

		interfaceRegistry := codectypes.NewInterfaceRegistry()
		cdc := codec.NewProtoCodec(interfaceRegistry)
		unpackedPolicy, err := UnpackPolicy(cdc, p)
		require.NoError(t, err)

		if tt.wantErr {
			require.Error(t, unpackedPolicy.Validate())
		} else {
			require.NoError(t, unpackedPolicy.Validate())
		}
	}
}

func TestVerifyBoolparserPolicy(t *testing.T) {
	tests := []struct {
		name      string
		policy    *BoolparserPolicy
		approvers []string
		wantErr   bool
	}{
		{
			name: "verify true",
			policy: &BoolparserPolicy{
				Definition: "me>0",
				Participants: []*PolicyParticipant{
					{Abbreviation: "me", Address: "qredoXXXXXXX"},
				},
			},
			approvers: []string{"me"},
			wantErr:   false,
		},
		{
			name: "threshold unmatched",
			policy: &BoolparserPolicy{
				Definition: "me>1",
				Participants: []*PolicyParticipant{
					{Abbreviation: "me", Address: "qredoXXXXXXX"},
				},
			},
			approvers: []string{"me"},
			wantErr:   true,
		},
		{
			name: "multiple approvers",
			policy: &BoolparserPolicy{
				Definition: "t1 + t2 > 1",
				Participants: []*PolicyParticipant{
					{Abbreviation: "t1", Address: "qredoXXXXXXX"},
					{Abbreviation: "t2", Address: "qredoYYYYYYY"},
				},
			},
			approvers: []string{"t1", "t2"},
			wantErr:   false,
		},
		{
			name: "multiple approvers, one missing",
			policy: &BoolparserPolicy{
				Definition: "t1 + t2 > 1",
				Participants: []*PolicyParticipant{
					{Abbreviation: "t1", Address: "qredoXXXXXXX"},
					{Abbreviation: "t2", Address: "qredoYYYYYYY"},
				},
			},
			approvers: []string{"t1"},
			wantErr:   true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			p := buildPolicy(t, tt.policy)

			interfaceRegistry := codectypes.NewInterfaceRegistry()
			cdc := codec.NewProtoCodec(interfaceRegistry)
			unpackedPolicy, err := UnpackPolicy(cdc, p)
			require.NoError(t, err)

			err = unpackedPolicy.Verify(policy.BuildApproverSet(tt.approvers), policy.EmptyPolicyPayload())
			if tt.wantErr {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestWrongPolicy(t *testing.T) {
	// craft a Policy with a type that does not implement policy.Policy
	p := buildPolicy(t, &GenesisState{}) // here GenesisState is just a random proto.Message

	// try to unpack Any into a Policy interface (fails because GenesisState doesn't implement Policy)
	interfaceRegistry := codectypes.NewInterfaceRegistry()
	cdc := codec.NewProtoCodec(interfaceRegistry)
	_, err := UnpackPolicy(cdc, p)
	require.Error(t, err)
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
