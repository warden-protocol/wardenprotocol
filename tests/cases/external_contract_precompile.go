package cases

import (
	"context"
	"crypto/ecdsa"
	"fmt"
	"math/big"
	"testing"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/stretchr/testify/require"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/bech32"

	"github.com/warden-protocol/wardenprotocol/precompiles/act"
	"github.com/warden-protocol/wardenprotocol/precompiles/warden"
	"github.com/warden-protocol/wardenprotocol/tests/framework"
	"github.com/warden-protocol/wardenprotocol/tests/framework/exec"
	"github.com/warden-protocol/wardenprotocol/tests/testdata/contracts/caller"
	acttypes "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

func init() {
	Register(&Test_ExternalContractPrecompile{})
}

type Test_ExternalContractPrecompile struct {
	w *exec.WardenNode
}

func (c *Test_ExternalContractPrecompile) Setup(t *testing.T, ctx context.Context, build framework.BuildResult) {
	c.w = exec.NewWardenNode(t, build.Wardend)

	go c.w.Start(t, ctx, "./testdata/snapshot-many-users")
	c.w.WaitRunning(t)

	c.w.PrintLogsAtTheEnd(t, ctx)
}

func (c *Test_ExternalContractPrecompile) Run(t *testing.T, ctx context.Context, build framework.BuildResult) {
	alice := exec.NewWardend(c.w, "alice")
	bob := exec.NewWardend(c.w, "bob")

	evmClient := c.w.EthClient(t)
	iActClient, err := act.NewIAct(common.HexToAddress(act.PrecompileAddress), evmClient)
	require.NoError(t, err)

	iWardenClient, err := warden.NewIWarden(common.HexToAddress(warden.PrecompileAddress), evmClient)
	require.NoError(t, err)

	// c.w.NewKey(t, ctx, "caller")
	// callerContract := exec.NewWardend(c.w, "caller")

	address, tx, instance, err := caller.DeployCaller(alice.TransactOps(t, ctx, evmClient), evmClient)
	if err != nil {
		t.Fatal(err)
	}

	bech32Address, err := bech32.ConvertAndEncode("warden", sdk.AccAddress(address.Bytes()))
	if err != nil {
		t.Fatal(err)
	}
	fmt.Printf("bech32 address: %s\n", bech32Address)

	// address, tx, instance := deployCallerContract(t, evmClient, callerContract.PrivateKey(t))

	_ = address
	_ = tx
	_ = instance
	// fmt.Println(address.Hex())   // 0x147B8eb97fD247D06C4006D269c90C1908Fb5D54
	// fmt.Println(tx.Hash().Hex()) // 0xdae8ba5444eefdc99f4d45cd0c4f24056cba6a02cefbf78066ef9f4188ff7dc0

	t.Run("work with new action", func(t *testing.T) {
		contractApprovedTemplated := fmt.Sprintf("any(1, [%s])", bech32Address)

		newTemplateTx, err := iActClient.NewTemplate(
			alice.TransactOps(t, context.Background(), evmClient),
			"contract approved template",
			contractApprovedTemplated)
		require.NoError(t, err)

		_, err = bind.WaitMined(ctx, evmClient, newTemplateTx)
		require.NoError(t, err)

		updateSpaceTx, err := iWardenClient.UpdateSpace(
			alice.TransactOps(t, context.Background(), evmClient),
			1, 0,
			1, 0,
			0, 0,
			1500,
			"any(1, warden.space.owners)", "any(1, warden.space.owners)")
		require.NoError(t, err)

		_, err = bind.WaitMined(ctx, evmClient, updateSpaceTx)
		require.NoError(t, err)

		space, err := iWardenClient.SpaceById(alice.CallOps(t), 1)
		require.NoError(t, err)
		require.Equal(t, warden.Space{
			Id:                     1,
			Creator:                alice.EthAddress(t),
			Nonce:                  1,
			ApproveAdminTemplateId: 1,
			RejectAdminTemplateId:  0,
			ApproveSignTemplateId:  0,
			RejectSignTemplateId:   0,
			Owners:                 []common.Address{alice.EthAddress(t)},
		}, space)

		// addSpaceOwner
		addSpaceOwnerTx, err := iWardenClient.AddSpaceOwner(
			alice.TransactOps(t, context.Background(), evmClient),
			1,
			bob.EthAddress(t),
			0,
			0,
			contractApprovedTemplated,
			"any(1, warden.space.owners)")
		require.NoError(t, err)

		_, err = bind.WaitMined(ctx, evmClient, addSpaceOwnerTx)
		require.NoError(t, err)

		action, err := iActClient.ActionById(alice.CallOps(t), 2)
		require.NoError(t, err)
		require.Len(t, action.Action.Status, int(acttypes.ActionStatus_ACTION_STATUS_COMPLETED))

		space, err = iWardenClient.SpaceById(alice.CallOps(t), 1)
		require.NoError(t, err)
		require.Equal(t, warden.Space{
			Id:                     1,
			Creator:                alice.EthAddress(t),
			Nonce:                  3,
			ApproveSignTemplateId:  1,
			RejectAdminTemplateId:  1,
			ApproveAdminTemplateId: 1,
			RejectSignTemplateId:   1,
			Owners:                 []common.Address{alice.EthAddress(t)},
		}, space)
	})
}

func deployCallerContract(
	t *testing.T,
	evmClient *ethclient.Client,
	callerPrivateKey string) (common.Address, *ethtypes.Transaction, *caller.Caller) {
	privateKey, err := crypto.HexToECDSA(callerPrivateKey)
	if err != nil {
		t.Fatal(err)
	}

	publicKey := privateKey.Public()
	publicKeyECDSA, ok := publicKey.(*ecdsa.PublicKey)
	if !ok {
		t.Fatal("error casting public key to ECDSA")
	}

	fromAddress := crypto.PubkeyToAddress(*publicKeyECDSA)
	nonce, err := evmClient.PendingNonceAt(context.Background(), fromAddress)
	if err != nil {
		t.Fatal(err)
	}

	gasPrice, err := evmClient.SuggestGasPrice(context.Background())
	if err != nil {
		t.Fatal(err)
	}

	auth, err := bind.NewKeyedTransactorWithChainID(privateKey, big.NewInt(int64(1337)))
	require.NoError(t, err)

	auth.Nonce = big.NewInt(int64(nonce))
	auth.Value = big.NewInt(0)
	auth.GasLimit = uint64(300000)
	auth.GasPrice = gasPrice

	address, tx, instance, err := caller.DeployCaller(auth, evmClient)
	if err != nil {
		t.Fatal(err)
	}
	return address, tx, instance
}
