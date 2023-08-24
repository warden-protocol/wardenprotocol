package keeper

import (
	"github.com/qredo/fusionchain/x/qassets/types"
)

var _ types.QueryServer = Keeper{}
