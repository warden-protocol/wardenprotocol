// Package echo provides a mock implementation of the FutureHandler interface
// for testing purposes. It simply echoes back any input it receives.
package echo

import (
	"bytes"
	"context"
	"fmt"

	"github.com/warden-protocol/wardenprotocol/prophet"
)

type Handler struct{}

var _ prophet.FutureHandler = (*Handler)(nil)

func (s Handler) Execute(ctx context.Context, input []byte) ([]byte, error) {
	return input, nil
}

func (s Handler) Verify(ctx context.Context, input []byte, output []byte) error {
	if !bytes.Equal(input, output) {
		return fmt.Errorf("input and output do not match")
	}
	return nil
}
