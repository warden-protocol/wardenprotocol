// Package echo is a mock future that echoes back the input.
package echo

import (
	"bytes"
	"context"
	"fmt"
	"time"

	"github.com/warden-protocol/wardenprotocol/prophet/internal/handler"
	"github.com/warden-protocol/wardenprotocol/prophet/types"
)

func init() {
	handler.Register("echo", Future{})
}

type Future struct{}

func (s Future) Execute(ctx context.Context, input types.Input) (types.Output, error) {
	time.Sleep(30 * time.Second)
	return types.Output(input), nil
}

func (s Future) Verify(ctx context.Context, input types.Input, output types.Output) error {
	if bytes.Compare(input, output) != 0 {
		return fmt.Errorf("input and output do not match")
	}
	return nil
}
