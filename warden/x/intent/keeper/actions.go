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
package keeper

import (
	"fmt"

	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/warden/intent"
	"github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
)

// RegisterActionHandler registers a handler for a specific action type.
func (k Keeper) RegisterActionHandler(actionType string, handlerFn types.ActionHandler) {
	if _, ok := k.actionHandlers[actionType]; ok {
		// To be safe and prevent mistakes we shouldn't allow to register
		// multiple handlers for the same action type.
		// However, in the current implementation of Cosmos SDK, this is called
		// twice so we'll ignore the second call.

		// panic(fmt.Sprintf("action handler already registered for %s", actionType))
		return
	}
	k.actionHandlers[actionType] = handlerFn
}

func (k Keeper) RegisterIntentGeneratorHandler(reqType string, handlerFn types.IntentGenerator) {
	if _, ok := k.intentGeneratorHandlers[reqType]; ok {
		// To be safe and prevent mistakes we shouldn't allow to register
		// multiple handlers for the same action type.
		// However, in the current implementation of Cosmos SDK, this is called
		// twice so we'll ignore the second call.

		// panic(fmt.Sprintf("action handler already registered for %s", actionType))
		return
	}

	k.intentGeneratorHandlers[reqType] = handlerFn
}

// CheckActionReady checks if the intent attached to the action is satisfied.
// If the intent is satisfied, the action is marked as completed and true is
// returned, the actual execution of the action is left for the caller.
func (k Keeper) CheckActionReady(ctx sdk.Context, act types.Action, payload *intent.IntentPayload) (bool, error) {
	intn, err := k.IntentForAction(ctx, act)
	if err != nil {
		return false, err
	}

	approvers := make([]string, len(act.Approvers))
	for i, a := range act.Approvers {
		approvers[i] = a.Address
	}
	signersSet := intent.BuildApproverSet(approvers)

	if err := intn.Verify(signersSet, payload); err == nil {
		act.UpdatedAt = k.getBlockTime(ctx)
		act.Status = types.ActionStatus_ACTION_STATUS_COMPLETED
		if err := k.actions.Set(ctx, act.Id, act); err != nil {
			return false, err
		}
		return true, nil
	}

	return false, nil
}

// IntentForAction returns the intent attached to the action.
func (k Keeper) IntentForAction(ctx sdk.Context, act types.Action) (intent.Intent, error) {
	var (
		pol intent.Intent
		err error
	)

	if act.IntentId == 0 {
		// if no explicit intent ID specified, try to generate one
		polGen, found := k.intentGeneratorHandlers[act.Msg.TypeUrl]
		if !found {
			return nil, fmt.Errorf("no intent ID specied for action and no intent generator registered for %s", act.Msg.TypeUrl)
		}

		pol, err = polGen(ctx, act)
		if err != nil {
			return nil, err
		}
	} else {
		p, err := k.GetIntent(ctx, act.IntentId)
		if err != nil {
			return nil, err
		}

		pol, err = types.UnpackIntent(k.cdc, &p)
		if err != nil {
			return nil, err
		}
	}

	return pol, nil
}

// ExecuteAction executes the action and stores the result in the database.
// The action will be modified in place, setting the Result field.
// The updated action will also be persisted in the database.
func (k Keeper) ExecuteAction(ctx sdk.Context, act *types.Action, intentPayload *codectypes.Any) error {
	h, ok := k.actionHandlers[act.Msg.TypeUrl]
	if !ok {
		return fmt.Errorf("action handler not found for %s", act.Msg.TypeUrl)
	}

	result, err := h(ctx, *act, intentPayload)
	if err != nil {
		return fmt.Errorf("executing action handler: %w", err)
	}

	if err := act.SetResult(result); err != nil {
		return fmt.Errorf("updating Action.Result: %w", err)
	}

	if err := k.actions.Set(ctx, act.Id, *act); err != nil {
		return fmt.Errorf("persisting updated action: %w", err)
	}

	return nil
}

// AddAction creates a new action.
// The action is created with the provided creator as the first approver.
// This function also tries to execute the action immediately if it's ready.
func (k Keeper) AddAction(ctx sdk.Context, creator string, msg sdk.Msg, intentID, btl uint64) (*types.Action, error) {
	wrappedMsg, err := codectypes.NewAnyWithValue(msg)
	if err != nil {
		return nil, err
	}

	// create action object
	timestamp := k.getBlockTime(ctx)
	act := &types.Action{
		Status:    types.ActionStatus_ACTION_STATUS_PENDING,
		Approvers: nil,
		IntentId:  intentID,
		Msg:       wrappedMsg,
		Creator:   creator,
		Btl:       btl,
		CreatedAt: timestamp,
		UpdatedAt: timestamp,
	}

	// add initial approver
	pol, err := k.IntentForAction(ctx, *act)
	if err != nil {
		return nil, err
	}

	creatorAbbr, err := pol.AddressToParticipant(creator)
	if err != nil {
		return nil, err
	}

	if err := act.AddApprover(creatorAbbr, timestamp); err != nil {
		return nil, err
	}

	// persist action
	if _, err := k.actions.Append(ctx, act); err != nil {
		return nil, err
	}

	// try executing the action immediately
	ready, err := k.CheckActionReady(ctx, *act, nil)
	if err != nil {
		return nil, err
	}

	if ready {
		if err := k.ExecuteAction(ctx, act, &codectypes.Any{}); err != nil {
			return nil, err
		}
	}

	return act, nil
}
