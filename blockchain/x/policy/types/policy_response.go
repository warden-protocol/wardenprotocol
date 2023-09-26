package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/qredo/fusionchain/policy"
)

func NewPolicyResponse(cdc codec.BinaryCodec, policyPb *Policy) (*PolicyResponse, error) {
	p, err := UnpackPolicy(cdc, policyPb)
	if err != nil {
		return nil, err
	}

	var metadata *cdctypes.Any
	if p, ok := p.(policy.PolicyMetadata); ok {
		m, err := p.Metadata()
		if err != nil {
			return nil, err
		}

		metadata, err = cdctypes.NewAnyWithValue(m)
		if err != nil {
			return nil, err
		}
	}

	return &PolicyResponse{
		Policy:   policyPb,
		Metadata: metadata,
	}, nil
}
