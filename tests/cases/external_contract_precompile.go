package cases

import (
	"fmt"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/bech32"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/stretchr/testify/require"

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

func (c *Test_ExternalContractPrecompile) Setup(t *testing.T, f *framework.F) {
	c.w = f.StartNodeFromSnapshot(t, framework.SnapshotPrecompiles)
}

func (c *Test_ExternalContractPrecompile) Run(t *testing.T, f *framework.F) {
	alice := exec.NewWardend(c.w, "alice")
	bob := exec.NewWardend(c.w, "bob")

	evmClient := c.w.EthClient(t)
	iActClient, err := act.NewIAct(common.HexToAddress(act.PrecompileAddress), evmClient)
	require.NoError(t, err)

	iWardenClient, err := warden.NewIWarden(common.HexToAddress(warden.PrecompileAddress), evmClient)
	require.NoError(t, err)

	address, _, instance, err := caller.DeployCaller(alice.TransactOps(t, evmClient), evmClient)
	if err != nil {
		t.Fatal(err)
	}

	bech32Address, err := bech32.ConvertAndEncode("warden", sdk.AccAddress(address.Bytes()))
	if err != nil {
		t.Fatal(err)
	}

	t.Run("work with new action", func(t *testing.T) {
		contractApprovedTemplated := fmt.Sprintf("any(1, [%s])", bech32Address)

		newTemplateTx, err := iActClient.NewTemplate(
			alice.TransactOps(t, evmClient),
			"contract approved template",
			contractApprovedTemplated)
		require.NoError(t, err)

		_, err = bind.WaitMined(t.Context(), evmClient, newTemplateTx)
		require.NoError(t, err)

		updateSpaceTx, err := iWardenClient.UpdateSpace(
			alice.TransactOps(t, evmClient),
			1, 0,
			1, 0,
			0, 0,
			1500,
			"any(1, warden.space.owners)", "any(1, warden.space.owners)")
		require.NoError(t, err)

		_, err = bind.WaitMined(t.Context(), evmClient, updateSpaceTx)
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
		abi, error := warden.IWardenMetaData.GetAbi()
		require.NoError(t, error)

		packedAction, err := abi.Pack("addSpaceOwner", uint64(1), bob.EthAddress(t), uint64(1), uint64(15000), contractApprovedTemplated, "any(1, warden.space.owners)")
		require.NoError(t, err)

		addSpaceOwnerTx, err := instance.CallOtherContract(
			alice.TransactOps(t, evmClient),
			common.HexToAddress("0x0000000000000000000000000000000000000900"),
			packedAction)
		require.NoError(t, err)

		_, err = bind.WaitMined(t.Context(), evmClient, addSpaceOwnerTx)
		require.NoError(t, err)

		action, err := iActClient.ActionById(alice.CallOps(t), 2)
		require.NoError(t, err)
		require.Equal(t, uint8(acttypes.ActionStatus_ACTION_STATUS_COMPLETED), action.Action.Status)

		space, err = iWardenClient.SpaceById(alice.CallOps(t), 1)
		require.NoError(t, err)
		require.Equal(t, warden.Space{
			Id:                     1,
			Creator:                alice.EthAddress(t),
			Nonce:                  2,
			ApproveAdminTemplateId: 1,
			ApproveSignTemplateId:  0,
			RejectAdminTemplateId:  0,
			RejectSignTemplateId:   0,
			Owners:                 []common.Address{alice.EthAddress(t), bob.EthAddress(t)},
		}, space)
	})

	t.Run("work with new action", func(t *testing.T) {
		newSpaceTx, err := iWardenClient.NewSpace(
			alice.TransactOps(t, evmClient), 0, 0, 0, 0, []common.Address{})
		require.NoError(t, err)

		_, err = bind.WaitMined(t.Context(), evmClient, newSpaceTx)
		require.NoError(t, err)

		// Just valid address, which is not equal to address of Caller contract
		bech32Address, err := bech32.ConvertAndEncode(
			"warden",
			sdk.AccAddress(common.HexToAddress(warden.PrecompileAddress).Bytes()))
		if err != nil {
			t.Fatal(err)
		}

		contractApprovedTemplated := fmt.Sprintf("any(1, [%s])", bech32Address)

		newTemplateTx, err := iActClient.NewTemplate(
			alice.TransactOps(t, evmClient),
			"contract approved template",
			contractApprovedTemplated)
		require.NoError(t, err)

		_, err = bind.WaitMined(t.Context(), evmClient, newTemplateTx)
		require.NoError(t, err)

		updateSpaceTx, err := iWardenClient.UpdateSpace(
			alice.TransactOps(t, evmClient),
			2, 0,
			2, 0,
			0, 0,
			1500,
			"any(1, warden.space.owners)", "any(1, warden.space.owners)")
		require.NoError(t, err)

		_, err = bind.WaitMined(t.Context(), evmClient, updateSpaceTx)
		require.NoError(t, err)

		space, err := iWardenClient.SpaceById(alice.CallOps(t), 2)
		require.NoError(t, err)
		require.Equal(t, warden.Space{
			Id:                     2,
			Creator:                alice.EthAddress(t),
			Nonce:                  1,
			ApproveAdminTemplateId: 2,
			RejectAdminTemplateId:  0,
			ApproveSignTemplateId:  0,
			RejectSignTemplateId:   0,
			Owners:                 []common.Address{alice.EthAddress(t)},
		}, space)

		// addSpaceOwner
		abi, error := warden.IWardenMetaData.GetAbi()
		require.NoError(t, error)

		packedAction, err := abi.Pack("addSpaceOwner", uint64(1), bob.EthAddress(t), uint64(1), uint64(15000), contractApprovedTemplated, "any(1, warden.space.owners)")
		require.NoError(t, err)

		addSpaceOwnerTx, err := instance.CallOtherContract(
			alice.TransactOps(t, evmClient),
			common.HexToAddress("0x0000000000000000000000000000000000000900"),
			packedAction)
		require.NoError(t, err)

		_, err = bind.WaitMined(t.Context(), evmClient, addSpaceOwnerTx)
		require.NoError(t, err)

		action, err := iActClient.ActionById(alice.CallOps(t), 2)
		require.NoError(t, err)
		require.Equal(t, uint8(acttypes.ActionStatus_ACTION_STATUS_COMPLETED), action.Action.Status)

		space, err = iWardenClient.SpaceById(alice.CallOps(t), 2)
		require.NoError(t, err)
		require.Equal(t, warden.Space{
			Id:                     2,
			Creator:                alice.EthAddress(t),
			Nonce:                  1,
			ApproveAdminTemplateId: 2,
			ApproveSignTemplateId:  0,
			RejectAdminTemplateId:  0,
			RejectSignTemplateId:   0,
			Owners:                 []common.Address{alice.EthAddress(t)},
		}, space)
	})
}
