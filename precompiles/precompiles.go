package precompiles

import (
	evmcmn "github.com/cosmos/evm/precompiles/common"
	evmkeeper "github.com/cosmos/evm/x/vm/keeper"
	ethcmn "github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/vm"

	oraclekeeper "github.com/warden-protocol/connect/x/oracle/keeper"

	cmn "github.com/warden-protocol/wardenprotocol/precompiles/common"
	jsonprecompile "github.com/warden-protocol/wardenprotocol/precompiles/json"
	slinkyprecompile "github.com/warden-protocol/wardenprotocol/precompiles/slinky"
)

func WardenPrecompilesAddresses() []string {
	return []string{
		slinkyprecompile.PrecompileAddress,
		jsonprecompile.PrecompileAddress,
	}
}

// NewWardenPrecompiles initializes all Warden Protocol precompiles and the events registry.
func NewWardenPrecompiles(
	bankKeeper evmcmn.BankKeeper,
	oraclekeeper oraclekeeper.Keeper,
	evmKeeper *evmkeeper.Keeper,
) (map[ethcmn.Address]vm.PrecompiledContract, error) {
	precompiles := make(map[ethcmn.Address]vm.PrecompiledContract)
	eventsRegistry := cmn.NewEthEventsRegistry()

	newSlinkyPrecompile := slinkyprecompile.NewPrecompile(oraclekeeper, eventsRegistry)
	precompiles[newSlinkyPrecompile.Address()] = newSlinkyPrecompile

	newJsonPrecompile := jsonprecompile.NewPrecompile(cmn.NewAbiEncoder())
	precompiles[newJsonPrecompile.Address()] = newJsonPrecompile

	return precompiles, nil
}
