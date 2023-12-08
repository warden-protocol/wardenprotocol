package kms

import (
	"context"
	"testing"

	"github.com/qredo/fusionchain/go-client"
	"github.com/qredo/fusionchain/keyring/pkg/database"
	"github.com/qredo/fusionchain/keyring/pkg/logger"
	"github.com/qredo/fusionchain/keyring/pkg/mpc"
	"github.com/qredo/fusionchain/x/treasury/types"
)

type mockQueryClient struct{}

func (m mockQueryClient) PendingKeyRequests(ctx context.Context, page *client.PageRequest, keyringAddr string) ([]*types.KeyRequest, error) {
	return []*types.KeyRequest{&types.KeyRequest{}}, nil
}

func (m mockQueryClient) PendingSignatureRequests(ctx context.Context, page *client.PageRequest, keyringAddr string) ([]*types.SignRequest, error) {
	return []*types.SignRequest{&types.SignRequest{}}, nil
}

type mockTxClient struct{}

func (m mockTxClient) FulfilKeyRequest(ctx context.Context, requestID uint64, publicKey []byte) error {
	return nil
}

func (m mockTxClient) FulfilSignatureRequest(ctx context.Context, requestID uint64, publicKey []byte) error {
	return nil
}
func (m mockTxClient) RejectSignatureRequest(ctx context.Context, requestID uint64, reason string) error {
	return nil
}

func Test_KeyControllerStartStop(t *testing.T) {
	k := testSetupKeyController(t)
	if err := k.Start(); err != nil {
		t.Fatal(err)
	}
	_ = k.Healthcheck()
	if err := k.Stop(); err != nil {
		t.Fatal(err)
	}
	close(k.queue)
}

func Test_ExecuteKeyQuery(t *testing.T) {

	tests := []struct {
		name      string
		item      keyRequestQueueItem
		expectErr bool
	}{
		{
			"simple",
			keyRequestQueueItem{
				maxTries: 5,
				request:  &types.KeyRequest{Id: 1},
			},
			false,
		},
	}

	for _, tt := range tests {
		k := testSetupKeyController(t)
		t.Run(tt.name, func(t *testing.T) {
			err := k.executeRequest(&tt.item)
			if (err != nil) != tt.expectErr {
				t.Fatalf("unexpected error: %v", err)
			}
		})
		close(k.queue)
		close(k.wait)
		close(k.stop)
	}

}

func testSetupKeyController(t *testing.T) *keyController {
	log, err := logger.NewLogger("fatal", "plain", false, "test")
	if err != nil {
		t.Fatal(err)
	}
	memoryDB, err := database.NewBadger("", true)
	if err != nil {
		t.Fatal(err)
	}
	mn, err := GenerateMnemonic()
	if err != nil {
		t.Fatal(err)
	}
	cl, err := NewBip44KeyRing(mn, "", mpc.EcDSA)
	if err != nil {
		t.Fatal(err)
	}
	return newFusionKeyController(log, memoryDB, make(chan *keyRequestQueueItem, defaultChanSize), cl, mockTxClient{})
}
