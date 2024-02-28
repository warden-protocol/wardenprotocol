package keychain

import (
	"log/slog"
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

	// KeychainAddr is the address of the keychain this instance will fetch requests for.
	KeychainAddr string

	// DerivationPath is the derivation path to use with the Mnemonic to derive this Keychain's party private key.
	DerivationPath string

	// Mnemonic is the mnemonic to use to derive this Keychain's party private key.
	Mnemonic string
}
