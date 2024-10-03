// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/evmos/blob/main/LICENSE)

package keeper

import (
	addresscodec "cosmossdk.io/core/address"
	storetypes "cosmossdk.io/core/store"
	"github.com/cosmos/cosmos-sdk/codec"
	stakingkeeper "github.com/cosmos/cosmos-sdk/x/staking/keeper"
	"github.com/cosmos/cosmos-sdk/x/staking/types"
)

// Keeper is a wrapper around the Cosmos SDK staking keeper.
type Keeper struct {
	*stakingkeeper.Keeper
	ak types.AccountKeeper
	bk types.BankKeeper
}

// NewKeeper creates a new staking Keeper wrapper instance.
func NewKeeper(
	cdc codec.BinaryCodec,
	storeService storetypes.KVStoreService,
	ak types.AccountKeeper,
	bk types.BankKeeper,
	authority string,
	validatorAddressCodec addresscodec.Codec,
	consensusAddressCodec addresscodec.Codec,
) *Keeper {
	return &Keeper{
		stakingkeeper.NewKeeper(cdc, storeService, ak, bk, authority, validatorAddressCodec, consensusAddressCodec),
		ak,
		bk,
	}
}
