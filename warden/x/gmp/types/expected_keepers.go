package types

import (
	context "context"

	ibctransfertypes "github.com/cosmos/ibc-go/v8/modules/apps/transfer/types"
)

type IBCTransferKeeper interface {
	Transfer(goCtx context.Context, msg *ibctransfertypes.MsgTransfer) (*ibctransfertypes.MsgTransferResponse, error)
}
