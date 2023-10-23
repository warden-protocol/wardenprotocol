package keeper_test

// import (
// 	"fmt"
// 	"math/big"

// 	sdk "github.com/cosmos/cosmos-sdk/types"
// 	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
// 	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"

// 	"github.com/ethereum/go-ethereum/common"
// 	"github.com/ethereum/go-ethereum/crypto"

// 	utiltx "github.com/qredo/fusionchain/testutil/tx"
// 	"github.com/evmos/ethermint/x/evm/statedb"
// 	"github.com/qredo/fusionchain/x/revenue/v1/types"
// )

// func (suite *KeeperTestSuite) TestRegisterRevenue() {
// 	deployer := utiltx.GenerateAddress()
// 	fakeDeployer := utiltx.GenerateAddress()
// 	contract1 := crypto.CreateAddress(deployer, 1)
// 	factory1 := contract1
// 	factory2 := crypto.CreateAddress(factory1, 0)
// 	codeHash := common.Hex2Bytes("fa98cd094c09bb300de0037ba34e94f569b145ce8baa36ed863a08d7b7433f8d")
// 	contractAccount := statedb.Account{
// 		Nonce:    1,
// 		Balance:  big.NewInt(0),
// 		CodeHash: codeHash,
// 	}
// 	deployerAccount := statedb.Account{
// 		Balance:  big.NewInt(0),
// 		CodeHash: crypto.Keccak256(nil),
// 	}

// 	testCases := []struct {
// 		name         string
// 		deployer     sdk.AccAddress
// 		withdraw     sdk.AccAddress
// 		contract     common.Address
// 		nonces       []uint64
// 		malleate     func()
// 		expPass      bool
// 		errorMessage string
// 	}{
// 		{
// 			"ok - contract deployed by EOA",
// 			sdk.AccAddress(deployer.Bytes()),
// 			sdk.AccAddress(deployer.Bytes()),
// 			contract1,
// 			[]uint64{1},
// 			func() {
// 				// set deployer and contract accounts
// 				err := s.app.EvmKeeper.SetAccount(s.ctx, deployer, deployerAccount)
// 				s.Require().NoError(err)
// 				err = s.app.EvmKeeper.SetAccount(s.ctx, contract1, contractAccount)
// 				s.Require().NoError(err)
// 			},
// 			true,
// 			"",
// 		},
// 		{
// 			"ok - contract deployed by factory in factory",
// 			sdk.AccAddress(deployer.Bytes()),
// 			sdk.AccAddress(deployer.Bytes()),
// 			crypto.CreateAddress(factory2, 1),
// 			[]uint64{1, 0, 1},
// 			func() {
// 				// set deployer and contract accounts
// 				err := s.app.EvmKeeper.SetAccount(s.ctx, deployer, deployerAccount)
// 				s.Require().NoError(err)
// 				err = s.app.EvmKeeper.SetAccount(s.ctx, crypto.CreateAddress(factory2, 1), contractAccount)
// 				s.Require().NoError(err)
// 			},
// 			true,
// 			"",
// 		},
// 		{
// 			"ok - omit withdraw address, it is stored as empty string",
// 			sdk.AccAddress(deployer.Bytes()),
// 			nil,
// 			contract1,
// 			[]uint64{1},
// 			func() {
// 				// set deployer and contract accounts
// 				err := s.app.EvmKeeper.SetAccount(s.ctx, deployer, deployerAccount)
// 				s.Require().NoError(err)
// 				err = s.app.EvmKeeper.SetAccount(s.ctx, contract1, contractAccount)
// 				s.Require().NoError(err)
// 			},
// 			true,
// 			"",
// 		},
// 		{
// 			"ok - deployer == withdraw, withdraw is stored as empty string",
// 			sdk.AccAddress(deployer.Bytes()),
// 			sdk.AccAddress(deployer.Bytes()),
// 			contract1,
// 			[]uint64{1},
// 			func() {
// 				// set deployer and contract accounts
// 				err := s.app.EvmKeeper.SetAccount(s.ctx, deployer, deployerAccount)
// 				s.Require().NoError(err)
// 				err = s.app.EvmKeeper.SetAccount(s.ctx, contract1, contractAccount)
// 				s.Require().NoError(err)
// 			},
// 			true,
// 			"",
// 		},
// 		{
// 			"not ok - deployer account not found",
// 			sdk.AccAddress(deployer.Bytes()),
// 			sdk.AccAddress(deployer.Bytes()),
// 			contract1,
// 			[]uint64{1},
// 			func() {
// 				// set only contract account
// 				err := s.app.EvmKeeper.SetAccount(s.ctx, contract1, contractAccount)
// 				s.Require().NoError(err)
// 			},
// 			false,
// 			"deployer account not found",
// 		},
// 		{
// 			"not ok - deployer cannot be a contract",
// 			sdk.AccAddress(contract1.Bytes()),
// 			sdk.AccAddress(contract1.Bytes()),
// 			contract1,
// 			[]uint64{1},
// 			func() {
// 				// set contract account
// 				err := s.app.EvmKeeper.SetAccount(s.ctx, contract1, contractAccount)
// 				s.Require().NoError(err)
// 			},
// 			false,
// 			"deployer cannot be a contract",
// 		},
// 		{
// 			"not ok - contract is already registered",
// 			sdk.AccAddress(deployer.Bytes()),
// 			sdk.AccAddress(deployer.Bytes()),
// 			contract1,
// 			[]uint64{1},
// 			func() {
// 				// set deployer and contract accounts
// 				err := s.app.EvmKeeper.SetAccount(s.ctx, deployer, deployerAccount)
// 				s.Require().NoError(err)
// 				err = s.app.EvmKeeper.SetAccount(s.ctx, contract1, contractAccount)
// 				s.Require().NoError(err)
// 				msg := types.NewMsgRegisterRevenue(
// 					contract1,
// 					sdk.AccAddress(deployer.Bytes()),
// 					sdk.AccAddress(deployer.Bytes()),
// 					[]uint64{1},
// 				)
// 				ctx := sdk.WrapSDKContext(suite.ctx)
// 				suite.app.RevenueKeeper.RegisterRevenue(ctx, msg) //nolint:errcheck
// 			},
// 			false,
// 			types.ErrRevenueAlreadyRegistered.Error(),
// 		},
// 		{
// 			"not ok - not contract deployer",
// 			sdk.AccAddress(fakeDeployer.Bytes()),
// 			sdk.AccAddress(deployer.Bytes()),
// 			contract1,
// 			[]uint64{1},
// 			func() {
// 				// set deployer, fakeDeployer and contract accounts
// 				err := s.app.EvmKeeper.SetAccount(s.ctx, deployer, deployerAccount)
// 				s.Require().NoError(err)
// 				err = s.app.EvmKeeper.SetAccount(s.ctx, fakeDeployer, deployerAccount)
// 				s.Require().NoError(err)
// 				err = s.app.EvmKeeper.SetAccount(s.ctx, contract1, contractAccount)
// 				s.Require().NoError(err)
// 			},
// 			false,
// 			"not contract deployer",
// 		},
// 		{
// 			"not ok - contract not deployed",
// 			sdk.AccAddress(deployer.Bytes()),
// 			sdk.AccAddress(deployer.Bytes()),
// 			contract1,
// 			[]uint64{1},
// 			func() {
// 				// set deployer account
// 				err := s.app.EvmKeeper.SetAccount(s.ctx, deployer, deployerAccount)
// 				s.Require().NoError(err)
// 			},
// 			false,
// 			"no contract code found at address",
// 		},
// 	}
// 	for _, tc := range testCases {
// 		suite.Run(fmt.Sprintf("Case %s", tc.name), func() {
// 			suite.SetupTest()
// 			tc.malleate()

// 			ctx := sdk.WrapSDKContext(suite.ctx)
// 			msg := types.NewMsgRegisterRevenue(tc.contract, tc.deployer, tc.withdraw, tc.nonces)

// 			res, err := suite.app.RevenueKeeper.RegisterRevenue(ctx, msg)
// 			expRes := &types.MsgRegisterRevenueResponse{}
// 			suite.Commit()

// 			if tc.expPass {
// 				suite.Require().NoError(err, tc.name)
// 				suite.Require().Equal(expRes, res, tc.name)

// 				revenue, ok := suite.app.RevenueKeeper.GetRevenue(suite.ctx, tc.contract)
// 				suite.Require().True(ok, "unregistered revenue")
// 				suite.Require().Equal(tc.contract.String(), revenue.ContractAddress, "wrong contract")
// 				suite.Require().Equal(tc.deployer.String(), revenue.DeployerAddress, "wrong deployer")
// 				if tc.withdraw.String() != tc.deployer.String() {
// 					suite.Require().Equal(tc.withdraw.String(), revenue.WithdrawerAddress, "wrong withdraw address")
// 				} else {
// 					suite.Require().Equal("", revenue.WithdrawerAddress, "wrong withdraw address")
// 				}
// 			} else {
// 				suite.Require().Error(err, tc.name)
// 				suite.Require().Contains(err.Error(), tc.errorMessage)
// 			}
// 		})
// 	}
// }

// func (suite *KeeperTestSuite) TestUpdateRevenue() {
// 	deployer := utiltx.GenerateAddress()
// 	deployerAddr := sdk.AccAddress(deployer.Bytes())
// 	withdrawer := sdk.AccAddress(utiltx.GenerateAddress().Bytes())
// 	newWithdrawer := sdk.AccAddress(utiltx.GenerateAddress().Bytes())
// 	contract1 := crypto.CreateAddress(deployer, 1)
// 	codeHash := common.Hex2Bytes("fa98cd094c09bb300de0037ba34e94f569b145ce8baa36ed863a08d7b7433f8d")
// 	contractAccount := statedb.Account{
// 		Nonce:    1,
// 		Balance:  big.NewInt(0),
// 		CodeHash: codeHash,
// 	}
// 	deployerAccount := statedb.Account{
// 		Balance:  big.NewInt(0),
// 		CodeHash: crypto.Keccak256(nil),
// 	}
// 	testCases := []struct {
// 		name          string
// 		deployer      sdk.AccAddress
// 		withdraw      sdk.AccAddress
// 		newWithdrawer sdk.AccAddress
// 		contract      common.Address
// 		nonces        []uint64
// 		malleate      func()
// 		expPass       bool
// 		errorMessage  string
// 	}{
// 		{
// 			"ok - change withdrawer to deployer",
// 			deployerAddr,
// 			withdrawer,
// 			deployerAddr,
// 			contract1,
// 			[]uint64{1},
// 			func() {
// 				err := s.app.EvmKeeper.SetAccount(s.ctx, deployer, deployerAccount)
// 				s.Require().NoError(err)
// 				err = s.app.EvmKeeper.SetAccount(s.ctx, contract1, contractAccount)
// 				s.Require().NoError(err)

// 				// Prepare
// 				ctx := sdk.WrapSDKContext(suite.ctx)
// 				msg := types.NewMsgRegisterRevenue(contract1, deployerAddr, withdrawer, []uint64{1})

// 				_, err = suite.app.RevenueKeeper.RegisterRevenue(ctx, msg)
// 				suite.Require().NoError(err)
// 				suite.Commit()
// 			},
// 			true,
// 			"",
// 		},
// 		{
// 			"ok - change withdrawer to newWithdrawer",
// 			deployerAddr,
// 			withdrawer,
// 			newWithdrawer,
// 			contract1,
// 			[]uint64{1},
// 			func() {
// 				err := s.app.EvmKeeper.SetAccount(s.ctx, deployer, deployerAccount)
// 				s.Require().NoError(err)
// 				err = s.app.EvmKeeper.SetAccount(s.ctx, contract1, contractAccount)
// 				s.Require().NoError(err)

// 				// Prepare
// 				ctx := sdk.WrapSDKContext(suite.ctx)
// 				msg := types.NewMsgRegisterRevenue(contract1, deployerAddr, withdrawer, []uint64{1})

// 				_, err = suite.app.RevenueKeeper.RegisterRevenue(ctx, msg)
// 				suite.Require().NoError(err)
// 				suite.Commit()
// 			},
// 			true,
// 			"",
// 		},
// 		{
// 			"fail - revenue disabled",
// 			deployerAddr,
// 			withdrawer,
// 			newWithdrawer,
// 			contract1,
// 			[]uint64{1},
// 			func() {
// 				err := s.app.EvmKeeper.SetAccount(s.ctx, deployer, deployerAccount)
// 				s.Require().NoError(err)
// 				err = s.app.EvmKeeper.SetAccount(s.ctx, contract1, contractAccount)
// 				s.Require().NoError(err)

// 				// register contract
// 				ctx := sdk.WrapSDKContext(suite.ctx)
// 				msg := types.NewMsgRegisterRevenue(contract1, deployerAddr, withdrawer, []uint64{1})
// 				_, err = suite.app.RevenueKeeper.RegisterRevenue(ctx, msg)
// 				suite.Require().NoError(err)
// 				suite.Commit()

// 				params := types.DefaultParams()
// 				params.EnableRevenue = false
// 				suite.app.RevenueKeeper.SetParams(suite.ctx, params) //nolint:errcheck
// 			},
// 			false,
// 			"",
// 		},
// 		{
// 			"fail - contract not registered",
// 			deployerAddr,
// 			withdrawer,
// 			newWithdrawer,
// 			contract1,
// 			[]uint64{1},
// 			func() {
// 				err := s.app.EvmKeeper.SetAccount(s.ctx, deployer, deployerAccount)
// 				s.Require().NoError(err)
// 				err = s.app.EvmKeeper.SetAccount(s.ctx, contract1, contractAccount)
// 				s.Require().NoError(err)
// 			},
// 			false,
// 			"",
// 		},
// 		{
// 			"fail - deployer not the one registered",
// 			newWithdrawer,
// 			withdrawer,
// 			newWithdrawer,
// 			contract1,
// 			[]uint64{1},
// 			func() {
// 				err := s.app.EvmKeeper.SetAccount(s.ctx, deployer, deployerAccount)
// 				s.Require().NoError(err)
// 				err = s.app.EvmKeeper.SetAccount(s.ctx, contract1, contractAccount)
// 				s.Require().NoError(err)

// 				// register contract
// 				ctx := sdk.WrapSDKContext(suite.ctx)
// 				msg := types.NewMsgRegisterRevenue(contract1, deployerAddr, withdrawer, []uint64{1})
// 				_, err = suite.app.RevenueKeeper.RegisterRevenue(ctx, msg)
// 				suite.Require().NoError(err)
// 				suite.Commit()
// 			},
// 			false,
// 			"",
// 		},
// 		{
// 			"fail - everything is the same",
// 			deployerAddr,
// 			withdrawer,
// 			withdrawer,
// 			contract1,
// 			[]uint64{1},
// 			func() {
// 				err := s.app.EvmKeeper.SetAccount(s.ctx, deployer, deployerAccount)
// 				s.Require().NoError(err)
// 				err = s.app.EvmKeeper.SetAccount(s.ctx, contract1, contractAccount)
// 				s.Require().NoError(err)

// 				// register contract
// 				ctx := sdk.WrapSDKContext(suite.ctx)
// 				msg := types.NewMsgRegisterRevenue(contract1, deployerAddr, withdrawer, []uint64{1})
// 				_, err = suite.app.RevenueKeeper.RegisterRevenue(ctx, msg)
// 				suite.Require().NoError(err)
// 				suite.Commit()
// 			},
// 			false,
// 			"",
// 		},
// 		{
// 			"fail - previously canceled contract",
// 			deployerAddr,
// 			withdrawer,
// 			withdrawer,
// 			contract1,
// 			[]uint64{1},
// 			func() {
// 				err := s.app.EvmKeeper.SetAccount(s.ctx, deployer, deployerAccount)
// 				s.Require().NoError(err)
// 				err = s.app.EvmKeeper.SetAccount(s.ctx, contract1, contractAccount)
// 				s.Require().NoError(err)

// 				// register contract
// 				ctx := sdk.WrapSDKContext(suite.ctx)
// 				msg := types.NewMsgRegisterRevenue(contract1, deployerAddr, withdrawer, []uint64{1})
// 				_, err = suite.app.RevenueKeeper.RegisterRevenue(ctx, msg)
// 				suite.Require().NoError(err)
// 				suite.Commit()

// 				msgCancel := types.NewMsgCancelRevenue(contract1, deployerAddr)
// 				_, err = suite.app.RevenueKeeper.CancelRevenue(ctx, msgCancel)
// 				suite.Require().NoError(err)
// 				suite.Commit()
// 			},
// 			false,
// 			"",
// 		},
// 	}
// 	for _, tc := range testCases {
// 		suite.Run(fmt.Sprintf("Case %s", tc.name), func() {
// 			suite.SetupTest()

// 			tc.malleate()

// 			msgUpdate := types.NewMsgUpdateRevenue(tc.contract, tc.deployer, tc.newWithdrawer)

// 			ctx := sdk.WrapSDKContext(suite.ctx)
// 			res, err := suite.app.RevenueKeeper.UpdateRevenue(ctx, msgUpdate)
// 			expRes := &types.MsgUpdateRevenueResponse{}
// 			suite.Commit()

// 			if tc.expPass {
// 				suite.Require().NoError(err, tc.name)
// 				suite.Require().Equal(expRes, res, tc.name)

// 				revenue, ok := suite.app.RevenueKeeper.GetRevenue(suite.ctx, tc.contract)
// 				suite.Require().True(ok, "unregistered revenue")
// 				suite.Require().Equal(tc.contract.String(), revenue.ContractAddress, "wrong contract")
// 				suite.Require().Equal(tc.deployer.String(), revenue.DeployerAddress, "wrong deployer")

// 				found := suite.app.RevenueKeeper.IsWithdrawerMapSet(suite.ctx, tc.withdraw, tc.contract)
// 				suite.Require().False(found)
// 				if tc.newWithdrawer.String() != tc.deployer.String() {
// 					suite.Require().Equal(tc.newWithdrawer.String(), revenue.WithdrawerAddress, "wrong withdraw address")
// 					found := suite.app.RevenueKeeper.IsWithdrawerMapSet(suite.ctx, tc.newWithdrawer, tc.contract)
// 					suite.Require().True(found)
// 				} else {
// 					suite.Require().Equal("", revenue.WithdrawerAddress, "wrong withdraw address")
// 					found := suite.app.RevenueKeeper.IsWithdrawerMapSet(suite.ctx, tc.newWithdrawer, tc.contract)
// 					suite.Require().False(found)
// 				}
// 			} else {
// 				suite.Require().Error(err, tc.name)
// 				suite.Require().Contains(err.Error(), tc.errorMessage)
// 			}
// 		})
// 	}
// }

// func (suite *KeeperTestSuite) TestCancelRevenue() {
// 	deployer := utiltx.GenerateAddress()
// 	deployerAddr := sdk.AccAddress(deployer.Bytes())
// 	withdrawer := sdk.AccAddress(utiltx.GenerateAddress().Bytes())
// 	fakeDeployer := sdk.AccAddress(utiltx.GenerateAddress().Bytes())
// 	contract1 := crypto.CreateAddress(deployer, 1)
// 	codeHash := common.Hex2Bytes("fa98cd094c09bb300de0037ba34e94f569b145ce8baa36ed863a08d7b7433f8d")
// 	contractAccount := statedb.Account{
// 		Nonce:    1,
// 		Balance:  big.NewInt(0),
// 		CodeHash: codeHash,
// 	}
// 	deployerAccount := statedb.Account{
// 		Balance:  big.NewInt(0),
// 		CodeHash: crypto.Keccak256(nil),
// 	}
// 	testCases := []struct {
// 		name         string
// 		deployer     sdk.AccAddress
// 		contract     common.Address
// 		nonces       []uint64
// 		malleate     func()
// 		expPass      bool
// 		errorMessage string
// 	}{
// 		{
// 			"ok - canceled",
// 			deployerAddr,
// 			contract1,
// 			[]uint64{1},
// 			func() {
// 				err := s.app.EvmKeeper.SetAccount(s.ctx, deployer, deployerAccount)
// 				s.Require().NoError(err)
// 				err = s.app.EvmKeeper.SetAccount(s.ctx, contract1, contractAccount)
// 				s.Require().NoError(err)

// 				// Prepare
// 				ctx := sdk.WrapSDKContext(suite.ctx)
// 				msg := types.NewMsgRegisterRevenue(contract1, deployerAddr, withdrawer, []uint64{1})

// 				_, err = suite.app.RevenueKeeper.RegisterRevenue(ctx, msg)
// 				suite.Require().NoError(err)
// 				suite.Commit()
// 			},
// 			true,
// 			"",
// 		},
// 		{
// 			"ok - canceled - no withdrawer",
// 			deployerAddr,
// 			contract1,
// 			[]uint64{1},
// 			func() {
// 				err := s.app.EvmKeeper.SetAccount(s.ctx, deployer, deployerAccount)
// 				s.Require().NoError(err)
// 				err = s.app.EvmKeeper.SetAccount(s.ctx, contract1, contractAccount)
// 				s.Require().NoError(err)

// 				// Prepare
// 				ctx := sdk.WrapSDKContext(suite.ctx)
// 				msg := types.NewMsgRegisterRevenue(contract1, deployerAddr, deployerAddr, []uint64{1})

// 				_, err = suite.app.RevenueKeeper.RegisterRevenue(ctx, msg)
// 				suite.Require().NoError(err)
// 				suite.Commit()
// 			},
// 			true,
// 			"",
// 		},
// 		{
// 			"fail - revenue disabled",
// 			deployerAddr,
// 			contract1,
// 			[]uint64{1},
// 			func() {
// 				err := s.app.EvmKeeper.SetAccount(s.ctx, deployer, deployerAccount)
// 				s.Require().NoError(err)
// 				err = s.app.EvmKeeper.SetAccount(s.ctx, contract1, contractAccount)
// 				s.Require().NoError(err)

// 				// register contract
// 				ctx := sdk.WrapSDKContext(suite.ctx)
// 				msg := types.NewMsgRegisterRevenue(contract1, deployerAddr, withdrawer, []uint64{1})
// 				_, err = suite.app.RevenueKeeper.RegisterRevenue(ctx, msg)
// 				suite.Require().NoError(err)
// 				suite.Commit()

// 				params := types.DefaultParams()
// 				params.EnableRevenue = false
// 				suite.app.RevenueKeeper.SetParams(suite.ctx, params) //nolint:errcheck
// 			},
// 			false,
// 			"",
// 		},
// 		{
// 			"fail - contract not registered",
// 			deployerAddr,
// 			contract1,
// 			[]uint64{1},
// 			func() {
// 				err := s.app.EvmKeeper.SetAccount(s.ctx, deployer, deployerAccount)
// 				s.Require().NoError(err)
// 				err = s.app.EvmKeeper.SetAccount(s.ctx, contract1, contractAccount)
// 				s.Require().NoError(err)
// 			},
// 			false,
// 			"",
// 		},
// 		{
// 			"fail - deployer not the one registered",
// 			fakeDeployer,
// 			contract1,
// 			[]uint64{1},
// 			func() {
// 				err := s.app.EvmKeeper.SetAccount(s.ctx, deployer, deployerAccount)
// 				s.Require().NoError(err)
// 				err = s.app.EvmKeeper.SetAccount(s.ctx, contract1, contractAccount)
// 				s.Require().NoError(err)

// 				// register contract
// 				ctx := sdk.WrapSDKContext(suite.ctx)
// 				msg := types.NewMsgRegisterRevenue(contract1, deployerAddr, withdrawer, []uint64{1})
// 				_, err = suite.app.RevenueKeeper.RegisterRevenue(ctx, msg)
// 				suite.Require().NoError(err)
// 				suite.Commit()
// 			},
// 			false,
// 			"",
// 		},
// 		{
// 			"fail - everything is the same",
// 			deployerAddr,
// 			contract1,
// 			[]uint64{1},
// 			func() {
// 				err := s.app.EvmKeeper.SetAccount(s.ctx, deployer, deployerAccount)
// 				s.Require().NoError(err)
// 				err = s.app.EvmKeeper.SetAccount(s.ctx, contract1, contractAccount)
// 				s.Require().NoError(err)
// 			},
// 			false,
// 			"",
// 		},
// 	}
// 	for _, tc := range testCases {
// 		suite.Run(fmt.Sprintf("Case %s", tc.name), func() {
// 			suite.SetupTest()

// 			tc.malleate()

// 			msgCancel := types.NewMsgCancelRevenue(tc.contract, tc.deployer)

// 			ctx := sdk.WrapSDKContext(suite.ctx)
// 			res, err := suite.app.RevenueKeeper.CancelRevenue(ctx, msgCancel)
// 			expRes := &types.MsgCancelRevenueResponse{}
// 			suite.Commit()

// 			if tc.expPass {
// 				suite.Require().NoError(err, tc.name)
// 				suite.Require().Equal(expRes, res, tc.name)

// 				_, ok := suite.app.RevenueKeeper.GetRevenue(suite.ctx, tc.contract)
// 				suite.Require().False(ok, "registered revenue")

// 				found := suite.app.RevenueKeeper.IsWithdrawerMapSet(suite.ctx, withdrawer, tc.contract)
// 				suite.Require().False(found)
// 			} else {
// 				suite.Require().Error(err, tc.name)
// 				suite.Require().Contains(err.Error(), tc.errorMessage)
// 			}
// 		})
// 	}
// }

// func (suite *KeeperTestSuite) TestUpdateParams() {
// 	testCases := []struct {
// 		name      string
// 		request   *types.MsgUpdateParams
// 		expectErr bool
// 	}{
// 		{
// 			name:      "fail - invalid authority",
// 			request:   &types.MsgUpdateParams{Authority: "foobar"},
// 			expectErr: true,
// 		},
// 		{
// 			name: "pass - valid Update msg",
// 			request: &types.MsgUpdateParams{
// 				Authority: authtypes.NewModuleAddress(govtypes.ModuleName).String(),
// 				Params:    types.DefaultParams(),
// 			},
// 			expectErr: false,
// 		},
// 	}

// 	for _, tc := range testCases {
// 		tc := tc
// 		suite.Run("MsgUpdateParams", func() {
// 			_, err := suite.app.RevenueKeeper.UpdateParams(suite.ctx, tc.request)
// 			if tc.expectErr {
// 				suite.Require().Error(err)
// 			} else {
// 				suite.Require().NoError(err)
// 			}
// 		})
// 	}
// }
