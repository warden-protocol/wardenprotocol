package ethsecp256k1

import (
	"fmt"
	"testing"
)

func BenchmarkGenerateKey(b *testing.B) {
	b.ReportAllocs()
	for i := 0; i < b.N; i++ {
		if _, err := GenerateKey(); err != nil {
			b.Fatal(err)
		}
	}
}

func BenchmarkPubKey_VerifySignature(b *testing.B) {
	privKey, err := GenerateKey()
	if err != nil {
		b.Fatal(err)
	}
	pubKey := privKey.PubKey()

	b.ResetTimer()
	b.ReportAllocs()
	for i := 0; i < b.N; i++ {
		msg := []byte(fmt.Sprintf("%10d", i))
		sig, err := privKey.Sign(msg)
		if err != nil {
			b.Fatal(err)
		}
		pubKey.VerifySignature(msg, sig)
	}
}
