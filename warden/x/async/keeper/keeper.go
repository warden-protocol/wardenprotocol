package keeper

import (
	"context"
	"fmt"

	"cosmossdk.io/collections"
	"cosmossdk.io/core/store"
	"cosmossdk.io/log"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"

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

		futures *FutureKeeper
		votes   collections.Map[collections.Pair[uint64, []byte], int32]
	}
)

var (
	FutureSeqPrefix       = collections.NewPrefix(0)
	FuturesPrefix         = collections.NewPrefix(1)
	FutureByAddressPrefix = collections.NewPrefix(2)
	ResultsPrefix         = collections.NewPrefix(3)
	VotesPrefix           = collections.NewPrefix(4)
)

func NewKeeper(
	cdc codec.Codec,
	storeService store.KVStoreService,
	logger log.Logger,
	authority string,
) Keeper {
	if _, err := sdk.AccAddressFromBech32(authority); err != nil {
		panic(fmt.Sprintf("invalid authority address: %s", authority))
	}

	sb := collections.NewSchemaBuilder(storeService)

	futures := NewFutureKeeper(sb, cdc)
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

		futures: futures,
		votes:   votes,
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
