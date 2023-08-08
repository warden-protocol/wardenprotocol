package keeper

import (
	"gitlab.qredo.com/qrdochain/fusionchain/x/blackbird/types"
)

var _ types.QueryServer = Keeper{}
