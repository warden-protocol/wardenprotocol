package mpcrelayer

import (
	"time"

	"github.com/cosmos/cosmos-sdk/crypto/hd"
	"github.com/qredo/fusionchain/go-client"
	"github.com/qredo/fusionchain/keyring/pkg/database"
	"github.com/qredo/fusionchain/keyring/pkg/fusionclient"
	"github.com/qredo/fusionchain/keyring/pkg/logger"
	"github.com/qredo/fusionchain/keyring/pkg/mpc"
	"github.com/sirupsen/logrus"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

// BuildService constructs the main application based on supplied config parameters
func BuildService(config ServiceConfig) (*Service, error) {
	cfg, useDefault := sanitizeConfig(config) // set default values is none supplied

	log, err := logger.NewLogger(logger.Level(cfg.LogLevel), logger.Format(cfg.LogFormat), cfg.LogToFile, serviceName)
	if err != nil {
		return nil, err
	}
	if useDefault {
		log.Info("no config file supplied, using default values")
	}

	// Use in-memory database if no path provided
	inMem := cfg.Path == ""
	if inMem {
		log.Info("creating in-memory key-value store. Your keyring data will not be persisted.")
	}
	dB, err := makeDB(cfg.Path, inMem)
	if err != nil {
		return nil, err
	}

	keyringAddr, mnemonic, password, identity, mpcClient, err := makeKeyringClient(&cfg, log, dB)
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
	return New(keyringAddr, identity.Address.String(), mnemonic, password, cfg.Port, log, dB,
		newKeyQueryProcessor(keyringAddr, queryClient, keyChan, log, time.Duration(cfg.QueryInterval)*time.Second, int(cfg.MaxTries)),
		newSigQueryProcessor(keyringAddr, queryClient, sigchan, log, time.Duration(cfg.QueryInterval)*time.Second, int(cfg.MaxTries)),
		newFusionKeyController(log, dB, keyChan, mpcClient, txClient),
		newFusionSignatureController(log, dB, sigchan, mpcClient, txClient),
	), nil
}

func makeDB(path string, inMemory bool) (database.Database, error) {
	kv, err := database.NewBadger(path, inMemory)
	if err != nil {
		return nil, err
	}
	return database.NewPrefixDB("", kv), nil
}

func makeKeyringClient(config *ServiceConfig, log *logrus.Entry, dB database.Database) (keyringAddr, mnemonic, password string, identity client.Identity, mpcClient mpc.Client, err error) {
	keyringAddr = config.Keyring
	password = config.Password

	// A mnemonic seed value in the database supersedes all other values
	mnDB, err := dB.Get(mnemonicKey)
	if err == database.ErrNotFound || string(mnDB) == "" {
		mnemonic = config.Mnemonic // ENV or YAML var
		if mnemonic == "" {
			// If no mnemonic ENV VAR is supplied, create a new one
			// Note that the mnemonic is NOT persistently stored
			// Once created it can only be accessed via the '/mnemonic' endpoint
			mnemonic, err = GenerateMnemonic()
			if err != nil {
				return
			}
		}
		// Save to database
		if err = dB.Persist(mnemonicKey, []byte(mnemonic)); err != nil {
			return
		}
	} else {
		mnemonic = string(mnDB)
	}
	// log if running in debug mode
	log.WithField("mnemonic", mnemonic).Debug("seed phrase")

	mpcClient = mpc.NewClient(config.MPC, log, keyringAddr)

	identity, err = client.NewIdentityFromSeed(hd.BIP44Params{Purpose: 44, CoinType: 60, Account: 0, Change: false, AddressIndex: 0}.String(), config.Mnemonic)
	if err != nil {
		return
	}
	return
}

func makeFusionGRPCClient(config *ServiceConfig, identity client.Identity) (fusionclient.QueryClient, fusionclient.TxClient, error) {
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
