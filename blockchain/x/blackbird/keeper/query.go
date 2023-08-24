package keeper

import (
	"github.com/qredo/fusionchain/x/blackbird/types"
)

var _ types.QueryServer = Keeper{}
