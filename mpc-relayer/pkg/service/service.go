package service

import (
	"fmt"
	"os"
	"sync/atomic"

	"github.com/sirupsen/logrus"

	"github.com/qredo/fusionchain/mpc-relayer/pkg/common"
	"github.com/qredo/fusionchain/mpc-relayer/pkg/database"
	"github.com/qredo/fusionchain/mpc-relayer/pkg/rpc"
)

type Service struct {
	keyringAddr string
	modules     []Module
	server      rpc.HTTPService
	log         *logrus.Entry
	keyDB       database.Database

	stop    chan struct{}
	stopped atomic.Bool
}

func New(keyringAddr string, port int, logger *logrus.Entry, keyDB database.Database, modules ...Module) *Service {
	s := &Service{
		keyringAddr: keyringAddr,
		log:         logger,
		keyDB:       keyDB,
		modules:     modules,
		stop:        make(chan struct{}, 1),
		stopped:     atomic.Bool{},
	}
	s.server = rpc.NewHTTPService(port, makeAPIHandlers(s), logger)
	return s
}

// Start starts the main mpc-relayer service
func (s *Service) Start() error {
	s.log.WithFields(logrus.Fields{
		"version":   common.FullVersion,
		"buildDate": common.Date,
	}).Info("starting mpc-relayer service")

	var errStr string
	for i, module := range s.modules {
		if err := module.Start(); err != nil {
			s.log.WithError(err).Error("cannot start module")
			errStr += fmt.Sprintf("%v : %v - ", i, err.Error())
		}
	}
	if errStr != "" {
		return fmt.Errorf("%v", errStr)
	}
	// start HTTP server
	s.server.Start()
	return nil
}

// Stop terminates the MPC relayer service killing all subprocesses
func (s *Service) Stop(sig os.Signal) error {
	s.log.WithFields(logrus.Fields{"signal": sig.String()}).Warn("received shutdown signal")

	if s.stopped.Load() {
		s.log.WithFields(logrus.Fields{"signal": sig}).Warn("already shutting down")
		return fmt.Errorf("already shutting down")
	}
	// Stop HTTP server
	if err := s.server.Stop(); err != nil {
		s.log.WithFields(logrus.Fields{"error": err.Error()}).Error("http server error")
	}
	s.stopped.Store(true)
	close(s.stop)
	var errStr string
	for i, module := range s.modules {
		if err := module.Stop(); err != nil {
			s.log.WithFields(logrus.Fields{"error": err.Error()}).Error("cannot stop module")
			errStr += fmt.Sprintf("%v : %v - ", i, err.Error())
		}
	}
	if errStr != "" {
		return fmt.Errorf("%v", errStr)
	}
	s.log.Info("mpc-relayer stopped")
	return nil
}
