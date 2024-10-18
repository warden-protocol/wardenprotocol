package cases

import (
	"context"
	"encoding/base64"
	"encoding/hex"
	"math/big"
	"testing"

	"github.com/ethereum/go-ethereum/common"
	"github.com/stretchr/testify/require"
	"github.com/warden-protocol/wardenprotocol/precompiles/warden"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/warden-protocol/wardenprotocol/tests/framework"
	"github.com/warden-protocol/wardenprotocol/tests/framework/checks"
	"github.com/warden-protocol/wardenprotocol/tests/framework/exec"
)

func init() {
	Register(&Test_WardenPrecompile{})
}

type Test_WardenPrecompile struct {
	w *exec.WardenNode
}

func (c *Test_WardenPrecompile) Setup(t *testing.T, ctx context.Context, build framework.BuildResult) {
	c.w = exec.NewWardenNode(t, build.Wardend)

	go c.w.Start(t, ctx, "./testdata/snapshot-many-users")
	c.w.WaitRunnning(t)
}

func (c *Test_WardenPrecompile) Run(t *testing.T, ctx context.Context, build framework.BuildResult) {
	alice := exec.NewWardend(c.w, "alice")
	bob := exec.NewWardend(c.w, "bob")
	// dave := exec.NewWardend(c.w, "dave")

	// client := TestGRPCClient(*c.w.GRPCClient(t))
	evmClient := c.w.EthClient(t)
	iWardenClient, err := warden.NewIWarden(common.HexToAddress(warden.PrecompileAddress), evmClient)
	require.NoError(t, err)

	t.Run("work with keychains", func(t *testing.T) {
		// new keychain
		keyReq := []warden.Coin{}
		sigReq := []warden.Coin{}
		keychainFees := warden.KeychainFees{
			KeyReq: keyReq,
			SigReq: sigReq,
		}
		keychainName := "testKeychain"
		keychainDescription := "description"
		keychainUrl := "test.url"
		keychainKeybaseId := "1234567890ABCDEF"

		newKeychainTx, err := iWardenClient.NewKeychain(alice.TransactOps(t, ctx, evmClient), keychainName, keychainFees, keychainDescription, keychainUrl, keychainKeybaseId)
		require.NoError(t, err)

		newKeychainReceipt, err := bind.WaitMined(ctx, evmClient, newKeychainTx)
		require.NoError(t, err)

		createTemplateEvents, err := checks.GetParsedEventsOnly(newKeychainReceipt, iWardenClient.ParseNewKeychain)
		require.NoError(t, err)

		require.Len(t, createTemplateEvents, 1)
		require.Equal(t, uint64(1), createTemplateEvents[0].Id)
		require.Equal(t, alice.EthAddress(t), createTemplateEvents[0].Creator)

		keychain, err := iWardenClient.KeychainById(alice.CallOps(t), 1)
		require.NoError(t, err)

		keychainAdmins := []string{}
		keychainWriters := []string{}
		keychainAdmins = append(keychainAdmins, alice.Address(t))
		require.Equal(t, warden.Keychain{
			Id:          1,
			Creator:     alice.Address(t),
			Name:        keychainName,
			Admins:      keychainAdmins,
			Writers:     keychainWriters,
			Fees:        keychainFees,
			Description: keychainDescription,
			Url:         keychainUrl,
			KeybaseId:   keychainKeybaseId,
		}, keychain)
		// add keychain writer
		addKeychainWriterTx, err := iWardenClient.AddKeychainWriter(alice.TransactOps(t, ctx, evmClient), 1, alice.EthAddress(t))
		require.NoError(t, err)

		addKeychainWriterReceipt, err := bind.WaitMined(ctx, evmClient, addKeychainWriterTx)
		require.NoError(t, err)

		addKeychainWriterEvents, err := checks.GetParsedEventsOnly(addKeychainWriterReceipt, iWardenClient.ParseAddKeychainWriter)
		require.NoError(t, err)

		require.Len(t, addKeychainWriterEvents, 1)
		require.Equal(t, uint64(1), addKeychainWriterEvents[0].Id)
		require.Equal(t, alice.EthAddress(t), addKeychainWriterEvents[0].NewWriter)
		require.Equal(t, uint64(1), addKeychainWriterEvents[0].AdminsCount)

		keychain, err = iWardenClient.KeychainById(alice.CallOps(t), 1)
		require.NoError(t, err)

		keychainWriters = []string{alice.Address(t)}
		require.Equal(t, warden.Keychain{
			Id:          1,
			Creator:     alice.Address(t),
			Name:        keychainName,
			Admins:      keychainAdmins,
			Writers:     keychainWriters,
			Fees:        keychainFees,
			Description: keychainDescription,
			Url:         keychainUrl,
			KeybaseId:   keychainKeybaseId,
		}, keychain)
		// add keychain admin
		addKeychainAdminTx, err := iWardenClient.AddKeychainAdmin(alice.TransactOps(t, ctx, evmClient), 1, bob.EthAddress(t))
		require.NoError(t, err)

		addKeychainAdminReceipt, err := bind.WaitMined(ctx, evmClient, addKeychainAdminTx)
		require.NoError(t, err)

		addKeychainAdminEvents, err := checks.GetParsedEventsOnly(addKeychainAdminReceipt, iWardenClient.ParseAddKeychainAdmin)
		require.NoError(t, err)

		require.Len(t, addKeychainAdminEvents, 1)
		require.Equal(t, uint64(1), addKeychainAdminEvents[0].Id)
		require.Equal(t, bob.EthAddress(t), addKeychainAdminEvents[0].NewAdmin)
		require.Equal(t, uint64(2), addKeychainAdminEvents[0].AdminsCount)

		keychain, err = iWardenClient.KeychainById(alice.CallOps(t), 1)
		require.NoError(t, err)

		keychainAdmins = []string{alice.Address(t), bob.Address(t)}
		require.Equal(t, warden.Keychain{
			Id:          1,
			Creator:     alice.Address(t),
			Name:        keychainName,
			Admins:      keychainAdmins,
			Writers:     keychainWriters,
			Fees:        keychainFees,
			Description: keychainDescription,
			Url:         keychainUrl,
			KeybaseId:   keychainKeybaseId,
		}, keychain)
		// remove keychain admin
		removeKeychainAdminTx, err := iWardenClient.RemoveKeychainAdmin(alice.TransactOps(t, ctx, evmClient), 1, alice.EthAddress(t))
		require.NoError(t, err)

		removeKeychainAdminReceipt, err := bind.WaitMined(ctx, evmClient, removeKeychainAdminTx)
		require.NoError(t, err)

		removeKeychainAdminEvents, err := checks.GetParsedEventsOnly(removeKeychainAdminReceipt, iWardenClient.ParseRemoveKeychainAdmin)
		require.NoError(t, err)

		require.Len(t, removeKeychainAdminEvents, 1)
		require.Equal(t, uint64(1), removeKeychainAdminEvents[0].KeychainId)
		require.Equal(t, alice.EthAddress(t), removeKeychainAdminEvents[0].Admin)
		require.Equal(t, uint64(1), removeKeychainAdminEvents[0].AdminsCount)

		keychain, err = iWardenClient.KeychainById(alice.CallOps(t), 1)
		require.NoError(t, err)

		keychainAdmins = []string{bob.Address(t)}
		require.Equal(t, warden.Keychain{
			Id:          1,
			Creator:     alice.Address(t),
			Name:        keychainName,
			Admins:      keychainAdmins,
			Writers:     keychainWriters,
			Fees:        keychainFees,
			Description: keychainDescription,
			Url:         keychainUrl,
			KeybaseId:   keychainKeybaseId,
		}, keychain)
		// update keychain
		keychainName = "newRestKeychain"
		keychainDescription = "newDescription"
		keychainUrl = "new.test.url"
		keychainKeybaseId = "ABCDEF1234567890"
		keyReq = []warden.Coin{{
			Denom:  "award",
			Amount: new(big.Int).SetInt64(1),
		}}
		sigReq = []warden.Coin{{
			Denom:  "award",
			Amount: new(big.Int).SetInt64(1),
		}}
		keychainFees = warden.KeychainFees{
			KeyReq: keyReq,
			SigReq: sigReq,
		}
		updateKeychainTx, err := iWardenClient.UpdateKeychain(bob.TransactOps(t, ctx, evmClient), 1, keychainName, keychainFees, keychainDescription, keychainUrl, keychainKeybaseId)
		require.NoError(t, err)

		updateKeychainReceipt, err := bind.WaitMined(ctx, evmClient, updateKeychainTx)
		require.NoError(t, err)

		updateKeychainEvents, err := checks.GetParsedEventsOnly(updateKeychainReceipt, iWardenClient.ParseUpdateKeychain)
		require.NoError(t, err)

		require.Len(t, updateKeychainEvents, 1)
		require.Equal(t, uint64(1), updateKeychainEvents[0].Id)
		require.Equal(t, keychainFees, updateKeychainEvents[0].KeychainFees)

		keychain, err = iWardenClient.KeychainById(alice.CallOps(t), 1)
		require.NoError(t, err)

		keychainAdmins = []string{bob.Address(t)}
		require.Equal(t, warden.Keychain{
			Id:          1,
			Creator:     alice.Address(t),
			Name:        keychainName,
			Admins:      keychainAdmins,
			Writers:     keychainWriters,
			Fees:        keychainFees,
			Description: keychainDescription,
			Url:         keychainUrl,
			KeybaseId:   keychainKeybaseId,
		}, keychain)
	})

	t.Run("work with space", func(t *testing.T) {
		additionalOwners := []common.Address{}
		newSpaceTx, err := iWardenClient.NewSpace(alice.TransactOps(t, ctx, evmClient), 0, 0, 0, 0, additionalOwners)
		require.NoError(t, err)

		newSpaceReceipt, err := bind.WaitMined(ctx, evmClient, newSpaceTx)
		require.NoError(t, err)

		newSpaceEvents, err := checks.GetParsedEventsOnly(newSpaceReceipt, iWardenClient.ParseNewSpace)
		require.NoError(t, err)

		require.Len(t, newSpaceEvents, 1)
		require.Equal(t, uint64(2), newSpaceEvents[0].Id)
		require.Equal(t, uint64(0), newSpaceEvents[0].ApproveAdminTemplateId)
		require.Equal(t, uint64(0), newSpaceEvents[0].RejectAdminTemplateId)
		require.Equal(t, uint64(0), newSpaceEvents[0].ApproveSignTemplateId)
		require.Equal(t, uint64(0), newSpaceEvents[0].RejectSignTemplateId)
		require.Equal(t, alice.EthAddress(t), newSpaceEvents[0].Creator)
		require.Equal(t, uint64(1), newSpaceEvents[0].OwnersCount)

		space, err := iWardenClient.SpaceById(alice.CallOps(t), 2)
		require.NoError(t, err)

		spaceOwners := []string{alice.Address(t)}
		require.Equal(t, warden.Space{
			Id:                     2,
			Creator:                alice.Address(t),
			Owners:                 spaceOwners,
			Nonce:                  0,
			ApproveAdminTemplateId: 0,
			RejectAdminTemplateId:  0,
			ApproveSignTemplateId:  0,
			RejectSignTemplateId:   0,
		}, space)
	})

	t.Run("work with keys", func(t *testing.T) {
		// new key request //
		newKeyReqTx := alice.Tx(t, "warden new-action new-key-request --space-id 1 --keychain-id 1 --key-type 1 --max-keychain-fees \"1award\" --nonce 0")
		checks.SuccessTx(t, newKeyReqTx)
		// fulfil key request
		pubKey, err := hex.DecodeString("a5d4105f9c22b101f3bb0f53f4b96e9b931dbae0542858a98b8ff9aeedc1d09f09")
		require.NoError(t, err)

		fulfilKeyRequestTx, err := iWardenClient.FulfilKeyRequest(alice.TransactOps(t, ctx, evmClient), 1, pubKey)
		require.NoError(t, err)

		fulfilKeyRequestReceipt, err := bind.WaitMined(ctx, evmClient, fulfilKeyRequestTx)
		require.NoError(t, err)

		newKeyEvents, err := checks.GetParsedEventsOnly(fulfilKeyRequestReceipt, iWardenClient.ParseNewKey)
		require.NoError(t, err)

		require.Len(t, newKeyEvents, 1)
		// todo: uncomment after merging PR #940
		// require.Equal(t, uint64(1), newKeyEvents[0].Id)
		require.Equal(t, int32(1), newKeyEvents[0].KeyType)
		require.Equal(t, uint64(1), newKeyEvents[0].KeychainId)
		require.Equal(t, uint64(1), newKeyEvents[0].SpaceId)
		require.Equal(t, uint64(0), newKeyEvents[0].ApproveTemplateId)
		require.Equal(t, uint64(0), newKeyEvents[0].RejectTemplateId)

		keyRequest, err := iWardenClient.KeyRequestById(alice.CallOps(t), 1)
		require.NoError(t, err)
		deductedKeychainFees := []warden.Coin{{
			Denom:  "award",
			Amount: new(big.Int).SetInt64(1),
		}}
		require.Equal(t, warden.KeyRequest{
			Id:                   1,
			Creator:              alice.Address(t),
			SpaceId:              1,
			KeychainId:           1,
			KeyType:              1,
			Status:               2,
			ApproveTemplateId:    0,
			RejectTemplateId:     0,
			DeductedKeychainFees: deductedKeychainFees,
		}, keyRequest)

		deriveAddresses := []int32{}
		addresses := []warden.AddressesResponse{}
		key, err := iWardenClient.KeyById(alice.CallOps(t), 1, deriveAddresses)
		require.NoError(t, err)
		require.Equal(t, warden.KeyResponse{
			Key: warden.Key{
				Id:                1,
				SpaceId:           1,
				KeychainId:        1,
				Type:              1,
				PublicKey:         pubKey,
				ApproveTemplateId: 0,
				RejectTemplateId:  0,
			},
			Addresses: addresses,
		}, key)

		// reject key request
		newKeyReqTx = alice.Tx(t, "warden new-action new-key-request --space-id 1 --keychain-id 1 --key-type 1 --max-keychain-fees \"1award\" --nonce 0")
		checks.SuccessTx(t, newKeyReqTx)

		rejectKeyRequestTx, err := iWardenClient.RejectKeyRequest(alice.TransactOps(t, ctx, evmClient), 2, "test reject reason")
		require.NoError(t, err)

		rejectKeyRequestReceipt, err := bind.WaitMined(ctx, evmClient, rejectKeyRequestTx)
		require.NoError(t, err)

		rejectKeyRequestEvents, err := checks.GetParsedEventsOnly(rejectKeyRequestReceipt, iWardenClient.ParseRejectKeyRequest)
		require.NoError(t, err)

		require.Len(t, rejectKeyRequestEvents, 1)
		require.Equal(t, uint64(2), rejectKeyRequestEvents[0].Id)

		keyRequest, err = iWardenClient.KeyRequestById(alice.CallOps(t), 2)
		require.NoError(t, err)
		require.Equal(t, warden.KeyRequest{
			Id:                   2,
			Creator:              alice.Address(t),
			SpaceId:              1,
			KeychainId:           1,
			KeyType:              1,
			Status:               3,
			ApproveTemplateId:    0,
			RejectTemplateId:     0,
			RejectReason:         "test reject reason",
			DeductedKeychainFees: deductedKeychainFees,
		}, keyRequest)
		// fulfil sign request
		newSignReqTx := alice.Tx(t, "warden new-action new-sign-request --key-id 1 --input 'HoZ4Z+ZU7Zd08kUR5NcbtFZrmGKF18mSBJ29dg0qI44=' --max-keychain-fees \"1award\" --nonce 0")
		checks.SuccessTx(t, newSignReqTx)

		signedData, err := base64.StdEncoding.DecodeString("LKu131U23Q5Ke7jJscb57zdSmuZD27a4VeZ+/hwf7ShOLo4ozUc36pvNT14+a1s09k1PbPihrFbK29J00Jh3tgA=")
		require.NoError(t, err)

		fulfilSignRequestTx, err := iWardenClient.FulfilSignRequest(alice.TransactOps(t, ctx, evmClient), 1, signedData)
		require.NoError(t, err)

		fulfilSignRequestReceipt, err := bind.WaitMined(ctx, evmClient, fulfilSignRequestTx)
		require.NoError(t, err)

		fulfilSignRequestEvents, err := checks.GetParsedEventsOnly(fulfilSignRequestReceipt, iWardenClient.ParseFulfilSignRequest)
		require.NoError(t, err)

		require.Len(t, fulfilSignRequestEvents, 1)
		require.Equal(t, uint64(1), fulfilSignRequestEvents[0].Id)

		signRequest, err := iWardenClient.SignRequestById(alice.CallOps(t), 1)
		require.NoError(t, err)
		dataForSigning, err := base64.StdEncoding.DecodeString("HoZ4Z+ZU7Zd08kUR5NcbtFZrmGKF18mSBJ29dg0qI44=")
		require.NoError(t, err)

		encryptionKey := []byte{}
		require.Equal(t, warden.SignRequest{
			Id:                   1,
			Creator:              alice.Address(t),
			KeyId:                1,
			DataForSigning:       dataForSigning,
			Status:               2,
			Result:               signedData,
			EncryptionKey:        encryptionKey,
			DeductedKeychainFees: deductedKeychainFees,
		}, signRequest)
		// reject sign request
		newSignReqTx = alice.Tx(t, "warden new-action new-sign-request --key-id 1 --input 'HoZ4Z+ZU7Zd08kUR5NcbtFZrmGKF18mSBJ29dg0qI44=' --max-keychain-fees \"1award\" --nonce 0")
		checks.SuccessTx(t, newSignReqTx)
		signRequestRejectReason := "test reject reason"
		rejectSignRequestTx, err := iWardenClient.RejectSignRequest(alice.TransactOps(t, ctx, evmClient), 2, signRequestRejectReason)
		require.NoError(t, err)

		rejectSignRequestReceipt, err := bind.WaitMined(ctx, evmClient, rejectSignRequestTx)
		require.NoError(t, err)

		rejectSignRequestEvents, err := checks.GetParsedEventsOnly(rejectSignRequestReceipt, iWardenClient.ParseRejectSignRequest)
		require.NoError(t, err)

		require.Len(t, rejectSignRequestEvents, 1)
		require.Equal(t, uint64(2), rejectSignRequestEvents[0].Id)

		signRequest, err = iWardenClient.SignRequestById(alice.CallOps(t), 2)
		require.NoError(t, err)
		result := []byte(signRequestRejectReason)
		require.Equal(t, warden.SignRequest{
			Id:                   2,
			Creator:              alice.Address(t),
			KeyId:                1,
			DataForSigning:       dataForSigning,
			Status:               3,
			Result:               result,
			EncryptionKey:        encryptionKey,
			DeductedKeychainFees: deductedKeychainFees,
		}, signRequest)
	})
}
