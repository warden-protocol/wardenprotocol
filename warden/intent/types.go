// Copyright 2024
//
// This file includes work covered by the following copyright and permission notices:
//
// Copyright 2023 Qredo Ltd.
// Licensed under the Apache License, Version 2.0;
//
// This file is part of the Warden Protocol library.
//
// The Warden Protocol library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Warden Protocol library. If not, see https://github.com/warden-protocol/wardenprotocol/blob/main/LICENSE
package intent

import (
	"fmt"

	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/cosmos/gogoproto/proto"
)

type ApproverSet map[string]bool

func BuildApproverSet(approvers []string) ApproverSet {
	approverSet := make(ApproverSet, len(approvers))
	for _, a := range approvers {
		approverSet[a] = true
	}
	return approverSet
}

type IntentPayload struct {
	cdc codec.BinaryCodec
	any *cdctypes.Any
}

type IntentPayloadI any

func NewIntentPayload(cdc codec.BinaryCodec, any *cdctypes.Any) IntentPayload {
	return IntentPayload{
		cdc: cdc,
		any: any,
	}
}

func UnpackPayload[P IntentPayloadI](p IntentPayload) (*P, error) {
	var payload P

	if p.any != nil && p.cdc == nil {
		return nil, fmt.Errorf("codec is nil")
	}

	if p.any == nil || p.cdc == nil {
		return nil, nil
	}

	err := p.cdc.UnpackAny(p.any, &payload)
	if err != nil {
		return nil, err
	}

	return &payload, nil
}

type Intent interface {
	// Validate checks that the intent is valid (well formed).
	// The returned error is nil if the intent is valid.
	Validate() error

	// AddressToParticipant returns the participant shorthand for the given
	// address.
	//
	// The Verify() method will receive the list of approvers as shorthands.
	AddressToParticipant(addr string) (string, error)

	// Verify tries to verify the current intent. The returned error is nil if
	// the intent is valid.
	Verify(approvers ApproverSet, payload *IntentPayload) error
}

type IntentMetadata interface {
	// Metadata returns the metadata associated with the intent. This is used
	// to return additional information about the intent in query responses.
	Metadata() (proto.Message, error)
}
