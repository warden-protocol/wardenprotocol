package importer

import (
	"flag"
	"fmt"
	"io"
	"math/big"
	"os"
	"testing"
	"time"

	"github.com/evmos/ethermint/app"

	"github.com/stretchr/testify/require"
	"github.com/stretchr/testify/suite"

	sdk "github.com/cosmos/cosmos-sdk/types"

	evmkeeper "github.com/evmos/ethermint/x/evm/keeper"
	"github.com/evmos/ethermint/x/evm/statedb"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/consensus/ethash"
	ethcore "github.com/ethereum/go-ethereum/core"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	ethvm "github.com/ethereum/go-ethereum/core/vm"
	"github.com/ethereum/go-ethereum/crypto"
	ethparams "github.com/ethereum/go-ethereum/params"
	ethrlp "github.com/ethereum/go-ethereum/rlp"

	"github.com/evmos/ethermint/crypto/ethsecp256k1"
	"github.com/tendermint/tendermint/abci/types"
	"github.com/tendermint/tendermint/crypto/tmhash"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
	tmversion "github.com/tendermint/tendermint/proto/tendermint/version"
	"github.com/tendermint/tendermint/version"
)

var (
	flagBlockchain string

	rewardBig8  = big.NewInt(8)
	rewardBig32 = big.NewInt(32)
)

func init() {
	flag.StringVar(&flagBlockchain, "blockchain", "blockchain", "ethereum block export file (blocks to import)")
	testing.Init()
	flag.Parse()
}

type ImporterTestSuite struct {
	suite.Suite

	app *app.EthermintApp
	ctx sdk.Context
}

/// DoSetupTest setup test environment, it uses`require.TestingT` to support both `testing.T` and `testing.B`.
func (suite *ImporterTestSuite) DoSetupTest(t require.TestingT) {
	checkTx := false
	suite.app = app.Setup(checkTx, nil)
	// consensus key
	priv, err := ethsecp256k1.GenerateKey()
	require.NoError(t, err)
	consAddress := sdk.ConsAddress(priv.PubKey().Address())
	suite.ctx = suite.app.BaseApp.NewContext(checkTx, tmproto.Header{
		Height:          1,
		ChainID:         "ethermint_9000-1",
		Time:            time.Now().UTC(),
		ProposerAddress: consAddress.Bytes(),
		Version: tmversion.Consensus{
			Block: version.BlockProtocol,
		},
		LastBlockId: tmproto.BlockID{
			Hash: tmhash.Sum([]byte("block_id")),
			PartSetHeader: tmproto.PartSetHeader{
				Total: 11,
				Hash:  tmhash.Sum([]byte("partset_header")),
			},
		},
		AppHash:            tmhash.Sum([]byte("app")),
		DataHash:           tmhash.Sum([]byte("data")),
		EvidenceHash:       tmhash.Sum([]byte("evidence")),
		ValidatorsHash:     tmhash.Sum([]byte("validators")),
		NextValidatorsHash: tmhash.Sum([]byte("next_validators")),
		ConsensusHash:      tmhash.Sum([]byte("consensus")),
		LastResultsHash:    tmhash.Sum([]byte("last_result")),
	})
}

func (suite *ImporterTestSuite) SetupTest() {
	suite.DoSetupTest(suite.T())
}

func TestImporterTestSuite(t *testing.T) {
	suite.Run(t, new(ImporterTestSuite))
}

func (suite *ImporterTestSuite) TestImportBlocks() {
	chainContext := NewChainContext()
	chainConfig := ethparams.MainnetChainConfig
	vmConfig := ethvm.Config{}

	// open blockchain export file
	blockchainInput, err := os.Open(flagBlockchain)
	suite.Require().Nil(err)

	defer func() {
		err := blockchainInput.Close()
		suite.Require().NoError(err)
	}()

	stream := ethrlp.NewStream(blockchainInput, 0)
	startTime := time.Now()

	var block ethtypes.Block

	for {
		err := stream.Decode(&block)
		if err == io.EOF {
			break
		}

		suite.Require().NoError(err, "failed to decode block")

		var (
			usedGas = new(uint64)
			gp      = new(ethcore.GasPool).AddGas(block.GasLimit())
		)
		header := block.Header()
		chainContext.Coinbase = header.Coinbase

		chainContext.SetHeader(block.NumberU64(), header)
		tmheader := suite.ctx.BlockHeader()
		// fix due to that begin block can't have height 0
		tmheader.Height = int64(block.NumberU64()) + 1
		suite.app.BeginBlock(types.RequestBeginBlock{
			Header: tmheader,
		})
		ctx := suite.app.NewContext(false, tmheader)
		ctx = ctx.WithBlockHeight(tmheader.Height)
		vmdb := statedb.New(ctx, suite.app.EvmKeeper, statedb.NewEmptyTxConfig(common.BytesToHash(ctx.HeaderHash().Bytes())))

		if chainConfig.DAOForkSupport && chainConfig.DAOForkBlock != nil && chainConfig.DAOForkBlock.Cmp(block.Number()) == 0 {
			applyDAOHardFork(vmdb)
		}

		for _, tx := range block.Transactions() {

			receipt, gas, err := applyTransaction(
				ctx, chainConfig, chainContext, nil, gp, suite.app.EvmKeeper, vmdb, header, tx, usedGas, vmConfig,
			)
			suite.Require().NoError(err, "failed to apply tx at block %d; tx: %X; gas %d; receipt:%v", block.NumberU64(), tx.Hash(), gas, receipt)
			suite.Require().NotNil(receipt)
		}

		// apply mining rewards
		accumulateRewards(chainConfig, vmdb, header, block.Uncles())

		// simulate BaseApp EndBlocker commitment
		endBR := types.RequestEndBlock{Height: tmheader.Height}
		suite.app.EndBlocker(ctx, endBR)
		suite.app.Commit()

		// block debugging output
		if block.NumberU64() > 0 && block.NumberU64()%1000 == 0 {
			fmt.Printf("processed block: %d (time so far: %v)\n", block.NumberU64(), time.Since(startTime))
		}
	}
}

// accumulateRewards credits the coinbase of the given block with the mining
// reward. The total reward consists of the static block reward and rewards for
// included uncles. The coinbase of each uncle block is also rewarded.
func accumulateRewards(
	config *ethparams.ChainConfig, vmdb ethvm.StateDB,
	header *ethtypes.Header, uncles []*ethtypes.Header,
) {
	// select the correct block reward based on chain progression
	blockReward := ethash.FrontierBlockReward
	if config.IsByzantium(header.Number) {
		blockReward = ethash.ByzantiumBlockReward
	}

	// accumulate the rewards for the miner and any included uncles
	reward := new(big.Int).Set(blockReward)
	r := new(big.Int)

	for _, uncle := range uncles {
		r.Add(uncle.Number, rewardBig8)
		r.Sub(r, header.Number)
		r.Mul(r, blockReward)
		r.Div(r, rewardBig8)
		vmdb.AddBalance(uncle.Coinbase, r)
		r.Div(blockReward, rewardBig32)
		reward.Add(reward, r)
	}

	vmdb.AddBalance(header.Coinbase, reward)
}

// ApplyDAOHardFork modifies the state database according to the DAO hard-fork
// rules, transferring all balances of a set of DAO accounts to a single refund
// contract.
// Code is pulled from go-ethereum 1.9 because the StateDB interface does not include the
// SetBalance function implementation
// Ref: https://github.com/ethereum/go-ethereum/blob/52f2461774bcb8cdd310f86b4bc501df5b783852/consensus/misc/dao.go#L74
func applyDAOHardFork(vmdb ethvm.StateDB) {
	// Retrieve the contract to refund balances into
	if !vmdb.Exist(ethparams.DAORefundContract) {
		vmdb.CreateAccount(ethparams.DAORefundContract)
	}

	// Move every DAO account and extra-balance account funds into the refund contract
	for _, addr := range ethparams.DAODrainList() {
		vmdb.AddBalance(ethparams.DAORefundContract, vmdb.GetBalance(addr))
	}
}

// ApplyTransaction attempts to apply a transaction to the given state database
// and uses the input parameters for its environment. It returns the receipt
// for the transaction, gas used and an error if the transaction failed,
// indicating the block was invalid.
// Function is also pulled from go-ethereum 1.9 because of the incompatible usage
// Ref: https://github.com/ethereum/go-ethereum/blob/52f2461774bcb8cdd310f86b4bc501df5b783852/core/state_processor.go#L88
func applyTransaction(
	ctx sdk.Context, config *ethparams.ChainConfig, bc ethcore.ChainContext, author *common.Address,
	gp *ethcore.GasPool, evmKeeper *evmkeeper.Keeper, vmdb *statedb.StateDB, header *ethtypes.Header,
	tx *ethtypes.Transaction, usedGas *uint64, cfg ethvm.Config,
) (*ethtypes.Receipt, uint64, error) {
	msg, err := tx.AsMessage(ethtypes.MakeSigner(config, header.Number), sdk.ZeroInt().BigInt())
	if err != nil {
		return nil, 0, err
	}

	// Create a new context to be used in the EVM environment
	blockCtx := ethcore.NewEVMBlockContext(header, bc, author)
	txCtx := ethcore.NewEVMTxContext(msg)

	// Create a new environment which holds all relevant information
	// about the transaction and calling mechanisms.
	vmenv := ethvm.NewEVM(blockCtx, txCtx, vmdb, config, cfg)

	// Apply the transaction to the current state (included in the env)
	execResult, err := ethcore.ApplyMessage(vmenv, msg, gp)
	if err != nil {
		// NOTE: ignore vm execution error (eg: tx out of gas at block 51169) as we care only about state transition errors
		return &ethtypes.Receipt{}, 0, nil
	}

	root := common.Hash{}.Bytes()
	*usedGas += execResult.UsedGas

	// Create a new receipt for the transaction, storing the intermediate root and gas used by the tx
	// based on the eip phase, we're passing whether the root touch-delete accounts.
	receipt := ethtypes.NewReceipt(root, execResult.Failed(), *usedGas)
	receipt.TxHash = tx.Hash()
	receipt.GasUsed = execResult.UsedGas

	// if the transaction created a contract, store the creation address in the receipt.
	if msg.To() == nil {
		receipt.ContractAddress = crypto.CreateAddress(vmenv.TxContext.Origin, tx.Nonce())
	}

	// Set the receipt logs and create a bloom for filtering
	receipt.Logs = vmdb.Logs()
	receipt.Bloom = ethtypes.CreateBloom(ethtypes.Receipts{receipt})
	receipt.BlockHash = header.Hash()
	receipt.BlockNumber = header.Number
	receipt.TransactionIndex = uint(evmKeeper.GetTxIndexTransient(ctx))

	return receipt, execResult.UsedGas, err
}
