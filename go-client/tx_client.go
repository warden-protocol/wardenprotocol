package client

import (
	"google.golang.org/grpc"
)

// TxClient can read/write transactions to wardend and endpoints provided by the treasury module.
type TxClient struct {
	*RawTxClient
}

// NewTxClient returns a TxClient.
func NewTxClient(id Identity, chainID string, c *grpc.ClientConn, accountFetcher AccountFetcher) *TxClient {
	raw := NewRawTxClient(id, chainID, c, accountFetcher)

	return &TxClient{
		RawTxClient: raw,
	}
}
