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

	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/intent"
	"github.com/warden-protocol/wardenprotocol/x/intent/types"
)

// RegisterActionHandler registers a handler for a specific action type.
// The handler function is called when the action is executed.
func RegisterActionHandler[ResT any](k *Keeper, actionType string, handlerFn func(sdk.Context, *types.Action, *codectypes.Any) (ResT, error)) {
	if _, ok := k.actionHandlers[actionType]; ok {
		// To be safe and prevent mistakes we shouldn't allow to register
		// multiple handlers for the same action type.
		// However, in the current implementation of Cosmos SDK, this is called
		// twice so we'll ignore the second call.

		// panic(fmt.Sprintf("action handler already registered for %s", actionType))
		return
	}
	k.actionHandlers[actionType] = func(ctx sdk.Context, a *types.Action, payload *codectypes.Any) (any, error) {
		return handlerFn(ctx, a, payload)
	}
}

func RegisterIntentGeneratorHandler[ReqT any](k *Keeper, reqType string, handlerFn func(sdk.Context, ReqT) (intent.Intent, error)) {
	if _, ok := k.intentGeneratorHandlers[reqType]; ok {
		// To be safe and prevent mistakes we shouldn't allow to register
		// multiple handlers for the same action type.
		// However, in the current implementation of Cosmos SDK, this is called
		// twice so we'll ignore the second call.

		// panic(fmt.Sprintf("action handler already registered for %s", actionType))
		return
	}

	k.intentGeneratorHandlers[reqType] = func(ctx sdk.Context, a *codectypes.Any) (intent.Intent, error) {
		var m sdk.Msg
		if err := k.cdc.UnpackAny(a, &m); err != nil {
			return nil, err
		}
		return handlerFn(ctx, m.(ReqT))
	}
}

// TryExecuteAction checks if the intent attached to the action is satisfied
// and executes it.
//
// If the intent is satisfied, the provided handler function is executed and
// its response returned. If the intent is still not satisfied, nil is returned.
//
// This function should be called:
// - after an action is created
// - every time there is a change in the approvers set
func TryExecuteAction[ReqT sdk.Msg, ResT any](
	k *Keeper,
	cdc codec.BinaryCodec,
	ctx sdk.Context,
	act *types.Action,
	payload *codectypes.Any,
	handlerFn func(sdk.Context, ReqT) (*ResT, error),
) (*ResT, error) {
	var m sdk.Msg
	err := k.cdc.UnpackAny(act.Msg, &m)
	if err != nil {
		return nil, err
	}

	msg, ok := m.(ReqT)
	if !ok {
		return nil, fmt.Errorf("invalid message type, expected %T", new(ReqT))
	}

	pol, err := IntentForAction(ctx, k, act)
	if err != nil {
		return nil, err
	}

	signersSet := intent.BuildApproverSet(act.Approvers)

	// Execute action if intent is satified
	if err := pol.Verify(signersSet, intent.NewIntentPayload(cdc, payload)); err == nil {
		act.Status = types.ActionStatus_ACTION_STATUS_COMPLETED
		k.SetAction(ctx, act)
		return handlerFn(ctx, msg)
	}

	return nil, nil
}

func IntentForAction(ctx sdk.Context, k *Keeper, act *types.Action) (intent.Intent, error) {
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

		pol, err = polGen(ctx, act.Msg)
		if err != nil {
			return nil, err
		}
	} else {
		p, ok := k.IntentRepo().Get(ctx, act.IntentId)
		if !ok {
			return nil, fmt.Errorf("intent not found: %d", act.IntentId)
		}

		pol, err = types.UnpackIntent(k.cdc, p)
		if err != nil {
			return nil, err
		}
	}

	return pol, nil
}

// AddAction creates a new action for the provided message with initial approvers.
// Who calls this function should also immediately check if the action can be
// executed with the provided initialApprovers, by calling TryExecuteAction.
func (k Keeper) AddAction(ctx sdk.Context, creator string, msg sdk.Msg, intentID, btl uint64) (*types.Action, error) {
	wrappedMsg, err := codectypes.NewAnyWithValue(msg)
	if err != nil {
		return nil, err
	}

	// create action object
	act := types.Action{
		Status:    types.ActionStatus_ACTION_STATUS_PENDING,
		Approvers: []string{},
		IntentId:  intentID,
		Msg:       wrappedMsg,
		Creator:   creator,
		Btl:       btl,
	}

	// add initial approver
	pol, err := IntentForAction(ctx, &k, &act)
	if err != nil {
		return nil, err
	}

	creatorAbbr, err := pol.AddressToParticipant(creator)
	if err != nil {
		return nil, err
	}

	if err := act.AddApprover(creatorAbbr); err != nil {
		return nil, err
	}

	// store and return generated action
	k.AppendAction(ctx, &act)
	return &act, nil
}
