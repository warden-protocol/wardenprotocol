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
package mpc

import (
	"bytes"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"math/rand"
	"net/http/httptest"
	"net/url"
	"testing"

	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/qredo/fusionchain/keyring/pkg/logger"
)

var (
	pubkeySignature = []struct {
		name     string
		keyType  CryptoSystem
		key, sig string
	}{
		{"ec1", EcDSA, "03247b3e83e7af4181b7f1bb8f8accc2ce517a7864271f8fd783f6d97345a8fbb5", "3ea20e0165a9d30b5377a7caf0ff62669308d8cee00e1059f71893e7cce5e66b4c4de8903697b8bdd2c7f0b173b218c3c20980a2537b17a09e26098d22966030"},
		{"ec2", EcDSA, "021fd69c7baa1840a677c2d7a6a7d0789e2efd560c06532824c3656b4b07ef17bc", "cedf657a627dad1b83212b3a964556b941464a89bfd618db8a8c435ed33e99f675eec183c822ff30cc6af38af1bc8f4e7faf10a141c6181684db9dbdb3dfac74"},
		{"ed1", EdDSA, "f76665b8e9b653e4891a171b05de04cc068ae2f5c184eca042b6ecb43cd4fe9f", "5d61e28f447d29cbff12b0f2a25e414d077da617149056a34eff9261b238deeedbc36851d96b893d01dc0ec18a8dc05f481ca8e0713cd5aa76caabd2955a5503"},
		{"ed2", EdDSA, "34be4d83e727e66befea7f8647d601c19c9327aa8b2f6971fbd3e1a078c46f60", "bcda446236af2622ee535bea60dfd56b99c8186278d150e311d4307a58c133299de2fc3d50c7d9d8de8f894fb7bcb66449d5c6a37d7c65495e284eca45626b09"},
	}

	signature = []struct {
		name           string
		keyType        CryptoSystem
		key, EcR, EcS  string
		EdPk, EdR, EdS string
	}{
		{name: "ec1", keyType: EcDSA, key: "03b1e9709868446bfedc0ab1e4b0b30c5fe41a54a442cb5cc9eada8d8f60d6874f", EcR: "6d6bfa5c833c52f5510382c702e744c42f1777504484165dfb13d9fa8fec8cb5", EcS: "663f485ea167856eaded3e5382c319bb87da17a8700c1c282ce0f4ffa73a77eb"},
		{name: "ec2", keyType: EcDSA, key: "03e7bc0e08a2c4c8cb1d4414ad34367300ede6f37069eac7f9e28a2dfee9a5789e", EcR: "9636341b48f2eeab007ac1d7650bdf190d3f3c30f89a2808c6dbe780399eef26", EcS: "1fb396917ad6a0f5b8501d8937a5db0a41ea728e3d3774ec1225a8933828bcb6"},
		{name: "ec3", keyType: EcDSA, key: "031baf68e4374aaa38e0e7227aa188de4e560009122cfe7fea168bbf5f7b94969a", EcR: "cdaa946e260ae6458e69d522edef529e6f6cd6f68f1528a7e610dbe99a0fa59b", EcS: "5ce1e5906fd861fdf3d05ceb2695b9e3fe7a1738ab0a3ffeca5d5e1ef17affbe"},
		{name: "ec4", keyType: EcDSA, key: "02112ae6424faa164ecd26f9f072b770e32304d5090df7b621df4afdaace03795d", EcR: "0f6661de5a6e68d951b1e4381c84d4bd4a5a3b666fafafa9dcbf635e82ecf7ee", EcS: "605d88cfdaf2468fc6304dabe3a719953a3a293f4e0cb89452d00b0c8990ae8c"},
		{name: "ec5", keyType: EcDSA, key: "02f9ee822eec5d7d5f184f9f9f6d1531358ef9da31418197a30667341920cd7cc9", EcR: "064f3823e94fc6c8a12a0c3d941a243671a56cc0317c2889eaafeab395b05fe5", EcS: "4d6921bd016fe66089465c02e25f583d732f45b28e9db4de282bc31dbefcc7a1"},
		{name: "ec6", keyType: EcDSA, key: "0363ed9cdce729791d3e8bcb1012731a8e73943aa5c9ab2457b25b9e5efa080b20", EcR: "5eaf5dbc7d81391a2e6cd157f3581e90a15b2e46e9ee372deba150617b281c95", EcS: "0223b43491df4b33d3f0d54eedce8347b00185da926f0baf9264fcbe2ac09664"},
		{name: "ec7", keyType: EcDSA, key: "03ec4c8093d278fda1c1891a2a33d6f0fe5344cc4d527c2a71200075c95feb8fef", EcR: "a1c0c117f455cbde974be2824239a6394cce346b90856b12a9720a93dde8d178", EcS: "480cefe605422af46408501256dde8cd2b0539489ad0de3675f2c7191d8a1402"},
		{name: "ec8", keyType: EcDSA, key: "03db1742ad38db092cb60a8b7e08430f98cf9bde1a9e13752e996825cdd0058fcf", EcR: "4e5d6aa962b19b4a3d0e72c28af1ac2ee1ba058a0f7b60d3e5816ce9d7c76a97", EcS: "39cf0c7a66e4aaf5811600d76c51d7a9eca2522508297b8f22fabe0276f4050d"},
		{name: "ed1", keyType: EdDSA, EdPk: "ef3e1fae5fad3ecaa28e13b8aab377770861c53f026fbbed91a16b69dc230431", EdR: "41f65184d7310eaa4bfca6b7f39a2353f80faaa58c7d17144b3eaabb4f20766a", EdS: "8c367d0e388e58c211c9bde89a9143edb6be5fce2a77647de11c15cee25fa20c"},
		{name: "ed2", keyType: EdDSA, EdPk: "21451c6d3183a1cbd9a05965797cd0b606963db50ffafb74d552106a6b08892d", EdR: "550fdb8f5a53f3d82bea6f4a4e8dfb8e2a71ad900c1c37b76dc67a1862526135", EdS: "451391422dfb21ed252152f99a46df3b2f756367ecd94f58519376483721ba04"},
		{name: "ed3", keyType: EdDSA, EdPk: "e68ba8d0b1184d85f87d76d50294e23e44a93ed06a7d4ce921073913e045c309", EdR: "5ab6d0a26a4a7a5b3d4dc13733986d97498d3ddab77e9d3521025d25f3b54e80", EdS: "4e4d7aac9fb6ec7ba405b89bef23127a03705182dd640626b9f6788fe1e25509"},
		{name: "ed4", keyType: EdDSA, EdPk: "4ad40aa5402f79750f2261b71200ca70b4fb64ea1d955b186c82d41e5e944cca", EdR: "cfd5550760f8b56d40afabba88cfbcc0b525d85bd4790454e00c5a5f4d8e1e7e", EdS: "f534bf5122976d0cbf8e083bee5c22e4a60267f160ac29beac94d0a5016c8706"},
	}
)

func Test_ServerResponse(t *testing.T) {
	log, err := logger.NewLogger("error", "plain", false, "test")
	if err != nil {
		t.Fatal(err)
	}
	mpcServer := NewLocalMPCServer(0)
	s := httptest.NewServer(mpcServer.Routes())
	serverURL, err := url.Parse(s.URL)
	if err != nil {
		t.Fatal(err)
	}
	client := NewClient(Config{Node: []Node{{Host: serverURL.Hostname(), Port: serverURL.Port()}}}, log, "test")

	if _, err := client.Ping(); err != nil {
		t.Fatal("server unresponsive")
	}
}

func TestPubkeySignature(t *testing.T) {
	log, err := logger.NewLogger("error", "plain", false, "test")
	if err != nil {
		t.Fatal(err)
	}

	// mock client
	salt := 0
	local := NewClient(Config{Mock: true, Salt: salt}, log, "test")

	// mimics 'real' mpcclientparent
	mpcServer := NewLocalMPCServer(salt)
	s := httptest.NewServer(mpcServer.Routes())
	serverURL, err := url.Parse(s.URL)
	if err != nil {
		t.Fatal(err)
	}
	classic := NewClient(Config{Node: []Node{{Host: serverURL.Hostname(), Port: serverURL.Port()}}}, log, "test")

	tt := []struct {
		name   string
		client Client
	}{
		{"mock,MockMPCClient", local},
		{"MPC,live", classic},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			for _, signatureData := range pubkeySignature {
				t.Run(signatureData.name, func(t *testing.T) {
					expectedKeyBytes := hexutil.MustDecode("0x" + signatureData.key)

					src := fmt.Sprintf("%0*v", 64, signatureData.name)
					keyID, err := hex.DecodeString(src)
					if err != nil {
						t.Fatalf("src: %v, error %v", src, err)
					}
					seed := sha256.Sum256(keyID)
					pubKey, _, err := tc.client.PublicKey(seed[:], signatureData.keyType)
					if err != nil {
						t.Fatalf("Client :%s keyType: %v error: %v", tc.name, signatureData, err)
					}

					if g, w := pubKey, expectedKeyBytes; !bytes.Equal(g, w) {
						t.Errorf("Client :%s keyType:%v Unexpected pubKey, got %x,\n want %x", tc.name, signatureData.keyType, g, w)
					}

					resp, _, err := tc.client.PubkeySignature(pubKey, seed[:], signatureData.keyType)
					if err != nil {
						t.Fatal(err)
					}

					expectedSig, _ := hex.DecodeString(signatureData.sig)
					if !bytes.Equal(resp, expectedSig) {
						t.Errorf("Client :%s keyType:%v Unexpected signature, got %x,\n want %x", tc.name, signatureData.keyType, resp, expectedSig)
					}
				})
			}

		})
	}
}

func TestSignature(t *testing.T) {

	log, err := logger.NewLogger("error", "plain", false, "test")
	if err != nil {
		t.Fatal(err)
	}

	// mock client
	salt := 0
	local := NewClient(Config{Mock: true, Salt: salt}, log, "test")

	// mimics 'real' mpcclientparent
	mpcServer := NewLocalMPCServer(salt)
	server := httptest.NewServer(mpcServer.Routes())
	serverURL, err := url.Parse(server.URL)
	if err != nil {
		t.Fatal(err)
	}
	classic := NewClient(Config{Node: []Node{{Host: serverURL.Hostname(), Port: serverURL.Port()}}}, log, "test")

	tt := []struct {
		name   string
		client Client
	}{
		{"mock,MockMPCClient", local},
		{"MPC,live", classic},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			for _, c := range signature {
				t.Run(c.name, func(t *testing.T) {
					src := fmt.Sprintf("%0*v", 64, c.name)

					keyID, err := hex.DecodeString(src)
					if err != nil {
						t.Fatalf("mpc type %v keyType %v : %s", tc.name, c.keyType, err)
					}
					message := sha256.Sum256([]byte("toto"))

					id := rand.Int63n(10)

					requestID, err := hex.DecodeString(fmt.Sprintf("%064x", id))
					if err != nil {
						t.Fatal(err)
					}

					response, _, err := tc.client.Signature(&SigRequestData{
						KeyID:   keyID,
						ID:      requestID,
						SigHash: message[:],
					}, c.keyType)
					if err != nil {
						t.Fatalf("mpc type %v keyType %v : %s", tc.name, c.keyType, err)
					}
					if got, want := response.Pk, c.key; got != want {
						t.Errorf("mpc type %v name %v keyType %v got %v want %v", tc.name, c.name, c.keyType, got, want)
					}
					if got, want := response.EcR, c.EcR; got != want {
						t.Errorf("mpc type %v name %v keyType %v got %v want %v", tc.name, c.name, c.keyType, got, want)
					}
					if got, want := response.EcS, c.EcS; got != want {
						t.Errorf("mpc type %v name %v keyType %v got %v want %v", tc.name, c.name, c.keyType, got, want)
					}

					if got, want := response.EdPk, c.EdPk; got != want {
						t.Errorf("mpc type %v name %v keyType %v got %v want %v", tc.name, c.name, c.keyType, got, want)
					}
					if got, want := response.EdR, c.EdR; got != want {
						t.Errorf("mpc type %v name %v keyType %v got %v want %v", tc.name, c.name, c.keyType, got, want)
					}
					if got, want := response.EdS, c.EdS; got != want {
						t.Errorf("mpc type %v name %v keyType %v got %v want %v", tc.name, c.name, c.keyType, got, want)
					}
				})

			}
		})
	}
}

func Test_LocalMPC(t *testing.T) {

	log, err := logger.NewLogger("fatal", "plain", false, "test")
	if err != nil {
		t.Fatal(err)
	}
	cl := newLocalClient(log, 0)

	system := []struct {
		name    string
		keyType CryptoSystem
	}{
		{
			"ecdsa",
			EcDSA,
		},
		{
			"eddsa",
			EdDSA,
		},
	}

	sigTests := []struct {
		name                                                string
		req                                                 *SigRequestData
		expectPubKeyErr, expectPubKeySignErr, expectSignErr bool
	}{
		{
			"valid",
			&SigRequestData{
				KeyID:   hexutil.MustDecode("0x" + fmt.Sprintf("%0*x", 64, 1)),
				ID:      hexutil.MustDecode("0x" + fmt.Sprintf("%0*x", 64, 2)),
				SigHash: hash([]byte("some message")),
			},
			false,
			false,
			false,
		},
		{
			"bad key_id",
			&SigRequestData{
				KeyID:   hexutil.MustDecode("0x" + fmt.Sprintf("%0*x", 62, 1)),
				ID:      hexutil.MustDecode("0x" + fmt.Sprintf("%0*x", 64, 2)),
				SigHash: hash([]byte("some message")),
			},
			true,
			true,
			true,
		},
		{
			"bad id",
			&SigRequestData{
				KeyID:   hexutil.MustDecode("0x" + fmt.Sprintf("%0*x", 64, 1)),
				ID:      hexutil.MustDecode("0x" + fmt.Sprintf("%0*x", 62, 2)),
				SigHash: hash([]byte("some message")),
			},
			false,
			false,
			true,
		},
		{
			"bad sig hash",
			&SigRequestData{
				KeyID:   hexutil.MustDecode("0x" + fmt.Sprintf("%0*x", 64, 1)),
				ID:      hexutil.MustDecode("0x" + fmt.Sprintf("%0*x", 64, 2)),
				SigHash: hash([]byte("some message"))[0:16],
			},
			false,
			false,
			true,
		},
	}

	dummyPk := hexutil.MustDecode("0x03247b3e83e7af4181b7f1bb8f8accc2ce517a7864271f8fd783f6d97345a8fbb5")

	for _, tc := range system {
		t.Run(tc.name, func(t *testing.T) {
			for _, tt := range sigTests {
				t.Run(tt.name, func(t *testing.T) {

					pk, _, err := cl.PublicKey(tt.req.KeyID, tc.keyType)
					if (err != nil) != tt.expectPubKeyErr {
						t.Fatalf("unexpected pubkey creation error %v", err)
					}
					if err != nil {
						pk = dummyPk
					}

					_, _, err = cl.PubkeySignature(pk, tt.req.KeyID, tc.keyType)
					if (err != nil) != tt.expectPubKeySignErr {
						t.Fatalf("unexpected pubKey sign error %v", err)
					}

					_, _, err = cl.Signature(tt.req, tc.keyType)
					if tc.keyType == EcDSA {
						if (err != nil) != tt.expectSignErr {
							t.Fatalf("unexpected sign error %v", err)
						}
					}
				})
			}
		})

	}

}

func hash(b []byte) []byte {
	h := sha256.Sum256(b)
	return h[:]
}
