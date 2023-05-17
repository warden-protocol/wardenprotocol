package keeper

import (
	"blackbird/x/blackbird/types"
)

var _ types.QueryServer = Keeper{}
