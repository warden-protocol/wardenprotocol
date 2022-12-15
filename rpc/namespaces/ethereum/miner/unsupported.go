package miner

import (
	"errors"

	"github.com/ethereum/go-ethereum/common/hexutil"
)

// GetHashrate returns the current hashrate for local CPU miner and remote miner.
// Unsupported in Ethermint
func (api *API) GetHashrate() uint64 {
	api.logger.Debug("miner_getHashrate")
	api.logger.Debug("Unsupported rpc function: miner_getHashrate")
	return 0
}

// SetExtra sets the extra data string that is included when this miner mines a block.
// Unsupported in Ethermint
func (api *API) SetExtra(extra string) (bool, error) {
	api.logger.Debug("miner_setExtra")
	api.logger.Debug("Unsupported rpc function: miner_setExtra")
	return false, errors.New("unsupported rpc function: miner_setExtra")
}

// SetGasLimit sets the gaslimit to target towards during mining.
// Unsupported in Ethermint
func (api *API) SetGasLimit(gasLimit hexutil.Uint64) bool {
	api.logger.Debug("miner_setGasLimit")
	api.logger.Debug("Unsupported rpc function: miner_setGasLimit")
	return false
}

// Start starts the miner with the given number of threads. If threads is nil,
// the number of workers started is equal to the number of logical CPUs that are
// usable by this process. If mining is already running, this method adjust the
// number of threads allowed to use and updates the minimum price required by the
// transaction pool.
// Unsupported in Ethermint
func (api *API) Start(threads *int) error {
	api.logger.Debug("miner_start")
	api.logger.Debug("Unsupported rpc function: miner_start")
	return errors.New("unsupported rpc function: miner_start")
}

// Stop terminates the miner, both at the consensus engine level as well as at
// the block creation level.
// Unsupported in Ethermint
func (api *API) Stop() {
	api.logger.Debug("miner_stop")
	api.logger.Debug("Unsupported rpc function: miner_stop")
}
