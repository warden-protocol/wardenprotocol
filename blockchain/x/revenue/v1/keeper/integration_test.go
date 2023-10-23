package keeper_test

// import (
// 	"fmt"
// 	"math"
// 	"math/big"
// 	"strings"

// 	"github.com/qredo/fusionchain/precompiles/staking"

// 	"github.com/ethereum/go-ethereum/common"
// 	. "github.com/onsi/ginkgo/v2"
// 	. "github.com/onsi/gomega"

// 	sdk "github.com/cosmos/cosmos-sdk/types"
// 	ethtypes "github.com/ethereum/go-ethereum/core/types"
// 	"github.com/qredo/fusionchain/crypto/ethsecp256k1"
// 	"github.com/qredo/fusionchain/testutil"
// 	utiltx "github.com/qredo/fusionchain/testutil/tx"
// 	evmtypes "github.com/evmos/ethermint/x/evm/types"
// 	"github.com/qredo/fusionchain/x/revenue/v1/types"

// 	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
// )

// var contractCode = "600661000e60003960066000f300612222600055"

// // Uses CREATE opcode to deploy the above contract and emits
// // log1(0, 0, contractAddress)
// var factoryCode = "603061000e60003960306000f3007f600661000e60003960066000f300612222600055000000000000000000000000600052601460006000f060006000a1"

// // Creates the above factory
// var doubleFactoryCode = "605461000e60003960546000f3007f603061000e60003960306000f3007f600661000e60003960066000f3006122226000527f600055000000000000000000000000600052601460006000f060006000a10000602052603e60006000f060006000a1"

// var _ = Describe("Fee distribution:", Ordered, func() {
// 	feeCollectorAddr := s.app.AccountKeeper.GetModuleAddress(authtypes.FeeCollectorName)
// 	denom := s.denom

// 	// account initial balances
// 	initAmount := sdk.NewInt(int64(math.Pow10(18) * 4))
// 	initBalance := sdk.NewCoins(sdk.NewCoin(denom, initAmount))

// 	var (
// 		deployerKey     *ethsecp256k1.PrivKey
// 		userKey         *ethsecp256k1.PrivKey
// 		deployerAddress sdk.AccAddress
// 		userAddress     sdk.AccAddress
// 		params          types.Params
// 		factoryAddress  common.Address
// 		factoryNonce    uint64
// 	)

// 	BeforeAll(func() {
// 		s.SetupTest()

// 		params = s.app.RevenueKeeper.GetParams(s.ctx)
// 		params.EnableRevenue = true
// 		s.app.RevenueKeeper.SetParams(s.ctx, params) //nolint:errcheck

// 		// setup deployer account
// 		deployerAddress, deployerKey = utiltx.NewAccAddressAndKey()
// 		err := testutil.FundAccount(s.ctx, s.app.BankKeeper, deployerAddress, initBalance)
// 		Expect(err).To(BeNil())

// 		// setup account interacting with registered contracts
// 		userAddress, userKey = utiltx.NewAccAddressAndKey()
// 		err = testutil.FundAccount(s.ctx, s.app.BankKeeper, userAddress, initBalance)
// 		Expect(err).To(BeNil())
// 		acc := s.app.AccountKeeper.NewAccountWithAddress(s.ctx, userAddress)
// 		s.app.AccountKeeper.SetAccount(s.ctx, acc)
// 		s.Commit()

// 		// deploy a factory
// 		factoryNonce = getNonce(deployerAddress.Bytes())
// 		factoryAddress, err = testutil.DeployContract(
// 			s.ctx,
// 			s.app,
// 			deployerKey,
// 			s.queryClientEvm,
// 			evmtypes.CompiledContract{
// 				Bin: common.Hex2Bytes(factoryCode),
// 			},
// 		)
// 		s.Require().NoError(err)
// 		s.Commit()
// 	})

// 	Context("with revenue param disabled", func() {
// 		var registeredContract common.Address

// 		BeforeAll(func() {
// 			// revenue registered before disabling params
// 			var err error
// 			nonce := getNonce(deployerAddress.Bytes())
// 			registeredContract, err = testutil.DeployContract(
// 				s.ctx,
// 				s.app,
// 				deployerKey,
// 				s.queryClientEvm,
// 				evmtypes.CompiledContract{
// 					Bin: common.Hex2Bytes(contractCode),
// 				},
// 			)
// 			s.Require().NoError(err)
// 			s.Commit()
// 			res := registerFee(deployerKey, &registeredContract, nil, []uint64{nonce})
// 			Expect(res.IsOK()).To(Equal(true), "contract registration failed: "+res.GetLog())

// 			fee, isRegistered := s.app.RevenueKeeper.GetRevenue(s.ctx, registeredContract)
// 			Expect(isRegistered).To(Equal(true))
// 			Expect(fee.ContractAddress).To(Equal(registeredContract.Hex()))
// 			Expect(fee.DeployerAddress).To(Equal(deployerAddress.String()))
// 			Expect(fee.WithdrawerAddress).To(Equal(""))
// 			s.Commit()

// 			// Disable revenue module
// 			params = s.app.RevenueKeeper.GetParams(s.ctx)
// 			params.EnableRevenue = false
// 			s.app.RevenueKeeper.SetParams(s.ctx, params) //nolint:errcheck
// 		})

// 		It("should not allow new contract registrations", func() {
// 			contractAddress, err := testutil.DeployContract(
// 				s.ctx,
// 				s.app,
// 				deployerKey,
// 				s.queryClientEvm,
// 				evmtypes.CompiledContract{
// 					Bin: common.Hex2Bytes(contractCode),
// 				},
// 			)
// 			s.Require().NoError(err)
// 			s.Commit()
// 			msg := types.NewMsgRegisterRevenue(
// 				contractAddress,
// 				deployerAddress,
// 				withdraw,
// 				[]uint64{1},
// 			)

// 			_, err = testutil.DeliverTx(s.ctx, s.app, deployerKey, nil, msg)
// 			Expect(err).ToNot(BeNil(), "registration should have failed")
// 			Expect(
// 				strings.Contains(err.Error(),
// 					"revenue module is disabled by governance"),
// 			).To(BeTrue())
// 			s.Commit()

// 			_, isRegistered := s.app.RevenueKeeper.GetRevenue(s.ctx, contractAddress)
// 			Expect(isRegistered).To(Equal(false))
// 		})

// 		It("should not distribute tx fees for previously registered contracts", func() {
// 			preBalance := s.app.BankKeeper.GetBalance(s.ctx, deployerAddress, denom)
// 			gasPrice := big.NewInt(2000000000)
// 			data := make([]byte, 0)
// 			contractInteract(userKey, &registeredContract, gasPrice, nil, nil, data, nil)
// 			s.Commit()

// 			balance := s.app.BankKeeper.GetBalance(s.ctx, deployerAddress, denom)
// 			Expect(balance).To(Equal(preBalance))
// 		})

// 		It("should not allow revenue updates for previously registered contracts", func() {
// 			withdrawerAddress := sdk.AccAddress(utiltx.GenerateAddress().Bytes())
// 			msg := types.NewMsgUpdateRevenue(
// 				registeredContract,
// 				deployerAddress,
// 				withdrawerAddress,
// 			)
// 			_, err := testutil.DeliverTx(s.ctx, s.app, deployerKey, nil, msg)
// 			Expect(err).ToNot(BeNil(), "update should have failed")
// 			Expect(
// 				strings.Contains(err.Error(),
// 					"revenue module is disabled by governance"),
// 			).To(BeTrue())
// 			s.Commit()
// 		})

// 		It("should not allow cancellations of previously registered contracts", func() {
// 			msg := types.NewMsgCancelRevenue(registeredContract, deployerAddress)
// 			_, err := testutil.DeliverTx(s.ctx, s.app, deployerKey, nil, msg)
// 			Expect(err).ToNot(BeNil(), "cancel should have failed")
// 			Expect(
// 				strings.Contains(err.Error(),
// 					"revenue module is disabled by governance"),
// 			).To(BeTrue())
// 			s.Commit()
// 		})
// 	})

// 	Context("with revenue param enabled", func() {
// 		BeforeEach(func() {
// 			params = types.DefaultParams()
// 			params.EnableRevenue = true
// 			s.app.RevenueKeeper.SetParams(s.ctx, params) //nolint:errcheck
// 		})

// 		Describe("Registering a contract for receiving tx fees", func() {
// 			Context("with an empty withdrawer address", Ordered, func() {
// 				var contractAddress common.Address
// 				var nonce uint64

// 				BeforeAll(func() {
// 					var err error
// 					nonce = getNonce(deployerAddress.Bytes())
// 					contractAddress, err = testutil.DeployContract(
// 						s.ctx,
// 						s.app,
// 						deployerKey,
// 						s.queryClientEvm,
// 						evmtypes.CompiledContract{
// 							Bin: common.Hex2Bytes(contractCode),
// 						},
// 					)
// 					s.Require().NoError(err)
// 					s.Commit()
// 				})

// 				It("should be possible", func() {
// 					res := registerFee(deployerKey, &contractAddress, nil, []uint64{nonce})
// 					Expect(res.IsOK()).To(Equal(true), "contract registration failed: "+res.GetLog())

// 					fee, isRegistered := s.app.RevenueKeeper.GetRevenue(s.ctx, contractAddress)
// 					Expect(isRegistered).To(Equal(true))
// 					Expect(fee.ContractAddress).To(Equal(contractAddress.Hex()))
// 					Expect(fee.DeployerAddress).To(Equal(deployerAddress.String()))
// 					Expect(fee.WithdrawerAddress).To(Equal(""))
// 					s.Commit()
// 				})

// 				It("should result in sending the tx fees to the deployer address", func() {
// 					preBalance := s.app.BankKeeper.GetBalance(s.ctx, deployerAddress, denom)
// 					gasPrice := big.NewInt(2000000000)
// 					data := make([]byte, 0)
// 					res := contractInteract(userKey, &contractAddress, gasPrice, nil, nil, data, nil)
// 					s.Commit()

// 					developerCoins, _ := calculateFees(denom, params, res, gasPrice)
// 					balance := s.app.BankKeeper.GetBalance(s.ctx, deployerAddress, denom)
// 					Expect(developerCoins.IsPositive()).To(BeTrue())
// 					Expect(balance).To(Equal(preBalance.Add(developerCoins)))
// 				})
// 			})

// 			Context("with a withdrawer address equal to the deployer address", func() {
// 				It("should be possible", func() {
// 					nonce := getNonce(deployerAddress.Bytes())
// 					contractAddress, err := testutil.DeployContract(
// 						s.ctx,
// 						s.app,
// 						deployerKey,
// 						s.queryClientEvm,
// 						evmtypes.CompiledContract{
// 							Bin: common.Hex2Bytes(contractCode),
// 						},
// 					)
// 					s.Require().NoError(err)
// 					s.Commit()
// 					res := registerFee(deployerKey, &contractAddress, deployerAddress, []uint64{nonce})
// 					Expect(res.IsOK()).To(BeTrue())

// 					_, isRegistered := s.app.RevenueKeeper.GetRevenue(s.ctx, contractAddress)
// 					Expect(isRegistered).To(BeTrue())
// 					s.Commit()
// 				})
// 			})

// 			Context("with an empty withdrawer address", func() {
// 				It("should be possible", func() {
// 					nonce := getNonce(deployerAddress.Bytes())
// 					contractAddress, err := testutil.DeployContract(
// 						s.ctx,
// 						s.app,
// 						deployerKey,
// 						s.queryClientEvm,
// 						evmtypes.CompiledContract{
// 							Bin: common.Hex2Bytes(contractCode),
// 						},
// 					)
// 					s.Require().NoError(err)
// 					s.Commit()
// 					res := registerFee(deployerKey, &contractAddress, nil, []uint64{nonce})
// 					Expect(res.IsOK()).To(Equal(true), "contract registration failed: "+res.GetLog())

// 					fee, isRegistered := s.app.RevenueKeeper.GetRevenue(s.ctx, contractAddress)
// 					Expect(isRegistered).To(Equal(true))
// 					Expect(fee.ContractAddress).To(Equal(contractAddress.Hex()))
// 					Expect(fee.DeployerAddress).To(Equal(deployerAddress.String()))
// 					Expect(fee.WithdrawerAddress).To(Equal(""))
// 					s.Commit()
// 				})
// 			})

// 			Context("with a withdrawer address different than deployer", Ordered, func() {
// 				var withdrawerAddress sdk.AccAddress
// 				var contractAddress common.Address
// 				var nonce uint64

// 				BeforeAll(func() {
// 					var err error
// 					nonce = getNonce(deployerAddress.Bytes())
// 					contractAddress, err = testutil.DeployContract(
// 						s.ctx,
// 						s.app,
// 						deployerKey,
// 						s.queryClientEvm,
// 						evmtypes.CompiledContract{
// 							Bin: common.Hex2Bytes(contractCode),
// 						},
// 					)
// 					s.Require().NoError(err)
// 					s.Commit()
// 					withdrawerAddress = sdk.AccAddress(utiltx.GenerateAddress().Bytes())
// 				})

// 				It("should be possible", func() {
// 					res := registerFee(deployerKey, &contractAddress, withdrawerAddress, []uint64{nonce})
// 					Expect(res.IsOK()).To(Equal(true), "contract registration failed: "+res.GetLog())

// 					registerEvent := res.GetEvents()[8]
// 					Expect(registerEvent.Attributes[2].Value).ToNot(Equal(deployerAddress.String()))

// 					fee, isRegistered := s.app.RevenueKeeper.GetRevenue(s.ctx, contractAddress)
// 					Expect(isRegistered).To(Equal(true))
// 					Expect(fee.ContractAddress).To(Equal(contractAddress.Hex()))
// 					Expect(fee.DeployerAddress).To(Equal(deployerAddress.String()))
// 					Expect(fee.WithdrawerAddress).To(Equal(withdrawerAddress.String()))
// 				})

// 				It("should send the fees to the withdraw address", func() {
// 					preBalance := s.app.BankKeeper.GetBalance(s.ctx, withdrawerAddress, denom)
// 					gasPrice := big.NewInt(2000000000)
// 					data := make([]byte, 0)
// 					res := contractInteract(userKey, &contractAddress, gasPrice, nil, nil, data, nil)
// 					s.Commit()

// 					developerCoins, _ := calculateFees(denom, params, res, gasPrice)
// 					balance := s.app.BankKeeper.GetBalance(s.ctx, withdrawerAddress, denom)
// 					Expect(developerCoins.IsPositive()).To(BeTrue())
// 					Expect(balance).To(Equal(preBalance.Add(developerCoins)))
// 				})
// 			})
// 		})

// 		Describe("Interacting with a registered revenue contract", func() {
// 			var contractAddress common.Address
// 			var nonce uint64

// 			BeforeAll(func() {
// 				var err error
// 				nonce = getNonce(deployerAddress.Bytes())
// 				contractAddress, err = testutil.DeployContract(
// 					s.ctx,
// 					s.app,
// 					deployerKey,
// 					s.queryClientEvm,
// 					evmtypes.CompiledContract{
// 						Bin: common.Hex2Bytes(contractCode),
// 					},
// 				)
// 				s.Require().NoError(err)
// 				s.Commit()
// 				res := registerFee(deployerKey, &contractAddress, nil, []uint64{nonce})
// 				Expect(res.IsOK()).To(Equal(true), "contract registration failed: "+res.GetLog())
// 			})

// 			Context("with a 50/50 validators-developers revenue", func() {
// 				BeforeEach(func() {
// 					params = s.app.RevenueKeeper.GetParams(s.ctx)
// 					params.DeveloperShares = sdk.NewDecWithPrec(50, 2)
// 					s.app.RevenueKeeper.SetParams(s.ctx, params) //nolint:errcheck
// 				})

// 				It("should transfer legacy tx fees to validators and contract developer evenly", func() {
// 					preFeeColectorBalance := s.app.BankKeeper.GetBalance(s.ctx, feeCollectorAddr, denom)
// 					preBalance := s.app.BankKeeper.GetBalance(s.ctx, deployerAddress, denom)
// 					gasPrice := big.NewInt(2000000000)
// 					data := make([]byte, 0)
// 					res := contractInteract(userKey, &contractAddress, gasPrice, nil, nil, data, nil)

// 					developerCoins, validatorCoins := calculateFees(denom, params, res, gasPrice)
// 					feeColectorBalance := s.app.BankKeeper.GetBalance(s.ctx, feeCollectorAddr, denom)
// 					balance := s.app.BankKeeper.GetBalance(s.ctx, deployerAddress, denom)

// 					Expect(balance).To(Equal(preBalance.Add(developerCoins)))
// 					Expect(feeColectorBalance).To(Equal(
// 						preFeeColectorBalance.Add(validatorCoins),
// 					))
// 					s.Commit()
// 				})

// 				It("should transfer dynamic tx fees to validators and contract developer evenly", func() {
// 					preFeeColectorBalance := s.app.BankKeeper.GetBalance(s.ctx, feeCollectorAddr, denom)
// 					preBalance := s.app.BankKeeper.GetBalance(s.ctx, deployerAddress, denom)
// 					gasTipCap := big.NewInt(10000)
// 					gasFeeCap := new(big.Int).Add(s.app.FeeMarketKeeper.GetBaseFee(s.ctx), gasTipCap)
// 					data := make([]byte, 0)
// 					res := contractInteract(
// 						userKey,
// 						&contractAddress,
// 						nil,
// 						gasFeeCap,
// 						gasTipCap,
// 						data,
// 						&ethtypes.AccessList{},
// 					)

// 					developerCoins, validatorCoins := calculateFees(denom, params, res, gasFeeCap)
// 					feeColectorBalance := s.app.BankKeeper.GetBalance(s.ctx, feeCollectorAddr, denom)
// 					balance := s.app.BankKeeper.GetBalance(s.ctx, deployerAddress, denom)
// 					Expect(balance).To(Equal(preBalance.Add(developerCoins)))
// 					Expect(feeColectorBalance).To(Equal(preFeeColectorBalance.Add(validatorCoins)))
// 					s.Commit()
// 				})
// 			})

// 			Context("with a 100/0 validators-developers revenue", func() {
// 				BeforeEach(func() {
// 					params = s.app.RevenueKeeper.GetParams(s.ctx)
// 					params.DeveloperShares = sdk.NewDec(0)
// 					s.app.RevenueKeeper.SetParams(s.ctx, params) //nolint:errcheck
// 				})

// 				It("should transfer all tx fees to validators", func() {
// 					preFeeColectorBalance := s.app.BankKeeper.GetBalance(s.ctx, feeCollectorAddr, denom)
// 					preBalance := s.app.BankKeeper.GetBalance(s.ctx, deployerAddress, denom)
// 					gasTipCap := big.NewInt(10000)
// 					gasFeeCap := new(big.Int).Add(s.app.FeeMarketKeeper.GetBaseFee(s.ctx), gasTipCap)
// 					data := make([]byte, 0)
// 					res := contractInteract(
// 						userKey,
// 						&contractAddress,
// 						nil,
// 						gasFeeCap,
// 						gasTipCap,
// 						data,
// 						&ethtypes.AccessList{},
// 					)

// 					_, validatorCoins := calculateFees(denom, params, res, gasFeeCap)
// 					feeColectorBalance := s.app.BankKeeper.GetBalance(s.ctx, feeCollectorAddr, denom)
// 					balance := s.app.BankKeeper.GetBalance(s.ctx, deployerAddress, denom)
// 					Expect(balance).To(Equal(preBalance))
// 					Expect(feeColectorBalance).To(Equal(preFeeColectorBalance.Add(validatorCoins)))
// 					s.Commit()
// 				})
// 			})

// 			Context("with a 0/100 validators-developers revenue", func() {
// 				BeforeEach(func() {
// 					params = s.app.RevenueKeeper.GetParams(s.ctx)
// 					params.DeveloperShares = sdk.NewDec(1)
// 					s.app.RevenueKeeper.SetParams(s.ctx, params) //nolint:errcheck
// 				})

// 				It("should transfer all tx fees to developers", func() {
// 					preFeeColectorBalance := s.app.BankKeeper.GetBalance(s.ctx, feeCollectorAddr, denom)
// 					preBalance := s.app.BankKeeper.GetBalance(s.ctx, deployerAddress, denom)
// 					gasTipCap := big.NewInt(10000)
// 					gasFeeCap := new(big.Int).Add(s.app.FeeMarketKeeper.GetBaseFee(s.ctx), gasTipCap)
// 					data := make([]byte, 0)
// 					res := contractInteract(
// 						userKey,
// 						&contractAddress,
// 						nil,
// 						gasFeeCap,
// 						gasTipCap,
// 						data,
// 						&ethtypes.AccessList{},
// 					)

// 					developerCoins, _ := calculateFees(denom, params, res, gasFeeCap)
// 					feeColectorBalance := s.app.BankKeeper.GetBalance(s.ctx, feeCollectorAddr, denom)
// 					balance := s.app.BankKeeper.GetBalance(s.ctx, deployerAddress, denom)
// 					Expect(balance).To(Equal(preBalance.Add(developerCoins)))
// 					Expect(feeColectorBalance).To(Equal(preFeeColectorBalance))
// 					s.Commit()
// 				})
// 			})
// 		})

// 		Describe("Funding community pool from precompiled contract calls", func() {
// 			Context("calling a precompiled registered contract with 100/0 community pool revenue", func() {
// 				var params types.Params

// 				BeforeEach(func() {
// 					params = s.app.RevenueKeeper.GetParams(s.ctx)
// 					params.DeveloperShares = sdk.NewDec(1)
// 					err := s.app.RevenueKeeper.SetParams(s.ctx, params)
// 					if err != nil {
// 						fmt.Println(err)
// 						return
// 					}
// 				})

// 				It("should transfer all tx fees to the community pool", func() {
// 					communityPoolBefore := s.app.DistrKeeper.GetFeePoolCommunityCoins(s.ctx)
// 					contractAddress := common.HexToAddress("0x0000000000000000000000000000000000000800")
// 					gasTipCap := big.NewInt(100000)
// 					gasFeeCap := new(big.Int).Add(s.app.FeeMarketKeeper.GetBaseFee(s.ctx), gasTipCap)
// 					stakingPrecompile := s.app.EvmKeeper.Precompiles(contractAddress)[contractAddress].(*staking.Precompile)
// 					data, err := stakingPrecompile.ABI.Pack("delegate", common.BytesToAddress(userAddress), s.validator.OperatorAddress, big.NewInt(1e18))
// 					Expect(err).To(BeNil())
// 					res := contractInteract(
// 						userKey,
// 						&contractAddress,
// 						nil,
// 						gasFeeCap,
// 						gasTipCap,
// 						data,
// 						&ethtypes.AccessList{},
// 					)
// 					Expect(res.IsOK()).To(BeTrue())
// 					communityCoins, _ := calculateFees(denom, params, res, gasFeeCap)
// 					communityCoinsDec := sdk.NewDecCoinFromCoin(communityCoins)
// 					communityPoolAfter := s.app.DistrKeeper.GetFeePoolCommunityCoins(s.ctx)
// 					Expect(communityPoolAfter).To(Equal(communityPoolBefore.Add(communityCoinsDec)))
// 					s.Commit()
// 				})
// 			})
// 		})

// 		Describe("Updating registered revenue", func() {
// 			Context("with a withdraw address that is different from the deployer address", Ordered, func() {
// 				var withdrawerAddress sdk.AccAddress
// 				var contractAddress common.Address
// 				var nonce uint64

// 				BeforeAll(func() {
// 					var err error
// 					nonce = getNonce(deployerAddress.Bytes())
// 					withdrawerAddress = sdk.AccAddress(utiltx.GenerateAddress().Bytes())
// 					contractAddress, err = testutil.DeployContract(
// 						s.ctx,
// 						s.app,
// 						deployerKey,
// 						s.queryClientEvm,
// 						evmtypes.CompiledContract{
// 							Bin: common.Hex2Bytes(contractCode),
// 						},
// 					)
// 					s.Require().NoError(err)
// 					s.Commit()
// 					res := registerFee(deployerKey, &contractAddress, nil, []uint64{nonce})
// 					Expect(res.IsOK()).To(Equal(true), "contract registration failed: "+res.GetLog())

// 					fee, isRegistered := s.app.RevenueKeeper.GetRevenue(s.ctx, contractAddress)
// 					Expect(isRegistered).To(Equal(true))
// 					Expect(fee.ContractAddress).To(Equal(contractAddress.Hex()))
// 					Expect(fee.DeployerAddress).To(Equal(deployerAddress.String()))
// 					Expect(fee.WithdrawerAddress).To(Equal(""))
// 				})

// 				It("should update revenue successfully", func() {
// 					msg := types.NewMsgUpdateRevenue(
// 						contractAddress,
// 						deployerAddress,
// 						withdrawerAddress,
// 					)

// 					res, err := testutil.DeliverTx(s.ctx, s.app, deployerKey, nil, msg)
// 					Expect(err).To(BeNil())
// 					Expect(res.IsOK()).To(
// 						Equal(true),
// 						"withdraw update failed: "+res.GetLog(),
// 					)
// 					s.Commit()

// 					fee, isRegistered := s.app.RevenueKeeper.GetRevenue(s.ctx, contractAddress)
// 					Expect(isRegistered).To(Equal(true))
// 					Expect(fee.ContractAddress).To(Equal(contractAddress.Hex()))
// 					Expect(fee.DeployerAddress).To(Equal(deployerAddress.String()))
// 					Expect(fee.WithdrawerAddress).To(Equal(withdrawerAddress.String()))
// 					s.Commit()
// 				})

// 				It("should send tx fees to the new withdraw address", func() {
// 					preBalanceD := s.app.BankKeeper.GetBalance(s.ctx, deployerAddress, denom)
// 					preBalanceW := s.app.BankKeeper.GetBalance(s.ctx, withdrawerAddress, denom)
// 					gasPrice := big.NewInt(2000000000)
// 					data := make([]byte, 0)
// 					res := contractInteract(userKey, &contractAddress, gasPrice, nil, nil, data, nil)
// 					s.Commit()

// 					developerCoins, _ := calculateFees(denom, params, res, gasPrice)
// 					balanceD := s.app.BankKeeper.GetBalance(s.ctx, deployerAddress, denom)
// 					balanceW := s.app.BankKeeper.GetBalance(s.ctx, withdrawerAddress, denom)
// 					Expect(balanceW).To(Equal(preBalanceW.Add(developerCoins)))
// 					Expect(balanceD).To(Equal(preBalanceD))
// 				})
// 			})

// 			Context("with a withdraw address equal to the deployer's address", func() {
// 				var contractAddress common.Address
// 				var nonce uint64

// 				BeforeAll(func() {
// 					var err error
// 					nonce = getNonce(deployerAddress.Bytes())
// 					contractAddress, err = testutil.DeployContract(
// 						s.ctx,
// 						s.app,
// 						deployerKey,
// 						s.queryClientEvm,
// 						evmtypes.CompiledContract{
// 							Bin: common.Hex2Bytes(contractCode),
// 						},
// 					)
// 					s.Require().NoError(err)
// 					s.Commit()
// 					res := registerFee(deployerKey, &contractAddress, nil, []uint64{nonce})
// 					Expect(res.IsOK()).To(Equal(true), "contract registration failed: "+res.GetLog())

// 					fee, isRegistered := s.app.RevenueKeeper.GetRevenue(s.ctx, contractAddress)
// 					Expect(isRegistered).To(Equal(true))
// 					Expect(fee.ContractAddress).To(Equal(contractAddress.Hex()))
// 					Expect(fee.DeployerAddress).To(Equal(deployerAddress.String()))
// 					Expect(fee.WithdrawerAddress).To(Equal(""))
// 				})

// 				It("should not update revenue", func() {
// 					msg := types.NewMsgUpdateRevenue(
// 						contractAddress,
// 						deployerAddress,
// 						deployerAddress,
// 					)

// 					res, err := testutil.DeliverTx(s.ctx, s.app, deployerKey, nil, msg)
// 					Expect(err).NotTo(
// 						BeNil(),
// 						"withdraw update failed: "+res.GetLog(),
// 					)
// 					Expect(
// 						strings.Contains(err.Error(),
// 							"revenue already exists for given contract"),
// 					).To(BeTrue(), err.Error())
// 					s.Commit()
// 				})
// 			})

// 			Context("for a contract that was not registered", func() {
// 				It("should fail", func() {
// 					contractAddress := utiltx.GenerateAddress()
// 					withdrawerAddress := sdk.AccAddress(utiltx.GenerateAddress().Bytes())
// 					msg := types.NewMsgUpdateRevenue(
// 						contractAddress,
// 						deployerAddress,
// 						withdrawerAddress,
// 					)

// 					res, err := testutil.DeliverTx(s.ctx, s.app, deployerKey, nil, msg)
// 					Expect(err).ToNot(
// 						BeNil(),
// 						"withdraw update failed: "+res.GetLog(),
// 					)
// 					Expect(
// 						strings.Contains(err.Error(),
// 							"is not registered"),
// 					).To(BeTrue(), err.Error())
// 					s.Commit()
// 				})
// 			})
// 		})

// 		Describe("Canceling a revenue registration", func() {
// 			When("the registered revenue exists", Ordered, func() {
// 				var contractAddress common.Address
// 				var nonce uint64

// 				BeforeAll(func() {
// 					var err error
// 					nonce = getNonce(deployerAddress.Bytes())
// 					contractAddress, err = testutil.DeployContract(
// 						s.ctx,
// 						s.app,
// 						deployerKey,
// 						s.queryClientEvm,
// 						evmtypes.CompiledContract{
// 							Bin: common.Hex2Bytes(contractCode),
// 						},
// 					)
// 					s.Require().NoError(err)
// 					s.Commit()
// 					registerFee(deployerKey, &contractAddress, nil, []uint64{nonce})
// 					fee, isRegistered := s.app.RevenueKeeper.GetRevenue(s.ctx, contractAddress)

// 					Expect(isRegistered).To(Equal(true))
// 					Expect(fee.ContractAddress).To(Equal(contractAddress.Hex()))
// 					Expect(fee.DeployerAddress).To(Equal(deployerAddress.String()))
// 					Expect(fee.WithdrawerAddress).To(Equal(""))
// 				})

// 				It("should be possible", func() {
// 					msg := types.NewMsgCancelRevenue(contractAddress, deployerAddress)
// 					res, err := testutil.DeliverTx(s.ctx, s.app, deployerKey, nil, msg)
// 					Expect(err).To(BeNil())
// 					Expect(res.IsOK()).To(Equal(true), "withdraw update failed: "+res.GetLog())
// 					s.Commit()

// 					fee, isRegistered := s.app.RevenueKeeper.GetRevenue(s.ctx, contractAddress)
// 					Expect(isRegistered).To(Equal(false))
// 					Expect(fee.ContractAddress).To(Equal(""))
// 					Expect(fee.DeployerAddress).To(Equal(""))
// 					Expect(fee.WithdrawerAddress).To(Equal(""))
// 					s.Commit()
// 				})

// 				It("should no longer distribute fees to the contract deployer", func() {
// 					preBalanceD := s.app.BankKeeper.GetBalance(s.ctx, deployerAddress, denom)
// 					gasPrice := big.NewInt(2000000000)
// 					data := make([]byte, 0)
// 					contractInteract(userKey, &contractAddress, gasPrice, nil, nil, data, nil)
// 					s.Commit()

// 					balanceD := s.app.BankKeeper.GetBalance(s.ctx, deployerAddress, denom)
// 					Expect(balanceD).To(Equal(preBalanceD))
// 				})
// 			})

// 			When("the revenue does not exist", func() {
// 				It("should not be possible", func() {
// 					contractAddress := utiltx.GenerateAddress()
// 					msg := types.NewMsgCancelRevenue(contractAddress, deployerAddress)
// 					res, err := testutil.DeliverTx(s.ctx, s.app, deployerKey, nil, msg)
// 					Expect(err).ToNot(
// 						BeNil(),
// 						"canceling failed: "+res.GetLog(),
// 					)
// 					Expect(
// 						strings.Contains(err.Error(),
// 							"is not registered"),
// 					).To(BeTrue(), err.Error())
// 					s.Commit()
// 				})
// 			})
// 		})

// 		Describe("Registering contracts created by a factory contract with CREATE opcode", func() {
// 			Context("with one factory", Ordered, func() {
// 				var contractNonce uint64
// 				var contractAddress common.Address

// 				BeforeAll(func() {
// 					var err error
// 					contractNonce = getNonce(factoryAddress.Bytes())
// 					contractAddress, _, err = testutil.DeployContractWithFactory(
// 						s.ctx,
// 						s.app,
// 						deployerKey,
// 						factoryAddress,
// 					)
// 					Expect(err).To(BeNil())
// 					s.Commit()
// 				})

// 				It("should be possible", func() {
// 					msg := types.NewMsgRegisterRevenue(
// 						contractAddress,
// 						deployerAddress,
// 						nil,
// 						[]uint64{factoryNonce, contractNonce},
// 					)
// 					res, err := testutil.DeliverTx(s.ctx, s.app, deployerKey, nil, msg)
// 					Expect(err).To(BeNil())
// 					Expect(res.IsOK()).To(Equal(true), "contract registration failed: "+res.GetLog())
// 					s.Commit()

// 					fee, isRegistered := s.app.RevenueKeeper.GetRevenue(s.ctx, contractAddress)
// 					Expect(isRegistered).To(Equal(true))
// 					Expect(fee.ContractAddress).To(Equal(contractAddress.Hex()))
// 					Expect(fee.DeployerAddress).To(Equal(deployerAddress.String()))
// 					Expect(fee.WithdrawerAddress).To(Equal(""))
// 				})

// 				It("should transfer legacy tx fees evenly to validator and deployer", func() {
// 					preBalance := s.app.BankKeeper.GetBalance(s.ctx, deployerAddress, denom)

// 					// User interaction with registered contract
// 					gasPrice := big.NewInt(2000000000)
// 					data := make([]byte, 0)
// 					res := contractInteract(userKey, &contractAddress, gasPrice, nil, nil, data, nil)

// 					developerCoins, _ := calculateFees(denom, params, res, gasPrice)
// 					balance := s.app.BankKeeper.GetBalance(s.ctx, deployerAddress, denom)
// 					Expect(balance).To(Equal(preBalance.Add(developerCoins)))
// 					s.Commit()
// 				})

// 				It("should transfer dynamic tx fees evenly to validator and deployer", func() {
// 					preBalance := s.app.BankKeeper.GetBalance(s.ctx, deployerAddress, denom)

// 					// User interaction with registered contract
// 					gasTipCap := big.NewInt(10000)
// 					gasFeeCap := new(big.Int).Add(s.app.FeeMarketKeeper.GetBaseFee(s.ctx), gasTipCap)
// 					data := make([]byte, 0)
// 					res := contractInteract(
// 						userKey,
// 						&contractAddress,
// 						nil,
// 						gasFeeCap,
// 						gasTipCap,
// 						data,
// 						&ethtypes.AccessList{},
// 					)

// 					developerCoins, _ := calculateFees(denom, params, res, gasFeeCap)
// 					balance := s.app.BankKeeper.GetBalance(s.ctx, deployerAddress, denom)
// 					Expect(balance).To(Equal(preBalance.Add(developerCoins)))
// 					s.Commit()
// 				})
// 			})

// 			Context("With factory-created factory contract", func() {
// 				var (
// 					gasUsedOneDerivation int64
// 					factory1Nonce        uint64
// 					factory2Nonce        uint64
// 					contractNonce        uint64
// 					factory1Address      common.Address
// 					factory2Address      common.Address
// 					contractAddress      common.Address
// 				)
// 				deployerAddress1, deployerKey1 := utiltx.NewAccAddressAndKey()
// 				deployerAddress2, deployerKey2 := utiltx.NewAccAddressAndKey()

// 				BeforeEach(func() {
// 					err := testutil.FundAccount(s.ctx, s.app.BankKeeper, deployerAddress1, initBalance)
// 					s.Require().NoError(err)
// 					err = testutil.FundAccount(s.ctx, s.app.BankKeeper, deployerAddress2, initBalance)
// 					s.Require().NoError(err)

// 					// Create contract: deployerKey1 -> factory1 -> factory2 -> contract
// 					// Create factory1
// 					factory1Nonce = getNonce(deployerAddress1.Bytes())
// 					factory1Address, err = testutil.DeployContract(
// 						s.ctx,
// 						s.app,
// 						deployerKey1,
// 						s.queryClientEvm,
// 						evmtypes.CompiledContract{
// 							Bin: common.Hex2Bytes(doubleFactoryCode),
// 						},
// 					)
// 					s.Require().NoError(err)
// 					s.Commit()

// 					// Create factory2
// 					factory2Nonce = getNonce(factory1Address.Bytes())
// 					factory2Address, _, err = testutil.DeployContractWithFactory(
// 						s.ctx,
// 						s.app,
// 						deployerKey1,
// 						factory1Address,
// 					)
// 					Expect(err).To(BeNil())
// 					s.Commit()

// 					// Create contract
// 					contractNonce = getNonce(factory2Address.Bytes())
// 					contractAddress, _, err = testutil.DeployContractWithFactory(
// 						s.ctx,
// 						s.app,
// 						deployerKey1,
// 						factory2Address,
// 					)
// 					Expect(err).To(BeNil())
// 					s.Commit()
// 				})

// 				DescribeTable("should consume gas for three address derivation iterations",
// 					func(gasCost int) {
// 						params = s.app.RevenueKeeper.GetParams(s.ctx)
// 						params.AddrDerivationCostCreate = uint64(gasCost)
// 						s.app.RevenueKeeper.SetParams(s.ctx, params) //nolint:errcheck

// 						// Cost for registration with one address derivation
// 						// We use another deployer, to have the same storage cost for
// 						// SetDeployerFees
// 						factory1Nonce2 := getNonce(deployerAddress2.Bytes())
// 						factory1Address2, err := testutil.DeployContract(
// 							s.ctx,
// 							s.app,
// 							deployerKey2,
// 							s.queryClientEvm,
// 							evmtypes.CompiledContract{
// 								Bin: common.Hex2Bytes(doubleFactoryCode),
// 							},
// 						)
// 						s.Require().NoError(err)
// 						s.Commit()
// 						res := registerFee(
// 							deployerKey2,
// 							&factory1Address2,
// 							nil,
// 							[]uint64{factory1Nonce2},
// 						)
// 						gasUsedOneDerivation = res.GetGasUsed()
// 						Expect(res.IsOK()).To(Equal(true), "contract registration failed: "+res.GetLog())

// 						s.Commit()

// 						// Registering contract for receiving fees
// 						// Use a new deployer, to pay the same storage costs for SetDeployerFees
// 						res = registerFee(
// 							deployerKey1,
// 							&contractAddress,
// 							nil,
// 							[]uint64{factory1Nonce, factory2Nonce, contractNonce},
// 						)
// 						Expect(res.IsOK()).To(Equal(true), "contract registration failed: "+res.GetLog())
// 						s.Commit()

// 						fee, isRegistered := s.app.RevenueKeeper.GetRevenue(s.ctx, contractAddress)
// 						Expect(isRegistered).To(Equal(true))
// 						Expect(fee.ContractAddress).To(Equal(contractAddress.Hex()))
// 						Expect(fee.DeployerAddress).To(Equal(deployerAddress1.String()))
// 						Expect(fee.WithdrawerAddress).To(Equal(""))

// 						// Check addressDerivationCostCreate is subtracted 3 times
// 						setFeeInverseCost := int64(20)
// 						Expect(res.GetGasUsed()).To(Equal(
// 							gasUsedOneDerivation + int64(gasCost)*2 + setFeeInverseCost,
// 						))
// 					},
// 					Entry("with address derivation cost of 50", 50),
// 					Entry("with address derivation cost of 500", 500),
// 				)
// 			})
// 		})
// 	})
// })
