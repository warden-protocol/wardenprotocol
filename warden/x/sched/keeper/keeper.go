package keeper

import (
	"context"
	"encoding/json"
	"fmt"
	"math/big"

	"cosmossdk.io/collections"
	"cosmossdk.io/core/store"
	errorsmod "cosmossdk.io/errors"
	"cosmossdk.io/log"
	sdkmath "cosmossdk.io/math"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	errortypes "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	evmosconf "github.com/evmos/evmos/v20/server/config"
	evmkeeper "github.com/evmos/evmos/v20/x/evm/keeper"
	evmostypes "github.com/evmos/evmos/v20/x/evm/types"

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
		return err
	}

	// Add gas consumed during estimation to the final gas limit for case when precompile called inside callback
	res, err := k.callEVM(ctx, moduleAddress, &cbAddress, data, gas+k.getGasConsumed(ctx))
	if err == nil {
		if res.Failed() {
			return k.callbacks.setFailed(ctx, id, res.VmError)
		} else {
			return k.callbacks.setSucceed(ctx, id, res.Return())
		}
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
		return k.callbacks.setFailed(ctx, cbId, types.ErrInsufficientFunds.Error())
	}

	if err := evmKeeper.DeductTxCostsFromUserBalance(sdkCtx, fee, cbAddress); err != nil {
		return k.callbacks.setFailed(ctx, cbId, err.Error())
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

	args, err := json.Marshal(evmostypes.TransactionArgs{
		From: &from,
		To:   contract,
		Data: (*hexutil.Bytes)(&data),
	})
	if err != nil {
		return 0, "", errorsmod.Wrapf(errortypes.ErrJSONMarshal, "failed to marshal tx args: %s", err.Error())
	}

	gasRes, err := evmKeeper.EstimateGasInternal(ctx, &evmostypes.EthCallRequest{
		Args:   args,
		GasCap: evmosconf.DefaultGasCap,
	}, evmostypes.Internal)
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
) (*evmostypes.MsgEthereumTxResponse, error) {
	fromAcc := k.accountKeeper.GetAccount(ctx, from.Bytes())
	if fromAcc == nil {
		fromAcc = k.accountKeeper.NewAccountWithAddress(ctx, from.Bytes())
		k.accountKeeper.SetAccount(ctx, fromAcc)
	}

	nonce := fromAcc.GetSequence()

	msg := ethtypes.NewMessage(
		from,
		contract,
		nonce,
		big.NewInt(0), // amount
		gasLimit,      // gasLimit
		big.NewInt(0), // gasFeeCap
		big.NewInt(0), // gasTipCap
		big.NewInt(0), // gasPrice
		data,
		ethtypes.AccessList{}, // AccessList
		false,                 // isFake
	)

	evmKeeper := k.getEvmKeeper(GET_EVM_KEEPER_PLACE_HOLDER)
	sdkCtx := sdk.UnwrapSDKContext(ctx)
	res, err := evmKeeper.ApplyMessage(sdkCtx, msg, evmostypes.NewNoOpTracer(), true)
	if err != nil {
		return nil, err
	}

	if err := fromAcc.SetSequence(fromAcc.GetSequence() + 1); err != nil {
		return nil, err
	}

	k.accountKeeper.SetAccount(ctx, fromAcc)

	return res, nil
}

func (k Keeper) callbackFee(ctx context.Context, gas uint64) (feeAmt *big.Int, fee sdk.Coins) {
	sdkCtx := sdk.UnwrapSDKContext(ctx)
	evmKeeper := k.getEvmKeeper(GET_EVM_KEEPER_PLACE_HOLDER)
	params := evmKeeper.GetParams(sdkCtx)
	ethCfg := params.ChainConfig.EthereumConfig(evmKeeper.ChainID())
	baseFee := evmKeeper.GetBaseFee(sdkCtx, ethCfg)
	gasInt := new(big.Int).SetUint64(gas)
	feeAmt = new(big.Int).Mul(baseFee, gasInt)
	fee = sdk.Coins{{Denom: params.EvmDenom, Amount: sdkmath.NewIntFromBigInt(feeAmt)}}

	return feeAmt, fee
}
