package main

import (
	"context"
	"encoding/binary"
	"encoding/json"
	"fmt"
	"log"
	"log/slog"
	"net/http"
	"os"
	"time"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/sethvargo/go-envconfig"
	"google.golang.org/grpc/connectivity"

	"github.com/warden-protocol/wardenprotocol/keychain-sdk"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

type Config struct {
	ChainID    string                `env:"CHAIN_ID, default=warden_1337-1"`
	GRPCURLs   GrpcNodeConfigDecoder `env:"GRPC_URLS, default=[{\"GRPCUrl\":\"localhost:9090\",\"GRPCInsecure\":true}] "`
	Mnemonic   string                `env:"MNEMONIC, default=exclude try nephew main caught favorite tone degree lottery device tissue tent ugly mouse pelican gasp lava flush pen river noise remind balcony emerge"`
	KeychainId uint64                `env:"KEYCHAIN_ID, default=1"`

	KeyringMnemonic string `env:"KEYRING_MNEMONIC, required"`
	KeyringPassword string `env:"KEYRING_PASSWORD, required"`

	BatchInterval time.Duration `env:"BATCH_INTERVAL, default=8s"`
	BatchSize     int           `env:"BATCH_SIZE, default=7"`
	GasLimit      uint64        `env:"GAS_LIMIT, default=400000"`
	TxTimeout     time.Duration `env:"TX_TIMEOUT, default=120s"`
	TxFee         int64         `env:"TX_FEE, default=400000"`

	HttpAddr string `env:"HTTP_ADDR, default=:8080"`

	LogLevel slog.Level `env:"LOG_LEVEL, default=debug"`

	ConsensusNodeThreshold uint8 `env:"CONSENSUS_NODE_THRESHOLD, default=1"`
}

type GrpcNodeConfig struct {
	GRPCUrl      string
	GRPCInsecure bool
}

type GrpcNodeConfigDecoder []GrpcNodeConfig

func (sd *GrpcNodeConfigDecoder) Decode(value string) error {
	nodeConfigs := make([]GrpcNodeConfig, 0)

	if err := json.Unmarshal([]byte(value), &nodeConfigs); err != nil {
		return fmt.Errorf("invalid map json: %w", err)
	}

	*sd = nodeConfigs

	return nil
}

func main() {
	var cfg Config
	if err := envconfig.Process(context.Background(), &cfg); err != nil {
		log.Fatal(err)
	}

	logger := slog.New(slog.NewTextHandler(os.Stderr, &slog.HandlerOptions{
		Level: cfg.LogLevel,
	}))

	bip44, err := FromSeedPhrase(cfg.KeyringMnemonic, cfg.KeyringPassword)
	if err != nil {
		logger.Error("failed to initialize bip44 keychain", "error", err)
		return
	}

	grpcConfigs, err := mapGrpcConfig(cfg.GRPCURLs)
	if err != nil {
		logger.Error("failed to initialize grpc configs", "error", err)
		return
	}

	app := keychain.NewApp(keychain.Config{
		BasicConfig: keychain.BasicConfig{
			Logger:        logger,
			ChainID:       cfg.ChainID,
			Mnemonic:      cfg.Mnemonic,
			KeychainID:    cfg.KeychainId,
			GasLimit:      cfg.GasLimit,
			BatchInterval: cfg.BatchInterval,
			BatchSize:     cfg.BatchSize,
			TxTimeout:     cfg.TxTimeout,
			TxFees:        sdk.NewCoins(sdk.NewCoin("uward", math.NewInt(cfg.TxFee))),
		},
		GRPCConfigs:            grpcConfigs,
		ConsensusNodeThreshold: cfg.ConsensusNodeThreshold,
	})

	app.SetKeyRequestHandler(func(w keychain.KeyResponseWriter, req *keychain.KeyRequest) {
		if req.KeyType != types.KeyType_KEY_TYPE_ECDSA_SECP256K1 {
			_ = w.Reject("unsupported key type")
			return
		}

		id, err := bigEndianBytesFromUint32(req.Id)
		if err != nil {
			logger.Error("failed to convert key id to big endian bytes", "error", err)
			_ = w.Reject("request ID is too large")
			return
		}

		pubKey, err := bip44.PublicKey(id)
		if err != nil {
			logger.Error("failed to get public key", "error", err)
			_ = w.Reject("failed to get public key")
			return
		}

		err = w.Fulfil(pubKey)
		if err != nil {
			logger.Error("failed to fulfil key request", "error", err)
		}
	})

	app.SetSignRequestHandler(func(w keychain.SignResponseWriter, req *keychain.SignRequest) {
		keyID, err := bigEndianBytesFromUint32(req.KeyId)
		if err != nil {
			logger.Error("failed to convert Key ID to big endian bytes", "error", err)
			_ = w.Reject("Key ID is too large")
			return
		}

		signature, err := bip44.Sign(keyID, req.DataForSigning)
		if err != nil {
			logger.Error("failed to sign message", "error", err)
			_ = w.Reject("failed to sign message")
			return
		}

		err = w.Fulfil(signature)
		if err != nil {
			logger.Error("failed to fulfil sign request", "error", err)
		}
	})

	if cfg.HttpAddr != "" {
		logger.Info("starting HTTP server", "addr", cfg.HttpAddr)
		http.HandleFunc("/healthcheck", func(w http.ResponseWriter, r *http.Request) {

			readyConnectionsCount := uint(0)
			for _, state := range app.ConnectionState() {
				if state == connectivity.Ready {
					readyConnectionsCount += 1
				}
			}

			if readyConnectionsCount >= uint(cfg.ConsensusNodeThreshold) {
				w.WriteHeader(http.StatusOK)
				return
			}

			w.WriteHeader(http.StatusServiceUnavailable)
		})
		go func() { _ = http.ListenAndServe(cfg.HttpAddr, nil) }()
	}

	err = app.Start(context.TODO())
	if err != nil {
		logger.Error("failed to start keychain app", "error", err)
	}
}

func bigEndianBytesFromUint32(n uint64) ([4]byte, error) {
	if n > 0xffffffff {
		return [4]byte{}, fmt.Errorf("number is too large to fit in 4 bytes")
	}

	b := make([]byte, 4)
	binary.BigEndian.PutUint32(b, uint32(n))
	return [4]byte(b), nil
}

func mapGrpcConfig(value GrpcNodeConfigDecoder) ([]keychain.GrpcNodeConfig, error) {
	var nodesLength = len(value)
	if nodesLength == 0 {
		return nil, fmt.Errorf("GRPCUrls must be specified")
	}

	result := make([]keychain.GrpcNodeConfig, 0, nodesLength)
	for _, item := range value {
		if item.GRPCUrl == "" {
			return nil, fmt.Errorf("GRPCUrl must be specified")
		}

		result = append(result, keychain.GrpcNodeConfig{
			GRPCInsecure: item.GRPCInsecure,
			GRPCURL:      item.GRPCUrl,
		})
	}

	return result, nil
}
