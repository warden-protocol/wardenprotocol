package types

import (
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	proto "github.com/cosmos/gogoproto/proto"

	"github.com/warden-protocol/wardenprotocol/warden/intent"
)

// ActionHandler is a function that gets executed when an action is ready to be
// fulfilled (i.e. it's intent has been satisfied).
// The result of the action is stored in the Result field of the Action itself.
type ActionHandler func(sdk.Context, Action, *codectypes.Any) (proto.Message, error)

// IntentGenerator is a function that dynamically generates an intent for an action.
//
// An Action can be created without a specific user-defined intent, in which
// case the intent will be generated dynamically when the action is created.
type IntentGenerator func(sdk.Context, Action) (intent.Intent, error)
