package common

import (
	abci "github.com/cometbft/cometbft/abci/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/gogoproto/proto"
)

// Deprecated: use ParseSdkEvent instead.
//
// Takes sdk.Event as proto msg, passes it to fillEvent.
// fillEvent should create typed event for caller.
func ParseSdkEventDeprecated(sdkEvent sdk.Event, fillEvent func(proto.Message)) error {
	return parseSdkEventSafeInternal(sdkEvent, func(msg proto.Message) error {
		fillEvent(msg)
		return nil
	})
}

// Takes sdk.Event as proto msg, passes it to fillEvent.
// fillEvent should create typed event for caller.
func parseSdkEventSafeInternal(sdkEvent sdk.Event, fillEvent func(proto.Message) error) error {
	events := sdk.EmptyEvents().AppendEvent(sdkEvent).ToABCIEvents()
	event := events[0]

	msg, err := sdk.ParseTypedEvent(event)
	if err != nil {
		return err
	}

	return fillEvent(msg)
}

func ParseSdkEvent(sdkEvent sdk.Event) (proto.Message, error) {
	return sdk.ParseTypedEvent(abci.Event{
		Type:       sdkEvent.Type,
		Attributes: sdkEvent.Attributes,
	})
}
