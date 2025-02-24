package prophet

import (
	"context"
	"fmt"
	"log/slog"
	"time"
)

// FutureHandler is the interface implemented by the future handlers. A handler
// is able to execute and verify futures.
type FutureHandler interface {
	// Execute the computation with the given input, returning the output.
	Execute(ctx context.Context, input []byte) ([]byte, error)

	// Verify the output of the computation with the given input, returning an
	// error if the output is invalid.
	Verify(ctx context.Context, input []byte, output []byte) error
}

// Execute executes a given future, by invoking the registered handler.
func Execute(ctx context.Context, f Future) (res FutureResult, err error) {
	defer func() {
		if r := recover(); r != nil {
			err = fmt.Errorf("panic executing future: %v", r)
			res = FutureResult{}
		}
	}()

	s := getHandler(f.Handler)
	if s == nil {
		return FutureResult{}, fmt.Errorf("no future handler registered for %s", f.Handler)
	}

	log := slog.With("task", "Execute", "future", f.ID, "handler", f.Handler)
	log.Debug("start")
	start := time.Now()

	output, err := s.Execute(ctx, f.Input)
	if err != nil {
		return FutureResult{}, fmt.Errorf("executing future: %w", err)
	}

	log.Debug("end", "took", time.Since(start))

	return FutureResult{
		Future: f,
		Output: output,
	}, nil
}

// Verify verifies a given future result, by invoking the registered handler.
func Verify(ctx context.Context, f FutureResult) (err error) {
	defer func() {
		if r := recover(); r != nil {
			err = fmt.Errorf("panic verifying future: %v", r)
		}
	}()

	s := getHandler(f.Handler)
	if s == nil {
		return fmt.Errorf("no future handler registered for %s", f.Handler)
	}

	log := slog.With("task", "Verify", "future", f.ID, "handler", f.Handler)
	log.Debug("start")
	start := time.Now()

	if err := s.Verify(ctx, f.Input, f.Output); err != nil {
		return err
	}

	log.Debug("end", "took", time.Since(start))

	return nil
}
