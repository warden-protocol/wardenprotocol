// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:LGPL-3.0-only

package revenue

import (
	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/qredo/fusionchain/x/revenue/v1/keeper"
	"github.com/qredo/fusionchain/x/revenue/v1/types"
)

// InitGenesis import module genesis
func InitGenesis(
	ctx sdk.Context,
	k keeper.Keeper,
	data types.GenesisState,
) {
	err := k.SetParams(ctx, data.Params)
	if err != nil {
		panic(errorsmod.Wrapf(err, "failed setting params"))
	}

	for _, revenue := range data.Revenues {
		contract := revenue.GetContractAddr()
		deployer := revenue.GetDeployerAddr()
		withdrawer := revenue.GetWithdrawerAddr()

		// Set initial contracts receiving transaction fees
		k.SetRevenue(ctx, revenue)
		k.SetDeployerMap(ctx, deployer, contract)

		if len(withdrawer) != 0 {
			k.SetWithdrawerMap(ctx, withdrawer, contract)
		}
	}
}

// ExportGenesis export module state
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	return &types.GenesisState{
		Params:   k.GetParams(ctx),
		Revenues: k.GetRevenues(ctx),
	}
}
