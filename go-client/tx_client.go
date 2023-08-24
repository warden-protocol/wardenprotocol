package client

import (
	"google.golang.org/grpc"
)

type TxClient struct {
	*RawTxClient
	*TreasuryTxClient
}

func NewTxClient(id Identity, chainID string, c *grpc.ClientConn, accountFetcher AccountFetcher) *TxClient {
	raw := NewRawTxClient(id, chainID, c, accountFetcher)
	return &TxClient{
		RawTxClient:      raw,
		TreasuryTxClient: NewTreasuryTxClient(raw),
	}
}
