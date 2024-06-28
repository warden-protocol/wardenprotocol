package types

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	ibctransfertypes "github.com/cosmos/ibc-go/v8/modules/apps/transfer/types"
	gmptypes "github.com/warden-protocol/wardenprotocol/warden/x/gmp/types"
)

// GmpKeeper defines the expected GmpKeeper interface needed by the IBCTransfer keeper.
type GmpKeeper interface {
	GetParams(ctx sdk.Context) (params gmptypes.Params)
	BuildGmpRequest(
		goCtx context.Context,
		msg *gmptypes.MsgBridge,
	) (*ibctransfertypes.MsgTransfer, error)
}
