package keeper

import (
	"github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
)

var _ types.QueryServer = Keeper{}
