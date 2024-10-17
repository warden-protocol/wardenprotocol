package common

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/gogoproto/proto"
)

func ParseSdkEvent(sdkEvent sdk.Event, fillEvent func(proto.Message)) error {
	events := sdk.EmptyEvents().AppendEvent(sdkEvent).ToABCIEvents()
	event := events[0]

	msg, err := sdk.ParseTypedEvent(event)
	if err != nil {
		return err
	}

	fillEvent(msg)

	return nil
}
