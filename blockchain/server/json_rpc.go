// Copyright 2021 Evmos Foundation
// This file is part of Evmos' Ethermint library.
//
// The Ethermint library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// The Ethermint library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Ethermint library. If not, see https://github.com/qredo/fusionchain/blob/main/LICENSE
package server

import (
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/rs/cors"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/server"
	"github.com/cosmos/cosmos-sdk/server/types"
	ethlog "github.com/ethereum/go-ethereum/log"
	ethrpc "github.com/ethereum/go-ethereum/rpc"
	"github.com/qredo/fusionchain/rpc"

	"github.com/qredo/fusionchain/server/config"
	ethermint "github.com/qredo/fusionchain/types"
)

// StartJSONRPC starts the JSON-RPC server
func StartJSONRPC(ctx *server.Context,
	clientCtx client.Context,
	tmRPCAddr,
	tmEndpoint string,
	cfg *config.Config,
	indexer ethermint.EVMTxIndexer,
) (*http.Server, chan struct{}, error) {
	tmWsClient := ConnectTmWS(tmRPCAddr, tmEndpoint, ctx.Logger)

	logger := ctx.Logger.With("module", "geth")
	ethlog.Root().SetHandler(ethlog.FuncHandler(func(r *ethlog.Record) error {
		switch r.Lvl {
		case ethlog.LvlTrace, ethlog.LvlDebug:
			logger.Debug(r.Msg, r.Ctx...)
		case ethlog.LvlInfo, ethlog.LvlWarn:
			logger.Info(r.Msg, r.Ctx...)
		case ethlog.LvlError, ethlog.LvlCrit:
			logger.Error(r.Msg, r.Ctx...)
		}
		return nil
	}))

	rpcServer := ethrpc.NewServer()

	allowUnprotectedTxs := cfg.JSONRPC.AllowUnprotectedTxs
	rpcAPIArr := cfg.JSONRPC.API

	apis := rpc.GetRPCAPIs(ctx, clientCtx, tmWsClient, allowUnprotectedTxs, indexer, rpcAPIArr)

	for _, api := range apis {
		if err := rpcServer.RegisterName(api.Namespace, api.Service); err != nil {
			ctx.Logger.Error(
				"failed to register service in JSON RPC namespace",
				"namespace", api.Namespace,
				"service", api.Service,
			)
			return nil, nil, err
		}
	}

	r := mux.NewRouter()
	r.HandleFunc("/", rpcServer.ServeHTTP).Methods("POST")

	handlerWithCors := cors.Default()
	if cfg.API.EnableUnsafeCORS {
		handlerWithCors = cors.AllowAll()
	}

	httpSrv := &http.Server{
		Addr:              cfg.JSONRPC.Address,
		Handler:           handlerWithCors.Handler(r),
		ReadHeaderTimeout: cfg.JSONRPC.HTTPTimeout,
		ReadTimeout:       cfg.JSONRPC.HTTPTimeout,
		WriteTimeout:      cfg.JSONRPC.HTTPTimeout,
		IdleTimeout:       cfg.JSONRPC.HTTPIdleTimeout,
	}
	httpSrvDone := make(chan struct{}, 1)

	ln, err := Listen(httpSrv.Addr, cfg)
	if err != nil {
		return nil, nil, err
	}

	errCh := make(chan error)
	go func() {
		ctx.Logger.Info("Starting JSON-RPC server", "address", cfg.JSONRPC.Address)
		if err := httpSrv.Serve(ln); err != nil {
			if err == http.ErrServerClosed {
				close(httpSrvDone)
				return
			}

			ctx.Logger.Error("failed to start JSON-RPC server", "error", err.Error())
			errCh <- err
		}
	}()

	select {
	case err := <-errCh:
		ctx.Logger.Error("failed to boot JSON-RPC server", "error", err.Error())
		return nil, nil, err
	case <-time.After(types.ServerStartTime): // assume JSON RPC server started successfully
	}

	ctx.Logger.Info("Starting JSON WebSocket server", "address", cfg.JSONRPC.WsAddress)

	// allocate separate WS connection to Tendermint
	tmWsClient = ConnectTmWS(tmRPCAddr, tmEndpoint, ctx.Logger)
	wsSrv := rpc.NewWebsocketsServer(clientCtx, ctx.Logger, tmWsClient, cfg)
	wsSrv.Start()
	return httpSrv, httpSrvDone, nil
}
