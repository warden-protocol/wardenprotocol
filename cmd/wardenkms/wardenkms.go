package main

import (
	"context"
	"encoding/binary"
	"encoding/json"
	"errors"
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
	ChainID    string `env:"CHAIN_ID, default=warden_1337-1"`
	GRPCURLs   string `env:"GRPC_URLS, default=[{\"GRPCUrl\":\"localhost:9090\",\"GRPCInsecure\":true}]"`
	Mnemonic   string `env:"MNEMONIC, default=exclude try nephew main caught favorite tone degree lottery device tissue tent ugly mouse pelican gasp lava flush pen river noise remind balcony emerge"`
	KeychainId uint64 `env:"KEYCHAIN_ID, default=1"`

	KeyringMnemonic string `env:"KEYRING_MNEMONIC, required"`
	KeyringPassword string `env:"KEYRING_PASSWORD, required"`

	BatchInterval time.Duration `env:"BATCH_INTERVAL, default=8s"`
	BatchSize     int           `env:"BATCH_SIZE, default=7"`
	GasLimit      uint64        `env:"GAS_LIMIT, default=400000"`
	TxTimeout     time.Duration `env:"TX_TIMEOUT, default=120s"`
	TxFee         int64         `env:"TX_FEE, default=400000"`
	Denom         string        `env:"DENOM, default=award"`

	HttpAddr string `env:"HTTP_ADDR, default=:8080"`

	LogLevel slog.Level `env:"LOG_LEVEL, default=debug"`

	ConsensusNodeThreshold uint8 `env:"CONSENSUS_NODE_THRESHOLD, default=1"`
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

	var grpcConfigs []keychain.GRPCNodeConfig
	if err := json.Unmarshal([]byte(cfg.GRPCURLs), &grpcConfigs); err != nil {
		logger.Error("failed to initialize grpc configs", "error", err)
		return
	}

	app := keychain.NewApp(keychain.Config{
		Logger:                 logger,
		ChainID:                cfg.ChainID,
		Mnemonic:               cfg.Mnemonic,
		KeychainID:             cfg.KeychainId,
		GasLimit:               cfg.GasLimit,
		BatchInterval:          cfg.BatchInterval,
		BatchSize:              cfg.BatchSize,
		TxTimeout:              cfg.TxTimeout,
		TxFees:                 sdk.NewCoins(sdk.NewCoin(cfg.Denom, math.NewInt(cfg.TxFee))),
		Nodes:                  grpcConfigs,
		ConsensusNodeThreshold: cfg.ConsensusNodeThreshold,
	})

	app.SetKeyRequestHandler(func(ctx context.Context, w keychain.Writer, req *keychain.KeyRequest) {
		if req.KeyType != types.KeyType_KEY_TYPE_ECDSA_SECP256K1 {
			_ = w.Reject(ctx, "unsupported key type")
			return
		}

		id, err := bigEndianBytesFromUint32(req.Id)
		if err != nil {
			logger.Error("failed to convert key id to big endian bytes", "error", err)
			_ = w.Reject(ctx, "request ID is too large")
			return
		}

		pubKey, err := bip44.PublicKey(id)
		if err != nil {
			logger.Error("failed to get public key", "error", err)
			_ = w.Reject(ctx, "failed to get public key")
			return
		}

		err = w.Fulfil(ctx, pubKey)
		if err != nil {
			logger.Error("failed to fulfil key request", "error", err)
		}
	})

	app.SetSignRequestHandler(func(ctx context.Context, w keychain.Writer, req *keychain.SignRequest) {
		keyID, err := bigEndianBytesFromUint32(req.KeyId)
		if err != nil {
			logger.Error("failed to convert Key ID to big endian bytes", "error", err)
			_ = w.Reject(ctx, "Key ID is too large")
			return
		}

		signature, err := bip44.Sign(keyID, req.DataForSigning)
		if err != nil {
			logger.Error("failed to sign message", "error", err)
			_ = w.Reject(ctx, "failed to sign message")
			return
		}

		err = w.Fulfil(ctx, signature)
		if err != nil {
			logger.Error("failed to fulfil sign request", "error", err)
		}
	})

	if cfg.HttpAddr != "" {
		logger.Info("starting HTTP server", "addr", cfg.HttpAddr)
		http.HandleFunc("/healthcheck", func(w http.ResponseWriter, r *http.Request) {
			connectionStates := app.ConnectionState()

			readyConnectionsCount := uint(0)
			nodes := make([]NodeStatus, 0, len(connectionStates))

			for url, state := range connectionStates {
				if state == connectivity.Ready {
					readyConnectionsCount += 1
				}

				nodes = append(nodes, NodeStatus{
					Address: url,
					Status:  state.String(),
				})
			}

			bytes, err := json.Marshal(HealthCheckResponse{
				Online:    readyConnectionsCount,
				Total:     uint(len(connectionStates)),
				Nodes:     nodes,
				Threshold: cfg.ConsensusNodeThreshold,
			})

			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				return
			}

			if readyConnectionsCount >= uint(cfg.ConsensusNodeThreshold) {
				w.WriteHeader(http.StatusOK)
			} else {
				w.WriteHeader(http.StatusServiceUnavailable)
			}

			_, _ = w.Write(bytes)
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
		return [4]byte{}, errors.New("number is too large to fit in 4 bytes")
	}

	b := make([]byte, 4)
	binary.BigEndian.PutUint32(b, uint32(n))
	return [4]byte(b), nil
}
