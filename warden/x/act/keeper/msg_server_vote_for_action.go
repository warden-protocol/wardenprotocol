package keeper

import (
	"context"

	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

func (k msgServer) VoteForAction(goCtx context.Context, msg *types.MsgVoteForAction) (*types.MsgVoteForActionResponse, error) {
	panic("VoteForAction not implemented")
}
