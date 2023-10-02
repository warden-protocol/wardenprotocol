package keeper

import (
	bbird "github.com/qredo/fusionchain/x/policy/keeper"
	"github.com/qredo/fusionchain/x/treasury/types"
)

type msgServer struct {
	Keeper
}

// NewMsgServerImpl returns an implementation of the MsgServer interface
// for the provided Keeper.
func NewMsgServerImpl(keeper Keeper) types.MsgServer {
	s := &msgServer{Keeper: keeper}

	bbird.RegisterActionHandler(
		keeper.policyKeeper,
		"/fusionchain.treasury.MsgNewKeyRequest",
		s.NewKeyRequestActionHandler,
	)
	bbird.RegisterPolicyGeneratorHandler(
		keeper.policyKeeper,
		"/fusionchain.treasury.MsgNewKeyRequest",
		s.NewKeyRequestPolicyGenerator,
	)

	bbird.RegisterActionHandler(
		keeper.policyKeeper,
		"/fusionchain.treasury.MsgNewSignatureRequest",
		s.NewSignatureRequestActionHandler,
	)
	bbird.RegisterPolicyGeneratorHandler(
		keeper.policyKeeper,
		"/fusionchain.treasury.MsgNewSignatureRequest",
		s.NewSignatureRequestPolicyGenerator,
	)

	bbird.RegisterActionHandler(
		keeper.policyKeeper,
		"/fusionchain.treasury.MsgNewSignTransactionRequest",
		s.NewSignTransactionRequestActionHandler,
	)
	bbird.RegisterPolicyGeneratorHandler(
		keeper.policyKeeper,
		"/fusionchain.treasury.MsgNewSignTransactionRequest",
		s.NewSignTransactionRequestPolicyGenerator,
	)

	return s
}

var _ types.MsgServer = msgServer{}
