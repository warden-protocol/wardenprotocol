package framework

import (
	"context"
	"testing"

	"github.com/stretchr/testify/require"
	"github.com/warden-protocol/wardenprotocol/tests/framework/exec"
)

type BuildResult struct {
	Wardend string
}

func Build(t *testing.T) BuildResult {
	t.Helper()

	binDir := t.TempDir()

	wardend := binDir + "/wardend"
	cmd := exec.Exec{
		Bin:  "go",
		Args: []string{"build", "-o", wardend, "./cmd/wardend"},
		Pwd:  "../warden",
	}
	err := cmd.Run(context.Background())
	require.NoError(t, err)

	return BuildResult{
		Wardend: wardend,
	}
}
