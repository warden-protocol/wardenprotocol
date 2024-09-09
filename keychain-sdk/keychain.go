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

	txWriter           *writer.W
	keyRequestTracker  *tracker.T
	signRequestTracker *tracker.T

	clients []*AppClient
}

type AppClient struct {
	grpcUrl    string
	batchSize  int
	keychainId uint64
	query      *client.QueryClient
	txClient   *client.TxClient
}

// NewApp creates a new Keychain application, using the given configuration.
func NewApp(config Config) *App {
	return &App{
		config:             config,
		keyRequestTracker:  tracker.New(),
		signRequestTracker: tracker.New(),
		clients:            []*AppClient{},
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
	for _, appClient := range a.clients {
		go a.ingestKeyRequests(keyRequestsCh, appClient)
	}

	signRequestsCh := make(chan *wardentypes.SignRequest)
	defer close(signRequestsCh)
	for _, appClient := range a.clients {
		go a.ingestSignRequests(signRequestsCh, appClient)
	}

	flushErrors := make(chan error)
	defer close(flushErrors)
	go func() {
		if err := a.txWriter.Start(ctx, a.liveTxClient, flushErrors); err != nil {
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

func (a *App) liveTxClient() (*client.TxClient, error) {
	for _, appClient := range a.clients {
		if state := appClient.query.Conn().GetState(); state == connectivity.Ready || state == connectivity.Idle {
			return appClient.txClient, nil
		}
	}

	return nil, fmt.Errorf("all node clients are down")
}

// ConnectionState returns the current state of the gRPC connection.
func (a *App) ConnectionState() map[string]connectivity.State {
	statuses := make(map[string]connectivity.State)

	for _, appClient := range a.clients {
		state := appClient.query.Conn().GetState()
		statuses[appClient.grpcUrl] = state
	}

	return statuses
}

func (a *App) initConnections() error {
	initConnection := func(logger *slog.Logger, grpcUlr string, config BasicConfig) (*AppClient, error) {
		appClient := &AppClient{
			batchSize:  config.BatchSize,
			keychainId: config.KeychainID,
			grpcUrl:    grpcUlr,
		}

		logger.Info("connecting to Warden Protocol using gRPC", "url", grpcUlr, "insecure", config.GRPCInsecure)

		query, err := client.NewQueryClient(grpcUlr, config.GRPCInsecure)
		if err != nil {
			return nil, fmt.Errorf("failed to create query client: %w", err)
		}
		appClient.query = query

		conn := query.Conn()

		identity, err := client.NewIdentityFromSeed(a.config.Mnemonic)
		if err != nil {
			return nil, fmt.Errorf("failed to create identity: %w", err)
		}

		logger.Info("keychain writer identity", "address", identity.Address.String())

		appClient.txClient = client.NewTxClient(identity, config.ChainID, conn, query)

		return appClient, nil
	}

	for _, grpcUrl := range a.config.GRPCURLs {
		appClient, err := initConnection(a.logger(), grpcUrl, a.config.BasicConfig)
		if err != nil {
			return err
		}

		a.clients = append(a.clients, appClient)
	}

	a.txWriter = writer.New(a.config.BatchSize, a.config.BatchInterval, a.config.TxTimeout, a.logger())
	a.txWriter.Fees = a.config.TxFees
	a.txWriter.GasLimit = a.config.GasLimit

	return nil
}
