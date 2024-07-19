package keeper

import (
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

var _ types.QueryServer = Keeper{}
