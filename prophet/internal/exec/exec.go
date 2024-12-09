package exec

import (
	"context"
	"log/slog"

	"github.com/warden-protocol/wardenprotocol/prophet/internal/handler"
	"github.com/warden-protocol/wardenprotocol/prophet/internal/ingress"
	"github.com/warden-protocol/wardenprotocol/prophet/types"
)

type FutureResultWriter interface {
	Add(result types.FutureResult) error
}

func Futures(src ingress.FutureSource, sink FutureResultWriter) error {
	log := slog.With("module", "pipe_future_request")

	reqs, err := ingress.Futures(src)
	if err != nil {
		return err
	}

	go func() {
		for future := range reqs {
			log := log.With("future", future.ID)

			log.Debug("running future")
			output, err := handler.Run(context.TODO(), future)
			if err != nil {
				log.Error("failed to run future", "err", err)
				continue
			}
			err = sink.Add(output)
			if err != nil {
				log.Error("failed to add future to sink", "err", err)
				continue
			}
		}
	}()

	return nil
}

type VoteWriter interface {
	Add(result types.Vote) error
}

func Votes(src ingress.FutureResultSource, sink VoteWriter) error {
	log := slog.With("module", "pipe_verify_proposal")

	reqs, err := ingress.FutureResults(src)
	if err != nil {
		return err
	}

	go func() {
		for proposal := range reqs {
			plog := log.With("proposal", proposal.ID)

			plog.Debug("verifying proposal")
			err := handler.Verify(context.TODO(), proposal)
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
