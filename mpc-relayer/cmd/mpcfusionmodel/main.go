package main

import (
	"net/http"
	"os"
	"os/signal"

	"github.com/qredo/fusionchain/mpc-relayer/pkg/logger"
	"github.com/qredo/fusionchain/mpc-relayer/pkg/mpc"
	"github.com/qredo/fusionchain/mpc-relayer/pkg/rpc"
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
