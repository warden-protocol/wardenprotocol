package keychain

import (
	"context"
	"errors"
	"fmt"
	"log/slog"

	sdkTypes "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/connectivity"

	client "github.com/warden-protocol/wardenprotocol/go-client"
)

type wardenClient struct {
	grpcURL      string
	grpcInsecure bool
	query        *client.QueryClient
	txClient     *client.TxClient
}

type clientsPool struct {
	clients []*wardenClient
	config  Config
}

func newClientsPool(config Config) *clientsPool {
	pool := clientsPool{
		clients: make([]*wardenClient, 0),
		config:  config,
	}

	return &pool
}

func (cp *clientsPool) BuildTx(
	ctx context.Context,
	gasLimit uint64,
	fees sdkTypes.Coins,
	msgers ...client.Msger,
) ([]byte, error) {
	liveClient, err := cp.liveTxClient()
	if err != nil {
		return nil, fmt.Errorf("failed to acquire live client for BuildTx: %w", err)
	}

	return liveClient.BuildTx(ctx, gasLimit, fees, msgers...)
}

func (cp *clientsPool) SendWaitTx(ctx context.Context, txBytes []byte) (string, error) {
	liveClient, err := cp.liveTxClient()
	if err != nil {
		return "", fmt.Errorf("failed to acquire live client for SendWaitTx: %w", err)
	}

	return liveClient.SendWaitTx(ctx, txBytes)
}

func (cp *clientsPool) ConnectionState() map[string]connectivity.State {
	statuses := make(map[string]connectivity.State)

	for _, appClient := range cp.clients {
		state := appClient.query.Conn().GetState()
		statuses[appClient.grpcURL] = state
	}

	return statuses
}

func (cp *clientsPool) initConnections(logger *slog.Logger) error {
	identity, err := client.NewIdentityFromSeed(cp.config.Mnemonic)
	if err != nil {
		return fmt.Errorf("failed to create identity: %w", err)
	}

	for _, grpcURL := range cp.config.Nodes {
		appClient, err := cp.initConnection(logger, grpcURL, cp.config.ChainID, identity)
		if err != nil {
			return err
		}

		cp.clients = append(cp.clients, appClient)
	}

	return nil
}

func (cp *clientsPool) initConnection(
	logger *slog.Logger,
	grpcNodeConfig GRPCNodeConfig,
	chainID string,
	identity client.Identity,
) (*wardenClient, error) {
	appClient := &wardenClient{
		grpcURL:      grpcNodeConfig.Host,
		grpcInsecure: grpcNodeConfig.Insecure,
	}

	logger.Info("connecting to Warden Protocol using gRPC", "url", grpcNodeConfig.Host, "insecure", grpcNodeConfig.Insecure)

	query, err := client.NewQueryClient(grpcNodeConfig.Host, grpcNodeConfig.Insecure)
	if err != nil {
		return nil, fmt.Errorf("failed to create query client: %w", err)
	}
	appClient.query = query

	conn := query.Conn()

	logger.Info("keychain writer identity", "address", identity.Address.String())

	appClient.txClient = client.NewTxClient(identity, chainID, conn, query)

	return appClient, nil
}

func (cp *clientsPool) liveTxClient() (*client.TxClient, error) {
	for _, appClient := range cp.clients {
		if state := appClient.query.Conn().GetState(); isOnline(state) {
			return appClient.txClient, nil
		}
	}

	return nil, errors.New("all node clients are down")
}

func isOnline(state connectivity.State) bool {
	return state == connectivity.Ready || state == connectivity.Idle
}
