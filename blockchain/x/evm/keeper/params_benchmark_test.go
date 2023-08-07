package keeper_test

import (
	"testing"

	"github.com/evmos/ethermint/x/evm/types"
)

func BenchmarkSetParams(b *testing.B) {
	suite := KeeperTestSuite{}
	suite.SetupTestWithT(b)
	params := types.DefaultParams()

	b.ReportAllocs()
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		_ = suite.app.EvmKeeper.SetParams(suite.ctx, params)
	}
}

func BenchmarkGetParams(b *testing.B) {
	suite := KeeperTestSuite{}
	suite.SetupTestWithT(b)

	b.ReportAllocs()
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		_ = suite.app.EvmKeeper.GetParams(suite.ctx)
	}
}
