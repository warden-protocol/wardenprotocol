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

// GetAuthority returns the module's authority.
func (k Keeper) GetAuthority() string {
	return k.authority
}

// Logger returns a module-specific logger.
func (k Keeper) Logger() log.Logger {
	return k.logger.With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) SetCallback(ctx context.Context, cb *types.Callback) (uint64, error) {
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

	res, err := k.callEVMWithData( //nolint:contextcheck
		sdkCtx,
		common.BytesToAddress(k.schedModuleAddress.Bytes()),
		&cbAddress,
		data,
	)

	if res.Failed() {
		// Do not throw error if contract fails
		return nil
	}

	// TODO: write callback result
	return err
}

func (k Keeper) callEVMWithData(
	ctx sdk.Context,
	from common.Address,
	contract *common.Address,
	data []byte,
) (*evmostypes.MsgEthereumTxResponse, error) {
	fromAcc := k.accountKeeper.GetAccount(ctx, from.Bytes())
	if fromAcc == nil {
		fromAcc = k.accountKeeper.NewAccountWithAddress(ctx, from.Bytes())
		k.accountKeeper.SetAccount(ctx, fromAcc)
	}

	nonce := fromAcc.GetSequence()

	evmKeeper := k.getEvmKeeper(0)

	args, err := json.Marshal(evmostypes.TransactionArgs{
		From: &from,
		To:   contract,
		Data: (*hexutil.Bytes)(&data),
	})
	if err != nil {
		return nil, errorsmod.Wrapf(errortypes.ErrJSONMarshal, "failed to marshal tx args: %s", err.Error())
	}

	gasRes, err := evmKeeper.EstimateGasInternal(ctx, &evmostypes.EthCallRequest{
		Args:   args,
		GasCap: evmosconf.DefaultGasCap,
	}, evmostypes.Internal)
	if err != nil {
		return nil, err
	}

	// 1. Gas estimation also consumes gas.
	// 2. Precompile creates new gas meter limited to contract gas cap. This new gas meter should consume gas from prev gas meter.
	// 3. TODO: configurable gas limit on module level.
	gasCap := gasRes.Gas + ctx.GasMeter().GasConsumed()

	msg := ethtypes.NewMessage(
		from,
		contract,
		nonce,
		big.NewInt(0), // amount
		gasCap,        // gasLimit
		big.NewInt(0), // gasFeeCap
		big.NewInt(0), // gasTipCap
		big.NewInt(0), // gasPrice
		data,
		ethtypes.AccessList{}, // AccessList
		false,                 // isFake
	)

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
