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
package logger

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"time"

	"github.com/sirupsen/logrus"
)

func LogHTTPRequest(entry *logrus.Entry) func(http.Handler) http.Handler {
	return func(h http.Handler) http.Handler {
		entry := entry
		return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
			if entry == nil {
				return
			}
			start := time.Now()
			body, err := readBody(req)
			if err != nil {
				entry.WithError(err)
			}
			statusRecorder := &responseRecorder{ResponseWriter: w}
			h.ServeHTTP(statusRecorder, req)
			elapsed := time.Since(start)
			httpCode := statusRecorder.statusCode
			entry = entry.WithFields(logrus.Fields{
				"trace_id":             getTraceID(req.Header),
				"http_route":           req.URL.Path,
				"http_method":          req.Method,
				"http_code":            httpCode,
				"elapsed_microseconds": elapsed.Microseconds(),
			})
			// only log full request/reposne data if running in debug mode
			if entry.Logger.Level >= logrus.DebugLevel {
				entry = entry.WithField("body", body)
				entry = entry.WithField("response", string(statusRecorder.response))
			}
			if httpCode > 399 {
				entry.Warn()
			} else {
				entry.Print()
			}
		})
	}
}

type responseRecorder struct {
	http.ResponseWriter

	statusCode int
	response   []byte
}

func (w *responseRecorder) WriteHeader(statusCode int) {
	w.statusCode = statusCode
	w.ResponseWriter.WriteHeader(statusCode)
}

func (w *responseRecorder) Write(b []byte) (int, error) {
	w.response = b
	return w.ResponseWriter.Write(b)
}

func readBody(r *http.Request) (map[string]any, error) {
	body := make(map[string]any)
	b, err := io.ReadAll(r.Body)
	if err != nil {
		return nil, err
	}
	if err := json.Unmarshal(b, &body); err != nil {
		return nil, err
	}
	defer func() {
		_ = r.Body.Close()
		r.Body = io.NopCloser(bytes.NewBuffer(b))
		r.ContentLength = int64(bytes.NewBuffer(b).Len())
	}()
	return body, nil
}

func getTraceID(r http.Header) string {
	l, ok := r[http.CanonicalHeaderKey("X-Request-ID")]
	if !ok {
		return "unknown"
	}

	if len(l) != 1 {
		return "unknown"
	}
	return l[0]
}
