package cases

import (
	"context"
	"testing"

	"github.com/ethereum/go-ethereum/common"
	"github.com/stretchr/testify/require"

	"github.com/warden-protocol/wardenprotocol/warden/extensions/slinky"
	"github.com/warden-protocol/wardenprotocol/tests/framework"
	"github.com/warden-protocol/wardenprotocol/tests/framework/exec"
)

func init() {
	Register(&Test_SlinkyPrecompile{})
}

type Test_SlinkyPrecompile struct {
	w *exec.WardenNode
}

func (c *Test_SlinkyPrecompile) Setup(t *testing.T, ctx context.Context, build framework.BuildResult) {
	c.w = exec.NewWardenNode(t, build.Wardend)

	go c.w.Start(t, ctx, "./testdata/snapshot-many-users")
	c.w.WaitRunning(t)
}

const (
	testPairETHUSDT = "ETH/USDT"
	testPairUSDTETH = "USDT/ETH"
)

// TODO(backsapc): Implement positive test cases with slinky sidecar integration
func (c *Test_SlinkyPrecompile) Run(t *testing.T, ctx context.Context, _ framework.BuildResult) {
	alice := exec.NewWardend(c.w, "alice")

	evmClient := c.w.EthClient(t)
	iSlinkyClient, err := slinky.NewISlinky(common.HexToAddress(slinky.PrecompileAddress), evmClient)
	require.NoError(t, err)

	_, err = iSlinkyClient.GetPrice(alice.CallOps(t), "ETH", "USDT")
	require.ErrorContains(t, err, "no price / nonce reported for CurrencyPair: "+testPairETHUSDT)

	_, err = iSlinkyClient.GetPrice(alice.CallOps(t), "USDT", "ETH")
	require.ErrorContains(t, err, "no price / nonce reported for CurrencyPair: "+testPairUSDTETH)
}
