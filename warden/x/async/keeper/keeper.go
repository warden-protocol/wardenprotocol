// Copyright (c) 2025 Warden Labs. All Rights Reserved.
//
// ** RESTRICTED LICENSE **
//
// This file is part of the 'async' module. It is NOT licensed
// under the Apache 2.0 license governing the rest of the project.
// Refer to the LICENSE file in this module's directory for full terms.
// Use, modification, and distribution are strictly limited.
// Do NOT use this file unless you agree to the terms stated in that license.
//
// SPDX-FileCopyrightText: 2025 Warden Labs
// SPDX-License-Identifier: LicenseRef-Proprietary-RestrictedModule

package keeper

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"math/big"

	"cosmossdk.io/collections"
	"cosmossdk.io/core/store"
	errorsmod "cosmossdk.io/errors"
	"cosmossdk.io/log"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	errortypes "github.com/cosmos/cosmos-sdk/types/errors"
	stakingkeeper "github.com/cosmos/cosmos-sdk/x/staking/keeper"
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
		asyncModuleAddress sdk.AccAddress

		stakingKeeper *stakingkeeper.Keeper

		tasks              *TaskKeeper
		plugins            collections.Map[string, types.Plugin]
		pluginsByValidator collections.KeySet[collections.Pair[sdk.ConsAddress, string]]
		getEvmKeeper       func(_placeHolder int16) *evmkeeper.Keeper
		accountKeeper      types.AccountKeeper
		bankKeeper         types.BankKeeper
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
	PluginsPrefix       = collections.NewPrefix(7)
)

func NewKeeper(
	cdc codec.Codec,
	storeService store.KVStoreService,
	logger log.Logger,
	authority string,
	p *prophet.P,
	getEvmKeeper func(_placeHolder int16) *evmkeeper.Keeper,
	asyncModuleAddress sdk.AccAddress,
	accountKeeper types.AccountKeeper,
	bankKeeper types.BankKeeper,
	stakingKeeper *stakingkeeper.Keeper,
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

	plugins := collections.NewMap(sb, PluginsPrefix, "plugins", collections.StringKey, codec.CollValue[types.Plugin](cdc))
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
		plugins:            plugins,
		pluginsByValidator: pluginsByValidator,
		getEvmKeeper:       getEvmKeeper,
		accountKeeper:      accountKeeper,
		bankKeeper:         bankKeeper,
		stakingKeeper:      stakingKeeper,
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

	if err := k.releaseFee(ctx, id, submitter); err != nil {
		return err
	}

	return nil
}

func (k Keeper) releaseFee(ctx context.Context, id uint64, submitter []byte) error {
	task, err := k.tasks.Get(ctx, id)
	if err != nil {
		return err
	}

	if task.Fee != nil {
		plugin, err := k.plugins.Get(ctx, task.Plugin)
		if err != nil {
			return err
		}

		pluginCreator := k.asyncModuleAddress
		if plugin.IsThirdPartyPlugin() {
			pluginCreator, err = plugin.CreatorAccAddress()
			if err != nil {
				return err
			}
		}

		taskExecutor, err := k.getValidatorAddress(ctx, submitter)
		if err != nil {
			return err
		}

		if err := k.releasePluginFees(ctx, pluginCreator, taskExecutor, *task.Fee); err != nil {
			return err
		}
	}

	return nil
}

func (k Keeper) getValidatorAddress(
	ctx context.Context,
	submitter []byte,
) (sdk.AccAddress, error) {
	val, err := k.stakingKeeper.ValidatorByConsAddr(ctx, submitter)
	if err != nil {
		return nil, err
	}

	valAddr := val.GetOperator()
	addr, err := sdk.ValAddressFromBech32(valAddr)
	if err != nil {
		return nil, err
	}

	return sdk.AccAddress(addr), nil
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

func (k *Keeper) AddPlugin(ctx context.Context, p types.Plugin) error {
	id := p.GetId()

	if id == "" {
		return errors.New("plugin ID cannot be empty")
	}

	found, err := k.plugins.Has(ctx, id)
	if err != nil {
		return err
	}
	if found {
		return fmt.Errorf("duplicate plugin: %s", p.GetId())
	}

	if !p.Fees.IsValid() {
		return fmt.Errorf("invalid plugin fees: %s", p.Fees)
	}

	return k.plugins.Set(ctx, id, p)
}

func (k *Keeper) GetPlugin(ctx context.Context, id string) (types.Plugin, error) {
	return k.plugins.Get(ctx, id)
}

// RegisterPluginValidator registers a validator as a plugin provider.
func (k *Keeper) RegisterPluginValidator(ctx context.Context, validator sdk.ConsAddress, id string) error {
	found, err := k.plugins.Has(ctx, id)
	if err != nil {
		return err
	}
	if !found {
		return fmt.Errorf("plugin doesn't exist: %s", id)
	}
	return k.pluginsByValidator.Set(ctx, collections.Join(validator, id))
}

// HasPluginValidators returns whether there are some validators registered to the request plugin.
func (k *Keeper) HasPluginValidators(ctx context.Context, id string) bool {
	// TODO: will be implemented when we'll keep track of validators priorities.
	return true
}

// ClearPlugins removes all handlers registered for a validator.
func (k *Keeper) ClearPlugins(ctx context.Context, validator sdk.ConsAddress) error {
	r := collections.NewPrefixedPairRange[sdk.ConsAddress, string](validator)
	return k.pluginsByValidator.Clear(ctx, r)
}
