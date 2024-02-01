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
package types_test

// import (
// 	"testing"

// 	sdk "github.com/cosmos/cosmos-sdk/types"
// 	utiltx "github.com/warden-protocol/wardenprotocol/testutil/tx"
// 	"github.com/warden-protocol/wardenprotocol/x/revenue/v1/types"
// 	"github.com/stretchr/testify/suite"
// )

// type GenesisTestSuite struct {
// 	suite.Suite
// 	address1 string
// 	address2 string
// }

// func TestGenesisTestSuite(t *testing.T) {
// 	suite.Run(t, new(GenesisTestSuite))
// }

// func (suite *GenesisTestSuite) SetupTest() {
// 	suite.address1 = sdk.AccAddress(utiltx.GenerateAddress().Bytes()).String()
// 	suite.address2 = sdk.AccAddress(utiltx.GenerateAddress().Bytes()).String()
// }

// func (suite *GenesisTestSuite) TestValidateGenesis() {
// 	newGen := types.NewGenesisState(types.DefaultParams(), []types.Revenue{})
// 	testCases := []struct {
// 		name     string
// 		genState *types.GenesisState
// 		expPass  bool
// 	}{
// 		{
// 			name:     "valid genesis constructor",
// 			genState: &newGen,
// 			expPass:  true,
// 		},
// 		{
// 			name:     "default",
// 			genState: types.DefaultGenesisState(),
// 			expPass:  true,
// 		},
// 		{
// 			name: "valid genesis",
// 			genState: &types.GenesisState{
// 				Params:   types.DefaultParams(),
// 				Revenues: []types.Revenue{},
// 			},
// 			expPass: true,
// 		},
// 		{
// 			name: "valid genesis - with fee",
// 			genState: &types.GenesisState{
// 				Params: types.DefaultParams(),
// 				Revenues: []types.Revenue{
// 					{
// 						ContractAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
// 						DeployerAddress: suite.address1,
// 					},
// 					{
// 						ContractAddress:   "0xdac17f958d2ee523a2206206994597c13d831ec8",
// 						DeployerAddress:   suite.address2,
// 						WithdrawerAddress: suite.address2,
// 					},
// 				},
// 			},
// 			expPass: true,
// 		},
// 		{
// 			name:     "empty genesis",
// 			genState: &types.GenesisState{},
// 			expPass:  false,
// 		},
// 		{
// 			name: "invalid genesis - duplicated fee",
// 			genState: &types.GenesisState{
// 				Params: types.DefaultParams(),
// 				Revenues: []types.Revenue{
// 					{
// 						ContractAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
// 						DeployerAddress: suite.address1,
// 					},
// 					{
// 						ContractAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
// 						DeployerAddress: suite.address1,
// 					},
// 				},
// 			},
// 			expPass: false,
// 		},
// 		{
// 			name: "invalid genesis - duplicated fee with different deployer address",
// 			genState: &types.GenesisState{
// 				Params: types.DefaultParams(),
// 				Revenues: []types.Revenue{
// 					{
// 						ContractAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
// 						DeployerAddress: suite.address1,
// 					},
// 					{
// 						ContractAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
// 						DeployerAddress: suite.address2,
// 					},
// 				},
// 			},
// 			expPass: false,
// 		},
// 		{
// 			name: "invalid genesis - invalid contract address",
// 			genState: &types.GenesisState{
// 				Params: types.DefaultParams(),
// 				Revenues: []types.Revenue{
// 					{
// 						ContractAddress: suite.address1,
// 						DeployerAddress: suite.address1,
// 					},
// 				},
// 			},
// 			expPass: false,
// 		},
// 		{
// 			name: "invalid genesis - invalid deployer address",
// 			genState: &types.GenesisState{
// 				Params: types.DefaultParams(),
// 				Revenues: []types.Revenue{
// 					{
// 						ContractAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
// 						DeployerAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
// 					},
// 				},
// 			},
// 			expPass: false,
// 		},
// 		{
// 			name: "invalid genesis - invalid withdraw address",
// 			genState: &types.GenesisState{
// 				Params: types.DefaultParams(),
// 				Revenues: []types.Revenue{
// 					{
// 						ContractAddress:   "0xdac17f958d2ee523a2206206994597c13d831ec7",
// 						DeployerAddress:   suite.address1,
// 						WithdrawerAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
// 					},
// 				},
// 			},
// 			expPass: false,
// 		},
// 		{
// 			name: "invalid genesis - invalid withdrawer address",
// 			genState: &types.GenesisState{
// 				Params: types.DefaultParams(),
// 				Revenues: []types.Revenue{
// 					{
// 						ContractAddress:   "0xdac17f958d2ee523a2206206994597c13d831ec7",
// 						DeployerAddress:   suite.address1,
// 						WithdrawerAddress: "withdraw",
// 					},
// 				},
// 			},
// 			expPass: false,
// 		},
// 	}

// 	for _, tc := range testCases {
// 		err := tc.genState.Validate()
// 		if tc.expPass {
// 			suite.Require().NoError(err, tc.name)
// 		} else {
// 			suite.Require().Error(err, tc.name)
// 		}
// 	}
// }
