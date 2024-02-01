// Copyright 2024
//
// This file includes work covered by the following copyright and permission notices:
//
// Copyright 2023 Qredo Ltd.
// Licensed under the Apache License, Version 2.0;
//
// This file is part of the Warden Protocol library.
//
// The Warden Protocol library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Warden Protocol library. If not, see https://github.com/warden-protocol/wardenprotocol/blob/main/LICENSE
package identity

import (
	"math/rand"

	// "github.com/warden-protocol/wardenprotocol/testutil/sample"
	"github.com/cosmos/cosmos-sdk/baseapp"
	identitysimulation "github.com/warden-protocol/wardenprotocol/x/identity/simulation"
	"github.com/warden-protocol/wardenprotocol/x/identity/types"

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
	opWeightMsgNewSpace = "op_weight_msg_new_space"
	// TODO: Determine the simulation weight value
	defaultWeightMsgNewSpace int = 100

	opWeightMsgAddSpaceOwner = "op_weight_msg_add_space_owner"
	// TODO: Determine the simulation weight value
	defaultWeightMsgAddSpaceOwner int = 100

	opWeightMsgRemoveSpaceOwner = "op_weight_msg_remove_space_owner"
	// TODO: Determine the simulation weight value
	defaultWeightMsgRemoveSpaceOwner int = 100

	opWeightMsgNewKeychain = "op_weight_msg_new_keychain"
	// TODO: Determine the simulation weight value
	defaultWeightMsgNewKeychain int = 100

	opWeightMsgAddKeychainParty = "op_weight_msg_add_keychain_party"
	// TODO: Determine the simulation weight value
	defaultWeightMsgAddKeychainParty int = 100

	opWeightMsgAppendChildSpace = "op_weight_msg_append_child_space"
	// TODO: Determine the simulation weight value
	defaultWeightMsgAppendChildSpace int = 100

	opWeightMsgNewChildSpace = "op_weight_msg_new_child_space"
	// TODO: Determine the simulation weight value
	defaultWeightMsgNewChildSpace int = 100

	opWeightMsgUpdateSpace = "op_weight_msg_msg_update_space"
	// TODO: Determine the simulation weight value
	defaultWeightMsgUpdateSpace int = 100

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

	var weightMsgNewSpace int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgNewSpace, &weightMsgNewSpace, nil,
		func(_ *rand.Rand) {
			weightMsgNewSpace = defaultWeightMsgNewSpace
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgNewSpace,
		identitysimulation.SimulateMsgNewSpace(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgAddSpaceOwner int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgAddSpaceOwner, &weightMsgAddSpaceOwner, nil,
		func(_ *rand.Rand) {
			weightMsgAddSpaceOwner = defaultWeightMsgAddSpaceOwner
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgAddSpaceOwner,
		identitysimulation.SimulateMsgAddSpaceOwner(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgRemoveSpaceOwner int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgRemoveSpaceOwner, &weightMsgRemoveSpaceOwner, nil,
		func(_ *rand.Rand) {
			weightMsgRemoveSpaceOwner = defaultWeightMsgRemoveSpaceOwner
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgRemoveSpaceOwner,
		identitysimulation.SimulateMsgRemoveSpaceOwner(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgNewKeychain int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgNewKeychain, &weightMsgNewKeychain, nil,
		func(_ *rand.Rand) {
			weightMsgNewKeychain = defaultWeightMsgNewKeychain
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgNewKeychain,
		identitysimulation.SimulateMsgNewKeychain(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgAddKeychainParty int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgAddKeychainParty, &weightMsgAddKeychainParty, nil,
		func(_ *rand.Rand) {
			weightMsgAddKeychainParty = defaultWeightMsgAddKeychainParty
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgAddKeychainParty,
		identitysimulation.SimulateMsgAddKeychainParty(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgAppendChildSpace int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgAppendChildSpace, &weightMsgAppendChildSpace, nil,
		func(_ *rand.Rand) {
			weightMsgAppendChildSpace = defaultWeightMsgAppendChildSpace
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgAppendChildSpace,
		identitysimulation.SimulateMsgAppendChildSpace(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgNewChildSpace int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgNewChildSpace, &weightMsgNewChildSpace, nil,
		func(_ *rand.Rand) {
			weightMsgNewChildSpace = defaultWeightMsgNewChildSpace
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgNewChildSpace,
		identitysimulation.SimulateMsgNewChildSpace(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgUpdateSpace int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgUpdateSpace, &weightMsgUpdateSpace, nil,
		func(_ *rand.Rand) {
			weightMsgUpdateSpace = defaultWeightMsgUpdateSpace
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgUpdateSpace,
		identitysimulation.SimulateMsgUpdateSpace(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	// this line is used by starport scaffolding # simapp/module/operation

	return operations
}
