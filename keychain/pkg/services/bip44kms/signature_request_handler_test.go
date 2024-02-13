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
	"fmt"
	"testing"

	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/warden-protocol/wardenprotocol/keychain/pkg/database"
	"github.com/warden-protocol/wardenprotocol/keychain/pkg/logger"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types"
)

func Test_SigControllerStart(t *testing.T) {
	k := testSetupSignatureController(t)
	if err := k.Start(); err != nil {
		t.Fatal(err)
	}
	if err := k.Stop(); err != nil {
		t.Fatal(err)
	}
	close(k.queue)
}

func Test_ExecuteSigQuery(t *testing.T) {
	tests := []struct {
		name      string
		item      signatureRequestQueueItem
		expectErr bool
	}{
		{
			"simple",
			signatureRequestQueueItem{
				maxTries: 5,
				request:  &types.SignRequest{Id: 1, KeyId: 1, DataForSigning: hexutil.MustDecode("0x" + fmt.Sprintf("%0*v", 64, 1))},
			},
			false,
		},
		{
			"bad hash",
			signatureRequestQueueItem{
				maxTries: 5,
				request:  &types.SignRequest{Id: 1, KeyId: 1, DataForSigning: hexutil.MustDecode("0x" + fmt.Sprintf("%0*v", 62, 1))},
			},
			true,
		},
	}

	for _, tt := range tests {

		k := testSetupSignatureController(t)
		_ = k.Healthcheck()
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

func testSetupSignatureController(t *testing.T) *signatureController {
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
	cl, err := NewBip44Keychain(mn, "")
	if err != nil {
		t.Fatal(err)
	}
	return newWardenSignatureController(log, memoryDB, make(chan *signatureRequestQueueItem, defaultChanSize), cl, mockTxClient{})
}
