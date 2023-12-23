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
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"math/rand"
	"testing"

	"github.com/qredo/fusionchain/keyring/pkg/mpc"
)

const (
	testMnemonic = "annual dignity mountain defy false tuition awesome copy maze lava then orchard catch plug input stuff pyramid until illegal cash process tenant federal wall"
)

var (
	testECDSASigHash = sha256.Sum256([]byte("Hello World!"))
	testEdDSAMsg     = []byte("Hello World!")
	bip44tests       = []struct {
		name                   string
		keyID                  uint32
		keyIDHex               string
		expectedECDSAPubKey    string
		expectedECDSAPubKeySig string
		expectedECDSASig       string
		expectedEdDSAPubKey    string
		expectedEdDSAPubKeySig string
		expectedEdDSASig       string
		expectedErrMsg         string
	}{
		{
			name:                   "min",
			keyID:                  0, // min value
			keyIDHex:               "0000000000000000000000000000000000000000000000000000000000000000",
			expectedECDSAPubKey:    "036e0c9720576370d6e5b9414feed79534a7f746e83ca8d0c96887b628ce0be52a",
			expectedECDSAPubKeySig: "a16e92ec15f4158a300f61a4a9a955702c7f1ae6cebcacd7e1ff8801a81e1fc30011368794ebd8e224779551034f40efa78e51a872050bbf47a55373d59c7a741c",
			expectedECDSASig:       "37975d94518aa82bf3f26d3e86e3c40bddca106a85761e6accdcd800add76784439afe8a4b77662caa6f266d6178a63afd8c261b439db64696d3d788ff77b9f21c",
			expectedEdDSAPubKey:    "4848593616843873ed491a319c21f509c371d83bb9f5ffb52071dcdbb8a2a9c3",
			expectedEdDSASig:       "628d3be0cfecd756a6dc530218ffe5f47c299108811965f76cc8c9b185cbd0ca0d6e3c9e4fe0bbf93e92dfc52283f336006c1cfec48a762fc01ebca496321e01",
		},
		{
			name:                   "max",
			keyID:                  (1 << 31) - 1, // max value = max(int32)
			keyIDHex:               "000000000000000000000000000000000000000000000000000000007fffffff",
			expectedECDSAPubKey:    "0238e988c44c1e953c9315a6fd4d947070efcd2c99b8e28ddad35ca26b9763026f",
			expectedECDSAPubKeySig: "7300f3915028d036454107a49de863da2062f1b8f8b804c143aa1f044d23617900b3802f57fb49e9307d45ed2d7477f8eb446fea552b1cf7af0433ea3db183d51c",
			expectedECDSASig:       "fd36bc6bfd57bed85e8b96b47270cfb1ef7a3d6bac52b79c42022d831b2b839736d7801c593c068e591dfc3ed4de9043a75157a57b061fa31b52a994a933339d1c",
			expectedEdDSAPubKey:    "df5b3705ee5810f097947d6f09bc7c9b744b1af2f208c8b4085903b5f415ac33",
			expectedEdDSASig:       "4bd4093b4f36a017c976df3413a7a7d66979f2d58fb838f44add66bd8f28324bf65c3b607e89513cead9529d986d0966075435112075b489684f764e13902c00",
		},
		{
			name:           "too big",
			keyID:          (1 << 31), // max(int32) + 1
			keyIDHex:       "0000000000000000000000000000000000000000000000000000000080000000",
			expectedErrMsg: `failed to derive private key seed: invalid BIP 32 path m/44'/60'/0'/0/2147483648': strconv.ParseUint: parsing "2147483648": value out of range`,
		},
	}
)

func Test_NewKMS(t *testing.T) {
	mn, err := GenerateMnemonic()
	if err != nil {
		t.Fatal(err)
	}
	if _, err := NewBip44KeyRing(mn, "password"); err != nil {
		t.Fatal(err)
	}
}

func Test_PublicKey(t *testing.T) {
	b, err := NewBip44KeyRing(testMnemonic, "password")
	if err != nil {
		t.Fatal(err)
	}
	systems := []mpc.CryptoSystem{mpc.EcDSA, mpc.EdDSA}
	for _, sys := range systems {
		for _, tt := range bip44tests {
			expected := tt.expectedECDSAPubKey
			if sys == mpc.EdDSA {
				expected = tt.expectedEdDSAPubKey
			}
			t.Run(tt.name, func(t *testing.T) {
				// make 64 character keyID from the ID supplied for the keys request
				keyIDStr := fmt.Sprintf("%0*x", keyIDLength, tt.keyID)
				if g, w := keyIDStr, tt.keyIDHex; g != w {
					t.Fatalf("unexpected keyID string got %v, want %v", g, w)
				}

				keyID, err := hex.DecodeString(keyIDStr)
				if err != nil {
					t.Fatal(err)
				}

				// Create key
				pk, err := b.PublicKey(keyID, sys)
				if err != nil {
					if err.Error() != tt.expectedErrMsg {
						t.Fatalf("unexpected Err: %v", err)
					}
				} else {
					if g, w := hex.EncodeToString(pk), expected; g != w {
						t.Fatalf("unexpected pubKey, got %v, want %v", g, w)
					}
					// Validate key generation
					if _, err := b.PubkeySignature(keyID, sys); err != nil {
						t.Fatal(err)
					}
				}

			})

		}
	}

}

func Test_MultiplePubKeys(t *testing.T) {
	mn, err := GenerateMnemonic()
	if err != nil {
		t.Fatal(err)
	}

	b, err := NewBip44KeyRing(mn, "password")
	if err != nil {
		t.Fatal(err)
	}
	systems := []mpc.CryptoSystem{mpc.EcDSA, mpc.EdDSA}
	for _, sys := range systems {
		for i := 0; i < 100; i++ {
			// make 64 character keyID from the ID supplied for the keys request
			keyIDStr := fmt.Sprintf("%0*x", keyIDLength, i)

			keyID, err := hex.DecodeString(keyIDStr)
			if err != nil {
				t.Fatal(err)
			}
			// Create key
			if _, err = b.PublicKey(keyID, sys); err != nil {
				t.Fatal(err)
			}
			// Sign message
			if _, err = b.PubkeySignature(keyID, sys); err != nil {
				t.Fatal(err)
			}
		}
	}
}

func Test_Signature(t *testing.T) {
	b, err := NewBip44KeyRing(testMnemonic, "password")
	if err != nil {
		t.Fatal(err)
	}
	systems := []mpc.CryptoSystem{mpc.EcDSA, mpc.EdDSA}
	for _, sys := range systems {
		var msg []byte = testECDSASigHash[:]
		if sys == mpc.EdDSA {
			msg = testEdDSAMsg[:]
		}
		for _, tt := range bip44tests {
			expectedPk := tt.expectedECDSAPubKey
			expectedSig := tt.expectedECDSASig
			if sys == mpc.EdDSA {
				expectedPk = tt.expectedEdDSAPubKey
				expectedSig = tt.expectedEdDSASig
			}
			t.Run(tt.name, func(t *testing.T) {
				// make 64 character keyID from the ID supplied for the keys request
				keyIDStr := fmt.Sprintf("%0*x", keyIDLength, tt.keyID)
				if g, w := keyIDStr, tt.keyIDHex; g != w {
					t.Fatalf("unexpected keyID string got %v, want %v", g, w)
				}

				keyID, err := hex.DecodeString(keyIDStr)
				if err != nil {
					t.Fatal(err)
				}
				reqID := fmt.Sprintf("%0*x", 64, rand.Int63n(1<<32))
				iD, _ := hex.DecodeString(reqID)

				// Create key
				pk, err := b.PublicKey(keyID, sys)
				if err != nil {
					if err.Error() != tt.expectedErrMsg {
						t.Fatalf("unexpected Err: %v", err)
					}
				} else {
					if g, w := hex.EncodeToString(pk), expectedPk; g != w {
						t.Fatalf("unexpected pubKey, got %v, want %v", g, w)
					}
					// Validate key generation
					sig, _, err := b.Signature(&mpc.SigRequestData{KeyID: keyID, ID: iD, SigHash: msg}, sys)
					if err != nil {
						t.Fatal(err)
					}
					if g, w := hex.EncodeToString(sig), expectedSig; g != w {
						t.Fatalf("unexpected pubKey, got %v, want %v", g, w)
					}
				}

			})

		}
	}
}
