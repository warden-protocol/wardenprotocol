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
	logger        *slog.Logger
	onComplete    func()
}

func (w *signResponseWriter) Fulfil(signature []byte) error {
	w.logger.Debug("fulfilling sign request", "id", w.signRequestID, "signature", hex.EncodeToString(signature))
	defer w.onComplete()
	return w.txWriter.Write(w.ctx, client.SignRequestFulfilment{
		RequestID: w.signRequestID,
		Signature: signature,
	})
}

func (w *signResponseWriter) Reject(reason string) error {
	w.logger.Debug("rejecting sign request", "id", w.signRequestID, "reason", reason)
	defer w.onComplete()
	return w.txWriter.Write(w.ctx, client.SignRequestRejection{
		RequestID: w.signRequestID,
		Reason:    reason,
	})
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
			logger:        a.logger(),
			onComplete: func() {
				a.keyRequestTracker.Done(signRequest.Id)
			},
		}
		defer func() {
			if r := recover(); r != nil {
				a.logger().Error("panic in sign request handler", "error", r)
				_ = w.Reject("internal error")
				return
			}
		}()

		a.signRequestHandler(w, (*SignRequest)(signRequest))
	}()
}

func (a *App) signRequests(ctx context.Context) ([]*wardentypes.SignRequest, error) {
	return a.query.PendingSignatureRequests(ctx, &client.PageRequest{Limit: defaultPageLimit}, a.config.KeychainId)
}
