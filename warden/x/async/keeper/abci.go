package keeper

import (
	"context"

	cometabci "github.com/cometbft/cometbft/abci/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/prophet"
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

		asyncve := types.AsyncVoteExtension{
			Results: results,
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
		return resp, nil
	}
}

func (k Keeper) ProcessProposalHandler() sdk.ProcessProposalHandler {
	return func(ctx sdk.Context, req *cometabci.RequestProcessProposal) (*cometabci.ResponseProcessProposal, error) {
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
		return resp, nil
	}
}
