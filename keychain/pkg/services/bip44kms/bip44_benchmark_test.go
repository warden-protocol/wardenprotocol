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
)

var cryptoTests = []struct {
	name string
	c    CryptoSystem
}{
	{
		"ECDSA",
		ECDSA,
	},
	{
		"EdDSA",
		EDDSA,
	},
}

func Benchmark_CreateKey(b *testing.B) {
	for _, tc := range bip44tests[0:2] {
		keyIDStr := fmt.Sprintf("0x%0*x", keyIDLength, tc.keyID)
		id := hexutil.MustDecode(keyIDStr)
		b.Run(tc.name, func(b *testing.B) {
			for _, tt := range cryptoTests {
				b.Run(tt.name, func(b *testing.B) {
					k, err := NewBip44Keychain(testMnemonic, "password")
					if err != nil {
						b.Fatal(err)
					}
					for i := 0; i < b.N; i++ {
						if _, err := k.PublicKey(id, tt.c); err != nil {
							b.Fatal(err)
						}
					}
				})
			}
		})

	}
}

func Benchmark_CreateSig(b *testing.B) {
	for _, tc := range bip44tests[0:2] {
		keyIDStr := fmt.Sprintf("0x%0*x", keyIDLength, tc.keyID)
		id := hexutil.MustDecode(keyIDStr)
		b.Run(tc.name, func(b *testing.B) {
			for _, tt := range cryptoTests {
				k, err := NewBip44Keychain(testMnemonic, "password")
				if err != nil {
					b.Fatal(err)
				}
				b.Run(tt.name, func(b *testing.B) {
					for i := 0; i < b.N; i++ {
						if _, _, err := k.Signature(&SigRequestData{
							KeyID:   id,
							ID:      id,
							SigHash: testECDSASigHash[:],
						}, tt.c); err != nil {
							b.Fatal(err)
						}
					}
				})
			}
		})
	}
}
