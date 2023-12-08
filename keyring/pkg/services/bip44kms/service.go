package kms

import (
	"fmt"
	"net/http"
	"os"
	"sync/atomic"

	"github.com/sirupsen/logrus"

	"github.com/qredo/fusionchain/keyring/pkg/api"
	"github.com/qredo/fusionchain/keyring/pkg/common"
	"github.com/qredo/fusionchain/keyring/pkg/database"
	"github.com/qredo/fusionchain/keyring/pkg/rpc"
)

type Service struct {
	keyringAddr   string
	keyringSigner string
	secrets       secrets
	modules       []api.Module
	server        rpc.HTTPService
	log           *logrus.Entry
	dB            database.Database

	stop    chan struct{}
	stopped atomic.Bool
}

type secrets struct {
	mnemonic string
	password string
}

func New(keyringAddr, keyRingSigner, mnemonic, password string, port int, logger *logrus.Entry, db database.Database, modules ...api.Module) *Service {
	s := &Service{
		keyringAddr:   keyringAddr,
		keyringSigner: keyRingSigner,
		secrets:       secrets{mnemonic: mnemonic, password: password},
		log:           logger,
		dB:            db,
		modules:       modules,
		stop:          make(chan struct{}, 1),
		stopped:       atomic.Bool{},
	}
	s.server = rpc.NewHTTPService(port, rpc.MakeAPI([]rpc.EndPoint{
		rpc.NewEndpoint(api.StatusEndPnt, http.MethodGet, func(w http.ResponseWriter, r *http.Request) { // /status
			api.HandleStatusRequest(w, logger, serviceName)
		}),
		rpc.NewEndpoint(api.HealthEndPnt, http.MethodGet, func(w http.ResponseWriter, r *http.Request) { // /healthcheck
			api.HandleHealthcheckRequest(w, s.modules, logger, serviceName)
		}),
		rpc.NewEndpoint(api.KeyringEndPnt, http.MethodGet, api.PasswordProtected(s.secrets.password, func(w http.ResponseWriter, r *http.Request) { // /keyring
			api.HandleKeyringRequest(w, logger, s.keyringAddr, s.keyringSigner, serviceName)
		})),
		rpc.NewEndpoint(api.PubKeysEndPnt, http.MethodGet, api.PasswordProtected(s.secrets.password, func(w http.ResponseWriter, r *http.Request) { // /pubkeys
			api.HandlePubKeyRequest(w, logger, s.dB, serviceName)
		})),
		rpc.NewEndpoint(api.MnemonicEndPnt, http.MethodGet, api.PasswordProtected(s.secrets.password, func(w http.ResponseWriter, r *http.Request) { // /mnemonic
			api.HandleMnemonicRequest(w, logger, s.secrets.password, s.secrets.mnemonic, serviceName)
		})),
	}), logger)
	return s
}

// Start starts the main keyring service
func (s *Service) Start() error {
	s.log.WithFields(logrus.Fields{
		"version":   common.FullVersion,
		"buildDate": common.Date,
	}).Info("starting keyring service")

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
	s.log.Info("keyring stopped")
	return nil
}
