package cases

import (
	"context"
	"testing"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/stretchr/testify/require"

	"github.com/warden-protocol/wardenprotocol/precompiles/act"
	"github.com/warden-protocol/wardenprotocol/precompiles/warden"
	"github.com/warden-protocol/wardenprotocol/tests/framework"
	"github.com/warden-protocol/wardenprotocol/tests/framework/checks"
	"github.com/warden-protocol/wardenprotocol/tests/framework/exec"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func init() {
	Register(&Test_WardenPrecompileAction{})
}

type Test_WardenPrecompileAction struct {
	w *exec.WardenNode
}

func (c *Test_WardenPrecompileAction) Setup(t *testing.T, ctx context.Context, build framework.BuildResult) {
	c.w = exec.NewWardenNode(t, build.Wardend)

	go c.w.Start(t, ctx, "./testdata/snapshot-many-users")
	c.w.WaitRunning(t)
	c.w.PrintLogsAtTheEnd(t, ctx, []string{"TEST_DEBUG"})
}

func (c *Test_WardenPrecompileAction) Run(t *testing.T, ctx context.Context, build framework.BuildResult) {
	alice := exec.NewWardend(c.w, "alice")
	bob := exec.NewWardend(c.w, "bob")

	evmClient := c.w.EthClient(t)

	iActClient, err := act.NewIAct(common.HexToAddress(act.PrecompileAddress), evmClient)
	require.NoError(t, err)

	iWardenClient, err := warden.NewIWarden(common.HexToAddress(warden.PrecompileAddress), evmClient)
	require.NoError(t, err)

	t.Run("work with new action", func(t *testing.T) {
		// addSpaceOwner
		addSpaceOwnerTx, err := iWardenClient.AddSpaceOwner(
			alice.TransactOps(t, context.Background(), evmClient),
			1,
			bob.EthAddress(t),
			0,
			0,
			"any(1, warden.space.owners)",
			"any(1, warden.space.owners)")
		require.NoError(t, err)

		addSpaceOwnerTxReceipt, err := bind.WaitMined(ctx, evmClient, addSpaceOwnerTx)
		require.NoError(t, err)

		addSpaceOwnerEvents, err := checks.GetParsedEventsOnly(addSpaceOwnerTxReceipt, iWardenClient.ParseAddSpaceOwner)
		require.NoError(t, err)

		require.Len(t, addSpaceOwnerEvents, 1)
		require.Equal(t, addSpaceOwnerEvents[0].SpaceId, uint64(1))
		require.Equal(t, addSpaceOwnerEvents[0].NewOwner, bob.EthAddress(t))

		actions1, err := iActClient.Actions(alice.CallOps(t), act.TypesPageRequest{})

		require.NoError(t, err)
		require.Len(t, actions1.Actions, 1)

		spaceById1, err := iWardenClient.SpaceById(alice.CallOps(t), 1)
		require.NoError(t, err)
		require.Equal(t, warden.Space{
			Id:                     1,
			Creator:                alice.EthAddress(t),
			Nonce:                  1,
			ApproveSignTemplateId:  0,
			RejectAdminTemplateId:  0,
			ApproveAdminTemplateId: 0,
			RejectSignTemplateId:   0,
			Owners:                 []common.Address{alice.EthAddress(t), bob.EthAddress(t)},
		}, spaceById1)

		// removeSpaceOwner
		removeSpaceOwnerTx, err := iWardenClient.RemoveSpaceOwner(
			alice.TransactOps(t, context.Background(), evmClient),
			1,
			bob.EthAddress(t),
			1,
			0,
			"any(1, warden.space.owners)",
			"any(1, warden.space.owners)")
		require.NoError(t, err)

		removeSpaceOwnerTxReceipt, err := bind.WaitMined(ctx, evmClient, removeSpaceOwnerTx)
		require.NoError(t, err)

		removeSpaceOwnerEvents, err := checks.GetParsedEventsOnly(removeSpaceOwnerTxReceipt, iWardenClient.ParseRemoveSpaceOwner)
		require.NoError(t, err)

		require.Len(t, removeSpaceOwnerEvents, 1)
		require.Equal(t, removeSpaceOwnerEvents[0].SpaceId, uint64(1))
		require.Equal(t, removeSpaceOwnerEvents[0].RemovedOwner, bob.EthAddress(t))

		actions2, err := iActClient.Actions(alice.CallOps(t), act.TypesPageRequest{})

		require.NoError(t, err)
		require.Len(t, actions2.Actions, 2)

		spaceById2, err := iWardenClient.SpaceById(alice.CallOps(t), 1)
		require.NoError(t, err)
		require.Equal(t, warden.Space{
			Id:                     1,
			Creator:                alice.EthAddress(t),
			Nonce:                  2,
			ApproveSignTemplateId:  0,
			RejectAdminTemplateId:  0,
			ApproveAdminTemplateId: 0,
			RejectSignTemplateId:   0,
			Owners:                 []common.Address{alice.EthAddress(t)},
		}, spaceById2)

		newKeychainTx, err := iWardenClient.NewKeychain(alice.TransactOps(t, context.Background(), evmClient), "test keychain", warden.KeychainFees{}, "", "", "")
		require.NoError(t, err)

		_, err = bind.WaitMined(ctx, evmClient, newKeychainTx)
		require.NoError(t, err)

		keychains1, err := iWardenClient.Keychains(alice.CallOps(t), warden.TypesPageRequest{})

		require.NoError(t, err)
		require.Len(t, keychains1.Keychains, 1)

		addKeychainWriterTx, err := iWardenClient.AddKeychainWriter(
			alice.TransactOps(t, context.Background(), evmClient),
			1,
			alice.EthAddress(t))
		require.NoError(t, err)

		_, err = bind.WaitMined(ctx, evmClient, addKeychainWriterTx)
		require.NoError(t, err)

		keychains2, err := iWardenClient.Keychains(alice.CallOps(t), warden.TypesPageRequest{})

		require.NoError(t, err)
		require.Equal(t, keychains2.Keychains[0].Writers[0], alice.EthAddress(t))

		// newKeyRequest
		newKeyRequestTx, err := iWardenClient.NewKeyRequest(
			alice.TransactOps(t, context.Background(), evmClient),
			1,
			1,
			uint8(types.KeyType_KEY_TYPE_ECDSA_SECP256K1),
			0,
			0,
			[]warden.TypesCoin{},
			2,
			0,
			"any(1, warden.space.owners)",
			"any(1, warden.space.owners)")
		require.NoError(t, err)

		newKeyRequestTxReceipt, err := bind.WaitMined(ctx, evmClient, newKeyRequestTx)
		require.NoError(t, err)

		newKeyRequestEvents, err := checks.GetParsedEventsOnly(newKeyRequestTxReceipt, iWardenClient.ParseNewKeyRequest)
		require.NoError(t, err)

		require.Len(t, newKeyRequestEvents, 1)
		require.Equal(t, newKeyRequestEvents[0].Id, uint64(1))
		require.Equal(t, newKeyRequestEvents[0].SpaceId, uint64(1))
		require.Equal(t, newKeyRequestEvents[0].KeychainId, uint64(1))
		require.Equal(t, newKeyRequestEvents[0].ApproveTemplateId, uint64(0))
		require.Equal(t, newKeyRequestEvents[0].RejectTemplateId, uint64(0))
		require.Equal(t, newKeyRequestEvents[0].KeyType, uint8(types.KeyType_KEY_TYPE_ECDSA_SECP256K1))
		require.Equal(t, newKeyRequestEvents[0].Creator, alice.EthAddress(t))

		actions3, err := iActClient.Actions(alice.CallOps(t), act.TypesPageRequest{})

		require.NoError(t, err)
		require.Len(t, actions3.Actions, 3)

		keyRequests1, err := iWardenClient.KeyRequests(alice.CallOps(t), warden.TypesPageRequest{}, 1, int32(types.KeyRequestStatus_KEY_REQUEST_STATUS_PENDING), 1)

		require.NoError(t, err)
		require.Len(t, keyRequests1.KeyRequests, 1)
		require.Equal(t, warden.KeyRequest{
			Id:                   1,
			Creator:              alice.EthAddress(t),
			SpaceId:              1,
			KeychainId:           1,
			ApproveTemplateId:    0,
			RejectTemplateId:     0,
			Status:               int32(types.KeyRequestStatus_KEY_REQUEST_STATUS_PENDING),
			KeyType:              int32(types.KeyType_KEY_TYPE_ECDSA_SECP256K1),
			DeductedKeychainFees: []warden.TypesCoin{},
			RejectReason:         "",
		}, keyRequests1.KeyRequests[0])

		fulfilKeyRequestTx, err := iWardenClient.FulfilKeyRequest(
			alice.TransactOps(t, context.Background(), evmClient),
			1,
			[]byte{3, 127, 233, 231, 7, 1, 37, 58, 229, 52, 192, 74, 160, 180, 120, 109, 158, 81, 170, 197, 189, 110, 90, 124, 50, 198, 188, 78, 49, 207, 247, 159, 237},
		)
		require.NoError(t, err)

		_, err = bind.WaitMined(ctx, evmClient, fulfilKeyRequestTx)
		require.NoError(t, err)

		keyRequests2, err := iWardenClient.KeyRequests(alice.CallOps(t), warden.TypesPageRequest{}, 1, int32(types.KeyRequestStatus_KEY_REQUEST_STATUS_FULFILLED), 1)

		require.NoError(t, err)
		require.Len(t, keyRequests2.KeyRequests, 1)

		// newSignRequest
		newSignRequestTx, err := iWardenClient.NewSignRequest(
			alice.TransactOps(t, context.Background(), evmClient),
			1,
			[]byte{30, 134, 120, 103, 230, 84, 237, 151, 116, 242, 69, 17, 228, 215, 27, 180, 86, 107, 152, 98, 133, 215, 201, 146, 4, 157, 189, 118, 13, 42, 35, 142},
			[][]byte{},
			[]byte{},
			[]warden.TypesCoin{},
			2,
			0,
			"any(1, warden.space.owners)",
			"any(1, warden.space.owners)")
		require.NoError(t, err)

		newSignRequestTxReceipt, err := bind.WaitMined(ctx, evmClient, newSignRequestTx)
		require.NoError(t, err)

		newSignRequestEvents, err := checks.GetParsedEventsOnly(newSignRequestTxReceipt, iWardenClient.ParseNewSignRequest)
		require.NoError(t, err)

		require.Len(t, newSignRequestEvents, 1)
		require.Equal(t, newSignRequestEvents[0].Id, uint64(1))
		require.Equal(t, newSignRequestEvents[0].KeyId, uint64(1))
		require.Equal(t, newSignRequestEvents[0].Creator, alice.EthAddress(t))

		actions4, err := iActClient.Actions(alice.CallOps(t), act.TypesPageRequest{})

		require.NoError(t, err)
		require.Len(t, actions4.Actions, 4)

		signRequests, err := iWardenClient.SignRequests(alice.CallOps(t), warden.TypesPageRequest{}, 1, int32(types.SignRequestStatus_SIGN_REQUEST_STATUS_PENDING))

		require.NoError(t, err)
		require.Len(t, signRequests.SignRequests, 1)
		require.Equal(t, warden.SignRequest{
			Id:                   1,
			Creator:              alice.EthAddress(t),
			KeyId:                1,
			Status:               int32(types.SignRequestStatus_SIGN_REQUEST_STATUS_PENDING),
			EncryptionKey:        []byte{},
			DataForSigning:       []byte{30, 134, 120, 103, 230, 84, 237, 151, 116, 242, 69, 17, 228, 215, 27, 180, 86, 107, 152, 98, 133, 215, 201, 146, 4, 157, 189, 118, 13, 42, 35, 142},
			DeductedKeychainFees: []warden.TypesCoin{},
			Result:               []byte{},
		}, signRequests.SignRequests[0])

		// updateKey
		newTemplateTx, err := iActClient.NewTemplate(
			alice.TransactOps(t, context.Background(), evmClient),
			"test template",
			"any(2, warden.space.owners)")
		require.NoError(t, err)

		_, err = bind.WaitMined(ctx, evmClient, newTemplateTx)
		require.NoError(t, err)

		updateKeyTx, err := iWardenClient.UpdateKey(
			alice.TransactOps(t, context.Background(), evmClient),
			1,
			1,
			1,
			0,
			"any(1, warden.space.owners)",
			"any(1, warden.space.owners)")
		require.NoError(t, err)

		updateKeyTxReceipt, err := bind.WaitMined(ctx, evmClient, updateKeyTx)
		require.NoError(t, err)

		updateKeyEvents, err := checks.GetParsedEventsOnly(updateKeyTxReceipt, iWardenClient.ParseUpdateKey)
		require.NoError(t, err)

		require.Len(t, updateKeyEvents, 1)
		require.Equal(t, updateKeyEvents[0].Id, uint64(1))
		require.Equal(t, updateKeyEvents[0].ApproveTemplateId, uint64(1))
		require.Equal(t, updateKeyEvents[0].RejectTemplateId, uint64(1))

		actions5, err := iActClient.Actions(alice.CallOps(t), act.TypesPageRequest{})

		require.NoError(t, err)
		require.Len(t, actions5.Actions, 5)

		key, err := iWardenClient.KeyById(
			alice.CallOps(t),
			1,
			[]int32{})

		require.NoError(t, err)

		require.Equal(t, warden.Key{
			Id:                1,
			SpaceId:           1,
			ApproveTemplateId: 1,
			RejectTemplateId:  1,
			KeychainId:        1,
			KeyType:           int32(types.KeyType_KEY_TYPE_ECDSA_SECP256K1),
			PublicKey:         []byte{3, 127, 233, 231, 7, 1, 37, 58, 229, 52, 192, 74, 160, 180, 120, 109, 158, 81, 170, 197, 189, 110, 90, 124, 50, 198, 188, 78, 49, 207, 247, 159, 237},
		}, key.Key)

		// updateSpace
		updateSpaceTx, err := iWardenClient.UpdateSpace(
			alice.TransactOps(t, context.Background(), evmClient),
			1,
			2,
			1,
			1,
			1,
			1,
			0,
			"any(1, warden.space.owners)",
			"any(1, warden.space.owners)")
		require.NoError(t, err)

		updateSpaceTxReceipt, err := bind.WaitMined(ctx, evmClient, updateSpaceTx)
		require.NoError(t, err)

		updateSpaceEvents, err := checks.GetParsedEventsOnly(updateSpaceTxReceipt, iWardenClient.ParseUpdateSpace)
		require.NoError(t, err)

		require.Len(t, updateSpaceEvents, 1)
		require.Equal(t, updateSpaceEvents[0].SpaceId, uint64(1))
		require.Equal(t, updateSpaceEvents[0].ApproveAdminTemplateId, uint64(1))
		require.Equal(t, updateSpaceEvents[0].RejectAdminTemplateId, uint64(1))
		require.Equal(t, updateSpaceEvents[0].ApproveSignTemplateId, uint64(1))
		require.Equal(t, updateSpaceEvents[0].RejectSignTemplateId, uint64(1))

		actions6, err := iActClient.Actions(alice.CallOps(t), act.TypesPageRequest{})

		require.NoError(t, err)
		require.Len(t, actions6.Actions, 6)

		space, err := iWardenClient.SpaceById(alice.CallOps(t), 1)

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
