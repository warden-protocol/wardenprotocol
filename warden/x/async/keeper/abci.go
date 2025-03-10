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

// EndBlocker schedules some pending futures to the Prophet's process.
//
// Note: if a future remains pending for more blocks, it could be re-added to
// Prophet even if it's already in the Prophet's queue or it's being processed.
// This is not a problem as Prophet filters out incoming duplicate futures.
func (k Keeper) EndBlocker(ctx context.Context) error {
	futures, err := k.futures.PendingFutures(ctx, 10)
	if err != nil {
		return err
	}

	for _, f := range futures {
		k.p.AddFuture(prophet.Future{
			ID:      f.Id,
			Handler: f.Handler,
			Input:   f.Input,
		})
	}

	selfAddress := k.p.SelfAddress()

	if len(selfAddress) == 0 {
		return nil
	}

	futureWithResults, err := k.getCompletedFuturesWithoutValidatorVote(ctx, selfAddress, 10)
	if err != nil {
		return err
	}

	for _, f := range futureWithResults {
		k.p.AddFutureResult(f)
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
				FutureId: r.ID,
				Output:   r.Output,
			}
		}

		pVotes, done := k.p.Votes()
		defer done()

		votes := make([]*types.VEVoteItem, len(pVotes))

		for i, v := range pVotes {
			vote := types.FutureVoteType_VOTE_TYPE_VERIFIED
			if v.Err != nil {
				vote = types.FutureVoteType_VOTE_TYPE_REJECTED
			}

			votes[i] = &types.VEVoteItem{
				FutureId: v.ID,
				Vote:     vote,
			}
		}

		var localHandlers []string

		updateHandlers := false
		selfConsAddress := k.p.SelfAddress()

		if len(selfConsAddress) != 0 {
			localHandlers = prophet.RegisteredHandlers()

			r := collections.NewPrefixedPairRange[sdk.ConsAddress, string](sdk.ConsAddress(selfConsAddress))

			iterator, err := k.handlersByValidator.Iterate(ctx, r)
			if err != nil {
				return nil, fmt.Errorf("failed to iterate by validator: %w", err)
			}

			onchainHandlers, err := iterator.Keys()
			if err != nil {
				return nil, fmt.Errorf("failed to get keys: %w", err)
			}

			isEqual := isEqualLocalAndOnchainHandlers(localHandlers, onchainHandlers)

			if isEqual {
				localHandlers = nil
			}

			updateHandlers = !isEqual
		}

		asyncve := types.AsyncVoteExtension{
			Results:        results,
			Votes:          votes,
			Handlers:       localHandlers,
			UpdateHandlers: updateHandlers,
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

			// todo: check VE signature, or maybe do it in the verify ve handler?

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
		if err := k.AddFutureResult(ctx, r.FutureId, fromAddr, r.Output); err != nil {
			if err == types.ErrFutureAlreadyHasResult {
				continue
			}

			return fmt.Errorf("failed to add future result: %w", err)
		}
	}

	for _, vote := range ve.Votes {
		if err := k.SetFutureVote(ctx, vote.FutureId, fromAddr, vote.Vote); err != nil {
			return fmt.Errorf("failed to set task vote: %w", err)
		}
	}

	if ve.UpdateHandlers {
		if err := k.ClearHandlers(ctx, fromAddr); err != nil {
			return fmt.Errorf("clear handlers: %w", err)
		}

		for _, h := range ve.Handlers {
			if err := k.RegisterHandler(ctx, fromAddr, h); err != nil {
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

func isEqualLocalAndOnchainHandlers(localHandlers []string, onchainKeys []collections.Pair[sdk.ConsAddress, string]) bool {
	if len(localHandlers) != len(onchainKeys) {
		return false
	}

	set := make(map[string]struct{}, len(localHandlers))
	for _, str := range localHandlers {
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
