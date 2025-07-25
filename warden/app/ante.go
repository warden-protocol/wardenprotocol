package app

import (
	"errors"

	corestoretypes "cosmossdk.io/core/store"
	errorsmod "cosmossdk.io/errors"
	circuitante "cosmossdk.io/x/circuit/ante"
	circuitkeeper "cosmossdk.io/x/circuit/keeper"
	wasmkeeper "github.com/CosmWasm/wasmd/x/wasm/keeper"
	wasmTypes "github.com/CosmWasm/wasmd/x/wasm/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	errortypes "github.com/cosmos/cosmos-sdk/types/errors"
	authante "github.com/cosmos/cosmos-sdk/x/auth/ante"
	cosmosante "github.com/cosmos/evm/ante/cosmos"
	evmante "github.com/cosmos/evm/ante/evm"
	anteinterfaces "github.com/cosmos/evm/ante/interfaces"
	evmtypes "github.com/cosmos/evm/x/vm/types"
	"github.com/cosmos/gogoproto/proto"
	ibcante "github.com/cosmos/ibc-go/v10/modules/core/ante"
	"github.com/cosmos/ibc-go/v10/modules/core/keeper"

	schedv1beta1 "github.com/warden-protocol/wardenprotocol/api/warden/sched/v1beta1"
)

// HandlerOptions extend the SDK's AnteHandler options by requiring the IBC
// channel keeper, wasm keeper and evm keepers.
type HandlerOptions struct {
	authante.HandlerOptions

	IBCKeeper             *keeper.Keeper
	WasmConfig            *wasmTypes.NodeConfig
	WasmKeeper            *wasmkeeper.Keeper
	TXCounterStoreService corestoretypes.KVStoreService
	CircuitKeeper         *circuitkeeper.Keeper

	// evm
	FeeMarketKeeper anteinterfaces.FeeMarketKeeper
	EVMKeeper       anteinterfaces.EVMKeeper
	TxFeeChecker    authante.TxFeeChecker
	Cdc             codec.BinaryCodec
	AccountKeeper   anteinterfaces.AccountKeeper
	BankKeeper      anteinterfaces.BankKeeper
	MaxTxGasWanted  uint64
}

func newCosmosAnteHandler(options HandlerOptions) sdk.AnteHandler {
	anteDecorators := []sdk.AnteDecorator{
		cosmosante.RejectMessagesDecorator{}, // reject MsgEthereumTxs
		cosmosante.NewAuthzLimiterDecorator( // disable the Msg types that cannot be included on an authz.MsgExec msgs field
			sdk.MsgTypeURL(&evmtypes.MsgEthereumTx{}),
		),
		authante.NewSetUpContextDecorator(),                                              // outermost AnteDecorator. SetUpContext must be called first
		wasmkeeper.NewLimitSimulationGasDecorator(options.WasmConfig.SimulationGasLimit), // after setup context to enforce limits early
		wasmkeeper.NewCountTXDecorator(options.TXCounterStoreService),
		wasmkeeper.NewGasRegisterDecorator(options.WasmKeeper.GetGasRegister()),
		circuitante.NewCircuitBreakerDecorator(options.CircuitKeeper),
		authante.NewExtensionOptionsDecorator(options.ExtensionOptionChecker),
		authante.NewValidateBasicDecorator(),
		authante.NewTxTimeoutHeightDecorator(),
		authante.NewValidateMemoDecorator(options.AccountKeeper),
		cosmosante.NewMinGasPriceDecorator(options.FeeMarketKeeper, options.EVMKeeper),
		authante.NewConsumeGasForTxSizeDecorator(options.AccountKeeper),
		authante.NewDeductFeeDecorator(options.AccountKeeper, options.BankKeeper, options.FeegrantKeeper, options.HandlerOptions.TxFeeChecker),
		authante.NewSetPubKeyDecorator(options.AccountKeeper), // SetPubKeyDecorator must be called before all signature verification decorators
		authante.NewValidateSigCountDecorator(options.AccountKeeper),
		authante.NewSigGasConsumeDecorator(options.AccountKeeper, options.SigGasConsumer),
		authante.NewSigVerificationDecorator(options.AccountKeeper, options.SignModeHandler),
		authante.NewIncrementSequenceDecorator(options.AccountKeeper),
		ibcante.NewRedundantRelayDecorator(options.IBCKeeper),
	}

	return sdk.ChainAnteDecorators(anteDecorators...)
}

func newMonoEVMAnteHandler(options HandlerOptions) sdk.AnteHandler {
	return sdk.ChainAnteDecorators(
		evmante.NewEVMMonoDecorator(
			options.AccountKeeper,
			options.FeeMarketKeeper,
			options.EVMKeeper,
			options.MaxTxGasWanted,
		),
	)
}

// Validate checks if the keepers are defined.
func (options HandlerOptions) Validate() error {
	if options.AccountKeeper == nil {
		return errors.New("account keeper is required for ante builder")
	}

	if options.BankKeeper == nil {
		return errors.New("bank keeper is required for ante builder")
	}

	if options.SignModeHandler == nil {
		return errors.New("sign mode handler is required for ante builder")
	}

	if options.WasmConfig == nil {
		return errors.New("wasm config is required for ante builder")
	}

	if options.TXCounterStoreService == nil {
		return errors.New("wasm store service is required for ante builder")
	}

	if options.CircuitKeeper == nil {
		return errors.New("circuit keeper is required for ante builder")
	}

	if options.EVMKeeper == nil {
		return errors.New("evm keeper is required for ante builder")
	}

	if options.FeeMarketKeeper == nil {
		return errors.New("feemarket keeper is required for ante builder")
	}

	if options.TxFeeChecker == nil {
		return errors.New("tx fee checker is required for ante builder")
	}

	return nil
}

// NewAnteHandler returns an ante handler responsible for attempting to route an
// Ethereum or SDK transaction to an internal ante handler for performing
// transaction-level processing (e.g. fee payment, signature verification) before
// being passed onto it's respective handler.
func NewAnteHandler(options HandlerOptions) sdk.AnteHandler {
	return func(
		ctx sdk.Context, tx sdk.Tx, sim bool,
	) (newCtx sdk.Context, err error) {
		var anteHandler sdk.AnteHandler

		txWithExtensions, ok := tx.(authante.HasExtensionOptionsTx)
		if ok {
			opts := txWithExtensions.GetExtensionOptions()
			if len(opts) > 0 {
				switch typeURL := opts[0].GetTypeUrl(); typeURL {
				case "/" + proto.MessageName(&schedv1beta1.ExtensionOptionsCallbacks{}):
					// This check prevents any external user to submit a transaction using the
					// ExtensionOptionsCallbacks.
					// If a validator still builds a proposal containing an invalid transaction,
					// the rest of the validators should reject such proposal during
					// ProcessProposal.
					if ctx.IsCheckTx() {
						return ctx, errorsmod.Wrapf(
							errortypes.ErrInvalidType,
							"cannot send tx with extension type: %s", typeURL,
						)
					}

					// This transaction will bypass normal authentication checks such as signature and nonce.
					// It's dangerous and should only be allowed if built by the x/sched module.
					// The code below is a stripped version of the normal EVM ante handler.

					ctx, err = evmante.SetupContextAndResetTransientGas(ctx, tx, options.EVMKeeper)
					if err != nil {
						return ctx, err
					}

					decUtils, err := evmante.NewMonoDecoratorUtils(ctx, options.EVMKeeper)
					if err != nil {
						return ctx, err
					}

					if err := evmante.CheckGasWanted(ctx, options.FeeMarketKeeper, tx, decUtils.Rules.IsLondon); err != nil {
						return ctx, err
					}

					for i, msg := range tx.GetMsgs() {
						ethMsg, _, err := evmtypes.UnpackEthMsg(msg)
						if err != nil {
							return ctx, err
						}

						txIdx := uint64(i) //nolint:gosec // G115
						evmante.EmitTxHashEvent(ctx, ethMsg, decUtils.BlockTxIndex, txIdx)
					}

					return ctx, nil
				case "/cosmos.evm.vm.v1.ExtensionOptionsEthereumTx":
					// handle as *evmtypes.MsgEthereumTx
					anteHandler = newMonoEVMAnteHandler(options)
				case "/cosmos.evm.types.v1.ExtensionOptionDynamicFeeTx":
					// cosmos-sdk tx with dynamic fee extension
					anteHandler = newCosmosAnteHandler(options)
				default:
					return ctx, errorsmod.Wrapf(
						errortypes.ErrUnknownExtensionOptions,
						"rejecting tx with unsupported extension option: %s", typeURL,
					)
				}

				return anteHandler(ctx, tx, sim)
			}
		}

		// handle as totally normal Cosmos SDK tx
		switch tx.(type) {
		case sdk.Tx:
			anteHandler = newCosmosAnteHandler(options)
		default:
			return ctx, errorsmod.Wrapf(errortypes.ErrUnknownRequest, "invalid transaction type: %T", tx)
		}

		return anteHandler(ctx, tx, sim)
	}
}
