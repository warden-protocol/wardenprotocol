package keychain

import (
	"log/slog"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
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

	// DerivationPath is the derivation path to use with the Mnemonic to derive this Keychain's writer private key.
	DerivationPath string

	// Mnemonic is the mnemonic to use to derive this Keychain's writer private key.
	Mnemonic string

	// BatchInterval is the time to wait before sending a batch of requests to the blockchain.
	// Tipically, the batch timeout should be set to the time it takes to produce a block on the blockchain.
	BatchInterval time.Duration

	// BatchSize is the maximum number of requests to batch together before sending them to the blockchain.
	BatchSize int

	// GasLimit is the maximum amount of gas to use for each transaction.
	// The more messages in a batch, the more gas is needed.
	GasLimit uint64

	// TxFees are the coins used as fees for the transaction sent.
	TxFees sdk.Coins

	// TxTimeout is the amount of time to wait for a transaction to be included
	// in a block after having broadcasted it. If the transaction isn't
	// included in a block, it will be considered as failed (but the blockchain
	// might still include in a block later).
	TxTimeout time.Duration
}
