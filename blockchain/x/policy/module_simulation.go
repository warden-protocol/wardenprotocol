package blackbird

import (
	"math/rand"

	// "github.com/qredo/fusionchain/testutil/sample"
	"github.com/cosmos/cosmos-sdk/baseapp"
	// simappparams "github.com/cosmos/cosmos-sdk/simapp/params"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"
	policysimulation "github.com/qredo/fusionchain/x/policy/simulation"
	"github.com/qredo/fusionchain/x/policy/types"
)

// avoid unused import issue
var (
	// _ = sample.AccAddress
	_ = policysimulation.FindAccount
	// _ = simappparams.StakePerAccount
	_ = simulation.MsgEntryKind
	_ = baseapp.Paramspace
)

const (
	opWeightMsgApproveAction = "op_weight_msg_approve_action"
	// TODO: Determine the simulation weight value
	defaultWeightMsgApproveAction int = 100

	opWeightMsgNewPolicy = "op_weight_msg_new_policy"
	// TODO: Determine the simulation weight value
	defaultWeightMsgNewPolicy int = 100

	opWeightMsgRevokeAction = "op_weight_msg_revoke_action"
	// TODO: Determine the simulation weight value
	defaultWeightMsgRevokeAction int = 100
	// this line is used by starport scaffolding # simapp/module/const
)

// GenerateGenesisState creates a randomized GenState of the module
func (AppModule) GenerateGenesisState(simState *module.SimulationState) {
	accs := make([]string, len(simState.Accounts))
	for i, acc := range simState.Accounts {
		accs[i] = acc.Address.String()
	}
	blackbirdGenesis := types.GenesisState{
		Params: types.DefaultParams(),
		// this line is used by starport scaffolding # simapp/module/genesisState
	}
	simState.GenState[types.ModuleName] = simState.Cdc.MustMarshalJSON(&blackbirdGenesis)
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
func (AppModule) RegisterStoreDecoder(sdk.StoreDecoderRegistry) {}

// WeightedOperations returns the all the gov module operations with their respective weights.
func (am AppModule) WeightedOperations(simState module.SimulationState) []simtypes.WeightedOperation {
	operations := make([]simtypes.WeightedOperation, 0)

	var weightMsgApproveAction int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgApproveAction, &weightMsgApproveAction, nil,
		func(_ *rand.Rand) {
			weightMsgApproveAction = defaultWeightMsgApproveAction
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgApproveAction,
		policysimulation.SimulateMsgApproveAction(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgNewPolicy int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgNewPolicy, &weightMsgNewPolicy, nil,
		func(_ *rand.Rand) {
			weightMsgNewPolicy = defaultWeightMsgNewPolicy
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgNewPolicy,
		policysimulation.SimulateMsgNewPolicy(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgRevokeAction int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgRevokeAction, &weightMsgRevokeAction, nil,
		func(_ *rand.Rand) {
			weightMsgRevokeAction = defaultWeightMsgRevokeAction
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgRevokeAction,
		policysimulation.SimulateMsgRevokeAction(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	// this line is used by starport scaffolding # simapp/module/operation

	return operations
}
