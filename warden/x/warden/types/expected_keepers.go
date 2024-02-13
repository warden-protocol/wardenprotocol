package types

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/wardenprotocol/warden/intent"
	intenttypes "github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
)

// AccountKeeper defines the expected interface for the Account module.
type AccountKeeper interface {
	GetAccount(context.Context, sdk.AccAddress) sdk.AccountI // only used for simulation
	// Methods imported from account should be defined here
}

// BankKeeper defines the expected interface for the Bank module.
type BankKeeper interface {
	SendCoins(ctx context.Context, fromAddr, toAddr sdk.AccAddress, amt sdk.Coins) error
	// Methods imported from bank should be defined here
}

// IntentKeeper defined the expected interface for the Intent module.
type IntentKeeper interface {
	AddAction(ctx sdk.Context, creator string, msg sdk.Msg, intentID, btl uint64) (*intenttypes.Action, error)
	CheckActionReady(ctx sdk.Context, act intenttypes.Action, payload *intent.IntentPayload) (bool, error)

	GetIntent(ctx sdk.Context, id uint64) (intenttypes.Intent, error)

	RegisterIntentGeneratorHandler(reqType string, handlerFn intenttypes.IntentGenerator)
	RegisterActionHandler(actionType string, handlerFn intenttypes.ActionHandler)
}

// ParamSubspace defines the expected Subspace interface for parameters.
type ParamSubspace interface {
	Get(context.Context, []byte, interface{})
	Set(context.Context, []byte, interface{})
}
