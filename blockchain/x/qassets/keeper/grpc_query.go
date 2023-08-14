package keeper

import (
	"gitlab.qredo.com/qrdochain/fusionchain/x/qassets/types"
)

var _ types.QueryServer = Keeper{}
