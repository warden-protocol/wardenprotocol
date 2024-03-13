package types

import (
	"context"
	"cosmossdk.io/core/address"

	sdk "github.com/cosmos/cosmos-sdk/types"

	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	"github.com/warden-protocol/wardenprotocol/warden/intent"
	intenttypes "github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
)

// AccountKeeper defines the expected interface for the Account module.
type AccountKeeper interface {
	GetParams(ctx context.Context) (params authtypes.Params)
	GetAccount(context.Context, sdk.AccAddress) sdk.AccountI // only used for simulation
	SetAccount(ctx context.Context, acc sdk.AccountI)
	GetModuleAddress(moduleName string) sdk.AccAddress
	AddressCodec() address.Codec
}

// BankKeeper defines the expected interface for the Bank module.
type BankKeeper interface {
	IsSendEnabledCoins(ctx context.Context, coins ...sdk.Coin) error
	SendCoins(ctx context.Context, fromAddr, toAddr sdk.AccAddress, amt sdk.Coins) error
	SendCoinsFromAccountToModule(ctx context.Context, senderAddr sdk.AccAddress, recipientModule string, amt sdk.Coins) error
	BurnCoins(ctx context.Context, moduleName string, amt sdk.Coins) error
}

// FeegrantKeeper defines the expected feegrant keeper.
type FeegrantKeeper interface {
	UseGrantedFees(ctx context.Context, granter, grantee sdk.AccAddress, fee sdk.Coins, msgs []sdk.Msg) error
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
