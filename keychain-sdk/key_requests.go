package keychain

import (
	"context"
	"time"

	"github.com/warden-protocol/wardenprotocol/go-client"
	wardentypes "github.com/warden-protocol/wardenprotocol/warden/x/warden/types"
)

type KeyResponseWriter interface {
	Fulfil(publicKey []byte) error
	Reject(reason string) error
}

type KeyRequest wardentypes.KeyRequest

type KeyRequestHandler func(w KeyResponseWriter, req *KeyRequest)

type keyResponseWriter struct {
	ctx          context.Context
	tx           *client.TxClient
	keyRequestID uint64
}

func (w *keyResponseWriter) Fulfil(publicKey []byte) error {
	return w.tx.FulfilKeyRequest(w.ctx, w.keyRequestID, publicKey)
}

func (w *keyResponseWriter) Reject(reason string) error {
	return w.tx.RejectKeyRequest(w.ctx, w.keyRequestID, reason)
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
				a.logger().Info("got key request", "id", keyRequest.Id)
				keyRequestsCh <- keyRequest
			}
		}

		time.Sleep(5 * time.Second)
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
			tx:           a.tx,
			keyRequestID: keyRequest.Id,
		}
		defer func() {
			if r := recover(); r != nil {
				a.logger().Error("panic in key request handler", "error", r)
				_ = w.Reject("internal error")
			}
		}()

		a.keyRequestHandler(w, (*KeyRequest)(keyRequest))
	}()
}

func (a *App) keyRequests(ctx context.Context) ([]*wardentypes.KeyRequest, error) {
	return a.query.PendingKeyRequests(ctx, &client.PageRequest{Limit: defaultPageLimit}, a.config.KeychainId)
}
