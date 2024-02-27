package main

import (
	"context"
	"encoding/binary"
	"fmt"
	"log"
	"log/slog"
	"net/http"
	"os"

	"github.com/sethvargo/go-envconfig"
	"google.golang.org/grpc/connectivity"

	"github.com/warden-protocol/wardenprotocol/keychain-sdk"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types"
)

type Config struct {
	ChainID        string `env:"CHAIN_ID, default=wardenprotocol"`
	GRPCURL        string `env:"GRPC_URL, default=localhost:9090"`
	GRPCInsecure   bool   `env:"GRPC_INSECURE, default=true"`
	DerivationPath string `env:"DERIVATION_PATH, default=m/44'/118'/0'/0/0"`
	Mnemonic       string `env:"MNEMONIC, default=exclude try nephew main caught favorite tone degree lottery device tissue tent ugly mouse pelican gasp lava flush pen river noise remind balcony emerge"`
	KeychainAddr   string `env:"KEYCHAIN_ADDR, default=wardenkeychain14a2hpadpsy9h55wuja0"`

	KeyringMnemonic string `env:"KEYRING_MNEMONIC, required"`
	KeyringPassword string `env:"KEYRING_PASSWORD, required"`

	HttpAddr string `env:"HTTP_ADDR, default=:8080"`
}

func main() {
	logger := slog.New(slog.NewTextHandler(os.Stderr, &slog.HandlerOptions{}))

	var cfg Config
	if err := envconfig.Process(context.Background(), &cfg); err != nil {
		log.Fatal(err)
	}

	bip44, err := FromSeedPhrase(cfg.KeyringMnemonic, cfg.KeyringPassword)
	if err != nil {
		logger.Error("failed to initialize bip44 keychain", "error", err)
		return
	}

	app := keychain.NewApp(keychain.Config{
		Logger:         logger,
		ChainID:        cfg.ChainID,
		GRPCURL:        cfg.GRPCURL,
		GRPCInsecure:   cfg.GRPCInsecure,
		DerivationPath: cfg.DerivationPath,
		Mnemonic:       cfg.Mnemonic,
		KeychainAddr:   cfg.KeychainAddr,
	})

	app.SetKeyRequestHandler(func(w keychain.KeyResponseWriter, req *keychain.KeyRequest) {
		if req.KeyType != types.KeyType_KEY_TYPE_ECDSA_SECP256K1 {
			err := w.Reject("unsupported key type")
			if err != nil {
				logger.Error("failed to reject key request", "error", err)
			}
			return
		}

		id, err := bigEndianBytesFromUint32(req.Id)
		if err != nil {
			logger.Error("failed to convert key id to big endian bytes", "error", err)
			w.Reject("request ID is too large")
			return
		}

		pubKey, err := bip44.PublicKey(id)
		if err != nil {
			logger.Error("failed to get public key", "error", err)
			w.Reject("failed to get public key")
			return
		}

		w.Fulfil(pubKey)
	})

	app.SetSignRequestHandler(func(w keychain.SignResponseWriter, req *keychain.SignRequest) {
		id, err := bigEndianBytesFromUint32(req.Id)
		if err != nil {
			logger.Error("failed to convert sign request id to big endian bytes", "error", err)
			w.Reject("request ID is too large")
			return
		}

		signature, _, err := bip44.Sign(id, req.DataForSigning)
		if err != nil {
			logger.Error("failed to sign message", "error", err)
			w.Reject("failed to sign message")
			return
		}

		w.Fulfil(signature)
	})

	if cfg.HttpAddr != "" {
		logger.Info("starting HTTP server", "addr", cfg.HttpAddr)
		http.HandleFunc("/healthcheck", func(w http.ResponseWriter, r *http.Request) {
			if app.ConnectionState() == connectivity.Ready {
				w.WriteHeader(http.StatusOK)
			} else {
				w.WriteHeader(http.StatusServiceUnavailable)
			}
		})
		go http.ListenAndServe(cfg.HttpAddr, nil)
	}

	app.Start(context.TODO())
}

func bigEndianBytesFromUint32(n uint64) ([4]byte, error) {
	if n > 0xffffffff {
		return [4]byte{}, fmt.Errorf("number is too large to fit in 4 bytes")
	}

	b := make([]byte, 4)
	binary.BigEndian.PutUint32(b, uint32(n))
	return [4]byte(b), nil
}
