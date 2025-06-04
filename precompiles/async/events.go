package async

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	evmcmn "github.com/cosmos/evm/precompiles/common"
	ethcmn "github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"

	"github.com/warden-protocol/wardenprotocol/precompiles/common"
	"github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

const (
	// EventCreateTask defines the event type for the x/async CreateTask transaction.
	EventCreateTask = "CreateTask"
)

// GetCreateTaskEvent Map EventCreateTask to eth CreateTask event and write to eth log.
func (p *Precompile) GetCreateTaskEvent(ctx sdk.Context, writerAddress *ethcmn.Address, sdkEvent sdk.Event) (*ethtypes.Log, error) {
	var err error

	event := p.Events[EventCreateTask]

	topics := make([]ethcmn.Hash, 3)
	topics[0] = event.ID

	typedEvent := v1beta1.EventCreateTask{}
	if err = common.ParseSdkEvent(sdkEvent, typedEvent.XXX_Merge); err != nil {
		return nil, err
	}

	packed, err := event.Inputs.NonIndexed().Pack(
		typedEvent.GetPlugin(),
		typedEvent.GetCallbackId(),
	)
	if err != nil {
		return nil, err
	}

	creatorAddress, err := common.AddressFromBech32Str(typedEvent.GetCreator())
	if err != nil {
		return nil, err
	}

	topics[1], err = evmcmn.MakeTopic(typedEvent.GetId())
	if err != nil {
		return nil, err
	}

	topics[2], err = evmcmn.MakeTopic(creatorAddress)
	if err != nil {
		return nil, err
	}

	log := ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        packed,
		BlockNumber: uint64(ctx.BlockHeight()),
	}

	return &log, nil
}
