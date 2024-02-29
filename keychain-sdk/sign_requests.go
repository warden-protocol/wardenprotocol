package keychain

import (
	"context"
	"encoding/hex"
	"log/slog"
	"time"

	"github.com/warden-protocol/wardenprotocol/go-client"
	wardentypes "github.com/warden-protocol/wardenprotocol/warden/x/warden/types"
)

type SignResponseWriter interface {
	Fulfil(signature []byte) error
	Reject(reason string) error
}

type SignRequest wardentypes.SignRequest

type SignRequestHandler func(w SignResponseWriter, req *SignRequest)

type signResponseWriter struct {
	ctx           context.Context
	tx            *client.TxClient
	signRequestID uint64
	logger        *slog.Logger
}

func (w *signResponseWriter) Fulfil(signature []byte) error {
	w.logger.Debug("fulfilling sign request", "id", w.signRequestID, "signature", hex.EncodeToString(signature))
	return w.tx.FulfilSignatureRequest(w.ctx, w.signRequestID, signature)
}

func (w *signResponseWriter) Reject(reason string) error {
	w.logger.Debug("rejecting sign request", "id", w.signRequestID, "reason", reason)
	return w.tx.RejectSignatureRequest(w.ctx, w.signRequestID, reason)
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
				a.logger().Info("got sign request", "id", signRequest.Id)
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
			tx:            a.tx,
			signRequestID: signRequest.Id,
			logger:        a.logger(),
		}
		defer func() {
			if r := recover(); r != nil {
				a.logger().Error("panic in sign request handler", "error", r)
				_ = w.Reject("internal error")
			}
		}()

		a.signRequestHandler(w, (*SignRequest)(signRequest))
	}()
}

func (a *App) signRequests(ctx context.Context) ([]*wardentypes.SignRequest, error) {
	return a.query.PendingSignatureRequests(ctx, &client.PageRequest{Limit: defaultPageLimit}, a.config.KeychainAddr)
}
