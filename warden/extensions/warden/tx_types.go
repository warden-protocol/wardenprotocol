package warden

import (
	"fmt"

	codecTypes "github.com/cosmos/cosmos-sdk/codec/types"
	cosmosTypes "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"

	wardencommon "github.com/warden-protocol/wardenprotocol/warden/extensions/common"
	actTypes "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func newMsgAddKeychainAdmin(args []interface{}, origin common.Address) (*types.MsgAddKeychainAdminRequest, *common.Address, error) {
	if len(args) != 2 {
		return nil, nil, wardencommon.WrongArgsNumber{Expected: 2, Got: len(args)}
	}

	keychainId, ok := args[0].(uint64)
	if !ok {
		return nil, nil, fmt.Errorf("expected uint64 for keychainId, got %T", args[0])
	}

	newAdminAddress, ok := args[1].(common.Address)
	if !ok {
		return nil, nil, fmt.Errorf("expected common.Address for newAdminAddress, got %T", args[1])
	}

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
		return nil, nil, wardencommon.WrongArgsNumber{Expected: 2, Got: len(args)}
	}

	keychainId, ok := args[0].(uint64)
	if !ok {
		return nil, nil, fmt.Errorf("expected uint64 for keychainId, got %T", args[0])
	}

	newWriterAddress, ok := args[1].(common.Address)
	if !ok {
		return nil, nil, fmt.Errorf("expected common.Address for newWriterAddress, got %T", args[1])
	}

	creator := wardencommon.Bech32StrFromAddress(origin)
	newWriter := wardencommon.Bech32StrFromAddress(newWriterAddress)

	return &types.MsgAddKeychainWriter{
		Creator:    creator,
		KeychainId: keychainId,
		Writer:     newWriter,
	}, &newWriterAddress, nil
}

func newMsgFulfilKeyRequest(args []interface{}, keyRequestStatus types.KeyRequestStatus, origin common.Address) (*types.MsgFulfilKeyRequest, error) {
	if len(args) != 2 {
		return nil, wardencommon.WrongArgsNumber{Expected: 2, Got: len(args)}
	}

	requestId, ok := args[0].(uint64)
	if !ok {
		return nil, fmt.Errorf("expected uint64 for requestId, got %T", args[0])
	}

	creator := wardencommon.Bech32StrFromAddress(origin)

	if keyRequestStatus == types.KeyRequestStatus_KEY_REQUEST_STATUS_FULFILLED {
		key, ok1 := args[1].([]byte)
		if !ok1 {
			return nil, fmt.Errorf("expected []byte for key, got %T", args[1])
		}

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
		rejectReason, ok1 := args[1].(string)
		if !ok1 {
			return nil, fmt.Errorf("expected string for rejectReason, got %T", args[1])
		}

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
		return nil, wardencommon.WrongArgsNumber{Expected: 2, Got: len(args)}
	}

	creator := wardencommon.Bech32StrFromAddress(origin)

	requestId, ok := args[0].(uint64)
	if !ok {
		return nil, fmt.Errorf("expected uint64 for requestId, got %T", args[0])
	}

	if signRequestStatus == types.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED {
		signedData, ok1 := args[1].([]byte)
		if !ok1 {
			return nil, fmt.Errorf("expected []byte for signedData, got %T", args[1])
		}

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
		rejectReason, ok1 := args[1].(string)
		if !ok1 {
			return nil, fmt.Errorf("expected string for rejectReason, got %T", args[1])
		}

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
		return nil, wardencommon.WrongArgsNumber{Expected: 5, Got: len(args)}
	}

	creator := wardencommon.Bech32StrFromAddress(origin)

	var input newKeyChainInput
	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("error while unpacking args to newKeyChainInput struct: %w", err)
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
	KeychainFees types.KeychainFees
	Description  string
	Url          string
	KeybaseId    string
}

func newMsgNewSpace(args []interface{}, origin common.Address) (*types.MsgNewSpace, error) {
	if len(args) != 5 {
		return nil, wardencommon.WrongArgsNumber{Expected: 5, Got: len(args)}
	}

	creator := wardencommon.Bech32StrFromAddress(origin)

	approveAdminTemplateId, ok := args[0].(uint64)
	if !ok {
		return nil, fmt.Errorf("expected uint64 for approveAdminTemplateId, got %T", args[0])
	}

	rejectAdminTemplateId, ok := args[1].(uint64)
	if !ok {
		return nil, fmt.Errorf("expected uint64 for rejectAdminTemplateId, got %T", args[1])
	}

	approveSignTemplateId, ok := args[2].(uint64)
	if !ok {
		return nil, fmt.Errorf("expected uint64 for approveSignTemplateId, got %T", args[2])
	}

	rejectSignTemplateId, ok := args[3].(uint64)
	if !ok {
		return nil, fmt.Errorf("expected uint64 for rejectSignTemplateId, got %T", args[3])
	}

	owners, ok := args[4].([]common.Address)
	if !ok {
		return nil, fmt.Errorf("expected []common.Address for owners, got %T", args[4])
	}

	var additionalOwners []string
	for _, a := range owners {
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
		return nil, nil, wardencommon.WrongArgsNumber{Expected: 2, Got: len(args)}
	}

	creator := wardencommon.Bech32StrFromAddress(origin)

	keychainId, ok := args[0].(uint64)
	if !ok {
		return nil, nil, fmt.Errorf("expected uint64 for keychainId, got %T", args[0])
	}

	admin, ok := args[1].(common.Address)
	if !ok {
		return nil, nil, fmt.Errorf("expected common.Address for admin, got %T", args[1])
	}

	return &types.MsgRemoveKeychainAdminRequest{
		Authority:  creator,
		KeychainId: keychainId,
		Admin:      wardencommon.Bech32StrFromAddress(admin),
	}, &admin, nil
}

func newMsgUpdateKeychain(method *abi.Method, args []interface{}, origin common.Address) (*types.MsgUpdateKeychain, error) {
	if len(args) != 6 {
		return nil, wardencommon.WrongArgsNumber{Expected: 6, Got: len(args)}
	}

	creator := wardencommon.Bech32StrFromAddress(origin)

	var input updateKeyChainInput
	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("error while unpacking args to updateKeyChainInput struct: %w", err)
	}

	return &types.MsgUpdateKeychain{
		Creator:      creator,
		KeychainId:   input.KeychainId,
		Name:         input.Name,
		KeychainFees: mapEthKeychainFees(input.KeychainFees),
		Description:  input.Description,
		Url:          input.Url,
		KeybaseId:    input.KeybaseId,
	}, nil
}

type updateKeyChainInput struct {
	KeychainId   uint64
	Name         string
	KeychainFees KeychainFees
	Description  string
	Url          string
	KeybaseId    string
}

func newMsgAddSpaceOwner(args []interface{}, origin common.Address, act string) (*actTypes.MsgNewAction, error) {
	if len(args) != 6 {
		return nil, wardencommon.WrongArgsNumber{Expected: 6, Got: len(args)}
	}

	spaceId, ok := args[0].(uint64)
	if !ok {
		return nil, fmt.Errorf("expected uint64 for spaceId, got %T", args[0])
	}

	newOwnerAddress, ok := args[1].(common.Address)
	if !ok {
		return nil, fmt.Errorf("expected common.Address for newOwnerAddress, got %T", args[1])
	}

	nonce, ok := args[2].(uint64)
	if !ok {
		return nil, fmt.Errorf("expected uint64 for nonce, got %T", args[2])
	}

	actionTimeoutHeight, ok := args[3].(uint64)
	if !ok {
		return nil, fmt.Errorf("expected uint64 for actionTimeoutHeight, got %T", args[3])
	}

	expectedApproveExpression, ok := args[4].(string)
	if !ok {
		return nil, fmt.Errorf("expected string for expectedApproveExpression, got %T", args[4])
	}

	expectedRejectExpression, ok := args[5].(string)
	if !ok {
		return nil, fmt.Errorf("expected string for expectedRejectExpression, got %T", args[5])
	}

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
		return nil, err
	}

	return &actTypes.MsgNewAction{
		Creator:                   authority,
		Message:                   anyMsg,
		ActionTimeoutHeight:       actionTimeoutHeight,
		ExpectedApproveExpression: expectedApproveExpression,
		ExpectedRejectExpression:  expectedRejectExpression,
	}, nil
}

func newMsgRemoveSpaceOwner(args []interface{}, origin common.Address, act string) (*actTypes.MsgNewAction, error) {
	if len(args) != 6 {
		return nil, wardencommon.WrongArgsNumber{Expected: 6, Got: len(args)}
	}

	spaceId, ok := args[0].(uint64)
	if !ok {
		return nil, fmt.Errorf("expected uint64 for spaceId, got %T", args[0])
	}

	ownerAddress, ok := args[1].(common.Address)
	if !ok {
		return nil, fmt.Errorf("expected common.Address for ownerAddress, got %T", args[1])
	}

	nonce, ok := args[2].(uint64)
	if !ok {
		return nil, fmt.Errorf("expected uint64 for nonce, got %T", args[2])
	}

	actionTimeoutHeight, ok := args[3].(uint64)
	if !ok {
		return nil, fmt.Errorf("expected uint64 for actionTimeoutHeight, got %T", args[3])
	}

	expectedApproveExpression, ok := args[4].(string)
	if !ok {
		return nil, fmt.Errorf("expected string for expectedApproveExpression, got %T", args[4])
	}

	expectedRejectExpression, ok := args[5].(string)
	if !ok {
		return nil, fmt.Errorf("expected string for expectedRejectExpression, got %T", args[5])
	}

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
		return nil, err
	}

	return &actTypes.MsgNewAction{
		Creator:                   authority,
		Message:                   anyMsg,
		ActionTimeoutHeight:       actionTimeoutHeight,
		ExpectedApproveExpression: expectedApproveExpression,
		ExpectedRejectExpression:  expectedRejectExpression,
	}, nil
}

type newKeyRequestInput struct {
	SpaceId                   uint64
	KeychainId                uint64
	KeyType                   uint8
	ApproveTemplateId         uint64
	RejectTemplateId          uint64
	MaxKeychainFees           []cosmosTypes.Coin
	Nonce                     uint64
	ActionTimeoutHeight       uint64
	ExpectedApproveExpression string
	ExpectedRejectExpression  string
}

func newMsgNewKeyRequest(method *abi.Method, args []interface{}, origin common.Address, act string) (*actTypes.MsgNewAction, error) {
	if len(args) != 10 {
		return nil, wardencommon.WrongArgsNumber{Expected: 10, Got: len(args)}
	}

	var input newKeyRequestInput
	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("error while unpacking args to newMsgNewKeyRequest struct: %w", err)
	}

	authority := wardencommon.Bech32StrFromAddress(origin)

	mapKeyType := func(keyType uint8) (types.KeyType, error) {
		switch keyType {
		case uint8(types.KeyType_KEY_TYPE_UNSPECIFIED):
			return types.KeyType_KEY_TYPE_UNSPECIFIED, nil
		case uint8(types.KeyType_KEY_TYPE_ECDSA_SECP256K1):
			return types.KeyType_KEY_TYPE_ECDSA_SECP256K1, nil
		case uint8(types.KeyType_KEY_TYPE_EDDSA_ED25519):
			return types.KeyType_KEY_TYPE_EDDSA_ED25519, nil
		default:
			return -1, fmt.Errorf("key type is not supported: %v", keyType)
		}
	}

	keyType, err := mapKeyType(input.KeyType)
	if err != nil {
		return nil, err
	}

	msgNewKeyRequest := types.MsgNewKeyRequest{
		Authority:         act,
		SpaceId:           input.SpaceId,
		KeychainId:        input.KeychainId,
		KeyType:           keyType,
		ApproveTemplateId: input.ApproveTemplateId,
		RejectTemplateId:  input.RejectTemplateId,
		MaxKeychainFees:   input.MaxKeychainFees,
		Nonce:             input.Nonce,
	}

	anyMsg, err := codecTypes.NewAnyWithValue(&msgNewKeyRequest)
	if err != nil {
		return nil, err
	}

	return &actTypes.MsgNewAction{
		Creator:                   authority,
		Message:                   anyMsg,
		ActionTimeoutHeight:       input.ActionTimeoutHeight,
		ExpectedApproveExpression: input.ExpectedApproveExpression,
		ExpectedRejectExpression:  input.ExpectedRejectExpression,
	}, nil
}

type newSignRequestInput struct {
	KeyId                     uint64
	Input                     []byte
	Analyzers                 [][]byte
	EncryptionKey             []byte
	MaxKeychainFees           []cosmosTypes.Coin
	Nonce                     uint64
	ActionTimeoutHeight       uint64
	ExpectedApproveExpression string
	ExpectedRejectExpression  string
	BroadcastType             uint8
}

func newMsgNewSignRequest(method *abi.Method, args []interface{}, origin common.Address, act string) (*actTypes.MsgNewAction, error) {
	if len(args) != 10 {
		return nil, wardencommon.WrongArgsNumber{Expected: 10, Got: len(args)}
	}

	var input newSignRequestInput
	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("error while unpacking args to newSignRequestInput struct: %w", err)
	}

	var analyzers []string
	for _, a := range input.Analyzers {
		analyzers = append(analyzers, wardencommon.Bech32StrFromBytes(a))
	}

	authority := wardencommon.Bech32StrFromAddress(origin)

	mapBroadcastType := func(broadcastType uint8) (types.BroadcastType, error) {
		switch broadcastType {
		case uint8(types.BroadcastType_BROADCAST_TYPE_DISABLED):
			return types.BroadcastType_BROADCAST_TYPE_DISABLED, nil
		case uint8(types.BroadcastType_BROADCAST_TYPE_AUTOMATIC):
			return types.BroadcastType_BROADCAST_TYPE_AUTOMATIC, nil
		default:
			return -1, fmt.Errorf("broadcast type is not supported: %v", broadcastType)
		}
	}

	broadcastType, err := mapBroadcastType(input.BroadcastType)
	if err != nil {
		return nil, err
	}

	msgNewSignRequest := types.MsgNewSignRequest{
		Authority:       act,
		KeyId:           input.KeyId,
		Input:           input.Input,
		Analyzers:       analyzers,
		EncryptionKey:   input.EncryptionKey,
		MaxKeychainFees: input.MaxKeychainFees,
		Nonce:           input.Nonce,
		BroadcastType:   broadcastType,
	}

	anyMsg, err := codecTypes.NewAnyWithValue(&msgNewSignRequest)
	if err != nil {
		return nil, err
	}

	return &actTypes.MsgNewAction{
		Creator:                   authority,
		Message:                   anyMsg,
		ActionTimeoutHeight:       input.ActionTimeoutHeight,
		ExpectedApproveExpression: input.ExpectedApproveExpression,
		ExpectedRejectExpression:  input.ExpectedRejectExpression,
	}, nil
}

func newMsgUpdateKey(args []interface{}, origin common.Address, act string) (*actTypes.MsgNewAction, error) {
	if len(args) != 6 {
		return nil, wardencommon.WrongArgsNumber{Expected: 6, Got: len(args)}
	}

	keyId, ok := args[0].(uint64)
	if !ok {
		return nil, fmt.Errorf("expected uint64 for keyId, got %T", args[0])
	}

	approveTemplateId, ok := args[1].(uint64)
	if !ok {
		return nil, fmt.Errorf("expected uint64 for approveTemplateId, got %T", args[1])
	}

	rejectTemplateId, ok := args[2].(uint64)
	if !ok {
		return nil, fmt.Errorf("expected uint64 for rejectTemplateId, got %T", args[2])
	}

	actionTimeoutHeight, ok := args[3].(uint64)
	if !ok {
		return nil, fmt.Errorf("expected uint64 for actionTimeoutHeight, got %T", args[3])
	}

	expectedApproveExpression, ok := args[4].(string)
	if !ok {
		return nil, fmt.Errorf("expected string for expectedApproveExpression, got %T", args[4])
	}

	expectedRejectExpression, ok := args[5].(string)
	if !ok {
		return nil, fmt.Errorf("expected string for expectedRejectExpression, got %T", args[5])
	}

	authority := wardencommon.Bech32StrFromAddress(origin)

	msgUpdateKey := types.MsgUpdateKey{
		Authority:         act,
		KeyId:             keyId,
		ApproveTemplateId: approveTemplateId,
		RejectTemplateId:  rejectTemplateId,
	}

	anyMsg, err := codecTypes.NewAnyWithValue(&msgUpdateKey)
	if err != nil {
		return nil, err
	}

	return &actTypes.MsgNewAction{
		Creator:                   authority,
		Message:                   anyMsg,
		ActionTimeoutHeight:       actionTimeoutHeight,
		ExpectedApproveExpression: expectedApproveExpression,
		ExpectedRejectExpression:  expectedRejectExpression,
	}, nil
}

func newMsgUpdateSpace(args []interface{}, origin common.Address, act string) (*actTypes.MsgNewAction, error) {
	if len(args) != 9 {
		return nil, wardencommon.WrongArgsNumber{Expected: 9, Got: len(args)}
	}

	spaceId, ok := args[0].(uint64)
	if !ok {
		return nil, fmt.Errorf("expected uint64 for spaceId, got %T", args[0])
	}

	nonce, ok := args[1].(uint64)
	if !ok {
		return nil, fmt.Errorf("expected uint64 for nonce, got %T", args[1])
	}

	approveAdminTemplateId, ok := args[2].(uint64)
	if !ok {
		return nil, fmt.Errorf("expected uint64 for approveAdminTemplateId, got %T", args[2])
	}

	rejectAdminTemplateId, ok := args[3].(uint64)
	if !ok {
		return nil, fmt.Errorf("expected uint64 for rejectAdminTemplateId, got %T", args[3])
	}

	approveSignTemplateId, ok := args[4].(uint64)
	if !ok {
		return nil, fmt.Errorf("expected uint64 for approveSignTemplateId, got %T", args[4])
	}

	rejectSignTemplateId, ok := args[5].(uint64)
	if !ok {
		return nil, fmt.Errorf("expected uint64 for rejectSignTemplateId, got %T", args[5])
	}

	actionTimeoutHeight, ok := args[6].(uint64)
	if !ok {
		return nil, fmt.Errorf("expected uint64 for actionTimeoutHeight, got %T", args[6])
	}

	expectedApproveExpression, ok := args[7].(string)
	if !ok {
		return nil, fmt.Errorf("expected string for expectedApproveExpression, got %T", args[7])
	}

	expectedRejectExpression, ok := args[8].(string)
	if !ok {
		return nil, fmt.Errorf("expected string for expectedRejectExpression, got %T", args[8])
	}

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
		return nil, err
	}

	return &actTypes.MsgNewAction{
		Creator:                   authority,
		Message:                   anyMsg,
		ActionTimeoutHeight:       actionTimeoutHeight,
		ExpectedApproveExpression: expectedApproveExpression,
		ExpectedRejectExpression:  expectedRejectExpression,
	}, nil
}
