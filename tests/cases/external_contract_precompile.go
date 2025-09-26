package cases

import (
	"fmt"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/bech32"
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
	t.Skip("x/warden is disabled")

	alice := exec.NewWardendEth(t, c.w, "alice")
	bob := exec.NewWardendEth(t, c.w, "bob")

	iActClient, err := act.NewIAct(common.HexToAddress(act.PrecompileAddress), alice.Client)
	require.NoError(t, err)

	iWardenClient, err := warden.NewIWarden(common.HexToAddress(warden.PrecompileAddress), alice.Client)
	require.NoError(t, err)

	address, _, instance, err := caller.DeployCaller(alice.TransactOps(t), alice.Client)
	require.NoError(t, err)

	bech32Address, err := bech32.ConvertAndEncode("warden", sdk.AccAddress(address.Bytes()))
	require.NoError(t, err)

	t.Run("work with new action", func(t *testing.T) {
		contractApprovedTemplated := fmt.Sprintf("any(1, [%s])", bech32Address)

		newTemplateTx, err := iActClient.NewTemplate(
			alice.TransactOps(t),
			"contract approved template",
			contractApprovedTemplated)
		require.NoError(t, err)

		alice.Client.WaitMinedSuccess(t, newTemplateTx)

		updateSpaceTx, err := iWardenClient.UpdateSpace(
			alice.TransactOps(t),
			1, 0,
			1, 0,
			0, 0,
			1500,
			"any(1, warden.space.owners)", "any(1, warden.space.owners)")
		require.NoError(t, err)

		alice.Client.WaitMinedSuccess(t, updateSpaceTx)

		space, err := iWardenClient.SpaceById(alice.CallOps(t), 1)
		require.NoError(t, err)
		require.Equal(t, warden.Space{
			Id:                     1,
			Creator:                alice.From,
			Nonce:                  1,
			ApproveAdminTemplateId: 1,
			RejectAdminTemplateId:  0,
			ApproveSignTemplateId:  0,
			RejectSignTemplateId:   0,
			Owners:                 []common.Address{alice.From},
		}, space)

		// addSpaceOwner
		abi, error := warden.IWardenMetaData.GetAbi()
		require.NoError(t, error)

		packedAction, err := abi.Pack("addSpaceOwner", uint64(1), bob.From, uint64(1), uint64(15000), contractApprovedTemplated, "any(1, warden.space.owners)")
		require.NoError(t, err)

		addSpaceOwnerTx, err := instance.CallOtherContract(
			alice.TransactOps(t),
			common.HexToAddress("0x0000000000000000000000000000000000000900"),
			packedAction)
		require.NoError(t, err)

		alice.Client.WaitMinedSuccess(t, addSpaceOwnerTx)

		action, err := iActClient.ActionById(alice.CallOps(t), 2)
		require.NoError(t, err)
		require.Equal(t, uint8(acttypes.ActionStatus_ACTION_STATUS_COMPLETED), action.Action.Status)

		space, err = iWardenClient.SpaceById(alice.CallOps(t), 1)
		require.NoError(t, err)
		require.Equal(t, warden.Space{
			Id:                     1,
			Creator:                alice.From,
			Nonce:                  2,
			ApproveAdminTemplateId: 1,
			ApproveSignTemplateId:  0,
			RejectAdminTemplateId:  0,
			RejectSignTemplateId:   0,
			Owners:                 []common.Address{alice.From, bob.From},
		}, space)
	})

	t.Run("work with new action", func(t *testing.T) {
		newSpaceTx, err := iWardenClient.NewSpace(
			alice.TransactOps(t), 0, 0, 0, 0, []common.Address{})
		require.NoError(t, err)

		alice.Client.WaitMinedSuccess(t, newSpaceTx)

		// Just valid address, which is not equal to address of Caller contract
		bech32Address, err := bech32.ConvertAndEncode(
			"warden",
			sdk.AccAddress(common.HexToAddress(warden.PrecompileAddress).Bytes()))
		if err != nil {
			t.Fatal(err)
		}

		contractApprovedTemplated := fmt.Sprintf("any(1, [%s])", bech32Address)

		newTemplateTx, err := iActClient.NewTemplate(
			alice.TransactOps(t),
			"contract approved template",
			contractApprovedTemplated)
		require.NoError(t, err)

		alice.Client.WaitMinedSuccess(t, newTemplateTx)

		updateSpaceTx, err := iWardenClient.UpdateSpace(
			alice.TransactOps(t),
			2, 0,
			2, 0,
			0, 0,
			1500,
			"any(1, warden.space.owners)", "any(1, warden.space.owners)")
		require.NoError(t, err)

		alice.Client.WaitMinedSuccess(t, updateSpaceTx)

		space, err := iWardenClient.SpaceById(alice.CallOps(t), 2)
		require.NoError(t, err)
		require.Equal(t, warden.Space{
			Id:                     2,
			Creator:                alice.From,
			Nonce:                  1,
			ApproveAdminTemplateId: 2,
			RejectAdminTemplateId:  0,
			ApproveSignTemplateId:  0,
			RejectSignTemplateId:   0,
			Owners:                 []common.Address{alice.From},
		}, space)

		// addSpaceOwner
		abi, error := warden.IWardenMetaData.GetAbi()
		require.NoError(t, error)

		packedAction, err := abi.Pack("addSpaceOwner", uint64(1), bob.From, uint64(1), uint64(15000), contractApprovedTemplated, "any(1, warden.space.owners)")
		require.NoError(t, err)

		addSpaceOwnerTx, err := instance.CallOtherContract(
			alice.TransactOps(t),
			common.HexToAddress("0x0000000000000000000000000000000000000900"),
			packedAction)
		require.NoError(t, err)

		alice.Client.WaitMinedFail(t, addSpaceOwnerTx)

		action, err := iActClient.ActionById(alice.CallOps(t), 2)
		require.NoError(t, err)
		require.Equal(t, uint8(acttypes.ActionStatus_ACTION_STATUS_COMPLETED), action.Action.Status)

		space, err = iWardenClient.SpaceById(alice.CallOps(t), 2)
		require.NoError(t, err)
		require.Equal(t, warden.Space{
			Id:                     2,
			Creator:                alice.From,
			Nonce:                  1,
			ApproveAdminTemplateId: 2,
			ApproveSignTemplateId:  0,
			RejectAdminTemplateId:  0,
			RejectSignTemplateId:   0,
			Owners:                 []common.Address{alice.From},
		}, space)
	})
}
