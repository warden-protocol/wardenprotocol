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
package rpc

import (
	"fmt"
	"net/http"
)

func RespondWithError(w http.ResponseWriter, code int, msg any) {
	var message string
	switch m := msg.(type) {
	case error:
		message = m.Error()
	case string:
		message = m
	}
	_ = RespondWithJSON(w, code, map[string]string{"error": message})
}

func HandleResponseErr(resp *http.Response) error {
	if resp.StatusCode != 200 {
		var v jsonErr
		if err := DecodeJSON(resp.Body, &v); err != nil {
			return fmt.Errorf("cannot parse JSON body from error response: %w", err)
		}
		return fmt.Errorf(v.Err)
	}
	return nil
}

type jsonErr struct {
	Err string `json:"error"`
}
