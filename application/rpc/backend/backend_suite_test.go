package backend

import (
	"bufio"
	"fmt"
	"math/big"
	"os"
	"path/filepath"
	"testing"

	dbm "github.com/tendermint/tm-db"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	"github.com/cosmos/cosmos-sdk/server"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	"github.com/stretchr/testify/suite"
	tmrpctypes "github.com/tendermint/tendermint/rpc/core/types"

	"github.com/evmos/ethermint/app"
	"github.com/evmos/ethermint/crypto/hd"
	"github.com/evmos/ethermint/encoding"
	"github.com/evmos/ethermint/indexer"
	"github.com/evmos/ethermint/rpc/backend/mocks"
	rpctypes "github.com/evmos/ethermint/rpc/types"
	evmtypes "github.com/evmos/ethermint/x/evm/types"
)

type BackendTestSuite struct {
	suite.Suite
	backend *Backend
}

func TestBackendTestSuite(t *testing.T) {
	suite.Run(t, new(BackendTestSuite))
}

// SetupTest is executed before every BackendTestSuite test
func (suite *BackendTestSuite) SetupTest() {
	ctx := server.NewDefaultContext()
	ctx.Viper.Set("telemetry.global-labels", []interface{}{})

	baseDir := suite.T().TempDir()
	nodeDirName := fmt.Sprintf("node")
	clientDir := filepath.Join(baseDir, nodeDirName, "evmoscli")
	keyRing, err := suite.generateTestKeyring(clientDir)
	if err != nil {
		panic(err)
	}

	encodingConfig := encoding.MakeConfig(app.ModuleBasics)
	clientCtx := client.Context{}.WithChainID("ethermint_9000-1").
		WithHeight(1).
		WithTxConfig(encodingConfig.TxConfig).
		WithKeyringDir(clientDir).
		WithKeyring(keyRing)

	allowUnprotectedTxs := false

	idxer := indexer.NewKVIndexer(dbm.NewMemDB(), ctx.Logger, clientCtx)

	suite.backend = NewBackend(ctx, ctx.Logger, clientCtx, allowUnprotectedTxs, idxer)
	suite.backend.queryClient.QueryClient = mocks.NewQueryClient(suite.T())
	suite.backend.clientCtx.Client = mocks.NewClient(suite.T())
	suite.backend.ctx = rpctypes.ContextWithHeight(1)
}

// buildEthereumTx returns an example legacy Ethereum transaction
func (suite *BackendTestSuite) buildEthereumTx() (*evmtypes.MsgEthereumTx, []byte) {
	msgEthereumTx := evmtypes.NewTx(
		big.NewInt(1),
		uint64(0),
		&common.Address{},
		big.NewInt(0),
		100000,
		big.NewInt(1),
		nil,
		nil,
		nil,
		nil,
	)

	// A valid msg should have empty `From`
	msgEthereumTx.From = ""

	txBuilder := suite.backend.clientCtx.TxConfig.NewTxBuilder()
	err := txBuilder.SetMsgs(msgEthereumTx)
	suite.Require().NoError(err)

	bz, err := suite.backend.clientCtx.TxConfig.TxEncoder()(txBuilder.GetTx())
	suite.Require().NoError(err)
	return msgEthereumTx, bz
}

// buildFormattedBlock returns a formatted block for testing
func (suite *BackendTestSuite) buildFormattedBlock(
	blockRes *tmrpctypes.ResultBlockResults,
	resBlock *tmrpctypes.ResultBlock,
	fullTx bool,
	tx *evmtypes.MsgEthereumTx,
	validator sdk.AccAddress,
	baseFee *big.Int,
) map[string]interface{} {
	header := resBlock.Block.Header
	gasLimit := int64(^uint32(0)) // for `MaxGas = -1` (DefaultConsensusParams)
	gasUsed := new(big.Int).SetUint64(uint64(blockRes.TxsResults[0].GasUsed))

	root := common.Hash{}.Bytes()
	receipt := ethtypes.NewReceipt(root, false, gasUsed.Uint64())
	bloom := ethtypes.CreateBloom(ethtypes.Receipts{receipt})

	ethRPCTxs := []interface{}{}
	if tx != nil {
		if fullTx {
			rpcTx, err := rpctypes.NewRPCTransaction(
				tx.AsTransaction(),
				common.BytesToHash(header.Hash()),
				uint64(header.Height),
				uint64(0),
				baseFee,
			)
			suite.Require().NoError(err)
			ethRPCTxs = []interface{}{rpcTx}
		} else {
			ethRPCTxs = []interface{}{common.HexToHash(tx.Hash)}
		}
	}

	return rpctypes.FormatBlock(
		header,
		resBlock.Block.Size(),
		gasLimit,
		gasUsed,
		ethRPCTxs,
		bloom,
		common.BytesToAddress(validator.Bytes()),
		baseFee,
	)
}

func (suite *BackendTestSuite) generateTestKeyring(clientDir string) (keyring.Keyring, error) {
	buf := bufio.NewReader(os.Stdin)
	return keyring.New(sdk.KeyringServiceName(), keyring.BackendTest, clientDir, buf, []keyring.Option{hd.EthSecp256k1Option()}...)
}
