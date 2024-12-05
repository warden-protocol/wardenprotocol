package exec

import (
	"context"
	"fmt"
	"log/slog"

	"github.com/warden-protocol/wardenprotocol/prophet/internal/futures"
	"github.com/warden-protocol/wardenprotocol/prophet/internal/ingress"
	"github.com/warden-protocol/wardenprotocol/prophet/types"
)

func Futures(src ingress.FutureSource, sink types.FutureResultWriter) error {
	log := slog.With("module", "pipe_future_request")

	reqs, err := ingress.Futures(src)
	if err != nil {
		return err
	}
	futs := mapchan(reqs, mapFuture)

	go func() {
		for future := range futs {
			log := log.With("future", future.ID)

			log.Debug("running future")
			fmt.Println("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX RUNNING FUTURE", future.ID)
			output, err := futures.Run(context.TODO(), future)
			if err != nil {
				log.Error("failed to run future", "err", err)
				continue
			}
			err = sink.Add(output)
			if err != nil {
				log.Error("failed to add future to sink", "err", err)
				continue
			}
			fmt.Println("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX DONE RUNNING FUTURE", future.ID)
		}
	}()

	return nil
}

func Votes(src ingress.FutureResultSource, sink types.VoteWriter) error {
	log := slog.With("module", "pipe_verify_proposal")

	reqs, err := ingress.FutureResults(src)
	if err != nil {
		return err
	}
	proposals := mapchan(reqs, mapFutureResult)

	go func() {
		for proposal := range proposals {
			plog := log.With("proposal", proposal.ID)

			plog.Debug("verifying proposal")
			err := futures.Verify(context.TODO(), proposal)
			if err := sink.Add(types.Vote{
				ID:  proposal.ID,
				Err: err,
			}); err != nil {
				plog.Error("failed to add future to sink", "err", err)
				continue
			}
		}
	}()

	return nil
}

func mapchan[A, B any](reqs <-chan A, fn func(A) B) <-chan B {
	futures := make(chan B)
	go func() {
		defer close(futures)
		for req := range reqs {
			futures <- fn(req)
		}
	}()
	return futures
}

func mapFuture(req types.Future) types.Future {
	return types.Future{
		ID:      req.ID,
		Handler: req.Handler,
		Input:   req.Input,
	}
}

func mapFutureResult(req types.FutureResult) types.FutureResult {
	return types.FutureResult{
		Future: mapFuture(req.Future),
		Output: req.Output,
	}
}
