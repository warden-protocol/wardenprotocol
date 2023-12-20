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
