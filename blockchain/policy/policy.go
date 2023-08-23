package policy

import (
// "gitlab.qredo.com/edmund/blackbird/verifier/golang/protobuf"
// bbird "gitlab.qredo.com/edmund/blackbird/verifier/golang/simple"
// "google.golang.org/protobuf/proto"
)

// AnyInGroupPolicy is a simple policy where any member of a group can verify it.
type AnyInGroupPolicy struct {
	// policy *protobuf.Policy
}

var _ Policy = &AnyInGroupPolicy{}

func (p *AnyInGroupPolicy) Verify(approvers ApproverSet) error {
	// policyBz, err := proto.Marshal(p.policy)
	// if err != nil {
	// 	return err
	// }

	// return bbird.Verify(policyBz, nil, nil, nil, approvers)
	return nil
}

func NewAnyInGroupPolicy(group []string) *AnyInGroupPolicy {
	// policy := &protobuf.Policy{
	// 	Tag:           protobuf.PolicyTag_POLICY_ANY,
	// 	Threshold:     1,
	// 	AddressPrefix: "",
	// 	Subpolicies:   make([]*protobuf.Policy, len(group)),
	// }
	// for i, s := range group {
	// 	policy.Subpolicies[i] = &protobuf.Policy{
	// 		Tag:           protobuf.PolicyTag_POLICY_SIGNATURE,
	// 		AddressPrefix: "",
	// 		Address: &protobuf.Policy_CookedAddress{
	// 			CookedAddress: s,
	// 		},
	// 	}
	// }

	return &AnyInGroupPolicy{
		// policy: policy,
	}
}
