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
