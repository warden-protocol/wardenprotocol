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
package main

import (
	"net/http"
	"os"
	"os/signal"

	"github.com/qredo/fusionchain/keyring/pkg/logger"
	"github.com/qredo/fusionchain/keyring/pkg/mpc"
	"github.com/qredo/fusionchain/keyring/pkg/rpc"
	"github.com/sirupsen/logrus"
)

func main() {
	// create logger
	log, err := logger.NewLogger("info", "plain", false, "mpcfusionmodel")
	if err != nil {
		panic(err)
	}
	mpcServer := mpc.NewLocalMPCServer(0)

	// Add endpoints
	r := &rpc.API{}
	r.AddEndpoint(rpc.NewEndpoint(mpc.Status, http.MethodGet, http.HandlerFunc(mpcServer.Check)))
	r.AddEndpoint(rpc.NewEndpoint(mpc.ECDSAKeys, http.MethodPost, http.HandlerFunc(mpcServer.KeysECDSA)))
	r.AddEndpoint(rpc.NewEndpoint(mpc.ECDSASig, http.MethodPost, http.HandlerFunc(mpcServer.SignECDSA)))
	r.AddEndpoint(rpc.NewEndpoint(mpc.EdDSAKeys, http.MethodPost, http.HandlerFunc(mpcServer.KeysEdDSA)))
	r.AddEndpoint(rpc.NewEndpoint(mpc.EdDSASig, http.MethodPost, http.HandlerFunc(mpcServer.SignEdDSA)))

	// create server
	server := rpc.NewHTTPService(9000, r, log)

	log.WithFields(logrus.Fields{
		"port": 9000,
	}).Info("starting mpcfusionmodel")

	// start server
	server.Start()
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt)
	sig := <-sigChan
	log.WithFields(logrus.Fields{
		"signal": sig,
	}).Info("received shutdown signal")
	if err := server.Stop(); err != nil {
		log.Error(err)
	}
}
