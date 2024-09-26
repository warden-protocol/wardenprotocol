package warden

import (
	"fmt"

	github_com_cosmos_cosmos_sdk_types "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	cmn "github.com/evmos/evmos/v18/precompiles/common"
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

	return &types.QueryAllKeysRequest{
		Pagination:      &input.PageRequest,
		DeriveAddresses: input.DeriveAddresses,
	}, nil
}

type allKeysInput struct {
	PageRequest     query.PageRequest
	DeriveAddresses []types.AddressType
}

type key struct {
	Id                uint64
	SpaceId           uint64
	KeychainId        uint64
	Type              int32
	PublicKey         []byte
	ApproveTemplateId uint64
	RejectTemplateId  uint64
}

type addressResponse struct {
	Address string
	Type    int32
}

type keyOutput struct {
	Key       key
	Addresses []addressResponse
}

func (o *keyOutput) FromResponse(res *types.QueryKeyResponse) *keyOutput {
	key := key{
		Id:                res.Key.Id,
		SpaceId:           res.Key.SpaceId,
		KeychainId:        res.Key.KeychainId,
		Type:              int32(res.Key.Type),
		PublicKey:         res.Key.PublicKey,
		ApproveTemplateId: res.Key.ApproveTemplateId,
		RejectTemplateId:  res.Key.RejectTemplateId,
	}

	addresses := make([]addressResponse, len(res.Addresses))

	for j, a := range res.Addresses {
		addresses[j] = addressResponse{
			Address: a.Address,
			Type:    int32(a.Type),
		}
	}

	return &keyOutput{
		Key:       key,
		Addresses: addresses,
	}
}

func (o *keyOutput) Pack(args abi.Arguments) ([]byte, error) {
	return args.Pack(o)
}

type keysOutput struct {
	KeysResponse []keyOutput
	PageResponse query.PageResponse
}

func (o *keysOutput) FromResponse(res *types.QueryKeysResponse) *keysOutput {
	o.KeysResponse = make([]keyOutput, len(res.Keys))
	for i, k := range res.Keys {
		keyReponse := new(keyOutput).FromResponse(&k)

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

type keyRequestOutput struct {
	Id                   uint64
	Creator              string
	SpaceId              uint64
	KeychainId           uint64
	KeyType              types.KeyType
	Status               types.KeyRequestStatus
	RejectReason         string
	ApproveTemplateId    uint64
	RejectTemplateId     uint64
	DeductedKeychainFees github_com_cosmos_cosmos_sdk_types.Coins
}

func (o *keyRequestOutput) FromResponse(res *types.QueryKeyRequestByIdResponse) *keyRequestOutput {
	o.Id = res.KeyRequest.Id
	o.Creator = res.KeyRequest.Creator
	o.SpaceId = res.KeyRequest.SpaceId
	o.KeychainId = res.KeyRequest.KeychainId
	o.KeyType = res.KeyRequest.KeyType
	o.Status = res.KeyRequest.Status
	o.RejectReason = res.KeyRequest.RejectReason
	o.ApproveTemplateId = res.KeyRequest.ApproveTemplateId
	o.RejectTemplateId = res.KeyRequest.RejectTemplateId
	o.DeductedKeychainFees = res.KeyRequest.DeductedKeychainFees

	return o
}

func (o *keyRequestOutput) Pack(args abi.Arguments) ([]byte, error) {
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
	Pagination  query.PageResponse
	KeyRequests []keyRequestOutput
}

func (o *keyRequestsOutput) FromResponse(res *types.QueryKeyRequestsResponse) *keyRequestsOutput {
	o.KeyRequests = make([]keyRequestOutput, len(res.KeyRequests))
	for i, k := range res.KeyRequests {
		keyRequestReponse := keyRequestOutput{
			Id:                   k.Id,
			Creator:              k.Creator,
			SpaceId:              k.SpaceId,
			KeychainId:           k.KeychainId,
			KeyType:              k.KeyType,
			Status:               k.Status,
			RejectReason:         k.RejectReason,
			ApproveTemplateId:    k.ApproveTemplateId,
			RejectTemplateId:     k.RejectTemplateId,
			DeductedKeychainFees: k.DeductedKeychainFees,
		}

		o.KeyRequests[i] = keyRequestReponse
	}

	if res.Pagination != nil {
		o.Pagination = *res.Pagination
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

type keychainOutput struct {
	Id          uint64
	Creator     string
	Name        string
	Admins      []string
	Writers     []string
	Fees        types.KeychainFees
	Description string
	Url         string
	KeybaseId   string
}

func (o *keychainOutput) FromResponse(res *types.QueryKeychainByIdResponse) *keychainOutput {
	o.Id = res.Keychain.Id
	o.Creator = res.Keychain.Creator
	o.Name = res.Keychain.Name
	o.Admins = res.Keychain.Admins
	o.Writers = res.Keychain.Writers
	o.Fees = res.Keychain.Fees
	o.Description = res.Keychain.Description
	o.Url = res.Keychain.Url
	if res.Keychain.KeybaseId != nil {
		o.KeybaseId = res.Keychain.KeybaseId.Value
	}

	return o
}

func (o *keychainOutput) Pack(args abi.Arguments) ([]byte, error) {
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
	Keychains  []keychainOutput
}

func (o *keychainsOutput) FromResponse(res *types.QueryKeychainsResponse) *keychainsOutput {
	o.Keychains = make([]keychainOutput, len(res.Keychains))
	for i, k := range res.Keychains {
		var keybaseId string
		if k.KeybaseId != nil {
			keybaseId = k.KeybaseId.Value
		}
		keyRequestReponse := keychainOutput{
			Id:          k.Id,
			Creator:     k.Creator,
			Name:        k.Name,
			Admins:      k.Admins,
			Writers:     k.Writers,
			Fees:        k.Fees,
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

type signRequestOutput struct {
	Id                   uint64
	Creator              string
	KeyId                uint64
	DataForSigning       []byte
	Status               types.SignRequestStatus
	Result               []byte
	EncryptionKey        []byte
	DeductedKeychainFees github_com_cosmos_cosmos_sdk_types.Coins
}

func (o *signRequestOutput) FromResponse(res *types.QuerySignRequestByIdResponse) *signRequestOutput {
	o.Id = res.SignRequest.Id
	o.Creator = res.SignRequest.Creator
	o.KeyId = res.SignRequest.KeyId
	o.DataForSigning = res.SignRequest.DataForSigning
	o.Status = res.SignRequest.Status

	result := res.SignRequest.Result
	if res.SignRequest.Status == types.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED {
		o.Result = result.(*types.SignRequest_SignedData).SignedData
	} else if res.SignRequest.Status == types.SignRequestStatus_SIGN_REQUEST_STATUS_REJECTED {
		reason := result.(*types.SignRequest_RejectReason).RejectReason
		o.Result = []byte(reason)
	}

	o.EncryptionKey = res.SignRequest.EncryptionKey
	o.DeductedKeychainFees = res.SignRequest.DeductedKeychainFees

	return o
}

func (o *signRequestOutput) Pack(args abi.Arguments) ([]byte, error) {
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
	SignRequests []signRequestOutput
	Pagination   query.PageResponse
}

func (o *signRequestsOutput) FromResponse(res *types.QuerySignRequestsResponse) *signRequestsOutput {
	o.SignRequests = make([]signRequestOutput, len(res.SignRequests))
	for i, k := range res.SignRequests {
		var result []byte
		if k.Status == types.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED {
			result = k.Result.(*types.SignRequest_SignedData).SignedData
		} else if k.Status == types.SignRequestStatus_SIGN_REQUEST_STATUS_REJECTED {
			reason := k.Result.(*types.SignRequest_RejectReason).RejectReason
			result = []byte(reason)
		}
		signRequest := signRequestOutput{
			Id:             k.Id,
			Creator:        k.Creator,
			KeyId:          k.KeyId,
			DataForSigning: k.DataForSigning,
			Status:         k.Status,
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

type spaceOutput struct {
	Id                     uint64
	Creator                string
	Owners                 []string
	Nonce                  uint64
	ApproveAdminTemplateId uint64
	RejectAdminTemplateId  uint64
	ApproveSignTemplateId  uint64
	RejectSignTemplateId   uint64
}

func (o *spaceOutput) FromResponse(res *types.QuerySpaceByIdResponse) *spaceOutput {
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

func (o *spaceOutput) Pack(args abi.Arguments) ([]byte, error) {
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
	Spaces     []spaceOutput
}

func (o *spacesOutput) FromResponse(res *types.QuerySpacesResponse) *spacesOutput {
	o.Spaces = make([]spaceOutput, len(res.Spaces))
	for i, k := range res.Spaces {
		space := spaceOutput{
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
