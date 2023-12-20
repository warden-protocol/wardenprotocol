// Copyright 2023 Qredo Ltd.
// This file is part of the Fusion library.
//
// The Fusion library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Fusion library. If not, see https://github.com/qredo/fusionchain/blob/main/LICENSE
package policy

import (
	"fmt"

	"gitlab.qredo.com/edmund/blackbird/verifier/golang/protobuf"
	bbird "gitlab.qredo.com/edmund/blackbird/verifier/golang/simple"
	"google.golang.org/protobuf/proto"
)

// AnyInGroupPolicy is a simple policy where any member of a group can verify it.
type AnyInGroupPolicy struct {
	group  []string
	policy *protobuf.Policy
}

var _ Policy = &AnyInGroupPolicy{}

func (*AnyInGroupPolicy) Validate() error { return nil }

func (p *AnyInGroupPolicy) AddressToParticipant(addr string) (string, error) {
	for _, s := range p.group {
		if s == addr {
			return addr, nil
		}
	}
	return "", fmt.Errorf("address not a participant of this policy")
}

func (p *AnyInGroupPolicy) Verify(approvers ApproverSet, _ PolicyPayload) error {
	policyBz, err := proto.Marshal(p.policy)
	if err != nil {
		return err
	}

	return bbird.Verify(policyBz, nil, nil, nil, approvers)
}

func NewAnyInGroupPolicy(group []string) *AnyInGroupPolicy {
	policy := &protobuf.Policy{
		Tag:           protobuf.PolicyTag_POLICY_ANY,
		Threshold:     1,
		AddressPrefix: "",
		Subpolicies:   make([]*protobuf.Policy, len(group)),
	}
	for i, s := range group {
		policy.Subpolicies[i] = &protobuf.Policy{
			Tag:           protobuf.PolicyTag_POLICY_SIGNATURE,
			AddressPrefix: "",
			Address: &protobuf.Policy_CookedAddress{
				CookedAddress: s,
			},
		}
	}

	return &AnyInGroupPolicy{
		group:  group,
		policy: policy,
	}
}
