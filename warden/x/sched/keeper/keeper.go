package keeper

import (
	"context"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"math/big"
	"strconv"

	"cosmossdk.io/collections"
	"cosmossdk.io/core/store"
	errorsmod "cosmossdk.io/errors"
	"cosmossdk.io/log"
	sdkmath "cosmossdk.io/math"
	cmttypes "github.com/cometbft/cometbft/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	errortypes "github.com/cosmos/cosmos-sdk/types/errors"
	evmconf "github.com/cosmos/evm/server/config"
	evmkeeper "github.com/cosmos/evm/x/vm/keeper"
	evmtypes "github.com/cosmos/evm/x/vm/types"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	ethcore "github.com/ethereum/go-ethereum/core"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	"github.com/holiman/uint256"

	"github.com/warden-protocol/wardenprotocol/precompiles/callbacks"
	precommon "github.com/warden-protocol/wardenprotocol/precompiles/common"
	types "github.com/warden-protocol/wardenprotocol/warden/x/sched/types/v1beta1"
)

const GET_EVM_KEEPER_PLACE_HOLDER int16 = 0

type (
	Keeper struct {
		cdc          codec.BinaryCodec
		storeService store.KVStoreService
		logger       log.Logger

		// the address capable of executing a MsgUpdateParams message. Typically, this
		// should be the x/gov module account.
		authority          string
		schedModuleAddress sdk.Address
		callbacks          *CallbackKeeper
		accountKeeper      types.AccountKeeper
		getEvmKeeper       func(_placeHolder int16) *evmkeeper.Keeper
	}
)

var (
	CallbackSeqPrefix = collections.NewPrefix(0)
	CallbacksPrefix   = collections.NewPrefix(1)
	ResultsPrefix     = collections.NewPrefix(2)
)

func NewKeeper(
	cdc codec.Codec,
	storeService store.KVStoreService,
	logger log.Logger,
	authority string,
	schedModuleAddress sdk.Address,
	accountKeeper types.AccountKeeper,
	getEvmKeeper func(_placeHolder int16) *evmkeeper.Keeper,
) Keeper {
	if _, err := sdk.AccAddressFromBech32(authority); err != nil {
		panic("invalid authority address: " + authority)
	}

	sb := collections.NewSchemaBuilder(storeService)

	callbacks := NewCallbackKeeper(sb, cdc)

	_, err := sb.Build()
	if err != nil {
		panic(fmt.Sprintf("failed to build schema: %s", err))
	}

	return Keeper{
		cdc:                cdc,
		storeService:       storeService,
		authority:          authority,
		logger:             logger,
		callbacks:          callbacks,
		schedModuleAddress: schedModuleAddress,
		accountKeeper:      accountKeeper,
		getEvmKeeper:       getEvmKeeper,
	}
}

func (k Keeper) GetModuleAddress() sdk.Address {
	return k.schedModuleAddress
}

// GetAuthority returns the module's authority.
func (k Keeper) GetAuthority() string {
	return k.authority
}

// Logger returns a module-specific logger.
func (k Keeper) Logger() log.Logger {
	return k.logger.With("module", "x/"+types.ModuleName)
}

func (k Keeper) SetCallback(ctx context.Context, cb *types.Callback) (id uint64, err error) {
	address, err := precommon.AddressFromBech32Str(cb.Address)
	if err != nil {
		return id, errorsmod.Wrapf(types.ErrInvalidCallback, "invalid callback address: %s", err)
	}

	if cb.GasLimit == 0 {
		return id, errorsmod.Wrapf(types.ErrInvalidGasLimit, "gas limit should be more than zero")
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)
	evmKeeper := k.getEvmKeeper(GET_EVM_KEEPER_PLACE_HOLDER)
	acc := evmKeeper.GetAccountWithoutBalance(sdkCtx, address)

	if acc == nil || !acc.IsContract() {
		return id, errorsmod.Wrapf(types.ErrInvalidCallback, "callback address is not a contract")
	}

	return k.callbacks.Append(ctx, cb)
}

func (k Keeper) ExecuteCallback(
	ctx context.Context,
	id uint64,
	output []byte,
) error {
	cb, err := k.callbacks.Get(ctx, id)
	if err != nil {
		return err
	}

	abi, err := callbacks.ICallbackMetaData.GetAbi()
	if err != nil {
		return err
	}

	method := "cb"
	if _, ok := abi.Methods[method]; !ok {
		return fmt.Errorf("invalid callback method: %v", method)
	}

	cbAddress, err := precommon.AddressFromBech32Str(cb.Address)
	if err != nil {
		return err
	}

	data, err := abi.Pack(method, id, output)
	if err != nil {
		return err
	}

	moduleAddress := common.BytesToAddress(k.schedModuleAddress.Bytes())
	gas, vmErr, err := k.estimateGas(ctx, moduleAddress, &cbAddress, data)
	if err != nil {
		return err
	}

	if vmErr != "" {
		return k.callbacks.setFailed(ctx, id, vmErr)
	}

	if gas > cb.GasLimit {
		return k.callbacks.setFailed(ctx, id, types.ErrOutOfMaxGas.Error())
	}

	if err := k.tryDeductTxCost(ctx, gas, cbAddress, id); err != nil {
		// The error will be recorded in the callback result
		return nil
	}

	// Add gas consumed during estimation to the final gas limit for case when precompile called inside callback
	res, err := k.callEVM(ctx, moduleAddress, &cbAddress, data, gas+k.getGasConsumed(ctx))

	if err == nil {
		if res.Failed() {
			return k.callbacks.setFailed(ctx, id, res.VmError)
		} else {
			return k.callbacks.setSucceed(ctx, id, res.Return())
		}
	} else {
		return k.callbacks.setFailed(ctx, id, err.Error())
	}

	return err
}

func (k Keeper) getGasConsumed(ctx context.Context) uint64 {
	sdkCtx := sdk.UnwrapSDKContext(ctx)
	return sdkCtx.GasMeter().GasConsumed()
}

func (k Keeper) tryDeductTxCost(
	ctx context.Context,
	gas uint64,
	cbAddress common.Address,
	cbId uint64,
) error {
	feeAmt, fee := k.callbackFee(ctx, gas)
	evmKeeper := k.getEvmKeeper(GET_EVM_KEEPER_PLACE_HOLDER)
	sdkCtx := sdk.UnwrapSDKContext(ctx)
	cbBalance := evmKeeper.GetBalance(sdkCtx, cbAddress)

	if cbBalance.Cmp(feeAmt) == -1 {
		if err := k.callbacks.setFailed(ctx, cbId, types.ErrInsufficientFunds.Error()); err != nil {
			return err
		}

		return types.ErrInsufficientFunds
	}

	if err := fee.Validate(); err != nil {
		if err2 := k.callbacks.setFailed(ctx, cbId, err.Error()); err2 != nil {
			return err2
		}

		return err
	}

	if err := evmKeeper.DeductTxCostsFromUserBalance(sdkCtx, fee, cbAddress); err != nil {
		if err2 := k.callbacks.setFailed(ctx, cbId, err.Error()); err2 != nil {
			return err2
		}

		return err
	}

	return nil
}

func (k Keeper) estimateGas(
	ctx context.Context,
	from common.Address,
	contract *common.Address,
	data []byte,
) (uint64, string, error) {
	evmKeeper := k.getEvmKeeper(GET_EVM_KEEPER_PLACE_HOLDER)

	args, err := json.Marshal(evmtypes.TransactionArgs{
		From: &from,
		To:   contract,
		Data: (*hexutil.Bytes)(&data),
	})
	if err != nil {
		return 0, "", errorsmod.Wrapf(errortypes.ErrJSONMarshal, "failed to marshal tx args: %s", err.Error())
	}

	gasRes, err := evmKeeper.EstimateGasInternal(ctx, &evmtypes.EthCallRequest{
		Args:   args,
		GasCap: evmconf.DefaultGasCap,
	}, evmtypes.Internal)
	if err != nil {
		return 0, "", err
	}

	return gasRes.Gas, gasRes.GetVmError(), nil
}

func (k Keeper) callEVM(
	ctx context.Context,
	from common.Address,
	contract *common.Address,
	data []byte,
	gasLimit uint64,
) (*evmtypes.MsgEthereumTxResponse, error) {
	fromAcc := k.accountKeeper.GetAccount(ctx, from.Bytes())
	if fromAcc == nil {
		fromAcc = k.accountKeeper.NewAccountWithAddress(ctx, from.Bytes())
		k.accountKeeper.SetAccount(ctx, fromAcc)
	}

	nonce := fromAcc.GetSequence()

	sdkCtx := sdk.UnwrapSDKContext(ctx)

	ethTxData := ethtypes.NewTx(&ethtypes.DynamicFeeTx{
		Nonce:      nonce,
		Data:       data,
		Gas:        gasLimit,
		Value:      big.NewInt(0),
		AccessList: ethtypes.AccessList{},
		To:         contract,
		V:          nil,
		R:          nil,
		S:          nil,
	})
	res, err := k.applyTransaction(sdkCtx, ethTxData, from)
	if err != nil {
		return nil, err
	}

	if err := fromAcc.SetSequence(fromAcc.GetSequence() + 1); err != nil {
		return nil, err
	}

	k.accountKeeper.SetAccount(ctx, fromAcc)

	return res, nil
}

func (k Keeper) callbackFee(ctx context.Context, gas uint64) (*uint256.Int, sdk.Coins) {
	sdkCtx := sdk.UnwrapSDKContext(ctx)
	evmKeeper := k.getEvmKeeper(GET_EVM_KEEPER_PLACE_HOLDER)
	params := evmKeeper.GetParams(sdkCtx)
	baseFee := evmKeeper.GetBaseFee(sdkCtx)
	gasInt := new(big.Int).SetUint64(gas)
	feeAmt := new(big.Int).Mul(baseFee, gasInt)
	fee := sdk.NewCoins(sdk.NewCoin(params.EvmDenom, sdkmath.NewIntFromBigInt(feeAmt)))

	feeAmtUint256 := new(uint256.Int)
	feeAmtUint256.SetFromBig(feeAmt)

	return feeAmtUint256, fee
}

func (k *Keeper) applyTransaction(ctx sdk.Context, tx *ethtypes.Transaction, from common.Address) (*evmtypes.MsgEthereumTxResponse, error) {
	var bloom *big.Int

	evmKeeper := k.getEvmKeeper(GET_EVM_KEEPER_PLACE_HOLDER)

	cfg, err := evmKeeper.EVMConfig(ctx, sdk.ConsAddress(ctx.BlockHeader().ProposerAddress))
	if err != nil {
		return nil, errorsmod.Wrap(err, "failed to load evm config")
	}
	txConfig := evmKeeper.TxConfig(ctx, tx.Hash())

	feeCap := tx.GasFeeCap()
	if feeCap == nil {
		feeCap = big.NewInt(0)
	}
	tipCap := tx.GasTipCap()
	if tipCap == nil {
		tipCap = big.NewInt(0)
	}

	gasPrice := tx.GasPrice()
	if cfg.BaseFee != nil {
		gasPrice = gasPrice.Add(tipCap, cfg.BaseFee)
		if feeCap.Cmp(gasPrice) < 0 {
			gasPrice = feeCap
		}
	}

	msg := ethcore.Message{
		To:                    tx.To(),
		From:                  from,
		Nonce:                 tx.Nonce(),
		Value:                 tx.Value(),
		GasLimit:              tx.Gas(),
		GasPrice:              gasPrice,
		GasFeeCap:             feeCap,
		GasTipCap:             tipCap,
		Data:                  tx.Data(),
		AccessList:            tx.AccessList(),
		BlobGasFeeCap:         big.NewInt(0),
		BlobHashes:            []common.Hash{},
		SetCodeAuthorizations: []ethtypes.SetCodeAuthorization{},
		SkipNonceChecks:       false,
		SkipFromEOACheck:      false,
	}

	// Create a cache context to revert state. The cache context is only committed when both tx and hooks executed successfully.
	// Didn't use `Snapshot` because the context stack has exponential complexity on certain operations,
	// thus restricted to be used only inside `ApplyMessage`.
	tmpCtx, commit := ctx.CacheContext()

	// pass true to commit the StateDB
	res, err := evmKeeper.ApplyMessageWithConfig(tmpCtx, msg, nil, true, cfg, txConfig)
	if err != nil {
		// when a transaction contains multiple msg, as long as one of the msg fails
		// all gas will be deducted. so is not msg.Gas()
		evmKeeper.ResetGasMeterAndConsumeGas(tmpCtx, tmpCtx.GasMeter().Limit())
		return nil, errorsmod.Wrap(err, "failed to apply ethereum core message")
	}

	logs := evmtypes.LogsToEthereum(res.Logs)

	// Compute block bloom filter
	if len(logs) > 0 {
		bloom = evmKeeper.GetBlockBloomTransient(ctx)
		bloom.Or(bloom, big.NewInt(0).SetBytes(ethtypes.CreateBloom(&ethtypes.Receipt{Logs: logs}).Bytes()))
	}

	if !res.Failed() {
		commit()
	}

	evmDenom := evmtypes.GetEVMCoinDenom()

	remainingGas := uint64(0)
	if msg.GasLimit > res.GasUsed {
		remainingGas = msg.GasLimit - res.GasUsed
	}
	// refund gas in order to match the Ethereum gas consumption instead of the default SDK one.
	if err = evmKeeper.RefundGas(ctx, msg, remainingGas, evmDenom); err != nil {
		return nil, errorsmod.Wrapf(err, "failed to refund gas leftover gas to sender %s", msg.From)
	}

	if len(logs) > 0 {
		// Update transient block bloom filter
		evmKeeper.SetBlockBloomTransient(ctx, bloom)
		evmKeeper.SetLogSizeTransient(ctx, uint64(txConfig.LogIndex)+uint64(len(logs)))
	}

	evmKeeper.SetTxIndexTransient(ctx, uint64(txConfig.TxIndex)+1)

	totalGasUsed, err := evmKeeper.AddTransientGasUsed(ctx, res.GasUsed)
	if err != nil {
		return nil, errorsmod.Wrap(err, "failed to add transient gas used")
	}

	// reset the gas meter for current cosmos transaction
	evmKeeper.ResetGasMeterAndConsumeGas(ctx, totalGasUsed)

	if err := k.emitEvmLogs(ctx, tx, res, from); err != nil {
		return nil, err
	}

	return res, nil
}

func (k *Keeper) emitEvmLogs(ctx sdk.Context, tx *ethtypes.Transaction, response *evmtypes.MsgEthereumTxResponse, from common.Address) error {
	evmKeeper := k.getEvmKeeper(GET_EVM_KEEPER_PLACE_HOLDER)

	attrs := []sdk.Attribute{
		sdk.NewAttribute(sdk.AttributeKeyAmount, tx.Value().String()),
		// add event for ethereum transaction hash format
		sdk.NewAttribute(evmtypes.AttributeKeyEthereumTxHash, response.Hash),
		// add event for index of valid ethereum tx
		sdk.NewAttribute(evmtypes.AttributeKeyTxIndex, strconv.FormatUint(evmKeeper.GetTxIndexTransient(ctx), 10)),
		// add event for eth tx gas used, we can't get it from cosmos tx result when it contains multiple eth tx msgs.
		sdk.NewAttribute(evmtypes.AttributeKeyTxGasUsed, strconv.FormatUint(response.GasUsed, 10)),
	}

	if len(ctx.TxBytes()) > 0 {
		// add event for tendermint transaction hash format
		hash := cmttypes.Tx(ctx.TxBytes()).Hash()
		attrs = append(attrs, sdk.NewAttribute(evmtypes.AttributeKeyTxHash, hex.EncodeToString(hash)))
	}

	if to := tx.To(); to != nil {
		attrs = append(attrs, sdk.NewAttribute(evmtypes.AttributeKeyRecipient, to.Hex()))
	}

	if response.Failed() {
		attrs = append(attrs, sdk.NewAttribute(evmtypes.AttributeKeyEthereumTxFailed, response.VmError))
	}

	txLogAttrs := make([]sdk.Attribute, len(response.Logs))
	for i, log := range response.Logs {
		value, err := json.Marshal(log)
		if err != nil {
			return errorsmod.Wrap(err, "failed to encode log")
		}
		txLogAttrs[i] = sdk.NewAttribute(evmtypes.AttributeKeyTxLog, string(value))
	}

	// emit events
	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			evmtypes.EventTypeEthereumTx,
			attrs...,
		),
		sdk.NewEvent(
			evmtypes.EventTypeTxLog,
			txLogAttrs...,
		),

		sdk.NewEvent(
			sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, evmtypes.AttributeValueCategory),
			sdk.NewAttribute(sdk.AttributeKeySender, from.Hex()),
			sdk.NewAttribute(evmtypes.AttributeKeyTxType, strconv.FormatUint(uint64(tx.Type()), 10)),
		),
	})

	return nil
}
