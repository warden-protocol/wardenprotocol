package identity

import (
	"math/rand"

	"gitlab.qredo.com/qrdochain/fusionchain/testutil/sample"
	identitysimulation "gitlab.qredo.com/qrdochain/fusionchain/x/identity/simulation"
	"gitlab.qredo.com/qrdochain/fusionchain/x/identity/types"
	"github.com/cosmos/cosmos-sdk/baseapp"
	simappparams "github.com/cosmos/cosmos-sdk/simapp/params"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"
)

// avoid unused import issue
var (
	_ = sample.AccAddress
	_ = identitysimulation.FindAccount
	_ = simappparams.StakePerAccount
	_ = simulation.MsgEntryKind
	_ = baseapp.Paramspace
)

const (
	opWeightMsgNewWorkspace = "op_weight_msg_new_workspace"
	// TODO: Determine the simulation weight value
	defaultWeightMsgNewWorkspace int = 100

	opWeightMsgAddWorkspaceOwner = "op_weight_msg_add_workspace_owner"
	// TODO: Determine the simulation weight value
	defaultWeightMsgAddWorkspaceOwner int = 100

	opWeightMsgRemoveWorkspaceOwner = "op_weight_msg_remove_workspace_owner"
	// TODO: Determine the simulation weight value
	defaultWeightMsgRemoveWorkspaceOwner int = 100

	opWeightMsgApproveAction = "op_weight_msg_approve_action"
	// TODO: Determine the simulation weight value
	defaultWeightMsgApproveAction int = 100

	// this line is used by starport scaffolding # simapp/module/const
)

// GenerateGenesisState creates a randomized GenState of the module
func (AppModule) GenerateGenesisState(simState *module.SimulationState) {
	accs := make([]string, len(simState.Accounts))
	for i, acc := range simState.Accounts {
		accs[i] = acc.Address.String()
	}
	identityGenesis := types.GenesisState{
		Params: types.DefaultParams(),
		// this line is used by starport scaffolding # simapp/module/genesisState
	}
	simState.GenState[types.ModuleName] = simState.Cdc.MustMarshalJSON(&identityGenesis)
}

// ProposalContents doesn't return any content functions for governance proposals
func (AppModule) ProposalContents(_ module.SimulationState) []simtypes.WeightedProposalContent {
	return nil
}

// RandomizedParams creates randomized  param changes for the simulator
func (am AppModule) RandomizedParams(_ *rand.Rand) []simtypes.ParamChange {

	return []simtypes.ParamChange{}
}

// RegisterStoreDecoder registers a decoder
func (am AppModule) RegisterStoreDecoder(_ sdk.StoreDecoderRegistry) {}

// WeightedOperations returns the all the gov module operations with their respective weights.
func (am AppModule) WeightedOperations(simState module.SimulationState) []simtypes.WeightedOperation {
	operations := make([]simtypes.WeightedOperation, 0)

	var weightMsgNewWorkspace int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgNewWorkspace, &weightMsgNewWorkspace, nil,
		func(_ *rand.Rand) {
			weightMsgNewWorkspace = defaultWeightMsgNewWorkspace
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgNewWorkspace,
		identitysimulation.SimulateMsgNewWorkspace(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgAddWorkspaceOwner int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgAddWorkspaceOwner, &weightMsgAddWorkspaceOwner, nil,
		func(_ *rand.Rand) {
			weightMsgAddWorkspaceOwner = defaultWeightMsgAddWorkspaceOwner
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgAddWorkspaceOwner,
		identitysimulation.SimulateMsgAddWorkspaceOwner(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgRemoveWorkspaceOwner int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgRemoveWorkspaceOwner, &weightMsgRemoveWorkspaceOwner, nil,
		func(_ *rand.Rand) {
			weightMsgRemoveWorkspaceOwner = defaultWeightMsgRemoveWorkspaceOwner
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgRemoveWorkspaceOwner,
		identitysimulation.SimulateMsgRemoveWorkspaceOwner(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgApproveAction int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgApproveAction, &weightMsgApproveAction, nil,
		func(_ *rand.Rand) {
			weightMsgApproveAction = defaultWeightMsgApproveAction
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgApproveAction,
		identitysimulation.SimulateMsgApproveAction(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	// this line is used by starport scaffolding # simapp/module/operation

	return operations
}
