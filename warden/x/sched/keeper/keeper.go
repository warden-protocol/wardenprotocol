package keeper

import (
	"context"
	"fmt"

	"cosmossdk.io/collections"
	"cosmossdk.io/core/store"
	errorsmod "cosmossdk.io/errors"
	"cosmossdk.io/log"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	evmkeeper "github.com/cosmos/evm/x/vm/keeper"

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
	QueuePrefix       = collections.NewPrefix(3)
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

	if acc == nil || !evmKeeper.IsContract(sdkCtx, address) {
		return id, errorsmod.Wrapf(types.ErrInvalidCallback, "callback address is not a contract")
	}

	return k.callbacks.Append(ctx, cb)
}

func (k Keeper) ExecuteCallback(
	ctx context.Context,
	id uint64,
	output []byte,
) error {
	return k.callbacks.Enqueue(ctx, id, output)
}

func (k Keeper) CallbacksQueue(ctx context.Context) collections.Map[uint64, []byte] {
	return k.callbacks.Queue()
}

func (k Keeper) GetCallbackById(ctx context.Context, id uint64) (types.Callback, error) {
	return k.callbacks.Get(ctx, id)
}

func (k Keeper) SetSuccess(ctx context.Context, id uint64, ret []byte) error {
	return k.callbacks.setSucceed(ctx, id, ret)
}

func (k Keeper) SetFailed(ctx context.Context, id uint64, err error) error {
	return k.callbacks.setFailed(ctx, id, err.Error())
}
