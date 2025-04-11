package json

import "math/big"

type SetInput[T any] struct {
	Input []byte
	Key   string
	Value T
}

type SetFloatInput struct {
	Input    []byte
	Key      string
	Value    *big.Int
	Decimals int64
}

type SetFloatArrayInput struct {
	Input    []byte
	Key      string
	Value    []*big.Int
	Decimals int64
}

type RemoveInput struct {
	Input []byte
	Key   string
}

type GetInput struct {
	Input []byte
	Key   string
}

type GetFloatInput struct {
	Input    []byte
	Key      string
	Decimals int64
}
