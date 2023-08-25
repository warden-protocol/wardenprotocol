package treasury

import (
	"math/rand"

	"github.com/cosmos/cosmos-sdk/baseapp"
	// simappparams "github.com/cosmos/cosmos-sdk/simapp/params"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"

	// "github.com/qredo/fusionchain/testutil/sample"
	treasurysimulation "github.com/qredo/fusionchain/x/treasury/simulation"
	"github.com/qredo/fusionchain/x/treasury/types"
)

// avoid unused import issue
var (
	// _ = sample.AccAddress
	_ = treasurysimulation.FindAccount
	// _ = simappparams.StakePerAccount
	_ = simulation.MsgEntryKind
	_ = baseapp.Paramspace
)

const (
	opWeightMsgNewKeyRequest = "op_weight_msg_new_key_request"
	// TODO: Determine the simulation weight value
	defaultWeightMsgNewKeyRequest int = 100

	opWeightMsgUpdateKeyRequest = "op_weight_msg_update_key_request"
	// TODO: Determine the simulation weight value
	defaultWeightMsgUpdateKeyRequest int = 100

	opWeightMsgNewSignatureRequest = "op_weight_msg_new_signature_request"
	// TODO: Determine the simulation weight value
	defaultWeightMsgNewSignatureRequest int = 100

	opWeightMsgFulfilSignatureRequest = "op_weight_msg_fulfil_signature_request"
	// TODO: Determine the simulation weight value
	defaultWeightMsgFulfilSignatureRequest int = 100

	opWeightMsgNewWalletRequest = "op_weight_msg_new_wallet_request"
	// TODO: Determine the simulation weight value
	defaultWeightMsgNewWalletRequest int = 100

	opWeightMsgNewSignTransactionRequest = "op_weight_msg_new_sign_transaction_request"
	// TODO: Determine the simulation weight value
	defaultWeightMsgNewSignTransactionRequest int = 100
	// this line is used by starport scaffolding # simapp/module/const
)

// GenerateGenesisState creates a randomized GenState of the module
func (AppModule) GenerateGenesisState(simState *module.SimulationState) {
	accs := make([]string, len(simState.Accounts))
	for i, acc := range simState.Accounts {
		accs[i] = acc.Address.String()
	}
	treasuryGenesis := types.GenesisState{
		Params: types.DefaultParams(),
		// this line is used by starport scaffolding # simapp/module/genesisState
	}
	simState.GenState[types.ModuleName] = simState.Cdc.MustMarshalJSON(&treasuryGenesis)
}

// ProposalContents doesn't return any content functions for governance proposals
func (AppModule) ProposalContents(module.SimulationState) []simtypes.WeightedProposalMsg {
	return nil
}

// RandomizedParams creates randomized  param changes for the simulator
// func (am AppModule) RandomizedParams(_ *rand.Rand) []simtypes.ParamChange {
// return []simtypes.ParamChange{}
// }

// RegisterStoreDecoder registers a decoder
func (am AppModule) RegisterStoreDecoder(_ sdk.StoreDecoderRegistry) {}

// WeightedOperations returns the all the gov module operations with their respective weights.
func (am AppModule) WeightedOperations(simState module.SimulationState) []simtypes.WeightedOperation {
	operations := make([]simtypes.WeightedOperation, 0)

	var weightMsgNewKeyRequest int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgNewKeyRequest, &weightMsgNewKeyRequest, nil,
		func(_ *rand.Rand) {
			weightMsgNewKeyRequest = defaultWeightMsgNewKeyRequest
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgNewKeyRequest,
		treasurysimulation.SimulateMsgNewKeyRequest(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgUpdateKeyRequest int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgUpdateKeyRequest, &weightMsgUpdateKeyRequest, nil,
		func(_ *rand.Rand) {
			weightMsgUpdateKeyRequest = defaultWeightMsgUpdateKeyRequest
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgUpdateKeyRequest,
		treasurysimulation.SimulateMsgUpdateKeyRequest(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgNewSignatureRequest int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgNewSignatureRequest, &weightMsgNewSignatureRequest, nil,
		func(_ *rand.Rand) {
			weightMsgNewSignatureRequest = defaultWeightMsgNewSignatureRequest
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgNewSignatureRequest,
		treasurysimulation.SimulateMsgNewSignatureRequest(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgFulfilSignatureRequest int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgFulfilSignatureRequest, &weightMsgFulfilSignatureRequest, nil,
		func(_ *rand.Rand) {
			weightMsgFulfilSignatureRequest = defaultWeightMsgFulfilSignatureRequest
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgFulfilSignatureRequest,
		treasurysimulation.SimulateMsgFulfilSignatureRequest(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgNewWalletRequest int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgNewWalletRequest, &weightMsgNewWalletRequest, nil,
		func(_ *rand.Rand) {
			weightMsgNewWalletRequest = defaultWeightMsgNewWalletRequest
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgNewWalletRequest,
		treasurysimulation.SimulateMsgNewWalletRequest(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgNewSignTransactionRequest int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgNewSignTransactionRequest, &weightMsgNewSignTransactionRequest, nil,
		func(_ *rand.Rand) {
			weightMsgNewSignTransactionRequest = defaultWeightMsgNewSignTransactionRequest
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgNewSignTransactionRequest,
		treasurysimulation.SimulateMsgNewSignTransactionRequest(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	// this line is used by starport scaffolding # simapp/module/operation

	return operations
}
