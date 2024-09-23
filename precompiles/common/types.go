package common

type PageRequest struct {
	key        []byte `abi:"key"`
	offset     uint64 `abi:"offset"`
	limit      uint64 `abi:"limit"`
	countTotal bool   `abi:"countTotal"`
	reverse    bool   `abi:"reverse"`
}

type PageResponse struct {
	nextKey []byte `abi:"nextKey"`
	total   uint64 `abi:"total"`
}
