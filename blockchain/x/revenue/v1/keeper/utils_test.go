package keeper_test

// import (
// 	"math/big"
// 	"time"

// 	. "github.com/onsi/gomega"

// 	abci "github.com/cometbft/cometbft/abci/types"
// 	"github.com/cosmos/cosmos-sdk/baseapp"
// 	sdk "github.com/cosmos/cosmos-sdk/types"
// 	stakingkeeper "github.com/cosmos/cosmos-sdk/x/staking/keeper"
// 	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
// 	"github.com/ethereum/go-ethereum/common"
// 	ethtypes "github.com/ethereum/go-ethereum/core/types"
// 	"github.com/qredo/fusionchain/crypto/ethsecp256k1"
// 	"github.com/qredo/fusionchain/testutil"
// 	utiltx "github.com/qredo/fusionchain/testutil/tx"
// 	"github.com/qredo/fusionchain/utils"
// 	evmtypes "github.com/evmos/ethermint/x/evm/types"
// 	"github.com/qredo/fusionchain/x/revenue/v1/types"
// 	"github.com/stretchr/testify/require"
// )

// func (suite *KeeperTestSuite) SetupApp(chainID string) {
// 	t := suite.T()
// 	// account key
// 	priv, err := ethsecp256k1.GenerateKey()
// 	require.NoError(t, err)
// 	suite.address = common.BytesToAddress(priv.PubKey().Address().Bytes())
// 	suite.signer = utiltx.NewSigner(priv)

// 	suite.denom = utils.BaseDenom

// 	// consensus key
// 	privCons, err := ethsecp256k1.GenerateKey()
// 	require.NoError(t, err)
// 	suite.consAddress = sdk.ConsAddress(privCons.PubKey().Address())
// 	header := testutil.NewHeader(
// 		1, time.Now().UTC(), chainID, suite.consAddress, nil, nil,
// 	)
// 	suite.ctx = suite.app.BaseApp.NewContext(false, header)
// 	queryHelper := baseapp.NewQueryServerTestHelper(suite.ctx, suite.app.InterfaceRegistry())
// 	types.RegisterQueryServer(queryHelper, suite.app.RevenueKeeper)
// 	suite.queryClient = types.NewQueryClient(queryHelper)

// 	queryHelperEvm := baseapp.NewQueryServerTestHelper(suite.ctx, suite.app.InterfaceRegistry())
// 	evmtypes.RegisterQueryServer(queryHelperEvm, suite.app.EvmKeeper)
// 	suite.queryClientEvm = evmtypes.NewQueryClient(queryHelperEvm)

// 	params := types.DefaultParams()
// 	params.EnableRevenue = true
// 	err = suite.app.RevenueKeeper.SetParams(suite.ctx, params)
// 	require.NoError(t, err)

// 	stakingParams := suite.app.StakingKeeper.GetParams(suite.ctx)
// 	stakingParams.BondDenom = suite.denom
// 	err = suite.app.StakingKeeper.SetParams(suite.ctx, stakingParams)
// 	require.NoError(t, err)

// 	evmParams := suite.app.EvmKeeper.GetParams(suite.ctx)
// 	evmParams.EvmDenom = suite.denom
// 	err = suite.app.EvmKeeper.SetParams(suite.ctx, evmParams)
// 	require.NoError(t, err)

// 	inflationParams := suite.app.InflationKeeper.GetParams(suite.ctx)
// 	inflationParams.EnableInflation = false
// 	err = suite.app.InflationKeeper.SetParams(suite.ctx, inflationParams)
// 	require.NoError(t, err)

// 	// Set Validator
// 	valAddr := sdk.ValAddress(suite.address.Bytes())
// 	validator, err := stakingtypes.NewValidator(valAddr, privCons.PubKey(), stakingtypes.Description{})
// 	require.NoError(t, err)
// 	validator = stakingkeeper.TestingUpdateValidator(&suite.app.StakingKeeper, suite.ctx, validator, true)
// 	err = suite.app.StakingKeeper.Hooks().AfterValidatorCreated(suite.ctx, validator.GetOperator())
// 	require.NoError(t, err)
// 	err = suite.app.StakingKeeper.SetValidatorByConsAddr(suite.ctx, validator)
// 	require.NoError(t, err)
// 	validators := s.app.StakingKeeper.GetBondedValidatorsByPower(s.ctx)
// 	suite.validator = validators[0]

// 	suite.ethSigner = ethtypes.LatestSignerForChainID(s.app.EvmKeeper.ChainID())
// }

// // Commit commits and starts a new block with an updated context.
// func (suite *KeeperTestSuite) Commit() {
// 	suite.CommitAfter(time.Second * 0)
// }

// // Commit commits a block at a given time.
// func (suite *KeeperTestSuite) CommitAfter(t time.Duration) {
// 	var err error
// 	suite.ctx, err = testutil.CommitAndCreateNewCtx(suite.ctx, suite.app, t, nil)
// 	suite.Require().NoError(err)
// 	queryHelper := baseapp.NewQueryServerTestHelper(suite.ctx, suite.app.InterfaceRegistry())

// 	types.RegisterQueryServer(queryHelper, suite.app.RevenueKeeper)
// 	suite.queryClient = types.NewQueryClient(queryHelper)

// 	queryHelperEvm := baseapp.NewQueryServerTestHelper(suite.ctx, suite.app.InterfaceRegistry())
// 	evmtypes.RegisterQueryServer(queryHelperEvm, suite.app.EvmKeeper)
// 	suite.queryClientEvm = evmtypes.NewQueryClient(queryHelperEvm)
// }

// func calculateFees(
// 	denom string,
// 	params types.Params,
// 	res abci.ResponseDeliverTx,
// 	gasPrice *big.Int,
// ) (sdk.Coin, sdk.Coin) {
// 	feeDistribution := sdk.NewInt(res.GasUsed).Mul(sdk.NewIntFromBigInt(gasPrice))
// 	developerFee := sdk.NewDecFromInt(feeDistribution).Mul(params.DeveloperShares)
// 	developerCoins := sdk.NewCoin(denom, developerFee.TruncateInt())
// 	validatorShares := sdk.OneDec().Sub(params.DeveloperShares)
// 	validatorFee := sdk.NewDecFromInt(feeDistribution).Mul(validatorShares)
// 	validatorCoins := sdk.NewCoin(denom, validatorFee.TruncateInt())
// 	return developerCoins, validatorCoins
// }

// func getNonce(addressBytes []byte) uint64 {
// 	return s.app.EvmKeeper.GetNonce(
// 		s.ctx,
// 		common.BytesToAddress(addressBytes),
// 	)
// }

// func registerFee(
// 	priv *ethsecp256k1.PrivKey,
// 	contractAddress *common.Address,
// 	withdrawerAddress sdk.AccAddress,
// 	nonces []uint64,
// ) abci.ResponseDeliverTx {
// 	deployerAddress := sdk.AccAddress(priv.PubKey().Address())
// 	msg := types.NewMsgRegisterRevenue(*contractAddress, deployerAddress, withdrawerAddress, nonces)

// 	res, err := testutil.DeliverTx(s.ctx, s.app, priv, nil, msg)
// 	s.Require().NoError(err)
// 	s.Commit()

// 	if res.IsOK() {
// 		registerEvent := res.GetEvents()[8]
// 		Expect(registerEvent.Type).To(Equal(types.EventTypeRegisterRevenue))
// 		Expect(registerEvent.Attributes[0].Key).To(Equal(sdk.AttributeKeySender))
// 		Expect(registerEvent.Attributes[1].Key).To(Equal(types.AttributeKeyContract))
// 		Expect(registerEvent.Attributes[2].Key).To(Equal(types.AttributeKeyWithdrawerAddress))
// 	}
// 	return res
// }

// func contractInteract(
// 	priv *ethsecp256k1.PrivKey,
// 	contractAddr *common.Address,
// 	gasPrice *big.Int,
// 	gasFeeCap *big.Int,
// 	gasTipCap *big.Int,
// 	data []byte,
// 	accesses *ethtypes.AccessList,
// ) abci.ResponseDeliverTx {
// 	msgEthereumTx := buildEthTx(priv, contractAddr, gasPrice, gasFeeCap, gasTipCap, data, accesses)
// 	res, err := testutil.DeliverEthTx(s.app, priv, msgEthereumTx)
// 	Expect(err).To(BeNil())
// 	Expect(res.IsOK()).To(Equal(true), res.GetLog())
// 	return res
// }

// func buildEthTx(
// 	priv *ethsecp256k1.PrivKey,
// 	to *common.Address,
// 	gasPrice *big.Int,
// 	gasFeeCap *big.Int,
// 	gasTipCap *big.Int,
// 	data []byte,
// 	accesses *ethtypes.AccessList,
// ) *evmtypes.MsgEthereumTx {
// 	chainID := s.app.EvmKeeper.ChainID()
// 	from := common.BytesToAddress(priv.PubKey().Address().Bytes())
// 	nonce := getNonce(from.Bytes())
// 	gasLimit := uint64(10000000)
// 	ethTxParams := evmtypes.EvmTxArgs{
// 		ChainID:   chainID,
// 		Nonce:     nonce,
// 		To:        to,
// 		GasPrice:  gasPrice,
// 		GasLimit:  gasLimit,
// 		GasTipCap: gasTipCap,
// 		GasFeeCap: gasFeeCap,
// 		Input:     data,
// 		Accesses:  accesses,
// 	}
// 	msgEthereumTx := evmtypes.NewTx(&ethTxParams)
// 	msgEthereumTx.From = from.String()
// 	return msgEthereumTx
// }
