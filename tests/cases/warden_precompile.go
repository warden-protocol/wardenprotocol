package cases

import (
	"encoding/base64"
	"encoding/hex"
	"math/big"
	"testing"

	"github.com/ethereum/go-ethereum/common"
	"github.com/stretchr/testify/require"

	"github.com/warden-protocol/wardenprotocol/precompiles/warden"
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

func (c *Test_WardenPrecompile) Setup(t *testing.T, f *framework.F) {
	c.w = f.StartNodeFromSnapshot(t, framework.SnapshotPrecompiles)
	c.w.PrintLogsAtTheEnd(t, []string{"TEST_DEBUG"})
}

func (c *Test_WardenPrecompile) Run(t *testing.T, f *framework.F) {
	alice := exec.NewWardendEth(t, c.w, "alice")
	bob := exec.NewWardendEth(t, c.w, "bob")
	dave := exec.NewWardendEth(t, c.w, "dave")

	iWardenClient, err := warden.NewIWarden(common.HexToAddress(warden.PrecompileAddress), alice.Client)
	require.NoError(t, err)

	t.Run("work with keychains", func(t *testing.T) {
		// new keychain
		keyReq := []warden.TypesCoin{}
		sigReq := []warden.TypesCoin{}
		keychainFees := warden.KeychainFees{
			KeyReq: keyReq,
			SigReq: sigReq,
		}
		keychainName := "testKeychain"
		keychainDescription := "description"
		keychainUrl := "test.url"
		keychainKeybaseId := "1234567890ABCDEF"

		newKeychainTx, err := iWardenClient.NewKeychain(alice.TransactOps(t), keychainName, keychainFees, keychainDescription, keychainUrl, keychainKeybaseId)
		require.NoError(t, err)

		newKeychainReceipt := alice.Client.WaitMinedSuccess(t, newKeychainTx)

		createTemplateEvents, err := checks.GetParsedEventsOnly(newKeychainReceipt, iWardenClient.ParseNewKeychain)
		require.NoError(t, err)

		require.Len(t, createTemplateEvents, 1)
		require.Equal(t, uint64(1), createTemplateEvents[0].Id)
		require.Equal(t, alice.From, createTemplateEvents[0].Creator)

		keychain, err := iWardenClient.KeychainById(alice.CallOps(t), 1)
		require.NoError(t, err)

		keychainAdmins := []common.Address{}
		keychainWriters := []common.Address{}

		keychainAdmins = append(keychainAdmins, alice.From)
		require.Equal(t, warden.Keychain{
			Id:          1,
			Creator:     alice.From,
			Name:        keychainName,
			Admins:      keychainAdmins,
			Writers:     keychainWriters,
			Fees:        keychainFees,
			Description: keychainDescription,
			Url:         keychainUrl,
			KeybaseId:   keychainKeybaseId,
		}, keychain)
		// add keychain writer
		addKeychainWriterTx, err := iWardenClient.AddKeychainWriter(alice.TransactOps(t), 1, alice.From)
		require.NoError(t, err)

		addKeychainWriterReceipt := alice.Client.WaitMinedSuccess(t, addKeychainWriterTx)

		addKeychainWriterEvents, err := checks.GetParsedEventsOnly(addKeychainWriterReceipt, iWardenClient.ParseAddKeychainWriter)
		require.NoError(t, err)

		require.Len(t, addKeychainWriterEvents, 1)
		require.Equal(t, uint64(1), addKeychainWriterEvents[0].Id)
		require.Equal(t, alice.From, addKeychainWriterEvents[0].NewWriter)
		require.Equal(t, uint64(1), addKeychainWriterEvents[0].WritersCount)

		keychain, err = iWardenClient.KeychainById(alice.CallOps(t), 1)
		require.NoError(t, err)

		keychainWriters = []common.Address{alice.From}
		require.Equal(t, warden.Keychain{
			Id:          1,
			Creator:     alice.From,
			Name:        keychainName,
			Admins:      keychainAdmins,
			Writers:     keychainWriters,
			Fees:        keychainFees,
			Description: keychainDescription,
			Url:         keychainUrl,
			KeybaseId:   keychainKeybaseId,
		}, keychain)
		// add keychain admin
		addKeychainAdminTx, err := iWardenClient.AddKeychainAdmin(alice.TransactOps(t), 1, bob.From)
		require.NoError(t, err)

		addKeychainAdminReceipt := alice.Client.WaitMinedSuccess(t, addKeychainAdminTx)

		addKeychainAdminEvents, err := checks.GetParsedEventsOnly(addKeychainAdminReceipt, iWardenClient.ParseAddKeychainAdmin)
		require.NoError(t, err)

		require.Len(t, addKeychainAdminEvents, 1)
		require.Equal(t, uint64(1), addKeychainAdminEvents[0].Id)
		require.Equal(t, bob.From, addKeychainAdminEvents[0].NewAdmin)
		require.Equal(t, uint64(2), addKeychainAdminEvents[0].AdminsCount)

		keychain, err = iWardenClient.KeychainById(alice.CallOps(t), 1)
		require.NoError(t, err)

		keychainAdmins = []common.Address{alice.From, bob.From}
		require.Equal(t, warden.Keychain{
			Id:          1,
			Creator:     alice.From,
			Name:        keychainName,
			Admins:      keychainAdmins,
			Writers:     keychainWriters,
			Fees:        keychainFees,
			Description: keychainDescription,
			Url:         keychainUrl,
			KeybaseId:   keychainKeybaseId,
		}, keychain)
		// remove keychain admin
		removeKeychainAdminTx, err := iWardenClient.RemoveKeychainAdmin(alice.TransactOps(t), 1, alice.From)
		require.NoError(t, err)

		removeKeychainAdminReceipt := alice.Client.WaitMinedSuccess(t, removeKeychainAdminTx)

		removeKeychainAdminEvents, err := checks.GetParsedEventsOnly(removeKeychainAdminReceipt, iWardenClient.ParseRemoveKeychainAdmin)
		require.NoError(t, err)

		require.Len(t, removeKeychainAdminEvents, 1)
		require.Equal(t, uint64(1), removeKeychainAdminEvents[0].KeychainId)
		require.Equal(t, alice.From, removeKeychainAdminEvents[0].Admin)
		require.Equal(t, uint64(1), removeKeychainAdminEvents[0].AdminsCount)

		keychain, err = iWardenClient.KeychainById(alice.CallOps(t), 1)
		require.NoError(t, err)

		keychainAdmins = []common.Address{bob.From}
		require.Equal(t, warden.Keychain{
			Id:          1,
			Creator:     alice.From,
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
		keyReq = []warden.TypesCoin{{
			Denom:  "award",
			Amount: new(big.Int).SetInt64(1),
		}}
		sigReq = []warden.TypesCoin{{
			Denom:  "award",
			Amount: new(big.Int).SetInt64(1),
		}}
		keychainFees = warden.KeychainFees{
			KeyReq: keyReq,
			SigReq: sigReq,
		}
		updateKeychainTx, err := iWardenClient.UpdateKeychain(bob.TransactOps(t), 1, keychainName, keychainFees, keychainDescription, keychainUrl, keychainKeybaseId)
		require.NoError(t, err)

		updateKeychainReceipt := bob.Client.WaitMinedSuccess(t, updateKeychainTx)

		updateKeychainEvents, err := checks.GetParsedEventsOnly(updateKeychainReceipt, iWardenClient.ParseUpdateKeychain)
		require.NoError(t, err)

		require.Len(t, updateKeychainEvents, 1)
		require.Equal(t, uint64(1), updateKeychainEvents[0].Id)
		require.Equal(t, keychainFees, updateKeychainEvents[0].KeychainFees)

		keychain, err = iWardenClient.KeychainById(alice.CallOps(t), 1)
		require.NoError(t, err)

		keychainAdmins = []common.Address{bob.From}
		require.Equal(t, warden.Keychain{
			Id:          1,
			Creator:     alice.From,
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
		spaces, err := iWardenClient.SpacesByOwner(dave.CallOps(t), warden.TypesPageRequest{}, dave.From)
		require.NoError(t, err)
		require.Equal(t, []warden.Space{}, spaces.Spaces)

		additionalOwners := []common.Address{}
		newSpaceTx, err := iWardenClient.NewSpace(alice.TransactOps(t), 0, 0, 0, 0, additionalOwners)
		require.NoError(t, err)

		newSpaceReceipt := alice.Client.WaitMinedSuccess(t, newSpaceTx)

		newSpaceEvents, err := checks.GetParsedEventsOnly(newSpaceReceipt, iWardenClient.ParseNewSpace)
		require.NoError(t, err)

		require.Len(t, newSpaceEvents, 1)
		require.Equal(t, uint64(2), newSpaceEvents[0].Id)
		require.Equal(t, uint64(0), newSpaceEvents[0].ApproveAdminTemplateId)
		require.Equal(t, uint64(0), newSpaceEvents[0].RejectAdminTemplateId)
		require.Equal(t, uint64(0), newSpaceEvents[0].ApproveSignTemplateId)
		require.Equal(t, uint64(0), newSpaceEvents[0].RejectSignTemplateId)
		require.Equal(t, alice.From, newSpaceEvents[0].Creator)
		require.Equal(t, uint64(1), newSpaceEvents[0].OwnersCount)

		keys, err := iWardenClient.KeysBySpaceId(alice.CallOps(t), warden.TypesPageRequest{
			Key:        []byte{},
			Offset:     0,
			Limit:      0,
			CountTotal: false,
			Reverse:    false,
		}, 2, []int32{1, 2})
		require.NoError(t, err)
		require.Equal(t, keys.Keys, []warden.KeyResponse{})

		space, err := iWardenClient.SpaceById(alice.CallOps(t), 2)
		require.NoError(t, err)

		spaceOwners := []common.Address{alice.From}
		require.Equal(t, warden.Space{
			Id:                     2,
			Creator:                alice.From,
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

		pubKey, err := hex.DecodeString("04698b4299b6d5a097dadfa74f7b36413422102308160840d5c07b6124aa95d6972dd03c5db4fd57c01fc2152bc01362c298351a9e6c8876f5e533037fe11b82bf")
		require.NoError(t, err)

		fulfilKeyRequestTx, err := iWardenClient.FulfilKeyRequest(alice.TransactOps(t), 1, pubKey)
		require.NoError(t, err)

		fulfilKeyRequestReceipt := alice.Client.WaitMinedSuccess(t, fulfilKeyRequestTx)

		newKeyEvents, err := checks.GetParsedEventsOnly(fulfilKeyRequestReceipt, iWardenClient.ParseNewKey)
		require.NoError(t, err)

		require.Len(t, newKeyEvents, 1)
		require.Equal(t, uint64(1), newKeyEvents[0].Id)
		require.Equal(t, uint8(1), newKeyEvents[0].KeyType)
		require.Equal(t, uint64(1), newKeyEvents[0].KeychainId)
		require.Equal(t, uint64(1), newKeyEvents[0].SpaceId)
		require.Equal(t, uint64(0), newKeyEvents[0].ApproveTemplateId)
		require.Equal(t, uint64(0), newKeyEvents[0].RejectTemplateId)

		keyRequest, err := iWardenClient.KeyRequestById(alice.CallOps(t), 1)
		require.NoError(t, err)

		deductedKeychainFees := []warden.TypesCoin{{
			Denom:  "award",
			Amount: new(big.Int).SetInt64(1),
		}}
		require.Equal(t, warden.KeyRequest{
			Id:                   1,
			Creator:              alice.From,
			SpaceId:              1,
			KeychainId:           1,
			KeyType:              1,
			Status:               2,
			ApproveTemplateId:    0,
			RejectTemplateId:     0,
			DeductedKeychainFees: deductedKeychainFees,
		}, keyRequest)

		deriveAddresses := []int32{1, 2}
		keysBySpaceIdResponse, err := iWardenClient.KeysBySpaceId(alice.CallOps(t), warden.TypesPageRequest{
			Key:        []byte{},
			Offset:     0,
			Limit:      0,
			CountTotal: false,
			Reverse:    false,
		}, 1, deriveAddresses)
		require.NoError(t, err)

		expectedKeyReponse := warden.KeyResponse{
			Key: warden.Key{
				Id:                1,
				SpaceId:           1,
				KeychainId:        1,
				KeyType:           1,
				PublicKey:         pubKey,
				ApproveTemplateId: 0,
				RejectTemplateId:  0,
			},
			Addresses: []warden.AddressesResponse{
				{AddressValue: "0xFe6daba2b91dd41b776A228F7367D4cFddd8471B", AddressType: 1},
				{AddressValue: "osmo1x3l2t9fs25lhs27v6shxqvg92dnc6wc6md3fdu", AddressType: 2},
			},
		}
		require.Equal(t, []warden.KeyResponse{expectedKeyReponse}, keysBySpaceIdResponse.Keys)

		key, err := iWardenClient.KeyById(alice.CallOps(t), 1, deriveAddresses)
		require.NoError(t, err)
		require.Equal(t, expectedKeyReponse, key)

		// reject key request
		newKeyReqTx = alice.Tx(t, "warden new-action new-key-request --space-id 1 --keychain-id 1 --key-type 1 --max-keychain-fees \"1award\" --nonce 0")
		checks.SuccessTx(t, newKeyReqTx)

		rejectKeyRequestTx, err := iWardenClient.RejectKeyRequest(alice.TransactOps(t), 2, "test reject reason")
		require.NoError(t, err)

		rejectKeyRequestReceipt := alice.Client.WaitMinedSuccess(t, rejectKeyRequestTx)

		rejectKeyRequestEvents, err := checks.GetParsedEventsOnly(rejectKeyRequestReceipt, iWardenClient.ParseRejectKeyRequest)
		require.NoError(t, err)

		require.Len(t, rejectKeyRequestEvents, 1)
		require.Equal(t, uint64(2), rejectKeyRequestEvents[0].Id)

		keyRequest, err = iWardenClient.KeyRequestById(alice.CallOps(t), 2)
		require.NoError(t, err)
		require.Equal(t, warden.KeyRequest{
			Id:                   2,
			Creator:              alice.From,
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

		fulfilSignRequestTx, err := iWardenClient.FulfilSignRequest(alice.TransactOps(t), 1, signedData)
		require.NoError(t, err)

		fulfilSignRequestReceipt := alice.Client.WaitMinedSuccess(t, fulfilSignRequestTx)

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
			Creator:              alice.From,
			KeyId:                1,
			DataForSigning:       dataForSigning,
			Status:               2,
			Result:               signedData,
			EncryptionKey:        encryptionKey,
			DeductedKeychainFees: deductedKeychainFees,
			BroadcastType:        0,
		}, signRequest)
		// reject sign request
		newSignReqTx = alice.Tx(t, "warden new-action new-sign-request --key-id 1 --input 'HoZ4Z+ZU7Zd08kUR5NcbtFZrmGKF18mSBJ29dg0qI44=' --max-keychain-fees \"1award\" --nonce 0")
		checks.SuccessTx(t, newSignReqTx)

		signRequestRejectReason := "test reject reason"
		rejectSignRequestTx, err := iWardenClient.RejectSignRequest(alice.TransactOps(t), 2, signRequestRejectReason)
		require.NoError(t, err)

		rejectSignRequestReceipt := alice.Client.WaitMinedSuccess(t, rejectSignRequestTx)

		rejectSignRequestEvents, err := checks.GetParsedEventsOnly(rejectSignRequestReceipt, iWardenClient.ParseRejectSignRequest)
		require.NoError(t, err)

		require.Len(t, rejectSignRequestEvents, 1)
		require.Equal(t, uint64(2), rejectSignRequestEvents[0].Id)

		signRequest, err = iWardenClient.SignRequestById(alice.CallOps(t), 2)
		require.NoError(t, err)

		result := []byte(signRequestRejectReason)
		require.Equal(t, warden.SignRequest{
			Id:                   2,
			Creator:              alice.From,
			KeyId:                1,
			DataForSigning:       dataForSigning,
			Status:               3,
			Result:               result,
			EncryptionKey:        encryptionKey,
			DeductedKeychainFees: deductedKeychainFees,
			BroadcastType:        0,
		}, signRequest)
	})
}
