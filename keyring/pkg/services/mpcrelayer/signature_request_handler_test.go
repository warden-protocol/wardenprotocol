// Copyright 2023 Qredo Ltd.
// This file is part of the Fusion library.
//
// The Fusion library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Fusion library. If not, see https://github.com/qredo/fusionchain/blob/main/LICENSE
package mpcrelayer

import (
	"fmt"
	"testing"

	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/qredo/fusionchain/keyring/pkg/database"
	"github.com/qredo/fusionchain/keyring/pkg/logger"
	"github.com/qredo/fusionchain/keyring/pkg/mpc"
	"github.com/qredo/fusionchain/x/treasury/types"
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
	cl := mpc.NewClient(mpc.Config{Mock: true}, log, "test")
	return newFusionSignatureController(log, memoryDB, make(chan *signatureRequestQueueItem, defaultChanSize), cl, mockTxClient{})
}
