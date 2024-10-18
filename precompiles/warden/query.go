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

	out := new(keysOutput).FromResponse(response)

	return out.Pack(method.Outputs)
}

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

	out := new(KeyResponse).FromResponse(response)

	return out.Pack(method.Outputs)
}

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

	out := new(keysOutput).FromResponse(response)

	return out.Pack(method.Outputs)
}

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

	out := new(KeyRequest).FromResponse(response)

	return out.Pack(method.Outputs)
}

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

	out := new(keyRequestsOutput).FromResponse(response)

	return out.Pack(method.Outputs)
}

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
	out := new(Keychain).FromResponse(response)

	return out.Pack(method.Outputs)
}

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
	out := new(keychainsOutput).FromResponse(response)

	return out.Pack(method.Outputs)
}

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
	out := new(SignRequest).FromResponse(response)

	return out.Pack(method.Outputs)
}

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
	out := new(signRequestsOutput).FromResponse(response)

	return out.Pack(method.Outputs)
}

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
	out := new(Space).FromResponse(response)

	return out.Pack(method.Outputs)
}

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
	out := new(spacesOutput).FromResponse(response)

	return out.Pack(method.Outputs)
}

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
	out := new(spacesOutput).FromResponse(response)

	return out.Pack(method.Outputs)
}
