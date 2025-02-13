package keeper

import (
	"context"
	"fmt"

	"cosmossdk.io/collections"
	"cosmossdk.io/core/store"
	"cosmossdk.io/log"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"

	evmkeeper "github.com/evmos/evmos/v20/x/evm/keeper"
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
		authority string

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
)

func NewKeeper(
	cdc codec.Codec,
	getEvmKeeper func(_placeHolder int16) evmkeeper.Keeper,
	storeService store.KVStoreService,
	logger log.Logger,
	authority string,
	p *prophet.P,
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
		cdc:          cdc,
		storeService: storeService,
		authority:    authority,
		logger:       logger,

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
