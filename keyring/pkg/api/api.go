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
package api

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"time"

	"github.com/qredo/fusionchain/keyring/pkg/common"
	"github.com/qredo/fusionchain/keyring/pkg/database"

	"github.com/qredo/fusionchain/keyring/pkg/rpc"
	"github.com/sirupsen/logrus"
)

const (

	// API - TODO create single package for multiple services
	StatusEndPnt   = "/status"
	HealthEndPnt   = "/healthcheck"
	KeyringEndPnt  = "/keyring"  // Password protected
	PubKeysEndPnt  = "/pubkeys"  // Password protected
	MnemonicEndPnt = "/mnemonic" // Password protected

	pwdHeaderKey = "password"
	pkPrefix     = "pk"
)

var (
	errInvalidPswd     = errors.New("invalid password")
	errTooManyRequests = errors.New("too many requests")
)

// Response represents the superset of Status and PubKey API responses.
type Response struct {
	Message       string    `json:"message,omitempty"`
	Version       string    `json:"version,omitempty"`
	Service       string    `json:"service,omitempty"`
	KeyRing       string    `json:"keyring,omitempty"`
	KeyringSigner string    `json:"keyring_signer,omitempty"`
	PubKeys       []*PubKey `json:"pubkeys,omitempty"`
	Mnemonic      string    `json:"mnemonic,omitempty"`
	PasswordUsed  bool      `json:"password_protected,omitempty"`
}

// HealthResponse represents the healthcheck API with no omitted fields.
type HealthResponse struct {
	Version  string   `json:"version"`
	Service  string   `json:"service"`
	Failures []string `json:"failures"`
}

// PubKey represents the pubkeys API return object.
type PubKey struct {
	KeyID      string `json:"key_id"`
	PubKeyData PkData `json:"pubkey_data"`
}

// PkData represents the format for public key info.
type PkData struct {
	PublicKey string `json:"pubkey"`
	Type      string `json:"type"`
	Created   string `json:"created"`
	LastUsed  string `json:"last_used"`
}

// PasswordProtected wraps the handler with password verification.
func PasswordProtected(password string, handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		pwd := req.Header.Get(pwdHeaderKey)
		if password != pwd {
			rpc.RespondWithError(w, http.StatusBadRequest, errInvalidPswd)
			return
		}
		handler(w, req)
	}
}

// WithRateLimit wraps the handler with a rate limiter. The rateLimit represents the number of requests
// within the given duration e.g. rateLimit = 2, duration = time.Second ==> 2 req/second.
func WithRateLimit(rateLimit int, duration time.Duration, handler http.HandlerFunc) http.HandlerFunc {
	limiter := NewRateLimiter(rateLimit, duration)
	go limiter.refillTokens()
	return func(w http.ResponseWriter, req *http.Request) {
		if limiter.takeToken() {
			handler(w, req)
			return
		}
		rpc.RespondWithError(w, http.StatusBadRequest, errTooManyRequests)
	}
}

//
// API
//

// HandleStatusRequest handles the /status query and will always respond OK.
func HandleStatusRequest(logger *logrus.Entry, serviceName string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		resp := Response{Message: "OK", Version: common.FullVersion, Service: serviceName}
		if err := rpc.RespondWithJSON(w, http.StatusOK, resp); err != nil {
			logger.Error(err)
		}
	}
}

// HandleHealthcheckRequest handles the the /healthcheck query.
func HandleHealthcheckRequest(modules []Module, logger *logrus.Entry, serviceName string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		health := &HealthResponse{
			Service: serviceName,
			Version: common.FullVersion,
		}
		var failures = []string{}

		for _, sub := range modules {
			// verify whether all subprocesses are healthy
			r := sub.Healthcheck()
			failures = append(failures, r.Failures...)
		}

		health.Failures = failures
		if len(failures) > 0 {
			if err := rpc.RespondWithJSON(w, http.StatusServiceUnavailable, health); err != nil {
				logger.Error(err)
			}
			return
		}
		if err := rpc.RespondWithJSON(w, http.StatusOK, health); err != nil {
			logger.Error(err)
		}
	}
}

// HandleKeyringRequest implements the /keyring endpoint, keyring address registered for the service.
// PASSWORD PROTECTION should be used, in which case the http header must contain the correct password for the service.
func HandleKeyringRequest(logger *logrus.Entry, keyringAddr, keyRingSigner, serviceName string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if err := rpc.RespondWithJSON(w, http.StatusOK, &Response{
			Service:       serviceName,
			Version:       common.FullVersion,
			Message:       "OK",
			KeyRing:       keyringAddr,
			KeyringSigner: keyRingSigner,
		}); err != nil {
			logger.Error(err)
		}
	}
}

// HandlePubKeyRequest implements the /pubkeys endpoint, returning a list of registered keyID and public keys
// stored in the local database. PASSWORD PROTECTION is used, the http header must contain the correct password for
// the service.
func HandlePubKeyRequest(logger *logrus.Entry, db database.Database, serviceName string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		pKeyResponse := &Response{
			Service: serviceName,
			Version: common.FullVersion,
			Message: "OK",
		}

		keyMap, err := db.Read(pkPrefix)
		if err != nil {
			pKeyResponse.Message = err.Error()
			if err := rpc.RespondWithJSON(w, http.StatusInternalServerError, pKeyResponse); err != nil {
				logger.Error(err)
			}
			return
		}

		var pubKeyList []*PubKey
		for keyID, pKDat := range keyMap {
			dt := PkData{}
			if err := json.Unmarshal(pKDat, &dt); err != nil {
				rpc.RespondWithError(w, http.StatusInternalServerError, fmt.Errorf("could not unmarshal data '%s': %v", pKDat, err))
				return
			}
			pubKeyList = append(pubKeyList, &PubKey{KeyID: keyID, PubKeyData: dt})
		}
		pKeyResponse.PubKeys = pubKeyList

		if err := rpc.RespondWithJSON(w, http.StatusOK, pKeyResponse); err != nil {
			logger.Error(err)
		}
	}
}

// HandleMnemonicRequest implements the /mnemonic endpoint, returning the BIP39 seed phrase used to derive the keyring's master seed.
// PASSWORD PROTECTION is used, the http header must contain the correct password for the service.
func HandleMnemonicRequest(logger *logrus.Entry, password, mnemonic, serviceName string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if err := rpc.RespondWithJSON(w, http.StatusOK, &Response{
			Service:      serviceName,
			Version:      common.FullVersion,
			Message:      "OK",
			Mnemonic:     mnemonic,
			PasswordUsed: (password != ""),
		}); err != nil {
			logger.Error(err)
		}
	}
}
