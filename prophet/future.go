package prophet

// Future is a unit of computation.
type Future struct {
	// ID is a globally unique identifier for this Future.
	ID uint64
	// Handler identifies what handler will execute the computation.
	Handler string
	// Input is the input data for the handler.
	Input []byte
}

// getID implements [getIDer].
func (r Future) getID() uint64 { return r.ID }

// FutureReader is a source of futures.
type FutureReader interface {
	Read() <-chan Future
}

// FutureResult is the result of the computation of a future.
type FutureResult struct {
	Future
	Output []byte
}

// getID implements [getIDer].
func (r FutureResult) getID() uint64 { return r.ID }

// FutureResultReader is a source of future results.
type FutureResultReader interface {
	Read() <-chan FutureResult
}

// Vote is a vote on a future result, indicating if it could be verified or
// not.
type Vote struct {
	// ID is the ID of the future.
	ID uint64
	// Err is the error that occurred during the verification. If it is nil,
	// the future result was verified.
	Err error
}

// getID implements [getIDer].
func (v Vote) getID() uint64 { return v.ID }
