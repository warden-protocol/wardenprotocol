package server

import (
	"context"
	"time"

	"github.com/tendermint/tendermint/libs/service"
	rpcclient "github.com/tendermint/tendermint/rpc/client"
	"github.com/tendermint/tendermint/types"

	ethermint "github.com/evmos/ethermint/types"
)

const (
	ServiceName = "EVMIndexerService"

	NewBlockWaitTimeout = 60 * time.Second
)

// EVMIndexerService indexes transactions for json-rpc service.
type EVMIndexerService struct {
	service.BaseService

	txIdxr ethermint.EVMTxIndexer
	client rpcclient.Client
}

// NewEVMIndexerService returns a new service instance.
func NewEVMIndexerService(
	txIdxr ethermint.EVMTxIndexer,
	client rpcclient.Client,
) *EVMIndexerService {
	is := &EVMIndexerService{txIdxr: txIdxr, client: client}
	is.BaseService = *service.NewBaseService(nil, ServiceName, is)
	return is
}

// OnStart implements service.Service by subscribing for new blocks
// and indexing them by events.
func (eis *EVMIndexerService) OnStart() error {
	ctx := context.Background()
	status, err := eis.client.Status(ctx)
	if err != nil {
		return err
	}
	latestBlock := status.SyncInfo.LatestBlockHeight
	newBlockSignal := make(chan struct{}, 1)

	// Use SubscribeUnbuffered here to ensure both subscriptions does not get
	// canceled due to not pulling messages fast enough. Cause this might
	// sometimes happen when there are no other subscribers.
	blockHeadersChan, err := eis.client.Subscribe(
		ctx,
		ServiceName,
		types.QueryForEvent(types.EventNewBlockHeader).String(),
		0)
	if err != nil {
		return err
	}

	go func() {
		for {
			msg := <-blockHeadersChan
			eventDataHeader := msg.Data.(types.EventDataNewBlockHeader)
			if eventDataHeader.Header.Height > latestBlock {
				latestBlock = eventDataHeader.Header.Height
				// notify
				select {
				case newBlockSignal <- struct{}{}:
				default:
				}
			}
		}
	}()

	lastBlock, err := eis.txIdxr.LastIndexedBlock()
	if err != nil {
		return err
	}
	if lastBlock == -1 {
		lastBlock = latestBlock
	}
	for {
		if latestBlock <= lastBlock {
			// nothing to index. wait for signal of new block
			select {
			case <-newBlockSignal:
			case <-time.After(NewBlockWaitTimeout):
			}
			continue
		}
		for i := lastBlock + 1; i <= latestBlock; i++ {
			block, err := eis.client.Block(ctx, &i)
			if err != nil {
				eis.Logger.Error("failed to fetch block", "height", i, "err", err)
				break
			}
			blockResult, err := eis.client.BlockResults(ctx, &i)
			if err != nil {
				eis.Logger.Error("failed to fetch block result", "height", i, "err", err)
				break
			}
			if err := eis.txIdxr.IndexBlock(block.Block, blockResult.TxsResults); err != nil {
				eis.Logger.Error("failed to index block", "height", i, "err", err)
			}
			lastBlock = blockResult.Height
		}
	}
}
