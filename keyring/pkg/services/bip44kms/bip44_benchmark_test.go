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
package kms

import (
	"fmt"
	"testing"

	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/qredo/fusionchain/keyring/pkg/mpc"
)

var cryptoTests = []struct {
	name string
	c    mpc.CryptoSystem
}{
	{
		"ECDSA",
		mpc.EcDSA,
	},
	{
		"EdDSA",
		mpc.EdDSA,
	},
}

func Benchmark_CreateKey(b *testing.B) {
	for _, tc := range bip44tests[0:2] {
		keyIDStr := fmt.Sprintf("0x%0*x", keyIDLength, tc.keyID)
		id := hexutil.MustDecode(keyIDStr)
		b.Run(tc.name, func(b *testing.B) {
			for _, tt := range cryptoTests {
				b.Run(tt.name, func(b *testing.B) {
					k, err := NewBip44KeyRing(testMnemonic, "password", tt.c)
					if err != nil {
						b.Fatal(err)
					}
					for i := 0; i < b.N; i++ {
						if _, err := k.PublicKey(id); err != nil {
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
				k, err := NewBip44KeyRing(testMnemonic, "password", tt.c)
				if err != nil {
					b.Fatal(err)
				}
				b.Run(tt.name, func(b *testing.B) {
					for i := 0; i < b.N; i++ {
						if _, _, err := k.Signature(&mpc.SigRequestData{
							KeyID:   id,
							ID:      id,
							SigHash: testECDSASigHash[:],
						}); err != nil {
							b.Fatal(err)
						}
					}
				})
			}
		})
	}
}
