package vemanager

import (
	cometabci "github.com/cometbft/cometbft/abci/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

type VoteExtensionManager struct {
	extendVoteHandler          []sdk.ExtendVoteHandler
	verifyVoteExtensionHandler []sdk.VerifyVoteExtensionHandler
	prepareProposalHandler     []sdk.PrepareProposalHandler
}

func NewVoteExtensionManager() *VoteExtensionManager {
	return &VoteExtensionManager{}
}

// CONTRACT: changing the order of registration it's a consensus breaking
// change
func (m *VoteExtensionManager) Register(
	extendVoteHandler sdk.ExtendVoteHandler,
	verifyVoteExtensionHandler sdk.VerifyVoteExtensionHandler,
	prepareProposalHandler sdk.PrepareProposalHandler,
) {
	m.extendVoteHandler = append(m.extendVoteHandler, extendVoteHandler)
	m.verifyVoteExtensionHandler = append(m.verifyVoteExtensionHandler, verifyVoteExtensionHandler)
	m.prepareProposalHandler = append(m.prepareProposalHandler, prepareProposalHandler)
}

func (m *VoteExtensionManager) ExtendVoteHandler() sdk.ExtendVoteHandler {
	return func(ctx sdk.Context, req *cometabci.RequestExtendVote) (*cometabci.ResponseExtendVote, error) {
		w := VoteExtensions{
			Extensions: make([][]byte, len(m.extendVoteHandler)),
		}

		for i, handler := range m.extendVoteHandler {
			resp, err := handler(ctx, req)
			if err != nil {
				return nil, err
			}
			w.Extensions[i] = resp.VoteExtension
		}

		bz, err := w.Marshal()
		if err != nil {
			return nil, err
		}
		return &cometabci.ResponseExtendVote{
			VoteExtension: bz,
		}, nil
	}
}

func (m *VoteExtensionManager) VerifyVoteExtensionHandler() sdk.VerifyVoteExtensionHandler {
	return func(ctx sdk.Context, req *cometabci.RequestVerifyVoteExtension) (*cometabci.ResponseVerifyVoteExtension, error) {
		var w VoteExtensions
		if err := w.Unmarshal(req.VoteExtension); err != nil {
			return nil, err
		}

		var resps []*cometabci.ResponseVerifyVoteExtension
		for i, ext := range w.Extensions {
			handler := m.verifyVoteExtensionHandler[i]
			reqWithExt := &cometabci.RequestVerifyVoteExtension{
				Hash:             req.Hash,
				ValidatorAddress: req.ValidatorAddress,
				Height:           req.Height,
				VoteExtension:    ext,
			}
			resp, err := handler(ctx, reqWithExt)
			if err != nil {
				return nil, err
			}

			resps = append(resps, resp)
		}

		return combineResponseVerifyVoteExtension(resps), nil
	}
}

func (m *VoteExtensionManager) PrepareProposalHandler() sdk.PrepareProposalHandler {
	return func(ctx sdk.Context, req *cometabci.RequestPrepareProposal) (*cometabci.ResponsePrepareProposal, error) {
		var resp *cometabci.ResponsePrepareProposal
		for _, handler := range m.prepareProposalHandler {
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

func combineResponseVerifyVoteExtension(resps []*cometabci.ResponseVerifyVoteExtension) *cometabci.ResponseVerifyVoteExtension {
	combined := &cometabci.ResponseVerifyVoteExtension{
		Status: cometabci.ResponseVerifyVoteExtension_ACCEPT,
	}
	for _, resp := range resps {
		if resp.Status == cometabci.ResponseVerifyVoteExtension_REJECT {
			combined.Status = cometabci.ResponseVerifyVoteExtension_REJECT
			break
		}
	}
	return combined
}
