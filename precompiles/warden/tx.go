package warden

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/vm"
	cmn "github.com/evmos/evmos/v18/precompiles/common"
	wardenkeeper "github.com/warden-protocol/wardenprotocol/warden/x/warden/keeper"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

const (
	AddKeychainAdminMethod    = "addKeychainAdmin"
	AddKeychainWriterMethod   = "addKeychainWriter"
	FulfilKeyRequestMethod    = "fulfilKeyRequest"
	FulfilSignRequestMethod   = "fulfilSignRequest"
	NewKeychainMethod         = "newKeychain"
	NewSpaceMethod            = "newSpace"
	RemoveKeychainAdminMethod = "removeKeychainAdmin"
	UpdateKeychainMethod      = "updateKeychain"
)

func (p Precompile) AddKeychainAdminMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	msgServer := wardenkeeper.NewMsgServerImpl(p.wardenkeeper)

	msgAddKeychainAdmin, err := newMsgAddKeychainAdmin(args)

	if err != nil {
		return nil, err
	}

	p.Logger(ctx).Debug(
		"tx called",
		"method", method.Name,
		"args", fmt.Sprintf(
			"{ authority: %s, keyhcain_id: %d, new_admin: %s }",
			msgAddKeychainAdmin.Authority,
			msgAddKeychainAdmin.KeychainId,
			msgAddKeychainAdmin.NewAdmin,
		),
	)

	_, err = msgServer.AddKeychainAdmin(ctx, msgAddKeychainAdmin)

	if err != nil {
		return nil, err
	}

	// todo: emit event
	// if err = p.EmitAddKeychainAdminEvent(ctx, stateDB, msgAddKeychainAdmin.KeychainId, msgAddKeychainAdmin.NewAdmin); err != nil {
	// 	return nil, err
	// }

	return method.Outputs.Pack(true)
}

func newMsgAddKeychainAdmin(args []interface{}) (*types.MsgAddKeychainAdminRequest, error) {
	if len(args) != 3 {
		return nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 3, len(args))
	}

	bech32StrFromAddress := func(address common.Address) string {
		return sdk.AccAddress(address.Bytes()).String()
	}

	authority := bech32StrFromAddress(args[0].(common.Address))
	newAdmin := bech32StrFromAddress(args[2].(common.Address))

	return &types.MsgAddKeychainAdminRequest{
		Authority:  authority,
		KeychainId: args[1].(uint64),
		NewAdmin:   newAdmin,
	}, nil
}

func (p Precompile) AddKeychainWriterMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	panic("Not implemented")
}

func (p Precompile) FulfilKeyRequestMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	panic("Not implemented")
}

func (p Precompile) FulfilSignRequestMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	panic("Not implemented")
}

func (p Precompile) NewKeychainMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	panic("Not implemented")
}

func (p Precompile) NewSpaceMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	panic("Not implemented")
}

func (p Precompile) RemoveKeychainAdminMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	panic("Not implemented")
}

func (p Precompile) UpdateKeychainMethod(
	ctx sdk.Context,
	origin common.Address,
	stateDB vm.StateDB,
	method *abi.Method,
	args []interface{},
) ([]byte, error) {
	panic("Not implemented")
}
