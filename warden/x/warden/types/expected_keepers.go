package types

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"

	acttypes "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
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

// ActKeeper defined the expected interface for the Act module.
type ActKeeper interface {
	GetRule(ctx context.Context, id uint64) (acttypes.Rule, error)
	GetActionCreator(ctx context.Context) string
	RulesRegistry() *acttypes.RulesRegistry
}

// ParamSubspace defines the expected Subspace interface for parameters.
type ParamSubspace interface {
	Get(context.Context, []byte, interface{})
	Set(context.Context, []byte, interface{})
}
