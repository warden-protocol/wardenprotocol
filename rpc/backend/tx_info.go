package backend

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
	rpctypes "github.com/evmos/ethermint/rpc/types"
	ethermint "github.com/evmos/ethermint/types"
	evmtypes "github.com/evmos/ethermint/x/evm/types"
	"github.com/pkg/errors"
	tmrpctypes "github.com/tendermint/tendermint/rpc/core/types"
)

// GetTransactionByHash returns the Ethereum format transaction identified by Ethereum transaction hash
func (b *Backend) GetTransactionByHash(txHash common.Hash) (*rpctypes.RPCTransaction, error) {
	res, err := b.GetTxByEthHash(txHash)
	hexTx := txHash.Hex()

	if err != nil {
		return b.getTransactionByHashPending(txHash)
	}

	block, err := b.GetTendermintBlockByNumber(rpctypes.BlockNumber(res.Height))
	if err != nil {
		return nil, err
	}

	tx, err := b.clientCtx.TxConfig.TxDecoder()(block.Block.Txs[res.TxIndex])
	if err != nil {
		return nil, err
	}

	// the `res.MsgIndex` is inferred from tx index, should be within the bound.
	msg, ok := tx.GetMsgs()[res.MsgIndex].(*evmtypes.MsgEthereumTx)
	if !ok {
		return nil, errors.New("invalid ethereum tx")
	}

	blockRes, err := b.GetTendermintBlockResultByNumber(&block.Block.Height)
	if err != nil {
		b.logger.Debug("block result not found", "height", block.Block.Height, "error", err.Error())
		return nil, nil
	}

	if res.EthTxIndex == -1 {
		// Fallback to find tx index by iterating all valid eth transactions
		msgs := b.GetEthereumMsgsFromTendermintBlock(block, blockRes)
		for i := range msgs {
			if msgs[i].Hash == hexTx {
				res.EthTxIndex = int32(i)
				break
			}
		}
	}
	// if we still unable to find the eth tx index, return error, shouldn't happen.
	if res.EthTxIndex == -1 {
		return nil, errors.New("can't find index of ethereum tx")
	}

	baseFee, err := b.BaseFee(blockRes)
	if err != nil {
		// handle the error for pruned node.
		b.logger.Error("failed to fetch Base Fee from prunned block. Check node prunning configuration", "height", blockRes.Height, "error", err)
	}

	return rpctypes.NewTransactionFromMsg(
		msg,
		common.BytesToHash(block.BlockID.Hash.Bytes()),
		uint64(res.Height),
		uint64(res.EthTxIndex),
		baseFee,
	)
}

// getTransactionByHashPending find pending tx from mempool
func (b *Backend) getTransactionByHashPending(txHash common.Hash) (*rpctypes.RPCTransaction, error) {
	hexTx := txHash.Hex()
	// try to find tx in mempool
	txs, err := b.PendingTransactions()
	if err != nil {
		b.logger.Debug("tx not found", "hash", hexTx, "error", err.Error())
		return nil, nil
	}

	for _, tx := range txs {
		msg, err := evmtypes.UnwrapEthereumMsg(tx, txHash)
		if err != nil {
			// not ethereum tx
			continue
		}

		if msg.Hash == hexTx {
			// use zero block values since it's not included in a block yet
			rpctx, err := rpctypes.NewTransactionFromMsg(
				msg,
				common.Hash{},
				uint64(0),
				uint64(0),
				nil,
			)
			if err != nil {
				return nil, err
			}
			return rpctx, nil
		}
	}

	b.logger.Debug("tx not found", "hash", hexTx)
	return nil, nil
}

// GetTransactionReceipt returns the transaction receipt identified by hash.
func (b *Backend) GetTransactionReceipt(hash common.Hash) (map[string]interface{}, error) {
	hexTx := hash.Hex()
	b.logger.Debug("eth_getTransactionReceipt", "hash", hexTx)

	res, err := b.GetTxByEthHash(hash)
	if err != nil {
		b.logger.Debug("tx not found", "hash", hexTx, "error", err.Error())
		return nil, nil
	}

	resBlock, err := b.GetTendermintBlockByNumber(rpctypes.BlockNumber(res.Height))
	if err != nil {
		b.logger.Debug("block not found", "height", res.Height, "error", err.Error())
		return nil, nil
	}
	tx, err := b.clientCtx.TxConfig.TxDecoder()(resBlock.Block.Txs[res.TxIndex])
	if err != nil {
		b.logger.Debug("decoding failed", "error", err.Error())
		return nil, fmt.Errorf("failed to decode tx: %w", err)
	}
	ethMsg := tx.GetMsgs()[res.MsgIndex].(*evmtypes.MsgEthereumTx)

	txData, err := evmtypes.UnpackTxData(ethMsg.Data)
	if err != nil {
		b.logger.Error("failed to unpack tx data", "error", err.Error())
		return nil, err
	}

	cumulativeGasUsed := uint64(0)
	blockRes, err := b.GetTendermintBlockResultByNumber(&res.Height)
	if err != nil {
		b.logger.Debug("failed to retrieve block results", "height", res.Height, "error", err.Error())
		return nil, nil
	}
	for _, txResult := range blockRes.TxsResults[0:res.TxIndex] {
		cumulativeGasUsed += uint64(txResult.GasUsed)
	}
	cumulativeGasUsed += res.CumulativeGasUsed

	var status hexutil.Uint
	if res.Failed {
		status = hexutil.Uint(ethtypes.ReceiptStatusFailed)
	} else {
		status = hexutil.Uint(ethtypes.ReceiptStatusSuccessful)
	}

	chainID, err := b.ChainID()
	if err != nil {
		return nil, err
	}

	from, err := ethMsg.GetSender(chainID.ToInt())
	if err != nil {
		return nil, err
	}

	// parse tx logs from events
	logs, err := TxLogsFromEvents(blockRes.TxsResults[res.TxIndex].Events, int(res.MsgIndex))
	if err != nil {
		b.logger.Debug("failed to parse logs", "hash", hexTx, "error", err.Error())
	}

	if res.EthTxIndex == -1 {
		// Fallback to find tx index by iterating all valid eth transactions
		msgs := b.GetEthereumMsgsFromTendermintBlock(resBlock, blockRes)
		for i := range msgs {
			if msgs[i].Hash == hexTx {
				res.EthTxIndex = int32(i)
				break
			}
		}
	}
	// return error if still unable to find the eth tx index
	if res.EthTxIndex == -1 {
		return nil, errors.New("can't find index of ethereum tx")
	}

	receipt := map[string]interface{}{
		// Consensus fields: These fields are defined by the Yellow Paper
		"status":            status,
		"cumulativeGasUsed": hexutil.Uint64(cumulativeGasUsed),
		"logsBloom":         ethtypes.BytesToBloom(ethtypes.LogsBloom(logs)),
		"logs":              logs,

		// Implementation fields: These fields are added by geth when processing a transaction.
		// They are stored in the chain database.
		"transactionHash": hash,
		"contractAddress": nil,
		"gasUsed":         hexutil.Uint64(res.GasUsed),

		// Inclusion information: These fields provide information about the inclusion of the
		// transaction corresponding to this receipt.
		"blockHash":        common.BytesToHash(resBlock.Block.Header.Hash()).Hex(),
		"blockNumber":      hexutil.Uint64(res.Height),
		"transactionIndex": hexutil.Uint64(res.EthTxIndex),

		// sender and receiver (contract or EOA) addreses
		"from": from,
		"to":   txData.GetTo(),
	}

	if logs == nil {
		receipt["logs"] = [][]*ethtypes.Log{}
	}

	// If the ContractAddress is 20 0x0 bytes, assume it is not a contract creation
	if txData.GetTo() == nil {
		receipt["contractAddress"] = crypto.CreateAddress(from, txData.GetNonce())
	}

	if dynamicTx, ok := txData.(*evmtypes.DynamicFeeTx); ok {
		baseFee, err := b.BaseFee(blockRes)
		if err != nil {
			// tolerate the error for pruned node.
			b.logger.Error("fetch basefee failed, node is pruned?", "height", res.Height, "error", err)
		} else {
			receipt["effectiveGasPrice"] = hexutil.Big(*dynamicTx.GetEffectiveGasPrice(baseFee))
		}
	}

	return receipt, nil
}

// GetTransactionByBlockHashAndIndex returns the transaction identified by hash and index.
func (b *Backend) GetTransactionByBlockHashAndIndex(hash common.Hash, idx hexutil.Uint) (*rpctypes.RPCTransaction, error) {
	b.logger.Debug("eth_getTransactionByBlockHashAndIndex", "hash", hash.Hex(), "index", idx)

	block, err := b.clientCtx.Client.BlockByHash(b.ctx, hash.Bytes())
	if err != nil {
		b.logger.Debug("block not found", "hash", hash.Hex(), "error", err.Error())
		return nil, nil
	}

	if block.Block == nil {
		b.logger.Debug("block not found", "hash", hash.Hex())
		return nil, nil
	}

	return b.GetTransactionByBlockAndIndex(block, idx)
}

// GetTransactionByBlockNumberAndIndex returns the transaction identified by number and index.
func (b *Backend) GetTransactionByBlockNumberAndIndex(blockNum rpctypes.BlockNumber, idx hexutil.Uint) (*rpctypes.RPCTransaction, error) {
	b.logger.Debug("eth_getTransactionByBlockNumberAndIndex", "number", blockNum, "index", idx)

	block, err := b.GetTendermintBlockByNumber(blockNum)
	if err != nil {
		b.logger.Debug("block not found", "height", blockNum.Int64(), "error", err.Error())
		return nil, nil
	}

	if block.Block == nil {
		b.logger.Debug("block not found", "height", blockNum.Int64())
		return nil, nil
	}

	return b.GetTransactionByBlockAndIndex(block, idx)
}

// GetTxByEthHash uses `/tx_query` to find transaction by ethereum tx hash
// TODO: Don't need to convert once hashing is fixed on Tendermint
// https://github.com/tendermint/tendermint/issues/6539
func (b *Backend) GetTxByEthHash(hash common.Hash) (*ethermint.TxResult, error) {
	if b.indexer != nil {
		return b.indexer.GetByTxHash(hash)
	}

	// fallback to tendermint tx indexer
	query := fmt.Sprintf("%s.%s='%s'", evmtypes.TypeMsgEthereumTx, evmtypes.AttributeKeyEthereumTxHash, hash.Hex())
	txResult, err := b.queryTendermintTxIndexer(query, func(txs *rpctypes.ParsedTxs) *rpctypes.ParsedTx {
		return txs.GetTxByHash(hash)
	})
	if err != nil {
		return nil, sdkerrors.Wrapf(err, "GetTxByEthHash %s", hash.Hex())
	}
	return txResult, nil
}

// GetTxByTxIndex uses `/tx_query` to find transaction by tx index of valid ethereum txs
func (b *Backend) GetTxByTxIndex(height int64, index uint) (*ethermint.TxResult, error) {
	if b.indexer != nil {
		return b.indexer.GetByBlockAndIndex(height, int32(index))
	}

	// fallback to tendermint tx indexer
	query := fmt.Sprintf("tx.height=%d AND %s.%s=%d",
		height, evmtypes.TypeMsgEthereumTx,
		evmtypes.AttributeKeyTxIndex, index,
	)
	txResult, err := b.queryTendermintTxIndexer(query, func(txs *rpctypes.ParsedTxs) *rpctypes.ParsedTx {
		return txs.GetTxByTxIndex(int(index))
	})
	if err != nil {
		return nil, sdkerrors.Wrapf(err, "GetTxByTxIndex %d %d", height, index)
	}
	return txResult, nil
}

// queryTendermintTxIndexer query tx in tendermint tx indexer
func (b *Backend) queryTendermintTxIndexer(query string, txGetter func(*rpctypes.ParsedTxs) *rpctypes.ParsedTx) (*ethermint.TxResult, error) {
	resTxs, err := b.clientCtx.Client.TxSearch(b.ctx, query, false, nil, nil, "")
	if err != nil {
		return nil, err
	}
	if len(resTxs.Txs) == 0 {
		return nil, errors.New("ethereum tx not found")
	}
	txResult := resTxs.Txs[0]
	if !rpctypes.TxSuccessOrExceedsBlockGasLimit(&txResult.TxResult) {
		return nil, errors.New("invalid ethereum tx")
	}

	var tx sdk.Tx
	if txResult.TxResult.Code != 0 {
		// it's only needed when the tx exceeds block gas limit
		tx, err = b.clientCtx.TxConfig.TxDecoder()(txResult.Tx)
		if err != nil {
			return nil, fmt.Errorf("invalid ethereum tx")
		}
	}

	return rpctypes.ParseTxIndexerResult(txResult, tx, txGetter)
}

// getTransactionByBlockAndIndex is the common code shared by `GetTransactionByBlockNumberAndIndex` and `GetTransactionByBlockHashAndIndex`.
func (b *Backend) GetTransactionByBlockAndIndex(block *tmrpctypes.ResultBlock, idx hexutil.Uint) (*rpctypes.RPCTransaction, error) {
	blockRes, err := b.GetTendermintBlockResultByNumber(&block.Block.Height)
	if err != nil {
		return nil, nil
	}

	var msg *evmtypes.MsgEthereumTx
	// find in tx indexer
	res, err := b.GetTxByTxIndex(block.Block.Height, uint(idx))
	if err == nil {
		tx, err := b.clientCtx.TxConfig.TxDecoder()(block.Block.Txs[res.TxIndex])
		if err != nil {
			b.logger.Debug("invalid ethereum tx", "height", block.Block.Header, "index", idx)
			return nil, nil
		}

		var ok bool
		// msgIndex is inferred from tx events, should be within bound.
		msg, ok = tx.GetMsgs()[res.MsgIndex].(*evmtypes.MsgEthereumTx)
		if !ok {
			b.logger.Debug("invalid ethereum tx", "height", block.Block.Header, "index", idx)
			return nil, nil
		}
	} else {
		i := int(idx)
		ethMsgs := b.GetEthereumMsgsFromTendermintBlock(block, blockRes)
		if i >= len(ethMsgs) {
			b.logger.Debug("block txs index out of bound", "index", i)
			return nil, nil
		}

		msg = ethMsgs[i]
	}

	baseFee, err := b.BaseFee(blockRes)
	if err != nil {
		// handle the error for pruned node.
		b.logger.Error("failed to fetch Base Fee from prunned block. Check node prunning configuration", "height", block.Block.Height, "error", err)
	}

	return rpctypes.NewTransactionFromMsg(
		msg,
		common.BytesToHash(block.Block.Hash()),
		uint64(block.Block.Height),
		uint64(idx),
		baseFee,
	)
}
