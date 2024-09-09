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

// KeyResponseWriter is the interface for writing responses to key requests.
type KeyResponseWriter interface {
	// Fulfil writes a public key to the key request.
	Fulfil(publicKey []byte) error

	// Reject writes a human-readable reason for rejecting the key request.
	Reject(reason string) error
}

// KeyRequest is a key request.
type KeyRequest wardentypes.KeyRequest

// KeyRequestHandler is a function that handles key requests.
type KeyRequestHandler func(w KeyResponseWriter, req *KeyRequest)

type keyResponseWriter struct {
	ctx          context.Context
	txWriter     *writer.W
	keyRequestID uint64
	logger       *slog.Logger
	onComplete   func()
}

func (w *keyResponseWriter) Fulfil(publicKey []byte) error {
	w.logger.Debug("fulfilling key request", "id", w.keyRequestID, "public_key", hex.EncodeToString(publicKey))
	err := w.txWriter.Write(w.ctx, client.KeyRequestFulfilment{
		RequestID: w.keyRequestID,
		PublicKey: publicKey,
	})
	w.onComplete()
	w.logger.Debug("fulfilled key request", "id", w.keyRequestID, "error", err)
	return err
}

func (w *keyResponseWriter) Reject(reason string) error {
	w.logger.Debug("rejecting key request", "id", w.keyRequestID, "reason", reason)
	err := w.txWriter.Write(w.ctx, client.KeyRequestRejection{
		RequestID: w.keyRequestID,
		Reason:    reason,
	})
	w.onComplete()
	w.logger.Debug("rejected key request", "id", w.keyRequestID, "error", err)
	return err
}

func (a *App) ingestKeyRequests(keyRequestsCh chan *wardentypes.KeyRequest, client *AppClient) {
	ingestRequest := func(keyRequest *wardentypes.KeyRequest) {
		if !a.keyRequestTracker.IsNew(keyRequest.Id, client.grpcUrl) {
			a.logger().Debug("skipping key request", "id", keyRequest.Id, "grpcUrl", client.grpcUrl)
			return
		}

		a.logger().Info("got key request", "id", keyRequest.Id, "grpcUrl", client.grpcUrl)
		a.keyRequestTracker.Ingested(keyRequest.Id, client.grpcUrl)

		if a.keyRequestTracker.HasReachedConsensus(keyRequest.Id, a.config.ConsensusNodeThreshold) {
			keyRequestsCh <- keyRequest
		}
	}

	for {
		reqCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		keyRequests, err := client.keyRequests(reqCtx)
		cancel()
		if err != nil {
			a.logger().Error("failed to get key requests", "error", err)
		} else {
			for _, keyRequest := range keyRequests {
				ingestRequest(keyRequest)
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
			ctx:          ctx,
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
				_ = w.Reject("internal error")
				return
			}
		}()

		a.keyRequestHandler(w, (*KeyRequest)(keyRequest))
	}()
}

func (a *AppClient) keyRequests(ctx context.Context) ([]*wardentypes.KeyRequest, error) {
	return a.query.PendingKeyRequests(ctx, &client.PageRequest{Limit: uint64(a.batchSize)}, a.keychainId)
}
