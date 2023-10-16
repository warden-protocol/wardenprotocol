package mpc

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

type LocalMPCServer struct {
	initVersion int
}

func NewLocalMPCServer(initVersion int) LocalMPCServer {
	return LocalMPCServer{
		initVersion: initVersion,
	}
}

func (service LocalMPCServer) Routes() http.Handler {
	router := mux.NewRouter()
	router.Handle(Status, http.HandlerFunc(service.Check)).Methods(http.MethodGet)
	router.Handle(ECDSAKeys, http.HandlerFunc(service.KeysECDSA)).Methods(http.MethodPost)
	router.Handle(ECDSASig, http.HandlerFunc(service.SignECDSA)).Methods(http.MethodPost)
	router.Handle(EdDSAKeys, http.HandlerFunc(service.KeysEdDSA)).Methods(http.MethodPost)
	router.Handle(EdDSASig, http.HandlerFunc(service.SignEdDSA)).Methods(http.MethodPost)

	return router
}

func (service LocalMPCServer) KeysECDSA(w http.ResponseWriter, req *http.Request) {
	request := KeysRequest{}
	resp := &KeysResponse{}
	if err := json.NewDecoder(req.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		resp.Message = err.Error()
		b, _ := json.Marshal(resp)
		_, _ = w.Write(b)
		return
	}
	response, err := localMPCKeys(&request, service.initVersion, EcDSA)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		resp.Message = err.Error()
		b, _ := json.Marshal(resp)
		_, _ = w.Write(b)
		return
	}
	w.WriteHeader(http.StatusOK)
	b, _ := json.Marshal(response)
	_, _ = w.Write(b)
}

func (service LocalMPCServer) SignECDSA(w http.ResponseWriter, req *http.Request) {
	request := SigRequest{}
	resp := &SigResponse{}
	if err := json.NewDecoder(req.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		resp.Message = err.Error()
		b, _ := json.Marshal(resp)
		_, _ = w.Write(b)
		return
	}
	response, err := localMPCSign(&request, service.initVersion, EcDSA)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		resp.Message = err.Error()
		b, _ := json.Marshal(resp)
		_, _ = w.Write(b)
		return
	}
	w.WriteHeader(http.StatusOK)
	b, _ := json.Marshal(response)
	_, _ = w.Write(b)
}

func (service LocalMPCServer) KeysEdDSA(w http.ResponseWriter, req *http.Request) {
	request := KeysRequest{}
	resp := &KeysResponse{}
	if err := json.NewDecoder(req.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		resp.Message = err.Error()
		b, _ := json.Marshal(resp)
		_, _ = w.Write(b)
		return
	}
	response, err := localMPCKeys(&request, service.initVersion, EdDSA)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		resp.Message = err.Error()
		b, _ := json.Marshal(resp)
		_, _ = w.Write(b)
		return
	}
	w.WriteHeader(http.StatusOK)
	b, _ := json.Marshal(response)
	_, _ = w.Write(b)
}

func (service LocalMPCServer) SignEdDSA(w http.ResponseWriter, req *http.Request) {
	request := SigRequest{}
	resp := &SigResponse{}
	if err := json.NewDecoder(req.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		resp.Message = err.Error()
		b, _ := json.Marshal(resp)
		_, _ = w.Write(b)
		return
	}
	response, err := localMPCSign(&request, service.initVersion, EdDSA)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		resp.Message = err.Error()
		b, _ := json.Marshal(resp)
		_, _ = w.Write(b)
		return
	}
	w.WriteHeader(http.StatusOK)
	b, _ := json.Marshal(response)
	_, _ = w.Write(b)
}

func (LocalMPCServer) Check(w http.ResponseWriter, _ *http.Request) {
	response := KeysResponse{
		Message: "OK",
	}
	w.WriteHeader(http.StatusOK)
	b, _ := json.Marshal(response)
	_, _ = w.Write(b)
}
