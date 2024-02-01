// Copyright 2024
//
// This file includes work covered by the following copyright and permission notices:
//
// Copyright 2023 Qredo Ltd.
// Licensed under the Apache License, Version 2.0;
//
// This file is part of the Warden Protocol library.
//
// The Warden Protocol library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Warden Protocol library. If not, see https://github.com/warden-protocol/wardenprotocol/blob/main/LICENSE
package api

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/warden-protocol/wardenprotocol/keychain/pkg/common"
	"github.com/warden-protocol/wardenprotocol/keychain/pkg/database"
	"github.com/warden-protocol/wardenprotocol/keychain/pkg/logger"
)

func Test_RateLimit(t *testing.T) {
	n := "test"
	log, err := logger.NewLogger("fatal", "plain", false, n)
	if err != nil {
		t.Fatal(err)
	}
	m := newMockKeychain("", log, database.NewMemory(), &mockModule{})
	apiTests := []struct {
		name             string
		endpoint         string
		ratelimit        int
		requests         int
		expectedResponse any
		expectedCode     int
	}{
		{
			"too many (low)",
			PubKeysEndPnt,
			1,
			2,
			map[string]string{"error": errTooManyRequests.Error()},
			http.StatusBadRequest,
		},
		{
			"high",
			PubKeysEndPnt,
			100,
			100,
			&Response{Message: "OK", Version: common.FullVersion, Service: "test"},
			http.StatusOK,
		},
		{
			"too many (high)",
			PubKeysEndPnt,
			100,
			101,
			map[string]string{"error": errTooManyRequests.Error()},
			http.StatusBadRequest,
		},
	}

	for _, tt := range apiTests {
		t.Run(tt.name, func(t *testing.T) {
			method := WithRateLimit(tt.ratelimit, time.Second, PasswordProtected(m.password, HandlePubKeyRequest(m.log, m.db, n)))
			httpReq := httptest.NewRequest(http.MethodGet, tt.endpoint, nil)
			respRecorder := httptest.NewRecorder()
			for i := 0; i < tt.requests; i++ {
				respRecorder = httptest.NewRecorder()
				method(respRecorder, httpReq)
			}
			if g, w := respRecorder.Code, tt.expectedCode; g != w {
				t.Errorf("unexpected response code, want %v got %v", w, g)
			}
			expectedJSON, _ := json.Marshal(tt.expectedResponse)

			if g, w := respRecorder.Body.Bytes(), expectedJSON; !bytes.Equal(g, w) {
				t.Fatalf("unexpected response, want %s, got %s", w, g)
			}
		})
	}
}

func Test_TokenRefill(t *testing.T) {
	n := "test"
	log, err := logger.NewLogger("fatal", "plain", false, "test")
	if err != nil {
		t.Fatal(err)
	}
	m := newMockKeychain("", log, database.NewMemory(), &mockModule{})

	duration := 10 * time.Millisecond
	pause := 11 * time.Millisecond

	method := WithRateLimit(1, duration, HandleStatusRequest(m.log, n))
	httpReq := httptest.NewRequest(http.MethodGet, PubKeysEndPnt, nil)
	respRecorder := httptest.NewRecorder()

	for i := 0; i < 10; i++ {
		respRecorder = httptest.NewRecorder()
		method(respRecorder, httpReq)
		time.Sleep(pause) // Ensure time elapses for the tokens to refill
	}

	if g, w := respRecorder.Code, http.StatusOK; g != w {
		t.Errorf("unexpected response code, want %v got %v", w, g)
	}

	expectedJSON, _ := json.Marshal(&Response{Message: "OK", Version: common.FullVersion, Service: "test"})

	if g, w := respRecorder.Body.Bytes(), expectedJSON; !bytes.Equal(g, w) {
		t.Fatalf("unexpected response, want %s, got %s", w, g)
	}
}
