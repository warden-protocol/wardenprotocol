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
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/sirupsen/logrus"
	"github.com/warden-protocol/wardenprotocol/keychain/pkg/logger"
)

type HTTPService struct {
	port   int
	server Server
	logger *logrus.Entry
}

func NewHTTPService(port int, api *API, l *logrus.Entry) HTTPService {
	handler := api.Routes()
	handler.Use(logger.LogHTTPRequest(l))

	return HTTPService{
		port: port,
		server: &http.Server{
			Addr:              fmt.Sprintf(":%d", port),
			Handler:           handler,
			ReadHeaderTimeout: 20 * time.Second,
		},
		logger: l,
	}
}

type EndPoint struct {
	Path       string
	Handler    http.HandlerFunc
	MethodType string
}

func NewEndpoint(path, methodType string, handler http.HandlerFunc) EndPoint {
	return EndPoint{
		Path:       path,
		Handler:    handler,
		MethodType: methodType,
	}
}

type API struct {
	Endpoints []EndPoint
}

func MakeAPI(endpoints []EndPoint) *API {
	r := &API{}
	for _, e := range endpoints {
		r.AddEndpoint(e)
	}
	return r
}

func (a *API) AddEndpoint(e EndPoint) {
	a.Endpoints = append(a.Endpoints, e)
}

func (a *API) Routes() *mux.Router {
	router := mux.NewRouter()
	for _, e := range a.Endpoints {
		router.Handle(e.Path, e.Handler).Methods(e.MethodType)
	}
	return router
}

func (service *HTTPService) Start() {
	go func() {
		if err := service.server.ListenAndServe(); err != nil {
			service.logger.WithFields(logrus.Fields{"error": err}).Warn("serverTerminated")
		}
	}()
}

func (service *HTTPService) Stop() error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	return service.server.Shutdown(ctx)
}
