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
	"math/big"

	"github.com/ethereum/go-ethereum/common/math"
	"github.com/sirupsen/logrus"

	"github.com/qredo/fusionchain/keyring/pkg/common"
)

var _ Client = (*localMPC)(nil)

type localMPC struct {
	_logger     *logrus.Entry
	initVersion int
}

func newLocalClient(logger *logrus.Entry, initVersion int) *localMPC {
	return &localMPC{
		_logger:     logger,
		initVersion: initVersion,
	}
}

func (m *localMPC) logger(keyID []byte, traceID string, pubKey string, k CryptoSystem) *logrus.Entry {
	return m._logger.WithFields(logrus.Fields{
		"dd":      TraceID{Trace: traceID},
		"keyID":   fmt.Sprintf("%x", keyID),
		"traceID": traceID,
		"pubKey":  pubKey,
		"keyType": k,
	})
}

func (m *localMPC) PublicKey(keyID []byte, keyType CryptoSystem) ([]byte, string, error) {
	req := &KeysRequest{
		KeyID: hex.EncodeToString(keyID),
	}

	// Trace ID
	traceID := makeTraceID()

	// Fake a public Key from the MPC
	response, err := localMPCKeys(req, m.initVersion, keyType)
	if err != nil {
		return nil, traceID, err
	}

	m.logger(keyID, traceID, response.EdPk+response.Pk, keyType).Info("mpcPubKey")

	// Check matching KeyID
	if req.KeyID != response.KeyID {
		return nil, "", fmt.Errorf("mpc keyID mismatch expected %v, got %v", req.KeyID, response.KeyID)
	}
	// Extract key based on keyType
	pK := response.Pk
	if keyType == EdDSA {
		pK = response.EdPk
	}
	pubKeyBytes, err := hex.DecodeString(pK)
	if err != nil {
		return nil, "", ErrNoPubKey
	}
	return pubKeyBytes, traceID, nil
}

func (m *localMPC) PubkeySignature(pubKey, keyID []byte, keyType CryptoSystem) ([]byte, string, error) {
	req := &SigRequest{
		KeyID: hex.EncodeToString(keyID),
		IsKey: isKey,
	}

	dataToSign := pubKey
	if keyType == EcDSA {
		h := sha256.Sum256(pubKey)
		dataToSign = h[:]
	}
	sigHash := hex.EncodeToString(dataToSign)

	switch keyType {
	case EcDSA:
		req.EcMessage = sigHash
	case EdDSA:
		req.EdMessage = sigHash
	default:
		return nil, "", fmt.Errorf("invalid key type: %v", keyType)
	}

	// Trace ID
	traceID := makeTraceID()

	// Post to the MPC server
	response, err := localMPCSign(req, m.initVersion, keyType)
	if err != nil {
		return nil, traceID, err
	}

	m.logger(keyID, traceID, response.EdPk+response.Pk, keyType).Info("mpcPubKeySign")

	// Check matching KeyID
	if req.KeyID != response.KeyID {
		return nil, "", fmt.Errorf("mpc keyID mismatch expected %v, got %v", req.KeyID, response.KeyID)
	}
	// verify Signature against message
	rsSerialised, pubKey, valid, err := validateResponse(response, keyType)
	if err != nil || !valid {
		return nil, "", ErrInvalidSignature
	}
	if !bytes.Equal(pubKey, pubKey) {
		return nil, "", ErrNoPubKey
	}

	return rsSerialised, traceID, err
}

func (m *localMPC) Signature(sigRequestData *SigRequestData, keyType CryptoSystem) (*SigResponse, string, error) {
	keyID := hex.EncodeToString(sigRequestData.KeyID)
	requestID := hex.EncodeToString(sigRequestData.ID)
	req := &SigRequest{
		KeyID: keyID,
		ID:    requestID,
		IsKey: isNotKey,
	}

	sigHash := hex.EncodeToString(sigRequestData.SigHash)
	switch keyType {
	case EcDSA:
		req.EcMessage = sigHash
	case EdDSA:
		req.EdMessage = sigHash
	default:
		return nil, "", fmt.Errorf("invalid key type: %v", keyType)
	}

	// Trace ID
	traceID := makeTraceID()

	// Post to the MPC server
	response, err := localMPCSign(req, m.initVersion, keyType)
	if err != nil {
		return nil, traceID, err
	}

	m.logger(sigRequestData.KeyID, traceID, response.EdPk+response.Pk, keyType).Info("mpcSign")

	// Check matching request ID
	if req.ID != response.ID {
		return nil, "", fmt.Errorf("mpc keyID mismatch expected %v, got %v", req.KeyID, response.KeyID)
	}
	// Check matching KeyID
	if req.KeyID != response.KeyID {
		return nil, "", fmt.Errorf("mpc keyID mismatch expected %v, got %v", req.KeyID, response.KeyID)
	}
	// verify Signature against message
	_, _, valid, err := validateResponse(response, keyType)
	if err != nil {
		return nil, "", ErrInvalidSignature
	}
	if !valid {
		return nil, "", ErrInvalidSignature
	}
	return response, traceID, err
}

func (*localMPC) Ping() (string, error) {
	b, err := common.RandomBytes(16)
	if err != nil {
		return "", err
	}
	return fmt.Sprintf("%16x", b), nil
}

// localMPCKeys - emulate the MPCKeys request
func localMPCKeys(req *KeysRequest, salt int, keyType CryptoSystem) (resp *KeysResponse, err error) {
	// validate inputs
	if len(req.KeyID) != keyIDLength {
		return nil, fmt.Errorf("invalid keyID %v, length %v", req.KeyID, len(req.KeyID))
	}
	keyID, err := hex.DecodeString(req.KeyID)
	if err != nil {
		return nil, err
	}
	// create seed directly from keyID
	seed := sha256.Sum256(append(keyID, byte(salt)))

	pubKeyBytes, err := generateKey(seed[:], keyType)
	if err != nil {
		return nil, fmt.Errorf("could not generate key, err=%v", err)
	}

	resp = &KeysResponse{
		Service: "mpcclientparent",
		Message: "OK",
		Version: "0.0.1",
		TraceID: makeTraceID(),
		KeyID:   req.KeyID,
		Pk:      hex.EncodeToString(pubKeyBytes),
	}
	if keyType == EdDSA {
		resp.EdPk = resp.Pk
		resp.Pk = ""
	}
	return resp, nil
}

// localMPCSign - emulate the MPC sign request
func localMPCSign(req *SigRequest, salt int, keyType CryptoSystem) (resp *SigResponse, err error) {
	// validate inputs
	if len(req.KeyID) != keyIDLength {
		return nil, fmt.Errorf("invalid keyID %v, length %v", req.KeyID, len(req.KeyID))
	}
	if req.IsKey != isKey {
		if len(req.ID) != keyIDLength {
			return nil, fmt.Errorf("invalid requestID %v, length %v", req.ID, len(req.ID))
		}
	}

	keyID, err := hex.DecodeString(req.KeyID)
	if err != nil {
		return nil, err
	}
	// Handle engine key differently
	seed := sha256.Sum256(append(keyID, byte(salt)))

	var m []byte
	switch keyType {
	case EcDSA:
		m, err = hex.DecodeString(req.EcMessage)
		if err != nil {
			return nil, err
		}
	case EdDSA:
		m, err = hex.DecodeString(req.EdMessage)
		if err != nil {
			return nil, err
		}
	default:
		return nil, fmt.Errorf("invalid key type: %v", keyType)
	}

	// sign fixed message if isKey == 1
	if req.IsKey == isKey {
		pk, err := generateKey(seed[:], keyType)
		if err != nil {
			return nil, err
		}
		m = pk
		if keyType == EcDSA {
			h := sha256.Sum256(pk)
			m = h[:]
		}
	}

	sigBytes, pubKeyBytes, err := generateSignature(seed[:], m, keyType)
	if err != nil {
		return nil, err
	}
	if sigBytes == nil {
		return nil, fmt.Errorf("signature was nil: %v", sigBytes)
	}
	if len(sigBytes) < 64 {
		return nil, fmt.Errorf("invalid signature length: %v", len(sigBytes))
	}
	sigR := new(big.Int).SetBytes(sigBytes[0:32])
	sigS := new(big.Int).SetBytes(sigBytes[32:64])
	resp = &SigResponse{
		Service: "mpcclientparent",
		Message: "OK",
		Version: "1.0.0",
		TraceID: makeTraceID(),
		IsKey:   req.IsKey,
		KeyID:   req.KeyID,
		ID:      req.ID,
	}
	switch keyType {
	case EdDSA:
		resp.EdMessage = req.EdMessage
		resp.EdR = toHexInt(sigR)
		resp.EdS = toHexInt(sigS)
		resp.EdPk = hex.EncodeToString(pubKeyBytes)
	case EcDSA:
		resp.EcMessage = req.EcMessage
		resp.EcR = toHexInt(sigR)
		resp.EcS = toHexInt(sigS)
		resp.Pk = hex.EncodeToString(pubKeyBytes)
	default:
		return nil, fmt.Errorf("key type '%v' not supported", keyType)
	}

	return resp, err
}

func makeTraceID() string {
	b, _ := common.RandomBytes(16)
	traceID := fmt.Sprintf("%16x", b)
	return traceID
}

func toHexInt(n *big.Int) string {
	b := math.PaddedBigBytes(n, 32)
	return fmt.Sprintf("%x", b) // or %X or upper case
}
