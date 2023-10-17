package mpc

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

import (
	"errors"
	"time"

	"github.com/sirupsen/logrus"
)

const (
	isKey    int = 1
	isNotKey int = 0

	keyIDLength = 64
)

var (
	Status     = "/status"
	ECDSAKeys  = "/ecdsa/keys"
	ECDSASig   = "/ecdsa/sign"
	EdDSAKeys  = "/eddsa/keys"
	EdDSASig   = "/eddsa/sign"
	mpcTimeout = 60 * time.Second

	EmptyConfig = Config{}
)

type Client interface {
	PublicKey(keyID []byte, keyType CryptoSystem) ([]byte, string, error)
	PubkeySignature(pubKey, keyID []byte, keyType CryptoSystem) ([]byte, string, error)
	Signature(sigRequestData *SigRequestData, keyType CryptoSystem) (*SigResponse, string, error)
	Ping() (bool, string)
}

// NewClient - Constructor creating a channel of MPC clients for multi-threaded access
// to mpcclientparent endpoints
func NewClient(config Config, logger *logrus.Entry) Client {
	if config.Mock {
		return newLocalClient(logger, config.Salt)
	}
	clients := aggregatedClient{clients: make(chan Client, len(config.Node))}
	for index, node := range config.Node {
		c, trace := newMPCClient(node, index, logger)
		logger.WithFields(logrus.Fields{"mpcIndex": index, "trace_id": trace, "connected": c.isConnected}).Info("connectedToMPC")
		clients.clients <- c
	}
	return clients
}

type CryptoSystem string

const (
	EcDSA CryptoSystem = "ecdsa"
	EdDSA CryptoSystem = "eddsa"
)

// KeyRequestData information required to build a public key request
type KeyRequestData struct {
	KeyID  []byte
	PubKey []byte
}

// SigRequestData information required to build a signature request
type SigRequestData struct {
	KeyID   []byte
	ID      []byte
	SigHash []byte
}

// Request - MPC Post request
type SigRequest struct {
	KeyID     string `json:"key_id"`        // Unique identifier for key-shares needed to construct a signature
	ID        string `json:"id"`            // Unique identifier for the signature request
	EcMessage string `json:"ecdsa_message"` // message signed (ECDSA)
	EdMessage string `json:"eddsa_message"` // message to be signed (EdDSA)
	IsKey     int    `json:"is_key"`        // isKey boolean true if the message is a hash of the public key used to verify the signature
}

// Response - MPC Post response NOTE: 33 byte version in the response is ignored for EdDSA sig r, s & public key
type SigResponse struct {
	Service   string `json:"service"`
	Message   string `json:"message"`
	Version   string `json:"version"`
	TraceID   string `json:"trace_id"`
	IsKey     int    `json:"is_key"`
	KeyID     string `json:"key_id"`
	ID        string `json:"id"`
	EcMessage string `json:"ecdsa_message"` // Message signed (ECDSA)
	EcR       string `json:"ecdsa_r"`
	EcS       string `json:"ecdsa_s"`
	Pk        string `json:"ecdsa_pk"`
	EdMessage string `json:"eddsa_message"` // Message to be signed (EdDSA)
	EdR       string `json:"eddsa_r_32"`
	EdS       string `json:"eddsa_s_32"`
	EdPk      string `json:"eddsa_pk_32"`
	Namespace string `json:"namespace"`
	Node      string `json:"node"`
}

// KeysRequest MPC  ECDSA Public key generation request
type KeysRequest struct {
	KeyID string `json:"key_id"`
}

// KeysResponse - MPC Keys response
type KeysResponse struct {
	Service   string `json:"service"`
	Message   string `json:"message"`
	Version   string `json:"version"`
	KeyID     string `json:"key_id"`
	TraceID   string `json:"trace_id"`
	Pk        string `json:"ecdsa_pk"`
	EdPk      string `json:"eddsa_pk_32"`
	Currency  int    `json:"currency"`
	Namespace string `json:"namespace"`
	Node      string `json:"node"`
}

var (
	ErrInvalidSignature = errors.New("invalid signature")
	ErrNoPubKey         = errors.New("no public key returned")
	ErrNilInput         = errors.New("nil input")
)

// Node describes a MPC node
type Node struct {
	Host string `yaml:"host"`
	Port string `yaml:"port"`
}

// Config Stores MPC endpoint addresses
type Config struct {
	Mock bool `yaml:"mock"`
	Salt int  `yaml:"salt"`
	Node []Node
}
