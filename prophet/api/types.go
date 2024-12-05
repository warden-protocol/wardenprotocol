package api

type GetFuturesResponse struct {
	Result []GetFutureResult `json:"result"`
}

type GetFutureResult struct {
	ID     uint64 `json:"id"`
	Output []byte `json:"output"`
}

type AckFuture struct {
	IDs []uint64 `json:"ids"`
}

type GetVotesResponse struct {
	Result []GetVoteResult `json:"result"`
}

type GetVoteResult struct {
	ID       uint64 `json:"id"`
	Approved bool   `json:"approved"`
	Err      string `json:"err"`
}

type AckVoteRequest struct {
	IDs []uint64 `json:"ids"`
}
