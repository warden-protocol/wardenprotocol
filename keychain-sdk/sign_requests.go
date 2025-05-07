package keychain

import (
	"context"
	"encoding/hex"
	"log/slog"
	"time"

	"github.com/warden-protocol/wardenprotocol/go-client"
	"github.com/warden-protocol/wardenprotocol/keychain-sdk/internal/enc"
	"github.com/warden-protocol/wardenprotocol/keychain-sdk/internal/tracker"
	"github.com/warden-protocol/wardenprotocol/keychain-sdk/internal/writer"
	wardentypes "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

// SignResponseWriter is the interface for writing responses to sign requests.
type SignResponseWriter interface {
	// Fulfil writes the signature to the sign request.
	Fulfil(signature []byte) error

	// Reject writes a rejection to the sign request.
	Reject(reason string) error
}

// SignRequest is a sign request.
type SignRequest wardentypes.SignRequest

// SignRequestHandler is a function that handles sign requests.
type SignRequestHandler func(ctx context.Context, w Writer, req *SignRequest)

type signResponseWriter struct {
	txWriter      *writer.W
	signRequestID uint64
	encryptionKey []byte
	logger        *slog.Logger
	onComplete    func()
}

func (w *signResponseWriter) Fulfil(ctx context.Context, signature []byte) error {
	w.logger.Debug("fulfilling sign request", "id", w.signRequestID, "signature", hex.EncodeToString(signature))

	result := signature
	if w.encryptionKey != nil {
		var err error
		result, err = enc.Encrypt(w.encryptionKey, result)
		if err != nil {
			return err
		}
	}

	err := w.txWriter.Write(ctx, client.SignRequestFulfilment{
		RequestID: w.signRequestID,
		Signature: result,
	})
	w.onComplete()
	w.logger.Debug("fulfilled sign request", "id", w.signRequestID, "error", err)

	return err
}

func (w *signResponseWriter) Reject(ctx context.Context, reason string) error {
	w.logger.Debug("rejecting sign request", "id", w.signRequestID, "reason", reason)
	err := w.txWriter.Write(ctx, client.SignRequestRejection{
		RequestID: w.signRequestID,
		Reason:    reason,
	})
	w.onComplete()
	w.logger.Debug("rejected sign request", "id", w.signRequestID, "error", err)
	return err
}

func (a *App) ingestSignRequests(ctx context.Context, signRequestsCh chan *wardentypes.SignRequest, appClient *wardenClient) {
	for {
		reqCtx, cancel := context.WithTimeout(ctx, 5*time.Second)
		signRequests, err := appClient.signRequests(reqCtx, a.config.BatchSize, a.config.KeychainID)
		cancel()
		if err != nil {
			a.logger().Error("failed to get sign requests", "error", err)
		} else {
			for _, signRequest := range signRequests {
				a.ingestSignRequest(ctx, signRequestsCh, signRequest, appClient)
			}
		}

		time.Sleep(a.config.BatchInterval / 2)
	}
}

func (a *App) ingestSignRequest(_ context.Context, signRequestsCh chan *wardentypes.SignRequest, signRequest *wardentypes.SignRequest, appClient *wardenClient) {
	action, err := a.keyRequestTracker.Ingest(signRequest.Id, appClient.grpcURL)
	if err != nil {
		a.logger().Error("failed to ingest sign request", "id", signRequest.Id, "grpcUrl", appClient.grpcURL, "error", err)
		return
	}

	if action == tracker.ActionSkip {
		a.logger().Debug("skipping sign request", "id", signRequest.Id, "grpcUrl", appClient.grpcURL)
		return
	}

	if action == tracker.ActionProcess {
		signRequestsCh <- signRequest
	}
}

func (a *App) handleSignRequest(ctx context.Context, signRequest *wardentypes.SignRequest) {
	if a.signRequestHandler == nil {
		a.logger().Error("sign request handler not set")
		return
	}

	go func() {
		a.logger().Debug("handling sign request", "id", signRequest.Id, "data_for_signing", hex.EncodeToString(signRequest.DataForSigning))
		w := &signResponseWriter{
			txWriter:      a.txWriter,
			signRequestID: signRequest.Id,
			encryptionKey: signRequest.EncryptionKey,
			logger:        a.logger(),
			onComplete: func() {
				a.signRequestTracker.Done(signRequest.Id)
			},
		}
		defer func() {
			if r := recover(); r != nil {
				a.logger().Error("panic in sign request handler", "error", r)
				_ = w.Reject(ctx, "internal error")
				return
			}
		}()

		if err := enc.ValidateEncryptionKey(signRequest.EncryptionKey); err != nil {
			a.logger().Error("invalid sign request encryption key", "id", signRequest.Id, "error", err)
			_ = w.Reject(ctx, "invalid encryption key")
			return
		}

		a.signRequestHandler(ctx, w, (*SignRequest)(signRequest))
	}()
}

func (a *wardenClient) signRequests(ctx context.Context, batchSize int, keychainId uint64) ([]*wardentypes.SignRequest, error) {
	return a.query.PendingSignRequests(ctx, &client.PageRequest{Limit: uint64(batchSize)}, keychainId)
}
