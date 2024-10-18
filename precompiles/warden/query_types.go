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
	PageRequest     TypesPageRequest
	DeriveAddresses []types.AddressType
}

func (o *KeyResponse) FromResponse(res *types.QueryKeyResponse) (*KeyResponse, error) {
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
		ethAddress, err := wardencommon.AddressFromBech32Str(a.Address)
		if err != nil {
			return nil, err
		}

		addresses[j] = AddressesResponse{
			Address: ethAddress,
			Type:    int32(a.Type),
		}
	}

	return &KeyResponse{
		Key:       key,
		Addresses: addresses,
	}, nil
}

func (o *KeyResponse) Pack(args abi.Arguments) ([]byte, error) {
	return args.Pack(o)
}

type keysOutput struct {
	KeysResponse []KeyResponse
	PageResponse TypesPageResponse
}

func (o *keysOutput) FromResponse(res *types.QueryKeysResponse) (*keysOutput, error) {
	o.KeysResponse = make([]KeyResponse, len(res.Keys))
	for i, k := range res.Keys {
		keyReponse, err := new(KeyResponse).FromResponse(&k)
		if err != nil {
			return nil, err
		}

		o.KeysResponse[i] = *keyReponse
	}

	if res.Pagination != nil {
		o.PageResponse.Total = res.Pagination.Total
		o.PageResponse.NextKey = res.Pagination.NextKey
	}

	return o, nil
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

func (o *KeyRequest) FromResponse(res *types.QueryKeyRequestByIdResponse) (*KeyRequest, error) {
	return o.mapKeyRequest(*res.KeyRequest)
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
	Pagination  TypesPageResponse
	KeyRequests []KeyRequest
}

func (o *keyRequestsOutput) FromResponse(res *types.QueryKeyRequestsResponse) (*keyRequestsOutput, error) {
	o.KeyRequests = make([]KeyRequest, len(res.KeyRequests))
	for i, k := range res.KeyRequests {
		keyRequestReponse, err := new(KeyRequest).mapKeyRequest(*k)

		if err != nil {
			return nil, err
		}

		o.KeyRequests[i] = *keyRequestReponse
	}

	if res.Pagination != nil {
		o.Pagination = mapSdkPageResponse(*res.Pagination)
	}

	return o, nil
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

func (o *Keychain) FromResponse(res *types.QueryKeychainByIdResponse) (*Keychain, error) {
	return o.mapKeychain(*res.Keychain)
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

func (o *keychainsOutput) FromResponse(res *types.QueryKeychainsResponse) (*keychainsOutput, error) {
	o.Keychains = make([]Keychain, len(res.Keychains))
	for i, k := range res.Keychains {
		keyRequestReponse, err := new(Keychain).mapKeychain(k)
		if err != nil {
			return nil, err
		}
		o.Keychains[i] = *keyRequestReponse
	}

	if res.Pagination != nil {
		o.Pagination = *res.Pagination
	}

	return o, nil
}

func (o *keychainsOutput) Pack(args abi.Arguments) ([]byte, error) {
	return args.Pack(o.Keychains, o.Pagination)
}

func newSignRequestByIdRequest(args []interface{}) (*types.QuerySignRequestByIdRequest, error) {
	if len(args) != 1 {
		return nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 1, len(args))
	}

	id := args[0].(uint64)

	return &types.QuerySignRequestByIdRequest{
		Id: id,
	}, nil
}

func (o *SignRequest) FromResponse(res *types.QuerySignRequestByIdResponse) (*SignRequest, error) {
	return o.mapSignRequest(res.SignRequest)
}

func (o *SignRequest) mapSignRequest(signRequest *types.SignRequest) (*SignRequest, error) {
	ethCreator, err := wardencommon.AddressFromBech32Str(signRequest.Creator)
	if err != nil {
		return nil, err
	}

	o.Creator = ethCreator

	o.Id = signRequest.Id
	o.KeyId = signRequest.KeyId
	o.DataForSigning = signRequest.DataForSigning
	o.Status = int32(signRequest.Status)

	result := signRequest.Result
	if signRequest.Status == types.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED {
		o.Result = result.(*types.SignRequest_SignedData).SignedData
	} else if signRequest.Status == types.SignRequestStatus_SIGN_REQUEST_STATUS_REJECTED {
		reason := result.(*types.SignRequest_RejectReason).RejectReason
		o.Result = []byte(reason)
	}

	o.EncryptionKey = signRequest.EncryptionKey
	o.DeductedKeychainFees = mapSdkCoins(signRequest.DeductedKeychainFees)

	return o, nil
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

func (o *signRequestsOutput) FromResponse(res *types.QuerySignRequestsResponse) (*signRequestsOutput, error) {
	o.SignRequests = make([]SignRequest, len(res.SignRequests))
	for i, k := range res.SignRequests {
		signRequest, err := new(SignRequest).mapSignRequest(k)
		if err != nil {
			return nil, err
		}
		o.SignRequests[i] = *signRequest
	}

	if res.Pagination != nil {
		o.Pagination = *res.Pagination
	}

	return o, nil
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

func (o *Space) FromResponse(res *types.QuerySpaceByIdResponse) (*Space, error) {
	return o.mapSpace(res.Space)
}

func (o *Space) mapSpace(space *types.Space) (*Space, error) {
	ethCreator, err := wardencommon.AddressFromBech32Str(space.Creator)
	if err != nil {
		return nil, err
	}

	ethOwners, err := wardencommon.AddressesFromBech32StrArray(space.Owners)
	if err != nil {
		return nil, err
	}

	o.Id = space.Id
	o.Creator = ethCreator
	o.Owners = ethOwners
	o.Nonce = space.Nonce
	o.ApproveAdminTemplateId = space.ApproveAdminTemplateId
	o.RejectAdminTemplateId = space.RejectAdminTemplateId
	o.ApproveSignTemplateId = space.ApproveSignTemplateId
	o.RejectSignTemplateId = space.RejectSignTemplateId

	return o, nil
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

func (o *spacesOutput) FromResponse(res *types.QuerySpacesResponse) (*spacesOutput, error) {
	o.Spaces = make([]Space, len(res.Spaces))
	for i, k := range res.Spaces {
		space, err := new(Space).mapSpace(&k)
		if err != nil {
			return nil, err
		}

		o.Spaces[i] = *space
	}

	if res.Pagination != nil {
		o.Pagination = *res.Pagination
	}

	return o, nil
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

func (k *KeyRequest) mapKeyRequest(keyRequest types.KeyRequest) (*KeyRequest, error) {
	ethCreator, err := wardencommon.AddressFromBech32Str(keyRequest.Creator)

	if err != nil {
		return nil, err
	}

	k.Id = keyRequest.Id
	k.Creator = ethCreator
	k.SpaceId = keyRequest.SpaceId
	k.KeychainId = keyRequest.KeychainId
	k.KeyType = int32(keyRequest.KeyType)
	k.Status = int32(keyRequest.Status)
	k.RejectReason = keyRequest.RejectReason
	k.ApproveTemplateId = keyRequest.ApproveTemplateId
	k.RejectTemplateId = keyRequest.RejectTemplateId
	k.DeductedKeychainFees = mapSdkCoins(keyRequest.DeductedKeychainFees)

	return k, nil
}

func (k *Keychain) mapKeychain(keychain types.Keychain) (*Keychain, error) {
	var keybaseId string
	if keychain.KeybaseId != nil {
		keybaseId = keychain.KeybaseId.Value
	}

	ethCreator, err := wardencommon.AddressFromBech32Str(keychain.Creator)
	if err != nil {
		return nil, err
	}

	ethAdmins, err := wardencommon.AddressesFromBech32StrArray(keychain.Admins)
	if err != nil {
		return nil, err
	}

	ethWriters, err := wardencommon.AddressesFromBech32StrArray(keychain.Writers)
	if err != nil {
		return nil, err
	}

	k.Id = keychain.Id
	k.Creator = ethCreator
	k.Name = keychain.Name
	k.Admins = ethAdmins
	k.Writers = ethWriters
	k.Fees = mapSdkKeychainFees(keychain.Fees)
	k.Description = keychain.Description
	k.Url = keychain.Url
	k.KeybaseId = keybaseId

	return k, nil
}
