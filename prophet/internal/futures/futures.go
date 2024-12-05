package futures

import (
	"context"
	"fmt"
	"log/slog"
	"time"

	"github.com/warden-protocol/wardenprotocol/prophet/types"
)

type FutureHandler interface {
	Execute(ctx context.Context, input types.Input) (types.Output, error)

	Verify(ctx context.Context, input types.Input, output types.Output) error
}

func Run(ctx context.Context, f types.Future) (types.FutureResult, error) {
	s := Get(f.Handler)
	if s == nil {
		return types.FutureResult{}, fmt.Errorf("unknown future: %s", f.Handler)
	}

	log := slog.With("module", "futures", "mode", "run", "future", f.Handler)
	log.Debug("executing", "future", f.ID)
	start := time.Now()
	output, err := s.Execute(ctx, f.Input)
	if err != nil {
		return types.FutureResult{}, fmt.Errorf("executing future: %w", err)
	}
	log.Debug("done executing", "future", f.ID, "took", time.Since(start))

	return types.FutureResult{
		Future: f,
		Output: output,
	}, nil
}

func Verify(ctx context.Context, f types.FutureResult) error {
	s := Get(f.Handler)
	if s == nil {
		return fmt.Errorf("unknown future: %s", f.Handler)
	}

	log := slog.With("module", "futures", "mode", "verify", "future", f.Handler)
	log.Debug("verifying", "proposal", f.ID)
	start := time.Now()
	err := s.Verify(ctx, f.Input, f.Output)
	if err != nil {
		return err
	}
	log.Debug("done verifying", "proposal", f.ID, "took", time.Since(start))

	return nil
}
