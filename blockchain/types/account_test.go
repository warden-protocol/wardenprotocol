package types_test

import (
	"testing"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/stretchr/testify/suite"

	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"

	cryptocodec "gitlab.qredo.com/qrdochain/fusionchain/crypto/codec"
	"gitlab.qredo.com/qrdochain/fusionchain/crypto/ethsecp256k1"
	ethermintcodec "gitlab.qredo.com/qrdochain/fusionchain/encoding/codec"
	"gitlab.qredo.com/qrdochain/fusionchain/types"
)

func init() {
	amino := codec.NewLegacyAmino()
	cryptocodec.RegisterCrypto(amino)
}

type AccountTestSuite struct {
	suite.Suite

	account *types.EthAccount
	cdc     codec.JSONCodec
}

func (suite *AccountTestSuite) SetupTest() {
	privKey, err := ethsecp256k1.GenerateKey()
	suite.Require().NoError(err)
	pubKey := privKey.PubKey()
	addr := sdk.AccAddress(pubKey.Address())
	baseAcc := authtypes.NewBaseAccount(addr, pubKey, 10, 50)
	suite.account = &types.EthAccount{
		BaseAccount: baseAcc,
		CodeHash:    common.Hash{}.String(),
	}

	interfaceRegistry := codectypes.NewInterfaceRegistry()
	ethermintcodec.RegisterInterfaces(interfaceRegistry)
	suite.cdc = codec.NewProtoCodec(interfaceRegistry)
}

func TestAccountTestSuite(t *testing.T) {
	suite.Run(t, new(AccountTestSuite))
}

func (suite *AccountTestSuite) TestAccountType() {
	suite.account.CodeHash = common.BytesToHash(crypto.Keccak256(nil)).Hex()
	suite.Require().Equal(types.AccountTypeEOA, suite.account.Type())
	suite.account.CodeHash = common.BytesToHash(crypto.Keccak256([]byte{1, 2, 3})).Hex()
	suite.Require().Equal(types.AccountTypeContract, suite.account.Type())
}
