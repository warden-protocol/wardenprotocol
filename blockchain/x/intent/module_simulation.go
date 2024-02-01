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
package intent

import (
	"math/rand"

	// "github.com/warden-protocol/wardenprotocol/testutil/sample"
	"github.com/cosmos/cosmos-sdk/baseapp"
	// simappparams "github.com/cosmos/cosmos-sdk/simapp/params"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"
	intentsimulation "github.com/warden-protocol/wardenprotocol/x/intent/simulation"
	"github.com/warden-protocol/wardenprotocol/x/intent/types"
)

// avoid unused import issue
var (
	// _ = sample.AccAddress
	_ = intentsimulation.FindAccount
	// _ = simappparams.StakePerAccount
	_ = simulation.MsgEntryKind
	_ = baseapp.Paramspace
)

const (
	opWeightMsgApproveAction = "op_weight_msg_approve_action"
	// TODO: Determine the simulation weight value
	defaultWeightMsgApproveAction int = 100

	opWeightMsgNewIntent = "op_weight_msg_new_intent"
	// TODO: Determine the simulation weight value
	defaultWeightMsgNewIntent int = 100

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
	intentGenesis := types.GenesisState{
		Params: types.DefaultParams(),
		// this line is used by starport scaffolding # simapp/module/genesisState
	}
	simState.GenState[types.ModuleName] = simState.Cdc.MustMarshalJSON(&intentGenesis)
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
		intentsimulation.SimulateMsgApproveAction(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgNewIntent int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgNewIntent, &weightMsgNewIntent, nil,
		func(_ *rand.Rand) {
			weightMsgNewIntent = defaultWeightMsgNewIntent
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgNewIntent,
		intentsimulation.SimulateMsgNewIntent(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgRevokeAction int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgRevokeAction, &weightMsgRevokeAction, nil,
		func(_ *rand.Rand) {
			weightMsgRevokeAction = defaultWeightMsgRevokeAction
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgRevokeAction,
		intentsimulation.SimulateMsgRevokeAction(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	// this line is used by starport scaffolding # simapp/module/operation

	return operations
}
