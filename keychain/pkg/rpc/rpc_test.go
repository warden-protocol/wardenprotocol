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
package rpc

import (
	"encoding/json"
	"errors"

	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/warden-protocol/wardenprotocol/keychain/pkg/logger"

	"github.com/stretchr/testify/assert"
)

func Test_MakeAPI(t *testing.T) {
	if a := MakeAPI([]EndPoint{{}}); a == nil {
		t.Fatal("unexpected nil output")
	}
}

// Test RespondWithJSON function.
func TestRespondWithJSON(t *testing.T) {
	w := httptest.NewRecorder()
	payload := map[string]string{"hello": "world"}
	if err := RespondWithJSON(w, http.StatusOK, payload); err != nil {
		t.Fatal(err)
	}

	// Assert response body.
	expectedBody := `{"hello":"world"}`
	assert.Equal(t, expectedBody, w.Body.String())

	// Assert response headers.
	assert.Equal(t, "application/json", w.Header().Get("Content-Type"))
	assert.Equal(t, http.StatusOK, w.Code)
}

// Test RespondWithError function.
func TestRespondWithError(t *testing.T) {
	w := httptest.NewRecorder()
	RespondWithError(w, http.StatusBadRequest, errors.New("bad request"))

	// Assert response body.
	expectedBody := `{"error":"bad request"}`
	assert.Equal(t, expectedBody, w.Body.String())

	// Assert response headers.
	assert.Equal(t, "application/json", w.Header().Get("Content-Type"))
	assert.Equal(t, http.StatusBadRequest, w.Code)
}

// Test HTTPService.Start and HTTPService.Stop functions.
func TestHTTPService(t *testing.T) {

	tests := []struct {
		name               string
		endpoint           string
		handler            func(w http.ResponseWriter, r *http.Request)
		requestPath        string
		expectedResponse   interface{}
		expectedStatusCode int
		expectedError      error
	}{
		{
			"hello world",
			"/hello",
			func(w http.ResponseWriter, r *http.Request) {
				if err := RespondWithJSON(w, http.StatusOK, map[string]string{"message": "hello world"}); err != nil {
					http.Error(w, "Internal server error", http.StatusInternalServerError)
					return
				}
			},
			"/hello",
			map[string]string{"message": "hello world"},
			http.StatusOK,
			nil,
		},
		{
			"hello world (typo)",
			"/hello",
			func(w http.ResponseWriter, r *http.Request) {
				if err := RespondWithJSON(w, http.StatusOK, map[string]string{"message": "hello world"}); err != nil {
					http.Error(w, "Internal server error", http.StatusInternalServerError)
					return
				}
			},
			"/hellor",
			nil,
			http.StatusNotFound,
			nil,
		},
		{
			"bad request",
			"/bad",
			func(w http.ResponseWriter, r *http.Request) {
				RespondWithError(w, http.StatusBadRequest, "bad request")
			},
			"/bad",
			map[string]string{"error": "bad request"},
			http.StatusBadRequest,
			nil,
		},
	}

	// Create a test HTTP service using the test router and logger
	testLogger, err := logger.NewLogger(logger.Panic, logger.Plain, false, "test")
	if err != nil {
		t.Fatal(err)
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			a := &API{}
			a.AddEndpoint(NewEndpoint(tt.endpoint, http.MethodGet, tt.handler))

			// Create test HTTP service
			testService := NewHTTPService(8080, a, testLogger)

			// Start the test service in a separate goroutine
			testService.Start()
			defer func() {
				if err := testService.Stop(); err != nil {
					t.Error(err)
				}
			}()

			// Wait for the test service to start
			time.Sleep(100 * time.Millisecond)
			// Send a test HTTP request to the test service using the test router
			req, err := http.NewRequest("GET", "http://localhost:8080"+tt.requestPath, nil)
			if err != nil {
				t.Fatal(err)
			}

			// Use the http.DefaultClient.Do function to send the request to the test server.
			resp, err := http.DefaultClient.Do(req)
			if err != nil {
				t.Fatalf("Failed to send request: %v", err)
			}

			// Verify that the response body is what you expect it to be.
			defer func() {
				if err := resp.Body.Close(); err != nil {
					t.Error(err)
				}
			}()

			assert.Equal(t, tt.expectedStatusCode, resp.StatusCode)

			if resp.StatusCode != http.StatusNotFound {
				var actual map[string]string
				err = json.NewDecoder(resp.Body).Decode(&actual)
				if err != nil {
					t.Fatal(err)
				}
				assert.Equal(t, tt.expectedResponse, actual)
			}
		})
	}
}
