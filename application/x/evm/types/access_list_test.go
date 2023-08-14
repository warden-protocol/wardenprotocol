package types

import (
	"github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
)

func (suite *TxDataTestSuite) TestTestNewAccessList() {
	testCases := []struct {
		name          string
		ethAccessList *ethtypes.AccessList
		expAl         AccessList
	}{
		{
			"ethAccessList is nil",
			nil,
			nil,
		},
		{
			"non-empty ethAccessList",
			&ethtypes.AccessList{{Address: suite.addr, StorageKeys: []common.Hash{{0}}}},
			AccessList{{Address: suite.hexAddr, StorageKeys: []string{common.Hash{}.Hex()}}},
		},
	}
	for _, tc := range testCases {
		al := NewAccessList(tc.ethAccessList)

		suite.Require().Equal(tc.expAl, al)
	}
}

func (suite *TxDataTestSuite) TestAccessListToEthAccessList() {
	ethAccessList := ethtypes.AccessList{{Address: suite.addr, StorageKeys: []common.Hash{{0}}}}
	al := NewAccessList(&ethAccessList)
	actual := al.ToEthAccessList()

	suite.Require().Equal(&ethAccessList, actual)
}
