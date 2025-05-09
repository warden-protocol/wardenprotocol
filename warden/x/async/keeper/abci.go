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
	cometabci "github.com/cometbft/cometbft/abci/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/skip-mev/slinky/abci/ve"

	"github.com/warden-protocol/wardenprotocol/prophet"
	"github.com/warden-protocol/wardenprotocol/warden/app/vemanager"
	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

func (k Keeper) BeginBlocker(ctx context.Context) error {
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
			results[i] = &types.VEResultItem{
				TaskId: r.ID,
				Output: r.Output,
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

			if err := k.processVE(ctx, v.Validator.Address, asyncve); err != nil {
				return resp, fmt.Errorf("failed to process vote extension: %w", err)
			}
		}

		return resp, nil
	}
}

func (k Keeper) processVE(ctx sdk.Context, fromAddr []byte, ve types.AsyncVoteExtension) error {
	for _, r := range ve.Results {
		if err := k.AddTaskResult(ctx, r.TaskId, fromAddr, r.Output); err != nil {
			if err == types.ErrTaskAlreadyHasResult {
				continue
			}

			return fmt.Errorf("failed to add task result: %w", err)
		}
	}

	for _, vote := range ve.Votes {
		if err := k.SetTaskVote(ctx, vote.TaskId, fromAddr, vote.Vote); err != nil {
			return fmt.Errorf("failed to set task vote: %w", err)
		}
	}

	if ve.UpdatePlugins {
		if err := k.ClearPlugins(ctx, fromAddr); err != nil {
			return fmt.Errorf("clear plugins: %w", err)
		}

		for _, h := range ve.Plugins {
			if err := k.RegisterPluginValidator(ctx, fromAddr, h); err != nil {
				return fmt.Errorf("register validator: %w", err)
			}
		}
	}

	return nil
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
