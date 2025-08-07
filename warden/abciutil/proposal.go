// Package proposal contains utilities for dealing with ABCI's proposals.
package abciutil

import (
	cometabci "github.com/cometbft/cometbft/abci/types"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/connect/abci/ve"
)

// InjectTxPrepareProposalHandler returns a PrepareProposalHandler that uses
// buildInjectedTx to construct a new transaction to inject in the block at
// the specified position.
//
// If the build transaction is empty, nothing will be injected.
//
// The handler will only works if vote extensions are enabled.
func InjectTxPrepareProposalHandler(buildInjectedTx func(ctx sdk.Context, req *cometabci.RequestPrepareProposal) (position int, tx []byte, err error)) sdk.PrepareProposalHandler {
	return func(ctx sdk.Context, req *cometabci.RequestPrepareProposal) (*cometabci.ResponsePrepareProposal, error) {
		resp := &cometabci.ResponsePrepareProposal{
			Txs: req.Txs,
		}

		if !ve.VoteExtensionsEnabled(ctx) {
			return resp, nil
		}

		position, tx, err := buildInjectedTx(ctx, req)
		if err != nil {
			return resp, err
		}

		if len(tx) == 0 {
			return resp, nil
		}

		resp.Txs = trimExcessBytes(resp.Txs, req.MaxTxBytes-int64(len(tx)))
		resp.Txs = injectTx(tx, position, resp.Txs)

		return resp, nil
	}
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
