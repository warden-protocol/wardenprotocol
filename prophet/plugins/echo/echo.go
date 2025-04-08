// Package echo provides a mock implementation of the Plugin interface
// for testing purposes. It simply echoes back any input it receives.
package echo

import (
	"bytes"
	"context"
	"errors"

	"github.com/warden-protocol/wardenprotocol/prophet"
)

type Plugin struct{}

var _ prophet.Plugin = (*Plugin)(nil)

func (s Plugin) Execute(ctx context.Context, input []byte) ([]byte, error) {
	return input, nil
}

func (s Plugin) Verify(ctx context.Context, input []byte, output []byte) error {
	if !bytes.Equal(input, output) {
		return errors.New("input and output do not match")
	}

	return nil
}
