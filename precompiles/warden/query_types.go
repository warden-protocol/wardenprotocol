package warden

import (
	"fmt"

	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	cmn "github.com/evmos/evmos/v20/precompiles/common"
	wardencommon "github.com/warden-protocol/wardenprotocol/precompiles/common"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func newAllKeysRequest(method *abi.Method, args []interface{}) (*types.QueryAllKeysRequest, error) {
	if len(args) != 2 {
		return nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 2, len(args))
	}

	var input allKeysInput
	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("error while unpacking args to allKeysInput struct: %s", err)
	}

	pagination := mapEthPageRequest(input.PageRequest)
	return &types.QueryAllKeysRequest{
		Pagination:      &pagination,
		DeriveAddresses: input.DeriveAddresses,
	}, nil
}

type allKeysInput struct {
	PageRequest     PageRequest
	DeriveAddresses []types.AddressType
}

func (o *KeyResponse) FromResponse(res *types.QueryKeyResponse) *KeyResponse {
	key := Key{
		Id:                res.Key.Id,
		SpaceId:           res.Key.SpaceId,
		KeychainId:        res.Key.KeychainId,
		Type:              int32(res.Key.Type),
		PublicKey:         res.Key.PublicKey,
		ApproveTemplateId: res.Key.ApproveTemplateId,
		RejectTemplateId:  res.Key.RejectTemplateId,
	}

	addresses := make([]AddressesResponse, len(res.Addresses))

	for j, a := range res.Addresses {
		addresses[j] = AddressesResponse{
			Address: a.Address,
			Type:    int32(a.Type),
		}
	}

	return &KeyResponse{
		Key:       key,
		Addresses: addresses,
	}
}

func (o *KeyResponse) Pack(args abi.Arguments) ([]byte, error) {
	return args.Pack(o)
}

type keysOutput struct {
	KeysResponse []KeyResponse
	PageResponse PageResponse
}

func (o *keysOutput) FromResponse(res *types.QueryKeysResponse) *keysOutput {
	o.KeysResponse = make([]KeyResponse, len(res.Keys))
	for i, k := range res.Keys {
		keyReponse := new(KeyResponse).FromResponse(&k)

		o.KeysResponse[i] = *keyReponse
	}

	if res.Pagination != nil {
		o.PageResponse.Total = res.Pagination.Total
		o.PageResponse.NextKey = res.Pagination.NextKey
	}

	return o
}

func (o *keysOutput) Pack(args abi.Arguments) ([]byte, error) {
	return args.Pack(o.KeysResponse, o.PageResponse)
}

func newKeyByIdRequest(method *abi.Method, args []interface{}) (*types.QueryKeyByIdRequest, error) {
	if len(args) != 2 {
		return nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 2, len(args))
	}

	var input keyByIdInput
	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("error while unpacking args to keyByIdInput struct: %s", err)
	}

	return &types.QueryKeyByIdRequest{
		Id:              input.Id,
		DeriveAddresses: input.DeriveAddresses,
	}, nil
}

type keyByIdInput struct {
	Id              uint64
	DeriveAddresses []types.AddressType
}

func newKeysBySpaceIdRequest(method *abi.Method, args []interface{}) (*types.QueryKeysBySpaceIdRequest, error) {
	if len(args) != 3 {
		return nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 3, len(args))
	}

	var input keysBySpaceIdInput
	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("error while unpacking args to keysBySpaceIdInput struct: %s", err)
	}

	return &types.QueryKeysBySpaceIdRequest{
		Pagination:      &input.PageRequest,
		SpaceId:         input.SpaceId,
		DeriveAddresses: input.DeriveAddresses,
	}, nil
}

type keysBySpaceIdInput struct {
	PageRequest     query.PageRequest
	SpaceId         uint64
	DeriveAddresses []types.AddressType
}

func newKeyRequestByIdRequest(method *abi.Method, args []interface{}) (*types.QueryKeyRequestByIdRequest, error) {
	if len(args) != 1 {
		return nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 1, len(args))
	}

	id := args[0].(uint64)

	return &types.QueryKeyRequestByIdRequest{
		Id: id,
	}, nil
}

func (o *KeyRequest) FromResponse(res *types.QueryKeyRequestByIdResponse) *KeyRequest {
	o.Id = res.KeyRequest.Id
	o.Creator = res.KeyRequest.Creator
	o.SpaceId = res.KeyRequest.SpaceId
	o.KeychainId = res.KeyRequest.KeychainId
	o.KeyType = int32(res.KeyRequest.KeyType)
	o.Status = int32(res.KeyRequest.Status)
	o.RejectReason = res.KeyRequest.RejectReason
	o.ApproveTemplateId = res.KeyRequest.ApproveTemplateId
	o.RejectTemplateId = res.KeyRequest.RejectTemplateId
	o.DeductedKeychainFees = mapSdkCoins(res.KeyRequest.DeductedKeychainFees)

	return o
}

func (o *KeyRequest) Pack(args abi.Arguments) ([]byte, error) {
	return args.Pack(o)
}

func newKeyRequestsRequest(method *abi.Method, args []interface{}) (*types.QueryKeyRequestsRequest, error) {
	if len(args) != 4 {
		return nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 4, len(args))
	}

	var input keyRequestsInput
	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("error while unpacking args to keyRequestsInput struct: %s", err)
	}

	return &types.QueryKeyRequestsRequest{
		Pagination: &input.PageRequest,
		KeychainId: input.KeychainId,
		Status:     types.KeyRequestStatus(input.Status),
		SpaceId:    input.SpaceId,
	}, nil
}

type keyRequestsInput struct {
	PageRequest query.PageRequest
	KeychainId  uint64
	Status      int32
	SpaceId     uint64
}

type keyRequestsOutput struct {
	Pagination  PageResponse
	KeyRequests []KeyRequest
}

func (o *keyRequestsOutput) FromResponse(res *types.QueryKeyRequestsResponse) *keyRequestsOutput {
	o.KeyRequests = make([]KeyRequest, len(res.KeyRequests))
	for i, k := range res.KeyRequests {
		keyRequestReponse := KeyRequest{
			Id:                   k.Id,
			Creator:              k.Creator,
			SpaceId:              k.SpaceId,
			KeychainId:           k.KeychainId,
			KeyType:              int32(k.KeyType),
			Status:               int32(k.Status),
			RejectReason:         k.RejectReason,
			ApproveTemplateId:    k.ApproveTemplateId,
			RejectTemplateId:     k.RejectTemplateId,
			DeductedKeychainFees: mapSdkCoins(k.DeductedKeychainFees),
		}

		o.KeyRequests[i] = keyRequestReponse
	}

	if res.Pagination != nil {
		o.Pagination = mapSdkPageResponse(*res.Pagination)
	}

	return o
}

func (o *keyRequestsOutput) Pack(args abi.Arguments) ([]byte, error) {
	return args.Pack(o.KeyRequests, o.Pagination)
}

func newKeychainRequest(method *abi.Method, args []interface{}) (*types.QueryKeychainByIdRequest, error) {
	if len(args) != 1 {
		return nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 1, len(args))
	}

	id := args[0].(uint64)

	return &types.QueryKeychainByIdRequest{
		Id: id,
	}, nil
}

func (o *Keychain) FromResponse(res *types.QueryKeychainByIdResponse) *Keychain {
	o.Id = res.Keychain.Id
	o.Creator = res.Keychain.Creator
	o.Name = res.Keychain.Name
	o.Admins = res.Keychain.Admins
	o.Writers = res.Keychain.Writers
	o.Fees = mapSdkKeychainFees(res.Keychain.Fees)
	o.Description = res.Keychain.Description
	o.Url = res.Keychain.Url
	if res.Keychain.KeybaseId != nil {
		o.KeybaseId = res.Keychain.KeybaseId.Value
	}

	return o
}

func (o *Keychain) Pack(args abi.Arguments) ([]byte, error) {
	return args.Pack(o)
}

func newKeychainsRequest(method *abi.Method, args []interface{}) (*types.QueryKeychainsRequest, error) {
	if len(args) != 1 {
		return nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 1, len(args))
	}

	var input keychainsRequestsInput
	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("error while unpacking args to keychainsRequestsInput struct: %s", err)
	}

	return &types.QueryKeychainsRequest{
		Pagination: &input.PageRequest,
	}, nil
}

type keychainsRequestsInput struct {
	PageRequest query.PageRequest
}

type keychainsOutput struct {
	Pagination query.PageResponse
	Keychains  []Keychain
}

func (o *keychainsOutput) FromResponse(res *types.QueryKeychainsResponse) *keychainsOutput {
	o.Keychains = make([]Keychain, len(res.Keychains))
	for i, k := range res.Keychains {
		var keybaseId string
		if k.KeybaseId != nil {
			keybaseId = k.KeybaseId.Value
		}
		keyRequestReponse := Keychain{
			Id:          k.Id,
			Creator:     k.Creator,
			Name:        k.Name,
			Admins:      k.Admins,
			Writers:     k.Writers,
			Fees:        mapSdkKeychainFees(k.Fees),
			Description: k.Description,
			Url:         k.Url,
			KeybaseId:   keybaseId,
		}

		o.Keychains[i] = keyRequestReponse
	}

	if res.Pagination != nil {
		o.Pagination = *res.Pagination
	}

	return o
}

func (o *keychainsOutput) Pack(args abi.Arguments) ([]byte, error) {
	return args.Pack(o.Keychains, o.Pagination)
}

func newSignRequestByIdRequest(method *abi.Method, args []interface{}) (*types.QuerySignRequestByIdRequest, error) {
	if len(args) != 1 {
		return nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 1, len(args))
	}

	id := args[0].(uint64)

	return &types.QuerySignRequestByIdRequest{
		Id: id,
	}, nil
}

func (o *SignRequest) FromResponse(res *types.QuerySignRequestByIdResponse) *SignRequest {
	o.Id = res.SignRequest.Id
	o.Creator = res.SignRequest.Creator
	o.KeyId = res.SignRequest.KeyId
	o.DataForSigning = res.SignRequest.DataForSigning
	o.Status = int32(res.SignRequest.Status)

	result := res.SignRequest.Result
	if res.SignRequest.Status == types.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED {
		o.Result = result.(*types.SignRequest_SignedData).SignedData
	} else if res.SignRequest.Status == types.SignRequestStatus_SIGN_REQUEST_STATUS_REJECTED {
		reason := result.(*types.SignRequest_RejectReason).RejectReason
		o.Result = []byte(reason)
	}

	o.EncryptionKey = res.SignRequest.EncryptionKey
	o.DeductedKeychainFees = mapSdkCoins(res.SignRequest.DeductedKeychainFees)

	return o
}

func (o *SignRequest) Pack(args abi.Arguments) ([]byte, error) {
	return args.Pack(o)
}

func newSignRequestsRequest(method *abi.Method, args []interface{}) (*types.QuerySignRequestsRequest, error) {
	if len(args) != 3 {
		return nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 3, len(args))
	}

	var input signRequestsInput
	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("error while unpacking args to signRequestsInput struct: %s", err)
	}

	return &types.QuerySignRequestsRequest{
		Pagination: &input.PageRequest,
		KeychainId: input.KeychainId,
		Status:     types.SignRequestStatus(input.Status),
	}, nil
}

type signRequestsInput struct {
	PageRequest query.PageRequest
	KeychainId  uint64
	Status      int32
}

type signRequestsOutput struct {
	SignRequests []SignRequest
	Pagination   query.PageResponse
}

func (o *signRequestsOutput) FromResponse(res *types.QuerySignRequestsResponse) *signRequestsOutput {
	o.SignRequests = make([]SignRequest, len(res.SignRequests))
	for i, k := range res.SignRequests {
		var result []byte
		if k.Status == types.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED {
			result = k.Result.(*types.SignRequest_SignedData).SignedData
		} else if k.Status == types.SignRequestStatus_SIGN_REQUEST_STATUS_REJECTED {
			reason := k.Result.(*types.SignRequest_RejectReason).RejectReason
			result = []byte(reason)
		}
		signRequest := SignRequest{
			Id:             k.Id,
			Creator:        k.Creator,
			KeyId:          k.KeyId,
			DataForSigning: k.DataForSigning,
			Status:         int32(k.Status),
			Result:         result,
		}

		o.SignRequests[i] = signRequest
	}

	if res.Pagination != nil {
		o.Pagination = *res.Pagination
	}

	return o
}

func (o *signRequestsOutput) Pack(args abi.Arguments) ([]byte, error) {
	return args.Pack(o.SignRequests, o.Pagination)
}

func newSpaceByIdRequest(method *abi.Method, args []interface{}) (*types.QuerySpaceByIdRequest, error) {
	if len(args) != 1 {
		return nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 1, len(args))
	}

	id := args[0].(uint64)

	return &types.QuerySpaceByIdRequest{
		Id: id,
	}, nil
}

func (o *Space) FromResponse(res *types.QuerySpaceByIdResponse) *Space {
	o.Id = res.Space.Id
	o.Creator = res.Space.Creator
	o.Owners = res.Space.Owners
	o.Nonce = res.Space.Nonce
	o.ApproveAdminTemplateId = res.Space.ApproveAdminTemplateId
	o.RejectAdminTemplateId = res.Space.RejectAdminTemplateId
	o.ApproveSignTemplateId = res.Space.ApproveSignTemplateId
	o.RejectSignTemplateId = res.Space.RejectSignTemplateId

	return o
}

func (o *Space) Pack(args abi.Arguments) ([]byte, error) {
	return args.Pack(o)
}

func newSpacesRequest(method *abi.Method, args []interface{}) (*types.QuerySpacesRequest, error) {
	if len(args) != 1 {
		return nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 1, len(args))
	}

	var input spacesInput
	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("error while unpacking args to spacesInput struct: %s", err)
	}

	return &types.QuerySpacesRequest{
		Pagination: &input.PageRequest,
	}, nil
}

type spacesInput struct {
	PageRequest query.PageRequest
}

type spacesOutput struct {
	Pagination query.PageResponse
	Spaces     []Space
}

func (o *spacesOutput) FromResponse(res *types.QuerySpacesResponse) *spacesOutput {
	o.Spaces = make([]Space, len(res.Spaces))
	for i, k := range res.Spaces {
		space := Space{
			Id:                     k.Id,
			Creator:                k.Creator,
			Owners:                 k.Owners,
			Nonce:                  k.Nonce,
			ApproveAdminTemplateId: k.ApproveAdminTemplateId,
			RejectAdminTemplateId:  k.RejectAdminTemplateId,
			ApproveSignTemplateId:  k.ApproveSignTemplateId,
			RejectSignTemplateId:   k.RejectSignTemplateId,
		}

		o.Spaces[i] = space
	}

	if res.Pagination != nil {
		o.Pagination = *res.Pagination
	}

	return o
}

func (o *spacesOutput) Pack(args abi.Arguments) ([]byte, error) {
	return args.Pack(o.Spaces, o.Pagination)
}

func newSpacesByOwnerRequest(method *abi.Method, args []interface{}) (*types.QuerySpacesByOwnerRequest, error) {
	if len(args) != 2 {
		return nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 2, len(args))
	}

	var input spacesByOwnerInput
	if err := method.Inputs.Copy(&input, args); err != nil {
		return nil, fmt.Errorf("error while unpacking args to spacesInput struct: %s", err)
	}

	return &types.QuerySpacesByOwnerRequest{
		Pagination: &input.PageRequest,
		Owner:      wardencommon.Bech32StrFromAddress(input.Owner),
	}, nil
}

type spacesByOwnerInput struct {
	PageRequest query.PageRequest
	Owner       common.Address
}
