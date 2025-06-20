package cases

import (
	"testing"

	"github.com/ethereum/go-ethereum/common"
	"github.com/stretchr/testify/require"

	"github.com/warden-protocol/wardenprotocol/precompiles/slinky"
	"github.com/warden-protocol/wardenprotocol/tests/framework"
	"github.com/warden-protocol/wardenprotocol/tests/framework/exec"
)

func init() {
	Register(&Test_SlinkyPrecompile{})
}

type Test_SlinkyPrecompile struct {
	w *exec.WardenNode
}

func (c *Test_SlinkyPrecompile) Setup(t *testing.T, f *framework.F) {
	c.w = f.StartNodeFromSnapshot(t, framework.SnapshotPrecompiles)
}

const (
	testPairETHUSDT = "ETH/USDT"
	testPairUSDTETH = "USDT/ETH"
)

// TODO(backsapc): Implement positive test cases with slinky sidecar integration.
func (c *Test_SlinkyPrecompile) Run(t *testing.T, _ *framework.F) {
	alice := exec.NewWardend(c.w, "alice")

	evmClient := c.w.EthClient(t)
	iSlinkyClient, err := slinky.NewISlinky(common.HexToAddress(slinky.PrecompileAddress), evmClient)
	require.NoError(t, err)

	_, err = iSlinkyClient.GetPrice(alice.CallOps(t), "ETH", "USDT")
	require.ErrorContains(t, err, "no price / nonce reported for CurrencyPair: "+testPairETHUSDT)

	_, err = iSlinkyClient.GetPrice(alice.CallOps(t), "USDT", "ETH")
	require.ErrorContains(t, err, "no price / nonce reported for CurrencyPair: "+testPairUSDTETH)
}
