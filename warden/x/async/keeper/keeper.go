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
	"errors"
	"fmt"

	"cosmossdk.io/collections"
	"cosmossdk.io/core/store"
	"cosmossdk.io/log"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	stakingkeeper "github.com/cosmos/cosmos-sdk/x/staking/keeper"

	"github.com/warden-protocol/wardenprotocol/prophet"
	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

type (
	Keeper struct {
		cdc          codec.Codec
		storeService store.KVStoreService
		logger       log.Logger

		// the address capable of executing a MsgUpdateParams message. Typically, this
		// should be the x/gov module account.
		authority          string
		asyncModuleAddress sdk.AccAddress

		accountKeeper types.AccountKeeper
		bankKeeper    types.BankKeeper
		stakingKeeper *stakingkeeper.Keeper

		plugins            collections.Map[string, types.Plugin]
		pluginsByValidator collections.KeySet[collections.Pair[sdk.ConsAddress, string]]
		queuePriorities    QueuePriorityCollection
		queueTotalWeights  QueueTotalWeightCollection
		queueWeights       QueueWeightCollection
		tasks              *TaskKeeper
		votes              collections.Map[collections.Pair[uint64, sdk.ConsAddress], int32]

		p *prophet.P

		schedKeeper types.SchedKeeper
	}
)

var (
	TaskSeqPrefix          = collections.NewPrefix(0)
	TasksPrefix            = collections.NewPrefix(1)
	TaskByAddressPrefix    = collections.NewPrefix(2)
	ResultsPrefix          = collections.NewPrefix(3)
	VotesPrefix            = collections.NewPrefix(4)
	PendingTasksPrefix     = collections.NewPrefix(5)
	PluginsByValidator     = collections.NewPrefix(6)
	PluginsPrefix          = collections.NewPrefix(7)
	QueueWeightPrefix      = collections.NewPrefix(8)
	QueueTotalWeightPrefix = collections.NewPrefix(9)
	QueuePriorityPrefix    = collections.NewPrefix(10)
)

func NewKeeper(
	cdc codec.Codec,
	storeService store.KVStoreService,
	logger log.Logger,
	authority string,
	p *prophet.P,
	accountKeeper types.AccountKeeper,
	asyncModuleAddress sdk.AccAddress,
	bankKeeper types.BankKeeper,
	stakingKeeper *stakingkeeper.Keeper,
	schedKeeper types.SchedKeeper,
	// selfValAddr sdk.ConsAddress,
) Keeper {
	if _, err := sdk.AccAddressFromBech32(authority); err != nil {
		panic("invalid authority address: " + authority)
	}

	sb := collections.NewSchemaBuilder(storeService)

	tasks := NewTaskKeeper(sb, cdc)
	votes := collections.NewMap(
		sb,
		VotesPrefix,
		"votes",
		collections.PairKeyCodec(collections.Uint64Key, sdk.ConsAddressKey),
		collections.Int32Value,
	)

	plugins := collections.NewMap(sb, PluginsPrefix, "plugins", collections.StringKey, codec.CollValue[types.Plugin](cdc))
	pluginsByValidator := collections.NewKeySet(sb, PluginsByValidator, "handlers_by_validator", collections.PairKeyCodec(sdk.ConsAddressKey, collections.StringKey))
	queueWeights := collections.NewMap(sb, QueueWeightPrefix, "queue_weights", collections.PairKeyCodec(QueueIDKey, sdk.ConsAddressKey), WeightValue)
	queueTotalWeights := collections.NewMap(sb, QueueTotalWeightPrefix, "queue_total_weight", QueueIDKey, WeightValue)
	queuePriorities := collections.NewMap(sb, QueuePriorityPrefix, "queue_priorities", collections.PairKeyCodec(QueueIDKey, sdk.ConsAddressKey), PriorityValue)

	_, err := sb.Build()
	if err != nil {
		panic(fmt.Sprintf("failed to build schema: %s", err))
	}

	return Keeper{
		cdc:          cdc,
		storeService: storeService,
		logger:       logger,

		authority:          authority,
		asyncModuleAddress: asyncModuleAddress,

		accountKeeper: accountKeeper,
		bankKeeper:    bankKeeper,
		stakingKeeper: stakingKeeper,

		plugins:            plugins,
		pluginsByValidator: pluginsByValidator,
		queuePriorities:    queuePriorities,
		queueTotalWeights:  queueTotalWeights,
		queueWeights:       queueWeights,
		tasks:              tasks,
		votes:              votes,

		p: p,

		schedKeeper: schedKeeper,
	}
}

// GetAuthority returns the module's authority.
func (k Keeper) GetAuthority() string {
	return k.authority
}

// Logger returns a module-specific logger.
func (k Keeper) Logger() log.Logger {
	return k.logger.With("module", "x/"+types.ModuleName)
}

func (k Keeper) AddTaskResult(ctx context.Context, id uint64, submitter sdk.ConsAddress, output []byte, errorReason string) error {
	task, err := k.tasks.Get(ctx, id)
	if err != nil {
		return err
	}

	if !task.Solver.Equals(submitter) {
		return fmt.Errorf("task %d expected result from %s, got one from %s", id, task.Solver, submitter)
	}

	now := sdk.UnwrapSDKContext(ctx).BlockTime()
	if err := k.tasks.SetResult(ctx, task, types.TaskResult{
		Id:        id,
		Output:    output,
		Error:     errorReason,
		CreatedAt: now,
	}); err != nil {
		return err
	}

	if err := k.SetTaskVote(ctx, id, submitter, types.TaskVoteType_VOTE_TYPE_VERIFIED); err != nil {
		return err
	}

	if err := k.taskReadyCallback(ctx, task, output); err != nil {
		return err
	}

	if errorReason == "" {
		if err := k.releaseFee(ctx, task, submitter); err != nil {
			return err
		}
	} else {
		if err := k.refundPluginFees(ctx, sdk.MustAccAddressFromBech32(task.Creator), task.Fee); err != nil {
			return err
		}
	}

	return nil
}

func (k Keeper) SetTaskVote(ctx context.Context, id uint64, voter sdk.ConsAddress, vote types.TaskVoteType) error {
	if !vote.IsValid() {
		return fmt.Errorf("invalid vote type: %v", vote)
	}

	return k.votes.Set(ctx, collections.Join(id, voter), int32(vote))
}

func (k Keeper) GetTaskVotes(ctx context.Context, taskId uint64) ([]types.TaskVote, error) {
	it, err := k.votes.Iterate(ctx, collections.NewPrefixedPairRange[uint64, sdk.ConsAddress](taskId))
	if err != nil {
		return nil, err
	}
	defer it.Close()

	var votes []types.TaskVote

	for ; it.Valid(); it.Next() {
		key, err := it.Key()
		if err != nil {
			return nil, err
		}

		vote, err := it.Value()
		if err != nil {
			return nil, err
		}

		votes = append(votes, types.TaskVote{
			TaskId: taskId,
			Voter:  key.K2(),
			Vote:   types.TaskVoteType(vote),
		})
	}

	return votes, nil
}

func (k *Keeper) AddPlugin(ctx context.Context, p types.Plugin) error {
	id := p.GetId()

	if id == "" {
		return errors.New("plugin ID cannot be empty")
	}

	found, err := k.plugins.Has(ctx, id)
	if err != nil {
		return err
	}
	if found {
		return fmt.Errorf("duplicate plugin: %s", p.GetId())
	}

	if !p.Fee.IsValid() {
		return fmt.Errorf("invalid plugin fees: %s", p.Fee)
	}

	return k.plugins.Set(ctx, id, p)
}

func (k *Keeper) GetPlugin(ctx context.Context, id string) (types.Plugin, error) {
	return k.plugins.Get(ctx, id)
}

// HasPluginValidators returns whether there are some validators registered to the request plugin.
func (k *Keeper) HasPluginValidators(ctx context.Context, id string) bool {
	v, _ := k.queueTotalWeights.Get(ctx, QueueID(id))
	return v > 0
}

func (k Keeper) taskReadyCallback(
	ctx context.Context,
	task types.Task,
	output []byte,
) error {
	if task.CallbackId == 0 {
		return nil
	}

	return k.schedKeeper.ExecuteCallback(ctx, task.CallbackId, output)
}

func (k Keeper) getCompletedTasksWithoutValidatorVote(ctx context.Context, valAddress sdk.ConsAddress, limit int) ([]prophet.TaskResult, error) {
	it, err := k.tasks.results.IterateRaw(ctx, nil, nil, collections.OrderDescending)
	if err != nil {
		return nil, err
	}
	defer it.Close()

	tasks := make([]prophet.TaskResult, 0, limit)

	for ; it.Valid(); it.Next() {
		id, err := it.Key()
		if err != nil {
			return nil, err
		}

		result, err := it.Value()
		if err != nil {
			return nil, err
		}

		if result.Error != "" {
			// skip failed Task, won't verify
			continue
		}

		found, err := k.votes.Has(ctx, collections.Join(id, valAddress))
		if found {
			continue
		}

		if err != nil {
			return nil, err
		}

		fut, err := k.tasks.Get(ctx, id)
		if err != nil {
			return nil, err
		}

		tasks = append(tasks, prophet.TaskResult{
			Task: prophet.Task{
				ID:     fut.Id,
				Plugin: fut.Plugin,
				Input:  fut.Input,
			},
			Output: result.Output,
		})
		if len(tasks) == limit {
			break
		}
	}

	return tasks, nil
}

func (k Keeper) releaseFee(ctx context.Context, task types.Task, submitter sdk.ConsAddress) error {
	plugin, err := k.plugins.Get(ctx, task.Plugin)
	if err != nil {
		return err
	}

	pluginCreator, err := plugin.CreatorAccAddress()
	if err != nil {
		return err
	}

	taskExecutor, err := k.getValidatorAddress(ctx, submitter)
	if err != nil {
		return err
	}

	if err := k.releasePluginFees(ctx, pluginCreator, taskExecutor, task.Fee); err != nil {
		return err
	}

	return nil
}

func (k Keeper) getValidatorAddress(
	ctx context.Context,
	submitter sdk.ConsAddress,
) (sdk.AccAddress, error) {
	val, err := k.stakingKeeper.ValidatorByConsAddr(ctx, submitter)
	if err != nil {
		return nil, err
	}

	valAddr := val.GetOperator()
	addr, err := sdk.ValAddressFromBech32(valAddr)
	if err != nil {
		return nil, err
	}

	return sdk.AccAddress(addr), nil
}
