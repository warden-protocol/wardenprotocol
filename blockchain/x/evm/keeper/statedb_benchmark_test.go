package keeper_test

import (
	"math/big"
	"testing"

	"github.com/stretchr/testify/require"

	"github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"

	"github.com/evmos/ethermint/tests"
)

func BenchmarkCreateAccountNew(b *testing.B) {
	suite := KeeperTestSuite{}
	suite.SetupTestWithT(b)
	vmdb := suite.StateDB()

	b.ResetTimer()
	b.ReportAllocs()

	for i := 0; i < b.N; i++ {
		b.StopTimer()
		addr := tests.GenerateAddress()
		b.StartTimer()
		vmdb.CreateAccount(addr)
	}
}

func BenchmarkCreateAccountExisting(b *testing.B) {
	suite := KeeperTestSuite{}
	suite.SetupTestWithT(b)
	vmdb := suite.StateDB()

	b.ResetTimer()
	b.ReportAllocs()

	for i := 0; i < b.N; i++ {
		vmdb.CreateAccount(suite.address)
	}
}

func BenchmarkAddBalance(b *testing.B) {
	suite := KeeperTestSuite{}
	suite.SetupTestWithT(b)
	vmdb := suite.StateDB()

	amt := big.NewInt(10)

	b.ResetTimer()
	b.ReportAllocs()

	for i := 0; i < b.N; i++ {
		vmdb.AddBalance(suite.address, amt)
	}
}

func BenchmarkSetCode(b *testing.B) {
	suite := KeeperTestSuite{}
	suite.SetupTestWithT(b)
	vmdb := suite.StateDB()

	hash := crypto.Keccak256Hash([]byte("code")).Bytes()

	b.ResetTimer()
	b.ReportAllocs()

	for i := 0; i < b.N; i++ {
		vmdb.SetCode(suite.address, hash)
	}
}

func BenchmarkSetState(b *testing.B) {
	suite := KeeperTestSuite{}
	suite.SetupTestWithT(b)
	vmdb := suite.StateDB()

	hash := crypto.Keccak256Hash([]byte("topic")).Bytes()

	b.ResetTimer()
	b.ReportAllocs()

	for i := 0; i < b.N; i++ {
		vmdb.SetCode(suite.address, hash)
	}
}

func BenchmarkAddLog(b *testing.B) {
	suite := KeeperTestSuite{}
	suite.SetupTestWithT(b)
	vmdb := suite.StateDB()

	topic := crypto.Keccak256Hash([]byte("topic"))
	txHash := crypto.Keccak256Hash([]byte("tx_hash"))
	blockHash := crypto.Keccak256Hash([]byte("block_hash"))

	b.ResetTimer()
	b.ReportAllocs()

	for i := 0; i < b.N; i++ {
		vmdb.AddLog(&ethtypes.Log{
			Address:     suite.address,
			Topics:      []common.Hash{topic},
			Data:        []byte("data"),
			BlockNumber: 1,
			TxHash:      txHash,
			TxIndex:     1,
			BlockHash:   blockHash,
			Index:       1,
			Removed:     false,
		})
	}
}

func BenchmarkSnapshot(b *testing.B) {
	suite := KeeperTestSuite{}
	suite.SetupTestWithT(b)
	vmdb := suite.StateDB()

	b.ResetTimer()
	b.ReportAllocs()

	for i := 0; i < b.N; i++ {
		target := vmdb.Snapshot()
		require.Equal(b, i, target)
	}

	for i := b.N - 1; i >= 0; i-- {
		require.NotPanics(b, func() {
			vmdb.RevertToSnapshot(i)
		})
	}
}

func BenchmarkSubBalance(b *testing.B) {
	suite := KeeperTestSuite{}
	suite.SetupTestWithT(b)
	vmdb := suite.StateDB()

	amt := big.NewInt(10)

	b.ResetTimer()
	b.ReportAllocs()

	for i := 0; i < b.N; i++ {
		vmdb.SubBalance(suite.address, amt)
	}
}

func BenchmarkSetNonce(b *testing.B) {
	suite := KeeperTestSuite{}
	suite.SetupTestWithT(b)
	vmdb := suite.StateDB()

	b.ResetTimer()
	b.ReportAllocs()

	for i := 0; i < b.N; i++ {
		vmdb.SetNonce(suite.address, 1)
	}
}

func BenchmarkAddRefund(b *testing.B) {
	suite := KeeperTestSuite{}
	suite.SetupTestWithT(b)
	vmdb := suite.StateDB()

	b.ResetTimer()
	b.ReportAllocs()

	for i := 0; i < b.N; i++ {
		vmdb.AddRefund(1)
	}
}

func BenchmarkSuicide(b *testing.B) {
	suite := KeeperTestSuite{}
	suite.SetupTestWithT(b)
	vmdb := suite.StateDB()

	b.ResetTimer()
	b.ReportAllocs()
	for i := 0; i < b.N; i++ {
		b.StopTimer()
		addr := tests.GenerateAddress()
		vmdb.CreateAccount(addr)
		b.StartTimer()

		vmdb.Suicide(addr)
	}
}
