// Copyright 2023 Qredo Ltd.
// This file is part of the Fusion library.
//
// The Fusion library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Fusion library. If not, see https://github.com/qredo/fusionchain/blob/main/LICENSE
package identity

import (
	"math/rand"

	// "github.com/qredo/fusionchain/testutil/sample"
	"github.com/cosmos/cosmos-sdk/baseapp"
	identitysimulation "github.com/qredo/fusionchain/x/identity/simulation"
	"github.com/qredo/fusionchain/x/identity/types"

	// simappparams "github.com/cosmos/cosmos-sdk/simapp/params"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"
)

// avoid unused import issue
var (
	// _ = sample.AccAddress
	_ = identitysimulation.FindAccount
	// _ = simappparams.StakePerAccount
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

	opWeightMsgNewKeyring = "op_weight_msg_new_keyring"
	// TODO: Determine the simulation weight value
	defaultWeightMsgNewKeyring int = 100

	opWeightMsgAddKeyringParty = "op_weight_msg_add_keyring_party"
	// TODO: Determine the simulation weight value
	defaultWeightMsgAddKeyringParty int = 100

	opWeightMsgAppendChildWorkspace = "op_weight_msg_append_child_workspace"
	// TODO: Determine the simulation weight value
	defaultWeightMsgAppendChildWorkspace int = 100

	opWeightMsgNewChildWorkspace = "op_weight_msg_new_child_workspace"
	// TODO: Determine the simulation weight value
	defaultWeightMsgNewChildWorkspace int = 100

	opWeightMsgUpdateWorkspace = "op_weight_msg_msg_update_workspace"
	// TODO: Determine the simulation weight value
	defaultWeightMsgUpdateWorkspace int = 100

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

	var weightMsgNewKeyring int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgNewKeyring, &weightMsgNewKeyring, nil,
		func(_ *rand.Rand) {
			weightMsgNewKeyring = defaultWeightMsgNewKeyring
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgNewKeyring,
		identitysimulation.SimulateMsgNewKeyring(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgAddKeyringParty int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgAddKeyringParty, &weightMsgAddKeyringParty, nil,
		func(_ *rand.Rand) {
			weightMsgAddKeyringParty = defaultWeightMsgAddKeyringParty
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgAddKeyringParty,
		identitysimulation.SimulateMsgAddKeyringParty(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgAppendChildWorkspace int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgAppendChildWorkspace, &weightMsgAppendChildWorkspace, nil,
		func(_ *rand.Rand) {
			weightMsgAppendChildWorkspace = defaultWeightMsgAppendChildWorkspace
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgAppendChildWorkspace,
		identitysimulation.SimulateMsgAppendChildWorkspace(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgNewChildWorkspace int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgNewChildWorkspace, &weightMsgNewChildWorkspace, nil,
		func(_ *rand.Rand) {
			weightMsgNewChildWorkspace = defaultWeightMsgNewChildWorkspace
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgNewChildWorkspace,
		identitysimulation.SimulateMsgNewChildWorkspace(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgUpdateWorkspace int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgUpdateWorkspace, &weightMsgUpdateWorkspace, nil,
		func(_ *rand.Rand) {
			weightMsgUpdateWorkspace = defaultWeightMsgUpdateWorkspace
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgUpdateWorkspace,
		identitysimulation.SimulateMsgUpdateWorkspace(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	// this line is used by starport scaffolding # simapp/module/operation

	return operations
}
