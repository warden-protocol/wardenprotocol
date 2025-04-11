package cases

import (
	"fmt"
	"math/big"
	"testing"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/stretchr/testify/require"
	"github.com/warden-protocol/wardenprotocol/tests/framework"
	"github.com/warden-protocol/wardenprotocol/tests/framework/checks"
	"github.com/warden-protocol/wardenprotocol/tests/framework/exec"
	json_user "github.com/warden-protocol/wardenprotocol/tests/testdata/contracts/json-user"
)

func init() {
	Register(&Test_JsonPrecompileUser{})
}

type Test_JsonPrecompileUser struct {
	w *exec.WardenNode
}

func (c *Test_JsonPrecompileUser) Setup(t *testing.T, build framework.BuildResult) {
	c.w = exec.NewWardenNode(t, build.Wardend)

	go c.w.Start(t, "./testdata/snapshot-many-users")
	c.w.WaitRunning(t)
}

func (c *Test_JsonPrecompileUser) Run(t *testing.T, build framework.BuildResult) {
	alice := exec.NewWardend(c.w, "alice")

	evmClient := c.w.EthClient(t)

	balanceBefore, _ := evmClient.BalanceAt(t.Context(), alice.EthAddress(t), nil)
	_, deployTx, instance, err := json_user.DeployJsonUser(alice.TransactOps(t, evmClient), evmClient)
	require.NoError(t, err)

	deployReceipt, err := bind.WaitMined(t.Context(), evmClient, deployTx)
	fmt.Printf("deploy gas used %v\n", deployReceipt.GasUsed) // 5000000000

	createdJsonTx, err := instance.DoSomeJsonActions(
		alice.TransactOps(t, evmClient),
	)
	require.NoError(t, err)

	receipt, err := bind.WaitMined(t.Context(), evmClient, createdJsonTx)
	require.NoError(t, err)
	require.Equal(t, receipt.Status, uint64(1))
	balanceAfter, _ := evmClient.BalanceAt(t.Context(), alice.EthAddress(t), nil)
	fmt.Printf("gas used %v\ngas fee %v\n", receipt.GasUsed, new(big.Int).Sub(balanceBefore, balanceAfter)) // 5000000000, 5.770225530000000000
	//             3.032946190000000000

	okEvents, err := checks.GetParsedEventsOnly(receipt, instance.ParseOk)
	require.NoError(t, err)
	require.Len(t, okEvents, 1)
	require.Equal(t, new(big.Int).SetUint64(70), okEvents[0].Arg0)
}
