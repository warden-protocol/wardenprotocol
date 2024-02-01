// Copyright 2024
//
// This file includes work covered by the following copyright and permission notices:
//
// Copyright 2023 Qredo Ltd.
// Licensed under the Apache License, Version 2.0;
//
// This file is part of the Warden Protocol library.
//
// The Warden Protocol library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Warden Protocol library. If not, see https://github.com/warden-protocol/wardenprotocol/blob/main/LICENSE
package kms

import (
	"testing"
	"time"

	"github.com/warden-protocol/wardenprotocol/keychain/pkg/logger"
)

func Test_KeyStartStop(t *testing.T) {
	log, err := logger.NewLogger("error", "plain", false, "test")
	if err != nil {
		t.Fatal(err)
	}
	k := newKeyQueryProcessor("wardenkeychain1ph63us46lyw56lmt585", mockQueryClient{}, make(chan *keyRequestQueueItem, 1), log, 1*time.Second, 5)
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
	k := newSigQueryProcessor("wardenkeychain1ph63us46lyw56lmt585", mockQueryClient{}, make(chan *signatureRequestQueueItem, 1), log, 1*time.Second, 5)
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
	k := newKeyQueryProcessor("wardenkeychain1ph63us46lyw56lmt585", mockQueryClient{}, make(chan *keyRequestQueueItem, 1), log, 1*time.Second, 5)
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
	s := newSigQueryProcessor("wardenkeychain1ph63us46lyw56lmt585", mockQueryClient{}, make(chan *signatureRequestQueueItem, 1), log, 1*time.Second, 5)
	if err := s.executeSignatureQuery(); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	close(s.stop)
	close(s.wait)
}
