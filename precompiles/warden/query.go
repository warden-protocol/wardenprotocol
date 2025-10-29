package warden

import (
	"errors"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/core/vm"
)

const (
	AllKeysMethod         = "allKeys"
	KeyByIdMethod         = "keyById"
	KeysBySpaceIdMethod   = "keysBySpaceId"
	KeyRequestMethod      = "keyRequestById"
	KeyRequestsMethod     = "keyRequests"
	KeychainMethod        = "keychainById"
	KeychainsMethod       = "keychains"
	SignRequestByIdMethod = "signRequestById"
	SignRequestsMethod    = "signRequests"
	SpaceByIdMethod       = "spaceById"
	SpacesMethod          = "spaces"
	SpacesByOwnerMethod   = "spacesByOwner"
)

// AllKeysMethod constructs QueryAllKeysRequest from args, passes it to query server and packs response into corresponding abi output.
func (p Precompile) AllKeysMethod(
	ctx sdk.Context,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	req, err := newAllKeysRequest(method, args)
	if err != nil {
		return nil, err
	}

	response, err := p.queryServer.AllKeys(ctx, req)
	if err != nil {
		return nil, err
	}

	if response == nil {
		return nil, errors.New("received nil response from query server")
	}

	out, err := new(keysOutput).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

// KeyByIdMethod constructs QueryKeyByIdRequest from args, passes it to query server and packs response into corresponding abi output.
func (p Precompile) KeyByIdMethod(
	ctx sdk.Context,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	req, err := newKeyByIdRequest(method, args)
	if err != nil {
		return nil, err
	}

	response, err := p.queryServer.KeyById(ctx, req)
	if err != nil {
		return nil, err
	}

	if response == nil {
		return nil, errors.New("received nil response from query server")
	}

	out, err := new(KeyResponse).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

// KeysBySpaceIdMethod constructs QueryKeysBySpaceIdRequest from args, passes it to query server and packs response into corresponding abi output.
func (p Precompile) KeysBySpaceIdMethod(
	ctx sdk.Context,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	req, err := newKeysBySpaceIdRequest(method, args)
	if err != nil {
		return nil, err
	}

	response, err := p.queryServer.KeysBySpaceId(ctx, req)
	if err != nil {
		return nil, err
	}

	if response == nil {
		return nil, errors.New("received nil response from query server")
	}

	out, err := new(keysOutput).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

// KeyRequestMethod constructs QueryKeyRequestByIdRequest from args, passes it to query server and packs response into corresponding abi output.
func (p Precompile) KeyRequestMethod(
	ctx sdk.Context,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	req, err := newKeyRequestByIdRequest(method, args)
	if err != nil {
		return nil, err
	}

	response, err := p.queryServer.KeyRequestById(ctx, req)
	if err != nil {
		return nil, err
	}

	if response == nil {
		return nil, errors.New("received nil response from query server")
	}

	out, err := new(KeyRequest).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

// KeyRequestsMethod constructs QueryKeyRequestsRequest from args, passes it to query server and packs response into corresponding abi output.
func (p Precompile) KeyRequestsMethod(
	ctx sdk.Context,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	req, err := newKeyRequestsRequest(method, args)
	if err != nil {
		return nil, err
	}

	response, err := p.queryServer.KeyRequests(ctx, req)
	if err != nil {
		return nil, err
	}

	if response == nil {
		return nil, errors.New("received nil response from query server")
	}

	out, err := new(keyRequestsOutput).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

// KeychainMethod constructs QueryKeychainByIdRequest from args, passes it to query server and packs response into corresponding abi output.
func (p Precompile) KeychainMethod(
	ctx sdk.Context,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	req, err := newKeychainRequest(method, args)
	if err != nil {
		return nil, err
	}

	response, err := p.queryServer.KeychainById(ctx, req)
	if err != nil {
		return nil, err
	}

	if response == nil {
		return nil, errors.New("received nil response from query server")
	}

	out, err := new(Keychain).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

// KeychainsMethod constructs QueryKeychainsRequest from args, passes it to query server and packs response into corresponding abi output.
func (p Precompile) KeychainsMethod(
	ctx sdk.Context,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	req, err := newKeychainsRequest(method, args)
	if err != nil {
		return nil, err
	}

	response, err := p.queryServer.Keychains(ctx, req)
	if err != nil {
		return nil, err
	}

	if response == nil {
		return nil, errors.New("received nil response from query server")
	}

	out, err := new(keychainsOutput).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

// SignRequestByIdMethod constructs QuerySignRequestByIdRequest from args, passes it to query server and packs response into corresponding abi output.
func (p Precompile) SignRequestByIdMethod(
	ctx sdk.Context,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	req, err := newSignRequestByIdRequest(args)
	if err != nil {
		return nil, err
	}

	response, err := p.queryServer.SignRequestById(ctx, req)
	if err != nil {
		return nil, err
	}

	if response == nil {
		return nil, errors.New("received nil response from query server")
	}

	out, err := new(SignRequest).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

// SignRequestsMethod constructs QuerySignRequestsRequest from args, passes it to query server and packs response into corresponding abi output.
func (p Precompile) SignRequestsMethod(
	ctx sdk.Context,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	req, err := newSignRequestsRequest(method, args)
	if err != nil {
		return nil, err
	}

	response, err := p.queryServer.SignRequests(ctx, req)
	if err != nil {
		return nil, err
	}

	if response == nil {
		return nil, errors.New("received nil response from query server")
	}

	out, err := new(signRequestsOutput).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

// SpaceByIdMethod constructs QuerySpaceByIdRequest from args, passes it to query server and packs response into corresponding abi output.
func (p Precompile) SpaceByIdMethod(
	ctx sdk.Context,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	req, err := newSpaceByIdRequest(args)
	if err != nil {
		return nil, err
	}

	response, err := p.queryServer.SpaceById(ctx, req)
	if err != nil {
		return nil, err
	}

	if response == nil {
		return nil, errors.New("received nil response from query server")
	}

	out, err := new(Space).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

// SpacesMethod constructs QuerySpacesRequest from args, passes it to query server and packs response into corresponding abi output.
func (p Precompile) SpacesMethod(
	ctx sdk.Context,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	req, err := newSpacesRequest(method, args)
	if err != nil {
		return nil, err
	}

	response, err := p.queryServer.Spaces(ctx, req)
	if err != nil {
		return nil, err
	}

	if response == nil {
		return nil, errors.New("received nil response from query server")
	}

	out, err := new(spacesOutput).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

// SpacesByOwnerMethod constructs QuerySpacesByOwnerRequest from args, passes it to query server and packs response into corresponding abi output.
func (p Precompile) SpacesByOwnerMethod(
	ctx sdk.Context,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	req, err := newSpacesByOwnerRequest(method, args)
	if err != nil {
		return nil, err
	}

	response, err := p.queryServer.SpacesByOwner(ctx, req)
	if err != nil {
		return nil, err
	}

	if response == nil {
		return nil, errors.New("received nil response from query server")
	}

	out, err := new(spacesOutput).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}
