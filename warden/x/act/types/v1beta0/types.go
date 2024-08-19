package v1beta0

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	proto "github.com/cosmos/gogoproto/proto"
)

// ActionHandler is a function that gets executed when an action is ready to be
// fulfilled (i.e. it's intent has been satisfied).
// The result of the action is stored in the Result field of the Action itself.
type ActionHandler func(sdk.Context, Action) (proto.Message, error)
