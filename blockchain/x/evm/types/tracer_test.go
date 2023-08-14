package types

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestNewNoOpTracer(t *testing.T) {
	require.Equal(t, &NoOpTracer{}, NewNoOpTracer())
}
