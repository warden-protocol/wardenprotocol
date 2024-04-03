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
	"github.com/warden-protocol/wardenprotocol/shield"
	"github.com/warden-protocol/wardenprotocol/shield/object"
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

// ApproversEnv is an environment that resolves approvers' addresses to true.
type ApproversEnv []*types.Approver

// Get implements evaluator.Environment.
func (approvers ApproversEnv) Get(name string) (object.Object, bool) {
	for _, s := range approvers {
		if s.Address == name {
			return object.TRUE, true
		}
	}
	return object.FALSE, true
}

var _ shield.Environment = ApproversEnv{}

// CheckActionReady checks if the intent attached to the action is satisfied.
// If the intent is satisfied, the action is marked as completed and true is
// returned, the actual execution of the action is left for the caller.
func (k Keeper) CheckActionReady(ctx sdk.Context, act types.Action) (bool, error) {
	satisfied, err := act.Intent.Eval(ctx, ApproversEnv(act.Approvers))
	if err != nil {
		return false, err
	}

	if !satisfied {
		return false, nil
	}

	act.UpdatedAt = k.getBlockTime(ctx)
	act.Status = types.ActionStatus_ACTION_STATUS_COMPLETED
	if err := k.ActionKeeper.Set(ctx, act); err != nil {
		return false, err
	}
	return true, nil
}

// ExecuteAction executes the action and stores the result in the database.
// The action will be modified in place, setting the Result field.
// The updated action will also be persisted in the database.
func (k Keeper) ExecuteAction(ctx sdk.Context, act *types.Action) error {
	h, ok := k.actionHandlers[act.Msg.TypeUrl]
	if !ok {
		return fmt.Errorf("action handler not found for %s", act.Msg.TypeUrl)
	}

	result, err := h(ctx, *act)
	if err != nil {
		return fmt.Errorf("executing action handler: %w", err)
	}

	if err := act.SetResult(result); err != nil {
		return fmt.Errorf("updating Action.Result: %w", err)
	}

	if err := k.ActionKeeper.Set(ctx, *act); err != nil {
		return fmt.Errorf("persisting updated action: %w", err)
	}

	return nil
}

// AddAction creates a new action.
// The action is created with the provided creator as the first approver.
// This function also tries to execute the action immediately if it's ready.
func (k Keeper) AddAction(ctx sdk.Context, creator string, msg sdk.Msg, intent types.Intent, btl uint64) (*types.Action, error) {
	wrappedMsg, err := codectypes.NewAnyWithValue(msg)
	if err != nil {
		return nil, err
	}

	// create action object
	timestamp := k.getBlockTime(ctx)
	act := &types.Action{
		Status:    types.ActionStatus_ACTION_STATUS_PENDING,
		Approvers: nil,
		Intent:    intent,
		Msg:       wrappedMsg,
		Creator:   creator,
		Btl:       btl,
		CreatedAt: timestamp,
		UpdatedAt: timestamp,
	}

	// add initial approver
	if err := act.AddApprover(creator, timestamp); err != nil {
		return nil, err
	}

	// persist action
	if _, err := k.ActionKeeper.New(ctx, act); err != nil {
		return nil, err
	}

	// try executing the action immediately
	ready, err := k.CheckActionReady(ctx, *act)
	if err != nil {
		return nil, err
	}

	if ready {
		if err := k.ExecuteAction(ctx, act); err != nil {
			return nil, err
		}
	}

	return act, nil
}
