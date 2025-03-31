package json

type SetInput[T any] struct {
	Input []byte
	Key   string
	Value T
}
