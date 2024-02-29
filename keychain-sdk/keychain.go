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
	wardentypes "github.com/warden-protocol/wardenprotocol/warden/x/warden/types"
	"google.golang.org/grpc/connectivity"
)

type App struct {
	config             Config
	keyRequestHandler  KeyRequestHandler
	signRequestHandler SignRequestHandler

	query *client.QueryClient
	tx    *client.TxClient
}

func NewApp(config Config) *App {
	return &App{
		config: config,
	}
}

func (a *App) logger() *slog.Logger {
	if a.config.Logger == nil {
		a.config.Logger = slog.New(slog.NewTextHandler(io.Discard, &slog.HandlerOptions{}))
	}

	return a.config.Logger
}

func (a *App) SetKeyRequestHandler(handler KeyRequestHandler) {
	a.keyRequestHandler = handler
}

func (a *App) SetSignRequestHandler(handler SignRequestHandler) {
	a.signRequestHandler = handler
}

func (a *App) Start(ctx context.Context) error {
	a.logger().Info("starting keychain", "keychain_addr", a.config.KeychainAddr)

	err := a.initConnections()
	if err != nil {
		return fmt.Errorf("failed to init connections: %w", err)
	}

	keyRequestsCh := make(chan *wardentypes.KeyRequest)
	go a.ingestKeyRequests(keyRequestsCh)

	signRequestsCh := make(chan *wardentypes.SignRequest)
	go a.ingestSignRequests(signRequestsCh)

	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		case keyRequest := <-keyRequestsCh:
			go a.handleKeyRequest(keyRequest)
		case signRequest := <-signRequestsCh:
			go a.handleSignRequest(signRequest)
		}
	}
}

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

	a.logger().Info("keychain party identity", "address", identity.Address.String())

	a.tx = client.NewTxClient(identity, a.config.ChainID, conn, query)

	return nil
}

var defaultPageLimit = uint64(10)
