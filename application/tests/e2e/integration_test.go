package e2e_test

import (
	"bytes"
	"context"
	"fmt"
	"math/big"
	"testing"

	"github.com/cosmos/cosmos-sdk/client/flags"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	authtx "github.com/cosmos/cosmos-sdk/x/auth/tx"
	"github.com/evmos/ethermint/rpc/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	evmtypes "github.com/evmos/ethermint/x/evm/types"

	// . "github.com/onsi/ginkgo/v2"
	// . "github.com/onsi/gomega"

	"github.com/stretchr/testify/suite"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/ethclient/gethclient"
	"github.com/ethereum/go-ethereum/rpc"

	"github.com/evmos/ethermint/server/config"
	"github.com/evmos/ethermint/testutil/network"
	ethermint "github.com/evmos/ethermint/types"
)

// var _ = Describe("E2e", func() {
// })

// func TestJsonRpc(t *testing.T) {
// 	RegisterFailHandler(Fail)
// 	RunSpecs(t, "JSON-RPC Suite")
// }

// TODO: migrate to Ginkgo BDD
type IntegrationTestSuite struct {
	suite.Suite

	ctx     context.Context
	cfg     network.Config
	network *network.Network

	gethClient *gethclient.Client
	ethSigner  ethtypes.Signer
	rpcClient  *rpc.Client
}

func (s *IntegrationTestSuite) SetupSuite() {
	s.T().Log("setting up integration test suite")

	var err error
	cfg := network.DefaultConfig()
	cfg.JSONRPCAddress = config.DefaultJSONRPCAddress
	cfg.NumValidators = 1

	s.ctx = context.Background()
	s.cfg = cfg
	s.network, err = network.New(s.T(), s.T().TempDir(), cfg)
	s.Require().NoError(err)
	s.Require().NotNil(s.network)

	_, err = s.network.WaitForHeight(1)
	s.Require().NoError(err)

	address := fmt.Sprintf("http://%s", s.network.Validators[0].AppConfig.JSONRPC.Address)

	if s.network.Validators[0].JSONRPCClient == nil {
		s.network.Validators[0].JSONRPCClient, err = ethclient.Dial(address)
		s.Require().NoError(err)
	}

	rpcClient, err := rpc.DialContext(s.ctx, address)
	s.Require().NoError(err)
	s.rpcClient = rpcClient
	s.gethClient = gethclient.New(rpcClient)
	s.Require().NotNil(s.gethClient)
	chainId, err := ethermint.ParseChainID(s.cfg.ChainID)
	s.Require().NoError(err)
	s.ethSigner = ethtypes.LatestSignerForChainID(chainId)
}

func (s *IntegrationTestSuite) TestChainID() {
	genesisRes, err := s.network.Validators[0].RPCClient.Genesis(s.ctx)
	s.Require().NoError(err)

	chainID, err := s.network.Validators[0].JSONRPCClient.ChainID(s.ctx)
	s.Require().NoError(err)
	s.Require().NotNil(chainID)

	s.T().Log(chainID.Int64())

	eip155ChainID, err := ethermint.ParseChainID(s.network.Config.ChainID)
	s.Require().NoError(err)
	eip155ChainIDGen, err := ethermint.ParseChainID(genesisRes.Genesis.ChainID)
	s.Require().NoError(err)

	s.Require().Equal(chainID, eip155ChainID)
	s.Require().Equal(eip155ChainID, eip155ChainIDGen)
}

func (s *IntegrationTestSuite) TestNodeInfo() {
	// Not implemented
	info, err := s.gethClient.GetNodeInfo(s.ctx)
	s.Require().Error(err)
	s.Require().Empty(info)
}

func (s *IntegrationTestSuite) TestCreateAccessList() {
	// Not implemented
	accessList, _, _, err := s.gethClient.CreateAccessList(s.ctx, ethereum.CallMsg{})
	s.Require().Error(err)
	s.Require().Nil(accessList)
}

func (s *IntegrationTestSuite) TestBlock() {
	blockNum, err := s.network.Validators[0].JSONRPCClient.BlockNumber(s.ctx)
	s.Require().NoError(err)
	s.Require().NotZero(blockNum)

	bn := int64(blockNum)

	block, err := s.network.Validators[0].RPCClient.Block(s.ctx, &bn)
	s.Require().NoError(err)
	s.Require().NotNil(block)

	blockByNum, err := s.network.Validators[0].JSONRPCClient.BlockByNumber(s.ctx, new(big.Int).SetUint64(blockNum))
	s.Require().NoError(err)
	s.Require().NotNil(blockByNum)

	// compare the ethereum header with the tendermint header
	s.Require().Equal(block.Block.LastBlockID.Hash.Bytes(), blockByNum.Header().ParentHash.Bytes())

	hash := common.BytesToHash(block.Block.Hash())
	block, err = s.network.Validators[0].RPCClient.BlockByHash(s.ctx, hash.Bytes())
	s.Require().NoError(err)
	s.Require().NotNil(block)

	blockByHash, err := s.network.Validators[0].JSONRPCClient.BlockByHash(s.ctx, hash)
	s.Require().NoError(err)
	s.Require().NotNil(blockByHash)

	// Compare blockByNumber and blockByHash results
	s.Require().Equal(blockByNum.Hash(), blockByHash.Hash())
	s.Require().Equal(blockByNum.Transactions().Len(), blockByHash.Transactions().Len())
	s.Require().Equal(blockByNum.ParentHash(), blockByHash.ParentHash())
	s.Require().Equal(blockByNum.Root(), blockByHash.Root())

	// TODO: parse Tm block to Ethereum and compare
}

func (s *IntegrationTestSuite) TestBlockBloom() {
	transactionHash, _ := s.deployTestContract()
	receipt, err := s.network.Validators[0].JSONRPCClient.TransactionReceipt(s.ctx, transactionHash)
	s.Require().NoError(err)

	number := receipt.BlockNumber
	block, err := s.network.Validators[0].JSONRPCClient.BlockByNumber(s.ctx, number)
	s.Require().NoError(err)

	lb := block.Bloom().Big()
	s.Require().NotEqual(big.NewInt(0), lb)
	s.Require().Equal(transactionHash.String(), block.Transactions()[0].Hash().String())
}

func (s *IntegrationTestSuite) TestHeader() {
	blockNum, err := s.network.Validators[0].JSONRPCClient.BlockNumber(s.ctx)
	s.Require().NoError(err)
	s.Require().NotZero(blockNum)

	bn := int64(blockNum)

	block, err := s.network.Validators[0].RPCClient.Block(s.ctx, &bn)
	s.Require().NoError(err)
	s.Require().NotNil(block)

	hash := common.BytesToHash(block.Block.Hash())

	headerByNum, err := s.network.Validators[0].JSONRPCClient.HeaderByNumber(s.ctx, new(big.Int).SetUint64(blockNum))
	s.Require().NoError(err)
	s.Require().NotNil(headerByNum)

	headerByHash, err := s.network.Validators[0].JSONRPCClient.HeaderByHash(s.ctx, hash)
	s.Require().NoError(err)
	s.Require().NotNil(headerByHash)
	s.Require().Equal(headerByNum, headerByHash)

	// TODO: we need to convert the ethereum block and return the header
	// header := rpctypes.EthHeaderFromTendermint(block.Block.Header, ethtypes.Bloom{}, headerByHash.BaseFee)
	// s.Require().NotNil(header)
	// s.Require().Equal(headerByHash, header)
}

func (s *IntegrationTestSuite) TestSendRawTransaction() {
	testCases := []struct {
		name           string
		data           string
		expEncodingErr bool
		expError       bool
	}{
		{
			"rlp: expected input list for types.LegacyTx",
			"0x85b7119c978b22ac5188a554916d5eb9000567b87b3b8a536222c3c2e6549b98",
			true,
			false,
		},
		{
			"transaction type not supported",
			"0x1238b01bfc01e946ffdf8ccb087a072298cf9f141899c5c586550cc910b8c5aa",
			true,
			false,
		},
		{
			"rlp: element is larger than containing list",
			"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
			true,
			false,
		},
	}

	for _, tc := range testCases {
		s.Run(tc.name, func() {
			var data hexutil.Bytes

			err := data.UnmarshalText([]byte(tc.data))
			s.Require().NoError(err, data)

			tx := new(ethtypes.Transaction)
			err = tx.UnmarshalBinary(data)
			if tc.expEncodingErr {
				s.Require().Error(err)
				s.Require().Equal(tc.name, err.Error())
				return
			}

			s.Require().NoError(err)
			s.Require().NotEmpty(tx)

			hash := tx.Hash()

			err = s.network.Validators[0].JSONRPCClient.SendTransaction(s.ctx, tx)
			if tc.expError {
				s.Require().Error(err)
				return
			}

			s.Require().NoError(err)

			err = s.network.WaitForNextBlock()
			s.Require().NoError(err)

			expTx, isPending, err := s.network.Validators[0].JSONRPCClient.TransactionByHash(s.ctx, hash)

			if tc.expError {
				s.Require().Error(err)
				return
			}

			s.Require().NoError(err)
			s.Require().False(isPending)
			s.Require().Equal(tx, expTx)
		})
	}
}

func (s *IntegrationTestSuite) TestEstimateGasContractDeployment() {
	bytecode := "0x608060405234801561001057600080fd5b5060117f775a94827b8fd9b519d36cd827093c664f93347070a554f65e4a6f56cd73889860405160405180910390a260d08061004d6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063eb8ac92114602d575b600080fd5b606060048036036040811015604157600080fd5b8101908080359060200190929190803590602001909291905050506062565b005b8160008190555080827ff3ca124a697ba07e8c5e80bebcfcc48991fc16a63170e8a9206e30508960d00360405160405180910390a3505056fea265627a7a723158201d94d2187aaf3a6790527b615fcc40970febf0385fa6d72a2344848ebd0df3e964736f6c63430005110032"
	expectedGas := uint64(0x1879c)

	var data hexutil.Bytes

	err := data.UnmarshalText([]byte(bytecode))

	s.Require().NoError(err, data)

	gas, err := s.network.Validators[0].JSONRPCClient.EstimateGas(s.ctx, ethereum.CallMsg{
		Data: data,
	})

	s.Require().NoError(err)
	s.Require().Equal(expectedGas, gas)
}

func (s *IntegrationTestSuite) TestSendTransactionContractDeploymentNoGas() {
	bytecode := "0x6080604052348015600f57600080fd5b5060117f775a94827b8fd9b519d36cd827093c664f93347070a554f65e4a6f56cd73889860405160405180910390a2603580604b6000396000f3fe6080604052600080fdfea165627a7a723058206cab665f0f557620554bb45adf266708d2bd349b8a4314bdff205ee8440e3c240029"

	var data hexutil.Bytes
	err := data.UnmarshalText([]byte(bytecode))

	chainID, err := s.network.Validators[0].JSONRPCClient.ChainID(s.ctx)
	s.Require().NoError(err)

	owner := common.BytesToAddress(s.network.Validators[0].Address)
	nonce := s.getAccountNonce(owner)
	contractDeployTx := evmtypes.NewTxContract(
		chainID,
		nonce,
		nil,    // amount
		0x5208, // gasLimit
		nil,    // gasPrice
		nil, nil,
		data, // input
		nil,  // accesses
	)
	contractDeployTx.From = owner.Hex()
	err = contractDeployTx.Sign(s.ethSigner, s.network.Validators[0].ClientCtx.Keyring)
	s.Require().NoError(err)

	err = s.network.Validators[0].JSONRPCClient.SendTransaction(s.ctx, contractDeployTx.AsTransaction())
	s.Require().Error(err)
}

func (s *IntegrationTestSuite) TestBlockTransactionCount() {
	// start with clean block
	err := s.network.WaitForNextBlock()
	s.Require().NoError(err)

	signedTx := s.signValidTx(common.HexToAddress("0x378c50D9264C63F3F92B806d4ee56E9D86FfB3Ec"), big.NewInt(10))
	err = s.network.Validators[0].JSONRPCClient.SendTransaction(s.ctx, signedTx.AsTransaction())
	s.Require().NoError(err)

	s.waitForTransaction()
	receipt := s.expectSuccessReceipt(signedTx.AsTransaction().Hash())
	// TransactionCount endpoint represents eth_getTransactionCountByHash
	count, err := s.network.Validators[0].JSONRPCClient.TransactionCount(s.ctx, receipt.BlockHash)
	s.Require().NoError(err)
	s.Require().Equal(uint(1), count)

	// expect 0 response with random block hash
	anyBlockHash := common.HexToHash("0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35")
	count, err = s.network.Validators[0].JSONRPCClient.TransactionCount(s.ctx, anyBlockHash)
	s.Require().NoError(err)
	s.Require().NotEqual(uint(0), 0)
}

func (s *IntegrationTestSuite) TestGetTransactionByBlockHashAndIndex() {
	signedTx := s.signValidTx(common.HexToAddress("0x378c50D9264C63F3F92B806d4ee56E9D86FfB3Ec"), big.NewInt(10))
	err := s.network.Validators[0].JSONRPCClient.SendTransaction(s.ctx, signedTx.AsTransaction())
	s.Require().NoError(err)

	s.waitForTransaction()
	receipt := s.expectSuccessReceipt(signedTx.AsTransaction().Hash())

	// TransactionInBlock endpoint represents eth_getTransactionByBlockHashAndIndex
	transaction, err := s.network.Validators[0].JSONRPCClient.TransactionInBlock(s.ctx, receipt.BlockHash, 0)
	s.Require().NoError(err)
	s.Require().NotNil(transaction)
	s.Require().Equal(receipt.TxHash, transaction.Hash())
}

func (s *IntegrationTestSuite) TestGetBalance() {
	blockNumber, err := s.network.Validators[0].JSONRPCClient.BlockNumber(s.ctx)
	s.Require().NoError(err)

	initialBalance, err := s.network.Validators[0].JSONRPCClient.BalanceAt(s.ctx, common.HexToAddress("0x378c50D9264C63F3F92B806d4ee56E9D86FfB3Ed"), big.NewInt(int64(blockNumber)))
	s.Require().NoError(err)

	amountToTransfer := big.NewInt(10)
	signedTx := s.signValidTx(common.HexToAddress("0x378c50D9264C63F3F92B806d4ee56E9D86FfB3Ed"), amountToTransfer)
	err = s.network.Validators[0].JSONRPCClient.SendTransaction(s.ctx, signedTx.AsTransaction())
	s.Require().NoError(err)

	s.waitForTransaction()
	receipt := s.expectSuccessReceipt(signedTx.AsTransaction().Hash())
	finalBalance, err := s.network.Validators[0].JSONRPCClient.BalanceAt(s.ctx, common.HexToAddress("0x378c50D9264C63F3F92B806d4ee56E9D86FfB3Ed"), receipt.BlockNumber)
	s.Require().NoError(err)

	var result big.Int
	s.Require().Equal(result.Add(initialBalance, amountToTransfer), finalBalance)

	// test old balance is still the same
	prevBalance, err := s.network.Validators[0].JSONRPCClient.BalanceAt(s.ctx, common.HexToAddress("0x378c50D9264C63F3F92B806d4ee56E9D86FfB3Ed"), big.NewInt(int64(blockNumber)))
	s.Require().NoError(err)
	s.Require().Equal(initialBalance, prevBalance)
}

func (s *IntegrationTestSuite) TestGetLogs() {
	// TODO create tests to cover different filterQuery params
	_, contractAddr := s.deployERC20Contract()

	blockNum, err := s.network.Validators[0].JSONRPCClient.BlockNumber(s.ctx)
	s.Require().NoError(err)

	s.transferERC20Transaction(contractAddr, common.HexToAddress("0x378c50D9264C63F3F92B806d4ee56E9D86FfB3Ec"), big.NewInt(10))
	filterQuery := ethereum.FilterQuery{
		FromBlock: big.NewInt(int64(blockNum)),
	}

	logs, err := s.network.Validators[0].JSONRPCClient.FilterLogs(s.ctx, filterQuery)
	s.Require().NoError(err)
	s.Require().NotNil(logs)
	s.Require().Equal(1, len(logs))

	expectedTopics := []common.Hash{
		common.HexToHash("0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"),
		common.HexToHash("0x000000000000000000000000" + fmt.Sprintf("%x", common.BytesToAddress(s.network.Validators[0].Address))),
		common.HexToHash("0x000000000000000000000000378c50d9264c63f3f92b806d4ee56e9d86ffb3ec"),
	}

	s.Require().Equal(expectedTopics, logs[0].Topics)
}

func (s *IntegrationTestSuite) TestTransactionReceiptERC20Transfer() {
	// start with clean block
	err := s.network.WaitForNextBlock()
	s.Require().NoError(err)
	// deploy erc20 contract
	_, contractAddr := s.deployERC20Contract()

	amount := big.NewInt(10)
	hash := s.transferERC20Transaction(contractAddr, common.HexToAddress("0x378c50D9264C63F3F92B806d4ee56E9D86FfB3Ec"), amount)
	transferReceipt := s.expectSuccessReceipt(hash)
	logs := transferReceipt.Logs
	s.Require().Equal(1, len(logs))
	s.Require().Equal(contractAddr, logs[0].Address)

	s.Require().Equal(amount, big.NewInt(0).SetBytes(logs[0].Data))

	s.Require().Equal(false, logs[0].Removed)
	s.Require().Equal(uint(0x0), logs[0].Index)
	s.Require().Equal(uint(0x0), logs[0].TxIndex)

	expectedTopics := []common.Hash{
		common.HexToHash("0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"),
		common.HexToHash("0x000000000000000000000000" + fmt.Sprintf("%x", common.BytesToAddress(s.network.Validators[0].Address))),
		common.HexToHash("0x000000000000000000000000378c50d9264c63f3f92b806d4ee56e9d86ffb3ec"),
	}
	s.Require().Equal(expectedTopics, logs[0].Topics)
}

func (s *IntegrationTestSuite) TestGetCode() {
	expectedCode := "0x608060405234801561001057600080fd5b50600436106100365760003560e01c80636d4ce63c1461003b578063d04ad49514610059575b600080fd5b610043610075565b6040516100509190610132565b60405180910390f35b610073600480360381019061006e91906100f6565b61009e565b005b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000813590506100f081610172565b92915050565b60006020828403121561010c5761010b61016d565b5b600061011a848285016100e1565b91505092915050565b61012c8161014d565b82525050565b60006020820190506101476000830184610123565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600080fd5b61017b8161014d565b811461018657600080fd5b5056fea26469706673582212204c98c8f28598d29acc328cb34578de54cbed70b20bf9364897d48b2381f0c78b64736f6c63430008070033"

	_, addr := s.deploySimpleStorageContract()
	block, err := s.network.Validators[0].JSONRPCClient.BlockNumber(s.ctx)
	s.Require().NoError(err)
	code, err := s.network.Validators[0].JSONRPCClient.CodeAt(s.ctx, addr, big.NewInt(int64(block)))
	s.Require().NoError(err)
	s.Require().Equal(expectedCode, hexutil.Encode(code))
}

func (s *IntegrationTestSuite) TestGetStorageAt() {
	expectedStore := []byte{0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x5}
	_, addr := s.deploySimpleStorageContract()

	s.storeValueStorageContract(addr, big.NewInt(5))
	block, err := s.network.Validators[0].JSONRPCClient.BlockNumber(s.ctx)
	s.Require().NoError(err)

	storage, err := s.network.Validators[0].JSONRPCClient.StorageAt(s.ctx, addr, common.BigToHash(big.NewInt(0)), big.NewInt(int64(block)))
	s.Require().NoError(err)
	s.Require().NotNil(storage)
	s.Require().True(bytes.Equal(expectedStore, storage))
}

func (s *IntegrationTestSuite) getGasPrice() *big.Int {
	gasPrice, err := s.network.Validators[0].JSONRPCClient.SuggestGasPrice(s.ctx)
	s.Require().NoError(err)
	return gasPrice
}

func (s *IntegrationTestSuite) getAccountNonce(addr common.Address) uint64 {
	nonce, err := s.network.Validators[0].JSONRPCClient.NonceAt(s.ctx, addr, nil)
	s.Require().NoError(err)
	return nonce
}

func (s *IntegrationTestSuite) signValidTx(to common.Address, amount *big.Int) *evmtypes.MsgEthereumTx {
	chainId, err := s.network.Validators[0].JSONRPCClient.ChainID(s.ctx)
	s.Require().NoError(err)

	gasPrice := s.getGasPrice()
	from := common.BytesToAddress(s.network.Validators[0].Address)
	nonce := s.getAccountNonce(from)

	msgTx := evmtypes.NewTx(
		chainId,
		nonce,
		&to,
		amount,
		100000,
		gasPrice,
		big.NewInt(200),
		nil,
		nil,
		nil,
	)
	msgTx.From = from.Hex()
	err = msgTx.Sign(s.ethSigner, s.network.Validators[0].ClientCtx.Keyring)
	s.Require().NoError(err)
	return msgTx
}

func (s *IntegrationTestSuite) signValidContractDeploymentTx(input []byte) *evmtypes.MsgEthereumTx {
	chainId, err := s.network.Validators[0].JSONRPCClient.ChainID(s.ctx)
	s.Require().NoError(err)

	gasPrice := s.getGasPrice()
	from := common.BytesToAddress(s.network.Validators[0].Address)
	nonce := s.getAccountNonce(from)

	msgTx := evmtypes.NewTxContract(
		chainId,
		nonce,
		big.NewInt(10),
		134216,
		gasPrice,
		big.NewInt(200),
		nil,
		input,
		nil,
	)
	msgTx.From = from.Hex()
	err = msgTx.Sign(s.ethSigner, s.network.Validators[0].ClientCtx.Keyring)
	s.Require().NoError(err)
	return msgTx
}

func (s *IntegrationTestSuite) deployTestContract() (transaction common.Hash, contractAddr common.Address) {
	bytecode := "0x6080604052348015600f57600080fd5b5060117f775a94827b8fd9b519d36cd827093c664f93347070a554f65e4a6f56cd73889860405160405180910390a2603580604b6000396000f3fe6080604052600080fdfea165627a7a723058206cab665f0f557620554bb45adf266708d2bd349b8a4314bdff205ee8440e3c240029"

	var data hexutil.Bytes
	err := data.UnmarshalText([]byte(bytecode))
	s.Require().NoError(err)

	return s.deployContract(data)
}

func (s *IntegrationTestSuite) deployContract(data []byte) (transaction common.Hash, contractAddr common.Address) {
	chainID, err := s.network.Validators[0].JSONRPCClient.ChainID(s.ctx)
	s.Require().NoError(err)

	owner := common.BytesToAddress(s.network.Validators[0].Address)
	nonce := s.getAccountNonce(owner)

	gas, err := s.network.Validators[0].JSONRPCClient.EstimateGas(s.ctx, ethereum.CallMsg{
		From: owner,
		Data: data,
	})
	s.Require().NoError(err)

	gasPrice := s.getGasPrice()

	contractDeployTx := evmtypes.NewTxContract(
		chainID,
		nonce,
		nil,      // amount
		gas,      // gasLimit
		gasPrice, // gasPrice
		nil, nil,
		data, // input
		nil,  // accesses
	)

	contractDeployTx.From = owner.Hex()
	err = contractDeployTx.Sign(s.ethSigner, s.network.Validators[0].ClientCtx.Keyring)
	s.Require().NoError(err)
	err = s.network.Validators[0].JSONRPCClient.SendTransaction(s.ctx, contractDeployTx.AsTransaction())
	s.Require().NoError(err)

	s.waitForTransaction()

	receipt := s.expectSuccessReceipt(contractDeployTx.AsTransaction().Hash())
	s.Require().NotNil(receipt.ContractAddress)
	return contractDeployTx.AsTransaction().Hash(), receipt.ContractAddress
}

// Deploys erc20 contract, commits block and returns contract address
func (s *IntegrationTestSuite) deployERC20Contract() (transaction common.Hash, contractAddr common.Address) {
	owner := common.BytesToAddress(s.network.Validators[0].Address)
	supply := sdk.NewIntWithDecimal(1000, 18).BigInt()

	ctorArgs, err := evmtypes.ERC20Contract.ABI.Pack("", owner, supply)
	s.Require().NoError(err)

	data := append(evmtypes.ERC20Contract.Bin, ctorArgs...)
	return s.deployContract(data)
}

// Deploys SimpleStorageContract and,commits block and returns contract address
func (s *IntegrationTestSuite) deploySimpleStorageContract() (transaction common.Hash, contractAddr common.Address) {
	ctorArgs, err := evmtypes.SimpleStorageContract.ABI.Pack("")
	s.Require().NoError(err)

	data := append(evmtypes.SimpleStorageContract.Bin, ctorArgs...)
	return s.deployContract(data)
}

func (s *IntegrationTestSuite) expectSuccessReceipt(hash common.Hash) *ethtypes.Receipt {
	receipt, err := s.network.Validators[0].JSONRPCClient.TransactionReceipt(s.ctx, hash)
	s.Require().NoError(err)
	s.Require().NotNil(receipt)
	s.Require().Equal(uint64(0x1), receipt.Status)
	return receipt
}

func (s *IntegrationTestSuite) transferERC20Transaction(contractAddr, to common.Address, amount *big.Int) common.Hash {
	chainID, err := s.network.Validators[0].JSONRPCClient.ChainID(s.ctx)
	s.Require().NoError(err)

	transferData, err := evmtypes.ERC20Contract.ABI.Pack("transfer", to, amount)
	s.Require().NoError(err)
	owner := common.BytesToAddress(s.network.Validators[0].Address)
	nonce := s.getAccountNonce(owner)

	gas, err := s.network.Validators[0].JSONRPCClient.EstimateGas(s.ctx, ethereum.CallMsg{
		To:   &contractAddr,
		From: owner,
		Data: transferData,
	})
	s.Require().NoError(err)

	gasPrice := s.getGasPrice()
	ercTransferTx := evmtypes.NewTx(
		chainID,
		nonce,
		&contractAddr,
		nil,
		gas,
		gasPrice,
		nil, nil,
		transferData,
		nil,
	)

	ercTransferTx.From = owner.Hex()
	err = ercTransferTx.Sign(s.ethSigner, s.network.Validators[0].ClientCtx.Keyring)
	s.Require().NoError(err)
	err = s.network.Validators[0].JSONRPCClient.SendTransaction(s.ctx, ercTransferTx.AsTransaction())
	s.Require().NoError(err)

	s.waitForTransaction()

	receipt := s.expectSuccessReceipt(ercTransferTx.AsTransaction().Hash())
	s.Require().NotEmpty(receipt.Logs)
	return ercTransferTx.AsTransaction().Hash()
}

func (s *IntegrationTestSuite) storeValueStorageContract(contractAddr common.Address, amount *big.Int) common.Hash {
	chainID, err := s.network.Validators[0].JSONRPCClient.ChainID(s.ctx)
	s.Require().NoError(err)

	transferData, err := evmtypes.SimpleStorageContract.ABI.Pack("store", amount)
	s.Require().NoError(err)
	owner := common.BytesToAddress(s.network.Validators[0].Address)
	nonce := s.getAccountNonce(owner)

	gas, err := s.network.Validators[0].JSONRPCClient.EstimateGas(s.ctx, ethereum.CallMsg{
		To:   &contractAddr,
		From: owner,
		Data: transferData,
	})
	s.Require().NoError(err)

	gasPrice := s.getGasPrice()
	ercTransferTx := evmtypes.NewTx(
		chainID,
		nonce,
		&contractAddr,
		nil,
		gas,
		gasPrice,
		nil, nil,
		transferData,
		nil,
	)

	ercTransferTx.From = owner.Hex()
	err = ercTransferTx.Sign(s.ethSigner, s.network.Validators[0].ClientCtx.Keyring)
	s.Require().NoError(err)
	err = s.network.Validators[0].JSONRPCClient.SendTransaction(s.ctx, ercTransferTx.AsTransaction())
	s.Require().NoError(err)

	s.waitForTransaction()

	s.expectSuccessReceipt(ercTransferTx.AsTransaction().Hash())
	return ercTransferTx.AsTransaction().Hash()
}

// waits 2 blocks time to keep tests stable
func (s *IntegrationTestSuite) waitForTransaction() {
	err := s.network.WaitForNextBlock()
	err = s.network.WaitForNextBlock()
	s.Require().NoError(err)
}

func TestIntegrationTestSuite(t *testing.T) {
	suite.Run(t, new(IntegrationTestSuite))
}

func (s *IntegrationTestSuite) TestWeb3Sha3() {
	testCases := []struct {
		name     string
		arg      string
		expected string
	}{
		{
			"normal input",
			"0xabcd1234567890",
			"0x23e7488ec9097f0126b0338926bfaeb5264b01cb162a0fd4a6d76e1081c2b24a",
		},
		{
			"0x case",
			"0x",
			"0x39bef1777deb3dfb14f64b9f81ced092c501fee72f90e93d03bb95ee89df9837",
		},
		{
			"empty string case",
			"",
			"0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
		},
	}

	for _, tc := range testCases {
		s.Run(tc.name, func() {
			var result string

			err := s.rpcClient.Call(&result, "web3_sha3", tc.arg)
			s.Require().NoError(err)
			s.Require().Equal(tc.expected, result)
		})
	}
}

func (s *IntegrationTestSuite) TestPendingTransactionFilter() {
	var (
		filterID     string
		filterResult []common.Hash
	)
	// create filter
	err := s.rpcClient.Call(&filterID, "eth_newPendingTransactionFilter")
	s.Require().NoError(err)
	// check filter result is empty
	err = s.rpcClient.Call(&filterResult, "eth_getFilterChanges", filterID)
	s.Require().NoError(err)
	s.Require().Empty(filterResult)
	// send transaction
	signedTx := s.signValidTx(common.HexToAddress("0x378c50D9264C63F3F92B806d4ee56E9D86FfB3Ec"), big.NewInt(10)).AsTransaction()
	err = s.network.Validators[0].JSONRPCClient.SendTransaction(s.ctx, signedTx)
	s.Require().NoError(err)

	s.waitForTransaction()
	s.expectSuccessReceipt(signedTx.Hash())

	// check filter changes match the tx hash
	err = s.rpcClient.Call(&filterResult, "eth_getFilterChanges", filterID)
	s.Require().NoError(err)
	s.Require().Equal([]common.Hash{signedTx.Hash()}, filterResult)
}

// TODO: add transactionIndex tests once we have OpenRPC interfaces
func (s *IntegrationTestSuite) TestBatchETHTransactions() {
	const ethTxs = 2
	txBuilder := s.network.Validators[0].ClientCtx.TxConfig.NewTxBuilder()
	builder, ok := txBuilder.(authtx.ExtensionOptionsTxBuilder)
	s.Require().True(ok)

	recipient := common.HexToAddress("0x378c50D9264C63F3F92B806d4ee56E9D86FfB3Ec")
	accountNonce := s.getAccountNonce(recipient)
	feeAmount := sdk.ZeroInt()

	var gasLimit uint64
	var msgs []sdk.Msg

	for i := 0; i < ethTxs; i++ {
		chainId, err := s.network.Validators[0].JSONRPCClient.ChainID(s.ctx)
		s.Require().NoError(err)

		gasPrice := s.getGasPrice()
		from := common.BytesToAddress(s.network.Validators[0].Address)
		nonce := accountNonce + uint64(i) + 1

		msgTx := evmtypes.NewTx(
			chainId,
			nonce,
			&recipient,
			big.NewInt(10),
			100000,
			gasPrice,
			big.NewInt(200),
			nil,
			nil,
			nil,
		)
		msgTx.From = from.Hex()
		err = msgTx.Sign(s.ethSigner, s.network.Validators[0].ClientCtx.Keyring)
		s.Require().NoError(err)

		// A valid msg should have empty `From`
		msgTx.From = ""
		msgs = append(msgs, msgTx.GetMsgs()...)
		txData, err := evmtypes.UnpackTxData(msgTx.Data)
		s.Require().NoError(err)
		feeAmount = feeAmount.Add(sdk.NewIntFromBigInt(txData.Fee()))
		gasLimit = gasLimit + txData.GetGas()
	}

	option, err := codectypes.NewAnyWithValue(&evmtypes.ExtensionOptionsEthereumTx{})
	s.Require().NoError(err)

	queryClient := types.NewQueryClient(s.network.Validators[0].ClientCtx)
	res, err := queryClient.Params(s.ctx, &evmtypes.QueryParamsRequest{})

	fees := make(sdk.Coins, 0)
	if feeAmount.Sign() > 0 {
		fees = fees.Add(sdk.Coin{Denom: res.Params.EvmDenom, Amount: feeAmount})
	}

	builder.SetExtensionOptions(option)
	err = builder.SetMsgs(msgs...)
	s.Require().NoError(err)
	builder.SetFeeAmount(fees)
	builder.SetGasLimit(gasLimit)

	tx := builder.GetTx()
	txEncoder := s.network.Validators[0].ClientCtx.TxConfig.TxEncoder()
	txBytes, err := txEncoder(tx)
	s.Require().NoError(err)

	syncCtx := s.network.Validators[0].ClientCtx.WithBroadcastMode(flags.BroadcastBlock)
	txResponse, err := syncCtx.BroadcastTx(txBytes)
	s.Require().NoError(err)
	s.Require().Equal(uint32(0), txResponse.Code)

	block, err := s.network.Validators[0].JSONRPCClient.BlockByNumber(s.ctx, big.NewInt(txResponse.Height))
	s.Require().NoError(err)

	txs := block.Transactions()
	s.Require().Len(txs, ethTxs)
	for i, tx := range txs {
		s.Require().Equal(accountNonce+uint64(i)+1, tx.Nonce())
	}
}

func (s *IntegrationTestSuite) TestGasConsumptionOnNormalTransfer() {
	testCases := []struct {
		name            string
		gasLimit        uint64
		expectedGasUsed uint64
	}{
		{
			"gas used is the same as gas limit",
			21000,
			21000,
		},
		{
			"gas used is half of Gas limit",
			70000,
			35000,
		},
		{
			"gas used is less than half of gasLimit",
			30000,
			21000,
		},
	}

	recipient := common.HexToAddress("0x378c50D9264C63F3F92B806d4ee56E9D86FfB3Ec")
	chainID, err := s.network.Validators[0].JSONRPCClient.ChainID(s.ctx)
	s.Require().NoError(err)
	from := common.BytesToAddress(s.network.Validators[0].Address)
	for _, tc := range testCases {
		s.Run(tc.name, func() {
			nonce := s.getAccountNonce(from)
			s.Require().NoError(err)
			gasPrice := s.getGasPrice()
			msgTx := evmtypes.NewTx(
				chainID,
				nonce,
				&recipient,
				nil,
				tc.gasLimit,
				gasPrice,
				nil, nil,
				nil,
				nil,
			)
			msgTx.From = from.Hex()
			err = msgTx.Sign(s.ethSigner, s.network.Validators[0].ClientCtx.Keyring)
			s.Require().NoError(err)
			err := s.network.Validators[0].JSONRPCClient.SendTransaction(s.ctx, msgTx.AsTransaction())
			s.Require().NoError(err)
			s.waitForTransaction()
			receipt := s.expectSuccessReceipt(msgTx.AsTransaction().Hash())
			s.Equal(receipt.GasUsed, tc.expectedGasUsed)
		})
	}
}
