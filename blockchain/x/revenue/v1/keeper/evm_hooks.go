// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:LGPL-3.0-only

package keeper

import (
	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/core"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	// "golang.org/x/exp/slices"

	evmtypes "github.com/evmos/ethermint/x/evm/types"

	"github.com/qredo/fusionchain/x/revenue/v1/types"
)

var _ evmtypes.EvmHooks = Hooks{}

// Hooks wrapper struct for fees keeper
type Hooks struct {
	k Keeper
}

// Hooks return the wrapper hooks struct for the Keeper
func (k Keeper) Hooks() Hooks {
	return Hooks{k}
}

// PostTxProcessing is a wrapper for calling the EVM PostTxProcessing hook on
// the module keeper
func (h Hooks) PostTxProcessing(ctx sdk.Context, msg core.Message, receipt *ethtypes.Receipt) error {
	return h.k.PostTxProcessing(ctx, msg, receipt)
}

// PostTxProcessing implements EvmHooks.PostTxProcessing. After each successful
// interaction with a registered contract, the contract deployer (or, if set,
// the withdraw address) receives a share from the transaction fees paid by the
// transaction sender.
func (k Keeper) PostTxProcessing(
	ctx sdk.Context,
	msg core.Message,
	receipt *ethtypes.Receipt,
) error {
	contract := msg.To()
	if contract == nil {
		return nil
	}

	// check if the fees are globally enabled or if the
	// developer shares are set to zero
	params := k.GetParams(ctx)
	if !params.EnableRevenue || params.DeveloperShares.IsZero() {
		return nil
	}

	// evmParams := k.evmKeeper.GetParams(ctx)

	var withdrawer sdk.AccAddress
	// containsPrecompile := slices.Contains(evmParams.ActivePrecompiles, contract.String())
	// if the contract is not a precompile, check if the contract is registered in the revenue module.
	// else, return and avoid performing unnecessary logic
	// if !containsPrecompile {
	// if the contract is not registered to receive fees, do nothing
	revenue, found := k.GetRevenue(ctx, *contract)
	if !found {
		return nil
	}

	withdrawer = revenue.GetWithdrawerAddr()
	if len(withdrawer) == 0 {
		withdrawer = revenue.GetDeployerAddr()
	}
	// }

	// calculate fees to be paid
	txFee := sdk.NewIntFromUint64(receipt.GasUsed).Mul(sdk.NewIntFromBigInt(msg.GasPrice()))
	developerFee := (params.DeveloperShares).MulInt(txFee).TruncateInt()
	evmDenom := k.evmKeeper.GetParams(ctx).EvmDenom
	fees := sdk.Coins{{Denom: evmDenom, Amount: developerFee}}

	// get available precompiles from evm params and check if contract is in the list
	// if containsPrecompile {
	// 	if err := k.distributionKeeper.FundCommunityPool(ctx, fees, k.accountKeeper.GetModuleAddress(k.feeCollectorName)); err != nil {
	// 		return err
	// 	}
	// } else {
	// distribute the fees to the contract deployer / withdraw address
	err := k.bankKeeper.SendCoinsFromModuleToAccount(
		ctx,
		k.feeCollectorName,
		withdrawer,
		fees,
	)
	if err != nil {
		return errorsmod.Wrapf(
			err,
			"fee collector account failed to distribute developer fees (%s) to withdraw address %s. contract %s",
			fees, withdrawer, contract,
		)
	}
	// }

	ctx.EventManager().EmitEvents(
		sdk.Events{
			sdk.NewEvent(
				types.EventTypeDistributeDevRevenue,
				sdk.NewAttribute(sdk.AttributeKeySender, msg.From().String()),
				sdk.NewAttribute(types.AttributeKeyContract, contract.String()),
				sdk.NewAttribute(types.AttributeKeyWithdrawerAddress, withdrawer.String()),
				sdk.NewAttribute(sdk.AttributeKeyAmount, developerFee.String()),
			),
		},
	)

	return nil
}
