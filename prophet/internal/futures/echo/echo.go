// Package echo is a mock future that echoes back the input.
package echo

import (
	"bytes"
	"context"
	"fmt"

	"github.com/warden-protocol/wardenprotocol/prophet/internal/futures"
	"github.com/warden-protocol/wardenprotocol/prophet/types"
)

func init() {
	futures.Register("echo", Future{})
}

type Future struct{}

func (s Future) Execute(ctx context.Context, input types.Input) (types.Output, error) {
	return types.Output(input), nil
}

func (s Future) Verify(ctx context.Context, input types.Input, output types.Output) error {
	if bytes.Compare(input, output) != 0 {
		return fmt.Errorf("input and output do not match")
	}
	return nil
}
