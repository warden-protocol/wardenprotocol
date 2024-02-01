package keeper

import (
	intent "github.com/warden-protocol/wardenprotocol/x/intent/keeper"
	"github.com/warden-protocol/wardenprotocol/x/treasury/types"
)

type msgServer struct {
	Keeper
}

// NewMsgServerImpl returns an implementation of the MsgServer interface
// for the provided Keeper.
func NewMsgServerImpl(keeper Keeper) types.MsgServer {
	s := &msgServer{Keeper: keeper}

	intent.RegisterActionHandler(
		keeper.intentKeeper,
		"/wardenprotocol.treasury.MsgNewKeyRequest",
		s.NewKeyRequestActionHandler,
	)
	intent.RegisterIntentGeneratorHandler(
		keeper.intentKeeper,
		"/wardenprotocol.treasury.MsgNewKeyRequest",
		s.NewKeyRequestIntentGenerator,
	)

	intent.RegisterActionHandler(
		keeper.intentKeeper,
		"/wardenprotocol.treasury.MsgNewSignatureRequest",
		s.NewSignatureRequestActionHandler,
	)
	intent.RegisterIntentGeneratorHandler(
		keeper.intentKeeper,
		"/wardenprotocol.treasury.MsgNewSignatureRequest",
		s.NewSignatureRequestIntentGenerator,
	)

	intent.RegisterActionHandler(
		keeper.intentKeeper,
		"/wardenprotocol.treasury.MsgNewSignTransactionRequest",
		s.NewSignTransactionRequestActionHandler,
	)
	intent.RegisterIntentGeneratorHandler(
		keeper.intentKeeper,
		"/wardenprotocol.treasury.MsgNewSignTransactionRequest",
		s.NewSignTransactionRequestIntentGenerator,
	)

	return s
}

var _ types.MsgServer = msgServer{}
