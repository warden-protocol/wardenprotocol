package types

import (
	fmt "fmt"

	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/qredo/fusionchain/policy"
	"github.com/qredo/fusionchain/repo"
	"gitlab.qredo.com/edmund/blackbird/verifier/golang/simple"
)

var _ repo.Object = (*Policy)(nil)

// nolint:stylecheck,st1003
// revive:disable-next-line var-naming
func (a *Policy) SetId(id uint64) {
	a.Id = id
}

// PolicyHandle is a convenience wrapper around a Policy object.
//
// The type of the Policy.Policy, which is a google.protobuf.Any, must implement
// `policy.Policy` interface.
type PolicyHandle struct {
	policy *Policy
	cdc    codec.BinaryCodec
}

func NewPolicyHandle(cdc codec.BinaryCodec, p *Policy) *PolicyHandle {
	return &PolicyHandle{
		policy: p,
		cdc:    cdc,
	}
}

func (h *PolicyHandle) Verify(approvers policy.ApproverSet) error {
	var m policy.Policy
	err := h.cdc.UnpackAny(h.policy.Policy, &m)
	if err != nil {
		return fmt.Errorf("unpacking Any: %w", err)
	}
	return m.Verify(approvers)
}

var _ (policy.Policy) = (*BlackbirdPolicy)(nil)

func (p *BlackbirdPolicy) Verify(approvers policy.ApproverSet) error {
	return simple.Verify(p.Data, nil, nil, nil, approvers)
}
