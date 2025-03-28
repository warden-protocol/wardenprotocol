package keychain_test

import (
	"context"
	"log/slog"
	"os"
	"time"

	"github.com/warden-protocol/wardenprotocol/keychain-sdk"
)

// A full Keychain example. The only missing thing is the implementation of the
// KeyRequestHandler and SignRequestHandler methods to respond with the actual
// payload.
func Main() {
	logger := slog.New(slog.NewTextHandler(os.Stderr, &slog.HandlerOptions{
		Level: slog.LevelDebug,
	}))

	app := keychain.NewApp(keychain.Config{
		Logger: logger, // not required, but recommended

		// setup the connection to the Warden Protocol node
		ChainID:      "warden",
		GRPCURL:      "localhost:9090",
		GRPCInsecure: true,

		// setup the account used to write txs
		KeychainID: 1,
		Mnemonic:   "virus boat radio apple pilot ask vault exhaust again state doll stereo slide exhibit scissors miss attack boat budget egg bird mask more trick",

		// setup throughput for batching responses
		GasLimit:      400000,
		BatchInterval: 8 * time.Second,
		BatchSize:     10,
	})

	app.SetKeyRequestHandler(func(ctx context.Context, w keychain.KeyResponseWriter, req *keychain.KeyRequest) {
		// handle key request
		if err := w.Fulfil(ctx, []byte("public key data")); err != nil {
			logger.Error("could not fulfill key request", "error", err)
		}
	})

	app.SetSignRequestHandler(func(ctx context.Context, w keychain.SignResponseWriter, req *keychain.SignRequest) {
		// handle sign request
		if err := w.Fulfil(ctx, []byte("signature data")); err != nil {
			logger.Error("could not fulfill sign request", "error", err)
		}
	})

	if err := app.Start(context.TODO()); err != nil {
		panic(err)
	}
}
