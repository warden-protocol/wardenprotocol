package types

import (
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/wardenprotocol/warden/intent"
)

// ActionHandler is a function that gets executed when an action is ready to be
// fulfilled (i.e. it's intent has been satisfied).
type ActionHandler func(sdk.Context, Action, *codectypes.Any) (any, error)

// IntentGenerator is a function that dynamically generates an intent for an action.
//
// An Action can be created without a specific user-defined intent, in which
// case the intent will be generated dynamically when the action is created.
type IntentGenerator func(sdk.Context, Action) (intent.Intent, error)
