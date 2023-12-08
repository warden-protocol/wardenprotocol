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
