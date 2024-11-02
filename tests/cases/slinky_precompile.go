package cases

import (
	"context"
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

func (c *Test_SlinkyPrecompile) Setup(t *testing.T, ctx context.Context, build framework.BuildResult) {
	c.w = exec.NewWardenNode(t, build.Wardend)

	go c.w.Start(t, ctx, "./testdata/snapshot-many-users")
	c.w.WaitRunning(t)
}

func (c *Test_SlinkyPrecompile) Run(t *testing.T, ctx context.Context, _ framework.BuildResult) {
	alice := exec.NewWardend(c.w, "alice")

	evmClient := c.w.EthClient(t)
	iSlinkyClient, err := slinky.NewISlinky(common.HexToAddress(slinky.PrecompileAddress), evmClient)
	require.NoError(t, err)

	// As I don't now how to run a test with slinky sidecar yet, I'm just testing the precompile can call the module
	_, err = iSlinkyClient.CoinPrice(alice.CallOps(t), "ETH", "USDT")
	require.Error(t, err, "no price / nonce reported for CurrencyPair: ETH/USDT, the module is not tracking this CurrencyPair")

	_, err = iSlinkyClient.CoinPrice(alice.CallOps(t), "USDT", "ETH")
	require.Error(t, err, "no price / nonce reported for CurrencyPair: USDT/ETH, the module is not tracking this CurrencyPair")
}
