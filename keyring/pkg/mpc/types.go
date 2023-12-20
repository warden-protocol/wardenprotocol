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
	"errors"
	"time"

	"gopkg.in/yaml.v3"
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

func IsEmpty(cfg Config) bool {
	b, _ := yaml.Marshal(cfg)
	e, _ := yaml.Marshal(EmptyConfig)
	return bytes.Equal(b, e)
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
	KeyRing   string `json:"key_ring"`
	IsKey     int    `json:"is_key"` // isKey boolean true if the message is a hash of the public key used to verify the signature
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
	KeyID   string `json:"key_id"`
	KeyRing string `json:"key_ring"`
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
