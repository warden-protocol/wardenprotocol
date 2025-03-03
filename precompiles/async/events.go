package async

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	evmoscmn "github.com/evmos/evmos/v20/precompiles/common"

	ethcmn "github.com/ethereum/go-ethereum/common"

	"github.com/warden-protocol/wardenprotocol/precompiles/common"
	"github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

const (
	// EventCreateFuture defines the event type for the x/async CreateFuture transaction.
	EventCreateFuture = "CreateFuture"
)

// GetCreateFutureEvent Map EventCreateFuture to eth CreateFuture event and write to eth log
func (p *Precompile) GetCreateFutureEvent(ctx sdk.Context, writerAddress *ethcmn.Address, sdkEvent sdk.Event) (*ethtypes.Log, error) {
	var err error
	event := p.ABI.Events[EventCreateFuture]

	topics := make([]ethcmn.Hash, 3)
	topics[0] = event.ID

	typedEvent := v1beta1.EventCreateFuture{}
	if err = common.ParseSdkEvent(sdkEvent, typedEvent.XXX_Merge); err != nil {
		return nil, err
	}

	var callbackAddress ethcmn.Address
	if typedEvent.GetCallbackAddress() == "" {
		callbackAddress = ethcmn.HexToAddress("0x0000000000000000000000000000000000000000")
	} else {
		callbackAddress, err = common.AddressFromBech32Str(typedEvent.GetCallbackAddress())
	}

	if err != nil {
		return nil, err
	}

	packed, err := event.Inputs.NonIndexed().Pack(
		typedEvent.GetHandler(),
		callbackAddress,
	)
	if err != nil {
		return nil, err
	}

	creatorAddress, err := common.AddressFromBech32Str(typedEvent.GetCreator())
	if err != nil {
		return nil, err
	}

	topics[1], err = evmoscmn.MakeTopic(typedEvent.GetId())
	if err != nil {
		return nil, err
	}

	topics[2], err = evmoscmn.MakeTopic(creatorAddress)
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
