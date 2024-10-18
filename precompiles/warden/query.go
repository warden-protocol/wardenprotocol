package warden

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
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
	req, err := newAllKeysRequest(method, args)

	if err != nil {
		return nil, err
	}

	response, err := p.wardenkeeper.AllKeys(ctx, req)

	if err != nil {
		return nil, err
	}

	out, err := new(keysOutput).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

func (p Precompile) KeyByIdMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	req, err := newKeyByIdRequest(method, args)

	if err != nil {
		return nil, err
	}

	response, err := p.wardenkeeper.KeyById(ctx, req)

	if err != nil {
		return nil, err
	}

	out, err := new(KeyResponse).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

func (p Precompile) KeysBySpaceIdMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	req, err := newKeysBySpaceIdRequest(method, args)

	if err != nil {
		return nil, err
	}

	response, err := p.wardenkeeper.KeysBySpaceId(ctx, req)

	if err != nil {
		return nil, err
	}

	out, err := new(keysOutput).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

func (p Precompile) KeyRequestMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	req, err := newKeyRequestByIdRequest(method, args)

	if err != nil {
		return nil, err
	}
	response, err := p.wardenkeeper.KeyRequestById(ctx, req)

	if err != nil {
		return nil, err
	}

	out, err := new(KeyRequest).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

func (p Precompile) KeyRequestsMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	req, err := newKeyRequestsRequest(method, args)

	if err != nil {
		return nil, err
	}
	response, err := p.wardenkeeper.KeyRequests(ctx, req)

	if err != nil {
		return nil, err
	}

	out, err := new(keyRequestsOutput).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

func (p Precompile) KeychainMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	req, err := newKeychainRequest(method, args)

	if err != nil {
		return nil, err
	}
	response, err := p.wardenkeeper.KeychainById(ctx, req)

	if err != nil {
		return nil, err
	}
	out, err := new(Keychain).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

func (p Precompile) KeychainsMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	req, err := newKeychainsRequest(method, args)

	if err != nil {
		return nil, err
	}
	response, err := p.wardenkeeper.Keychains(ctx, req)

	if err != nil {
		return nil, err
	}
	out, err := new(keychainsOutput).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

func (p Precompile) SignRequestByIdMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	req, err := newSignRequestByIdRequest(method, args)

	if err != nil {
		return nil, err
	}
	response, err := p.wardenkeeper.SignRequestById(ctx, req)

	if err != nil {
		return nil, err
	}
	out, err := new(SignRequest).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

func (p Precompile) SignRequestsMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	req, err := newSignRequestsRequest(method, args)

	if err != nil {
		return nil, err
	}
	response, err := p.wardenkeeper.SignRequests(ctx, req)

	if err != nil {
		return nil, err
	}
	out, err := new(signRequestsOutput).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

func (p Precompile) SpaceByIdMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	req, err := newSpaceByIdRequest(method, args)

	if err != nil {
		return nil, err
	}
	response, err := p.wardenkeeper.SpaceById(ctx, req)

	if err != nil {
		return nil, err
	}
	out, err := new(Space).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

func (p Precompile) SpacesMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	req, err := newSpacesRequest(method, args)

	if err != nil {
		return nil, err
	}
	response, err := p.wardenkeeper.Spaces(ctx, req)

	if err != nil {
		return nil, err
	}
	out, err := new(spacesOutput).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}

func (p Precompile) SpacesByOwnerMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	req, err := newSpacesByOwnerRequest(method, args)

	if err != nil {
		return nil, err
	}
	response, err := p.wardenkeeper.SpacesByOwner(ctx, req)

	if err != nil {
		return nil, err
	}
	out, err := new(spacesOutput).FromResponse(response)
	if err != nil {
		return nil, err
	}

	return out.Pack(method.Outputs)
}
