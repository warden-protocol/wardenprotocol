package types

import (
	"testing"

	"github.com/ethereum/go-ethereum/common"
	"github.com/stretchr/testify/suite"

	"github.com/evmos/ethermint/crypto/ethsecp256k1"
)

type GenesisTestSuite struct {
	suite.Suite

	address string
	hash    common.Hash
	code    string
}

func (suite *GenesisTestSuite) SetupTest() {
	priv, err := ethsecp256k1.GenerateKey()
	suite.Require().NoError(err)

	suite.address = common.BytesToAddress(priv.PubKey().Address().Bytes()).String()
	suite.hash = common.BytesToHash([]byte("hash"))
	suite.code = common.Bytes2Hex([]byte{1, 2, 3})
}

func TestGenesisTestSuite(t *testing.T) {
	suite.Run(t, new(GenesisTestSuite))
}

func (suite *GenesisTestSuite) TestValidateGenesisAccount() {
	testCases := []struct {
		name           string
		genesisAccount GenesisAccount
		expPass        bool
	}{
		{
			"valid genesis account",
			GenesisAccount{
				Address: suite.address,
				Code:    suite.code,
				Storage: Storage{
					NewState(suite.hash, suite.hash),
				},
			},
			true,
		},
		{
			"empty account address bytes",
			GenesisAccount{
				Address: "",
				Code:    suite.code,
				Storage: Storage{
					NewState(suite.hash, suite.hash),
				},
			},
			false,
		},
		{
			"empty code bytes",
			GenesisAccount{
				Address: suite.address,
				Code:    "",
				Storage: Storage{
					NewState(suite.hash, suite.hash),
				},
			},
			true,
		},
	}

	for _, tc := range testCases {
		tc := tc
		err := tc.genesisAccount.Validate()
		if tc.expPass {
			suite.Require().NoError(err, tc.name)
		} else {
			suite.Require().Error(err, tc.name)
		}
	}
}

func (suite *GenesisTestSuite) TestValidateGenesis() {
	testCases := []struct {
		name     string
		genState *GenesisState
		expPass  bool
	}{
		{
			name:     "default",
			genState: DefaultGenesisState(),
			expPass:  true,
		},
		{
			name: "valid genesis",
			genState: &GenesisState{
				Accounts: []GenesisAccount{
					{
						Address: suite.address,

						Code: suite.code,
						Storage: Storage{
							{Key: suite.hash.String()},
						},
					},
				},
				Params: DefaultParams(),
			},
			expPass: true,
		},
		{
			name:     "empty genesis",
			genState: &GenesisState{},
			expPass:  false,
		},
		{
			name: "invalid genesis",
			genState: &GenesisState{
				Accounts: []GenesisAccount{
					{
						Address: common.Address{}.String(),
					},
				},
			},
			expPass: false,
		},
		{
			name: "invalid genesis account",
			genState: &GenesisState{
				Accounts: []GenesisAccount{
					{
						Address: "123456",

						Code: suite.code,
						Storage: Storage{
							{Key: suite.hash.String()},
						},
					},
				},
				Params: DefaultParams(),
			},
			expPass: false,
		},
		{
			name: "duplicated genesis account",
			genState: &GenesisState{
				Accounts: []GenesisAccount{
					{
						Address: suite.address,

						Code: suite.code,
						Storage: Storage{
							NewState(suite.hash, suite.hash),
						},
					},
					{
						Address: suite.address,

						Code: suite.code,
						Storage: Storage{
							NewState(suite.hash, suite.hash),
						},
					},
				},
			},
			expPass: false,
		},
		{
			name: "duplicated tx log",
			genState: &GenesisState{
				Accounts: []GenesisAccount{
					{
						Address: suite.address,

						Code: suite.code,
						Storage: Storage{
							{Key: suite.hash.String()},
						},
					},
				},
			},
			expPass: false,
		},
		{
			name: "invalid tx log",
			genState: &GenesisState{
				Accounts: []GenesisAccount{
					{
						Address: suite.address,

						Code: suite.code,
						Storage: Storage{
							{Key: suite.hash.String()},
						},
					},
				},
			},
			expPass: false,
		},
		{
			name: "invalid params",
			genState: &GenesisState{
				Params: Params{},
			},
			expPass: false,
		},
	}

	for _, tc := range testCases {
		tc := tc
		err := tc.genState.Validate()
		if tc.expPass {
			suite.Require().NoError(err, tc.name)
		} else {
			suite.Require().Error(err, tc.name)
		}
	}
}
