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
	"github.com/warden-protocol/wardenprotocol/prophet"
	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

type (
	Keeper struct {
		cdc          codec.Codec
		storeService store.KVStoreService
		logger       log.Logger

		// the address capable of executing a MsgUpdateParams message. Typically, this
		// should be the x/gov module account.
		authority          string
		asyncModuleAddress sdk.Address

		tasks              *TaskKeeper
		pluginsByValidator collections.KeySet[collections.Pair[sdk.ConsAddress, string]]
		getEvmKeeper       func(_placeHolder int16) *evmkeeper.Keeper
		accountKeeper      types.AccountKeeper
		votes              collections.Map[collections.Pair[uint64, []byte], int32]

		p *prophet.P
	}
)

var (
	TaskSeqPrefix       = collections.NewPrefix(0)
	TasksPrefix         = collections.NewPrefix(1)
	TaskByAddressPrefix = collections.NewPrefix(2)
	ResultsPrefix       = collections.NewPrefix(3)
	VotesPrefix         = collections.NewPrefix(4)
	PendingTasksPrefix  = collections.NewPrefix(5)
	PluginsByValidator  = collections.NewPrefix(6)
)

func NewKeeper(
	cdc codec.Codec,
	storeService store.KVStoreService,
	logger log.Logger,
	authority string,
	p *prophet.P,
	getEvmKeeper func(_placeHolder int16) *evmkeeper.Keeper,
	asyncModuleAddress sdk.Address,
	accountKeeper types.AccountKeeper,
	// selfValAddr sdk.ConsAddress,
) Keeper {
	if _, err := sdk.AccAddressFromBech32(authority); err != nil {
		panic("invalid authority address: " + authority)
	}

	sb := collections.NewSchemaBuilder(storeService)

	tasks := NewTaskKeeper(sb, cdc)
	votes := collections.NewMap(
		sb,
		VotesPrefix,
		"votes",
		collections.PairKeyCodec(collections.Uint64Key, collections.BytesKey),
		collections.Int32Value,
	)

	pluginsByValidator := collections.NewKeySet(sb, PluginsByValidator, "handlers_by_validator", collections.PairKeyCodec(sdk.ConsAddressKey, collections.StringKey))

	_, err := sb.Build()
	if err != nil {
		panic(fmt.Sprintf("failed to build schema: %s", err))
	}

	return Keeper{
		cdc:                cdc,
		storeService:       storeService,
		authority:          authority,
		asyncModuleAddress: asyncModuleAddress,
		logger:             logger,

		tasks:              tasks,
		pluginsByValidator: pluginsByValidator,
		getEvmKeeper:       getEvmKeeper,
		accountKeeper:      accountKeeper,
		votes:              votes,

		p: p,
	}
}

// GetAuthority returns the module's authority.
func (k Keeper) GetAuthority() string {
	return k.authority
}

// Logger returns a module-specific logger.
func (k Keeper) Logger() log.Logger {
	return k.logger.With("module", "x/"+types.ModuleName)
}

func (k Keeper) AddTaskResult(ctx context.Context, id uint64, submitter, output []byte) error {
	if err := k.tasks.SetResult(ctx, types.TaskResult{
		Id:        id,
		Output:    output,
		Submitter: submitter,
	}); err != nil {
		return err
	}

	if err := k.SetTaskVote(ctx, id, submitter, types.TaskVoteType_VOTE_TYPE_VERIFIED); err != nil {
		return err
	}

	if err := k.taskReadyCallback(ctx, id, output); err != nil {
		return err
	}

	return nil
}

func (k Keeper) SetTaskVote(ctx context.Context, id uint64, voter []byte, vote types.TaskVoteType) error {
	if !vote.IsValid() {
		return fmt.Errorf("invalid vote type: %v", vote)
	}

	return k.votes.Set(ctx, collections.Join(id, voter), int32(vote))
}

func (k Keeper) GetTaskVotes(ctx context.Context, taskId uint64) ([]types.TaskVote, error) {
	it, err := k.votes.Iterate(ctx, collections.NewPrefixedPairRange[uint64, []byte](taskId))
	if err != nil {
		return nil, err
	}
	defer it.Close()

	var votes []types.TaskVote

	for ; it.Valid(); it.Next() {
		key, err := it.Key()
		if err != nil {
			return nil, err
		}

		vote, err := it.Value()
		if err != nil {
			return nil, err
		}

		votes = append(votes, types.TaskVote{
			TaskId: taskId,
			Voter:  key.K2(),
			Vote:   types.TaskVoteType(vote),
		})
	}

	return votes, nil
}

func (k Keeper) taskReadyCallback(
	ctx context.Context,
	id uint64,
	output []byte,
) error {
	task, err := k.tasks.Get(ctx, id)
	if err != nil {
		return err
	}

	if task.Callback == "" {
		return nil
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

	cbAddress, err := precommon.AddressFromBech32Str(task.Callback)
	if err != nil {
		return err
	}

	data, err := abi.Pack(method, id, output)
	if err != nil {
		return err
	}

	res, err := k.callEVMWithData( //nolint:contextcheck
		sdkCtx,
		common.BytesToAddress(k.asyncModuleAddress.Bytes()),
		&cbAddress,
		data,
	)

	if res.Failed() {
		// Do not throw error if contract fails
		return nil
	}

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

func (k Keeper) getCompletedTasksWithoutValidatorVote(ctx context.Context, valAddress []byte, limit int) ([]prophet.TaskResult, error) {
	it, err := k.tasks.results.IterateRaw(ctx, nil, nil, collections.OrderDescending)
	if err != nil {
		return nil, err
	}
	defer it.Close()

	tasks := make([]prophet.TaskResult, 0, limit)

	for ; it.Valid(); it.Next() {
		id, err := it.Key()
		if err != nil {
			return nil, err
		}

		result, err := it.Value()
		if err != nil {
			return nil, err
		}

		found, err := k.votes.Has(ctx, collections.Join(id, valAddress))
		if found {
			continue
		}

		if err != nil {
			return nil, err
		}

		fut, err := k.tasks.Get(ctx, id)
		if err != nil {
			return nil, err
		}

		tasks = append(tasks, prophet.TaskResult{
			Task: prophet.Task{
				ID:     fut.Id,
				Plugin: fut.Plugin,
				Input:  fut.Input,
			},
			Output: result.Output,
		})
		if len(tasks) == limit {
			break
		}
	}

	return tasks, nil
}

// RegisterPlugin register validator as a handler provider.
func (k *Keeper) RegisterPlugin(ctx context.Context, validator sdk.ConsAddress, handlerName string) error {
	return k.pluginsByValidator.Set(ctx, collections.Join(validator, handlerName))
}

// ClearPlugins removes all handlers registered for a validator.
func (k *Keeper) ClearPlugins(ctx context.Context, validator sdk.ConsAddress) error {
	r := collections.Range[collections.Pair[sdk.ConsAddress, string]]{}
	return k.pluginsByValidator.Clear(ctx, r.Prefix(collections.PairPrefix[sdk.ConsAddress, string](sdk.ConsAddress(validator))))
}
