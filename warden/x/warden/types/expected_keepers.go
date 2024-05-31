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

// BankKeeper defines the expected interface for the Bank module.
type BankKeeper interface {
	SendCoins(ctx context.Context, fromAddr, toAddr sdk.AccAddress, amt sdk.Coins) error
	// Methods imported from bank should be defined here
}

// IntentKeeper defined the expected interface for the Intent module.
type IntentKeeper interface {
	GetIntent(ctx context.Context, id uint64) (intenttypes.Intent, error)
	GetActionCreator(ctx context.Context) string
	IntentRegistry() *intenttypes.IntentsRegistry
}

// ParamSubspace defines the expected Subspace interface for parameters.
type ParamSubspace interface {
	Get(context.Context, []byte, interface{})
	Set(context.Context, []byte, interface{})
}
