// Copyright 2023 Qredo Ltd.
// This file is part of the Fusion library.
//
// The Fusion library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Fusion library. If not, see https://github.com/qredo/fusionchain/blob/main/LICENSE
package keeper

import (
	"context"

	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	errortypes "github.com/cosmos/cosmos-sdk/types/errors"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"

	"github.com/qredo/fusionchain/x/revenue/v1/types"
)

var _ types.MsgServer = &Keeper{}

// RegisterRevenue registers a contract to receive transaction fees
func (k Keeper) RegisterRevenue(
	goCtx context.Context,
	msg *types.MsgRegisterRevenue,
) (*types.MsgRegisterRevenueResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	params := k.GetParams(ctx)
	if !params.EnableRevenue {
		return nil, types.ErrRevenueDisabled
	}

	contract := common.HexToAddress(msg.ContractAddress)

	if k.IsRevenueRegistered(ctx, contract) {
		return nil, errorsmod.Wrapf(
			types.ErrRevenueAlreadyRegistered,
			"contract is already registered %s", contract,
		)
	}

	deployer := sdk.MustAccAddressFromBech32(msg.DeployerAddress)
	deployerAccount := k.evmKeeper.GetAccountWithoutBalance(ctx, common.BytesToAddress(deployer))
	if deployerAccount == nil {
		return nil, errorsmod.Wrapf(
			errortypes.ErrNotFound,
			"deployer account not found %s", msg.DeployerAddress,
		)
	}

	if deployerAccount.IsContract() {
		return nil, errorsmod.Wrapf(
			types.ErrRevenueDeployerIsNotEOA,
			"deployer cannot be a contract %s", msg.DeployerAddress,
		)
	}

	// contract must already be deployed, to avoid spam registrations
	contractAccount := k.evmKeeper.GetAccountWithoutBalance(ctx, contract)

	if contractAccount == nil || !contractAccount.IsContract() {
		return nil, errorsmod.Wrapf(
			types.ErrRevenueNoContractDeployed,
			"no contract code found at address %s", msg.ContractAddress,
		)
	}

	var withdrawer sdk.AccAddress
	if msg.WithdrawerAddress != "" && msg.WithdrawerAddress != msg.DeployerAddress {
		withdrawer = sdk.MustAccAddressFromBech32(msg.WithdrawerAddress)
	}

	derivedContract := common.BytesToAddress(deployer)

	// the contract can be directly deployed by an EOA or created through one
	// or more factory contracts. If it was deployed by an EOA account, then
	// msg.Nonces contains the EOA nonce for the deployment transaction.
	// If it was deployed by one or more factories, msg.Nonces contains the EOA
	// nonce for the origin factory contract, then the nonce of the factory
	// for the creation of the next factory/contract.
	for _, nonce := range msg.Nonces {
		ctx.GasMeter().ConsumeGas(
			params.AddrDerivationCostCreate,
			"revenue registration: address derivation CREATE opcode",
		)

		derivedContract = crypto.CreateAddress(derivedContract, nonce)
	}

	if contract != derivedContract {
		return nil, errorsmod.Wrapf(
			errortypes.ErrorInvalidSigner,
			"not contract deployer or wrong nonce: expected %s instead of %s",
			derivedContract, msg.ContractAddress,
		)
	}

	// prevent storing the same address for deployer and withdrawer
	revenue := types.NewRevenue(contract, deployer, withdrawer)
	k.SetRevenue(ctx, revenue)
	k.SetDeployerMap(ctx, deployer, contract)

	// The effective withdrawer is the withdraw address that is stored after the
	// revenue registration is completed. It defaults to the deployer address if
	// the withdraw address in the msg is omitted. When omitted, the withdraw map
	// dosn't need to be set.
	effectiveWithdrawer := msg.DeployerAddress

	if len(withdrawer) != 0 {
		k.SetWithdrawerMap(ctx, withdrawer, contract)
		effectiveWithdrawer = msg.WithdrawerAddress
	}

	k.Logger(ctx).Debug(
		"registering contract for transaction fees",
		"contract", msg.ContractAddress, "deployer", msg.DeployerAddress,
		"withdraw", effectiveWithdrawer,
	)

	ctx.EventManager().EmitEvents(
		sdk.Events{
			sdk.NewEvent(
				types.EventTypeRegisterRevenue,
				sdk.NewAttribute(sdk.AttributeKeySender, msg.DeployerAddress),
				sdk.NewAttribute(types.AttributeKeyContract, msg.ContractAddress),
				sdk.NewAttribute(types.AttributeKeyWithdrawerAddress, effectiveWithdrawer),
			),
		},
	)

	return &types.MsgRegisterRevenueResponse{}, nil
}

// UpdateRevenue updates the withdraw address of a given Revenue. If the given
// withdraw address is empty or the same as the deployer address, the withdraw
// address is removed.
func (k Keeper) UpdateRevenue(
	goCtx context.Context,
	msg *types.MsgUpdateRevenue,
) (*types.MsgUpdateRevenueResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	params := k.GetParams(ctx)
	if !params.EnableRevenue {
		return nil, types.ErrRevenueDisabled
	}

	contract := common.HexToAddress(msg.ContractAddress)
	revenue, found := k.GetRevenue(ctx, contract)
	if !found {
		return nil, errorsmod.Wrapf(
			types.ErrRevenueContractNotRegistered,
			"contract %s is not registered", msg.ContractAddress,
		)
	}

	// error if the msg deployer address is not the same as the fee's deployer
	if msg.DeployerAddress != revenue.DeployerAddress {
		return nil, errorsmod.Wrapf(
			errortypes.ErrUnauthorized,
			"%s is not the contract deployer", msg.DeployerAddress,
		)
	}

	// check if updating revenue to default withdrawer
	if msg.WithdrawerAddress == revenue.DeployerAddress {
		msg.WithdrawerAddress = ""
	}

	// revenue with the given withdraw address is already registered
	if msg.WithdrawerAddress == revenue.WithdrawerAddress {
		return nil, errorsmod.Wrapf(
			types.ErrRevenueAlreadyRegistered,
			"revenue with withdraw address %s", msg.WithdrawerAddress,
		)
	}

	// only delete withdrawer map if is not default
	if revenue.WithdrawerAddress != "" {
		k.DeleteWithdrawerMap(ctx, sdk.MustAccAddressFromBech32(revenue.WithdrawerAddress), contract)
	}

	// only add withdrawer map if new entry is not default
	if msg.WithdrawerAddress != "" {
		k.SetWithdrawerMap(
			ctx,
			sdk.MustAccAddressFromBech32(msg.WithdrawerAddress),
			contract,
		)
	}
	// update revenue
	revenue.WithdrawerAddress = msg.WithdrawerAddress
	k.SetRevenue(ctx, revenue)

	ctx.EventManager().EmitEvents(
		sdk.Events{
			sdk.NewEvent(
				types.EventTypeUpdateRevenue,
				sdk.NewAttribute(types.AttributeKeyContract, msg.ContractAddress),
				sdk.NewAttribute(sdk.AttributeKeySender, msg.DeployerAddress),
				sdk.NewAttribute(types.AttributeKeyWithdrawerAddress, msg.WithdrawerAddress),
			),
		},
	)

	return &types.MsgUpdateRevenueResponse{}, nil
}

// CancelRevenue deletes the Revenue for a given contract
func (k Keeper) CancelRevenue(
	goCtx context.Context,
	msg *types.MsgCancelRevenue,
) (*types.MsgCancelRevenueResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	params := k.GetParams(ctx)
	if !params.EnableRevenue {
		return nil, types.ErrRevenueDisabled
	}

	contract := common.HexToAddress(msg.ContractAddress)

	fee, found := k.GetRevenue(ctx, contract)
	if !found {
		return nil, errorsmod.Wrapf(
			types.ErrRevenueContractNotRegistered,
			"contract %s is not registered", msg.ContractAddress,
		)
	}

	if msg.DeployerAddress != fee.DeployerAddress {
		return nil, errorsmod.Wrapf(
			errortypes.ErrUnauthorized,
			"%s is not the contract deployer", msg.DeployerAddress,
		)
	}

	k.DeleteRevenue(ctx, fee)
	k.DeleteDeployerMap(
		ctx,
		fee.GetDeployerAddr(),
		contract,
	)

	// delete entry from withdrawer map if not default
	if fee.WithdrawerAddress != "" {
		k.DeleteWithdrawerMap(
			ctx,
			fee.GetWithdrawerAddr(),
			contract,
		)
	}

	ctx.EventManager().EmitEvents(
		sdk.Events{
			sdk.NewEvent(
				types.EventTypeCancelRevenue,
				sdk.NewAttribute(sdk.AttributeKeySender, msg.DeployerAddress),
				sdk.NewAttribute(types.AttributeKeyContract, msg.ContractAddress),
			),
		},
	)

	return &types.MsgCancelRevenueResponse{}, nil
}

// UpdateParams implements the gRPC MsgServer interface. When an UpdateParams
// proposal passes, it updates the module parameters. The update can only be
// performed if the requested authority is the Cosmos SDK governance module
// account.
func (k *Keeper) UpdateParams(goCtx context.Context, req *types.MsgUpdateParams) (*types.MsgUpdateParamsResponse, error) {
	if k.authority.String() != req.Authority {
		return nil, errorsmod.Wrapf(govtypes.ErrInvalidSigner, "invalid authority; expected %s, got %s", k.authority.String(), req.Authority)
	}

	ctx := sdk.UnwrapSDKContext(goCtx)
	if err := k.SetParams(ctx, req.Params); err != nil {
		return nil, err
	}

	return &types.MsgUpdateParamsResponse{}, nil
}
