package service

import (
	"context"
	"encoding/hex"
	"fmt"
	"time"

	"github.com/qredo/fusionchain/mpc-relayer/pkg/common"
	"github.com/qredo/fusionchain/mpc-relayer/pkg/database"
	"github.com/qredo/fusionchain/mpc-relayer/pkg/mpc"
	"github.com/qredo/fusionchain/x/treasury/types"
	"github.com/sirupsen/logrus"
)

type signatureController struct {
	KeyringID                uint64
	queue                    chan *signatureRequestQueueItem
	signatureRequestsHandler SignatureRequestsHandler
	log                      *logrus.Entry

	stop       chan struct{}
	wait       chan struct{}
	retrySleep time.Duration
}

type signatureRequestQueueItem struct {
	retries  int
	maxTries int
	request  *types.SignRequest
}

func newFusionSignatureController(logger *logrus.Entry, prefixDB database.Database, q chan *signatureRequestQueueItem, keyringClient mpc.Client, txc TxClient) *signatureController {
	s := &FusionSignatureRequestHandler{
		KeyDB:         prefixDB,
		keyringClient: keyringClient,
		TxClient:      txc,
		Logger:        logger,
	}
	return &signatureController{
		queue:                    q,
		signatureRequestsHandler: s,
		log:                      logger,
		stop:                     make(chan struct{}, 1),
		wait:                     make(chan struct{}, 1),
		retrySleep:               defaultRetryTimeout,
	}
}

// Start implements Module.Start()
func (s *signatureController) Start() error {
	if s.queue == nil || s.stop == nil {
		return fmt.Errorf("empty work channels")
	}
	go s.startExecutor()
	return nil
}

func (s *signatureController) startExecutor() {
	var processing bool
	for {
		select {
		case <-s.stop:
			s.log.Info("signatureController received shutdown signal")
			for {
				if !processing {
					break
				}
			}
			s.log.Info("terminated signatureController")
			s.wait <- struct{}{}
			return
		case item := <-s.queue:
			// process queue items async
			go func() {
				processing = true
				defer func() { processing = false }()
				if err := s.executeRequest(item); err != nil {
					s.log.WithFields(logrus.Fields{
						"retries": item.retries,
						"error":   err.Error(),
					}).Error("signRequestErr")
				}
			}()
		}
	}
}

// Stop implements Module.Stop()
func (s *signatureController) Stop() error {
	s.stop <- struct{}{}
	<-s.wait
	return nil
}

func (s *signatureController) executeRequest(item *signatureRequestQueueItem) error {
	ctx, cancelFunc := context.WithTimeout(context.Background(), defaultHandlerTimeout)
	defer cancelFunc()
	if err := s.signatureRequestsHandler.HandleSignatureRequest(ctx, item); err != nil {
		if item.retries <= item.maxTries {
			requeueSigItemWithTimeout(s.queue, item, s.retrySleep)
		}
		return err
	}
	return nil
}

func (s signatureController) healthcheck() *HealthResponse {
	return s.signatureRequestsHandler.healthcheck()
}

type SignatureRequestsHandler interface {
	HandleSignatureRequest(ctx context.Context, item *signatureRequestQueueItem) error
	healthcheck() *HealthResponse
}

// FusionSignatureRequestHandler implements SignatureRequestsHandler.
type FusionSignatureRequestHandler struct {
	KeyDB         database.Database
	keyringClient mpc.Client
	TxClient      TxClient
	Logger        *logrus.Entry
}

var _ SignatureRequestsHandler = &FusionSignatureRequestHandler{}

// HandleSignatureRequest processes the pending sign request supplied by fusiond, requesting a signature from
// the MPC client for the supplied keyID and requestID and fulfilling the request via the TxClient.
func (h *FusionSignatureRequestHandler) HandleSignatureRequest(ctx context.Context, item *signatureRequestQueueItem) error {
	if item == nil || item.request == nil {
		return fmt.Errorf("malformed keyRequest item")
	}
	start := time.Now()

	// extract keyID and requestID from the item. This uniquely determines the requests
	keyID, err := hex.DecodeString(fmt.Sprintf("%0*x", mpcRequestKeyLength, item.request.KeyId))
	if err != nil {
		return err
	}
	requestID, err := hex.DecodeString(fmt.Sprintf("%0*x", mpcRequestKeyLength, item.request.Id))
	if err != nil {
		return err
	}

	// reuest a signature via the MPC/Keyring client
	sigResponse, _, err := h.keyringClient.Signature(&mpc.SigRequestData{
		KeyID:   keyID,
		ID:      requestID,
		SigHash: item.request.DataForSigning,
	}, mpc.EcDSA)
	if err != nil {
		if item.retries >= item.maxTries {
			// If the request fails maxTries times, return a rejected notice to the fusion network and
			// do not retry
			if rejectErr := h.TxClient.RejectSignatureRequest(ctx, item.request.Id, err.Error()); rejectErr != nil {
				return rejectErr
			}
			return nil
		}
		return err
	}

	// convert the returned signature parts into a 65-byte [r, s, v] signature
	// with recoveryID valid on the Ethereum network
	signature, err := mpc.ExtractSerializedSigECDSA(sigResponse)
	if err != nil {
		return err
	}

	// write the returned signature back to the fusion network
	if err = h.TxClient.FulfilSignatureRequest(ctx, item.request.Id, signature); err != nil {
		return err
	}
	h.Logger.WithFields(logrus.Fields{
		"keyID":     fmt.Sprintf("%x", keyID),
		"requestID": fmt.Sprintf("%x", requestID),
		"timeTaken": common.RoundFloat(time.Since(start).Seconds(), 2),
	}).Info("sigRequestFulfilled")

	return nil
}

func (h *FusionSignatureRequestHandler) healthcheck() *HealthResponse {
	mpcOk, _ := h.keyringClient.Ping()
	if !mpcOk {
		return &HealthResponse{Failures: []string{"mpc not ok"}}
	}
	return &HealthResponse{}
}
