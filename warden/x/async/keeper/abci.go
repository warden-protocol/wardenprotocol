package keeper

import (
	"context"

	cometabci "github.com/cometbft/cometbft/abci/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) BeginBlocker(ctx context.Context) error {
	return nil
}

func (k Keeper) EndBlocker(ctx context.Context) error {
	return nil
}

func (k Keeper) ExtendVoteHandler() sdk.ExtendVoteHandler {
	return func(ctx sdk.Context, req *cometabci.RequestExtendVote) (*cometabci.ResponseExtendVote, error) {
		return &cometabci.ResponseExtendVote{
			VoteExtension: nil,
		}, nil
	}
}

func (k Keeper) VerifyVoteExtensionHandler() sdk.VerifyVoteExtensionHandler {
	return func(ctx sdk.Context, req *cometabci.RequestVerifyVoteExtension) (*cometabci.ResponseVerifyVoteExtension, error) {
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
