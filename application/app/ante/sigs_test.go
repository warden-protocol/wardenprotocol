package ante_test

import (
	"math/big"

	"github.com/evmos/ethermint/tests"
	"github.com/evmos/ethermint/x/evm/statedb"
	evmtypes "github.com/evmos/ethermint/x/evm/types"
)

func (suite AnteTestSuite) TestSignatures() {
	suite.enableFeemarket = false
	suite.SetupTest() // reset

	addr, privKey := tests.NewAddrKey()
	to := tests.GenerateAddress()

	acc := statedb.NewEmptyAccount()
	acc.Nonce = 1
	acc.Balance = big.NewInt(10000000000)

	suite.app.EvmKeeper.SetAccount(suite.ctx, addr, *acc)
	msgEthereumTx := evmtypes.NewTx(suite.app.EvmKeeper.ChainID(), 1, &to, big.NewInt(10), 100000, big.NewInt(1), nil, nil, nil, nil)
	msgEthereumTx.From = addr.Hex()

	// CreateTestTx will sign the msgEthereumTx but not sign the cosmos tx since we have signCosmosTx as false
	tx := suite.CreateTestTx(msgEthereumTx, privKey, 1, false)
	sigs, err := tx.GetSignaturesV2()
	suite.Require().NoError(err)

	// signatures of cosmos tx should be empty
	suite.Require().Equal(len(sigs), 0)

	txData, err := evmtypes.UnpackTxData(msgEthereumTx.Data)
	suite.Require().NoError(err)

	msgV, msgR, msgS := txData.GetRawSignatureValues()

	ethTx := msgEthereumTx.AsTransaction()
	ethV, ethR, ethS := ethTx.RawSignatureValues()

	// The signatures of MsgehtereumTx should be the same with the corresponding eth tx
	suite.Require().Equal(msgV, ethV)
	suite.Require().Equal(msgR, ethR)
	suite.Require().Equal(msgS, ethS)
}
