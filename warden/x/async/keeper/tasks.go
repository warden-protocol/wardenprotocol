// Copyright (c) 2025 Warden Labs. All Rights Reserved.
//
// ** RESTRICTED LICENSE **
//
// This file is part of the 'async' module. It is NOT licensed
// under the Apache 2.0 license governing the rest of the project.
// Refer to the LICENSE file in this module's directory for full terms.
// Use, modification, and distribution are strictly limited.
// Do NOT use this file unless you agree to the terms stated in that license.
//
// SPDX-FileCopyrightText: 2025 Warden Labs
// SPDX-License-Identifier: LicenseRef-Proprietary-RestrictedModule

package keeper

import (
	"context"
	"fmt"

	"cosmossdk.io/collections"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/wardenprotocol/warden/repo"
	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

type TaskKeeper struct {
	tasks         repo.SeqCollection[types.Task]
	taskByCreator collections.KeySet[collections.Pair[sdk.AccAddress, uint64]]
	results       collections.Map[uint64, types.TaskResult]
	pendingTasks  collections.KeySet[collections.Pair[sdk.ConsAddress, uint64]]
}

func NewTaskKeeper(sb *collections.SchemaBuilder, cdc codec.Codec) *TaskKeeper {
	tasksSeq := collections.NewSequence(sb, TaskSeqPrefix, "tasks_sequence")
	tasksColl := collections.NewMap(sb, TasksPrefix, "tasks", collections.Uint64Key, codec.CollValue[types.Task](cdc))

	tasks := repo.NewSeqCollection(tasksSeq, tasksColl, func(t *types.Task, u uint64) { t.Id = u })
	taskByCreator := collections.NewKeySet(sb, TaskByAddressPrefix, "tasks_by_address", collections.PairKeyCodec(sdk.AccAddressKey, collections.Uint64Key))

	results := collections.NewMap(sb, ResultsPrefix, "task_results", collections.Uint64Key, codec.CollValue[types.TaskResult](cdc))

	pendingTasks := collections.NewKeySet(sb, PendingTasksPrefix, "pending_tasks", collections.PairKeyCodec(sdk.ConsAddressKey, collections.Uint64Key))

	return &TaskKeeper{
		tasks:         tasks,
		taskByCreator: taskByCreator,
		results:       results,
		pendingTasks:  pendingTasks,
	}
}

func (k *TaskKeeper) Append(ctx context.Context, t *types.Task) (uint64, error) {
	id, err := k.tasks.Append(ctx, t)
	if err != nil {
		return 0, err
	}

	creator, err := sdk.AccAddressFromBech32(t.Creator)
	if err != nil {
		return 0, fmt.Errorf("invalid creator address: %w", err)
	}

	if err := k.taskByCreator.Set(ctx, collections.Join(creator, id)); err != nil {
		return 0, err
	}

	if err := k.pendingTasks.Set(ctx, collections.Join(t.Solver, id)); err != nil {
		return 0, err
	}

	return id, nil
}

func (k *TaskKeeper) Get(ctx context.Context, id uint64) (types.Task, error) {
	return k.tasks.Get(ctx, id)
}

func (k *TaskKeeper) Set(ctx context.Context, f types.Task) error {
	return k.tasks.Set(ctx, f.Id, f)
}

func (k *TaskKeeper) SetResult(ctx context.Context, task types.Task, result types.TaskResult) error {
	if exists, _ := k.results.Has(ctx, result.Id); exists {
		return types.ErrTaskAlreadyHasResult
	}

	if err := k.pendingTasks.Remove(ctx, collections.Join(task.Solver, result.Id)); err != nil {
		return err
	}

	return k.results.Set(ctx, result.Id, result)
}

func (k *TaskKeeper) GetResult(ctx context.Context, id uint64) (types.TaskResult, error) {
	return k.results.Get(ctx, id)
}

func (k *TaskKeeper) HasResult(ctx context.Context, id uint64) (bool, error) {
	return k.results.Has(ctx, id)
}

func (k *TaskKeeper) Tasks() repo.SeqCollection[types.Task] {
	return k.tasks
}

func (k *TaskKeeper) PendingTasks(ctx context.Context, solverAddr sdk.ConsAddress, limit int) ([]types.Task, error) {
	ranger := collections.NewPrefixedPairRange[sdk.ConsAddress, uint64](solverAddr)
	it, err := k.pendingTasks.Iterate(ctx, ranger)
	if err != nil {
		return nil, err
	}
	defer it.Close()

	tasks := make([]types.Task, 0, limit)

	for ; it.Valid(); it.Next() {
		key, err := it.Key()
		if err != nil {
			return nil, err
		}

		fut, err := k.tasks.Get(ctx, key.K2())
		if err != nil {
			return nil, err
		}

		tasks = append(tasks, fut)
		if len(tasks) == limit {
			break
		}
	}

	return tasks, nil
}
