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
	time "time"

	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func NewApprover(address string, timestamp time.Time) *Approver {
	return &Approver{
		Address:    address,
		ApprovedAt: timestamp,
	}
}

func (a *Action) SetId(id uint64) { a.Id = id }

func (a *Action) AddApprover(address string, timestamp time.Time) error {
	if a.Status != ActionStatus_ACTION_STATUS_PENDING {
		return fmt.Errorf("action already completed")
	}

	for _, a := range a.Approvers {
		if a.Address == address {
			return fmt.Errorf("approver already added")
		}
	}

	a.Approvers = append(a.Approvers, NewApprover(address, timestamp))
	return nil
}

func GetActionMessage[Msg sdk.Msg](cdc codectypes.AnyUnpacker, a Action) (Msg, error) {
	var (
		msg      sdk.Msg
		emptyMsg Msg
	)
	if err := cdc.UnpackAny(a.Msg, &msg); err != nil {
		return emptyMsg, err
	}

	castedMsg, ok := msg.(Msg)
	if !ok {
		return emptyMsg, fmt.Errorf("incorrect message type: %T", castedMsg)
	}

	return castedMsg, nil
}
