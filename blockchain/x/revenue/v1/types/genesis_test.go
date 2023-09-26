package types_test

// import (
// 	"testing"

// 	sdk "github.com/cosmos/cosmos-sdk/types"
// 	utiltx "github.com/qredo/fusionchain/testutil/tx"
// 	"github.com/qredo/fusionchain/x/revenue/v1/types"
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
