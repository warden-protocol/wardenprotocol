// Command mokr is a mocked keyring for Fusion Chain.
//
// It is used during development to test the application,
// it generates ECDSA secp256k1 keys and signatures,
// using an in-memory database.
package main

import (
	"context"
	"fmt"
	"os"
	"strconv"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

// chain configuration
var (
	fusionChainGRPCAddr = envOrDefault("FUSION_URL", "localhost:9790")
	chainID             = envOrDefault("CHAIN_ID", "fusion_420-1")
	addrPrefix          = envOrDefault("BECH32_PREFIX", "qredo")
	derivationPath      = envOrDefault("DERIVATION_PATH", "m/44'/60'/0'/0/0")
)

// identity configuration
var (
	keyringID  = envOrDefault("KEYRING_ID", "0")
	seedPhrase = envOrDefault("MNEMONIC", "exclude try nephew main caught favorite tone degree lottery device tissue tent ugly mouse pelican gasp lava flush pen river noise remind balcony emerge")
)

func main() {
	keyringID, err := strconv.ParseUint(keyringID, 10, 64)
	if err != nil {
		panic(err)
	}

	txIdentity := NewTxIdentityFromSeed(seedPhrase)
	keyringIdentity := KeyringIdentity{
		KeyringID:  keyringID,
		TxIdentity: txIdentity,
	}
	fmt.Printf("Starting MPC node. KeyringID=%d Address=%s\n", keyringIdentity.KeyringID, keyringIdentity.Address.String())

	fusionConn := MustConnectFusionChain()

	authClient := NewAuthClient(fusionConn)
	txClient := NewTxClient(keyringIdentity.TxIdentity, fusionConn, authClient)
	treasuryClient := NewTreasuryClient(keyringIdentity, fusionConn, txClient)
	keyDB := NewMemoryDB()
	keyRequestsHandler := &MockKeyRequestsHandler{
		KeyDB:          keyDB,
		TreasuryClient: treasuryClient,
	}
	signatureRequestsHandler := &MockSignatureRequestsHandler{
		KeyDB:          keyDB,
		TreasuryClient: treasuryClient,
	}

	engine := &Engine{
		TreasuryClient:           treasuryClient,
		KeyRequestsHandler:       keyRequestsHandler,
		SignatureRequestsHandler: signatureRequestsHandler,
	}

	ctx := context.Background()
	engine.Loop(ctx)
}

func MustConnectFusionChain() *grpc.ClientConn {
	grpcConn, err := grpc.Dial(
		fusionChainGRPCAddr,
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	)
	if err != nil {
		panic(err)
	}
	return grpcConn
}

func envOrDefault(key, defaultValue string) string {
	if v, found := os.LookupEnv(key); found {
		return v
	}
	return defaultValue
}
