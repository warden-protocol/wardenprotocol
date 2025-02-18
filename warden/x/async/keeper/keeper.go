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

		futures      *FutureKeeper
		handlers     *HandlersKeeper
		getEvmKeeper func(_placeHolder int16) evmkeeper.Keeper
		votes        collections.Map[collections.Pair[uint64, []byte], int32]

		p *prophet.P
	}
)

var (
	FutureSeqPrefix       = collections.NewPrefix(0)
	FuturesPrefix         = collections.NewPrefix(1)
	FutureByAddressPrefix = collections.NewPrefix(2)
	ResultsPrefix         = collections.NewPrefix(3)
	VotesPrefix           = collections.NewPrefix(4)
	PendingFuturesPrefix  = collections.NewPrefix(5)
	HandlersPrefix        = collections.NewPrefix(6)
	ValidatorsByHandler   = collections.NewPrefix(7)
	HandlersByValidator   = collections.NewPrefix(8)
	FutureCallbackPrefix  = collections.NewPrefix(9)
)

func NewKeeper(
	cdc codec.Codec,
	storeService store.KVStoreService,
	logger log.Logger,
	authority string,
	p *prophet.P,
	getEvmKeeper func(_placeHolder int16) evmkeeper.Keeper,
	asyncModuleAddress sdk.Address,
	//selfValAddr sdk.ConsAddress,
) Keeper {
	if _, err := sdk.AccAddressFromBech32(authority); err != nil {
		panic(fmt.Sprintf("invalid authority address: %s", authority))
	}

	sb := collections.NewSchemaBuilder(storeService)

	futures := NewFutureKeeper(sb, cdc)
	handlers := NewHandlersKeeper(sb, cdc)
	votes := collections.NewMap(
		sb,
		VotesPrefix,
		"votes",
		collections.PairKeyCodec(collections.Uint64Key, collections.BytesKey),
		collections.Int32Value,
	)

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

		futures:      futures,
		handlers:     handlers,
		getEvmKeeper: getEvmKeeper,
		votes:        votes,

		p: p,
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

func (k Keeper) AddFutureResult(ctx context.Context, id uint64, submitter, output []byte) error {
	if err := k.futures.SetResult(ctx, types.FutureResult{
		Id:        id,
		Output:    output,
		Submitter: submitter,
	}); err != nil {
		return err
	}

	if err := k.SetFutureVote(ctx, id, submitter, types.FutureVoteType_VOTE_TYPE_VERIFIED); err != nil {
		return err
	}

	if err := k.futureReadyCallback(ctx, id, output); err != nil {
		return err
	}

	return nil
}

func (k Keeper) SetFutureVote(ctx context.Context, id uint64, voter []byte, vote types.FutureVoteType) error {
	if !vote.IsValid() {
		return fmt.Errorf("invalid vote type: %v", vote)
	}
	return k.votes.Set(ctx, collections.Join(id, voter), int32(vote))
}

func (k Keeper) GetFutureVotes(ctx context.Context, futureId uint64) ([]types.FutureVote, error) {
	it, err := k.votes.Iterate(ctx, collections.NewPrefixedPairRange[uint64, []byte](futureId))
	if err != nil {
		return nil, err
	}
	defer it.Close()

	var votes []types.FutureVote
	for ; it.Valid(); it.Next() {
		key, err := it.Key()
		if err != nil {
			return nil, err
		}
		vote, err := it.Value()
		if err != nil {
			return nil, err
		}
		votes = append(votes, types.FutureVote{
			FutureId: futureId,
			Voter:    key.K2(),
			Vote:     types.FutureVoteType(vote),
		})
	}

	return votes, nil
}

func (k Keeper) futureReadyCallback(
	ctx context.Context,
	id uint64,
	output []byte,
) error {
	cb, err := k.futures.callbacks.Get(ctx, id)

	if errors.Is(err, collections.ErrNotFound) {
		return nil
	}

	if err != nil {
		return err
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)

	abi, err := callbacks.IAsyncCallbackMetaData.GetAbi()
	method := "cb"
	if _, ok := abi.Methods[method]; !ok {
		return fmt.Errorf("invalid callback method: %v", method)
	}

	if err != nil {
		return nil
	}

	cbAddress, err := precommon.AddressFromBech32Str(cb.Address)

	if err != nil {
		return nil
	}

	data, err := abi.Pack(method, id, output)
	if err != nil {
		return err
	}

	res, err := k.CallEVMWithData(
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

func (k Keeper) CallEVMWithData(
	ctx sdk.Context,
	from common.Address,
	contract *common.Address,
	data []byte,
) (*evmostypes.MsgEthereumTxResponse, error) {
	var nonce uint64 = 0
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

	return res, nil
}
