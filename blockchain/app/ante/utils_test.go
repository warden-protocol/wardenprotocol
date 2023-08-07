package ante_test

import (
	"encoding/json"
	"fmt"
	"math"
	"math/big"
	"time"

	sdkmath "cosmossdk.io/math"
	"github.com/stretchr/testify/suite"

	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/x/auth/migrations/legacytx"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	"github.com/evmos/ethermint/ethereum/eip712"
	"github.com/evmos/ethermint/testutil"
	utiltx "github.com/evmos/ethermint/testutil/tx"

	"github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"

	"cosmossdk.io/simapp"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/tx"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	kmultisig "github.com/cosmos/cosmos-sdk/crypto/keys/multisig"
	cryptotypes "github.com/cosmos/cosmos-sdk/crypto/types"
	"github.com/cosmos/cosmos-sdk/crypto/types/multisig"
	"github.com/cosmos/cosmos-sdk/testutil/testdata"
	sdk "github.com/cosmos/cosmos-sdk/types"
	txtypes "github.com/cosmos/cosmos-sdk/types/tx"
	"github.com/cosmos/cosmos-sdk/types/tx/signing"
	sdkante "github.com/cosmos/cosmos-sdk/x/auth/ante"
	authsigning "github.com/cosmos/cosmos-sdk/x/auth/signing"
	authtx "github.com/cosmos/cosmos-sdk/x/auth/tx"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	authz "github.com/cosmos/cosmos-sdk/x/authz"
	"github.com/evmos/ethermint/crypto/ethsecp256k1"

	"github.com/cosmos/cosmos-sdk/crypto/keys/ed25519"
	vestingtypes "github.com/cosmos/cosmos-sdk/x/auth/vesting/types"
	evtypes "github.com/cosmos/cosmos-sdk/x/evidence/types"
	"github.com/cosmos/cosmos-sdk/x/feegrant"
	govtypesv1 "github.com/cosmos/cosmos-sdk/x/gov/types/v1"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types/v1beta1"
	"github.com/evmos/ethermint/app"
	ante "github.com/evmos/ethermint/app/ante"
	"github.com/evmos/ethermint/encoding"
	"github.com/evmos/ethermint/tests"
	"github.com/evmos/ethermint/x/evm/statedb"
	evmtypes "github.com/evmos/ethermint/x/evm/types"
	feemarkettypes "github.com/evmos/ethermint/x/feemarket/types"

	tmproto "github.com/cometbft/cometbft/proto/tendermint/types"
)

type AnteTestSuite struct {
	suite.Suite

	ctx                      sdk.Context
	app                      *app.EthermintApp
	clientCtx                client.Context
	anteHandler              sdk.AnteHandler
	priv                     cryptotypes.PrivKey
	ethSigner                ethtypes.Signer
	enableFeemarket          bool
	enableLondonHF           bool
	evmParamsOption          func(*evmtypes.Params)
	useLegacyEIP712Extension bool
	useLegacyEIP712TypedData bool
}

const TestGasLimit uint64 = 100000

func (suite *AnteTestSuite) StateDB() *statedb.StateDB {
	return statedb.New(suite.ctx, suite.app.EvmKeeper, statedb.NewEmptyTxConfig(common.BytesToHash(suite.ctx.HeaderHash().Bytes())))
}

func (suite *AnteTestSuite) SetupTest() {
	checkTx := false
	priv, err := ethsecp256k1.GenerateKey()
	suite.Require().NoError(err)
	suite.priv = priv

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
			maxInt := sdkmath.NewInt(math.MaxInt64)
			evmGenesis.Params.ChainConfig.LondonBlock = &maxInt
			evmGenesis.Params.ChainConfig.ArrowGlacierBlock = &maxInt
			evmGenesis.Params.ChainConfig.GrayGlacierBlock = &maxInt
			evmGenesis.Params.ChainConfig.MergeNetsplitBlock = &maxInt
			evmGenesis.Params.ChainConfig.ShanghaiBlock = &maxInt
			evmGenesis.Params.ChainConfig.CancunBlock = &maxInt
		}
		if suite.evmParamsOption != nil {
			suite.evmParamsOption(&evmGenesis.Params)
		}
		genesis[evmtypes.ModuleName] = app.AppCodec().MustMarshalJSON(evmGenesis)
		return genesis
	})

	suite.ctx = suite.app.BaseApp.NewContext(checkTx, tmproto.Header{Height: 2, ChainID: testutil.TestnetChainID + "-1", Time: time.Now().UTC()})
	suite.ctx = suite.ctx.WithMinGasPrices(sdk.NewDecCoins(sdk.NewDecCoin(evmtypes.DefaultEVMDenom, sdk.OneInt())))
	suite.ctx = suite.ctx.WithBlockGasMeter(sdk.NewGasMeter(1000000000000000000))
	suite.app.EvmKeeper.WithChainID(suite.ctx)

	infCtx := suite.ctx.WithGasMeter(sdk.NewInfiniteGasMeter())
	suite.app.AccountKeeper.SetParams(infCtx, authtypes.DefaultParams())

	addr := sdk.AccAddress(priv.PubKey().Address().Bytes())
	acc := suite.app.AccountKeeper.NewAccountWithAddress(suite.ctx, addr)
	suite.app.AccountKeeper.SetAccount(suite.ctx, acc)

	encodingConfig := encoding.MakeConfig(app.ModuleBasics)
	// We're using TestMsg amino encoding in some tests, so register it here.
	encodingConfig.Amino.RegisterConcrete(&testdata.TestMsg{}, "testdata.TestMsg", nil)
	eip712.SetEncodingConfig(encodingConfig)

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
		DisabledAuthzMsgs: []string{
			sdk.MsgTypeURL(&evmtypes.MsgEthereumTx{}),
			sdk.MsgTypeURL(&vestingtypes.MsgCreateVestingAccount{}),
		},
	})
	suite.Require().NoError(err)

	suite.anteHandler = anteHandler
	suite.ethSigner = ethtypes.LatestSignerForChainID(suite.app.EvmKeeper.ChainID())

	// fund signer acc to pay for tx fees
	amt := sdk.NewInt(int64(math.Pow10(18) * 2))
	err = testutil.FundAccount(
		suite.app.BankKeeper,
		suite.ctx,
		suite.priv.PubKey().Address().Bytes(),
		sdk.NewCoins(sdk.NewCoin(testutil.BaseDenom, amt)),
	)
	suite.Require().NoError(err)

	header := suite.ctx.BlockHeader()
	suite.ctx = suite.ctx.WithBlockHeight(header.Height - 1)
	suite.ctx, err = testutil.Commit(suite.ctx, suite.app, time.Second*0, nil)
	suite.Require().NoError(err)
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

	fees := sdk.NewCoins(sdk.NewCoin(evmtypes.DefaultEVMDenom, sdkmath.NewIntFromBigInt(txData.Fee())))
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

func (suite *AnteTestSuite) CreateTestCosmosTxBuilder(gasPrice sdkmath.Int, denom string, msgs ...sdk.Msg) client.TxBuilder {
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
	msgSend := banktypes.NewMsgSend(from, recipient, sdk.NewCoins(sdk.NewCoin(evmtypes.DefaultEVMDenom, sdkmath.NewInt(1))))
	return suite.CreateTestEIP712SingleMessageTxBuilder(priv, chainId, gas, gasAmount, msgSend)
}

func (suite *AnteTestSuite) CreateTestEIP712TxBuilderMsgDelegate(from sdk.AccAddress, priv cryptotypes.PrivKey, chainId string, gas uint64, gasAmount sdk.Coins) client.TxBuilder {
	// Build MsgSend
	valEthAddr := tests.GenerateAddress()
	valAddr := sdk.ValAddress(valEthAddr.Bytes())
	msgSend := stakingtypes.NewMsgDelegate(from, valAddr, sdk.NewCoin(evmtypes.DefaultEVMDenom, sdkmath.NewInt(20)))
	return suite.CreateTestEIP712SingleMessageTxBuilder(priv, chainId, gas, gasAmount, msgSend)
}

func (suite *AnteTestSuite) CreateTestEIP712MsgCreateValidator(from sdk.AccAddress, priv cryptotypes.PrivKey, chainId string, gas uint64, gasAmount sdk.Coins) client.TxBuilder {
	// Build MsgCreateValidator
	valAddr := sdk.ValAddress(from.Bytes())
	privEd := ed25519.GenPrivKey()
	msgCreate, err := stakingtypes.NewMsgCreateValidator(
		valAddr,
		privEd.PubKey(),
		sdk.NewCoin(evmtypes.DefaultEVMDenom, sdk.NewInt(20)),
		stakingtypes.NewDescription("moniker", "indentity", "website", "security_contract", "details"),
		stakingtypes.NewCommissionRates(sdk.OneDec(), sdk.OneDec(), sdk.OneDec()),
		sdk.OneInt(),
	)
	suite.Require().NoError(err)
	return suite.CreateTestEIP712SingleMessageTxBuilder(priv, chainId, gas, gasAmount, msgCreate)
}

func (suite *AnteTestSuite) CreateTestEIP712MsgCreateValidator2(from sdk.AccAddress, priv cryptotypes.PrivKey, chainId string, gas uint64, gasAmount sdk.Coins) client.TxBuilder {
	// Build MsgCreateValidator
	valAddr := sdk.ValAddress(from.Bytes())
	privEd := ed25519.GenPrivKey()
	msgCreate, err := stakingtypes.NewMsgCreateValidator(
		valAddr,
		privEd.PubKey(),
		sdk.NewCoin(evmtypes.DefaultEVMDenom, sdk.NewInt(20)),
		// Ensure optional fields can be left blank
		stakingtypes.NewDescription("moniker", "indentity", "", "", ""),
		stakingtypes.NewCommissionRates(sdk.OneDec(), sdk.OneDec(), sdk.OneDec()),
		sdk.OneInt(),
	)
	suite.Require().NoError(err)
	return suite.CreateTestEIP712SingleMessageTxBuilder(priv, chainId, gas, gasAmount, msgCreate)
}

func (suite *AnteTestSuite) CreateTestEIP712SubmitProposal(from sdk.AccAddress, priv cryptotypes.PrivKey, chainId string, gas uint64, gasAmount sdk.Coins, deposit sdk.Coins) client.TxBuilder {
	proposal, ok := govtypes.ContentFromProposalType("My proposal", "My description", govtypes.ProposalTypeText)
	suite.Require().True(ok)
	msgSubmit, err := govtypes.NewMsgSubmitProposal(proposal, deposit, from)
	suite.Require().NoError(err)
	return suite.CreateTestEIP712SingleMessageTxBuilder(priv, chainId, gas, gasAmount, msgSubmit)
}

func (suite *AnteTestSuite) CreateTestEIP712GrantAllowance(from sdk.AccAddress, priv cryptotypes.PrivKey, chainId string, gas uint64, gasAmount sdk.Coins) client.TxBuilder {
	spendLimit := sdk.NewCoins(sdk.NewInt64Coin(evmtypes.DefaultEVMDenom, 10))
	threeHours := time.Now().Add(3 * time.Hour)
	basic := &feegrant.BasicAllowance{
		SpendLimit: spendLimit,
		Expiration: &threeHours,
	}
	granted := tests.GenerateAddress()
	grantedAddr := suite.app.AccountKeeper.NewAccountWithAddress(suite.ctx, granted.Bytes())
	msgGrant, err := feegrant.NewMsgGrantAllowance(basic, from, grantedAddr.GetAddress())
	suite.Require().NoError(err)
	return suite.CreateTestEIP712SingleMessageTxBuilder(priv, chainId, gas, gasAmount, msgGrant)
}

func (suite *AnteTestSuite) CreateTestEIP712MsgEditValidator(from sdk.AccAddress, priv cryptotypes.PrivKey, chainId string, gas uint64, gasAmount sdk.Coins) client.TxBuilder {
	valAddr := sdk.ValAddress(from.Bytes())
	msgEdit := stakingtypes.NewMsgEditValidator(
		valAddr,
		stakingtypes.NewDescription("moniker", "identity", "website", "security_contract", "details"),
		nil,
		nil,
	)
	return suite.CreateTestEIP712SingleMessageTxBuilder(priv, chainId, gas, gasAmount, msgEdit)
}

func (suite *AnteTestSuite) CreateTestEIP712MsgSubmitEvidence(from sdk.AccAddress, priv cryptotypes.PrivKey, chainId string, gas uint64, gasAmount sdk.Coins) client.TxBuilder {
	pk := ed25519.GenPrivKey()
	msgEvidence, err := evtypes.NewMsgSubmitEvidence(from, &evtypes.Equivocation{
		Height:           11,
		Time:             time.Now().UTC(),
		Power:            100,
		ConsensusAddress: pk.PubKey().Address().String(),
	})
	suite.Require().NoError(err)

	return suite.CreateTestEIP712SingleMessageTxBuilder(priv, chainId, gas, gasAmount, msgEvidence)
}

func (suite *AnteTestSuite) CreateTestEIP712MsgVoteV1(from sdk.AccAddress, priv cryptotypes.PrivKey, chainId string, gas uint64, gasAmount sdk.Coins) client.TxBuilder {
	msgVote := govtypesv1.NewMsgVote(from, 1, govtypesv1.VoteOption_VOTE_OPTION_YES, "")
	return suite.CreateTestEIP712SingleMessageTxBuilder(priv, chainId, gas, gasAmount, msgVote)
}

func (suite *AnteTestSuite) CreateTestEIP712SubmitProposalV1(from sdk.AccAddress, priv cryptotypes.PrivKey, chainId string, gas uint64, gasAmount sdk.Coins) client.TxBuilder {
	// Build V1 proposal messages. Must all be same-type, since EIP-712
	// does not support arrays of variable type.
	authAcc := suite.app.GovKeeper.GetGovernanceAccount(suite.ctx)

	proposal1, ok := govtypes.ContentFromProposalType("My proposal 1", "My description 1", govtypes.ProposalTypeText)
	suite.Require().True(ok)
	content1, err := govtypesv1.NewLegacyContent(
		proposal1,
		sdk.MustBech32ifyAddressBytes(sdk.GetConfig().GetBech32AccountAddrPrefix(), authAcc.GetAddress().Bytes()),
	)
	suite.Require().NoError(err)

	proposal2, ok := govtypes.ContentFromProposalType("My proposal 2", "My description 2", govtypes.ProposalTypeText)
	suite.Require().True(ok)
	content2, err := govtypesv1.NewLegacyContent(
		proposal2,
		sdk.MustBech32ifyAddressBytes(sdk.GetConfig().GetBech32AccountAddrPrefix(), authAcc.GetAddress().Bytes()),
	)
	suite.Require().NoError(err)

	proposalMsgs := []sdk.Msg{
		content1,
		content2,
	}

	// Build V1 proposal
	msgProposal, err := govtypesv1.NewMsgSubmitProposal(
		proposalMsgs,
		sdk.NewCoins(sdk.NewCoin(evmtypes.DefaultEVMDenom, sdkmath.NewInt(100))),
		sdk.MustBech32ifyAddressBytes(sdk.GetConfig().GetBech32AccountAddrPrefix(), from.Bytes()),
		"Metadata", "title", "summary",
	)

	suite.Require().NoError(err)

	return suite.CreateTestEIP712SingleMessageTxBuilder(priv, chainId, gas, gasAmount, msgProposal)
}

func (suite *AnteTestSuite) CreateTestEIP712MsgExec(from sdk.AccAddress, priv cryptotypes.PrivKey, chainId string, gas uint64, gasAmount sdk.Coins) client.TxBuilder {
	recipient := sdk.AccAddress(common.Address{}.Bytes())
	msgSend := banktypes.NewMsgSend(from, recipient, sdk.NewCoins(sdk.NewCoin(evmtypes.DefaultEVMDenom, sdkmath.NewInt(1))))
	msgExec := authz.NewMsgExec(from, []sdk.Msg{msgSend})
	return suite.CreateTestEIP712SingleMessageTxBuilder(priv, chainId, gas, gasAmount, &msgExec)
}

func (suite *AnteTestSuite) CreateTestEIP712MultipleMsgSend(from sdk.AccAddress, priv cryptotypes.PrivKey, chainId string, gas uint64, gasAmount sdk.Coins) client.TxBuilder {
	recipient := sdk.AccAddress(common.Address{}.Bytes())
	msgSend := banktypes.NewMsgSend(from, recipient, sdk.NewCoins(sdk.NewCoin(evmtypes.DefaultEVMDenom, sdkmath.NewInt(1))))
	return suite.CreateTestEIP712CosmosTxBuilder(priv, chainId, gas, gasAmount, []sdk.Msg{msgSend, msgSend, msgSend})
}

// Fails
func (suite *AnteTestSuite) CreateTestEIP712MultipleSignerMsgs(from sdk.AccAddress, priv cryptotypes.PrivKey, chainId string, gas uint64, gasAmount sdk.Coins) client.TxBuilder {
	recipient := sdk.AccAddress(common.Address{}.Bytes())
	msgSend1 := banktypes.NewMsgSend(from, recipient, sdk.NewCoins(sdk.NewCoin(evmtypes.DefaultEVMDenom, sdkmath.NewInt(1))))
	msgSend2 := banktypes.NewMsgSend(recipient, from, sdk.NewCoins(sdk.NewCoin(evmtypes.DefaultEVMDenom, sdkmath.NewInt(1))))
	return suite.CreateTestEIP712CosmosTxBuilder(priv, chainId, gas, gasAmount, []sdk.Msg{msgSend1, msgSend2})
}

// StdSignBytes returns the bytes to sign for a transaction.
func StdSignBytes(cdc *codec.LegacyAmino, chainID string, accnum uint64, sequence uint64, timeout uint64, fee legacytx.StdFee, msgs []sdk.Msg, memo string, tip *txtypes.Tip) []byte {
	msgsBytes := make([]json.RawMessage, 0, len(msgs))
	for _, msg := range msgs {
		legacyMsg, ok := msg.(legacytx.LegacyMsg)
		if !ok {
			panic(fmt.Errorf("expected %T when using amino JSON", (*legacytx.LegacyMsg)(nil)))
		}

		msgsBytes = append(msgsBytes, json.RawMessage(legacyMsg.GetSignBytes()))
	}

	var stdTip *legacytx.StdTip
	if tip != nil {
		if tip.Tipper == "" {
			panic(fmt.Errorf("tipper cannot be empty"))
		}

		stdTip = &legacytx.StdTip{Amount: tip.Amount, Tipper: tip.Tipper}
	}

	bz, err := cdc.MarshalJSON(legacytx.StdSignDoc{
		AccountNumber: accnum,
		ChainID:       chainID,
		Fee:           json.RawMessage(fee.Bytes()),
		Memo:          memo,
		Msgs:          msgsBytes,
		Sequence:      sequence,
		TimeoutHeight: timeout,
		Tip:           stdTip,
	})
	if err != nil {
		panic(err)
	}

	return sdk.MustSortJSON(bz)
}

func (suite *AnteTestSuite) CreateTestEIP712SingleMessageTxBuilder(
	priv cryptotypes.PrivKey, chainID string, gas uint64, gasAmount sdk.Coins, msg sdk.Msg,
) client.TxBuilder {
	return suite.CreateTestEIP712CosmosTxBuilder(priv, chainID, gas, gasAmount, []sdk.Msg{msg})
}

func (suite *AnteTestSuite) CreateTestEIP712CosmosTxBuilder(
	priv cryptotypes.PrivKey, chainID string, gas uint64, gasAmount sdk.Coins, msgs []sdk.Msg,
) client.TxBuilder {
	config := suite.clientCtx.TxConfig
	cosmosTxArgs := utiltx.CosmosTxArgs{
		TxCfg:   config,
		Priv:    priv,
		ChainID: chainID,
		Gas:     gas,
		Fees:    gasAmount,
		Msgs:    msgs,
	}

	builder, err := utiltx.PrepareEIP712CosmosTx(
		suite.ctx,
		suite.app,
		utiltx.EIP712TxArgs{
			CosmosTxArgs:       cosmosTxArgs,
			UseLegacyExtension: suite.useLegacyEIP712Extension,
			UseLegacyTypedData: suite.useLegacyEIP712TypedData,
		},
	)

	suite.Require().NoError(err)
	return builder
}

// Generate a set of pub/priv keys to be used in creating multi-keys
func (suite *AnteTestSuite) GenerateMultipleKeys(n int) ([]cryptotypes.PrivKey, []cryptotypes.PubKey) {
	privKeys := make([]cryptotypes.PrivKey, n)
	pubKeys := make([]cryptotypes.PubKey, n)
	for i := 0; i < n; i++ {
		privKey, err := ethsecp256k1.GenerateKey()
		suite.Require().NoError(err)
		privKeys[i] = privKey
		pubKeys[i] = privKey.PubKey()
	}
	return privKeys, pubKeys
}

// generateSingleSignature signs the given sign doc bytes using the given signType (EIP-712 or Standard)
func (suite *AnteTestSuite) generateSingleSignature(signMode signing.SignMode, privKey cryptotypes.PrivKey, signDocBytes []byte, signType string) (signature signing.SignatureV2) {
	var (
		msg []byte
		err error
	)

	msg = signDocBytes

	if signType == "EIP-712" {
		msg, err = eip712.GetEIP712BytesForMsg(signDocBytes)
		suite.Require().NoError(err)
	}

	sigBytes, _ := privKey.Sign(msg)
	sigData := &signing.SingleSignatureData{
		SignMode:  signMode,
		Signature: sigBytes,
	}

	return signing.SignatureV2{
		PubKey: privKey.PubKey(),
		Data:   sigData,
	}
}

// generateMultikeySignatures signs a set of messages using each private key within a given multi-key
func (suite *AnteTestSuite) generateMultikeySignatures(signMode signing.SignMode, privKeys []cryptotypes.PrivKey, signDocBytes []byte, signType string) (signatures []signing.SignatureV2) {
	n := len(privKeys)
	signatures = make([]signing.SignatureV2, n)

	for i := 0; i < n; i++ {
		privKey := privKeys[i]
		currentType := signType

		// If mixed type, alternate signing type on each iteration
		if signType == "mixed" {
			if i%2 == 0 {
				currentType = "EIP-712"
			} else {
				currentType = "Standard"
			}
		}

		signatures[i] = suite.generateSingleSignature(
			signMode,
			privKey,
			signDocBytes,
			currentType,
		)
	}

	return signatures
}

// RegisterAccount creates an account with the keeper and populates the initial balance
func (suite *AnteTestSuite) RegisterAccount(pubKey cryptotypes.PubKey, balance *big.Int) {
	acc := suite.app.AccountKeeper.NewAccountWithAddress(suite.ctx, sdk.AccAddress(pubKey.Address()))
	suite.app.AccountKeeper.SetAccount(suite.ctx, acc)

	suite.app.EvmKeeper.SetBalance(suite.ctx, common.BytesToAddress(pubKey.Address()), balance)
}

// createSignerBytes generates sign doc bytes using the given parameters
func (suite *AnteTestSuite) createSignerBytes(chainId string, signMode signing.SignMode, pubKey cryptotypes.PubKey, txBuilder client.TxBuilder) []byte {
	acc, err := sdkante.GetSignerAcc(suite.ctx, suite.app.AccountKeeper, sdk.AccAddress(pubKey.Address()))
	suite.Require().NoError(err)
	signerInfo := authsigning.SignerData{
		Address:       sdk.MustBech32ifyAddressBytes(sdk.GetConfig().GetBech32AccountAddrPrefix(), acc.GetAddress().Bytes()),
		ChainID:       chainId,
		AccountNumber: acc.GetAccountNumber(),
		Sequence:      acc.GetSequence(),
		PubKey:        pubKey,
	}

	signerBytes, err := suite.clientCtx.TxConfig.SignModeHandler().GetSignBytes(
		signMode,
		signerInfo,
		txBuilder.GetTx(),
	)
	suite.Require().NoError(err)

	return signerBytes
}

// createBaseTxBuilder creates a TxBuilder to be used for Single- or Multi-signing
func (suite *AnteTestSuite) createBaseTxBuilder(msg sdk.Msg, gas uint64) client.TxBuilder {
	txBuilder := suite.clientCtx.TxConfig.NewTxBuilder()

	txBuilder.SetGasLimit(gas)
	txBuilder.SetFeeAmount(sdk.NewCoins(
		sdk.NewCoin("aphoton", sdk.NewInt(10000)),
	))

	err := txBuilder.SetMsgs(msg)
	suite.Require().NoError(err)

	txBuilder.SetMemo("")

	return txBuilder
}

// CreateTestSignedMultisigTx creates and sign a multi-signed tx for the given message. `signType` indicates whether to use standard signing ("Standard"),
// EIP-712 signing ("EIP-712"), or a mix of the two ("mixed").
func (suite *AnteTestSuite) CreateTestSignedMultisigTx(privKeys []cryptotypes.PrivKey, signMode signing.SignMode, msg sdk.Msg, chainId string, gas uint64, signType string) client.TxBuilder {
	pubKeys := make([]cryptotypes.PubKey, len(privKeys))
	for i, privKey := range privKeys {
		pubKeys[i] = privKey.PubKey()
	}

	// Re-derive multikey
	numKeys := len(privKeys)
	multiKey := kmultisig.NewLegacyAminoPubKey(numKeys, pubKeys)

	suite.RegisterAccount(multiKey, big.NewInt(10000000000))

	txBuilder := suite.createBaseTxBuilder(msg, gas)

	// Prepare signature field
	sig := multisig.NewMultisig(len(pubKeys))
	txBuilder.SetSignatures(signing.SignatureV2{
		PubKey: multiKey,
		Data:   sig,
	})

	signerBytes := suite.createSignerBytes(chainId, signMode, multiKey, txBuilder)

	// Sign for each key and update signature field
	sigs := suite.generateMultikeySignatures(signMode, privKeys, signerBytes, signType)
	for _, pkSig := range sigs {
		err := multisig.AddSignatureV2(sig, pkSig, pubKeys)
		suite.Require().NoError(err)
	}

	txBuilder.SetSignatures(signing.SignatureV2{
		PubKey: multiKey,
		Data:   sig,
	})

	return txBuilder
}

func (suite *AnteTestSuite) CreateTestSingleSignedTx(privKey cryptotypes.PrivKey, signMode signing.SignMode, msg sdk.Msg, chainId string, gas uint64, signType string) client.TxBuilder {
	pubKey := privKey.PubKey()

	suite.RegisterAccount(pubKey, big.NewInt(10000000000))

	txBuilder := suite.createBaseTxBuilder(msg, gas)

	// Prepare signature field
	sig := signing.SingleSignatureData{}
	txBuilder.SetSignatures(signing.SignatureV2{
		PubKey: pubKey,
		Data:   &sig,
	})

	signerBytes := suite.createSignerBytes(chainId, signMode, pubKey, txBuilder)

	sigData := suite.generateSingleSignature(signMode, privKey, signerBytes, signType)
	txBuilder.SetSignatures(sigData)

	return txBuilder
}

func NextFn(ctx sdk.Context, _ sdk.Tx, _ bool) (sdk.Context, error) {
	return ctx, nil
}

var _ sdk.Tx = &invalidTx{}

type invalidTx struct{}

func (invalidTx) GetMsgs() []sdk.Msg   { return []sdk.Msg{nil} }
func (invalidTx) ValidateBasic() error { return nil }
