package keychain

import (
	"context"
	"log/slog"
	"sync"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/go-client"
)

type TxWriter struct {
	// BatchTimeout is the maximum time to wait before sending a batch of messages.
	BatchTimeout time.Duration

	// Client is the client used to send transactions to the chain.
	Client *client.TxClient

	Logger *slog.Logger

	GasLimit uint64

	Fees sdk.Coins

	// Lock to prevent trying to send multiple transactions at once.
	// Sending transactions is slow and we can hit the Limit and/or BatchTimeout multiple times in quick succession.
	// Only one transaction can be sent at a time (i.e. due to Account and Sequence numbers).
	sendTxLock sync.Mutex

	batch Batch
}

func NewTxWriter(
	client *client.TxClient,
	batchSize int,
	batchTimeout time.Duration,
	logger *slog.Logger,
) *TxWriter {
	return &TxWriter{
		Client:       client,
		BatchTimeout: batchTimeout,
		Logger:       logger,
		batch:        Batch{messages: make(chan BatchItem, batchSize)},
	}
}

func (w *TxWriter) Start(ctx context.Context, flushErrors chan error) error {
	w.Logger.Info("starting tx writer")
	for {
		select {
		case <-ctx.Done():
			return nil
		default:
			ctx, cancel := context.WithTimeout(ctx, 30*time.Second)
			if err := w.Flush(ctx); err != nil {
				flushErrors <- err
			}
			cancel()
			time.Sleep(w.BatchTimeout)
		}
	}
}

func (w *TxWriter) Write(ctx context.Context, msg client.Msger) error {
	item := BatchItem{
		Msger: msg,
		Done:  make(chan error),
	}
	count := w.batch.Append(item)

	w.Logger.Info("adding to batch", "count", count)

	return <-item.Done
}

func (w *TxWriter) gasLimit() uint64 {
	if w.GasLimit == 0 {
		return client.DefaultGasLimit
	}
	return w.GasLimit
}

func (w *TxWriter) fees() sdk.Coins {
	if w.Fees == nil {
		return client.DefaultFees
	}
	return w.Fees
}

func (w *TxWriter) Flush(ctx context.Context) error {
	msgs := w.batch.Clear()
	if len(msgs) == 0 {
		w.Logger.Debug("flushing batch", "empty", true)
		return nil
	}

	defer func() {
		for _, item := range msgs {
			close(item.Done)
		}
	}()

	msgers := make([]client.Msger, len(msgs))
	for i, item := range msgs {
		msgers[i] = item.Msger
	}

	if err := w.sendWaitTx(ctx, msgers...); err != nil {
		for _, item := range msgs {
			item.Done <- err
		}
		return err
	}

	return nil
}

func (w *TxWriter) sendWaitTx(ctx context.Context, msgs ...client.Msger) error {
	w.sendTxLock.Lock()
	defer w.sendTxLock.Unlock()

	w.Logger.Info("flushing batch", "count", len(msgs))

	tx, err := w.Client.BuildTx(ctx, w.gasLimit(), w.fees(), msgs...)
	if err != nil {
		return err
	}

	if err = w.Client.SendWaitTx(ctx, tx); err != nil {
		return err
	}

	w.Logger.Info("flush complete")

	return nil
}

type Batch struct {
	clearMutex sync.Mutex
	messages   chan BatchItem
}

type BatchItem struct {
	client.Msger
	Done chan error
}

func (b *Batch) Append(item BatchItem) int {
	b.messages <- item
	return len(b.messages)
}

func (b *Batch) Len() int {
	return len(b.messages)
}

func (b *Batch) Clear() []BatchItem {
	b.clearMutex.Lock()
	defer b.clearMutex.Unlock()

	items := make([]BatchItem, len(b.messages))
	for i := 0; i < len(items); i++ {
		items[i] = <-b.messages
	}

	return items
}
