package rpc

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"math/big"
	"net"
	"net/http"
	"sync"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"github.com/pkg/errors"

	"github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/eth/filters"
	"github.com/ethereum/go-ethereum/params"
	"github.com/ethereum/go-ethereum/rpc"

	"github.com/tendermint/tendermint/libs/log"
	rpcclient "github.com/tendermint/tendermint/rpc/jsonrpc/client"
	tmtypes "github.com/tendermint/tendermint/types"

	"github.com/evmos/ethermint/rpc/ethereum/pubsub"
	rpcfilters "github.com/evmos/ethermint/rpc/namespaces/ethereum/eth/filters"
	"github.com/evmos/ethermint/rpc/types"
	"github.com/evmos/ethermint/server/config"
	evmtypes "github.com/evmos/ethermint/x/evm/types"
)

type WebsocketsServer interface {
	Start()
}

type SubscriptionResponseJSON struct {
	Jsonrpc string      `json:"jsonrpc"`
	Result  interface{} `json:"result"`
	ID      float64     `json:"id"`
}

type SubscriptionNotification struct {
	Jsonrpc string              `json:"jsonrpc"`
	Method  string              `json:"method"`
	Params  *SubscriptionResult `json:"params"`
}

type SubscriptionResult struct {
	Subscription rpc.ID      `json:"subscription"`
	Result       interface{} `json:"result"`
}

type ErrorResponseJSON struct {
	Jsonrpc string            `json:"jsonrpc"`
	Error   *ErrorMessageJSON `json:"error"`
	ID      *big.Int          `json:"id"`
}

type ErrorMessageJSON struct {
	Code    *big.Int `json:"code"`
	Message string   `json:"message"`
}

type websocketsServer struct {
	rpcAddr  string // listen address of rest-server
	wsAddr   string // listen address of ws server
	certFile string
	keyFile  string
	api      *pubSubAPI
	logger   log.Logger
}

func NewWebsocketsServer(clientCtx client.Context, logger log.Logger, tmWSClient *rpcclient.WSClient, cfg *config.Config) WebsocketsServer {
	logger = logger.With("api", "websocket-server")
	_, port, _ := net.SplitHostPort(cfg.JSONRPC.Address)

	return &websocketsServer{
		rpcAddr:  "localhost:" + port, // FIXME: this shouldn't be hardcoded to localhost
		wsAddr:   cfg.JSONRPC.WsAddress,
		certFile: cfg.TLS.CertificatePath,
		keyFile:  cfg.TLS.KeyPath,
		api:      newPubSubAPI(clientCtx, logger, tmWSClient),
		logger:   logger,
	}
}

func (s *websocketsServer) Start() {
	ws := mux.NewRouter()
	ws.Handle("/", s)

	go func() {
		var err error
		if s.certFile == "" || s.keyFile == "" {
			err = http.ListenAndServe(s.wsAddr, ws)
		} else {
			err = http.ListenAndServeTLS(s.wsAddr, s.certFile, s.keyFile, ws)
		}

		if err != nil {
			if err == http.ErrServerClosed {
				return
			}

			s.logger.Error("failed to start HTTP server for WS", "error", err.Error())
		}
	}()
}

func (s *websocketsServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	upgrader := websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		s.logger.Debug("websocket upgrade failed", "error", err.Error())
		return
	}

	s.readLoop(&wsConn{
		mux:  new(sync.Mutex),
		conn: conn,
	})
}

func (s *websocketsServer) sendErrResponse(wsConn *wsConn, msg string) {
	res := &ErrorResponseJSON{
		Jsonrpc: "2.0",
		Error: &ErrorMessageJSON{
			Code:    big.NewInt(-32600),
			Message: msg,
		},
		ID: nil,
	}

	_ = wsConn.WriteJSON(res)
}

type wsConn struct {
	conn *websocket.Conn
	mux  *sync.Mutex
}

func (w *wsConn) WriteJSON(v interface{}) error {
	w.mux.Lock()
	defer w.mux.Unlock()

	return w.conn.WriteJSON(v)
}

func (w *wsConn) Close() error {
	w.mux.Lock()
	defer w.mux.Unlock()

	return w.conn.Close()
}

func (w *wsConn) ReadMessage() (messageType int, p []byte, err error) {
	// not protected by write mutex

	return w.conn.ReadMessage()
}

func (s *websocketsServer) readLoop(wsConn *wsConn) {
	// subscriptions of current connection
	subscriptions := make(map[rpc.ID]pubsub.UnsubscribeFunc)
	defer func() {
		// cancel all subscriptions when connection closed
		for _, unsubFn := range subscriptions {
			unsubFn()
		}
	}()

	for {
		_, mb, err := wsConn.ReadMessage()
		if err != nil {
			_ = wsConn.Close()
			s.logger.Error("read message error, breaking read loop", "error", err.Error())
			return
		}

		var msg map[string]interface{}
		if err = json.Unmarshal(mb, &msg); err != nil {
			s.sendErrResponse(wsConn, err.Error())
			continue
		}

		// check if method == eth_subscribe or eth_unsubscribe
		method, ok := msg["method"].(string)
		if !ok {
			// otherwise, call the usual rpc server to respond
			if err := s.tcpGetAndSendResponse(wsConn, mb); err != nil {
				s.sendErrResponse(wsConn, err.Error())
			}

			continue
		}

		connID, ok := msg["id"].(float64)
		if !ok {
			s.sendErrResponse(
				wsConn,
				fmt.Errorf("invalid type for connection ID: %T", msg["id"]).Error(),
			)
			continue
		}

		switch method {
		case "eth_subscribe":
			params, ok := msg["params"].([]interface{})
			if !ok {
				s.sendErrResponse(wsConn, "invalid parameters")
				continue
			}

			if len(params) == 0 {
				s.sendErrResponse(wsConn, "empty parameters")
				continue
			}

			subID := rpc.NewID()
			unsubFn, err := s.api.subscribe(wsConn, subID, params)
			if err != nil {
				s.sendErrResponse(wsConn, err.Error())
				continue
			}
			subscriptions[subID] = unsubFn

			res := &SubscriptionResponseJSON{
				Jsonrpc: "2.0",
				ID:      connID,
				Result:  subID,
			}

			if err := wsConn.WriteJSON(res); err != nil {
				break
			}
		case "eth_unsubscribe":
			params, ok := msg["params"].([]interface{})
			if !ok {
				s.sendErrResponse(wsConn, "invalid parameters")
				continue
			}

			if len(params) == 0 {
				s.sendErrResponse(wsConn, "empty parameters")
				continue
			}

			id, ok := params[0].(string)
			if !ok {
				s.sendErrResponse(wsConn, "invalid parameters")
				continue
			}

			subID := rpc.ID(id)
			unsubFn, ok := subscriptions[subID]
			if ok {
				delete(subscriptions, subID)
				unsubFn()
			}

			res := &SubscriptionResponseJSON{
				Jsonrpc: "2.0",
				ID:      connID,
				Result:  ok,
			}

			if err := wsConn.WriteJSON(res); err != nil {
				break
			}
		default:
			// otherwise, call the usual rpc server to respond
			if err := s.tcpGetAndSendResponse(wsConn, mb); err != nil {
				s.sendErrResponse(wsConn, err.Error())
			}
		}
	}
}

// tcpGetAndSendResponse connects to the rest-server over tcp, posts a JSON-RPC request, and sends the response
// to the client over websockets
func (s *websocketsServer) tcpGetAndSendResponse(wsConn *wsConn, mb []byte) error {
	req, err := http.NewRequestWithContext(context.Background(), "POST", "http://"+s.rpcAddr, bytes.NewBuffer(mb))
	if err != nil {
		return errors.Wrap(err, "Could not build request")
	}

	req.Header.Set("Content-Type", "application/json")
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return errors.Wrap(err, "Could not perform request")
	}

	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return errors.Wrap(err, "could not read body from response")
	}

	var wsSend interface{}
	err = json.Unmarshal(body, &wsSend)
	if err != nil {
		return errors.Wrap(err, "failed to unmarshal rest-server response")
	}

	return wsConn.WriteJSON(wsSend)
}

// pubSubAPI is the eth_ prefixed set of APIs in the Web3 JSON-RPC spec
type pubSubAPI struct {
	events    *rpcfilters.EventSystem
	logger    log.Logger
	clientCtx client.Context
}

// newPubSubAPI creates an instance of the ethereum PubSub API.
func newPubSubAPI(clientCtx client.Context, logger log.Logger, tmWSClient *rpcclient.WSClient) *pubSubAPI {
	logger = logger.With("module", "websocket-client")
	return &pubSubAPI{
		events:    rpcfilters.NewEventSystem(logger, tmWSClient),
		logger:    logger,
		clientCtx: clientCtx,
	}
}

func (api *pubSubAPI) subscribe(wsConn *wsConn, subID rpc.ID, params []interface{}) (pubsub.UnsubscribeFunc, error) {
	method, ok := params[0].(string)
	if !ok {
		return nil, errors.New("invalid parameters")
	}

	switch method {
	case "newHeads":
		// TODO: handle extra params
		return api.subscribeNewHeads(wsConn, subID)
	case "logs":
		if len(params) > 1 {
			return api.subscribeLogs(wsConn, subID, params[1])
		}
		return api.subscribeLogs(wsConn, subID, nil)
	case "newPendingTransactions":
		return api.subscribePendingTransactions(wsConn, subID)
	case "syncing":
		return api.subscribeSyncing(wsConn, subID)
	default:
		return nil, errors.Errorf("unsupported method %s", method)
	}
}

func (api *pubSubAPI) subscribeNewHeads(wsConn *wsConn, subID rpc.ID) (pubsub.UnsubscribeFunc, error) {
	sub, unsubFn, err := api.events.SubscribeNewHeads()
	if err != nil {
		return nil, errors.Wrap(err, "error creating block filter")
	}

	// TODO: use events
	baseFee := big.NewInt(params.InitialBaseFee)

	go func() {
		headersCh := sub.Event()
		errCh := sub.Err()
		for {
			select {
			case event, ok := <-headersCh:
				if !ok {
					return
				}

				data, ok := event.Data.(tmtypes.EventDataNewBlockHeader)
				if !ok {
					api.logger.Debug("event data type mismatch", "type", fmt.Sprintf("%T", event.Data))
					continue
				}

				header := types.EthHeaderFromTendermint(data.Header, ethtypes.Bloom{}, baseFee)

				// write to ws conn
				res := &SubscriptionNotification{
					Jsonrpc: "2.0",
					Method:  "eth_subscription",
					Params: &SubscriptionResult{
						Subscription: subID,
						Result:       header,
					},
				}

				err = wsConn.WriteJSON(res)
				if err != nil {
					api.logger.Error("error writing header, will drop peer", "error", err.Error())

					try(func() {
						if err != websocket.ErrCloseSent {
							_ = wsConn.Close()
						}
					}, api.logger, "closing websocket peer sub")
				}
			case err, ok := <-errCh:
				if !ok {
					return
				}
				api.logger.Debug("dropping NewHeads WebSocket subscription", "subscription-id", subID, "error", err.Error())
			}
		}
	}()

	return unsubFn, nil
}

func try(fn func(), l log.Logger, desc string) {
	defer func() {
		if x := recover(); x != nil {
			if err, ok := x.(error); ok {
				// debug.PrintStack()
				l.Debug("panic during "+desc, "error", err.Error())
				return
			}

			l.Debug(fmt.Sprintf("panic during %s: %+v", desc, x))
			return
		}
	}()

	fn()
}

func (api *pubSubAPI) subscribeLogs(wsConn *wsConn, subID rpc.ID, extra interface{}) (pubsub.UnsubscribeFunc, error) {
	crit := filters.FilterCriteria{}

	if extra != nil {
		params, ok := extra.(map[string]interface{})
		if !ok {
			err := errors.New("invalid criteria")
			api.logger.Debug("invalid criteria", "type", fmt.Sprintf("%T", extra))
			return nil, err
		}

		if params["address"] != nil {
			address, isString := params["address"].(string)
			addresses, isSlice := params["address"].([]interface{})
			if !isString && !isSlice {
				err := errors.New("invalid addresses; must be address or array of addresses")
				api.logger.Debug("invalid addresses", "type", fmt.Sprintf("%T", params["address"]))
				return nil, err
			}

			if ok {
				crit.Addresses = []common.Address{common.HexToAddress(address)}
			}

			if isSlice {
				crit.Addresses = []common.Address{}
				for _, addr := range addresses {
					address, ok := addr.(string)
					if !ok {
						err := errors.New("invalid address")
						api.logger.Debug("invalid address", "type", fmt.Sprintf("%T", addr))
						return nil, err
					}

					crit.Addresses = append(crit.Addresses, common.HexToAddress(address))
				}
			}
		}

		if params["topics"] != nil {
			topics, ok := params["topics"].([]interface{})
			if !ok {
				err := errors.Errorf("invalid topics: %s", topics)
				api.logger.Error("invalid topics", "type", fmt.Sprintf("%T", topics))
				return nil, err
			}

			crit.Topics = make([][]common.Hash, len(topics))

			addCritTopic := func(topicIdx int, topic interface{}) error {
				tstr, ok := topic.(string)
				if !ok {
					err := errors.Errorf("invalid topic: %s", topic)
					api.logger.Error("invalid topic", "type", fmt.Sprintf("%T", topic))
					return err
				}

				crit.Topics[topicIdx] = []common.Hash{common.HexToHash(tstr)}
				return nil
			}

			for topicIdx, subtopics := range topics {
				if subtopics == nil {
					continue
				}

				// in case we don't have list, but a single topic value
				if topic, ok := subtopics.(string); ok {
					if err := addCritTopic(topicIdx, topic); err != nil {
						return nil, err
					}

					continue
				}

				// in case we actually have a list of subtopics
				subtopicsList, ok := subtopics.([]interface{})
				if !ok {
					err := errors.New("invalid subtopics")
					api.logger.Error("invalid subtopic", "type", fmt.Sprintf("%T", subtopics))
					return nil, err
				}

				subtopicsCollect := make([]common.Hash, len(subtopicsList))
				for idx, subtopic := range subtopicsList {
					tstr, ok := subtopic.(string)
					if !ok {
						err := errors.Errorf("invalid subtopic: %s", subtopic)
						api.logger.Error("invalid subtopic", "type", fmt.Sprintf("%T", subtopic))
						return nil, err
					}

					subtopicsCollect[idx] = common.HexToHash(tstr)
				}

				crit.Topics[topicIdx] = subtopicsCollect
			}
		}
	}

	sub, unsubFn, err := api.events.SubscribeLogs(crit)
	if err != nil {
		api.logger.Error("failed to subscribe logs", "error", err.Error())
		return nil, err
	}

	go func() {
		ch := sub.Event()
		errCh := sub.Err()
		for {
			select {
			case event, ok := <-ch:
				if !ok {
					return
				}

				dataTx, ok := event.Data.(tmtypes.EventDataTx)
				if !ok {
					api.logger.Debug("event data type mismatch", "type", fmt.Sprintf("%T", event.Data))
					continue
				}

				txResponse, err := evmtypes.DecodeTxResponse(dataTx.TxResult.Result.Data)
				if err != nil {
					api.logger.Error("failed to decode tx response", "error", err.Error())
					return
				}

				logs := rpcfilters.FilterLogs(evmtypes.LogsToEthereum(txResponse.Logs), crit.FromBlock, crit.ToBlock, crit.Addresses, crit.Topics)
				if len(logs) == 0 {
					continue
				}

				for _, ethLog := range logs {
					res := &SubscriptionNotification{
						Jsonrpc: "2.0",
						Method:  "eth_subscription",
						Params: &SubscriptionResult{
							Subscription: subID,
							Result:       ethLog,
						},
					}

					err = wsConn.WriteJSON(res)
					if err != nil {
						try(func() {
							if err != websocket.ErrCloseSent {
								_ = wsConn.Close()
							}
						}, api.logger, "closing websocket peer sub")
					}
				}
			case err, ok := <-errCh:
				if !ok {
					return
				}
				api.logger.Debug("dropping Logs WebSocket subscription", "subscription-id", subID, "error", err.Error())
			}
		}
	}()

	return unsubFn, nil
}

func (api *pubSubAPI) subscribePendingTransactions(wsConn *wsConn, subID rpc.ID) (pubsub.UnsubscribeFunc, error) {
	sub, unsubFn, err := api.events.SubscribePendingTxs()
	if err != nil {
		return nil, errors.Wrap(err, "error creating block filter: %s")
	}

	go func() {
		txsCh := sub.Event()
		errCh := sub.Err()
		for {
			select {
			case ev := <-txsCh:
				data, ok := ev.Data.(tmtypes.EventDataTx)
				if !ok {
					api.logger.Debug("event data type mismatch", "type", fmt.Sprintf("%T", ev.Data))
					continue
				}

				ethTxs, err := types.RawTxToEthTx(api.clientCtx, data.Tx)
				if err != nil {
					// not ethereum tx
					continue
				}

				for _, ethTx := range ethTxs {
					// write to ws conn
					res := &SubscriptionNotification{
						Jsonrpc: "2.0",
						Method:  "eth_subscription",
						Params: &SubscriptionResult{
							Subscription: subID,
							Result:       ethTx.Hash,
						},
					}

					err = wsConn.WriteJSON(res)
					if err != nil {
						api.logger.Debug("error writing header, will drop peer", "error", err.Error())

						try(func() {
							if err != websocket.ErrCloseSent {
								_ = wsConn.Close()
							}
						}, api.logger, "closing websocket peer sub")
					}
				}
			case err, ok := <-errCh:
				if !ok {
					return
				}
				api.logger.Debug("dropping PendingTransactions WebSocket subscription", subID, "error", err.Error())
			}
		}
	}()

	return unsubFn, nil
}

func (api *pubSubAPI) subscribeSyncing(wsConn *wsConn, subID rpc.ID) (pubsub.UnsubscribeFunc, error) {
	return nil, errors.New("syncing subscription is not implemented")
}
