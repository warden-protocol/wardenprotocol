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
		panic(fmt.Sprintf("invalid authority address: %s", authority))
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
	return k.logger.With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) SetCallback(ctx context.Context, cb *types.Callback) (id uint64, err error) {
	address, err := precommon.AddressFromBech32Str(cb.Address)
	if err != nil {
		return id, errorsmod.Wrapf(types.ErrInvalidCallback, "invalid callback address: %s", err)
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)
	evmKeeper := k.getEvmKeeper(0)
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

	sdkCtx := sdk.UnwrapSDKContext(ctx)

	abi, err := callbacks.IAsyncCallbackMetaData.GetAbi()
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
		k.callbacks.setFailed(ctx, id, vmErr)
		return nil
	}

	if gas > cb.GasLimit {
		k.callbacks.setFailed(ctx, id, types.ErrOutOfMaxGas.Error())
		return nil
	}

	feeAmt, fee := k.callbackFee(sdkCtx, gas)
	evmKeeper := k.getEvmKeeper(0)
	cbBalance := evmKeeper.GetBalance(sdkCtx, cbAddress)

	if cbBalance.Cmp(feeAmt) == -1 {
		k.callbacks.setFailed(ctx, id, types.ErrInsufficientFunds.Error())
	}

	if err := evmKeeper.DeductTxCostsFromUserBalance(sdkCtx, fee, cbAddress); err != nil {
		k.callbacks.setFailed(ctx, id, err.Error())
		return nil
	}

	// Add gas consumed during estimation to the final gas limit for case when precompile called inside callback
	res, err := k.callEVM(sdkCtx, moduleAddress, &cbAddress, data, gas+sdkCtx.GasMeter().GasConsumed())
	if err == nil {
		if res.Failed() {
			k.callbacks.setFailed(ctx, id, res.VmError)
			return nil
		} else {
			k.callbacks.setSucceed(ctx, id, res.Return())
		}
	}

	return err
}

func (k Keeper) estimateGas(
	ctx context.Context,
	from common.Address,
	contract *common.Address,
	data []byte,
) (uint64, string, error) {
	evmKeeper := k.getEvmKeeper(0)

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
	ctx sdk.Context,
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

	evmKeeper := k.getEvmKeeper(0)
	res, err := evmKeeper.ApplyMessage(ctx, msg, evmostypes.NewNoOpTracer(), true)
	if err != nil {
		return nil, err
	}

	if err := fromAcc.SetSequence(fromAcc.GetSequence() + 1); err != nil {
		return nil, err
	}

	k.accountKeeper.SetAccount(ctx, fromAcc)

	return res, nil
}

func (k Keeper) callbackFee(sdkCtx sdk.Context, gas uint64) (feeAmt *big.Int, fee sdk.Coins) {
	evmKeeper := k.getEvmKeeper(0)
	params := evmKeeper.GetParams(sdkCtx)
	ethCfg := params.ChainConfig.EthereumConfig(evmKeeper.ChainID())
	baseFee := evmKeeper.GetBaseFee(sdkCtx, ethCfg)
	gasInt := new(big.Int).SetUint64(gas)
	feeAmt = new(big.Int).Mul(baseFee, gasInt)
	fee = sdk.Coins{{Denom: params.EvmDenom, Amount: sdkmath.NewIntFromBigInt(feeAmt)}}

	return feeAmt, fee
}
