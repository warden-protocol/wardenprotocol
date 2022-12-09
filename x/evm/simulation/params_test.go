package simulation_test

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"testing"

	"github.com/stretchr/testify/require"

	"github.com/evmos/ethermint/x/evm/simulation"
)

// TestParamChanges tests the paramChanges are generated as expected.
func TestParamChanges(t *testing.T) {
	s := rand.NewSource(1)
	r := rand.New(s)

	extraEIPs := simulation.GenExtraEIPs(r)
	bz, err := json.Marshal(extraEIPs)
	require.NoError(t, err)

	expected := []struct {
		composedKey string
		key         string
		simValue    string
		subspace    string
	}{
		{"evm/EnableExtraEIPs", "EnableExtraEIPs", string(bz), "evm"},
		{"evm/EnableCreate", "EnableCreate", fmt.Sprintf("%v", simulation.GenEnableCreate(r)), "evm"},
		{"evm/EnableCall", "EnableCall", fmt.Sprintf("%v", simulation.GenEnableCall(r)), "evm"},
	}

	paramChanges := simulation.ParamChanges(r)

	require.Len(t, paramChanges, 3)

	for i, p := range paramChanges {
		require.Equal(t, expected[i].composedKey, p.ComposedKey())
		require.Equal(t, expected[i].key, p.Key())
		require.Equal(t, expected[i].simValue, p.SimValue()(r))
		require.Equal(t, expected[i].subspace, p.Subspace())
	}
}
