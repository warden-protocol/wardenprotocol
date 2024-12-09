package wardenai

import (
	"bytes"
	"context"
	"io"
	"net/http"

	"github.com/warden-protocol/wardenprotocol/prophet/internal/handler"
	"github.com/warden-protocol/wardenprotocol/prophet/types"
)

func init() {
	handler.Register("wardenai", Future{})
}

type Future struct {
}

func (s Future) Execute(ctx context.Context, input types.Input) (types.Output, error) {
	res, err := http.Post("http://localhost:9001/job/solve", "application/json", bytes.NewReader(input))
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()
	response, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}
	return response, nil
}

func (s Future) Verify(ctx context.Context, input types.Input, output types.Output) error {
	// todo: verify output
	return nil
}
