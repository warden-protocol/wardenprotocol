package warden

import (
	"fmt"

	codecTypes "github.com/cosmos/cosmos-sdk/codec/types"
	cosmosTypes "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	cmn "github.com/evmos/evmos/v20/precompiles/common"
	wardencommon "github.com/warden-protocol/wardenprotocol/precompiles/common"
	actTypes "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func newMsgAddKeychainAdmin(args []interface{}, origin common.Address) (*types.MsgAddKeychainAdminRequest, *common.Address, error) {
	if len(args) != 2 {
		return nil, nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 2, len(args))
	}

	keychainId := args[0].(uint64)
	newAdminAddress := args[1].(common.Address)
	authority := wardencommon.Bech32StrFromAddress(origin)
	newAdmin := wardencommon.Bech32StrFromAddress(newAdminAddress)

	return &types.MsgAddKeychainAdminRequest{
		Authority:  authority,
		KeychainId: keychainId,
		NewAdmin:   newAdmin,
	}, &newAdminAddress, nil
}

func newMsgAddKeychainWriter(args []interface{}, origin common.Address) (*types.MsgAddKeychainWriter, *common.Address, error) {
	if len(args) != 2 {
		return nil, nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 2, len(args))
	}

	keychainId := args[0].(uint64)
	newAdminAddress := args[1].(common.Address)
	creator := wardencommon.Bech32StrFromAddress(origin)
	newWriter := wardencommon.Bech32StrFromAddress(newAdminAddress)

	return &types.MsgAddKeychainWriter{
		Creator:    creator,
		KeychainId: keychainId,
		Writer:     newWriter,
	}, &newAdminAddress, nil
}

func newMsgFulfilKeyRequest(args []interface{}, keyRequestStatus types.KeyRequestStatus, origin common.Address) (*types.MsgFulfilKeyRequest, error) {
	if len(args) != 2 {
		return nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 2, len(args))
	}

	creator := wardencommon.Bech32StrFromAddress(origin)
	requestId := args[0].(uint64)
	if keyRequestStatus == types.KeyRequestStatus_KEY_REQUEST_STATUS_FULFILLED {
		key := args[1].([]byte)
		result := &types.MsgFulfilKeyRequest_Key{
			Key: &types.MsgNewKey{
				PublicKey: key,
			},
		}

		return &types.MsgFulfilKeyRequest{
			Creator:   creator,
			RequestId: requestId,
			Status:    keyRequestStatus,
			Result:    result,
		}, nil
	} else {
		rejectReason := args[1].(string)
		result := &types.MsgFulfilKeyRequest_RejectReason{
			RejectReason: rejectReason,
		}

		return &types.MsgFulfilKeyRequest{
			Creator:   creator,
			RequestId: requestId,
			Status:    keyRequestStatus,
			Result:    result,
		}, nil
	}
}

func newMsgFulfilSignRequest(args []interface{}, signRequestStatus types.SignRequestStatus, origin common.Address) (*types.MsgFulfilSignRequest, error) {
	if len(args) != 2 {
		return nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 2, len(args))
	}

	creator := wardencommon.Bech32StrFromAddress(origin)
	requestId := args[0].(uint64)
	if signRequestStatus == types.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED {
		signedData := args[1].([]byte)
		result := &types.MsgFulfilSignRequest_Payload{
			Payload: &types.MsgSignedData{
				SignedData: signedData,
			},
		}

		return &types.MsgFulfilSignRequest{
			Creator:   creator,
			RequestId: requestId,
			Status:    types.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED,
			Result:    result,
		}, nil
	} else {
		rejectReason := args[1].(string)
		result := &types.MsgFulfilSignRequest_RejectReason{
			RejectReason: rejectReason,
		}

		return &types.MsgFulfilSignRequest{
			Creator:   creator,
			RequestId: requestId,
			Status:    signRequestStatus,
			Result:    result,
		}, nil
	}
}

func newMsgNewKeychain(method *abi.Method, args []interface{}, origin common.Address) (*types.MsgNewKeychain, error) {
	if len(args) != 5 {
		return nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 5, len(args))
	}

	creator := wardencommon.Bech32StrFromAddress(origin)
	var input newKeyChainInput
	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("error while unpacking args to newKeyChainInput struct: %s", err)
	}

	return &types.MsgNewKeychain{
		Creator:      creator,
		Name:         input.Name,
		KeychainFees: input.KeychainFees,
		Description:  input.Description,
		Url:          input.Url,
		KeybaseId:    input.KeybaseId,
	}, nil
}

type newKeyChainInput struct {
	Name         string
	KeychainFees v1beta3.KeychainFees
	Description  string
	Url          string
	KeybaseId    string
}

func newMsgNewSpace(args []interface{}, origin common.Address) (*types.MsgNewSpace, error) {
	if len(args) != 5 {
		return nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 5, len(args))
	}

	creator := wardencommon.Bech32StrFromAddress(origin)

	approveAdminTemplateId := args[0].(uint64)
	rejectAdminTemplateId := args[1].(uint64)
	approveSignTemplateId := args[2].(uint64)
	rejectSignTemplateId := args[3].(uint64)
	var additionalOwners []string
	for _, a := range args[4].([]common.Address) {
		additionalOwners = append(additionalOwners, wardencommon.Bech32StrFromAddress(a))
	}

	return &types.MsgNewSpace{
		Creator:                creator,
		ApproveAdminTemplateId: approveAdminTemplateId,
		RejectAdminTemplateId:  rejectAdminTemplateId,
		ApproveSignTemplateId:  approveSignTemplateId,
		RejectSignTemplateId:   rejectSignTemplateId,
		AdditionalOwners:       additionalOwners,
	}, nil
}

func newMsgRemoveKeychainAdmin(args []interface{}, origin common.Address) (*types.MsgRemoveKeychainAdminRequest, *common.Address, error) {
	if len(args) != 2 {
		return nil, nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 2, len(args))
	}

	creator := wardencommon.Bech32StrFromAddress(origin)

	keychainId := args[0].(uint64)
	admin := args[1].(common.Address)

	return &types.MsgRemoveKeychainAdminRequest{
		Authority:  creator,
		KeychainId: keychainId,
		Admin:      wardencommon.Bech32StrFromAddress(admin),
	}, &admin, nil
}

func newMsgUpdateKeychain(method *abi.Method, args []interface{}, origin common.Address) (*types.MsgUpdateKeychain, error) {
	if len(args) != 6 {
		return nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 6, len(args))
	}

	creator := wardencommon.Bech32StrFromAddress(origin)
	var input updateKeyChainInput
	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("error while unpacking args to updateKeyChainInput struct: %s", err)
	}

	return &types.MsgUpdateKeychain{
		Creator:      creator,
		KeychainId:   input.KeychainId,
		Name:         input.Name,
		KeychainFees: input.KeychainFees,
		Description:  input.Description,
		Url:          input.Url,
		KeybaseId:    input.KeybaseId,
	}, nil
}

type updateKeyChainInput struct {
	KeychainId   uint64
	Name         string
	KeychainFees v1beta3.KeychainFees
	Description  string
	Url          string
	KeybaseId    string
}

func newMsgAddSpaceOwner(args []interface{}, origin common.Address, act string) (*actTypes.MsgNewAction, *types.MsgAddSpaceOwner, error) {
	if len(args) != 6 {
		return nil, nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 6, len(args))
	}

	spaceId := args[0].(uint64)
	newOwnerAddress := args[1].(common.Address)
	nonce := args[2].(uint64)
	actionTimeoutHeight := args[3].(uint64)
	expectedApproveExpression := args[4].(string)
	expectedRejectExpression := args[5].(string)

	authority := wardencommon.Bech32StrFromAddress(origin)
	newOwner := wardencommon.Bech32StrFromAddress(newOwnerAddress)

	msgAddSpaceOwner := types.MsgAddSpaceOwner{
		Authority: act,
		SpaceId:   spaceId,
		NewOwner:  newOwner,
		Nonce:     nonce,
	}

	anyMsg, err := codecTypes.NewAnyWithValue(&msgAddSpaceOwner)
	if err != nil {
		return nil, nil, err
	}

	return &actTypes.MsgNewAction{
		Creator:                   authority,
		Message:                   anyMsg,
		ActionTimeoutHeight:       actionTimeoutHeight,
		ExpectedApproveExpression: expectedApproveExpression,
		ExpectedRejectExpression:  expectedRejectExpression,
	}, &msgAddSpaceOwner, nil
}

func newMsgRemoveSpaceOwner(args []interface{}, origin common.Address, act string) (*actTypes.MsgNewAction, *types.MsgRemoveSpaceOwner, error) {
	if len(args) != 6 {
		return nil, nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 6, len(args))
	}

	spaceId := args[0].(uint64)
	ownerAddress := args[1].(common.Address)
	nonce := args[2].(uint64)
	actionTimeoutHeight := args[3].(uint64)
	expectedApproveExpression := args[4].(string)
	expectedRejectExpression := args[5].(string)

	authority := wardencommon.Bech32StrFromAddress(origin)
	owner := wardencommon.Bech32StrFromAddress(ownerAddress)

	msgRemoveSpaceOwner := types.MsgRemoveSpaceOwner{
		Authority: act,
		SpaceId:   spaceId,
		Owner:     owner,
		Nonce:     nonce,
	}

	anyMsg, err := codecTypes.NewAnyWithValue(&msgRemoveSpaceOwner)
	if err != nil {
		return nil, nil, err
	}

	return &actTypes.MsgNewAction{
		Creator:                   authority,
		Message:                   anyMsg,
		ActionTimeoutHeight:       actionTimeoutHeight,
		ExpectedApproveExpression: expectedApproveExpression,
		ExpectedRejectExpression:  expectedRejectExpression,
	}, &msgRemoveSpaceOwner, nil
}

func newMsgNewKeyRequest(args []interface{}, origin common.Address, act string) (*actTypes.MsgNewAction, *types.MsgNewKeyRequest, error) {
	if len(args) != 10 {
		return nil, nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 10, len(args))
	}

	spaceId := args[0].(uint64)
	keychainId := args[1].(uint64)
	keyType := args[2].(uint8)
	approveTemplateId := args[3].(uint64)
	rejectTemplateId := args[4].(uint64)
	maxKeychainFees := args[5].(cosmosTypes.Coins)
	nonce := args[6].(uint64)
	actionTimeoutHeight := args[7].(uint64)
	expectedApproveExpression := args[8].(string)
	expectedRejectExpression := args[9].(string)

	authority := wardencommon.Bech32StrFromAddress(origin)

	msgNewKeyRequest := types.MsgNewKeyRequest{
		Authority:         act,
		SpaceId:           spaceId,
		KeychainId:        keychainId,
		KeyType:           types.KeyType(keyType),
		ApproveTemplateId: approveTemplateId,
		RejectTemplateId:  rejectTemplateId,
		MaxKeychainFees:   maxKeychainFees,
		Nonce:             nonce,
	}

	anyMsg, err := codecTypes.NewAnyWithValue(&msgNewKeyRequest)
	if err != nil {
		return nil, nil, err
	}

	return &actTypes.MsgNewAction{
		Creator:                   authority,
		Message:                   anyMsg,
		ActionTimeoutHeight:       actionTimeoutHeight,
		ExpectedApproveExpression: expectedApproveExpression,
		ExpectedRejectExpression:  expectedRejectExpression,
	}, &msgNewKeyRequest, nil
}

func newMsgNewSignRequest(args []interface{}, origin common.Address, act string) (*actTypes.MsgNewAction, *types.MsgNewSignRequest, error) {
	if len(args) != 9 {
		return nil, nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 9, len(args))
	}

	keyId := args[0].(uint64)
	input := args[1].([]byte)

	var analyzers []string
	for _, a := range args[2].([]common.Address) {
		analyzers = append(analyzers, wardencommon.Bech32StrFromAddress(a))
	}

	encryptionKey := args[3].([]byte)
	maxKeychainFees := args[4].(cosmosTypes.Coins)
	nonce := args[5].(uint64)
	actionTimeoutHeight := args[6].(uint64)
	expectedApproveExpression := args[7].(string)
	expectedRejectExpression := args[8].(string)

	authority := wardencommon.Bech32StrFromAddress(origin)

	msgNewSignRequest := types.MsgNewSignRequest{
		Authority:       act,
		KeyId:           keyId,
		Input:           input,
		Analyzers:       analyzers,
		EncryptionKey:   encryptionKey,
		MaxKeychainFees: maxKeychainFees,
		Nonce:           nonce,
	}

	anyMsg, err := codecTypes.NewAnyWithValue(&msgNewSignRequest)
	if err != nil {
		return nil, nil, err
	}

	return &actTypes.MsgNewAction{
		Creator:                   authority,
		Message:                   anyMsg,
		ActionTimeoutHeight:       actionTimeoutHeight,
		ExpectedApproveExpression: expectedApproveExpression,
		ExpectedRejectExpression:  expectedRejectExpression,
	}, &msgNewSignRequest, nil
}

func newMsgUpdateKey(args []interface{}, origin common.Address, act string) (*actTypes.MsgNewAction, *types.MsgUpdateKey, error) {
	if len(args) != 6 {
		return nil, nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 6, len(args))
	}

	keyId := args[0].(uint64)
	approveTemplateId := args[1].(uint64)
	rejectTemplateId := args[2].(uint64)
	actionTimeoutHeight := args[3].(uint64)
	expectedApproveExpression := args[4].(string)
	expectedRejectExpression := args[5].(string)

	authority := wardencommon.Bech32StrFromAddress(origin)

	msgUpdateKey := types.MsgUpdateKey{
		Authority:         act,
		KeyId:             keyId,
		ApproveTemplateId: approveTemplateId,
		RejectTemplateId:  rejectTemplateId,
	}

	anyMsg, err := codecTypes.NewAnyWithValue(&msgUpdateKey)
	if err != nil {
		return nil, nil, err
	}

	return &actTypes.MsgNewAction{
		Creator:                   authority,
		Message:                   anyMsg,
		ActionTimeoutHeight:       actionTimeoutHeight,
		ExpectedApproveExpression: expectedApproveExpression,
		ExpectedRejectExpression:  expectedRejectExpression,
	}, &msgUpdateKey, nil
}

func newMsgUpdateSpace(args []interface{}, origin common.Address, act string) (*actTypes.MsgNewAction, *types.MsgUpdateSpace, error) {
	if len(args) != 9 {
		return nil, nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 9, len(args))
	}

	spaceId := args[0].(uint64)
	nonce := args[1].(uint64)
	approveAdminTemplateId := args[2].(uint64)
	rejectAdminTemplateId := args[3].(uint64)
	approveSignTemplateId := args[4].(uint64)
	rejectSignTemplateId := args[5].(uint64)
	actionTimeoutHeight := args[6].(uint64)
	expectedApproveExpression := args[7].(string)
	expectedRejectExpression := args[8].(string)

	authority := wardencommon.Bech32StrFromAddress(origin)

	msgUpdateSpace := types.MsgUpdateSpace{
		Authority:              act,
		SpaceId:                spaceId,
		Nonce:                  nonce,
		ApproveAdminTemplateId: approveAdminTemplateId,
		RejectAdminTemplateId:  rejectAdminTemplateId,
		ApproveSignTemplateId:  approveSignTemplateId,
		RejectSignTemplateId:   rejectSignTemplateId,
	}

	anyMsg, err := codecTypes.NewAnyWithValue(&msgUpdateSpace)
	if err != nil {
		return nil, nil, err
	}

	return &actTypes.MsgNewAction{
		Creator:                   authority,
		Message:                   anyMsg,
		ActionTimeoutHeight:       actionTimeoutHeight,
		ExpectedApproveExpression: expectedApproveExpression,
		ExpectedRejectExpression:  expectedRejectExpression,
	}, &msgUpdateSpace, nil
}
