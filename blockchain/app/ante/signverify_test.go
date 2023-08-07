package ante_test

import (
	"math/big"

	sdk "github.com/cosmos/cosmos-sdk/types"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	"github.com/evmos/ethermint/app/ante"
	"github.com/evmos/ethermint/tests"
	evmtypes "github.com/evmos/ethermint/x/evm/types"
)

func (suite AnteTestSuite) TestEthSigVerificationDecorator() {
	addr, privKey := tests.NewAddrKey()

	signedTx := evmtypes.NewTxContract(suite.app.EvmKeeper.ChainID(), 1, big.NewInt(10), 1000, big.NewInt(1), nil, nil, nil, nil)
	signedTx.From = addr.Hex()
	err := signedTx.Sign(suite.ethSigner, tests.NewSigner(privKey))
	suite.Require().NoError(err)

	unprotectedTx := evmtypes.NewTxContract(nil, 1, big.NewInt(10), 1000, big.NewInt(1), nil, nil, nil, nil)
	unprotectedTx.From = addr.Hex()
	err = unprotectedTx.Sign(ethtypes.HomesteadSigner{}, tests.NewSigner(privKey))
	suite.Require().NoError(err)

	testCases := []struct {
		name                string
		tx                  sdk.Tx
		allowUnprotectedTxs bool
		reCheckTx           bool
		expPass             bool
	}{
		{"ReCheckTx", &invalidTx{}, false, true, false},
		{"invalid transaction type", &invalidTx{}, false, false, false},
		{
			"invalid sender",
			evmtypes.NewTx(suite.app.EvmKeeper.ChainID(), 1, &addr, big.NewInt(10), 1000, big.NewInt(1), nil, nil, nil, nil),
			true,
			false,
			false,
		},
		{"successful signature verification", signedTx, false, false, true},
		{"invalid, reject unprotected txs", unprotectedTx, false, false, false},
		{"successful, allow unprotected txs", unprotectedTx, true, false, true},
	}

	for _, tc := range testCases {
		suite.Run(tc.name, func() {
			suite.evmParamsOption = func(params *evmtypes.Params) {
				params.AllowUnprotectedTxs = tc.allowUnprotectedTxs
			}
			suite.SetupTest()
			dec := ante.NewEthSigVerificationDecorator(suite.app.EvmKeeper)
			_, err := dec.AnteHandle(suite.ctx.WithIsReCheckTx(tc.reCheckTx), tc.tx, false, NextFn)

			if tc.expPass {
				suite.Require().NoError(err)
			} else {
				suite.Require().Error(err)
			}
		})
	}
	suite.evmParamsOption = nil
}
