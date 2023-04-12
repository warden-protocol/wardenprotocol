package src

import (
	"github.com/stretchr/testify/require"
	"testing"
)

func TestReducerResponse_MarshalUnmarshal(t *testing.T) {
	const expected = `{"counters":[[0,1],[2,3]]}`
	marshal := ReducerResponse{
		Counters: [][2]int32{
			{
				0, 1,
			},
			{
				2, 3,
			},
		},
	}

	b, err := marshal.MarshalJSON()
	require.NoError(t, err)
	require.Equal(t, []byte(expected), b)

	unmarshal := new(ReducerResponse)
	require.NoError(t, unmarshal.UnmarshalJSON([]byte(expected)))
	require.Equal(t, marshal, *unmarshal)
}
