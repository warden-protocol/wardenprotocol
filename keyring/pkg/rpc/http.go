package rpc

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/qredo/fusionchain/keyring/pkg/logger"
	"github.com/sirupsen/logrus"
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
