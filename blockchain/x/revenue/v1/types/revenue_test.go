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
package types_test

// import (
// 	"testing"

// 	sdk "github.com/cosmos/cosmos-sdk/types"

// 	"github.com/ethereum/go-ethereum/common"

// 	utiltx "github.com/qredo/fusionchain/testutil/tx"
// 	"github.com/qredo/fusionchain/x/revenue/v1/types"

// 	"github.com/stretchr/testify/suite"
// )

// type RevenueTestSuite struct {
// 	suite.Suite
// 	address1 sdk.AccAddress
// 	address2 sdk.AccAddress
// }

// func TestRevenueSuite(t *testing.T) {
// 	suite.Run(t, new(RevenueTestSuite))
// }

// func (suite *RevenueTestSuite) SetupTest() {
// 	suite.address1 = sdk.AccAddress(utiltx.GenerateAddress().Bytes())
// 	suite.address2 = sdk.AccAddress(utiltx.GenerateAddress().Bytes())
// }

// func (suite *RevenueTestSuite) TestFeeNew() {
// 	testCases := []struct {
// 		name       string
// 		contract   common.Address
// 		deployer   sdk.AccAddress
// 		withdraw   sdk.AccAddress
// 		expectPass bool
// 	}{
// 		{
// 			"Create revenue- pass",
// 			utiltx.GenerateAddress(),
// 			suite.address1,
// 			suite.address2,
// 			true,
// 		},
// 		{
// 			"Create fee, omit withdraw - pass",
// 			utiltx.GenerateAddress(),
// 			suite.address1,
// 			nil,
// 			true,
// 		},
// 		{
// 			"Create revenue- invalid contract address",
// 			common.Address{},
// 			suite.address1,
// 			suite.address2,
// 			false,
// 		},
// 		{
// 			"Create revenue- invalid deployer address",
// 			utiltx.GenerateAddress(),
// 			sdk.AccAddress{},
// 			suite.address2,
// 			false,
// 		},
// 	}

// 	for _, tc := range testCases {
// 		i := types.NewRevenue(tc.contract, tc.deployer, tc.withdraw)
// 		err := i.Validate()

// 		if tc.expectPass {
// 			suite.Require().NoError(err, tc.name)
// 		} else {
// 			suite.Require().Error(err, tc.name)
// 		}
// 	}
// }

// func (suite *RevenueTestSuite) TestFee() {
// 	testCases := []struct {
// 		msg        string
// 		revenue    types.Revenue
// 		expectPass bool
// 	}{
// 		{
// 			"Create revenue- pass",
// 			types.Revenue{
// 				utiltx.GenerateAddress().String(),
// 				suite.address1.String(),
// 				suite.address2.String(),
// 			},
// 			true,
// 		},
// 		{
// 			"Create revenue- invalid contract address (not hex)",
// 			types.Revenue{
// 				"0x5dCA2483280D9727c80b5518faC4556617fb19ZZ",
// 				suite.address1.String(),
// 				suite.address2.String(),
// 			},
// 			false,
// 		},
// 		{
// 			"Create revenue- invalid contract address (invalid length 1)",
// 			types.Revenue{
// 				"0x5dCA2483280D9727c80b5518faC4556617fb19",
// 				suite.address1.String(),
// 				suite.address2.String(),
// 			},
// 			false,
// 		},
// 		{
// 			"Create revenue- invalid contract address (invalid length 2)",
// 			types.Revenue{
// 				"0x5dCA2483280D9727c80b5518faC4556617fb194FFF",
// 				suite.address1.String(),
// 				suite.address2.String(),
// 			},
// 			false,
// 		},
// 		{
// 			"Create revenue- invalid deployer address",
// 			types.Revenue{
// 				utiltx.GenerateAddress().String(),
// 				"evmos14mq5c8yn9jx295ahaxye2f0xw3tlell0lt542Z",
// 				suite.address2.String(),
// 			},
// 			false,
// 		},
// 		{
// 			"Create revenue- invalid withdraw address",
// 			types.Revenue{
// 				utiltx.GenerateAddress().String(),
// 				suite.address1.String(),
// 				"evmos14mq5c8yn9jx295ahaxye2f0xw3tlell0lt542Z",
// 			},
// 			false,
// 		},
// 	}

// 	for _, tc := range testCases {
// 		err := tc.revenue.Validate()

// 		if tc.expectPass {
// 			suite.Require().NoError(err, tc.msg)
// 		} else {
// 			suite.Require().Error(err, tc.msg)
// 		}
// 	}
// }

// func (suite *RevenueTestSuite) TestRevenueGetters() {
// 	contract := utiltx.GenerateAddress()
// 	fs := types.Revenue{
// 		contract.String(),
// 		suite.address1.String(),
// 		suite.address2.String(),
// 	}
// 	suite.Equal(fs.GetContractAddr(), contract)
// 	suite.Equal(fs.GetDeployerAddr(), suite.address1)
// 	suite.Equal(fs.GetWithdrawerAddr(), suite.address2)

// 	fs = types.Revenue{
// 		contract.String(),
// 		suite.address1.String(),
// 		"",
// 	}
// 	suite.Equal(fs.GetContractAddr(), contract)
// 	suite.Equal(fs.GetDeployerAddr(), suite.address1)
// 	suite.Equal(len(fs.GetWithdrawerAddr()), 0)
// }
