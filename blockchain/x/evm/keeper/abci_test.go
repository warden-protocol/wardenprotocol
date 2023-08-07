package keeper_test

import (
	"github.com/cometbft/cometbft/abci/types"
	evmtypes "github.com/evmos/ethermint/x/evm/types"
)

func (suite *KeeperTestSuite) TestEndBlock() {
	em := suite.ctx.EventManager()
	suite.Require().Equal(0, len(em.Events()))

	res := suite.app.EvmKeeper.EndBlock(suite.ctx, types.RequestEndBlock{})
	suite.Require().Equal([]types.ValidatorUpdate{}, res)

	// should emit 1 EventTypeBlockBloom event on EndBlock
	suite.Require().Equal(1, len(em.Events()))
	suite.Require().Equal(evmtypes.EventTypeBlockBloom, em.Events()[0].Type)
}
