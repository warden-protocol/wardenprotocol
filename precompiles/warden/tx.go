package warden

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/vm"
	cmn "github.com/evmos/evmos/v20/precompiles/common"
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

	msgAddKeychainAdmin, newAdmin, err := newMsgAddKeychainAdmin(args, origin)

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

	msgAddKeychainAdminResponse, err := msgServer.AddKeychainAdmin(ctx, msgAddKeychainAdmin)

	if err != nil {
		return nil, err
	}

	if err = p.EmitAddKeychainAdminEvent(ctx, stateDB, msgAddKeychainAdmin.KeychainId, *newAdmin, msgAddKeychainAdminResponse.AdminsCount); err != nil {
		return nil, err
	}

	return method.Outputs.Pack(msgAddKeychainAdminResponse.AdminsCount)
}

func newMsgAddKeychainAdmin(args []interface{}, origin common.Address) (*types.MsgAddKeychainAdminRequest, *common.Address, error) {
	if len(args) != 2 {
		return nil, nil, fmt.Errorf(cmn.ErrInvalidNumberOfArgs, 3, len(args))
	}

	bech32StrFromAddress := func(address common.Address) string {
		return sdk.AccAddress(address.Bytes()).String()
	}

	newAdminAddress := args[1].(common.Address)
	authority := bech32StrFromAddress(origin)
	newAdmin := bech32StrFromAddress(newAdminAddress)
	keychainId := args[0].(uint64)

	return &types.MsgAddKeychainAdminRequest{
		Authority:  authority,
		KeychainId: keychainId,
		NewAdmin:   newAdmin,
	}, &newAdminAddress, nil
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
