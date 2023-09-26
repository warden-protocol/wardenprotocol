package keeper_test

// import (
// 	"fmt"

// 	sdk "github.com/cosmos/cosmos-sdk/types"
// 	"github.com/cosmos/cosmos-sdk/types/query"

// 	utiltx "github.com/qredo/fusionchain/testutil/tx"
// 	"github.com/qredo/fusionchain/x/revenue/v1/types"
// )

// func (suite *KeeperTestSuite) TestRevenues() {
// 	var (
// 		req    *types.QueryRevenuesRequest
// 		expRes *types.QueryRevenuesResponse
// 	)

// 	testCases := []struct {
// 		name     string
// 		malleate func()
// 		expPass  bool
// 	}{
// 		{
// 			"no fee infos registered",
// 			func() {
// 				req = &types.QueryRevenuesRequest{}
// 				expRes = &types.QueryRevenuesResponse{Pagination: &query.PageResponse{}}
// 			},
// 			true,
// 		},
// 		{
// 			"1 fee infos registered w/pagination",
// 			func() {
// 				req = &types.QueryRevenuesRequest{
// 					Pagination: &query.PageRequest{Limit: 10, CountTotal: true},
// 				}
// 				revenue := types.NewRevenue(contract, deployer, withdraw)
// 				suite.app.RevenueKeeper.SetRevenue(suite.ctx, revenue)

// 				expRes = &types.QueryRevenuesResponse{
// 					Pagination: &query.PageResponse{Total: 1},
// 					Revenues: []types.Revenue{
// 						{
// 							ContractAddress:   contract.Hex(),
// 							DeployerAddress:   deployer.String(),
// 							WithdrawerAddress: withdraw.String(),
// 						},
// 					},
// 				}
// 			},
// 			true,
// 		},
// 		{
// 			"2 fee infos registered wo/pagination",
// 			func() {
// 				req = &types.QueryRevenuesRequest{}
// 				contract2 := utiltx.GenerateAddress()
// 				revenue := types.NewRevenue(contract, deployer, withdraw)
// 				feeSplit2 := types.NewRevenue(contract2, deployer, nil)
// 				suite.app.RevenueKeeper.SetRevenue(suite.ctx, revenue)
// 				suite.app.RevenueKeeper.SetRevenue(suite.ctx, feeSplit2)

// 				expRes = &types.QueryRevenuesResponse{
// 					Pagination: &query.PageResponse{Total: 2},
// 					Revenues: []types.Revenue{
// 						{
// 							ContractAddress:   contract.Hex(),
// 							DeployerAddress:   deployer.String(),
// 							WithdrawerAddress: withdraw.String(),
// 						},
// 						{
// 							ContractAddress: contract2.Hex(),
// 							DeployerAddress: deployer.String(),
// 						},
// 					},
// 				}
// 			},
// 			true,
// 		},
// 	}
// 	for _, tc := range testCases {
// 		suite.Run(fmt.Sprintf("Case %s", tc.name), func() {
// 			suite.SetupTest() // reset

// 			ctx := sdk.WrapSDKContext(suite.ctx)
// 			tc.malleate()

// 			res, err := suite.queryClient.Revenues(ctx, req)
// 			if tc.expPass {
// 				suite.Require().NoError(err)
// 				suite.Require().Equal(expRes.Pagination, res.Pagination)
// 				suite.Require().ElementsMatch(expRes.Revenues, res.Revenues)
// 			} else {
// 				suite.Require().Error(err)
// 			}
// 		})
// 	}
// }

// // Cases that cannot be tested in TestFees
// func (suite *KeeperTestSuite) TestRevenueKeeper() {
// 	suite.SetupTest()
// 	ctx := sdk.WrapSDKContext(suite.ctx)
// 	res, err := suite.app.RevenueKeeper.Revenues(ctx, nil)
// 	suite.Require().Error(err)
// 	suite.Require().Nil(res)
// }

// func (suite *KeeperTestSuite) TestFee() {
// 	var (
// 		req    *types.QueryRevenueRequest
// 		expRes *types.QueryRevenueResponse
// 	)

// 	testCases := []struct {
// 		name     string
// 		malleate func()
// 		expPass  bool
// 	}{
// 		{
// 			"empty contract address",
// 			func() {
// 				req = &types.QueryRevenueRequest{}
// 				expRes = &types.QueryRevenueResponse{}
// 			},
// 			false,
// 		},
// 		{
// 			"invalid contract address",
// 			func() {
// 				req = &types.QueryRevenueRequest{
// 					ContractAddress: "1234",
// 				}
// 				expRes = &types.QueryRevenueResponse{}
// 			},
// 			false,
// 		},
// 		{
// 			"fee info not found",
// 			func() {
// 				req = &types.QueryRevenueRequest{
// 					ContractAddress: contract.String(),
// 				}
// 				expRes = &types.QueryRevenueResponse{}
// 			},
// 			false,
// 		},
// 		{
// 			"fee info found",
// 			func() {
// 				revenue := types.NewRevenue(contract, deployer, withdraw)
// 				suite.app.RevenueKeeper.SetRevenue(suite.ctx, revenue)

// 				req = &types.QueryRevenueRequest{
// 					ContractAddress: contract.Hex(),
// 				}
// 				expRes = &types.QueryRevenueResponse{Revenue: types.Revenue{
// 					ContractAddress:   contract.Hex(),
// 					DeployerAddress:   deployer.String(),
// 					WithdrawerAddress: withdraw.String(),
// 				}}
// 			},
// 			true,
// 		},
// 	}
// 	for _, tc := range testCases {
// 		suite.Run(fmt.Sprintf("Case %s", tc.name), func() {
// 			suite.SetupTest() // reset

// 			ctx := sdk.WrapSDKContext(suite.ctx)
// 			tc.malleate()

// 			res, err := suite.queryClient.Revenue(ctx, req)
// 			if tc.expPass {
// 				suite.Require().NoError(err)
// 				suite.Require().Equal(expRes, res)
// 			} else {
// 				suite.Require().Error(err)
// 			}
// 		})
// 	}
// }

// func (suite *KeeperTestSuite) TestDeployerFees() {
// 	var (
// 		req    *types.QueryDeployerRevenuesRequest
// 		expRes *types.QueryDeployerRevenuesResponse
// 	)

// 	testCases := []struct {
// 		name     string
// 		malleate func()
// 		expPass  bool
// 	}{
// 		{
// 			"no contract registered",
// 			func() {
// 				req = &types.QueryDeployerRevenuesRequest{}
// 				expRes = &types.QueryDeployerRevenuesResponse{Pagination: &query.PageResponse{}}
// 			},
// 			false,
// 		},
// 		{
// 			"invalid deployer address",
// 			func() {
// 				req = &types.QueryDeployerRevenuesRequest{
// 					DeployerAddress: "123",
// 				}
// 				expRes = &types.QueryDeployerRevenuesResponse{Pagination: &query.PageResponse{}}
// 			},
// 			false,
// 		},
// 		{
// 			"1 fee registered w/pagination",
// 			func() {
// 				req = &types.QueryDeployerRevenuesRequest{
// 					Pagination:      &query.PageRequest{Limit: 10, CountTotal: true},
// 					DeployerAddress: deployer.String(),
// 				}

// 				revenue := types.NewRevenue(contract, deployer, withdraw)
// 				suite.app.RevenueKeeper.SetRevenue(suite.ctx, revenue)
// 				suite.app.RevenueKeeper.SetDeployerMap(suite.ctx, deployer, contract)
// 				suite.app.RevenueKeeper.SetWithdrawerMap(suite.ctx, withdraw, contract)

// 				expRes = &types.QueryDeployerRevenuesResponse{
// 					Pagination: &query.PageResponse{Total: 1},
// 					ContractAddresses: []string{
// 						contract.Hex(),
// 					},
// 				}
// 			},
// 			true,
// 		},
// 		{
// 			"2 fee infos registered for one contract wo/pagination",
// 			func() {
// 				req = &types.QueryDeployerRevenuesRequest{
// 					DeployerAddress: deployer.String(),
// 				}
// 				contract2 := utiltx.GenerateAddress()
// 				revenue := types.NewRevenue(contract, deployer, withdraw)
// 				suite.app.RevenueKeeper.SetRevenue(suite.ctx, revenue)
// 				suite.app.RevenueKeeper.SetDeployerMap(suite.ctx, deployer, contract)
// 				suite.app.RevenueKeeper.SetWithdrawerMap(suite.ctx, withdraw, contract)

// 				feeSplit2 := types.NewRevenue(contract2, deployer, nil)
// 				suite.app.RevenueKeeper.SetRevenue(suite.ctx, feeSplit2)
// 				suite.app.RevenueKeeper.SetDeployerMap(suite.ctx, deployer, contract2)

// 				expRes = &types.QueryDeployerRevenuesResponse{
// 					Pagination: &query.PageResponse{Total: 2},
// 					ContractAddresses: []string{
// 						contract.Hex(),
// 						contract2.Hex(),
// 					},
// 				}
// 			},
// 			true,
// 		},
// 	}
// 	for _, tc := range testCases {
// 		suite.Run(fmt.Sprintf("Case %s", tc.name), func() {
// 			suite.SetupTest() // reset

// 			ctx := sdk.WrapSDKContext(suite.ctx)
// 			tc.malleate()

// 			res, err := suite.queryClient.DeployerRevenues(ctx, req)
// 			if tc.expPass {
// 				suite.Require().NoError(err)
// 				suite.Require().Equal(expRes.Pagination, res.Pagination)
// 				suite.Require().ElementsMatch(expRes.ContractAddresses, res.ContractAddresses)
// 			} else {
// 				suite.Require().Error(err)
// 			}
// 		})
// 	}
// }

// // Cases that cannot be tested in TestDeployerFees
// func (suite *KeeperTestSuite) TestDeployerRevenueKeeper() {
// 	suite.SetupTest()
// 	ctx := sdk.WrapSDKContext(suite.ctx)
// 	res, err := suite.app.RevenueKeeper.DeployerRevenues(ctx, nil)
// 	suite.Require().Error(err)
// 	suite.Require().Nil(res)
// }

// func (suite *KeeperTestSuite) TestWithdrawerRevenues() {
// 	var (
// 		req    *types.QueryWithdrawerRevenuesRequest
// 		expRes *types.QueryWithdrawerRevenuesResponse
// 	)

// 	testCases := []struct {
// 		name     string
// 		malleate func()
// 		expPass  bool
// 	}{
// 		{
// 			"no contract registered",
// 			func() {
// 				req = &types.QueryWithdrawerRevenuesRequest{}
// 				expRes = &types.QueryWithdrawerRevenuesResponse{Pagination: &query.PageResponse{}}
// 			},
// 			false,
// 		},
// 		{
// 			"invalid withdraw address",
// 			func() {
// 				req = &types.QueryWithdrawerRevenuesRequest{
// 					WithdrawerAddress: "123",
// 				}
// 				expRes = &types.QueryWithdrawerRevenuesResponse{Pagination: &query.PageResponse{}}
// 			},
// 			false,
// 		},
// 		{
// 			"1 fee registered w/pagination",
// 			func() {
// 				req = &types.QueryWithdrawerRevenuesRequest{
// 					Pagination:        &query.PageRequest{Limit: 10, CountTotal: true},
// 					WithdrawerAddress: withdraw.String(),
// 				}

// 				revenue := types.NewRevenue(contract, deployer, withdraw)
// 				suite.app.RevenueKeeper.SetRevenue(suite.ctx, revenue)
// 				suite.app.RevenueKeeper.SetDeployerMap(suite.ctx, deployer, contract)
// 				suite.app.RevenueKeeper.SetWithdrawerMap(suite.ctx, withdraw, contract)

// 				expRes = &types.QueryWithdrawerRevenuesResponse{
// 					Pagination: &query.PageResponse{Total: 1},
// 					ContractAddresses: []string{
// 						contract.Hex(),
// 					},
// 				}
// 			},
// 			true,
// 		},
// 		{
// 			"2 fees registered for one withdraw address wo/pagination",
// 			func() {
// 				req = &types.QueryWithdrawerRevenuesRequest{
// 					WithdrawerAddress: withdraw.String(),
// 				}
// 				contract2 := utiltx.GenerateAddress()
// 				deployer2 := sdk.AccAddress(utiltx.GenerateAddress().Bytes())

// 				revenue := types.NewRevenue(contract, deployer, withdraw)
// 				suite.app.RevenueKeeper.SetRevenue(suite.ctx, revenue)
// 				suite.app.RevenueKeeper.SetDeployerMap(suite.ctx, deployer, contract)
// 				suite.app.RevenueKeeper.SetWithdrawerMap(suite.ctx, withdraw, contract)

// 				feeSplit2 := types.NewRevenue(contract2, deployer2, withdraw)
// 				suite.app.RevenueKeeper.SetRevenue(suite.ctx, feeSplit2)
// 				suite.app.RevenueKeeper.SetDeployerMap(suite.ctx, deployer2, contract2)
// 				suite.app.RevenueKeeper.SetWithdrawerMap(suite.ctx, withdraw, contract2)

// 				expRes = &types.QueryWithdrawerRevenuesResponse{
// 					Pagination: &query.PageResponse{Total: 2},
// 					ContractAddresses: []string{
// 						contract.Hex(),
// 						contract2.Hex(),
// 					},
// 				}
// 			},
// 			true,
// 		},
// 	}
// 	for _, tc := range testCases {
// 		suite.Run(fmt.Sprintf("Case %s", tc.name), func() {
// 			suite.SetupTest() // reset

// 			ctx := sdk.WrapSDKContext(suite.ctx)
// 			tc.malleate()

// 			res, err := suite.queryClient.WithdrawerRevenues(ctx, req)
// 			if tc.expPass {
// 				suite.Require().NoError(err)
// 				suite.Require().Equal(expRes.Pagination, res.Pagination)
// 				suite.Require().ElementsMatch(expRes.ContractAddresses, res.ContractAddresses)
// 			} else {
// 				suite.Require().Error(err)
// 			}
// 		})
// 	}
// }

// // Cases that cannot be tested in TestWithdrawerFees
// func (suite *KeeperTestSuite) TestWithdrawerRevenueKeeper() {
// 	suite.SetupTest()
// 	ctx := sdk.WrapSDKContext(suite.ctx)
// 	res, err := suite.app.RevenueKeeper.WithdrawerRevenues(ctx, nil)
// 	suite.Require().Error(err)
// 	suite.Require().Nil(res)
// }

// func (suite *KeeperTestSuite) TestQueryParams() {
// 	ctx := sdk.WrapSDKContext(suite.ctx)
// 	expParams := types.DefaultParams()
// 	expParams.EnableRevenue = true

// 	res, err := suite.queryClient.Params(ctx, &types.QueryParamsRequest{})
// 	suite.Require().NoError(err)
// 	suite.Require().Equal(expParams, res.Params)
// }
