package rpc

import (
	"context"
	"net/http"
)

type Server interface {
	ListenAndServe() error
	Shutdown(ctx context.Context) error
}

type Client interface {
	Do(*http.Request) (*http.Response, error)
}
