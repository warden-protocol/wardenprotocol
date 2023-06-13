// Command mmpc runs a mocked MPC network.
package main

import (
	"context"
	"fmt"

	"google.golang.org/grpc"
)

var (
	fusionChainGRPCAddr = "localhost:9790"
	chainID             = "fusion_420-1"
	addrPrefix          = "qredo"
	derivationPath      = "m/44'/60'/0'/0/0"
)

func main() {
	seedPhrase := "exclude try nephew main caught favorite tone degree lottery device tissue tent ugly mouse pelican gasp lava flush pen river noise remind balcony emerge"
	id := NewTxIdentityFromSeed(seedPhrase)
	fmt.Println("Starting MPC node with identity:", id.Address.String())

	fusionConn := MustConnectFusionChain()

	authClient := NewAuthClient(fusionConn)
	txClient := NewTxClient(id, fusionConn, authClient)
	treasuryClient := NewTreasuryClient(id, fusionConn, txClient)
	keyDB := NewMemoryDB()
	walletRequestsHandler := &MockWalletRequestsHandler{
		KeyDB:          keyDB,
		TreasuryClient: treasuryClient,
	}

	engine := &Engine{
		TreasuryClient:        treasuryClient,
		WalletRequestsHandler: walletRequestsHandler,
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
