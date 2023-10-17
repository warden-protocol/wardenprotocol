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
	"bytes"
	"context"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/qredo/fusionchain/mpc-relayer/pkg/common"
	"github.com/sirupsen/logrus"
)

var _ Client = (*client)(nil)

// TraceID struct for logging the trace ID (mpc requests)
type TraceID struct {
	Trace string `json:"trace_id"`
}

// client - Object to communicate with the MPC Cluster
type client struct {
	isConnected           bool
	roundRobinServerIndex int
	_logger               *logrus.Entry
	host                  string
	port                  string
}

func newMPCClient(node Node, index int, logger *logrus.Entry) (*client, string) {
	c := &client{
		roundRobinServerIndex: index,
		_logger:               logger,
		host:                  node.Host,
		port:                  node.Port,
	}

	conn, trace := c.Ping()
	c.isConnected = conn
	return c, trace
}

func (m *client) logger(keyID []byte, traceID string) *logrus.Entry {
	return m._logger.WithFields(logrus.Fields{
		"mpc":         fmt.Sprintf("http://%v:%v", m.host, m.port),
		"serverIndex": m.roundRobinServerIndex,
		"dd":          TraceID{Trace: traceID},
		"keyID":       fmt.Sprintf("%x", keyID),
		"traceID":     traceID,
	})
}

// PublicKey Return public key bytes (in 33-byte compressed format 03...) for the supplied keyID
func (m *client) PublicKey(keyID []byte, keyType CryptoSystem) ([]byte, string, error) {
	b, err := common.RandomBytes(16)
	if err != nil {
		return nil, "", err
	}
	traceID := fmt.Sprintf("%16x", b)
	start := time.Now()

	log := m.logger(keyID, traceID)

	response, err := m.mpcKeysRequest(keyID, traceID, keyType)

	if err != nil {
		log.WithFields(logrus.Fields{"error": err, "timeTaken": common.RoundFloat(time.Since(start).Seconds(), 2)}).Error("mpcPubKeyErr")
		return nil, traceID, err
	}

	mpcKeysResp, err := m.decodeAndVerifyMPCKeysResponse(response)
	if err != nil {
		log.WithFields(logrus.Fields{"error": err, "timeTaken": common.RoundFloat(time.Since(start).Seconds(), 2)}).Error("mpcPubKeyErr")
		return nil, traceID, err
	}

	// Check matching KeyID
	encodedkeyID := hex.EncodeToString(keyID)
	if g, w := mpcKeysResp.KeyID, encodedkeyID; g != w {
		err := fmt.Errorf("MPC keyID mismatch expected %v, got %v", w, g)
		log.WithFields(logrus.Fields{"error": err, "timeTaken": common.RoundFloat(time.Since(start).Seconds(), 2)}).Error("mpcPubKeyErr")
		return nil, traceID, err
	}

	var pubKey []byte
	switch keyType {
	case EdDSA:
		if mpcKeysResp.EdPk == "" {
			log.WithFields(logrus.Fields{"error": ErrNoPubKey, "timeTaken": common.RoundFloat(time.Since(start).Seconds(), 2)}).Error("mpcPubKeyErr")
			return nil, traceID, ErrNoPubKey
		}
		pubKey, err = hex.DecodeString(mpcKeysResp.EdPk)
		if err != nil {
			log.WithFields(logrus.Fields{"error": err, "timeTaken": common.RoundFloat(time.Since(start).Seconds(), 2)}).Error("mpcPubKeyErr")
			return nil, traceID, err
		}
	case EcDSA:
		if mpcKeysResp.Pk == "" {
			log.WithFields(logrus.Fields{"error": ErrNoPubKey, "timeTaken": common.RoundFloat(time.Since(start).Seconds(), 2)}).Error("mpcPubKeyErr")
			return nil, traceID, ErrNoPubKey
		}
		pubKey, err = hex.DecodeString(mpcKeysResp.Pk)
		if err != nil {
			log.WithFields(logrus.Fields{"error": err, "timeTaken": common.RoundFloat(time.Since(start).Seconds(), 2)}).Error("mpcPubKeyErr")
			return nil, traceID, err
		}
	}
	log.WithFields(logrus.Fields{"timeTaken": common.RoundFloat(time.Since(start).Seconds(), 2)}).Info("mpcPubKey")
	return pubKey, traceID, nil
}

// PubkeySignature Return a signature proving ownership of the supplied public key (33-byte compressed format) and seedID/KeyID for the
// public key
func (m *client) PubkeySignature(pubKey, keyID []byte, keyType CryptoSystem) ([]byte, string, error) {
	dataToSign := pubKey
	if keyType == EcDSA {
		// Note, for public key signing we use SHA256 to derive the message hash
		// independent of the address (network) type.
		h := sha256.Sum256(pubKey)
		dataToSign = h[:]
	}

	b, err := common.RandomBytes(16)
	if err != nil {
		return nil, "", err
	}
	traceID := fmt.Sprintf("%16x", b)
	start := time.Now()
	log := m.logger(keyID, traceID)

	response, err := m.mpcSignRequest(dataToSign[:], keyID, nil, traceID, isKey, keyType)
	if err != nil {
		log.WithFields(logrus.Fields{"error": err, "timeTaken": common.RoundFloat(time.Since(start).Seconds(), 2)}).Error("mpcPubKeySignErr")
		return nil, traceID, err
	}

	resp, sig, err := m.decodeAndVerifyMPCSignResponse(response, hex.EncodeToString(dataToSign[:]), keyType)
	if err != nil {
		log.WithFields(logrus.Fields{"error": err, "timeTaken": common.RoundFloat(time.Since(start).Seconds(), 2)}).Error("mpcPubKeySignErr")
		return nil, traceID, err
	}
	log.WithFields(logrus.Fields{
		"pubKey":    resp.EdPk + resp.Pk, // only one returned
		"signature": fmt.Sprintf("%x", sig),
		"timeTaken": common.RoundFloat(time.Since(start).Seconds(), 2),
	}).Info("mpcPubKeySign")

	return sig, traceID, nil
}

// Signature Return a signature for the supplied transaction input required to construct a transaction
func (m *client) Signature(sigRequestData *SigRequestData, keyType CryptoSystem) (*SigResponse, string, error) {
	b, err := common.RandomBytes(16)
	if err != nil {
		return nil, "", err
	}
	keyID := sigRequestData.KeyID
	requestID := sigRequestData.ID
	traceID := fmt.Sprintf("%16x", b)
	start := time.Now()

	log := m.logger(keyID, traceID)
	log = log.WithFields(logrus.Fields{
		"keyID": hex.EncodeToString(keyID),
	})

	response, err := m.mpcSignRequest(sigRequestData.SigHash, keyID, requestID, traceID, isNotKey, keyType)
	if err != nil {
		log.WithFields(logrus.Fields{"error": err, "timeTaken": common.RoundFloat(time.Since(start).Seconds(), 2)}).Error("mpcSignErr")
		return nil, traceID, err
	}

	resp, sig, err := m.decodeAndVerifyMPCSignResponse(response, hex.EncodeToString(sigRequestData.SigHash), keyType)
	if err != nil {
		log.WithFields(logrus.Fields{"error": err, "timeTaken": common.RoundFloat(time.Since(start).Seconds(), 2)}).Error("mpcSignErr")
		return nil, traceID, err
	}
	log.WithFields(logrus.Fields{
		"pubKey":    resp.EdPk + resp.Pk,
		"signature": fmt.Sprintf("%x", sig),
		"timeTaken": common.RoundFloat(time.Since(start).Seconds(), 2),
	}).Info("mpcSign")

	return resp, traceID, nil
}

// Ping - Status check MPC endpoint returns boolean value indicating connection status and a trace identifier
func (m *client) Ping() (bool, string) {
	return m.checkEndpoint(Status)
}

func (m *client) checkEndpoint(endpoint string) (bool, string) {
	host := fmt.Sprintf("%s:%s", m.host, m.port)
	url := fmt.Sprintf("http://%s%v", host, endpoint)
	ctx, cancel := context.WithTimeout(context.Background(), mpcTimeout)
	defer cancel()
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return false, ""
	}
	// Trace ID
	b, err := common.RandomBytes(16)
	if err != nil {
		return false, ""
	}
	traceID := fmt.Sprintf("%16x", b)
	req.Header.Set("X-Request-ID", traceID)

	response, err := http.DefaultClient.Do(req)
	if err != nil {
		return false, traceID
	}

	mpcKeysResp, err := m.decodeAndVerifyMPCKeysResponse(response)

	if err != nil {
		return false, traceID
	}
	return mpcKeysResp.Message == "OK", traceID
}

// mpcKeysRequest takes the input arguments for a new public key generation request to the mpc services
// performs the http request and returns the response
func (m *client) mpcKeysRequest(keyID []byte, traceID string, keyType CryptoSystem) (*http.Response, error) {
	buf, url, err := m.prepareMPCKeysRequest(keyID, keyType)
	if err != nil {
		return nil, err
	}
	ctx, cancel := context.WithTimeout(context.Background(), mpcTimeout)
	// Cancel if response not received within timeout
	defer cancel()
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, url, buf)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("X-Request-ID", traceID)

	response, err := http.DefaultClient.Do(req)
	if err != nil {
		return response, err
	}

	return response, nil
}

// prepareMPCKeysRequest marshals the JSON request into a buffer of bytes
func (m *client) prepareMPCKeysRequest(keyID []byte, keyType CryptoSystem) (*bytes.Buffer, string, error) {
	postReq := &KeysRequest{
		KeyID: hex.EncodeToString(keyID),
	}

	var url string
	switch keyType {
	case EdDSA:
		url = fmt.Sprintf("http://%s:%s%v", m.host, m.port, EdDSAKeys)
	case EcDSA:
		url = fmt.Sprintf("http://%s:%s%v", m.host, m.port, ECDSAKeys)
	default:
		return nil, "", fmt.Errorf("key type %v not supported", keyType)
	}

	buf := new(bytes.Buffer)
	err := json.NewEncoder(buf).Encode(postReq)
	if err != nil {
		return nil, "", err
	}

	return buf, url, err
}

// decodeAndVerifyMPCKeysResponse decodes the http response into an KeysResponse object
func (*client) decodeAndVerifyMPCKeysResponse(response *http.Response) (*KeysResponse, error) {
	if response == nil {
		return nil, fmt.Errorf("empty http response")
	}
	defer response.Body.Close()

	respBuf, err := io.ReadAll(response.Body)
	if err != nil {
		return nil, fmt.Errorf("error reading response: %v", err)
	}
	if response.StatusCode < 200 || response.StatusCode >= 300 {
		return nil, fmt.Errorf("mpc client controller public key generation error, status code: %v, msg: %s", response.StatusCode, respBuf)
	}

	mpcKeysResp := &KeysResponse{}
	err = json.Unmarshal(respBuf, mpcKeysResp)
	if err != nil {
		return nil, err
	}
	return mpcKeysResp, nil
}

// mpcSignRequest makes a mpc signature generation request over http and returns the response
func (m *client) mpcSignRequest(message, keyID, requestID []byte, traceID string, isKey int, keyType CryptoSystem) (*http.Response, error) {
	buf, url, err := m.prepareMPCSignRequest(message, keyID, requestID, isKey, keyType)
	if err != nil {
		return nil, err
	}

	ctx, cancel := context.WithTimeout(context.Background(), mpcTimeout)
	// Cancel if response not received within timeout
	defer cancel()
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, url, buf)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("X-Request-ID", traceID)

	// Get MPC to sign public key
	response, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}

	return response, nil
}

// prepareMPCSignRequest prepares the http request buffer from supplied input parameters
func (m *client) prepareMPCSignRequest(message, keyID, requestID []byte, isKey int, keyType CryptoSystem) (*bytes.Buffer, string, error) {
	postReq := &SigRequest{
		KeyID: hex.EncodeToString(keyID),
		ID:    hex.EncodeToString(requestID),
		IsKey: isKey,
	}

	msg := hex.EncodeToString(message)

	var url string
	switch keyType {
	case EdDSA:
		url = fmt.Sprintf("http://%s:%s%v", m.host, m.port, EdDSASig)
		// TODO check
		postReq.EdMessage = msg
	case EcDSA:
		url = fmt.Sprintf("http://%s:%s%v", m.host, m.port, ECDSASig)
		postReq.EcMessage = msg
	default:
		return nil, "", fmt.Errorf("key type %v not supported", keyType)
	}

	buf := new(bytes.Buffer)
	err := json.NewEncoder(buf).Encode(postReq)
	if err != nil {
		return nil, "", err
	}
	return buf, url, err
}

// decodeAndVerifyMPCSignResponse decodes and validates the response buffer from the mpc service
func (*client) decodeAndVerifyMPCSignResponse(response *http.Response, expectedMessage string, keyType CryptoSystem) (*SigResponse, []byte, error) {
	if response == nil {
		return nil, nil, fmt.Errorf("empty http response")
	}
	defer response.Body.Close()
	respBuf, err := io.ReadAll(response.Body)
	if err != nil {
		return nil, nil, fmt.Errorf("error reading response: %v", err)
	}
	if response.StatusCode < 200 || response.StatusCode >= 300 {
		return nil, nil, fmt.Errorf("mpc client controller error, status code: %v, msg: %s", response.StatusCode, respBuf)
	}
	mPCMPCResponse := &SigResponse{}
	err = json.Unmarshal(respBuf, mPCMPCResponse)
	if err != nil {
		return nil, nil, err
	}

	// Check matching Message
	if mPCMPCResponse.EcMessage != expectedMessage && mPCMPCResponse.EdMessage != expectedMessage {
		return nil, nil, fmt.Errorf("mpc message hash mismatch expected %v, got (ECDSA) %v, (EdDSA) %v", expectedMessage, mPCMPCResponse.EcMessage, mPCMPCResponse.EdMessage)
	}

	rsSerializedSig, _, valid, err := validateResponse(mPCMPCResponse, keyType)
	if err != nil {
		return nil, nil, fmt.Errorf("%w: %s", ErrInvalidSignature, err)
	}
	if !valid {
		return nil, nil, ErrInvalidSignature
	}
	return mPCMPCResponse, rsSerializedSig, nil
}
