// Copyright 2021 Evmos Foundation
// This file is part of Evmos' Ethermint library.
//
// The Ethermint library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// The Ethermint library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Ethermint library. If not, see https://github.com/evmos/ethermint/blob/main/LICENSE
package keeper

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"math/big"
	"time"

	"github.com/ethereum/go-ethereum/eth/tracers"
	"github.com/ethereum/go-ethereum/eth/tracers/logger"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	sdkmath "cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/core"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/core/vm"
	ethparams "github.com/ethereum/go-ethereum/params"

	ethermint "github.com/evmos/ethermint/types"
	"github.com/evmos/ethermint/x/evm/statedb"
	"github.com/evmos/ethermint/x/evm/types"
)

var _ types.QueryServer = Keeper{}

const (
	defaultTraceTimeout = 5 * time.Second
)

// Account implements the Query/Account gRPC method
func (k Keeper) Account(c context.Context, req *types.QueryAccountRequest) (*types.QueryAccountResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "empty request")
	}

	if err := ethermint.ValidateAddress(req.Address); err != nil {
		return nil, status.Error(
			codes.InvalidArgument, err.Error(),
		)
	}

	addr := common.HexToAddress(req.Address)

	ctx := sdk.UnwrapSDKContext(c)
	acct := k.GetAccountOrEmpty(ctx, addr)

	return &types.QueryAccountResponse{
		Balance:  acct.Balance.String(),
		CodeHash: common.BytesToHash(acct.CodeHash).Hex(),
		Nonce:    acct.Nonce,
	}, nil
}

func (k Keeper) CosmosAccount(c context.Context, req *types.QueryCosmosAccountRequest) (*types.QueryCosmosAccountResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "empty request")
	}

	if err := ethermint.ValidateAddress(req.Address); err != nil {
		return nil, status.Error(
			codes.InvalidArgument, err.Error(),
		)
	}

	ctx := sdk.UnwrapSDKContext(c)

	ethAddr := common.HexToAddress(req.Address)
	cosmosAddr := sdk.AccAddress(ethAddr.Bytes())

	account := k.accountKeeper.GetAccount(ctx, cosmosAddr)
	res := types.QueryCosmosAccountResponse{
		CosmosAddress: cosmosAddr.String(),
	}

	if account != nil {
		res.Sequence = account.GetSequence()
		res.AccountNumber = account.GetAccountNumber()
	}

	return &res, nil
}

// ValidatorAccount implements the Query/Balance gRPC method
func (k Keeper) ValidatorAccount(c context.Context, req *types.QueryValidatorAccountRequest) (*types.QueryValidatorAccountResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "empty request")
	}

	consAddr, err := sdk.ConsAddressFromBech32(req.ConsAddress)
	if err != nil {
		return nil, status.Error(
			codes.InvalidArgument, err.Error(),
		)
	}

	ctx := sdk.UnwrapSDKContext(c)

	validator, found := k.stakingKeeper.GetValidatorByConsAddr(ctx, consAddr)
	if !found {
		return nil, fmt.Errorf("validator not found for %s", consAddr.String())
	}

	accAddr := sdk.AccAddress(validator.GetOperator())

	res := types.QueryValidatorAccountResponse{
		AccountAddress: accAddr.String(),
	}

	account := k.accountKeeper.GetAccount(ctx, accAddr)
	if account != nil {
		res.Sequence = account.GetSequence()
		res.AccountNumber = account.GetAccountNumber()
	}

	return &res, nil
}

// Balance implements the Query/Balance gRPC method
func (k Keeper) Balance(c context.Context, req *types.QueryBalanceRequest) (*types.QueryBalanceResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "empty request")
	}

	if err := ethermint.ValidateAddress(req.Address); err != nil {
		return nil, status.Error(
			codes.InvalidArgument,
			types.ErrZeroAddress.Error(),
		)
	}

	ctx := sdk.UnwrapSDKContext(c)

	balanceInt := k.GetBalance(ctx, common.HexToAddress(req.Address))

	return &types.QueryBalanceResponse{
		Balance: balanceInt.String(),
	}, nil
}

// Storage implements the Query/Storage gRPC method
func (k Keeper) Storage(c context.Context, req *types.QueryStorageRequest) (*types.QueryStorageResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "empty request")
	}

	if err := ethermint.ValidateAddress(req.Address); err != nil {
		return nil, status.Error(
			codes.InvalidArgument,
			types.ErrZeroAddress.Error(),
		)
	}

	ctx := sdk.UnwrapSDKContext(c)

	address := common.HexToAddress(req.Address)
	key := common.HexToHash(req.Key)

	state := k.GetState(ctx, address, key)
	stateHex := state.Hex()

	return &types.QueryStorageResponse{
		Value: stateHex,
	}, nil
}

// Code implements the Query/Code gRPC method
func (k Keeper) Code(c context.Context, req *types.QueryCodeRequest) (*types.QueryCodeResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "empty request")
	}

	if err := ethermint.ValidateAddress(req.Address); err != nil {
		return nil, status.Error(
			codes.InvalidArgument,
			types.ErrZeroAddress.Error(),
		)
	}

	ctx := sdk.UnwrapSDKContext(c)

	address := common.HexToAddress(req.Address)
	acct := k.GetAccountWithoutBalance(ctx, address)

	var code []byte
	if acct != nil && acct.IsContract() {
		code = k.GetCode(ctx, common.BytesToHash(acct.CodeHash))
	}

	return &types.QueryCodeResponse{
		Code: code,
	}, nil
}

// Params implements the Query/Params gRPC method
func (k Keeper) Params(c context.Context, _ *types.QueryParamsRequest) (*types.QueryParamsResponse, error) {
	ctx := sdk.UnwrapSDKContext(c)
	params := k.GetParams(ctx)

	return &types.QueryParamsResponse{
		Params: params,
	}, nil
}

// EthCall implements eth_call rpc api.
func (k Keeper) EthCall(c context.Context, req *types.EthCallRequest) (*types.MsgEthereumTxResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "empty request")
	}

	ctx := sdk.UnwrapSDKContext(c)

	var args types.TransactionArgs
	err := json.Unmarshal(req.Args, &args)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	chainID, err := getChainID(ctx, req.ChainId)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	cfg, err := k.EVMConfig(ctx, GetProposerAddress(ctx, req.ProposerAddress), chainID)
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	// ApplyMessageWithConfig expect correct nonce set in msg
	nonce := k.GetNonce(ctx, args.GetFrom())
	args.Nonce = (*hexutil.Uint64)(&nonce)

	msg, err := args.ToMessage(req.GasCap, cfg.BaseFee)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}

	txConfig := statedb.NewEmptyTxConfig(common.BytesToHash(ctx.HeaderHash()))

	// pass false to not commit StateDB
	res, err := k.ApplyMessageWithConfig(ctx, msg, nil, false, cfg, txConfig)
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return res, nil
}

// EstimateGas implements eth_estimateGas rpc api.
func (k Keeper) EstimateGas(c context.Context, req *types.EthCallRequest) (*types.EstimateGasResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "empty request")
	}

	ctx := sdk.UnwrapSDKContext(c)
	chainID, err := getChainID(ctx, req.ChainId)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}

	if req.GasCap < ethparams.TxGas {
		return nil, status.Error(codes.InvalidArgument, "gas cap cannot be lower than 21,000")
	}

	var args types.TransactionArgs
	err = json.Unmarshal(req.Args, &args)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}

	// Binary search the gas requirement, as it may be higher than the amount used
	var (
		lo     = ethparams.TxGas - 1
		hi     uint64
		gasCap uint64
	)

	// Determine the highest gas limit can be used during the estimation.
	if args.Gas != nil && uint64(*args.Gas) >= ethparams.TxGas {
		hi = uint64(*args.Gas)
	} else {
		// Query block gas limit
		params := ctx.ConsensusParams()
		if params != nil && params.Block != nil && params.Block.MaxGas > 0 {
			hi = uint64(params.Block.MaxGas)
		} else {
			hi = req.GasCap
		}
	}

	// TODO: Recap the highest gas limit with account's available balance.

	// Recap the highest gas allowance with specified gascap.
	if req.GasCap != 0 && hi > req.GasCap {
		hi = req.GasCap
	}
	gasCap = hi
	cfg, err := k.EVMConfig(ctx, GetProposerAddress(ctx, req.ProposerAddress), chainID)
	if err != nil {
		return nil, status.Error(codes.Internal, "failed to load evm config")
	}

	// ApplyMessageWithConfig expect correct nonce set in msg
	nonce := k.GetNonce(ctx, args.GetFrom())
	args.Nonce = (*hexutil.Uint64)(&nonce)

	txConfig := statedb.NewEmptyTxConfig(common.BytesToHash(ctx.HeaderHash().Bytes()))

	// convert the tx args to an ethereum message
	msg, err := args.ToMessage(req.GasCap, cfg.BaseFee)
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	// NOTE: the errors from the executable below should be consistent with go-ethereum,
	// so we don't wrap them with the gRPC status code

	// Create a helper to check if a gas allowance results in an executable transaction
	executable := func(gas uint64) (vmError bool, rsp *types.MsgEthereumTxResponse, err error) {
		// update the message with the new gas value
		msg = ethtypes.NewMessage(
			msg.From(),
			msg.To(),
			msg.Nonce(),
			msg.Value(),
			gas,
			msg.GasPrice(),
			msg.GasFeeCap(),
			msg.GasTipCap(),
			msg.Data(),
			msg.AccessList(),
			msg.IsFake(),
		)

		// pass false to not commit StateDB
		rsp, err = k.ApplyMessageWithConfig(ctx, msg, nil, false, cfg, txConfig)
		if err != nil {
			if errors.Is(err, core.ErrIntrinsicGas) {
				return true, nil, nil // Special case, raise gas limit
			}
			return true, nil, err // Bail out
		}
		return len(rsp.VmError) > 0, rsp, nil
	}

	// Execute the binary search and hone in on an executable gas limit
	hi, err = types.BinSearch(lo, hi, executable)
	if err != nil {
		return nil, err
	}

	// Reject the transaction as invalid if it still fails at the highest allowance
	if hi == gasCap {
		failed, result, err := executable(hi)
		if err != nil {
			return nil, err
		}

		if failed {
			if result != nil && result.VmError != vm.ErrOutOfGas.Error() {
				if result.VmError == vm.ErrExecutionReverted.Error() {
					return &types.EstimateGasResponse{
						Ret:     result.Ret,
						VmError: result.VmError,
					}, nil
				}
				return nil, errors.New(result.VmError)
			}
			// Otherwise, the specified gas cap is too low
			return nil, fmt.Errorf("gas required exceeds allowance (%d)", gasCap)
		}
	}
	return &types.EstimateGasResponse{Gas: hi}, nil
}

// TraceTx configures a new tracer according to the provided configuration, and
// executes the given message in the provided environment. The return value will
// be tracer dependent.
func (k Keeper) TraceTx(c context.Context, req *types.QueryTraceTxRequest) (*types.QueryTraceTxResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "empty request")
	}

	if req.TraceConfig != nil && req.TraceConfig.Limit < 0 {
		return nil, status.Errorf(codes.InvalidArgument, "output limit cannot be negative, got %d", req.TraceConfig.Limit)
	}

	// get the context of block beginning
	contextHeight := req.BlockNumber
	if contextHeight < 1 {
		// 0 is a special value in `ContextWithHeight`
		contextHeight = 1
	}

	ctx := sdk.UnwrapSDKContext(c)
	ctx = ctx.WithBlockHeight(contextHeight)
	ctx = ctx.WithBlockTime(req.BlockTime)
	ctx = ctx.WithHeaderHash(common.Hex2Bytes(req.BlockHash))
	chainID, err := getChainID(ctx, req.ChainId)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	cfg, err := k.EVMConfig(ctx, GetProposerAddress(ctx, req.ProposerAddress), chainID)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to load evm config: %s", err.Error())
	}
	signer := ethtypes.MakeSigner(cfg.ChainConfig, big.NewInt(ctx.BlockHeight()))

	txConfig := statedb.NewEmptyTxConfig(common.BytesToHash(ctx.HeaderHash().Bytes()))
	for i, tx := range req.Predecessors {
		ethTx := tx.AsTransaction()
		msg, err := ethTx.AsMessage(signer, cfg.BaseFee)
		if err != nil {
			continue
		}
		txConfig.TxHash = ethTx.Hash()
		txConfig.TxIndex = uint(i)
		rsp, err := k.ApplyMessageWithConfig(ctx, msg, types.NewNoOpTracer(), true, cfg, txConfig)
		if err != nil {
			continue
		}
		txConfig.LogIndex += uint(len(rsp.Logs))
	}

	tx := req.Msg.AsTransaction()
	txConfig.TxHash = tx.Hash()
	if len(req.Predecessors) > 0 {
		txConfig.TxIndex++
	}

	var tracerConfig json.RawMessage
	if req.TraceConfig != nil && req.TraceConfig.TracerJsonConfig != "" {
		// ignore error. default to no traceConfig
		_ = json.Unmarshal([]byte(req.TraceConfig.TracerJsonConfig), &tracerConfig)
	}

	result, _, err := k.traceTx(ctx, cfg, txConfig, signer, tx, req.TraceConfig, false, tracerConfig)
	if err != nil {
		// error will be returned with detail status from traceTx
		return nil, err
	}

	resultData, err := json.Marshal(result)
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryTraceTxResponse{
		Data: resultData,
	}, nil
}

// TraceBlock configures a new tracer according to the provided configuration, and
// executes the given message in the provided environment for all the transactions in the queried block.
// The return value will be tracer dependent.
func (k Keeper) TraceBlock(c context.Context, req *types.QueryTraceBlockRequest) (*types.QueryTraceBlockResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "empty request")
	}

	if req.TraceConfig != nil && req.TraceConfig.Limit < 0 {
		return nil, status.Errorf(codes.InvalidArgument, "output limit cannot be negative, got %d", req.TraceConfig.Limit)
	}

	// get the context of block beginning
	contextHeight := req.BlockNumber
	if contextHeight < 1 {
		// 0 is a special value in `ContextWithHeight`
		contextHeight = 1
	}

	ctx := sdk.UnwrapSDKContext(c)
	ctx = ctx.WithBlockHeight(contextHeight)
	ctx = ctx.WithBlockTime(req.BlockTime)
	ctx = ctx.WithHeaderHash(common.Hex2Bytes(req.BlockHash))
	chainID, err := getChainID(ctx, req.ChainId)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}

	cfg, err := k.EVMConfig(ctx, GetProposerAddress(ctx, req.ProposerAddress), chainID)
	if err != nil {
		return nil, status.Error(codes.Internal, "failed to load evm config")
	}
	signer := ethtypes.MakeSigner(cfg.ChainConfig, big.NewInt(ctx.BlockHeight()))
	txsLength := len(req.Txs)
	results := make([]*types.TxTraceResult, 0, txsLength)

	txConfig := statedb.NewEmptyTxConfig(common.BytesToHash(ctx.HeaderHash().Bytes()))
	for i, tx := range req.Txs {
		result := types.TxTraceResult{}
		ethTx := tx.AsTransaction()
		txConfig.TxHash = ethTx.Hash()
		txConfig.TxIndex = uint(i)
		traceResult, logIndex, err := k.traceTx(ctx, cfg, txConfig, signer, ethTx, req.TraceConfig, true, nil)
		if err != nil {
			result.Error = err.Error()
		} else {
			txConfig.LogIndex = logIndex
			result.Result = traceResult
		}
		results = append(results, &result)
	}

	resultData, err := json.Marshal(results)
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryTraceBlockResponse{
		Data: resultData,
	}, nil
}

// traceTx do trace on one transaction, it returns a tuple: (traceResult, nextLogIndex, error).
func (k *Keeper) traceTx(
	ctx sdk.Context,
	cfg *statedb.EVMConfig,
	txConfig statedb.TxConfig,
	signer ethtypes.Signer,
	tx *ethtypes.Transaction,
	traceConfig *types.TraceConfig,
	commitMessage bool,
	tracerJSONConfig json.RawMessage,
) (*interface{}, uint, error) {
	// Assemble the structured logger or the JavaScript tracer
	var (
		tracer    tracers.Tracer
		overrides *ethparams.ChainConfig
		err       error
		timeout   = defaultTraceTimeout
	)
	msg, err := tx.AsMessage(signer, cfg.BaseFee)
	if err != nil {
		return nil, 0, status.Error(codes.Internal, err.Error())
	}

	if traceConfig == nil {
		traceConfig = &types.TraceConfig{}
	}

	if traceConfig.Overrides != nil {
		overrides = traceConfig.Overrides.EthereumConfig(cfg.ChainConfig.ChainID)
	}

	logConfig := logger.Config{
		EnableMemory:     traceConfig.EnableMemory,
		DisableStorage:   traceConfig.DisableStorage,
		DisableStack:     traceConfig.DisableStack,
		EnableReturnData: traceConfig.EnableReturnData,
		Debug:            traceConfig.Debug,
		Limit:            int(traceConfig.Limit),
		Overrides:        overrides,
	}

	tracer = logger.NewStructLogger(&logConfig)

	tCtx := &tracers.Context{
		BlockHash: txConfig.BlockHash,
		TxIndex:   int(txConfig.TxIndex),
		TxHash:    txConfig.TxHash,
	}

	if traceConfig.Tracer != "" {
		if tracer, err = tracers.New(traceConfig.Tracer, tCtx, tracerJSONConfig); err != nil {
			return nil, 0, status.Error(codes.Internal, err.Error())
		}
	}

	// Define a meaningful timeout of a single transaction trace
	if traceConfig.Timeout != "" {
		if timeout, err = time.ParseDuration(traceConfig.Timeout); err != nil {
			return nil, 0, status.Errorf(codes.InvalidArgument, "timeout value: %s", err.Error())
		}
	}

	// Handle timeouts and RPC cancellations
	deadlineCtx, cancel := context.WithTimeout(ctx.Context(), timeout)
	defer cancel()

	go func() {
		<-deadlineCtx.Done()
		if errors.Is(deadlineCtx.Err(), context.DeadlineExceeded) {
			tracer.Stop(errors.New("execution timeout"))
		}
	}()

	res, err := k.ApplyMessageWithConfig(ctx, msg, tracer, commitMessage, cfg, txConfig)
	if err != nil {
		return nil, 0, status.Error(codes.Internal, err.Error())
	}

	var result interface{}
	result, err = tracer.GetResult()
	if err != nil {
		return nil, 0, status.Error(codes.Internal, err.Error())
	}

	return &result, txConfig.LogIndex + uint(len(res.Logs)), nil
}

// BaseFee implements the Query/BaseFee gRPC method
func (k Keeper) BaseFee(c context.Context, _ *types.QueryBaseFeeRequest) (*types.QueryBaseFeeResponse, error) {
	ctx := sdk.UnwrapSDKContext(c)

	params := k.GetParams(ctx)
	ethCfg := params.ChainConfig.EthereumConfig(k.eip155ChainID)
	baseFee := k.GetBaseFee(ctx, ethCfg)

	res := &types.QueryBaseFeeResponse{}
	if baseFee != nil {
		aux := sdkmath.NewIntFromBigInt(baseFee)
		res.BaseFee = &aux
	}

	return res, nil
}

// getChainID parse chainID from current context if not provided
func getChainID(ctx sdk.Context, chainID int64) (*big.Int, error) {
	if chainID == 0 {
		return ethermint.ParseChainID(ctx.ChainID())
	}
	return big.NewInt(chainID), nil
}
