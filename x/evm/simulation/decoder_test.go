package simulation

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/require"

	"github.com/cosmos/cosmos-sdk/types/kv"
	"github.com/ethereum/go-ethereum/common"
	"github.com/evmos/ethermint/x/evm/types"
)

// TestDecodeStore tests that evm simulation decoder decodes the key value pairs as expected.
func TestDecodeStore(t *testing.T) {
	dec := NewDecodeStore()

	hash := common.BytesToHash([]byte("hash"))
	code := common.Bytes2Hex([]byte{1, 2, 3})

	kvPairs := kv.Pairs{
		Pairs: []kv.Pair{
			{Key: types.KeyPrefixCode, Value: common.FromHex(code)},
			{Key: types.KeyPrefixStorage, Value: hash.Bytes()},
		},
	}

	tests := []struct {
		name        string
		expectedLog string
	}{
		{"Code", fmt.Sprintf("%v\n%v", code, code)},
		{"Storage", fmt.Sprintf("%v\n%v", hash, hash)},
		{"other", ""},
	}
	for i, tt := range tests {
		i, tt := i, tt
		t.Run(tt.name, func(t *testing.T) {
			switch i {
			case len(tests) - 1:
				require.Panics(t, func() { dec(kvPairs.Pairs[i], kvPairs.Pairs[i]) }, tt.name)
			default:
				require.Equal(t, tt.expectedLog, dec(kvPairs.Pairs[i], kvPairs.Pairs[i]), tt.name)
			}
		})
	}
}
