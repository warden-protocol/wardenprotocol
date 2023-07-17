// Command mokr is a mocked keyring for Fusion Chain.
//
// It is used during development to test the application,
// it generates ECDSA secp256k1 keys and signatures,
// using an in-memory database.
package main

import (
	"context"
	"fmt"

	"google.golang.org/grpc"
)

// chain configuration
var (
	fusionChainGRPCAddr = "localhost:9790"
	chainID             = "fusion_420-1"
	addrPrefix          = "qredo"
	derivationPath      = "m/44'/60'/0'/0/0"
)

// identity configuration
var (
	keyringID  uint64 = 0
	seedPhrase        = "exclude try nephew main caught favorite tone degree lottery device tissue tent ugly mouse pelican gasp lava flush pen river noise remind balcony emerge"
)

func main() {
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
		grpc.WithInsecure(),
	)
	if err != nil {
		panic(err)
	}
	return grpcConn
}
