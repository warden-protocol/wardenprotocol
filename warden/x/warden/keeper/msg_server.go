package keeper

import (
	intenttypes "github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types"
)

type msgServer struct {
	Keeper
}

// NewMsgServerImpl returns an implementation of the MsgServer interface
// for the provided Keeper.
func NewMsgServerImpl(keeper Keeper) types.MsgServer {
	msgServer := &msgServer{Keeper: keeper}

	var handlers = []struct {
		actionType      string
		actionHandler   intenttypes.ActionHandler
		intentGenerator intenttypes.IntentGenerator
	}{
		{"/warden.warden.MsgAddSpaceOwner", msgServer.AddOwnerActionHandler, msgServer.AddOwnerIntentGenerator},
		{"/warden.warden.MsgNewKeyRequest", msgServer.NewKeyRequestActionHandler, msgServer.NewKeyRequestIntentGenerator},
		{"/warden.warden.MsgNewSignTransactionRequest", msgServer.NewSignTransactionRequestActionHandler, msgServer.NewSignTransactionRequestIntentGenerator},
		{"/warden.warden.MsgNewSignatureRequest", msgServer.NewSignatureRequestActionHandler, msgServer.NewSignatureRequestIntentGenerator},
		{"/warden.warden.MsgRemoveSpaceOwner", msgServer.RemoveOwnerActionHandler, msgServer.RemoveOwnerIntentGenerator},
		{"/warden.warden.MsgUpdateSpace", msgServer.UpdateSpaceActionHandler, msgServer.UpdateSpaceIntentGenerator},
	}

	for _, handler := range handlers {
		msgServer.intentKeeper.RegisterActionHandler(handler.actionType, handler.actionHandler)
		msgServer.intentKeeper.RegisterIntentGeneratorHandler(handler.actionType, handler.intentGenerator)
	}

	return msgServer
}

var _ types.MsgServer = msgServer{}
