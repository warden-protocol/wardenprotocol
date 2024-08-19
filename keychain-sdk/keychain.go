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

	"github.com/warden-protocol/wardenprotocol/go-client"
	"github.com/warden-protocol/wardenprotocol/keychain-sdk/internal/tracker"
	"github.com/warden-protocol/wardenprotocol/keychain-sdk/internal/writer"
	wardentypes "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
	"google.golang.org/grpc/connectivity"
)

// App is the Keychain application. It is responsible for handling key requests
// and sign requests.
// Use [NewApp] to create a new instance.
type App struct {
	config             Config
	keyRequestHandler  KeyRequestHandler
	signRequestHandler SignRequestHandler

	query              *client.QueryClient
	txWriter           *writer.W
	keyRequestTracker  *tracker.T
	signRequestTracker *tracker.T
}

// NewApp creates a new Keychain application, using the given configuration.
func NewApp(config Config) *App {
	return &App{
		config:             config,
		keyRequestTracker:  tracker.New(),
		signRequestTracker: tracker.New(),
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

	err := a.initConnections()
	if err != nil {
		return fmt.Errorf("failed to init connections: %w", err)
	}

	keyRequestsCh := make(chan *wardentypes.KeyRequest)
	defer close(keyRequestsCh)
	go a.ingestKeyRequests(keyRequestsCh)

	signRequestsCh := make(chan *wardentypes.SignRequest)
	defer close(signRequestsCh)
	go a.ingestSignRequests(signRequestsCh)

	flushErrors := make(chan error)
	defer close(flushErrors)
	go func() {
		if err := a.txWriter.Start(ctx, flushErrors); err != nil {
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
			go a.handleKeyRequest(keyRequest)
		case signRequest := <-signRequestsCh:
			go a.handleSignRequest(signRequest)
		}
	}
}

// ConnectionState returns the current state of the gRPC connection.
func (a *App) ConnectionState() connectivity.State {
	return a.query.Conn().GetState()
}

func (a *App) initConnections() error {
	a.logger().Info("connecting to Warden Protocol using gRPC", "url", a.config.GRPCURL, "insecure", a.config.GRPCInsecure)
	query, err := client.NewQueryClient(a.config.GRPCURL, a.config.GRPCInsecure)
	if err != nil {
		return fmt.Errorf("failed to create query client: %w", err)
	}
	a.query = query

	conn := query.Conn()

	identity, err := client.NewIdentityFromSeed(a.config.DerivationPath, a.config.Mnemonic)
	if err != nil {
		return fmt.Errorf("failed to create identity: %w", err)
	}

	a.logger().Info("keychain writer identity", "address", identity.Address.String())

	txClient := client.NewTxClient(identity, a.config.ChainID, conn, query)
	a.txWriter = writer.New(txClient, a.config.BatchSize, a.config.BatchInterval, a.config.TxTimeout, a.logger())
	a.txWriter.Fees = a.config.TxFees
	a.txWriter.GasLimit = a.config.GasLimit

	return nil
}
