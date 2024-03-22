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
		actionType    string
		actionHandler intenttypes.ActionHandler
	}{
		{"/warden.warden.v1beta2.MsgAddSpaceOwner", msgServer.AddOwnerActionHandler},
		{"/warden.warden.v1beta2.MsgNewKeyRequest", msgServer.NewKeyRequestActionHandler},
		{"/warden.warden.v1beta2.MsgNewSignTransactionRequest", msgServer.NewSignTransactionRequestActionHandler},
		{"/warden.warden.v1beta2.MsgNewSignatureRequest", msgServer.NewSignatureRequestActionHandler},
		{"/warden.warden.v1beta2.MsgRemoveSpaceOwner", msgServer.RemoveOwnerActionHandler},
		{"/warden.warden.v1beta2.MsgUpdateKey", msgServer.UpdateKeyActionHandler},
		{"/warden.warden.v1beta2.MsgUpdateSpace", msgServer.UpdateSpaceActionHandler},
	}

	for _, handler := range handlers {
		msgServer.intentKeeper.RegisterActionHandler(handler.actionType, handler.actionHandler)
	}

	return msgServer
}

var _ types.MsgServer = msgServer{}
