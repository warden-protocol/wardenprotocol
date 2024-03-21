package keeper

import (
	intenttypes "github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
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
		{"/warden.warden.v1beta2.MsgAddSpaceOwner", msgServer.AddOwnerActionHandler, msgServer.AddOwnerIntentGenerator},
		{"/warden.warden.v1beta2.MsgNewKeyRequest", msgServer.NewKeyRequestActionHandler, msgServer.NewKeyRequestIntentGenerator},
		{"/warden.warden.v1beta2.MsgNewSignTransactionRequest", msgServer.NewSignTransactionRequestActionHandler, msgServer.NewSignTransactionRequestIntentGenerator},
		{"/warden.warden.v1beta2.MsgNewSignatureRequest", msgServer.NewSignatureRequestActionHandler, msgServer.NewSignatureRequestIntentGenerator},
		{"/warden.warden.v1beta2.MsgRemoveSpaceOwner", msgServer.RemoveOwnerActionHandler, msgServer.RemoveOwnerIntentGenerator},
		{"/warden.warden.v1beta2.MsgUpdateKey", msgServer.UpdateKeyActionHandler, msgServer.UpdateKeyIntentGenerator},
		{"/warden.warden.v1beta2.MsgUpdateSpace", msgServer.UpdateSpaceActionHandler, msgServer.UpdateSpaceIntentGenerator},
	}

	for _, handler := range handlers {
		msgServer.intentKeeper.RegisterActionHandler(handler.actionType, handler.actionHandler)
		msgServer.intentKeeper.RegisterIntentGeneratorHandler(handler.actionType, handler.intentGenerator)
	}

	return msgServer
}

var _ types.MsgServer = msgServer{}
