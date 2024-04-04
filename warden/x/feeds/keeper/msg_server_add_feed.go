package keeper

import (
	"context"
	"fmt"

	types "github.com/warden-protocol/wardenprotocol/warden/x/feeds/types/v1beta1"
)

func (k Keeper) AddFeed(ctx context.Context, req *types.MsgAddFeed) (*types.MsgAddFeedResponse, error) {
	found, err := k.feeds.Has(ctx, req.FeedId)
	if err != nil {
		return nil, err
	}
	if found {
		return nil, fmt.Errorf("feed already exists")
	}

	feed := types.Feed{
		Id:      req.FeedId,
		Creator: req.Creator,
		Value:   req.InitialValue,
	}

	if err := k.feeds.Set(ctx, req.FeedId, feed); err != nil {
		return nil, err
	}

	return nil, nil
}
