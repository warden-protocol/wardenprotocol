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
package keeper_test

// import (
// 	"fmt"

// 	sdk "github.com/cosmos/cosmos-sdk/types"

// 	"github.com/ethereum/go-ethereum/common"

// 	utiltx "github.com/qredo/fusionchain/testutil/tx"
// 	"github.com/qredo/fusionchain/x/revenue/v1/types"
// )

// func (suite *KeeperTestSuite) TestGetFees() {
// 	var expRes []types.Revenue

// 	testCases := []struct {
// 		name     string
// 		malleate func()
// 	}{
// 		{
// 			"no revenues registered",
// 			func() { expRes = []types.Revenue{} },
// 		},
// 		{
// 			"one revenue registered with withdraw address",
// 			func() {
// 				revenue := types.NewRevenue(contract, deployer, withdraw)
// 				suite.app.RevenueKeeper.SetRevenue(suite.ctx, revenue)
// 				expRes = []types.Revenue{revenue}
// 			},
// 		},
// 		{
// 			"one revenue registered with no withdraw address",
// 			func() {
// 				revenue := types.NewRevenue(contract, deployer, nil)
// 				suite.app.RevenueKeeper.SetRevenue(suite.ctx, revenue)
// 				expRes = []types.Revenue{revenue}
// 			},
// 		},
// 		{
// 			"multiple revenues registered",
// 			func() {
// 				deployer2 := sdk.AccAddress(utiltx.GenerateAddress().Bytes())
// 				contract2 := utiltx.GenerateAddress()
// 				contract3 := utiltx.GenerateAddress()
// 				revenue := types.NewRevenue(contract, deployer, withdraw)
// 				feeSplit2 := types.NewRevenue(contract2, deployer, nil)
// 				feeSplit3 := types.NewRevenue(contract3, deployer2, nil)
// 				suite.app.RevenueKeeper.SetRevenue(suite.ctx, revenue)
// 				suite.app.RevenueKeeper.SetRevenue(suite.ctx, feeSplit2)
// 				suite.app.RevenueKeeper.SetRevenue(suite.ctx, feeSplit3)
// 				expRes = []types.Revenue{revenue, feeSplit2, feeSplit3}
// 			},
// 		},
// 	}
// 	for _, tc := range testCases {
// 		suite.Run(fmt.Sprintf("Case %s", tc.name), func() {
// 			suite.SetupTest() // reset
// 			tc.malleate()

// 			res := suite.app.RevenueKeeper.GetRevenues(suite.ctx)
// 			suite.Require().ElementsMatch(expRes, res, tc.name)
// 		})
// 	}
// }

// func (suite *KeeperTestSuite) TestIterateFees() {
// 	var expRes []types.Revenue

// 	testCases := []struct {
// 		name     string
// 		malleate func()
// 	}{
// 		{
// 			"no revenues registered",
// 			func() { expRes = []types.Revenue{} },
// 		},
// 		{
// 			"one revenue registered with withdraw address",
// 			func() {
// 				revenue := types.NewRevenue(contract, deployer, withdraw)
// 				suite.app.RevenueKeeper.SetRevenue(suite.ctx, revenue)
// 				expRes = []types.Revenue{
// 					types.NewRevenue(contract, deployer, withdraw),
// 				}
// 			},
// 		},
// 		{
// 			"one revenue registered with no withdraw address",
// 			func() {
// 				revenue := types.NewRevenue(contract, deployer, nil)
// 				suite.app.RevenueKeeper.SetRevenue(suite.ctx, revenue)
// 				expRes = []types.Revenue{
// 					types.NewRevenue(contract, deployer, nil),
// 				}
// 			},
// 		},
// 		{
// 			"multiple revenues registered",
// 			func() {
// 				deployer2 := sdk.AccAddress(utiltx.GenerateAddress().Bytes())
// 				contract2 := utiltx.GenerateAddress()
// 				contract3 := utiltx.GenerateAddress()
// 				revenue := types.NewRevenue(contract, deployer, withdraw)
// 				feeSplit2 := types.NewRevenue(contract2, deployer, nil)
// 				feeSplit3 := types.NewRevenue(contract3, deployer2, nil)
// 				suite.app.RevenueKeeper.SetRevenue(suite.ctx, revenue)
// 				suite.app.RevenueKeeper.SetRevenue(suite.ctx, feeSplit2)
// 				suite.app.RevenueKeeper.SetRevenue(suite.ctx, feeSplit3)
// 				expRes = []types.Revenue{revenue, feeSplit2, feeSplit3}
// 			},
// 		},
// 	}
// 	for _, tc := range testCases {
// 		suite.Run(fmt.Sprintf("Case %s", tc.name), func() {
// 			suite.SetupTest() // reset
// 			tc.malleate()

// 			suite.app.RevenueKeeper.IterateRevenues(suite.ctx, func(revenue types.Revenue) (stop bool) {
// 				suite.Require().Contains(expRes, revenue, tc.name)
// 				return false
// 			})
// 		})
// 	}
// }

// func (suite *KeeperTestSuite) TestGetRevenue() {
// 	testCases := []struct {
// 		name        string
// 		contract    common.Address
// 		deployer    sdk.AccAddress
// 		withdraw    sdk.AccAddress
// 		found       bool
// 		expWithdraw bool
// 	}{
// 		{
// 			"fee with no withdraw address",
// 			contract,
// 			deployer,
// 			nil,
// 			true,
// 			false,
// 		},
// 		{
// 			"fee with withdraw address same as deployer",
// 			contract,
// 			deployer,
// 			deployer,
// 			true,
// 			false,
// 		},
// 		{
// 			"fee with withdraw address same as contract",
// 			contract,
// 			deployer,
// 			sdk.AccAddress(contract.Bytes()),
// 			true,
// 			true,
// 		},
// 		{
// 			"fee with withdraw address different than deployer",
// 			contract,
// 			deployer,
// 			withdraw,
// 			true,
// 			true,
// 		},
// 		{
// 			"no fee",
// 			common.Address{},
// 			nil,
// 			nil,
// 			false,
// 			false,
// 		},
// 	}
// 	for _, tc := range testCases {
// 		suite.Run(fmt.Sprintf("Case %s", tc.name), func() {
// 			suite.SetupTest() // reset

// 			if tc.found {
// 				revenue := types.NewRevenue(tc.contract, tc.deployer, tc.withdraw)
// 				if tc.deployer.Equals(tc.withdraw) {
// 					revenue.WithdrawerAddress = ""
// 				}

// 				suite.app.RevenueKeeper.SetRevenue(suite.ctx, revenue)
// 				suite.app.RevenueKeeper.SetDeployerMap(suite.ctx, tc.deployer, tc.contract)
// 			}

// 			if tc.expWithdraw {
// 				suite.app.RevenueKeeper.SetWithdrawerMap(suite.ctx, tc.withdraw, tc.contract)
// 			}

// 			revenue, found := suite.app.RevenueKeeper.GetRevenue(suite.ctx, tc.contract)
// 			foundD := suite.app.RevenueKeeper.IsDeployerMapSet(suite.ctx, tc.deployer, tc.contract)
// 			foundW := suite.app.RevenueKeeper.IsWithdrawerMapSet(suite.ctx, tc.withdraw, tc.contract)

// 			if tc.found {
// 				suite.Require().True(found, tc.name)
// 				suite.Require().Equal(tc.deployer.String(), revenue.DeployerAddress, tc.name)
// 				suite.Require().Equal(tc.contract.Hex(), revenue.ContractAddress, tc.name)

// 				suite.Require().True(foundD, tc.name)

// 				if tc.expWithdraw {
// 					suite.Require().Equal(tc.withdraw.String(), revenue.WithdrawerAddress, tc.name)
// 					suite.Require().True(foundW, tc.name)
// 				} else {
// 					suite.Require().Equal("", revenue.WithdrawerAddress, tc.name)
// 					suite.Require().False(foundW, tc.name)
// 				}
// 			} else {
// 				suite.Require().False(found, tc.name)
// 			}
// 		})
// 	}
// }

// func (suite *KeeperTestSuite) TestDeleteRevenue() {
// 	revenue := types.NewRevenue(contract, deployer, withdraw)
// 	suite.app.RevenueKeeper.SetRevenue(suite.ctx, revenue)

// 	initialFee, found := suite.app.RevenueKeeper.GetRevenue(suite.ctx, contract)
// 	suite.Require().True(found)

// 	testCases := []struct {
// 		name     string
// 		malleate func()
// 		ok       bool
// 	}{
// 		{"existing revenue", func() {}, true},
// 		{
// 			"deleted revenue",
// 			func() {
// 				suite.app.RevenueKeeper.DeleteRevenue(suite.ctx, revenue)
// 			},
// 			false,
// 		},
// 	}
// 	for _, tc := range testCases {
// 		tc.malleate()
// 		revenue, found := suite.app.RevenueKeeper.GetRevenue(suite.ctx, contract)
// 		if tc.ok {
// 			suite.Require().True(found, tc.name)
// 			suite.Require().Equal(initialFee, revenue, tc.name)
// 		} else {
// 			suite.Require().False(found, tc.name)
// 			suite.Require().Equal(types.Revenue{}, revenue, tc.name)
// 		}
// 	}
// }

// func (suite *KeeperTestSuite) TestDeleteDeployerMap() {
// 	suite.app.RevenueKeeper.SetDeployerMap(suite.ctx, deployer, contract)
// 	found := suite.app.RevenueKeeper.IsDeployerMapSet(suite.ctx, deployer, contract)
// 	suite.Require().True(found)

// 	testCases := []struct {
// 		name     string
// 		malleate func()
// 		ok       bool
// 	}{
// 		{"existing deployer", func() {}, true},
// 		{
// 			"deleted deployer",
// 			func() {
// 				suite.app.RevenueKeeper.DeleteDeployerMap(suite.ctx, deployer, contract)
// 			},
// 			false,
// 		},
// 	}
// 	for _, tc := range testCases {
// 		tc.malleate()
// 		found := suite.app.RevenueKeeper.IsDeployerMapSet(suite.ctx, deployer, contract)
// 		if tc.ok {
// 			suite.Require().True(found, tc.name)
// 		} else {
// 			suite.Require().False(found, tc.name)
// 		}
// 	}
// }

// func (suite *KeeperTestSuite) TestDeleteWithdrawMap() {
// 	suite.app.RevenueKeeper.SetWithdrawerMap(suite.ctx, withdraw, contract)
// 	found := suite.app.RevenueKeeper.IsWithdrawerMapSet(suite.ctx, withdraw, contract)
// 	suite.Require().True(found)

// 	testCases := []struct {
// 		name     string
// 		malleate func()
// 		ok       bool
// 	}{
// 		{"existing withdraw", func() {}, true},
// 		{
// 			"deleted withdraw",
// 			func() {
// 				suite.app.RevenueKeeper.DeleteWithdrawerMap(suite.ctx, withdraw, contract)
// 			},
// 			false,
// 		},
// 	}
// 	for _, tc := range testCases {
// 		tc.malleate()
// 		found := suite.app.RevenueKeeper.IsWithdrawerMapSet(suite.ctx, withdraw, contract)
// 		if tc.ok {
// 			suite.Require().True(found, tc.name)
// 		} else {
// 			suite.Require().False(found, tc.name)
// 		}
// 	}
// }

// func (suite *KeeperTestSuite) TestIsRevenueRegistered() {
// 	revenue := types.NewRevenue(contract, deployer, withdraw)
// 	suite.app.RevenueKeeper.SetRevenue(suite.ctx, revenue)
// 	_, found := suite.app.RevenueKeeper.GetRevenue(suite.ctx, contract)
// 	suite.Require().True(found)

// 	testCases := []struct {
// 		name     string
// 		contract common.Address
// 		ok       bool
// 	}{
// 		{"registered revenue", contract, true},
// 		{"revenue not registered", common.Address{}, false},
// 		{"revenue not registered", utiltx.GenerateAddress(), false},
// 	}
// 	for _, tc := range testCases {
// 		found := suite.app.RevenueKeeper.IsRevenueRegistered(suite.ctx, tc.contract)
// 		if tc.ok {
// 			suite.Require().True(found, tc.name)
// 		} else {
// 			suite.Require().False(found, tc.name)
// 		}
// 	}
// }
