package keeper

import (
	"github.com/warden-protocol/wardenprotocol/warden/x/sched/types"
)

var _ types.QueryServer = Keeper{}
