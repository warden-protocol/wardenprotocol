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
)

// AnyInGroupIntent is a simple intent where any member of a group can verify it.
type AnyInGroupIntent struct {
	group []string
}

var _ Intent = &AnyInGroupIntent{}

func (*AnyInGroupIntent) Validate() error { return nil }

func (p *AnyInGroupIntent) AddressToParticipant(addr string) (string, error) {
	for _, s := range p.group {
		if s == addr {
			return addr, nil
		}
	}
	return "", fmt.Errorf("address not a participant of this intent")
}

func (p *AnyInGroupIntent) Verify(approvers ApproverSet, _ IntentPayload) error {
	if len(approvers) == 0 {
		return fmt.Errorf("no approvers")
	}

	for _, s := range p.group {
		if _, found := approvers[s]; found {
			return nil
		}
	}

	return fmt.Errorf("approvers are not in the group")
}

func NewAnyInGroupIntent(group []string) *AnyInGroupIntent {
	return &AnyInGroupIntent{
		group: group,
	}
}
