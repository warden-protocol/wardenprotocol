// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:LGPL-3.0-only

package keeper

import (
	"fmt"

	"github.com/cometbft/cometbft/libs/log"
	"github.com/cosmos/cosmos-sdk/codec"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/qredo/fusionchain/x/revenue/v1/types"
)

// Keeper of this module maintains collections of revenues for contracts
// registered to receive transaction fees.
type Keeper struct {
	storeKey storetypes.StoreKey
	cdc      codec.BinaryCodec
	// the address capable of executing a MsgUpdateParams message. Typically, this should be the x/gov module account.
	authority          sdk.AccAddress
	bankKeeper         types.BankKeeper
	evmKeeper          types.EVMKeeper
	accountKeeper      types.AccountKeeper
	distributionKeeper types.DistributionKeeper
	feeCollectorName   string
}

// NewKeeper creates new instances of the fees Keeper
func NewKeeper(
	storeKey storetypes.StoreKey,
	cdc codec.BinaryCodec,
	authority sdk.AccAddress,
	bk types.BankKeeper,
	dk types.DistributionKeeper,
	ak types.AccountKeeper,
	evmKeeper types.EVMKeeper,
	feeCollector string,
) Keeper {
	return Keeper{
		storeKey:           storeKey,
		cdc:                cdc,
		authority:          authority,
		bankKeeper:         bk,
		distributionKeeper: dk,
		evmKeeper:          evmKeeper,
		accountKeeper:      ak,
		feeCollectorName:   feeCollector,
	}
}

// Logger returns a module-specific logger.
func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}
