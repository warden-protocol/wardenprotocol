package common

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	ethcmn "github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
)

type EthEventsRegistry struct {
	p map[string]EthEventProvider
}

type EthEventProvider func(sdk.Context, *ethcmn.Address, sdk.Msg) (*ethtypes.Log, error)

func (r *EthEventsRegistry) RegisterEvent(msgType string, ethEventProvider EthEventProvider) {
	r.p[msgType] = ethEventProvider
}

var ethEventsRegistry = EthEventsRegistry{
	p: make(map[string]EthEventProvider),
}

func GetEthEventsRegistry() EthEventsRegistry {
	return ethEventsRegistry
}
