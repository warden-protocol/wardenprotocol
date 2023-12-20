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
	"fmt"
	"strings"

	"github.com/cosmos/cosmos-sdk/codec"
	proto "github.com/cosmos/gogoproto/proto"
	"github.com/qredo/fusionchain/boolparser"
	"github.com/qredo/fusionchain/policy"
	"github.com/qredo/fusionchain/repo"
	"gitlab.qredo.com/edmund/blackbird/verifier/golang/impl"
	"gitlab.qredo.com/edmund/blackbird/verifier/golang/simple"
)

var _ repo.Object = (*Policy)(nil)

// nolint:stylecheck,st1003
// revive:disable-next-line var-naming
func (a *Policy) SetId(id uint64) {
	a.Id = id
}

func UnpackPolicy(cdc codec.BinaryCodec, policyPb *Policy) (policy.Policy, error) {
	var p policy.Policy
	err := cdc.UnpackAny(policyPb.Policy, &p)
	if err != nil {
		return nil, fmt.Errorf("unpacking Any: %w", err)
	}

	return p, nil
}

var _ (policy.Policy) = (*BoolparserPolicy)(nil)

func (*BoolparserPolicy) Validate() error {
	// TODO validate definition syntax, and that all participants are in the policy
	return nil
}

func (p *BoolparserPolicy) AddressToParticipant(addr string) (string, error) {
	for _, participant := range p.Participants {
		if participant.Address == addr {
			return participant.Abbreviation, nil
		}
	}
	return "", fmt.Errorf("address not a participant of this policy")
}

func (p *BoolparserPolicy) Verify(approvers policy.ApproverSet, _ policy.PolicyPayload) error {
	expression := p.Definition
	for abbr := range approvers {
		expression = strings.ReplaceAll(expression, abbr, "1")
	}

	if boolparser.BoolSolve(expression) {
		return nil
	}
	return fmt.Errorf("expression not satisfied")
}

var _ (policy.Policy) = (*BlackbirdPolicy)(nil)

func (p *BlackbirdPolicy) Validate() error {
	participants := make(map[string]impl.Authority, len(p.Participants))
	for _, participant := range p.Participants {
		participants[participant.Abbreviation] = impl.ParticipantAsAuthority(participant.Address)
	}
	cleanData, err := simple.InstallCheck(p.Data, nil, participants)
	p.Data = cleanData
	return err
}

func (p *BlackbirdPolicy) AddressToParticipant(addr string) (string, error) {
	for _, participant := range p.Participants {
		if participant.Address == addr {
			return participant.Abbreviation, nil
		}
	}
	return "", fmt.Errorf("address not a participant of this policy")
}

func (p *BlackbirdPolicy) Verify(approvers policy.ApproverSet, policyPayload policy.PolicyPayload) error {
	payload, err := policy.UnpackPayload[BlackbirdPolicyPayload](policyPayload)
	if err != nil {
		return err
	}

	var witness []byte
	if payload != nil {
		witness = payload.Witness
	}

	return simple.Verify(p.Data, witness, nil, nil, approvers)
}

var _ (policy.PolicyMetadata) = (*BlackbirdPolicy)(nil)

// Metadata implements policy.PolicyMetadata.
func (p *BlackbirdPolicy) Metadata() (proto.Message, error) {
	pretty, err := simple.Unparse(p.Data)
	if err != nil {
		return nil, err
	}

	return &BlackbirdPolicyMetadata{
		Pretty: pretty,
	}, nil
}
