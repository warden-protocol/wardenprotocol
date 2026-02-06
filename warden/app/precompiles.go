package app

import (
	"fmt"

	"github.com/cosmos/cosmos-sdk/codec"
	distributionkeeper "github.com/cosmos/cosmos-sdk/x/distribution/keeper"
	govkeeper "github.com/cosmos/cosmos-sdk/x/gov/keeper"
	slashingkeeper "github.com/cosmos/cosmos-sdk/x/slashing/keeper"
	stakingkeeper "github.com/cosmos/cosmos-sdk/x/staking/keeper"
	cmn "github.com/cosmos/evm/precompiles/common"
	ics20precompile "github.com/cosmos/evm/precompiles/ics20"
	precompiletypes "github.com/cosmos/evm/precompiles/types"
	erc20Keeper "github.com/cosmos/evm/x/erc20/keeper"
	transferkeeper "github.com/cosmos/evm/x/ibc/transfer/keeper"
	evmkeeper "github.com/cosmos/evm/x/vm/keeper"
	channelkeeper "github.com/cosmos/ibc-go/v10/modules/core/04-channel/keeper"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/vm"

	oraclekeeper "github.com/warden-protocol/connect/x/oracle/keeper"

	wardenprecompiles "github.com/warden-protocol/wardenprotocol/precompiles"
)

// NewAvailableStaticPrecompiles returns the list of all available static precompiled contracts from EVM.
//
// NOTE: this should only be used during initialization of the Keeper.
func NewAvailableStaticPrecompiles(
	stakingKeeper stakingkeeper.Keeper,
	distributionKeeper distributionkeeper.Keeper,
	bankKeeper cmn.BankKeeper,
	erc20Keeper *erc20Keeper.Keeper,
	transferKeeper *transferkeeper.Keeper,
	channelKeeper *channelkeeper.Keeper,
	evmKeeper *evmkeeper.Keeper,
	govKeeper govkeeper.Keeper,
	slashingKeeper slashingkeeper.Keeper,
	oracleKeeper *oraclekeeper.Keeper,
	codec codec.Codec,
) map[common.Address]vm.PrecompiledContract {
	// init cosmos/evm precompiles
	precompiles := precompiletypes.DefaultStaticPrecompiles(
		stakingKeeper,
		distributionKeeper,
		bankKeeper,
		erc20Keeper,
		transferKeeper,
		channelKeeper,
		govKeeper,
		slashingKeeper,
		codec,
	)

	// remove ics20 precompile
	delete(precompiles, common.HexToAddress(ics20precompile.PrecompileAddress))

	// init warden precompiles
	wardenprecompiles, err := wardenprecompiles.NewWardenPrecompiles(
		bankKeeper,
		*oracleKeeper,
		evmKeeper,
	)
	if err != nil {
		panic(err)
	}

	// merge warden precompiles list
	for a, p := range wardenprecompiles {
		_, found := precompiles[a]
		if found {
			panic(fmt.Errorf("precompiles address already registered: %v", a))
		}

		precompiles[a] = p
	}

	return precompiles
}
