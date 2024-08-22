package app

import (
	"errors"
	"fmt"

	ibcante "github.com/cosmos/ibc-go/v8/modules/core/ante"
	"github.com/cosmos/ibc-go/v8/modules/core/keeper"

	corestoretypes "cosmossdk.io/core/store"
	storetypes "cosmossdk.io/store/types"
	circuitante "cosmossdk.io/x/circuit/ante"
	circuitkeeper "cosmossdk.io/x/circuit/keeper"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/auth/ante"

	wasmkeeper "github.com/CosmWasm/wasmd/x/wasm/keeper"
	wasmTypes "github.com/CosmWasm/wasmd/x/wasm/types"

	evmante "github.com/evmos/evmos/v18/app/ante/evm"

	errorsmod "cosmossdk.io/errors"
	"github.com/cosmos/cosmos-sdk/crypto/keys/ed25519"
	"github.com/cosmos/cosmos-sdk/crypto/keys/secp256k1"
	"github.com/cosmos/cosmos-sdk/crypto/keys/secp256r1"
	"github.com/cosmos/cosmos-sdk/crypto/types/multisig"
	errortypes "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/types/tx/signing"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	evmosante "github.com/evmos/evmos/v18/app/ante"
	cosmosante "github.com/evmos/evmos/v18/app/ante/cosmos"
	anteutils "github.com/evmos/evmos/v18/app/ante/utils"
	"github.com/evmos/evmos/v18/crypto/ethsecp256k1"
	evmtypes "github.com/evmos/evmos/v18/x/evm/types"
)

// HandlerOptions extend the SDK's AnteHandler options by requiring the IBC
// channel keeper, wasm keeper and EvmOS keepers.
type HandlerOptions struct {
	ante.HandlerOptions

	IBCKeeper             *keeper.Keeper
	WasmConfig            *wasmTypes.WasmConfig
	WasmKeeper            *wasmkeeper.Keeper
	TXCounterStoreService corestoretypes.KVStoreService
	CircuitKeeper         *circuitkeeper.Keeper

	// evmos
	FeeMarketKeeper    evmante.FeeMarketKeeper
	EvmKeeper          evmante.EVMKeeper
	TxFeeChecker       anteutils.TxFeeChecker
	AccountKeeper      evmtypes.AccountKeeper
	BankKeeper         evmtypes.BankKeeper
	DistributionKeeper anteutils.DistributionKeeper
	StakingKeeper      anteutils.StakingKeeper
	MaxTxGasWanted     uint64
}

func newCosmosAnteHandler(options HandlerOptions) sdk.AnteHandler {
	anteDecorators := []sdk.AnteDecorator{
		cosmosante.RejectMessagesDecorator{}, // reject MsgEthereumTxs
		cosmosante.NewAuthzLimiterDecorator( // disable the Msg types that cannot be included on an authz.MsgExec msgs field
			sdk.MsgTypeURL(&evmtypes.MsgEthereumTx{}),
		),
		ante.NewSetUpContextDecorator(), // outermost AnteDecorator. SetUpContext must be called first
		wasmkeeper.NewLimitSimulationGasDecorator(options.WasmConfig.SimulationGasLimit), // after setup context to enforce limits early
		wasmkeeper.NewCountTXDecorator(options.TXCounterStoreService),
		wasmkeeper.NewGasRegisterDecorator(options.WasmKeeper.GetGasRegister()),
		circuitante.NewCircuitBreakerDecorator(options.CircuitKeeper),
		ante.NewExtensionOptionsDecorator(options.ExtensionOptionChecker),
		ante.NewValidateBasicDecorator(),
		ante.NewTxTimeoutHeightDecorator(),
		ante.NewValidateMemoDecorator(options.AccountKeeper),
		cosmosante.NewMinGasPriceDecorator(options.FeeMarketKeeper, options.EvmKeeper),
		ante.NewConsumeGasForTxSizeDecorator(options.AccountKeeper),
		ante.NewDeductFeeDecorator(options.AccountKeeper, options.BankKeeper, options.FeegrantKeeper, options.HandlerOptions.TxFeeChecker),
		ante.NewSetPubKeyDecorator(options.AccountKeeper), // SetPubKeyDecorator must be called before all signature verification decorators
		ante.NewValidateSigCountDecorator(options.AccountKeeper),
		ante.NewSigGasConsumeDecorator(options.AccountKeeper, options.SigGasConsumer),
		ante.NewSigVerificationDecorator(options.AccountKeeper, options.SignModeHandler),
		ante.NewIncrementSequenceDecorator(options.AccountKeeper),
		ibcante.NewRedundantRelayDecorator(options.IBCKeeper),
	}

	return sdk.ChainAnteDecorators(anteDecorators...)
}

func newMonoEVMAnteHandler(options HandlerOptions) sdk.AnteHandler {
	return sdk.ChainAnteDecorators(
		evmante.NewMonoDecorator(
			options.AccountKeeper,
			options.BankKeeper,
			options.FeeMarketKeeper,
			options.EvmKeeper,
			options.DistributionKeeper,
			options.StakingKeeper,
			options.MaxTxGasWanted,
		),
	)
}

func ValidateAnteHandlerOptions(options HandlerOptions) error {
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
	if options.EvmKeeper == nil {
		return errors.New("evm keeper is required for ante builder")
	}
	if options.FeeMarketKeeper == nil {
		return errors.New("feemarket keeper is required for ante builder")
	}
	if options.TxFeeChecker == nil {
		return errors.New("tx fee checker is required for ante builder")
	}
	if options.StakingKeeper == nil {
		return errors.New("tx fee checker is required for ante builder")
	}
	if options.DistributionKeeper == nil {
		return errors.New("tx fee checker is required for ante builder")
	}
	if options.StakingKeeper == nil {
		return errors.New("tx fee checker is required for ante builder")
	}

	return nil
}

// NewAnteHandler constructor
func NewAnteHandler(options HandlerOptions) sdk.AnteHandler {
	return func(
		ctx sdk.Context, tx sdk.Tx, sim bool,
	) (newCtx sdk.Context, err error) {
		var anteHandler sdk.AnteHandler

		txWithExtensions, ok := tx.(ante.HasExtensionOptionsTx)
		if ok {
			opts := txWithExtensions.GetExtensionOptions()
			if len(opts) > 0 {
				switch typeURL := opts[0].GetTypeUrl(); typeURL {
				case "/ethermint.evm.v1.ExtensionOptionsEthereumTx":
					// handle as *evmtypes.MsgEthereumTx
					anteHandler = newMonoEVMAnteHandler(options)
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

// SigVerificationGasConsumer based on the Evmos implementation of SignatureVerificationGasConsumer. It consumes gas
// for signature verification based upon the public key type. The cost is fetched from the given params and is matched
// by the concrete type.
// The types of keys supported are:
//
// - ethsecp256k1 (Ethereum keys)
//
// - ed25519 (Validators)
//
// - multisig (Cosmos SDK multisigs)
func SigVerificationGasConsumer(
	meter storetypes.GasMeter, sig signing.SignatureV2, params authtypes.Params,
) error {
	pubkey := sig.PubKey
	switch pubkey := pubkey.(type) {

	case *ethsecp256k1.PubKey:
		// Ethereum keys
		meter.ConsumeGas(evmosante.Secp256k1VerifyCost, "ante verify: eth_secp256k1")
		return nil
	case *secp256k1.PubKey:
		// Cosmos keys
		meter.ConsumeGas(params.SigVerifyCostSecp256k1, "ante verify: secp256k1")
		return nil
	case *secp256r1.PubKey:
		// Cosmos keys
		meter.ConsumeGas(params.SigVerifyCostSecp256r1(), "ante verify: secp256r1")
		return nil
	case *ed25519.PubKey:
		// Validator keys
		meter.ConsumeGas(params.SigVerifyCostED25519, "ante verify: ed25519")
		return errorsmod.Wrap(errortypes.ErrInvalidPubKey, "ED25519 public keys are unsupported")

	case multisig.PubKey:
		// Multisig keys
		multisignature, ok := sig.Data.(*signing.MultiSignatureData)
		if !ok {
			return fmt.Errorf("expected %T, got, %T", &signing.MultiSignatureData{}, sig.Data)
		}
		return ConsumeMultisignatureVerificationGas(meter, multisignature, pubkey, params, sig.Sequence)

	default:
		return errorsmod.Wrapf(errortypes.ErrInvalidPubKey, "unrecognized/unsupported public key type: %T", pubkey)
	}
}

// ConsumeMultisignatureVerificationGas consumes gas from a GasMeter for verifying a multisig pubkey signature
func ConsumeMultisignatureVerificationGas(
	meter storetypes.GasMeter, sig *signing.MultiSignatureData, pubkey multisig.PubKey,
	params authtypes.Params, accSeq uint64,
) error {
	size := sig.BitArray.Count()
	sigIndex := 0

	for i := 0; i < size; i++ {
		if !sig.BitArray.GetIndex(i) {
			continue
		}
		sigV2 := signing.SignatureV2{
			PubKey:   pubkey.GetPubKeys()[i],
			Data:     sig.Signatures[sigIndex],
			Sequence: accSeq,
		}
		err := SigVerificationGasConsumer(meter, sigV2, params)
		if err != nil {
			return err
		}
		sigIndex++
	}

	return nil
}
