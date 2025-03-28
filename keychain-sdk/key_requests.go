package keychain

import (
	"context"
	"encoding/hex"
	"log/slog"
	"time"

	"github.com/warden-protocol/wardenprotocol/go-client"
	"github.com/warden-protocol/wardenprotocol/keychain-sdk/internal/writer"
	wardentypes "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

// KeyRequest is a key request.
type KeyRequest wardentypes.KeyRequest

// KeyRequestHandler is a function that handles key requests.
type KeyRequestHandler func(ctx context.Context, w Writer, req *KeyRequest)

type keyResponseWriter struct {
	txWriter     *writer.W
	keyRequestID uint64
	logger       *slog.Logger
	onComplete   func()
}

func (w *keyResponseWriter) Fulfil(ctx context.Context, publicKey []byte) error {
	w.logger.Debug("fulfilling key request", "id", w.keyRequestID, "public_key", hex.EncodeToString(publicKey))
	err := w.txWriter.Write(ctx, client.KeyRequestFulfilment{
		RequestID: w.keyRequestID,
		PublicKey: publicKey,
	})
	w.onComplete()
	w.logger.Debug("fulfilled key request", "id", w.keyRequestID, "error", err)
	return err
}

func (w *keyResponseWriter) Reject(ctx context.Context, reason string) error {
	w.logger.Debug("rejecting key request", "id", w.keyRequestID, "reason", reason)
	err := w.txWriter.Write(ctx, client.KeyRequestRejection{
		RequestID: w.keyRequestID,
		Reason:    reason,
	})
	w.onComplete()
	w.logger.Debug("rejected key request", "id", w.keyRequestID, "error", err)
	return err
}

func (a *App) ingestKeyRequests(keyRequestsCh chan *wardentypes.KeyRequest) {
	for {
		reqCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		keyRequests, err := a.keyRequests(reqCtx)
		cancel()
		if err != nil {
			a.logger().Error("failed to get key requests", "error", err)
		} else {
			for _, keyRequest := range keyRequests {
				if !a.keyRequestTracker.IsNew(keyRequest.Id) {
					a.logger().Debug("skipping key request", "id", keyRequest.Id)
					continue
				}

				a.logger().Info("got key request", "id", keyRequest.Id)
				a.keyRequestTracker.Ingested(keyRequest.Id)
				keyRequestsCh <- keyRequest
			}
		}

		time.Sleep(a.config.BatchInterval / 2)
	}
}

func (a *App) handleKeyRequest(keyRequest *wardentypes.KeyRequest) {
	if a.keyRequestHandler == nil {
		a.logger().Error("key request handler not set")
		return
	}

	go func() {
		ctx := context.Background()
		w := &keyResponseWriter{
			txWriter:     a.txWriter,
			keyRequestID: keyRequest.Id,
			logger:       a.logger(),
			onComplete: func() {
				a.keyRequestTracker.Done(keyRequest.Id)
			},
		}
		defer func() {
			if r := recover(); r != nil {
				a.logger().Error("panic in key request handler", "error", r)
				_ = w.Reject(ctx, "internal error")
				return
			}
		}()

		a.keyRequestHandler(ctx, w, (*KeyRequest)(keyRequest))
	}()
}

func (a *App) keyRequests(ctx context.Context) ([]*wardentypes.KeyRequest, error) {
	return a.query.PendingKeyRequests(ctx, &client.PageRequest{Limit: uint64(a.config.BatchSize)}, a.config.KeychainID)
}
