package app

import (
	"github.com/ethereum/go-ethereum/core/vm"

	"github.com/cosmos/evm/evmd/eips"
)

// cosmosEVMActivators defines a map of opcode modifiers associated
// with a key defining the corresponding EIP.
var cosmosEVMActivators = map[int]func(*vm.JumpTable){
	0o000: eips.Enable0000,
	0o001: eips.Enable0001,
	0o002: eips.Enable0002,
}
