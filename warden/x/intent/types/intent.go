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
package types

import (
	"fmt"
	"strings"

	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/warden-protocol/wardenprotocol/warden/boolparser"
	"github.com/warden-protocol/wardenprotocol/warden/intent"
)

func UnpackIntent(cdc codec.BinaryCodec, intentPb *Intent) (intent.Intent, error) {
	var p intent.Intent
	err := cdc.UnpackAny(intentPb.Intent, &p)
	if err != nil {
		return nil, fmt.Errorf("unpacking Any: %w", err)
	}

	return p, nil
}

var _ (intent.Intent) = (*BoolparserIntent)(nil)

func (*BoolparserIntent) Validate() error {
	// TODO validate definition syntax, and that all participants are in the intent
	return nil
}

func (p *BoolparserIntent) AddressToParticipant(addr string) (string, error) {
	for _, participant := range p.Participants {
		if participant.Address == addr {
			return participant.Abbreviation, nil
		}
	}
	return "", fmt.Errorf("address not a participant of this intent")
}

func (p *BoolparserIntent) Verify(approvers intent.ApproverSet, _ intent.IntentPayload) error {
	expression := p.Definition
	for abbr := range approvers {
		expression = strings.ReplaceAll(expression, abbr, "1")
	}

	if boolparser.BoolSolve(expression) {
		return nil
	}
	return fmt.Errorf("expression not satisfied")
}
