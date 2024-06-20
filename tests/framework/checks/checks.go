package checks

import (
	"testing"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
)

func SuccessTx(t *testing.T, tx sdk.TxResponse) {
	require.EqualValues(t, 0, tx.Code, tx)
}

func FailTx(t *testing.T, tx sdk.TxResponse) {
	require.NotEqualValues(t, 0, tx.Code, tx)
}
