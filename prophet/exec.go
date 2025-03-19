package prophet

import (
	"context"
	"log/slog"
)

// FutureResultWriter writes results of future executions.
type FutureResultWriter interface {
	Write(result FutureResult) error
}

// ExecFutures executes futures coming from the specified reader and writes
// them to the specified writer.
//
// This call is non-blocking, the main loop is executed in a goroutine.
func ExecFutures(r FutureReader, w FutureResultWriter) error {
	log := slog.With("process", "exec_futures")

	go func() {
		for future := range r.Read() {
			log := log.With("future", future.ID)

			log.Debug("running future")

			output, err := Execute(context.TODO(), future)
			if err != nil {
				log.Error("failed to run future", "err", err)
				continue
			}

			err = w.Write(output)
			if err != nil {
				log.Error("failed to write future result", "err", err)
				continue
			}
		}
	}()

	return nil
}

// VoteWriter writes votes of future verifications.
type VoteWriter interface {
	Write(result Vote) error
}

// ExecVotes executes future verifications coming from the specified reader and
// writes them to the specified writer.
//
// This call is non-blocking, the main loop is executed in a goroutine.
func ExecVotes(r FutureResultReader, w VoteWriter) error {
	log := slog.With("process", "exec_votes")

	go func() {
		for proposal := range r.Read() {
			plog := log.With("future", proposal.ID)

			plog.Debug("verifying future proposal")

			err := Verify(context.TODO(), proposal)
			if err := w.Write(Vote{
				ID:  proposal.ID,
				Err: err,
			}); err != nil {
				plog.Error("failed to write vote", "err", err)
				continue
			}
		}
	}()

	return nil
}
