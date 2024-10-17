package common

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	ethcmn "github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	"github.com/evmos/evmos/v20/x/evm/core/vm"
)

type EthEventsRegistry struct {
	p map[string]EthEventProvider
}

type EthEventProvider func(sdk.Context, *ethcmn.Address, sdk.Event) (*ethtypes.Log, error)

func (r *EthEventsRegistry) RegisterEvent(eventType string, ethEventProvider EthEventProvider) {
	r.p[eventType] = ethEventProvider
}

func (r *EthEventsRegistry) getEventProvider(eventType string) EthEventProvider {
	if provider, ok := r.p[eventType]; ok {
		return provider
	}

	return nil
}

func NewEthEventsRegistry() EthEventsRegistry {
	return EthEventsRegistry{
		p: make(map[string]EthEventProvider),
	}
}

func (r *EthEventsRegistry) EmitEvents(ctx sdk.Context, stateDB vm.StateDB, address *ethcmn.Address) error {
	for _, x := range ctx.EventManager().Events() {
		if provider := r.getEventProvider(x.Type); provider != nil {
			log, err := provider(ctx, address, x)
			if err != nil {
				return err
			}
			if log != nil {
				stateDB.AddLog(log)
			}
		}
	}

	return nil
}
