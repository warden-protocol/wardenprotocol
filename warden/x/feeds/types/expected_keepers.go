package types

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"

	intenttypes "github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
)

// AccountKeeper defines the expected interface for the Account module.
type AccountKeeper interface {
	GetAccount(context.Context, sdk.AccAddress) sdk.AccountI // only used for simulation
	// Methods imported from account should be defined here
}

// IntentKeeper defined the expected interface for the Intent module.
type IntentKeeper interface {
	AddAction(ctx sdk.Context, creator string, msg sdk.Msg, intent intenttypes.Intent, btl uint64) (*intenttypes.Action, error)
	CheckActionReady(ctx sdk.Context, act intenttypes.Action) (bool, error)

	GetIntent(ctx sdk.Context, id uint64) (intenttypes.Intent, error)

	RegisterActionHandler(actionType string, handlerFn intenttypes.ActionHandler)
}

// ParamSubspace defines the expected Subspace interface for parameters.
type ParamSubspace interface {
	Get(context.Context, []byte, interface{})
	Set(context.Context, []byte, interface{})
}
