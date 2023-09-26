// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:LGPL-3.0-only

package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/common"

	"github.com/qredo/fusionchain/x/revenue/v1/types"
)

// GetRevenues returns all registered Revenues.
func (k Keeper) GetRevenues(ctx sdk.Context) []types.Revenue {
	revenues := []types.Revenue{}

	store := ctx.KVStore(k.storeKey)
	iterator := sdk.KVStorePrefixIterator(store, types.KeyPrefixRevenue)
	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var revenue types.Revenue
		k.cdc.MustUnmarshal(iterator.Value(), &revenue)

		revenues = append(revenues, revenue)
	}

	return revenues
}

// IterateRevenues iterates over all registered contracts and performs a
// callback with the corresponding Revenue.
func (k Keeper) IterateRevenues(
	ctx sdk.Context,
	handlerFn func(fee types.Revenue) (stop bool),
) {
	store := ctx.KVStore(k.storeKey)
	iterator := sdk.KVStorePrefixIterator(store, types.KeyPrefixRevenue)
	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var revenue types.Revenue
		k.cdc.MustUnmarshal(iterator.Value(), &revenue)

		if handlerFn(revenue) {
			break
		}
	}
}

// GetRevenue returns the Revenue for a registered contract
func (k Keeper) GetRevenue(
	ctx sdk.Context,
	contract common.Address,
) (types.Revenue, bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefixRevenue)
	bz := store.Get(contract.Bytes())
	if len(bz) == 0 {
		return types.Revenue{}, false
	}

	var revenue types.Revenue
	k.cdc.MustUnmarshal(bz, &revenue)
	return revenue, true
}

// SetRevenue stores the Revenue for a registered contract.
func (k Keeper) SetRevenue(ctx sdk.Context, revenue types.Revenue) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefixRevenue)
	key := revenue.GetContractAddr()
	bz := k.cdc.MustMarshal(&revenue)
	store.Set(key.Bytes(), bz)
}

// DeleteRevenue deletes a Revenue of a registered contract.
func (k Keeper) DeleteRevenue(ctx sdk.Context, fee types.Revenue) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefixRevenue)
	key := fee.GetContractAddr()
	store.Delete(key.Bytes())
}

// SetDeployerMap stores a contract-by-deployer mapping
func (k Keeper) SetDeployerMap(
	ctx sdk.Context,
	deployer sdk.AccAddress,
	contract common.Address,
) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefixDeployer)
	key := append(deployer.Bytes(), contract.Bytes()...)
	store.Set(key, []byte{1})
}

// DeleteDeployerMap deletes a contract-by-deployer mapping
func (k Keeper) DeleteDeployerMap(
	ctx sdk.Context,
	deployer sdk.AccAddress,
	contract common.Address,
) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefixDeployer)
	key := append(deployer.Bytes(), contract.Bytes()...)
	store.Delete(key)
}

// SetWithdrawerMap stores a contract-by-withdrawer mapping
func (k Keeper) SetWithdrawerMap(
	ctx sdk.Context,
	withdrawer sdk.AccAddress,
	contract common.Address,
) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefixWithdrawer)
	key := append(withdrawer.Bytes(), contract.Bytes()...)
	store.Set(key, []byte{1})
}

// DeleteWithdrawMap deletes a contract-by-withdrawer mapping
func (k Keeper) DeleteWithdrawerMap(
	ctx sdk.Context,
	withdrawer sdk.AccAddress,
	contract common.Address,
) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefixWithdrawer)
	key := append(withdrawer.Bytes(), contract.Bytes()...)
	store.Delete(key)
}

// IsRevenueRegistered checks if a contract was registered for receiving
// transaction fees
func (k Keeper) IsRevenueRegistered(
	ctx sdk.Context,
	contract common.Address,
) bool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefixRevenue)
	return store.Has(contract.Bytes())
}

// IsDeployerMapSet checks if a given contract-by-withdrawer mapping is set in
// store
func (k Keeper) IsDeployerMapSet(
	ctx sdk.Context,
	deployer sdk.AccAddress,
	contract common.Address,
) bool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefixDeployer)
	key := append(deployer.Bytes(), contract.Bytes()...)
	return store.Has(key)
}

// IsWithdrawerMapSet checks if a giveb contract-by-withdrawer mapping is set in
// store
func (k Keeper) IsWithdrawerMapSet(
	ctx sdk.Context,
	withdrawer sdk.AccAddress,
	contract common.Address,
) bool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefixWithdrawer)
	key := append(withdrawer.Bytes(), contract.Bytes()...)
	return store.Has(key)
}
