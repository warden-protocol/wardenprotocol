package async

import (
	"fmt"

	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/ethereum/go-ethereum/common"

	precommon "github.com/warden-protocol/wardenprotocol/precompiles/common"
	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

// FuturesInput needed to unmarshal Pagination field and pass it to types.QueryFuturesRequest.
type FuturesInput struct {
	Pagination query.PageRequest `abi:"pagination"`
	Creator    common.Address    `abi:"creator"`
}

// FromResponse needed to map QueryFuturesResponse to FuturesResponse.
func (r *FuturesResponse) FromResponse(res *types.QueryFuturesResponse) (FuturesResponse, error) {
	if res != nil {
		futures := make([]FutureResponse, 0, len(res.Futures))

		for _, future := range res.Futures {
			mappedFuture, err := mapFutureResponse(future)
			if err != nil {
				return FuturesResponse{}, err
			}

			futures = append(futures, mappedFuture)
		}

		r.Futures = futures
		r.Pagination = mapPageResponse(res.Pagination)
	}

	return *r, nil
}

// FromResponse needed to map QueryPendingFuturesResponse to PendingFuturesResponse.
func (r *PendingFuturesResponse) FromResponse(res *types.QueryPendingFuturesResponse) (PendingFuturesResponse, error) {
	if res != nil {
		futures := make([]Future, 0, len(res.Futures))

		for _, future := range res.Futures {
			mappedFuture, err := mapFuture(future)
			if err != nil {
				return PendingFuturesResponse{}, err
			}

			futures = append(futures, mappedFuture)
		}

		r.Futures = futures
		r.Pagination = mapPageResponse(res.Pagination)
	}

	return *r, nil
}

// FromResponse needed to map QueryFutureByIdResponse to FutureByIdResponse.
func (r *FutureByIdResponse) FromResponse(res *types.QueryFutureByIdResponse) (FutureByIdResponse, error) {
	if res != nil {
		mappedFutureResponse, err := mapFutureResponse(res.FutureResponse)
		if err != nil {
			return FutureByIdResponse{}, err
		}

		r.FutureResponse = mappedFutureResponse
	}

	return *r, nil
}

func mapFuture(future types.Future) (Future, error) {
	creator, err := precommon.AddressFromBech32Str(future.Creator)
	if err != nil {
		return Future{}, fmt.Errorf("invalid creator: %w", err)
	}

	return Future{
		Id:      future.Id,
		Creator: creator,
		Handler: future.Handler,
		Input:   future.Input,
	}, nil
}

func mapFutureResponse(futureResponse types.FutureResponse) (FutureResponse, error) {
	future, err := mapFuture(futureResponse.Future)
	if err != nil {
		return FutureResponse{}, err
	}

	votes, err := mapVotes(futureResponse.Votes)
	if err != nil {
		return FutureResponse{}, err
	}

	futureResult, err := mapFutureResult(futureResponse.Result)
	if err != nil {
		return FutureResponse{}, err
	}

	return FutureResponse{
		Future: future,
		Votes:  votes,
		Result: futureResult,
	}, nil
}

func mapVotes(values []types.FutureVote) ([]FutureVote, error) {
	result := make([]FutureVote, 0, len(values))

	for _, v := range values {
		mappedTemplate, err := mapVote(v)
		if err != nil {
			return nil, err
		}

		result = append(result, mappedTemplate)
	}

	return result, nil
}

func mapVote(value types.FutureVote) (FutureVote, error) {
	return FutureVote{
		Voter:    value.Voter,
		FutureId: value.FutureId,
		Vote:     uint8(value.Vote),
	}, nil
}

func mapFutureResult(value *types.FutureResult) (FutureResult, error) {
	if value == nil {
		return FutureResult{}, nil
	}

	return FutureResult{
		Id:        value.Id,
		Output:    value.Output,
		Submitter: value.Submitter,
	}, nil
}

func mapPageResponse(value *query.PageResponse) TypesPageResponse {
	if value == nil {
		return TypesPageResponse{}
	}

	return TypesPageResponse{
		NextKey: value.NextKey,
		Total:   value.Total,
	}
}
