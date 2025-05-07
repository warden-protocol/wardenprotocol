// Package keychain is an SDK for building Keychain on the Warden Protocol
// blockchain.
//
// To learn more about the Warden Protocol, visit https://docs.wardenprotocol.com/.
//
// For an example of an application built using this SDK, see the `wardenkms/` folder.
package keychain

import (
	"context"
	"fmt"
	"io"
	"log/slog"

	"google.golang.org/grpc/connectivity"

	"github.com/warden-protocol/wardenprotocol/keychain-sdk/internal/tracker"
	"github.com/warden-protocol/wardenprotocol/keychain-sdk/internal/writer"
	wardentypes "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

// App is the Keychain application. It is responsible for handling key requests
// and sign requests.
// Use [NewApp] to create a new instance.
type App struct {
	config             Config
	keyRequestHandler  KeyRequestHandler
	signRequestHandler SignRequestHandler

	txWriter           *writer.W
	keyRequestTracker  *tracker.T
	signRequestTracker *tracker.T

	clientsPool *clientsPool
}

// NewApp creates a new Keychain application, using the given configuration.
func NewApp(config Config) *App {
	return &App{
		config:             config,
		keyRequestTracker:  tracker.New(config.ConsensusNodeThreshold),
		signRequestTracker: tracker.New(config.ConsensusNodeThreshold),
	}
}

func (a *App) logger() *slog.Logger {
	if a.config.Logger == nil {
		a.config.Logger = slog.New(slog.NewTextHandler(io.Discard, &slog.HandlerOptions{}))
	}

	return a.config.Logger
}

// SetKeyRequestHandler sets the handler for key requests.
func (a *App) SetKeyRequestHandler(handler KeyRequestHandler) {
	a.keyRequestHandler = handler
}

// SetSignRequestHandler sets the handler for sign requests.
func (a *App) SetSignRequestHandler(handler SignRequestHandler) {
	a.signRequestHandler = handler
}

// Start starts the Keychain application and blocks until the context is done.
func (a *App) Start(ctx context.Context) error {
	a.logger().Info("starting keychain", "keychain_id", a.config.KeychainID)

	clientsPool := newClientsPool(a.config)
	if err := clientsPool.initConnections(a.logger()); err != nil {
		return fmt.Errorf("failed to init connections: %w", err)
	}

	a.clientsPool = clientsPool

	a.txWriter = writer.New(
		a.config.BatchSize,
		a.config.BatchInterval,
		a.config.TxTimeout,
		a.logger())
	a.txWriter.Fees = a.config.TxFees
	a.txWriter.GasLimit = a.config.GasLimit

	keyRequestsCh := make(chan *wardentypes.KeyRequest)
	defer close(keyRequestsCh)
	for _, appClient := range a.clientsPool.clients {
		go a.ingestKeyRequests(ctx, keyRequestsCh, appClient)
	}

	signRequestsCh := make(chan *wardentypes.SignRequest)
	defer close(signRequestsCh)
	for _, appClient := range a.clientsPool.clients {
		go a.ingestSignRequests(ctx, signRequestsCh, appClient)
	}

	flushErrors := make(chan error)
	defer close(flushErrors)
	go func() {
		if err := a.txWriter.Start(ctx, a.clientsPool, flushErrors); err != nil {
			a.logger().Error("tx writer exited with error", "error", err)
		}
	}()

	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		case err := <-flushErrors:
			a.logger().Error("tx writer flush error", "error", err)
		case keyRequest := <-keyRequestsCh:
			go a.handleKeyRequest(ctx, keyRequest)
		case signRequest := <-signRequestsCh:
			go a.handleSignRequest(ctx, signRequest)
		}
	}
}

// ConnectionState returns the current state of the gRPC connection.
func (a *App) ConnectionState() map[string]connectivity.State {
	return a.clientsPool.ConnectionState()
}
