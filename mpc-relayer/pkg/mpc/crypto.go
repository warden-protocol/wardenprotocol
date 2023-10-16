/*
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
*/

package mpc

import (
	"crypto/ecdsa"
	"crypto/ed25519"
	"encoding/hex"
	"fmt"
	"math/big"
	"strconv"

	"github.com/btcsuite/btcd/btcec/v2"
	"github.com/ethereum/go-ethereum/common/math"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/crypto/secp256k1"
)

// GenerateKey - Generates (unsafe) private public key pair, used for mock and testing
func generateKey(seed []byte, keyType CryptoSystem) (pubKeyBytes []byte, err error) {
	switch keyType {
	case EcDSA:
		privateKey, _ := btcec.PrivKeyFromBytes(seed[:])
		ecdsaPriv := privateKey.ToECDSA()
		prvD := math.PaddedBigBytes(ecdsaPriv.D, 32)
		if len(prvD) != 32 {
			return nil, fmt.Errorf("error generating ecdsa private key: Priv key bit length: %v", 8*len(prvD))
		}
		prv, err := crypto.ToECDSA(prvD)
		if err != nil {
			return nil, fmt.Errorf("error genertaing ecdsa private/public key pair: Error %v. Priv key bitlength: %v", err, 8*len(seed))
		}
		pubKeyBytes = crypto.CompressPubkey(&prv.PublicKey)
	case EdDSA:
		privateKey, err := EDDSAPrivFromSeed(seed[:])
		if err != nil {
			return nil, fmt.Errorf("error generating eddsa signature %v", err)
		}
		pubKeyBytes = make([]byte, ed25519.PublicKeySize)
		copy(pubKeyBytes, privateKey[32:])

	default:
		return nil, fmt.Errorf("key type %v not supported", keyType)
	}
	return pubKeyBytes, nil
}

// EDDSAPrivFromSeed returns an ED25519 private key from raw seed bytes
func EDDSAPrivFromSeed(s []byte) (ed25519.PrivateKey, error) {
	if l := len(s); l != 32 {
		return nil, fmt.Errorf("ed25519: bad seed length: %v", strconv.Itoa(l))
	}
	return ed25519.NewKeyFromSeed(s), nil
}

// ExtractSerialisedSigECDSA extracts the 64-byte serialised ECDSA signature [R S] from the mpc sign response
func ExtractSerializedSigECDSA(mpcResponse *SigResponse) (sig []byte, err error) {
	return extractSerializedSig(mpcResponse.EcR, mpcResponse.EcS)
}

type SignedMessage struct {
	PublicKey []byte
	Message   []byte
	Signature []byte
}

type EdDSASignedMessage = SignedMessage
type ECDSASignedMessage = SignedMessage

func ExtractECDSASignedMessageWithoutRecID(mpcSigResult *SigResponse) (*ECDSASignedMessage, error) {
	msg, err := hex.DecodeString(mpcSigResult.EcMessage)
	if err != nil {
		return nil, fmt.Errorf("couldn't decode string %v", err)
	}

	key, err := hex.DecodeString(mpcSigResult.Pk)
	if err != nil {
		return nil, fmt.Errorf("couldn't decode string %v", err)
	}

	rsSerializedSig, err := ExtractSerializedSigECDSA(mpcSigResult)
	if err != nil {
		return nil, err
	}

	return &ECDSASignedMessage{
		PublicKey: key,
		Message:   msg,
		Signature: rsSerializedSig,
	}, nil
}

func ExtractECDSASignedMessage(mpcSigResult *SigResponse) (*ECDSASignedMessage, error) {
	signedMessage, err := ExtractECDSASignedMessageWithoutRecID(mpcSigResult)
	if err != nil {
		return nil, err
	}

	sig65, err := addRecID(signedMessage.Signature, signedMessage.Message, signedMessage.PublicKey)
	if err != nil {
		return nil, fmt.Errorf("adding Sig.v (recovery ID) to tx with KeyID: %s, err %s", mpcSigResult.KeyID, err)
	}

	signedMessage.Signature = sig65

	return signedMessage, nil
}

func ExtractEdDSASignedMessage(mpcSigResult *SigResponse) (*EdDSASignedMessage, error) {
	msg, err := hex.DecodeString(mpcSigResult.EcMessage)
	if err != nil {
		return nil, fmt.Errorf("couldn't decode string %v", err)
	}

	key, err := hex.DecodeString(mpcSigResult.Pk)
	if err != nil {
		return nil, fmt.Errorf("couldn't decode string %v", err)
	}

	rsSerializedSig, err := ExtractSerializedSigEdDSA(mpcSigResult)
	if err != nil {
		return nil, err
	}

	return &EdDSASignedMessage{
		PublicKey: key,
		Message:   msg,
		Signature: rsSerializedSig,
	}, nil
}

func ExtractSerializedSigEdDSA(mpcResponse *SigResponse) (sig []byte, err error) {
	return extractSerializedSig(mpcResponse.EdR, mpcResponse.EdS)
}

func extractSerializedSig(rStr string, sStr string) (sig []byte, err error) {
	// Get Sig R and S values
	r, rOk := new(big.Int).SetString(rStr, 16)
	s, sOk := new(big.Int).SetString(sStr, 16)
	if !rOk || !sOk {
		return nil, fmt.Errorf("values not set: r %v, s %v", rOk, sOk)
	}
	// Check to make sure s is in the range of accepted values: 0 < s < secp256k1.N/2
	if s.Cmp(new(big.Int).Div(secp256k1.S256().N, big.NewInt(2))) > 0 {
		s = new(big.Int).Sub(secp256k1.S256().N, s)
	}

	// Serialize Signature into [R | S] and add recovery ID
	rByte, sByte := math.PaddedBigBytes(r, 32), math.PaddedBigBytes(s, 32)
	sig = append(sig, rByte...)
	sig = append(sig, sByte...)
	if len(sig) != 64 {
		return nil, fmt.Errorf("signature [R S] is incorrect length. Expected 64 got %v", len(sig))
	}
	return sig, nil
}

// ExtractSigWithRecoveryID extracts the 65-byte serialised signature [R S V] where the recovery ID, V is either 0 or 1
func ExtractSigWithRecoveryID(mpcResponse *SigResponse) (*EdDSASignedMessage, error) {
	if mpcResponse == nil {
		return nil, ErrNilInput
	}
	var rsSerializedSig []byte
	var err error
	msgbytes, err := hex.DecodeString(mpcResponse.EcMessage)
	if err != nil {
		return nil, fmt.Errorf("couldn't decode string %v", err)
	}
	keybytes, err := hex.DecodeString(mpcResponse.Pk)
	if err != nil {
		return nil, fmt.Errorf("couldn't decode string %v", err)
	}
	rsSerializedSig, err = ExtractSerializedSigECDSA(mpcResponse)
	if err != nil {
		return nil, err
	}

	sigWithRecovID, err := addRecID(rsSerializedSig, msgbytes, keybytes)
	if err != nil {
		return nil, err
	}

	return &EdDSASignedMessage{
		PublicKey: keybytes,
		Message:   msgbytes,
		Signature: sigWithRecovID,
	}, nil
}

// generateSignatureForCurrency generates a transaction signature for specific currency (threads based on EDDSA and ECDSA currency types)
func generateSignature(seed, message []byte, keyType CryptoSystem) (sigBytes, pubKeyBytes []byte, err error) {
	switch keyType {
	case EcDSA:
		pkey := ecdsa.PublicKey{}
		privateKey, _ := btcec.PrivKeyFromBytes(seed[:])
		ecdsaPriv := privateKey.ToECDSA()
		prvD := math.PaddedBigBytes(ecdsaPriv.D, 32)
		if len(prvD) != 32 {
			return nil, nil, fmt.Errorf("error generating ecdsa private key: Priv key bitlength: %v", 8*len(prvD))
		}
		prv, err := crypto.ToECDSA(prvD)
		if err != nil {
			return nil, nil, fmt.Errorf("error generating ecdsa private key: Error %v. Priv key length: %v", err, 8*len(seed))
		}
		sigBytes, err = crypto.Sign(message, prv)
		if err != nil {
			return nil, nil, fmt.Errorf("error signing msg: %x. error: %v", message, err)
		}
		pkey = prv.PublicKey
		pubKeyBytes = crypto.CompressPubkey(&pkey)
	case EdDSA:
		// Sign the encoded transaction
		privateKey, err := EDDSAPrivFromSeed(seed[:])
		if err != nil {
			return nil, nil, fmt.Errorf("error generating eddsa prviate key %v", err)
		}
		pubKeyBytes = make([]byte, ed25519.PublicKeySize)
		copy(pubKeyBytes, privateKey[32:])
		sigBytes = ed25519.Sign(privateKey, message)
	default:
		return nil, nil, fmt.Errorf("invalid key type: %v", keyType)
	}
	return sigBytes, pubKeyBytes, nil
}

// validateResponse Validate response from MPCs
func validateResponse(response *SigResponse, keyType CryptoSystem) (signature, publicKey []byte, valid bool, err error) {
	var msg, r, s []byte

	// Thread by cryptosystem

	switch keyType {
	case EcDSA:
		msg, err = hex.DecodeString(response.EcMessage)
		if err != nil {
			return nil, nil, false, err
		}
		s, err = hex.DecodeString(response.EcS)
		if err != nil {
			return nil, nil, false, err
		}
		r, err = hex.DecodeString(response.EcR)
		if err != nil {
			return nil, nil, false, err
		}
		signature = append(r, s...)
		publicKey, err = hex.DecodeString(response.Pk)
		if err != nil {
			return nil, nil, false, err
		}
		valid = crypto.VerifySignature(publicKey, msg, signature)
	case EdDSA:
		msg, err = hex.DecodeString(response.EdMessage)
		if err != nil {
			return nil, nil, false, err
		}
		s, err = hex.DecodeString(response.EdS)
		if err != nil {
			return nil, nil, false, err
		}
		r, err = hex.DecodeString(response.EdR)
		if err != nil {
			return nil, nil, false, err
		}
		signature = append(r, s...)
		publicKey, err = hex.DecodeString(response.EdPk)
		if err != nil {
			return nil, nil, false, err
		}
		if len(publicKey) != ed25519.PublicKeySize {
			return nil, nil, false, fmt.Errorf("public key invalid length %v, expected %v", len(publicKey), ed25519.PublicKeySize)
		}
		valid = ed25519.Verify(publicKey, msg, signature)
	default:
		return nil, nil, false, fmt.Errorf("invalid key type: %v", keyType)
	}
	// verify Signature against message
	return signature, publicKey, valid, nil
}

func addRecID(sigBytes []byte, txHash, pubkey []byte) (result []byte, err error) {
	if len(sigBytes) != 64 {
		return nil, fmt.Errorf("signature [R S] is incorrect length. Expected 64 got %v", len(sigBytes))
	}
	pk, err := crypto.DecompressPubkey(pubkey)
	if err != nil {
		return nil, err
	}
	for i := 0; i < (btcec.Params().H+1)*2; i++ {
		result = append(sigBytes, byte(i))
		pkey, err := crypto.SigToPub(txHash, result)
		if err == nil && pk.X.Cmp(pkey.X) == 0 && pk.Y.Cmp(pkey.Y) == 0 {
			return result, nil
		}
	}
	return nil, fmt.Errorf("could not determine recId byte to add")
}
