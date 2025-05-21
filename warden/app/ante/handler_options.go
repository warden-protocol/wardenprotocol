package ante

import (
	"context"

	addresscodec "cosmossdk.io/core/address"
	corestoretypes "cosmossdk.io/core/store"
	errorsmod "cosmossdk.io/errors"
	circuitkeeper "cosmossdk.io/x/circuit/keeper"
	wasmkeeper "github.com/CosmWasm/wasmd/x/wasm/keeper"
	wasmTypes "github.com/CosmWasm/wasmd/x/wasm/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	errortypes "github.com/cosmos/cosmos-sdk/types/errors"
	authante "github.com/cosmos/cosmos-sdk/x/auth/ante"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	anteinterfaces "github.com/cosmos/evm/ante/interfaces"
	ibckeeper "github.com/cosmos/ibc-go/v8/modules/core/keeper"
)

// BankKeeper defines the contract needed for supply related APIs (noalias)
type BankKeeper interface {
	IsSendEnabledCoins(ctx context.Context, coins ...sdk.Coin) error
	SendCoins(ctx context.Context, from, to sdk.AccAddress, amt sdk.Coins) error
	SendCoinsFromAccountToModule(ctx context.Context, senderAddr sdk.AccAddress, recipientModule string, amt sdk.Coins) error
}

type AccountKeeper interface {
	NewAccountWithAddress(ctx context.Context, addr sdk.AccAddress) sdk.AccountI
	GetModuleAddress(moduleName string) sdk.AccAddress
	GetAccount(ctx context.Context, addr sdk.AccAddress) sdk.AccountI
	SetAccount(ctx context.Context, account sdk.AccountI)
	RemoveAccount(ctx context.Context, account sdk.AccountI)
	GetParams(ctx context.Context) (params authtypes.Params)
	GetSequence(ctx context.Context, addr sdk.AccAddress) (uint64, error)
	AddressCodec() addresscodec.Codec
}

// HandlerOptions defines the list of module keepers required to run the EVM
// AnteHandler decorators.
type HandlerOptions struct {
	authante.HandlerOptions

	WasmConfig            *wasmTypes.WasmConfig
	WasmKeeper            *wasmkeeper.Keeper
	TXCounterStoreService corestoretypes.KVStoreService

	Cdc           codec.BinaryCodec
	AccountKeeper AccountKeeper
	BankKeeper    BankKeeper
	// ExtensionOptionChecker ante.ExtensionOptionChecker
	// FeegrantKeeper         ante.FeegrantKeeper
	// SignModeHandler        *txsigning.HandlerMap
	// SigGasConsumer         func(meter storetypes.GasMeter, sig signing.SignatureV2, params authtypes.Params) error
	// TxFeeChecker           ante.TxFeeChecker // safe to be nil

	// EVM
	MaxTxGasWanted  uint64
	FeeMarketKeeper anteinterfaces.FeeMarketKeeper
	EvmKeeper       anteinterfaces.EVMKeeper

	IBCKeeper     *ibckeeper.Keeper
	CircuitKeeper *circuitkeeper.Keeper
}

// Validate checks if the keepers are defined
func (options HandlerOptions) Validate() error {
	if options.Cdc == nil {
		return errorsmod.Wrap(errortypes.ErrLogic, "codec is required for AnteHandler")
	}
	if options.AccountKeeper == nil {
		return errorsmod.Wrap(errortypes.ErrLogic, "account keeper is required for AnteHandler")
	}
	if options.BankKeeper == nil {
		return errorsmod.Wrap(errortypes.ErrLogic, "bank keeper is required for AnteHandler")
	}
	if options.SigGasConsumer == nil {
		return errorsmod.Wrap(errortypes.ErrLogic, "signature gas consumer is required for AnteHandler")
	}
	if options.SignModeHandler == nil {
		return errorsmod.Wrap(errortypes.ErrLogic, "sign mode handler is required for AnteHandler")
	}
	if options.CircuitKeeper == nil {
		return errorsmod.Wrap(errortypes.ErrLogic, "circuit keeper is required for ante builder")
	}

	if options.TxFeeChecker == nil {
		return errorsmod.Wrap(errortypes.ErrLogic, "tx fee checker is required for AnteHandler")
	}
	if options.FeeMarketKeeper == nil {
		return errorsmod.Wrap(errortypes.ErrLogic, "fee market keeper is required for AnteHandler")
	}
	if options.EvmKeeper == nil {
		return errorsmod.Wrap(errortypes.ErrLogic, "evm keeper is required for AnteHandler")
	}

	return nil
}
