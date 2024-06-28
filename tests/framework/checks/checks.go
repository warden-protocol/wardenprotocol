package checks

import (
	"context"
	"testing"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
)

func Eventually[T any](t *testing.T, f func(ctx context.Context) (T, bool)) T {
	var result T
	require.Eventually(t, func() bool {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Millisecond)
		defer cancel()
		r, ok := f(ctx)
		result = r
		return ok
	}, 10*time.Second, time.Second)
	return result
}

func SuccessTx(t *testing.T, tx sdk.TxResponse) {
	require.EqualValues(t, 0, tx.Code, tx)
}

func FailTx(t *testing.T, tx sdk.TxResponse) {
	require.NotEqualValues(t, 0, tx.Code, tx)
}
