package service

import (
	"testing"
	"time"

	"github.com/qredo/fusionchain/mpc-relayer/pkg/logger"
)

func Test_KeyStartStop(t *testing.T) {
	log, err := logger.NewLogger("error", "plain", false, "test")
	if err != nil {
		t.Fatal(err)
	}
	k := newKeyQueryProcessor("qredokeyring1ph63us46lyw56vrzgaq", mockQueryClient{}, make(chan *keyRequestQueueItem, 1), log, 1*time.Second, 5)
	if err := k.Start(); err != nil {
		t.Fatal(err)
	}
	if err := k.Stop(); err != nil {
		t.Fatal(err)
	}
	close(k.keyRequestChan)
}

func Test_SigStartStop(t *testing.T) {
	log, err := logger.NewLogger("error", "plain", false, "test")
	if err != nil {
		t.Fatal(err)
	}
	k := newSigQueryProcessor("qredokeyring1ph63us46lyw56vrzgaq", mockQueryClient{}, make(chan *signatureRequestQueueItem, 1), log, 1*time.Second, 5)
	if err := k.Start(); err != nil {
		t.Fatal(err)
	}
	if err := k.Stop(); err != nil {
		t.Fatal(err)
	}
	close(k.sigRequestChan)
}

func Test_ExecuteKeyQueryProcessor(t *testing.T) {
	log, err := logger.NewLogger("fatal", "plain", false, "test")
	if err != nil {
		t.Fatal(err)
	}
	k := newKeyQueryProcessor("qredokeyring1ph63us46lyw56vrzgaq", mockQueryClient{}, make(chan *keyRequestQueueItem, 1), log, 1*time.Second, 5)
	if err := k.executeKeyQuery(); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	close(k.stop)
	close(k.wait)
}

func Test_ExecuteSigQueryProcessor(t *testing.T) {
	log, err := logger.NewLogger("fatal", "plain", false, "test")
	if err != nil {
		t.Fatal(err)
	}
	s := newSigQueryProcessor("qredokeyring1ph63us46lyw56vrzgaq", mockQueryClient{}, make(chan *signatureRequestQueueItem, 1), log, 1*time.Second, 5)
	if err := s.executeSignatureQuery(); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	close(s.stop)
	close(s.wait)
}
