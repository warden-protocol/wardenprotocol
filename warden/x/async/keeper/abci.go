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
	"cmp"
	"context"
	"errors"
	"fmt"
	"slices"

	"cosmossdk.io/collections"
	cometabci "github.com/cometbft/cometbft/abci/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/skip-mev/slinky/abci/ve"

	"github.com/warden-protocol/wardenprotocol/prophet"
	"github.com/warden-protocol/wardenprotocol/warden/app/vemanager"
	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

func (k Keeper) BeginBlocker(ctx context.Context) error {
	params := k.GetParams(ctx)

	if params.TaskPruneTimeout > 0 {
		// prune old completed tasks
		iterator, err := k.tasks.results.Iterate(ctx, nil)
		if err != nil {
			return err
		}
		defer iterator.Close()

		now := sdk.UnwrapSDKContext(ctx).BlockTime()

		var oldTaskIDs []uint64
		for ; iterator.Valid(); iterator.Next() {
			v, err := iterator.Value()
			if err != nil {
				return err
			}

			if now.After(v.CreatedAt.Add(params.TaskPruneTimeout)) {
				oldTaskIDs = append(oldTaskIDs, v.Id)
			}
		}

		for _, id := range oldTaskIDs {
			if err := k.tasks.pruneTask(ctx, id); err != nil {
				return err
			}
		}
	}

	return nil
}

// EndBlocker schedules some pending tasks to the Prophet's process.
//
// Note: if a task remains pending for more blocks, it could be re-added to
// Prophet even if it's already in the Prophet's queue or it's being processed.
// This is not a problem as Prophet filters out incoming duplicate tasks.
func (k Keeper) EndBlocker(ctx context.Context) error {
	// schedule new tasks
	selfAddress := k.p.SelfAddress()
	if len(selfAddress) == 0 {
		return nil
	}

	tasks, err := k.tasks.PendingTasks(ctx, selfAddress, 10)
	if err != nil {
		return err
	}

	for _, f := range tasks {
		k.p.AddTask(prophet.Task{
			ID:     f.Id,
			Plugin: f.Plugin,
			Input:  f.Input,
		})
	}

	// schedule new task verifications
	taskWithResults, err := k.getCompletedTasksWithoutValidatorVote(ctx, selfAddress, 10)
	if err != nil {
		return err
	}

	for _, f := range taskWithResults {
		k.p.AddTaskResult(f)
	}

	return nil
}

func (k Keeper) ExtendVoteHandler() sdk.ExtendVoteHandler {
	return func(ctx sdk.Context, req *cometabci.RequestExtendVote) (*cometabci.ResponseExtendVote, error) {
		pResults, done := k.p.Results()
		defer done()

		results := make([]*types.VEResultItem, len(pResults))
		for i, r := range pResults {
			var errorReason string
			if r.Error != nil {
				errorReason = r.Error.Error()
			}
			results[i] = &types.VEResultItem{
				TaskId:      r.ID,
				Output:      r.Output,
				ErrorReason: errorReason,
			}
		}

		pVotes, done := k.p.Votes()
		defer done()

		votes := make([]*types.VEVoteItem, len(pVotes))

		for i, v := range pVotes {
			vote := types.TaskVoteType_VOTE_TYPE_VERIFIED
			if v.Err != nil {
				vote = types.TaskVoteType_VOTE_TYPE_REJECTED
			}

			votes[i] = &types.VEVoteItem{
				TaskId: v.ID,
				Vote:   vote,
			}
		}

		var localPlugins []string

		updatePlugins := false
		selfConsAddress := k.p.SelfAddress()

		if len(selfConsAddress) != 0 {
			localPlugins = prophet.RegisteredPlugins()

			r := collections.NewPrefixedPairRange[sdk.ConsAddress, string](sdk.ConsAddress(selfConsAddress))

			iterator, err := k.pluginsByValidator.Iterate(ctx, r)
			if err != nil {
				return nil, fmt.Errorf("failed to iterate by validator: %w", err)
			}

			onchainPlugins, err := iterator.Keys()
			if err != nil {
				return nil, fmt.Errorf("failed to get keys: %w", err)
			}

			isEqual := isEqualLocalAndOnchainPlugins(localPlugins, onchainPlugins)

			if isEqual {
				localPlugins = nil
			} else {
				slices.Sort(localPlugins)
			}

			updatePlugins = !isEqual
		}

		asyncve := types.AsyncVoteExtension{
			Results:       results,
			Votes:         votes,
			Plugins:       localPlugins,
			UpdatePlugins: updatePlugins,
		}

		asyncveBytes, err := asyncve.Marshal()
		if err != nil {
			return nil, err
		}

		return &cometabci.ResponseExtendVote{
			VoteExtension: asyncveBytes,
		}, nil
	}
}

func (k Keeper) VerifyVoteExtensionHandler() sdk.VerifyVoteExtensionHandler {
	return func(ctx sdk.Context, req *cometabci.RequestVerifyVoteExtension) (*cometabci.ResponseVerifyVoteExtension, error) {
		var ve types.AsyncVoteExtension

		err := ve.Unmarshal(req.VoteExtension)
		if err != nil {
			return &cometabci.ResponseVerifyVoteExtension{
				Status: cometabci.ResponseVerifyVoteExtension_REJECT,
			}, nil
		}

		return &cometabci.ResponseVerifyVoteExtension{
			Status: cometabci.ResponseVerifyVoteExtension_ACCEPT,
		}, nil
	}
}

func (k Keeper) PrepareProposalHandler() sdk.PrepareProposalHandler {
	return func(ctx sdk.Context, req *cometabci.RequestPrepareProposal) (*cometabci.ResponsePrepareProposal, error) {
		resp := &cometabci.ResponsePrepareProposal{
			Txs: req.Txs,
		}

		if !ve.VoteExtensionsEnabled(ctx) {
			return resp, nil
		}

		log := ctx.Logger().With("module", "prophet")
		asyncTx, err := k.buildAsyncTx(req.LocalLastCommit.Votes)
		if err != nil {
			log.Error("failed to build async tx", "err", err)
			return resp, nil
		}

		resp.Txs = trimExcessBytes(resp.Txs, req.MaxTxBytes-int64(len(asyncTx)))
		resp.Txs = injectTx(asyncTx, 1, resp.Txs)

		return resp, nil
	}
}

func (k Keeper) ProcessProposalHandler() sdk.ProcessProposalHandler {
	return func(ctx sdk.Context, req *cometabci.RequestProcessProposal) (*cometabci.ResponseProcessProposal, error) {
		resp := &cometabci.ResponseProcessProposal{
			Status: cometabci.ResponseProcessProposal_ACCEPT,
		}

		if !ve.VoteExtensionsEnabled(ctx) || len(req.Txs) < 2 {
			return resp, nil
		}

		log := ctx.Logger().With("module", "prophet")

		asyncTx := req.Txs[1]
		if len(asyncTx) == 0 {
			return resp, nil
		}

		var tx types.AsyncInjectedTx
		if err := tx.Unmarshal(asyncTx); err != nil {
			log.Error("failed to unmarshal async tx", "err", err)
			// probably not an async tx?
			// but slinky in this case rejects their proposal so maybe we
			// should do the same?
			return &cometabci.ResponseProcessProposal{
				Status: cometabci.ResponseProcessProposal_ACCEPT,
			}, nil
		}

		return &cometabci.ResponseProcessProposal{
			Status: cometabci.ResponseProcessProposal_ACCEPT,
		}, nil
	}
}

// PreBlocker executes a pre-block logic specific for the x/async module.
// It looks for the first async transaction in the block and executes it.
func (k Keeper) PreBlocker() sdk.PreBlocker {
	return func(ctx sdk.Context, req *cometabci.RequestFinalizeBlock) (*sdk.ResponsePreBlock, error) {
		resp := &sdk.ResponsePreBlock{}
		if !ve.VoteExtensionsEnabled(ctx) || len(req.Txs) < 2 {
			return resp, nil
		}

		log := ctx.Logger().With("module", "x/async")

		asyncTx := req.Txs[1]
		if len(asyncTx) == 0 {
			return resp, nil
		}

		var tx types.AsyncInjectedTx
		if err := tx.Unmarshal(asyncTx); err != nil {
			log.Error("failed to unmarshal async tx", "err", err, "tx", asyncTx)
			// probably not an async tx?
			// but slinky in this case rejects their proposal so maybe we
			// should do the same?
			return resp, nil
		}

		for _, v := range tx.ExtendedVotesInfo {
			var w vemanager.VoteExtensions
			if err := w.Unmarshal(v.VoteExtension); err != nil {
				log.Error("ignoring vote extension, not a vemanager.VoteExtensions", "err", err)
				return resp, nil
			}

			// todo: check VE signature, or maybe do it in the verify ve plugin?

			if len(w.Extensions) < 2 {
				continue
			}

			var asyncve types.AsyncVoteExtension
			if err := asyncve.Unmarshal(w.Extensions[1]); err != nil {
				return resp, fmt.Errorf("failed to unmarshal x/async vote extension: %w", err)
			}

			if err := k.processVE(ctx, sdk.ConsAddress(v.Validator.Address), asyncve); err != nil {
				return resp, fmt.Errorf("failed to process vote extension: %w", err)
			}
		}

		return resp, nil
	}
}

func (k Keeper) processVE(ctx sdk.Context, fromAddr sdk.ConsAddress, ve types.AsyncVoteExtension) error {
	for _, r := range ve.Results {
		if err := k.AddTaskResult(ctx, r.TaskId, fromAddr, r.Output, r.ErrorReason); err != nil {
			if err == types.ErrTaskAlreadyHasResult {
				continue
			}

			return fmt.Errorf("add task result: %w", err)
		}
	}

	for _, vote := range ve.Votes {
		if err := k.SetTaskVote(ctx, vote.TaskId, fromAddr, vote.Vote); err != nil {
			return fmt.Errorf("set task vote: %w", err)
		}
	}

	ranger := collections.NewPrefixedPairRange[sdk.ConsAddress, string](fromAddr)
	it, err := k.pluginsByValidator.Iterate(ctx, ranger)
	if err != nil {
		return fmt.Errorf("building iterator over registered plugins for %s", fromAddr.String())
	}
	keys, err := it.Keys()
	if err != nil {
		return fmt.Errorf("iterating over registered plugins for %s: %w", fromAddr.String(), err)
	}
	oldPlugins := make([]string, 0, len(keys))
	for _, k := range keys {
		oldPlugins = append(oldPlugins, k.K2())
	}
	if err := it.Close(); err != nil {
		return fmt.Errorf("close iterator: %w", err)
	}

	weight, err := k.getValidatorStakingWeight(ctx, fromAddr)
	if err != nil {
		return fmt.Errorf("get staking weight of %s: %w", fromAddr.String(), err)
	}

	if ve.UpdatePlugins {
		// oldPlugins is already sorted ascending, given how iterators work
		if !slices.IsSorted(oldPlugins) {
			return errors.New("iterator returned registered plugins unsorted")
		}
		// ve.Plugins is already sorted ascending, by the validator that included it
		if !slices.IsSorted(ve.Plugins) {
			return errors.New("vote extensions contained plugins unsorted, if this happens it means that the vote extension payload was crafted by a bad actor")
		}

		added, removed, equals := diffSortedSlice(oldPlugins, ve.Plugins)

		for _, r := range removed {
			if err := k.removeQueueParticipant(ctx, QueueID(r), fromAddr); err != nil {
				return fmt.Errorf("remove %s from %s queue: %w", fromAddr.String(), r, err)
			}
			if err := k.pluginsByValidator.Remove(ctx, collections.Join(fromAddr, r)); err != nil {
				return fmt.Errorf("remove %s from %s validators: %w", fromAddr.String(), r, err)
			}
		}

		for _, r := range added {
			if err := k.newQueueParticipant(ctx, QueueID(r), fromAddr, weight); err != nil {
				return fmt.Errorf("add %s to %s queue: %w", fromAddr.String(), r, err)
			}
			if err := k.pluginsByValidator.Set(ctx, collections.Join(fromAddr, r)); err != nil {
				return fmt.Errorf("add %s to %s validators: %w", fromAddr.String(), r, err)
			}
		}

		for _, p := range equals {
			if err := k.updateQueueWeight(ctx, QueueID(p), fromAddr, weight); err != nil {
				return fmt.Errorf("update %s weight for %s queue: %w", fromAddr.String(), p, err)
			}
		}
	} else {
		for _, p := range oldPlugins {
			if err := k.updateQueueWeight(ctx, QueueID(p), fromAddr, weight); err != nil {
				return fmt.Errorf("no plugins registered/removed, updating %s weight for %s queue: %w", fromAddr.String(), p, err)
			}
		}
	}

	return nil
}

// diffSortedSlice takes two sorted slices and returns the elements that are
// only in a, only in b, or the ones that are present in both.
func diffSortedSlice[T cmp.Ordered](a, b []T) (onlyB, onlyA, both []T) {
	var i, j int

	for i < len(a) && j < len(b) {
		if a[i] == b[j] {
			both = append(both, a[i])
			i++
			j++
			continue
		}

		if a[i] < b[j] {
			onlyA = append(onlyA, a[i])
			i++
			continue
		}

		if a[i] > b[j] {
			onlyB = append(onlyB, b[j])
			j++
			continue
		}
	}

	for ; i < len(a); i++ {
		onlyA = append(onlyA, a[i])
	}
	for ; j < len(b); j++ {
		onlyB = append(onlyB, b[j])
	}

	return onlyB, onlyA, both
}

// getValidatorStakingWeight returns the staking weight of a validator.
func (k *Keeper) getValidatorStakingWeight(ctx context.Context, addr sdk.ConsAddress) (Weight, error) {
	v, err := k.stakingKeeper.ValidatorByConsAddr(ctx, addr)
	if err != nil {
		return 0, err
	}

	reduction := k.stakingKeeper.PowerReduction(ctx)
	w := v.GetConsensusPower(reduction)

	return Weight(w), nil
}

func (k Keeper) buildAsyncTx(votes []cometabci.ExtendedVoteInfo) ([]byte, error) {
	tx := types.AsyncInjectedTx{
		ExtendedVotesInfo: votes,
	}

	txBytes, err := tx.Marshal()
	if err != nil {
		return nil, err
	}

	return txBytes, nil
}

func injectTx(newTx []byte, position int, appTxs [][]byte) [][]byte {
	if position < 0 {
		panic("position must be >= 0")
	}

	if position == 0 {
		return append([][]byte{newTx}, appTxs...)
	}

	if position >= len(appTxs) {
		return append(appTxs, newTx)
	}

	return append(appTxs[:position], append([][]byte{newTx}, appTxs[position:]...)...)
}

func trimExcessBytes(txs [][]byte, maxSizeBytes int64) [][]byte {
	var (
		returnedTxs   [][]byte
		consumedBytes int64
	)

	for _, tx := range txs {
		consumedBytes += int64(len(tx))
		if consumedBytes > maxSizeBytes {
			break
		}

		returnedTxs = append(returnedTxs, tx)
	}

	return returnedTxs
}

func isEqualLocalAndOnchainPlugins(localPlugins []string, onchainKeys []collections.Pair[sdk.ConsAddress, string]) bool {
	if len(localPlugins) != len(onchainKeys) {
		return false
	}

	set := make(map[string]struct{}, len(localPlugins))
	for _, str := range localPlugins {
		set[str] = struct{}{}
	}

	for _, k := range onchainKeys {
		h := k.K2()
		if _, exists := set[h]; !exists {
			return false
		}
	}

	return true
}
