package prophet

import (
	"context"
	"fmt"
	"log/slog"
	"time"
)

// Plugin is the interface implemented by the task plugins. A plugin
// is able to execute and verify tasks.
type Plugin interface {
	// Execute the computation with the given input, returning the output.
	Execute(ctx context.Context, input []byte) ([]byte, error)

	// Verify the output of the computation with the given input, returning an
	// error if the output is invalid.
	Verify(ctx context.Context, input []byte, output []byte) error
}

// Execute executes a given task, by invoking the registered plugin.
func Execute(ctx context.Context, f Task) (res TaskResult, err error) {
	defer func() {
		if r := recover(); r != nil {
			err = fmt.Errorf("panic executing task: %v", r)
			res = TaskResult{}
		}
	}()

	s := getPlugin(f.Plugin)
	if s == nil {
		return TaskResult{}, fmt.Errorf("no task plugin registered for %s", f.Plugin)
	}

	log := slog.With("task", "Execute", "task", f.ID, "plugin", f.Plugin)
	log.Debug("start")

	start := time.Now()

	output, err := s.Execute(ctx, f.Input)
	if err != nil {
		return TaskResult{}, fmt.Errorf("executing task: %w", err)
	}

	log.Debug("end", "took", time.Since(start))

	return TaskResult{
		Task:   f,
		Output: output,
	}, nil
}

// Verify verifies a given task result, by invoking the registered plugin.
func Verify(ctx context.Context, f TaskResult) (err error) {
	defer func() {
		if r := recover(); r != nil {
			err = fmt.Errorf("panic verifying task: %v", r)
		}
	}()

	s := getPlugin(f.Plugin)
	if s == nil {
		return fmt.Errorf("no task plugin registered for %s", f.Plugin)
	}

	log := slog.With("task", "Verify", "task", f.ID, "plugin", f.Plugin)
	log.Debug("start")

	start := time.Now()

	if err := s.Verify(ctx, f.Input, f.Output); err != nil {
		return err
	}

	log.Debug("end", "took", time.Since(start))

	return nil
}
