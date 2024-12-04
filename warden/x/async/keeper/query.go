package keeper

import (
	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

var _ types.QueryServer = Keeper{}
