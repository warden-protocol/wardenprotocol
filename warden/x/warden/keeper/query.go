package keeper

import (
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types"
)

var _ types.QueryServer = Keeper{}
