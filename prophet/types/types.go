package types

type (
	Input  []byte
	Output []byte
)

type Future struct {
	ID      uint64
	Handler string
	Input   []byte
}

func (r Future) GetID() uint64 { return r.ID }

type FutureResult struct {
	Future
	Output []byte
}

func (r FutureResult) GetID() uint64 { return r.ID }

type Vote struct {
	ID  uint64
	Err error
}

func (v Vote) GetID() uint64 { return v.ID }
