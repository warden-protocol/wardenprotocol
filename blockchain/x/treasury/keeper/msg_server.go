package keeper

import (
	policy "github.com/qredo/fusionchain/x/policy/keeper"
	"github.com/qredo/fusionchain/x/treasury/types"
)

type msgServer struct {
	Keeper
}

// NewMsgServerImpl returns an implementation of the MsgServer interface
// for the provided Keeper.
func NewMsgServerImpl(keeper Keeper) types.MsgServer {
	s := &msgServer{Keeper: keeper}

	policy.RegisterActionHandler(
		keeper.policyKeeper,
		"/fusionchain.treasury.MsgNewKeyRequest",
		s.NewKeyRequestActionHandler,
	)
	policy.RegisterPolicyGeneratorHandler(
		keeper.policyKeeper,
		"/fusionchain.treasury.MsgNewKeyRequest",
		s.NewKeyRequestPolicyGenerator,
	)

	policy.RegisterActionHandler(
		keeper.policyKeeper,
		"/fusionchain.treasury.MsgNewSignatureRequest",
		s.NewSignatureRequestActionHandler,
	)
	policy.RegisterPolicyGeneratorHandler(
		keeper.policyKeeper,
		"/fusionchain.treasury.MsgNewSignatureRequest",
		s.NewSignatureRequestPolicyGenerator,
	)

	policy.RegisterActionHandler(
		keeper.policyKeeper,
		"/fusionchain.treasury.MsgNewSignTransactionRequest",
		s.NewSignTransactionRequestActionHandler,
	)
	policy.RegisterPolicyGeneratorHandler(
		keeper.policyKeeper,
		"/fusionchain.treasury.MsgNewSignTransactionRequest",
		s.NewSignTransactionRequestPolicyGenerator,
	)

	return s
}

var _ types.MsgServer = msgServer{}
