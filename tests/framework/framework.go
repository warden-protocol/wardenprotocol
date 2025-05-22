package framework

import (
	"os"
	"path/filepath"
	"testing"

	"github.com/stretchr/testify/require"

	"github.com/warden-protocol/wardenprotocol/tests/framework/exec"
	"github.com/warden-protocol/wardenprotocol/tests/framework/iowriter"
)

type BuildResult struct {
	Wardend string
}

func Build(t *testing.T) BuildResult {
	t.Helper()

	binDir := t.TempDir()

	wardend := binDir + "/wardend"
	cmd := exec.Exec{
		Bin:    "go",
		Args:   []string{"build", "-o", wardend, "./cmd/wardend"},
		Pwd:    goModRoot(t),
		Stdout: &iowriter.IOWriter{},
		Stderr: &iowriter.IOWriter{},
	}
	err := cmd.Run(t.Context())
	require.NoError(t, err)

	return BuildResult{
		Wardend: wardend,
	}
}

func goModRoot(t *testing.T) string {
	path, err := filepath.Abs(".")
	require.NoError(t, err)

	for path != "/" && path != "" {
		testPath := filepath.Join(path, "go.mod")
		_, err := os.Stat(testPath)
		if err == nil {
			return path
		}
		path = filepath.Dir(path)
	}

	t.Error("couldn't find a go.mod file in current or parents directories")
	return ""
}
