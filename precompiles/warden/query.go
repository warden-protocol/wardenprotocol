package warden

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/vm"

	wardenkeeper "github.com/warden-protocol/wardenprotocol/warden/x/warden/keeper"
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
	SpacesMethodMethod    = "spaces"
	SpacesByOwnerMethod   = "spacesByOwner"
)

// allKeys query implementation
// Constructs QueryAllKeysRequest from args, passes it to query server and packs response into corresponding abi output
func (p Precompile) AllKeysMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	queryServer := wardenkeeper.NewQueryServerImpl(p.wardenkeeper)

	req, err := newAllKeysRequest(method, args)

	if err != nil {
		return nil, err
	}

	response, err := queryServer.AllKeys(ctx, req)

	if err != nil {
		return nil, err
	}

	out, err := new(keysOutput).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

// keyById query implementation
// Constructs QueryKeyByIdRequest from args, passes it to query server and packs response into corresponding abi output
func (p Precompile) KeyByIdMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	queryServer := wardenkeeper.NewQueryServerImpl(p.wardenkeeper)

	req, err := newKeyByIdRequest(method, args)

	if err != nil {
		return nil, err
	}

	response, err := queryServer.KeyById(ctx, req)

	if err != nil {
		return nil, err
	}

	out, err := new(KeyResponse).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

// keysBySpaceId query implementation
// Constructs QueryKeyByIdRequest from args, passes it to query server and packs response into corresponding abi output
func (p Precompile) KeysBySpaceIdMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	queryServer := wardenkeeper.NewQueryServerImpl(p.wardenkeeper)

	req, err := newKeysBySpaceIdRequest(method, args)

	if err != nil {
		return nil, err
	}

	response, err := queryServer.KeysBySpaceId(ctx, req)

	if err != nil {
		return nil, err
	}

	out, err := new(keysOutput).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

// keyRequestById query implementation
// Constructs QueryKeyRequestByIdRequest from args, passes it to query server and packs response into corresponding abi output
func (p Precompile) KeyRequestMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	queryServer := wardenkeeper.NewQueryServerImpl(p.wardenkeeper)

	req, err := newKeyRequestByIdRequest(method, args)

	if err != nil {
		return nil, err
	}
	response, err := queryServer.KeyRequestById(ctx, req)

	if err != nil {
		return nil, err
	}

	out, err := new(KeyRequest).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

// keyRequests query implementation
// Constructs QueryKeyRequestsRequest from args, passes it to query server and packs response into corresponding abi output
func (p Precompile) KeyRequestsMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	queryServer := wardenkeeper.NewQueryServerImpl(p.wardenkeeper)

	req, err := newKeyRequestsRequest(method, args)

	if err != nil {
		return nil, err
	}
	response, err := queryServer.KeyRequests(ctx, req)

	if err != nil {
		return nil, err
	}

	out, err := new(keyRequestsOutput).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

// keychainById query implementation
// Constructs QueryKeychainByIdRequest from args, passes it to query server and packs response into corresponding abi output
func (p Precompile) KeychainMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	queryServer := wardenkeeper.NewQueryServerImpl(p.wardenkeeper)

	req, err := newKeychainRequest(method, args)

	if err != nil {
		return nil, err
	}
	response, err := queryServer.KeychainById(ctx, req)

	if err != nil {
		return nil, err
	}
	out, err := new(Keychain).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

// keychains query implementation
// Constructs QueryKeychainsRequest from args, passes it to query server and packs response into corresponding abi output
func (p Precompile) KeychainsMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	queryServer := wardenkeeper.NewQueryServerImpl(p.wardenkeeper)

	req, err := newKeychainsRequest(method, args)

	if err != nil {
		return nil, err
	}
	response, err := queryServer.Keychains(ctx, req)

	if err != nil {
		return nil, err
	}
	out, err := new(keychainsOutput).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

// signRequestById query implementation
// Constructs QuerySignRequestByIdResponse from args, passes it to query server and packs response into corresponding abi output
func (p Precompile) SignRequestByIdMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	queryServer := wardenkeeper.NewQueryServerImpl(p.wardenkeeper)

	req, err := newSignRequestByIdRequest(args)

	if err != nil {
		return nil, err
	}
	response, err := queryServer.SignRequestById(ctx, req)

	if err != nil {
		return nil, err
	}
	out, err := new(SignRequest).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

// signRequests query implementation
// Constructs QuerySignRequestsRequest from args, passes it to query server and packs response into corresponding abi output
func (p Precompile) SignRequestsMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	queryServer := wardenkeeper.NewQueryServerImpl(p.wardenkeeper)

	req, err := newSignRequestsRequest(method, args)

	if err != nil {
		return nil, err
	}
	response, err := queryServer.SignRequests(ctx, req)

	if err != nil {
		return nil, err
	}
	out, err := new(signRequestsOutput).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

// spaceById query implementation
// Constructs QuerySpaceByIdRequest from args, passes it to query server and packs response into corresponding abi output
func (p Precompile) SpaceByIdMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	queryServer := wardenkeeper.NewQueryServerImpl(p.wardenkeeper)

	req, err := newSpaceByIdRequest(method, args)

	if err != nil {
		return nil, err
	}
	response, err := queryServer.SpaceById(ctx, req)

	if err != nil {
		return nil, err
	}
	out, err := new(Space).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

// spaces query implementation
// Constructs QuerySpacesRequest from args, passes it to query server and packs response into corresponding abi output
func (p Precompile) SpacesMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	queryServer := wardenkeeper.NewQueryServerImpl(p.wardenkeeper)

	req, err := newSpacesRequest(method, args)

	if err != nil {
		return nil, err
	}
	response, err := queryServer.Spaces(ctx, req)

	if err != nil {
		return nil, err
	}
	out, err := new(spacesOutput).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

// spacesByOwner query implementation
// Constructs QuerySpacesByOwnerRequest from args, passes it to query server and packs response into corresponding abi output
func (p Precompile) SpacesByOwnerMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	queryServer := wardenkeeper.NewQueryServerImpl(p.wardenkeeper)

	req, err := newSpacesByOwnerRequest(method, args)

	if err != nil {
		return nil, err
	}
	response, err := queryServer.SpacesByOwner(ctx, req)

	if err != nil {
		return nil, err
	}
	out, err := new(spacesOutput).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}
