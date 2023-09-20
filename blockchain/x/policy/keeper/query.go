package keeper

import (
	"github.com/qredo/fusionchain/x/policy/types"
)

var _ types.QueryServer = Keeper{}
