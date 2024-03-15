package keychain

import (
	"log/slog"
	"time"
)

type Config struct {
	Logger *slog.Logger

	// ChainID is the chain ID of the chain the keychain is running on.
	ChainID string

	// GRPCURL is the URL of the gRPC server to connect to.
	// e.g. "localhost:9090"
	GRPCURL string

	// GRPCInsecure is whether to use an insecure connection to the gRPC server.
	GRPCInsecure bool

	// KeychainId is the ID of the keychain this instance will fetch requests for.
	KeychainId uint64

	// DerivationPath is the derivation path to use with the Mnemonic to derive this Keychain's party private key.
	DerivationPath string

	// Mnemonic is the mnemonic to use to derive this Keychain's party private key.
	Mnemonic string

	// BatchTimeout is the time to wait before sending a batch of requests to the blockchain.
	// Tipically, the batch timeout should be set to the time it takes to produce a block on the blockchain.
	BatchTimeout time.Duration

	// BatchSize is the maximum number of requests to batch together before sending them to the blockchain.
	BatchSize int

	// GasLimit is the maximum amount of gas to use for each transaction.
	// The more messages in a batch, the more gas is needed.
	GasLimit uint64
}
