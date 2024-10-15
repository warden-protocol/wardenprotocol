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

var ethEventsRegistry = EthEventsRegistry{
	p: make(map[string]EthEventProvider),
}

func (r *EthEventsRegistry) RegisterEvent(eventType string, ethEventProvider EthEventProvider) {
	r.p[eventType] = ethEventProvider
}

func (r *EthEventsRegistry) GetEthEvent(ctx sdk.Context, eventType string, address *ethcmn.Address, sdkEvent sdk.Event) (*ethtypes.Log, error) {
	if provider, ok := r.p[eventType]; ok {
		return provider(ctx, address, sdkEvent)
	}

	return nil, nil
}

func GetEthEventsRegistry() EthEventsRegistry {
	return ethEventsRegistry
}

func EmitEvents(ctx sdk.Context, stateDB vm.StateDB, address *ethcmn.Address) error {
	for _, x := range ctx.EventManager().Events() {
		// TODO: check type, contract that .sol Event name should match with sdk Event name
		// fmt.Printf("\nx.Type %v, eventName %v\n", x.Type, eventName)
		// x.Type warden.act.v1beta1.EventCreateTemplate, eventName CreateTemplate

		log, err := ethEventsRegistry.GetEthEvent(ctx, x.Type, address, x)
		if err != nil {
			return err
		}
		if log != nil {
			stateDB.AddLog(log)
		}
	}

	return nil
}
