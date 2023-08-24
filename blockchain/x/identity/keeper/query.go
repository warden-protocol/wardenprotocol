package keeper

import (
	"github.com/qredo/fusionchain/x/identity/types"
)

var _ types.QueryServer = Keeper{}
