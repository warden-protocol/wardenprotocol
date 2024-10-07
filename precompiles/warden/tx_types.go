package warden

import (
	"fmt"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	cmn "github.com/evmos/evmos/v20/precompiles/common"
	wardencommon "github.com/warden-protocol/wardenprotocol/precompiles/common"
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
