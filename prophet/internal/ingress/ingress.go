package ingress

import "github.com/warden-protocol/wardenprotocol/prophet/types"

type FutureSource interface {
	Fetch() <-chan types.Future
}

func Futures(s FutureSource) (<-chan types.Future, error) {
	reqs, err := dedup(s.Fetch())
	if err != nil {
		return nil, err
	}

	return reqs, nil
}

type FutureResultSource interface {
	Fetch() <-chan types.FutureResult
}

func FutureResults(s FutureResultSource) (<-chan types.FutureResult, error) {
	reqs, err := dedup(s.Fetch())
	if err != nil {
		return nil, err
	}

	return reqs, nil
}
