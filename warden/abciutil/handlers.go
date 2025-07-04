package abciutil

import (
	cometabci "github.com/cometbft/cometbft/abci/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

type PrepareProposalHandlers []sdk.PrepareProposalHandler

// PrepareProposalHandler returns a combined PrepareProposalHandler that calls
// all the PrepareProposalHandlers in the list, in order.
func (handlers PrepareProposalHandlers) PrepareProposalHandler() sdk.PrepareProposalHandler {
	return func(ctx sdk.Context, req *cometabci.RequestPrepareProposal) (*cometabci.ResponsePrepareProposal, error) {
		var resp *cometabci.ResponsePrepareProposal
		for _, handler := range handlers {
			if resp != nil {
				// handlers are a pipeline, so the txs returned by the previous
				// handler are the txs that will be included in the request for
				// the next
				req.Txs = resp.Txs
			}

			scopedResp, err := handler(ctx, req)
			if err != nil {
				return nil, err
			}

			resp = scopedResp
		}

		return resp, nil
	}
}

type ProcessProposalHandlers []sdk.ProcessProposalHandler

func (handlers ProcessProposalHandlers) ProcessProposalHandler() sdk.ProcessProposalHandler {
	return func(ctx sdk.Context, req *cometabci.RequestProcessProposal) (*cometabci.ResponseProcessProposal, error) {
		for _, h := range handlers {
			resp, err := h(ctx, req)
			if err != nil || resp.Status == cometabci.ResponseProcessProposal_REJECT {
				return resp, err
			}
		}

		return &cometabci.ResponseProcessProposal{
			Status: cometabci.ResponseProcessProposal_ACCEPT,
		}, nil
	}
}
