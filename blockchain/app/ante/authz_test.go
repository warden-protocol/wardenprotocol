package ante_test

import (
	"fmt"
	"time"

	abci "github.com/cometbft/cometbft/abci/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	sdkvesting "github.com/cosmos/cosmos-sdk/x/auth/vesting/types"
	"github.com/cosmos/cosmos-sdk/x/authz"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	utiltx "github.com/evmos/ethermint/testutil/tx"

	"github.com/evmos/ethermint/app/ante"

	"github.com/evmos/ethermint/crypto/ethsecp256k1"

	cryptotypes "github.com/cosmos/cosmos-sdk/crypto/types"
	evmtypes "github.com/evmos/ethermint/x/evm/types"
)

func (suite *AnteTestSuite) TestAuthzLimiterDecorator() {
	_, testAddresses, err := generatePrivKeyAddressPairs(5)
	suite.Require().NoError(err)

	validator := sdk.ValAddress(testAddresses[4])
	stakingAuthDelegate, err := stakingtypes.NewStakeAuthorization(
		[]sdk.ValAddress{validator},
		nil,
		stakingtypes.AuthorizationType_AUTHORIZATION_TYPE_DELEGATE,
		nil,
	)
	suite.Require().NoError(err)

	stakingAuthUndelegate, err := stakingtypes.NewStakeAuthorization(
		[]sdk.ValAddress{validator},
		nil,
		stakingtypes.AuthorizationType_AUTHORIZATION_TYPE_UNDELEGATE,
		nil,
	)
	suite.Require().NoError(err)

	decorator := ante.NewAuthzLimiterDecorator(
		[]string{
			sdk.MsgTypeURL(&evmtypes.MsgEthereumTx{}),
			sdk.MsgTypeURL(&stakingtypes.MsgUndelegate{}),
		},
	)

	testMsgSend := createMsgSend(testAddresses)
	testMsgEthereumTx := &evmtypes.MsgEthereumTx{}

	testCases := []struct {
		name        string
		msgs        []sdk.Msg
		expectedErr error
	}{
		{
			"enabled msg - non blocked msg",
			[]sdk.Msg{
				testMsgSend,
			},
			nil,
		},
		{
			"enabled msg MsgEthereumTx - blocked msg not wrapped in MsgExec",
			[]sdk.Msg{
				testMsgEthereumTx,
			},
			nil,
		},
		{
			"enabled msg - blocked msg not wrapped in MsgExec",
			[]sdk.Msg{
				&stakingtypes.MsgUndelegate{},
			},
			nil,
		},
		{
			"enabled msg - MsgGrant contains a non blocked msg",
			[]sdk.Msg{
				newGenericMsgGrant(
					testAddresses,
					sdk.MsgTypeURL(&banktypes.MsgSend{}),
				),
			},
			nil,
		},
		{
			"enabled msg - MsgGrant contains a non blocked msg",
			[]sdk.Msg{
				newMsgGrant(
					testAddresses,
					stakingAuthDelegate,
				),
			},
			nil,
		},
		{
			"disabled msg - MsgGrant contains a blocked msg",
			[]sdk.Msg{
				newGenericMsgGrant(
					testAddresses,
					sdk.MsgTypeURL(testMsgEthereumTx),
				),
			},
			sdkerrors.ErrUnauthorized,
		},
		{
			"disabled msg - MsgGrant contains a blocked msg",
			[]sdk.Msg{
				newMsgGrant(
					testAddresses,
					stakingAuthUndelegate,
				),
			},
			sdkerrors.ErrUnauthorized,
		},
		{
			"allowed msg - when a MsgExec contains a non blocked msg",
			[]sdk.Msg{
				newMsgExec(
					testAddresses[1],
					[]sdk.Msg{
						testMsgSend,
					},
				),
			},
			nil,
		},
		{
			"disabled msg - MsgExec contains a blocked msg",
			[]sdk.Msg{
				newMsgExec(
					testAddresses[1],
					[]sdk.Msg{
						testMsgEthereumTx,
					},
				),
			},
			sdkerrors.ErrUnauthorized,
		},
		{
			"disabled msg - surrounded by valid msgs",
			[]sdk.Msg{
				newMsgGrant(
					testAddresses,
					stakingAuthDelegate,
				),
				newMsgExec(
					testAddresses[1],
					[]sdk.Msg{
						testMsgSend,
						testMsgEthereumTx,
					},
				),
			},
			sdkerrors.ErrUnauthorized,
		},
		{
			"disabled msg - nested MsgExec containing a blocked msg",
			[]sdk.Msg{
				createNestedMsgExec(
					testAddresses[1],
					2,
					[]sdk.Msg{
						testMsgEthereumTx,
					},
				),
			},
			sdkerrors.ErrUnauthorized,
		},
		{
			"disabled msg - nested MsgGrant containing a blocked msg",
			[]sdk.Msg{
				newMsgExec(
					testAddresses[1],
					[]sdk.Msg{
						newGenericMsgGrant(
							testAddresses,
							sdk.MsgTypeURL(testMsgEthereumTx),
						),
					},
				),
			},
			sdkerrors.ErrUnauthorized,
		},
		{
			"disabled msg - nested MsgExec NOT containing a blocked msg but has more nesting levels than the allowed",
			[]sdk.Msg{
				createNestedExecMsgSend(testAddresses, 6),
			},
			sdkerrors.ErrUnauthorized,
		},
		{
			"disabled msg - two multiple nested MsgExec messages NOT containing a blocked msg over the limit",
			[]sdk.Msg{
				createNestedExecMsgSend(testAddresses, 5),
				createNestedExecMsgSend(testAddresses, 5),
			},
			sdkerrors.ErrUnauthorized,
		},
	}

	for _, tc := range testCases {
		suite.Run(fmt.Sprintf("Case %s", tc.name), func() {
			suite.SetupTest()
			tx, err := suite.createTx(suite.priv, tc.msgs...)
			suite.Require().NoError(err)

			_, err = decorator.AnteHandle(suite.ctx, tx, false, NextFn)
			if tc.expectedErr != nil {
				suite.Require().Error(err)
				suite.Require().ErrorIs(err, tc.expectedErr)
			} else {
				suite.Require().NoError(err)
			}
		})
	}
}

func (suite *AnteTestSuite) TestRejectDeliverMsgsInAuthz() {
	_, testAddresses, err := generatePrivKeyAddressPairs(10)
	suite.Require().NoError(err)

	testcases := []struct {
		name         string
		msgs         []sdk.Msg
		expectedCode uint32
		isEIP712     bool
	}{
		{
			name: "a MsgGrant with MsgEthereumTx typeURL on the authorization field is blocked",
			msgs: []sdk.Msg{
				newGenericMsgGrant(
					testAddresses,
					sdk.MsgTypeURL(&evmtypes.MsgEthereumTx{}),
				),
			},
			expectedCode: sdkerrors.ErrUnauthorized.ABCICode(),
		},
		{
			name: "a MsgGrant with MsgCreateVestingAccount typeURL on the authorization field is blocked",
			msgs: []sdk.Msg{
				newGenericMsgGrant(
					testAddresses,
					sdk.MsgTypeURL(&sdkvesting.MsgCreateVestingAccount{}),
				),
			},
			expectedCode: sdkerrors.ErrUnauthorized.ABCICode(),
		},
		{
			name: "a MsgGrant with MsgEthereumTx typeURL on the authorization field included on EIP712 tx is blocked",
			msgs: []sdk.Msg{
				newGenericMsgGrant(
					testAddresses,
					sdk.MsgTypeURL(&evmtypes.MsgEthereumTx{}),
				),
			},
			expectedCode: sdkerrors.ErrUnauthorized.ABCICode(),
			isEIP712:     true,
		},
		{
			name: "a MsgExec with nested messages (valid: MsgSend and invalid: MsgEthereumTx) is blocked",
			msgs: []sdk.Msg{
				newMsgExec(
					testAddresses[1],
					[]sdk.Msg{
						createMsgSend(testAddresses),
						&evmtypes.MsgEthereumTx{},
					},
				),
			},
			expectedCode: sdkerrors.ErrUnpackAny.ABCICode(),
		},
		{
			name: "a MsgExec with nested MsgExec messages that has invalid messages is blocked",
			msgs: []sdk.Msg{
				createNestedMsgExec(
					testAddresses[1],
					2,
					[]sdk.Msg{
						&evmtypes.MsgEthereumTx{},
					},
				),
			},
			expectedCode: sdkerrors.ErrUnpackAny.ABCICode(),
		},
		{
			name: "a MsgExec with more nested MsgExec messages than allowed and with valid messages is blocked",
			msgs: []sdk.Msg{
				createNestedExecMsgSend(testAddresses, 6),
			},
			expectedCode: sdkerrors.ErrUnauthorized.ABCICode(),
		},
		{
			name: "two MsgExec messages NOT containing a blocked msg but between the two have more nesting than the allowed. Then, is blocked",
			msgs: []sdk.Msg{
				createNestedExecMsgSend(testAddresses, 5),
				createNestedExecMsgSend(testAddresses, 5),
			},
			expectedCode: sdkerrors.ErrUnauthorized.ABCICode(),
		},
	}

	for _, tc := range testcases {
		suite.Run(fmt.Sprintf("Case %s", tc.name), func() {
			suite.SetupTest()
			var (
				tx  sdk.Tx
				err error
			)

			if tc.isEIP712 {
				tx, err = suite.createEIP712Tx(suite.priv, tc.msgs...)
			} else {
				tx, err = suite.createTx(suite.priv, tc.msgs...)
			}
			suite.Require().NoError(err)

			txEncoder := suite.clientCtx.TxConfig.TxEncoder()
			bz, err := txEncoder(tx)
			suite.Require().NoError(err)

			resCheckTx := suite.app.CheckTx(
				abci.RequestCheckTx{
					Tx:   bz,
					Type: abci.CheckTxType_New,
				},
			)
			suite.Require().Equal(resCheckTx.Code, tc.expectedCode, resCheckTx.Log)

			resDeliverTx := suite.app.DeliverTx(
				abci.RequestDeliverTx{
					Tx: bz,
				},
			)
			suite.Require().Equal(resDeliverTx.Code, tc.expectedCode, resDeliverTx.Log)
		})
	}
}

func generatePrivKeyAddressPairs(accCount int) ([]*ethsecp256k1.PrivKey, []sdk.AccAddress, error) {
	var (
		err           error
		testPrivKeys  = make([]*ethsecp256k1.PrivKey, accCount)
		testAddresses = make([]sdk.AccAddress, accCount)
	)

	for i := range testPrivKeys {
		testPrivKeys[i], err = ethsecp256k1.GenerateKey()
		if err != nil {
			return nil, nil, err
		}
		testAddresses[i] = testPrivKeys[i].PubKey().Address().Bytes()
	}
	return testPrivKeys, testAddresses, nil
}

func newMsgGrant(testAddresses []sdk.AccAddress, auth authz.Authorization) *authz.MsgGrant {
	expiration := time.Date(9000, 1, 1, 0, 0, 0, 0, time.UTC)
	msg, err := authz.NewMsgGrant(testAddresses[0], testAddresses[1], auth, &expiration)
	if err != nil {
		panic(err)
	}
	return msg
}

func newGenericMsgGrant(testAddresses []sdk.AccAddress, typeUrl string) *authz.MsgGrant {
	auth := authz.NewGenericAuthorization(typeUrl)
	return newMsgGrant(testAddresses, auth)
}

func newMsgExec(grantee sdk.AccAddress, msgs []sdk.Msg) *authz.MsgExec {
	msg := authz.NewMsgExec(grantee, msgs)
	return &msg
}

func createNestedExecMsgSend(testAddresses []sdk.AccAddress, depth int) *authz.MsgExec {
	return createNestedMsgExec(
		testAddresses[1],
		depth,
		[]sdk.Msg{
			createMsgSend(testAddresses),
		},
	)
}

func createMsgSend(testAddresses []sdk.AccAddress) *banktypes.MsgSend {
	return banktypes.NewMsgSend(
		testAddresses[0],
		testAddresses[3],
		sdk.NewCoins(sdk.NewInt64Coin(evmtypes.DefaultEVMDenom, 1e8)),
	)
}

func createNestedMsgExec(grantee sdk.AccAddress, numLevels int, msgsToExec []sdk.Msg) *authz.MsgExec {
	msgs := make([]*authz.MsgExec, numLevels)
	for i := range msgs {
		if i == 0 {
			msgs[i] = newMsgExec(grantee, msgsToExec)
			continue
		}
		msgs[i] = newMsgExec(grantee, []sdk.Msg{msgs[i-1]})
	}
	return msgs[numLevels-1]
}

func (suite *AnteTestSuite) createTx(priv cryptotypes.PrivKey, msgs ...sdk.Msg) (sdk.Tx, error) {
	addr := sdk.AccAddress(priv.PubKey().Address().Bytes())
	args := utiltx.CosmosTxArgs{
		TxCfg:      suite.clientCtx.TxConfig,
		Priv:       priv,
		Gas:        1000000,
		FeeGranter: addr,
		Msgs:       msgs,
	}

	return utiltx.PrepareCosmosTx(suite.ctx, suite.app, args)
}

func (suite *AnteTestSuite) createEIP712Tx(priv cryptotypes.PrivKey, msgs ...sdk.Msg) (sdk.Tx, error) {
	coinAmount := sdk.NewCoin(evmtypes.DefaultEVMDenom, sdk.NewInt(20))
	fees := sdk.NewCoins(coinAmount)
	cosmosTxArgs := utiltx.CosmosTxArgs{
		TxCfg:   suite.clientCtx.TxConfig,
		Priv:    suite.priv,
		ChainID: suite.ctx.ChainID(),
		Gas:     200000,
		Fees:    fees,
		Msgs:    msgs,
	}

	return utiltx.CreateEIP712CosmosTx(
		suite.ctx,
		suite.app,
		utiltx.EIP712TxArgs{
			CosmosTxArgs:       cosmosTxArgs,
			UseLegacyExtension: true,
		},
	)
}
