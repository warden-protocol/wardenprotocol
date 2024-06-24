package keychain

import (
	"context"
	"encoding/hex"
	"log/slog"
	"time"

	"github.com/warden-protocol/wardenprotocol/go-client"
	wardentypes "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

type SignResponseWriter interface {
	Fulfil(signature []byte) error
	Reject(reason string) error
}

type SignRequest wardentypes.SignRequest

type SignRequestHandler func(w SignResponseWriter, req *SignRequest)

type signResponseWriter struct {
	ctx           context.Context
	txWriter      *TxWriter
	signRequestID uint64
	encryptionKey []byte
	logger        *slog.Logger
	onComplete    func()
}

func (w *signResponseWriter) Fulfil(signature []byte) error {
	w.logger.Debug("fulfilling sign request", "id", w.signRequestID, "signature", hex.EncodeToString(signature))

	result := signature
	if w.encryptionKey != nil {
		var err error
		result, err = Encrypt(w.encryptionKey, result)
		if err != nil {
			return err
		}
	}

	err := w.txWriter.Write(w.ctx, client.SignRequestFulfilment{
		RequestID: w.signRequestID,
		Signature: result,
	})
	w.onComplete()
	w.logger.Debug("fulfilled sign request", "id", w.signRequestID, "error", err)
	return err
}

func (w *signResponseWriter) Reject(reason string) error {
	w.logger.Debug("rejecting sign request", "id", w.signRequestID, "reason", reason)
	err := w.txWriter.Write(w.ctx, client.SignRequestRejection{
		RequestID: w.signRequestID,
		Reason:    reason,
	})
	w.onComplete()
	w.logger.Debug("rejected sign request", "id", w.signRequestID, "error", err)
	return err
}

func (a *App) ingestSignRequests(signRequestsCh chan *wardentypes.SignRequest) {
	for {
		reqCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		signRequests, err := a.signRequests(reqCtx)
		cancel()
		if err != nil {
			a.logger().Error("failed to get sign requests", "error", err)
		} else {
			for _, signRequest := range signRequests {
				if !a.signRequestTracker.IsNew(signRequest.Id) {
					a.logger().Debug("skipping sign request", "id", signRequest.Id)
					continue
				}

				a.logger().Info("got sign request", "id", signRequest.Id)
				a.signRequestTracker.Ingested(signRequest.Id)
				signRequestsCh <- signRequest
			}
		}

		time.Sleep(5 * time.Second)
	}
}

func (a *App) handleSignRequest(signRequest *wardentypes.SignRequest) {
	if a.signRequestHandler == nil {
		a.logger().Error("sign request handler not set")
		return
	}

	go func() {
		a.logger().Debug("handling sign request", "id", signRequest.Id, "data_for_signing", hex.EncodeToString(signRequest.DataForSigning))
		ctx := context.Background()
		w := &signResponseWriter{
			ctx:           ctx,
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
				_ = w.Reject("internal error")
				return
			}
		}()

		if err := ValidateEncryptionKey(signRequest.EncryptionKey); err != nil {
			a.logger().Error("invalid sign request encryption key", "id", signRequest.Id, "error", err)
			_ = w.Reject("invalid encryption key")
			return
		}

		a.signRequestHandler(w, (*SignRequest)(signRequest))
	}()
}

func (a *App) signRequests(ctx context.Context) ([]*wardentypes.SignRequest, error) {
	return a.query.PendingSignatureRequests(ctx, &client.PageRequest{Limit: uint64(a.config.BatchSize)}, a.config.KeychainId)
}
