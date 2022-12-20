package ante_test

import (
	"math"
	"math/big"
	"testing"
	"time"

	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/x/auth/legacy/legacytx"
	types2 "github.com/cosmos/cosmos-sdk/x/bank/types"
	types3 "github.com/cosmos/cosmos-sdk/x/staking/types"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/evmos/ethermint/ethereum/eip712"
	"github.com/evmos/ethermint/types"

	"github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"

	"github.com/stretchr/testify/suite"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/tx"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	cryptotypes "github.com/cosmos/cosmos-sdk/crypto/types"
	"github.com/cosmos/cosmos-sdk/simapp"
	"github.com/cosmos/cosmos-sdk/testutil/testdata"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/tx/signing"
	authsigning "github.com/cosmos/cosmos-sdk/x/auth/signing"
	authtx "github.com/cosmos/cosmos-sdk/x/auth/tx"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"

	"github.com/evmos/ethermint/app"
	ante "github.com/evmos/ethermint/app/ante"
	"github.com/evmos/ethermint/encoding"
	"github.com/evmos/ethermint/tests"
	"github.com/evmos/ethermint/x/evm/statedb"
	evmtypes "github.com/evmos/ethermint/x/evm/types"
	feemarkettypes "github.com/evmos/ethermint/x/feemarket/types"

	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
)

type AnteTestSuite struct {
	suite.Suite

	ctx             sdk.Context
	app             *app.EthermintApp
	clientCtx       client.Context
	anteHandler     sdk.AnteHandler
	ethSigner       ethtypes.Signer
	enableFeemarket bool
	enableLondonHF  bool
	evmParamsOption func(*evmtypes.Params)
}

const TestGasLimit uint64 = 100000

func (suite *AnteTestSuite) StateDB() *statedb.StateDB {
	return statedb.New(suite.ctx, suite.app.EvmKeeper, statedb.NewEmptyTxConfig(common.BytesToHash(suite.ctx.HeaderHash().Bytes())))
}

func (suite *AnteTestSuite) SetupTest() {
	checkTx := false

	suite.app = app.Setup(checkTx, func(app *app.EthermintApp, genesis simapp.GenesisState) simapp.GenesisState {
		if suite.enableFeemarket {
			// setup feemarketGenesis params
			feemarketGenesis := feemarkettypes.DefaultGenesisState()
			feemarketGenesis.Params.EnableHeight = 1
			feemarketGenesis.Params.NoBaseFee = false
			// Verify feeMarket genesis
			err := feemarketGenesis.Validate()
			suite.Require().NoError(err)
			genesis[feemarkettypes.ModuleName] = app.AppCodec().MustMarshalJSON(feemarketGenesis)
		}
		evmGenesis := evmtypes.DefaultGenesisState()
		evmGenesis.Params.AllowUnprotectedTxs = false
		if !suite.enableLondonHF {
			maxInt := sdk.NewInt(math.MaxInt64)
			evmGenesis.Params.ChainConfig.LondonBlock = &maxInt
			evmGenesis.Params.ChainConfig.ArrowGlacierBlock = &maxInt
			evmGenesis.Params.ChainConfig.GrayGlacierBlock = &maxInt
			evmGenesis.Params.ChainConfig.MergeNetsplitBlock = &maxInt
		}
		if suite.evmParamsOption != nil {
			suite.evmParamsOption(&evmGenesis.Params)
		}
		genesis[evmtypes.ModuleName] = app.AppCodec().MustMarshalJSON(evmGenesis)
		return genesis
	})

	suite.ctx = suite.app.BaseApp.NewContext(checkTx, tmproto.Header{Height: 2, ChainID: "ethermint_9000-1", Time: time.Now().UTC()})
	suite.ctx = suite.ctx.WithMinGasPrices(sdk.NewDecCoins(sdk.NewDecCoin(evmtypes.DefaultEVMDenom, sdk.OneInt())))
	suite.ctx = suite.ctx.WithBlockGasMeter(sdk.NewGasMeter(1000000000000000000))
	suite.app.EvmKeeper.WithChainID(suite.ctx)

	infCtx := suite.ctx.WithGasMeter(sdk.NewInfiniteGasMeter())
	suite.app.AccountKeeper.SetParams(infCtx, authtypes.DefaultParams())

	encodingConfig := encoding.MakeConfig(app.ModuleBasics)
	// We're using TestMsg amino encoding in some tests, so register it here.
	encodingConfig.Amino.RegisterConcrete(&testdata.TestMsg{}, "testdata.TestMsg", nil)

	suite.clientCtx = client.Context{}.WithTxConfig(encodingConfig.TxConfig)

	anteHandler, err := ante.NewAnteHandler(ante.HandlerOptions{
		AccountKeeper:   suite.app.AccountKeeper,
		BankKeeper:      suite.app.BankKeeper,
		EvmKeeper:       suite.app.EvmKeeper,
		FeegrantKeeper:  suite.app.FeeGrantKeeper,
		IBCKeeper:       suite.app.IBCKeeper,
		FeeMarketKeeper: suite.app.FeeMarketKeeper,
		SignModeHandler: encodingConfig.TxConfig.SignModeHandler(),
		SigGasConsumer:  ante.DefaultSigVerificationGasConsumer,
	})
	suite.Require().NoError(err)

	suite.anteHandler = anteHandler
	suite.ethSigner = ethtypes.LatestSignerForChainID(suite.app.EvmKeeper.ChainID())
}

func TestAnteTestSuite(t *testing.T) {
	suite.Run(t, &AnteTestSuite{
		enableLondonHF: true,
	})
}

func (s *AnteTestSuite) BuildTestEthTx(
	from common.Address,
	to common.Address,
	amount *big.Int,
	input []byte,
	gasPrice *big.Int,
	gasFeeCap *big.Int,
	gasTipCap *big.Int,
	accesses *ethtypes.AccessList,
) *evmtypes.MsgEthereumTx {
	chainID := s.app.EvmKeeper.ChainID()
	nonce := s.app.EvmKeeper.GetNonce(
		s.ctx,
		common.BytesToAddress(from.Bytes()),
	)

	msgEthereumTx := evmtypes.NewTx(
		chainID,
		nonce,
		&to,
		amount,
		TestGasLimit,
		gasPrice,
		gasFeeCap,
		gasTipCap,
		input,
		accesses,
	)
	msgEthereumTx.From = from.String()
	return msgEthereumTx
}

// CreateTestTx is a helper function to create a tx given multiple inputs.
func (suite *AnteTestSuite) CreateTestTx(
	msg *evmtypes.MsgEthereumTx, priv cryptotypes.PrivKey, accNum uint64, signCosmosTx bool,
	unsetExtensionOptions ...bool,
) authsigning.Tx {
	return suite.CreateTestTxBuilder(msg, priv, accNum, signCosmosTx).GetTx()
}

// CreateTestTxBuilder is a helper function to create a tx builder given multiple inputs.
func (suite *AnteTestSuite) CreateTestTxBuilder(
	msg *evmtypes.MsgEthereumTx, priv cryptotypes.PrivKey, accNum uint64, signCosmosTx bool,
	unsetExtensionOptions ...bool,
) client.TxBuilder {
	var option *codectypes.Any
	var err error
	if len(unsetExtensionOptions) == 0 {
		option, err = codectypes.NewAnyWithValue(&evmtypes.ExtensionOptionsEthereumTx{})
		suite.Require().NoError(err)
	}

	txBuilder := suite.clientCtx.TxConfig.NewTxBuilder()
	builder, ok := txBuilder.(authtx.ExtensionOptionsTxBuilder)
	suite.Require().True(ok)

	if len(unsetExtensionOptions) == 0 {
		builder.SetExtensionOptions(option)
	}

	err = msg.Sign(suite.ethSigner, tests.NewSigner(priv))
	suite.Require().NoError(err)

	msg.From = ""
	err = builder.SetMsgs(msg)
	suite.Require().NoError(err)

	txData, err := evmtypes.UnpackTxData(msg.Data)
	suite.Require().NoError(err)

	fees := sdk.NewCoins(sdk.NewCoin(evmtypes.DefaultEVMDenom, sdk.NewIntFromBigInt(txData.Fee())))
	builder.SetFeeAmount(fees)
	builder.SetGasLimit(msg.GetGas())

	if signCosmosTx {
		// First round: we gather all the signer infos. We use the "set empty
		// signature" hack to do that.
		sigV2 := signing.SignatureV2{
			PubKey: priv.PubKey(),
			Data: &signing.SingleSignatureData{
				SignMode:  suite.clientCtx.TxConfig.SignModeHandler().DefaultMode(),
				Signature: nil,
			},
			Sequence: txData.GetNonce(),
		}

		sigsV2 := []signing.SignatureV2{sigV2}

		err = txBuilder.SetSignatures(sigsV2...)
		suite.Require().NoError(err)

		// Second round: all signer infos are set, so each signer can sign.

		signerData := authsigning.SignerData{
			ChainID:       suite.ctx.ChainID(),
			AccountNumber: accNum,
			Sequence:      txData.GetNonce(),
		}
		sigV2, err = tx.SignWithPrivKey(
			suite.clientCtx.TxConfig.SignModeHandler().DefaultMode(), signerData,
			txBuilder, priv, suite.clientCtx.TxConfig, txData.GetNonce(),
		)
		suite.Require().NoError(err)

		sigsV2 = []signing.SignatureV2{sigV2}

		err = txBuilder.SetSignatures(sigsV2...)
		suite.Require().NoError(err)
	}

	return txBuilder
}

func (suite *AnteTestSuite) CreateTestCosmosTxBuilder(gasPrice sdk.Int, denom string, msgs ...sdk.Msg) client.TxBuilder {
	txBuilder := suite.clientCtx.TxConfig.NewTxBuilder()

	txBuilder.SetGasLimit(TestGasLimit)
	fees := &sdk.Coins{{Denom: denom, Amount: gasPrice.MulRaw(int64(TestGasLimit))}}
	txBuilder.SetFeeAmount(*fees)
	err := txBuilder.SetMsgs(msgs...)
	suite.Require().NoError(err)
	return txBuilder
}

func (suite *AnteTestSuite) CreateTestEIP712TxBuilderMsgSend(from sdk.AccAddress, priv cryptotypes.PrivKey, chainId string, gas uint64, gasAmount sdk.Coins) client.TxBuilder {
	// Build MsgSend
	recipient := sdk.AccAddress(common.Address{}.Bytes())
	msgSend := types2.NewMsgSend(from, recipient, sdk.NewCoins(sdk.NewCoin(evmtypes.DefaultEVMDenom, sdk.NewInt(1))))
	return suite.CreateTestEIP712CosmosTxBuilder(from, priv, chainId, gas, gasAmount, msgSend)
}

func (suite *AnteTestSuite) CreateTestEIP712TxBuilderMsgDelegate(from sdk.AccAddress, priv cryptotypes.PrivKey, chainId string, gas uint64, gasAmount sdk.Coins) client.TxBuilder {
	// Build MsgSend
	valEthAddr := tests.GenerateAddress()
	valAddr := sdk.ValAddress(valEthAddr.Bytes())
	msgSend := types3.NewMsgDelegate(from, valAddr, sdk.NewCoin(evmtypes.DefaultEVMDenom, sdk.NewInt(20)))
	return suite.CreateTestEIP712CosmosTxBuilder(from, priv, chainId, gas, gasAmount, msgSend)
}

func (suite *AnteTestSuite) CreateTestEIP712CosmosTxBuilder(
	from sdk.AccAddress, priv cryptotypes.PrivKey, chainId string, gas uint64, gasAmount sdk.Coins, msg sdk.Msg,
) client.TxBuilder {
	var err error

	nonce, err := suite.app.AccountKeeper.GetSequence(suite.ctx, from)
	suite.Require().NoError(err)

	pc, err := types.ParseChainID(chainId)
	suite.Require().NoError(err)
	ethChainId := pc.Uint64()

	// GenerateTypedData TypedData
	var ethermintCodec codec.ProtoCodecMarshaler
	fee := legacytx.NewStdFee(gas, gasAmount)
	accNumber := suite.app.AccountKeeper.GetAccount(suite.ctx, from).GetAccountNumber()

	data := legacytx.StdSignBytes(chainId, accNumber, nonce, 0, fee, []sdk.Msg{msg}, "")
	typedData, err := eip712.WrapTxToTypedData(ethermintCodec, ethChainId, msg, data, &eip712.FeeDelegationOptions{
		FeePayer: from,
	})
	suite.Require().NoError(err)

	sigHash, err := eip712.ComputeTypedDataHash(typedData)
	suite.Require().NoError(err)

	// Sign typedData
	keyringSigner := tests.NewSigner(priv)
	signature, pubKey, err := keyringSigner.SignByAddress(from, sigHash)
	suite.Require().NoError(err)
	signature[crypto.RecoveryIDOffset] += 27 // Transform V from 0/1 to 27/28 according to the yellow paper

	// Add ExtensionOptionsWeb3Tx extension
	var option *codectypes.Any
	option, err = codectypes.NewAnyWithValue(&types.ExtensionOptionsWeb3Tx{
		FeePayer:         from.String(),
		TypedDataChainID: ethChainId,
		FeePayerSig:      signature,
	})
	suite.Require().NoError(err)

	suite.clientCtx.TxConfig.SignModeHandler()
	txBuilder := suite.clientCtx.TxConfig.NewTxBuilder()
	builder, ok := txBuilder.(authtx.ExtensionOptionsTxBuilder)
	suite.Require().True(ok)

	builder.SetExtensionOptions(option)
	builder.SetFeeAmount(gasAmount)
	builder.SetGasLimit(gas)

	sigsV2 := signing.SignatureV2{
		PubKey: pubKey,
		Data: &signing.SingleSignatureData{
			SignMode: signing.SignMode_SIGN_MODE_LEGACY_AMINO_JSON,
		},
		Sequence: nonce,
	}

	err = builder.SetSignatures(sigsV2)
	suite.Require().NoError(err)

	err = builder.SetMsgs(msg)
	suite.Require().NoError(err)

	return builder
}

func NextFn(ctx sdk.Context, _ sdk.Tx, _ bool) (sdk.Context, error) {
	return ctx, nil
}

var _ sdk.Tx = &invalidTx{}

type invalidTx struct{}

func (invalidTx) GetMsgs() []sdk.Msg   { return []sdk.Msg{nil} }
func (invalidTx) ValidateBasic() error { return nil }
