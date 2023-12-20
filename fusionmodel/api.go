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
	"fmt"
	"net/http"
	"strconv"

	"github.com/qredo/fusionchain/keyring/pkg/rpc"
)

const (
	sigRequest = "/fusionchain/treasury/signature_request_by_id"
)

// Response represents the signature_request_by_id API.
type Response struct {
	SignRequest SignRequest `json:"sign_request,omitempty"`
}

// SignRequest contains the signature data and creator details.
type SignRequest struct {
	ID             string `json:"id,omitempty"`
	Creator        string `json:"creator,omitempty"`
	KeyID          string `json:"key_id,omitempty"`
	DataForSigning string `json:"data_for_signing,omitempty"`
	Status         string `json:"status,omitempty"`
	SignedData     string `json:"signed_data,omitempty"`
}

func makeAPIHandlers(s *Service) *rpc.API {
	r := &rpc.API{}
	r.AddEndpoint(rpc.NewEndpoint(sigRequest, http.MethodGet, s.signatureRequestByIDHandler))
	return r
}

func (s *Service) signatureRequestByIDHandler(w http.ResponseWriter, r *http.Request) {
	// Extracting the query parameter 'id'
	id := r.URL.Query().Get("id")

	requstIndex, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		respErr := fmt.Errorf("malformed requestID '%v': %v", id, err.Error())
		rpc.RespondWithError(w, http.StatusInternalServerError, respErr)
		s.log.Error(respErr)
		return
	}

	status := "SIGN_REQUEST_STATUS_PENDING"
	sigData := ""
	if requstIndex%2 == 0 {
		status = "SIGN_REQUEST_STATUS_FULFILLED"
		sigData = "Lnhyih8OH9e9IA0BkGIC+/ati2xKBoHia6Z9srNnhsQgFnlNJZyn7inUunUZ4lAIGIJ/wV1iBV7FmSzrGWsmXQA="
	}

	// Simulating data based on the received ID
	responseData := &Response{
		SignRequest: SignRequest{
			ID:             id,
			Creator:        s.config.Creator,
			KeyID:          s.config.KeyId,
			DataForSigning: s.config.DataForSigning,
			Status:         status,
			SignedData:     sigData,
		},
	}

	if err := rpc.RespondWithJSON(w, http.StatusOK, responseData); err != nil {
		rpc.RespondWithError(w, http.StatusInternalServerError, err)
		s.log.Error(err)
		return
	}
}
