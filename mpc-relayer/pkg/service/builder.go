package service

import (
	"strconv"
	"time"

	"github.com/qredo/fusionchain/go-client"
	"github.com/qredo/fusionchain/mpc-relayer/pkg/database"
	"github.com/qredo/fusionchain/mpc-relayer/pkg/logger"
	"github.com/qredo/fusionchain/mpc-relayer/pkg/mpc"
	"github.com/sirupsen/logrus"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

const (
	derivationPath       = "m/44'/60'/0'/0/0"
	defaultFusionURL     = "localhost:9090"
	defaultFusionChainID = "qredofusiontestnet_257-1"
)

// BuildService constructs the main application based on supplied config parameters
func BuildService(config ServiceConfig) (*Service, error) {
	cfg, err := sanitizeConfig(config)
	if err != nil {
		return nil, err
	}
	log, err := logger.NewLogger(logger.Level(config.LogLevel), logger.Format(config.LogFormat), config.LogToFile, "mpc-relayer")
	if err != nil {
		return nil, err
	}

	keyDB, err := makeKeyDB(config.Path, false)
	if err != nil {
		return nil, err
	}

	keyringID, identity, mpcClient, err := makeKeyringClient(&cfg, log)
	if err != nil {
		return nil, err
	}

	queryClient, txClient, err := makeFusionGRPCClient(&cfg, identity)
	if err != nil {
		return nil, err
	}

	// make modules
	keyChan := make(chan *keyRequestQueueItem, defaultChanSize)
	sigchan := make(chan *signatureRequestQueueItem, defaultChanSize)
	return New(keyringID, cfg.Port, log, keyDB,
		newKeyQueryProcessor(keyringID, queryClient, keyChan, log, time.Duration(cfg.QueryInterval)*time.Second, int(cfg.MaxTries)),
		newSigQueryProcessor(keyringID, queryClient, sigchan, log, time.Duration(cfg.QueryInterval)*time.Second, int(cfg.MaxTries)),
		newFusionKeyController(log, keyDB, keyChan, mpcClient, txClient),
		newFusionSignatureController(log, keyDB, sigchan, mpcClient, txClient),
	), nil
}

func makeKeyDB(path string, inMemory bool) (database.Database, error) {
	kv, err := database.NewBadger(path, inMemory)
	if err != nil {
		return nil, err
	}
	return database.NewPrefixDB("pk", kv), nil
}

func makeKeyringClient(config *ServiceConfig, log *logrus.Entry) (keyringID uint64, identity client.Identity, mpcClient mpc.Client, err error) {
	mpcClient = mpc.NewClient(config.MPC, log)

	keyringID, err = strconv.ParseUint(config.KeyRingID, 10, 64)
	if err != nil {
		return
	}

	identity, err = client.NewIdentityFromSeed(derivationPath, config.Mnemonic)
	if err != nil {
		return
	}
	return
}

func makeFusionGRPCClient(config *ServiceConfig, identity client.Identity) (QueryClient, TxClient, error) {
	fusionGRPCClient, err := grpc.Dial(
		config.FusionURL,
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	)
	if err != nil {
		return nil, nil, err
	}
	queryClient := client.NewQueryClientWithConn(fusionGRPCClient)
	txClient := client.NewTxClient(identity, config.ChainID, fusionGRPCClient, queryClient)
	return queryClient, txClient, nil
}
