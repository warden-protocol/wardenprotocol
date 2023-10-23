package main

import (
	ethermint "github.com/evmos/ethermint/x/evm/types"

	fusionchain "github.com/qredo/fusionchain/types"
)

func init() {
	// TODO there is probably another way to do it but it works for now - Tangui
	ethermint.DefaultEVMDenom = fusionchain.AttoPhoton
}
